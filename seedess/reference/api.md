# API reference

Contract 2026-11-16. Base URL `https://seedess.com`.

Every failure uses `{ ok: false, error: { code, message } }`.

## platform

Health, waitlist and pilot entry.

### GET /api/health

**getHealth** — Health check

Liveness probe for the Worker and its bindings.

Auth: Public

Responses: 200 → health

### POST /api/waitlist

**joinWaitlist** — Apply for the pilot

The pilot application. Sends a confirmation email and creates a pending applicant account. Rate limited per IP.

Auth: Public

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `body` | body | yes | waitlist |

Responses: 200 → waitlist-join

### GET /api/waitlist/count

**getWaitlistCount** — Subscriber count

Public count shown on the landing page. Cached for 60 seconds.

Auth: Public

Responses: 200 → waitlist-count

### GET /api/waitlist/export.csv

**exportWaitlist** — Export subscribers (CSV)

Admin-only CSV export of the waitlist. Requires the `ADMIN_TOKEN` bearer secret.

Auth: Admin token (Bearer)

Responses: 200

## auth

Accounts, sessions, OAuth and email links.

### POST /api/v1/auth/signup

**signup** — Create an account

Creates a password account. New accounts are `pending` unless `AUTO_APPROVE_SIGNUPS` is on or the email is in `ADMIN_EMAILS`. Sets the session cookie and sends a verification email.

Auth: Public

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `body` | body | yes | inline |

Responses: 201 → session

### POST /api/v1/auth/signin

**signin** — Sign in with a password

Sets the HttpOnly session cookie. The same error is returned for an unknown address and a wrong password.

Auth: Public

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `body` | body | yes | inline |

Responses: 200 → session

### POST /api/v1/auth/signout

**signout** — Sign out

Destroys the current session and clears the cookie.

Auth: Session cookie

Responses: 200 → ack

### GET /api/v1/auth/me

**getMe** — Current account

The signed-in account, its approval state, admin flag, and organisations. Works for pending accounts too.

Auth: Session cookie

Responses: 200 → session

### GET /api/v1/auth/magic

**magicLogin** — Sign in from an email link

One-time sign-in link sent to pilot applicants. Sets the session cookie and redirects to the dashboard.

Auth: Public

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `token` | query | yes | inline |

Responses: 302

### GET /api/v1/auth/verify

**verifyEmailLink** — Verify an email (link)

Verifies the email and returns JSON. The link in the verification email points at the /verify/ page, which posts the token here or calls the GET form.

Auth: Public

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `token` | query | yes | inline |

Responses: 200 → ack

### POST /api/v1/auth/verify

**verifyEmail** — Verify an email (token)

The JSON form of email verification, used by the dashboard.

Auth: Public

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `body` | body | yes | inline |

Responses: 200 → ack

### POST /api/v1/auth/resend-verification

**resendVerification** — Resend the verification email

Sends a fresh verification link to the signed-in account.

Auth: Session cookie

Responses: 200 → ack

### POST /api/v1/auth/forgot

**forgotPassword** — Request a password reset

Always acknowledges, whether or not the address exists.

Auth: Public

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `body` | body | yes | inline |

Responses: 200 → ack

### POST /api/v1/auth/reset

**resetPassword** — Reset a password

Consumes a reset token and revokes every existing session for the account.

Auth: Public

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `body` | body | yes | inline |

Responses: 200 → ack

### GET /api/auth/login/{provider}

**startOauth** — Start Google or GitHub sign-in

Redirects to the provider. `provider` is `google`, `github`, or `email`. Returns to `/api/auth/callback` and then the dashboard.

Auth: Public

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `provider` | path | yes | inline |

Responses: 302

### GET /api/auth/callback

**oauthCallback** — Finish Google or GitHub sign-in

Exchanges the provider code, creates or finds the account, sets the session cookie and redirects to the dashboard.

Auth: Public

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `code` | query | no | inline |
| `state` | query | no | inline |
| `error` | query | no | inline |

Responses: 302

## organisations

Tenants, members, roles, invites and API keys.

### GET /api/v1/orgs

**listOrgs** — List organisations

Every organisation the signed-in account belongs to, with its role.

Auth: Session cookie

Responses: 200 → org-list

### POST /api/v1/orgs

**createOrg** — Create an organisation

Creates a tenant and makes the caller its owner. The account email must be verified.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `body` | body | yes | inline |

Responses: 201 → org

### GET /api/v1/orgs/{orgId}

**getOrg** — Get an organisation

Organisation details plus its members. Any member can read it.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |

Responses: 200 → org-detail

### PATCH /api/v1/orgs/{orgId}

**renameOrg** — Rename an organisation

Owner or admin, with a verified email.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |
| `body` | body | yes | inline |

Responses: 200 → ack

### PATCH /api/v1/orgs/{orgId}/members/{userId}

**changeRole** — Change a member role

Owner only. The last owner cannot be demoted.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |
| `userId` | path | yes | inline |
| `body` | body | yes | inline |

Responses: 200 → ack

### DELETE /api/v1/orgs/{orgId}/members/{userId}

**removeMember** — Remove a member

Owner or admin. Admins can only remove plain members; the last owner cannot be removed.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |
| `userId` | path | yes | inline |

Responses: 200 → ack

### POST /api/v1/orgs/{orgId}/invites

**createInvite** — Invite a teammate

Emails an invite with the role. Owner or admin, with a verified email.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |
| `body` | body | yes | inline |

Responses: 200 → ack

### POST /api/v1/orgs/accept-invite

**acceptInvite** — Accept an invite

Joins the organisation the invite belongs to. The signed-in email must match.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `body` | body | yes | inline |

Responses: 200 → ack

### POST /api/v1/orgs/{orgId}/keys

**createApiKey** — Create an API key

Owner or admin, with a verified email. The raw key is returned once; only its SHA-256 hash is stored. Scopes are fixed to `streams:read,streams:write,telemetry:write`.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |
| `body` | body | no | inline |

Responses: 201 → api-key

## streams

Create and control streams through an API key or the dashboard session.

### GET /api/v1/streams

**listStreams** — List streams (API key)

Every stream owned by the key's tenant. Requires the `streams:read` scope.

Auth: API key (Bearer)

Responses: 200 → stream-list

### POST /api/v1/streams

**createStream** — Create a stream (API key)

Ingests a manifest, rewrites it, and returns a per-stream public token plus playback URLs. Requires the `streams:write` scope. Ingest is SSRF-guarded.

Auth: API key (Bearer)

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `body` | body | yes | stream-create |

Responses: 201 → stream-create-response

### GET /api/v1/streams/{streamId}

**getStream** — Get a stream (API key)

Status, variants and segment count. Requires the `streams:read` scope.

Auth: API key (Bearer)

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `streamId` | path | yes | inline |

Responses: 200 → stream

### POST /api/v1/streams/{streamId}/refresh

**refreshStream** — Refresh a live stream

Fetches new live segments. Requires `streams:write`.

Auth: API key (Bearer)

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `streamId` | path | yes | inline |

Responses: 200 → stream-refresh

### POST /api/v1/streams/{streamId}/kill

**killStream** — Turn peer delivery off

The kill switch. CDN playback continues; `/signaling/config` reports `p2p:false` and the room refuses connections. Requires `streams:write`.

Auth: API key (Bearer)

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `streamId` | path | yes | inline |

Responses: 200 → ack

### POST /api/v1/streams/{streamId}/revive

**reviveStream** — Turn peer delivery back on

Reverses the kill switch. Requires `streams:write`.

Auth: API key (Bearer)

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `streamId` | path | yes | inline |

Responses: 200 → ack

### GET /api/v1/streams/{streamId}/metrics

**getStreamMetrics** — Stream metrics (API key)

Aggregated offload, CDN bytes, P2P bytes, failures, peers and sessions. Requires `streams:read`.

Auth: API key (Bearer)

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `streamId` | path | yes | inline |

Responses: 200 → stream-metrics

### GET /api/v1/orgs/{orgId}/streams

**listOrgStreams** — List streams (dashboard)

The organisation's streams. Any member can read.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |

Responses: 200 → stream-list

### POST /api/v1/orgs/{orgId}/streams

**createOrgStream** — Create a stream (dashboard)

Owner or admin, with a verified email. Same ingest pipeline as the API-key route and returns the full detail, playback URLs and install snippet.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |
| `body` | body | yes | stream-create |

Responses: 201 → stream-detail

### GET /api/v1/orgs/{orgId}/streams/{streamId}

**getOrgStream** — Get a stream (dashboard)

Full detail: variants, controls, playback URLs and the copy-paste snippet.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |
| `streamId` | path | yes | inline |

Responses: 200 → stream-detail

### GET /api/v1/orgs/{orgId}/streams/{streamId}/metrics

**getOrgStreamMetrics** — Stream metrics (dashboard)

The same aggregate as the API-key metrics route.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |
| `streamId` | path | yes | inline |

Responses: 200 → stream-metrics

### PATCH /api/v1/orgs/{orgId}/streams/{streamId}/controls

**patchOrgStreamControls** — Update stream controls

Kill switch, offload cap, allowed origins and metered default. Owner or admin, with a verified email.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |
| `streamId` | path | yes | inline |
| `body` | body | yes | controls |

Responses: 200 → stream-controls-response

## playback

The browser data plane: playlists, segments, ICE config and the signaling room.

### GET /play/{streamId}/master.m3u8

**getMasterPlaylist** — HLS master playlist

The rewritten master. Segment URIs carry `h` (SHA-256) and `size`, and a `token` query parameter. Requires the per-stream public token.

Auth: Stream token

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `streamId` | path | yes | inline |
| `token` | query | yes | inline |

Responses: 200

### GET /play/{streamId}/live.m3u8

**getMediaPlaylist** — HLS media playlist (default variant)

The rewritten media playlist for variant `v0`.

Auth: Stream token

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `streamId` | path | yes | inline |
| `token` | query | yes | inline |

Responses: 200

### GET /play/{streamId}/{variantId}/live.m3u8

**getVariantPlaylist** — HLS media playlist (variant)

The rewritten media playlist for one rendition.

Auth: Stream token

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `streamId` | path | yes | inline |
| `variantId` | path | yes | inline |
| `token` | query | yes | inline |

Responses: 200

### GET /play/{streamId}/init

**getInitSegment** — Init segment (default variant)

The fMP4/CMAF initialization segment for variant `v0`, served from R2 with range support.

Auth: Stream token

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `streamId` | path | yes | inline |
| `token` | query | yes | inline |

Responses: 200

### GET /play/{streamId}/{variantId}/init

**getVariantInitSegment** — Init segment (variant)

The initialization segment for one rendition.

Auth: Stream token

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `streamId` | path | yes | inline |
| `variantId` | path | yes | inline |
| `token` | query | yes | inline |

Responses: 200

### GET /play/{streamId}/segments/{seq}

**getSegment** — Media segment (default variant)

Immutable segment bytes with CORS and range support.

Auth: Stream token

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `streamId` | path | yes | inline |
| `seq` | path | yes | inline |
| `token` | query | yes | inline |

Responses: 200

### GET /play/{streamId}/{variantId}/segments/{seq}

**getVariantSegment** — Media segment (variant)

Immutable segment bytes for one rendition.

Auth: Stream token

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `streamId` | path | yes | inline |
| `variantId` | path | yes | inline |
| `seq` | path | yes | inline |
| `token` | query | yes | inline |

Responses: 200

### GET /play/{streamId}/manifest.mpd

**getDashManifest** — DASH manifest

The rewritten MPD. Served when `DASH_ENABLED` is on; there is no shipped DASH player SDK yet.

Auth: Stream token

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `streamId` | path | yes | inline |
| `token` | query | yes | inline |

Responses: 200

### GET /signaling/config

**getSignalingConfig** — Browser mesh config

ICE servers, peer cap, offload cap, metered default, and `p2p` (false when the kill switch is on). The SDK fetches this before joining the room.

Auth: Stream token

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `token` | query | yes | inline |

Responses: 200 → signaling-config

### GET /signaling/room/{streamId}

**connectSignaling** — Signaling room (WebSocket)

Upgrades to a WebSocket and relays `welcome`, `peer-join`, `peer-leave`, `signal`, `have`, `ping`/`pong`. One room per stream, one broadcaster per room. The Durable Object never carries media bytes.

Auth: Stream token

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `streamId` | path | yes | inline |
| `token` | query | yes | inline |
| `peer` | query | yes | inline |
| `role` | query | no | inline |

Responses: 101

## telemetry

Per-session offload reporting.

### POST /api/v1/telemetry

**ingestTelemetry** — Send a telemetry batch

Best-effort, one batch per session. Malformed bodies and unknown streams are dropped with 204, never 500. Rate limit: 30 per minute per IP. Bodies over 16 KiB get 413.

Auth: Public

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `body` | body | yes | telemetry-batch |

Responses: 204

## pilot

The post-sign-in pilot application.

### GET /api/v1/application

**getApplication** — Read the pilot application

The qualification fields saved for the signed-in account.

Auth: Session cookie

Responses: 200 → application

### POST /api/v1/application

**saveApplication** — Save the pilot application

Upserts the qualification fields on the same waitlist row and marks the account's application complete.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `body` | body | yes | application |

Responses: 200 → ack

## billing

Usage, verified savings, invoices and disputes.

### GET /api/v1/orgs/{orgId}/usage

**getUsage** — Usage summary

Tenant totals plus a per-stream breakdown. Any member can read.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |

Responses: 200 → usage

### GET /api/v1/orgs/{orgId}/metering

**getMetering** — Metering and verified savings

Invoice-grade aggregation over an optional `from`/`to` period, with the captured CDN rate, daily reconciliation and per-stream breakdown.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |
| `from` | query | no | inline |
| `to` | query | no | inline |

Responses: 200 → metering

### PATCH /api/v1/orgs/{orgId}/metering

**patchMetering** — Set the billing baseline

CDN egress rate, billing plan, savings-share percentage and per-minute rate. Owner or admin, with a verified email.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |
| `body` | body | yes | inline |

Responses: 200 → metering-baseline

### GET /api/v1/orgs/{orgId}/metering.csv

**getMeteringCsv** — Daily reconciliation CSV

The artifact you attach to a CDN invoice dispute: one row per day, with savings and fee columns.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |
| `from` | query | no | inline |
| `to` | query | no | inline |

Responses: 200

### GET /api/v1/orgs/{orgId}/invoices

**listInvoices** — List invoices

Every invoice for the organisation, newest first.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |

Responses: 200 → invoice-list

### POST /api/v1/orgs/{orgId}/invoices

**createInvoice** — Generate a draft invoice

Savings-share only in the pilot: prices offloaded bytes at the captured CDN rate. Also mirrors a draft into Stripe when the key is set. Owner or admin, with a verified email.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |
| `body` | body | yes | inline |

Responses: 201 → invoice-created

### GET /api/v1/orgs/{orgId}/invoices/{invoiceId}

**getInvoice** — Get an invoice

Pass `refresh=1` to re-read the Stripe status and hosted URL.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |
| `invoiceId` | path | yes | inline |
| `refresh` | query | no | inline |

Responses: 200 → invoice-response

### POST /api/v1/orgs/{orgId}/invoices/{invoiceId}/dispute

**disputeInvoice** — Open an invoice dispute

Any member can dispute an invoice with a reason.

Auth: Session cookie

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `orgId` | path | yes | inline |
| `invoiceId` | path | yes | inline |
| `body` | body | yes | inline |

Responses: 200 → invoice-response

## admin

Founder-only operations. These 404 unless the caller email is in ADMIN_EMAILS.

### GET /api/v1/admin/overview

**adminOverview** — Admin overview

Health and cross-database counts. Requires a signed-in account whose email is in `ADMIN_EMAILS`; otherwise the whole admin surface 404s.

Auth: Founder session

Responses: 200 → admin-overview

### GET /api/v1/admin/tenants

**adminTenants** — Admin tenants

All organisations with member and stream counts.

Auth: Founder session

Responses: 200 → admin-tenants

### GET /api/v1/admin/applications

**adminApplications** — Admin applications

Recent pilot applications, newest first, with the account approval state.

Auth: Founder session

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `limit` | query | no | inline |
| `offset` | query | no | inline |

Responses: 200 → admin-applications

### POST /api/v1/admin/applications/approve

**adminApproveApplication** — Approve an application

Activates the account, creates its pilot organisation and emails a dashboard link.

Auth: Founder session

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `body` | body | yes | inline |

Responses: 200 → ack

### POST /api/v1/admin/applications/reject

**adminRejectApplication** — Reject an application

Marks a pending account `rejected`.

Auth: Founder session

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `body` | body | yes | inline |

Responses: 200 → ack

### GET /api/v1/admin/invoices

**adminInvoices** — Admin invoices

Invoices across all tenants. `status=open` filters to open disputes.

Auth: Founder session

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `status` | query | no | inline |
| `limit` | query | no | inline |

Responses: 200 → admin-invoices

### POST /api/v1/admin/invoices/{invoiceId}/resolve

**adminResolveInvoice** — Resolve a dispute

Marks an open dispute resolved and stores an optional note.

Auth: Founder session

| Argument | In | Required | Schema |
| --- | --- | --- | --- |
| `invoiceId` | path | yes | inline |
| `body` | body | no | inline |

Responses: 200 → ack

Full machine-readable shape: [openapi.json](openapi.json) and [schemas/](schemas/).
