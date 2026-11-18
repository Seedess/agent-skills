# Troubleshooting

## 0 P2P bytes

Work through this list in order:

1. **Two viewers, same stream.** Open the page twice. One peer is not a mesh.
2. **Peer link open?** The adapter's `stats.connectedPeers` must be > 0. If it is 0 but
   `peers` is 1, signaling connected but WebRTC did not.
3. **TURN configured?** `GET /signaling/config?token=pk_…` must show `turn: true` and an
   `iceServers` entry with a `turn:` URL. STUN-only fails on symmetric NAT.
4. **CORS on the segment host.** In proxy mode Seedess serves `/play/*` with CORS. In overlay
   mode the customer's CDN must allow the page origin, or peers cannot fetch fallbacks.
5. **Origin allow-list.** A stream with `allowedOrigins` set returns 403 for other origins.
6. **Kill switch.** `killSwitch: true` returns `p2p: false` and the room refuses connections.
7. **Native HLS / VHS.** Safari and Video.js VHS cannot be intercepted; they always stay on
   the CDN.
8. **Segment bitfield.** A viewer that joins before it has segments cannot seed. Start the
   second viewer after the first has fetched a few segments.
9. **Hedge.** If `hedgeDelay` is too low, the CDN wins even when the peer has the segment.
   Raise it for TURN, but keep playback startup fast by loading from the CDN first.

## Player stalls

- A long `hedgeDelay` (or `requestTimeout`) can hold playback while waiting for a slow peer.
  Load from the CDN first and switch to peer-first after a buffer exists.
- `requestTimeout` and `hedgeDelay` are separate: the hedge starts the CDN fetch in parallel;
  the request timeout rejects the peer request.
- Check `fallbacks` and `hashFailures`. A high `hashFailures` means verification is failing;
  check that `h`/`size` match the bytes.

## 401 / 403

- `UNAUTHORIZED` — missing or wrong API key/public token. `key_…` is control plane; `pk_…` is
  data plane. They are not interchangeable.
- `ORIGIN_NOT_ALLOWED` — the page origin is not on the stream's allow-list. Add it or clear
  the list.
- `P2P_DISABLED` — the stream's kill switch is on. Call `enablePeers(id)`.

## 402 / 404 / 409

- `402 payment_required` is a billing/plan error, not a playback error.
- `404` on a package install means the registry package is not published yet. Use the GitHub
  install in [`sdks.md`](sdks.md), or the live `https://seedess.com/p2p.js` bundle.
- `409` from a stream route usually means a quota or a conflicting state; read
  `error.message`.

## Live stream is not advancing

Seedess does not poll live manifests automatically. Call `refreshStream(id)` on the segment
cadence (a cron or a queue), then the player picks up the new window.

## Metrics stay at zero

The adapter does not post telemetry by itself. Send `POST /api/v1/telemetry` with the session
counters, or the dashboard has nothing to aggregate. Telemetry is best-effort and returns 204.

## CORS

The following are cross-origin-friendly:

- `/play/*`
- `/signaling/config`
- `/p2p.js`
- `/demo/config`

`/signaling/room/*` is a WebSocket; browser CORS does not apply, but the server checks the
stream token and the origin allow-list.

## Still stuck

- `GET https://seedess.com/api/health`
- `GET https://seedess.com/openapi.json`
- `https://seedess.com/docs/`
- `https://seedess.com/docs/libraries/`
