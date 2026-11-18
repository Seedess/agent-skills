---
name: seedess
description: Set up and operate Seedess peer-assisted video delivery end-to-end — create a stream, hand the browser a public token, wire hls.js / Video.js / dash.js, verify peer offload, and read metrics. Use whenever the user wants to cut CDN video egress, add peer-to-peer segment sharing, integrate Seedess into a site or app, or debug why a player is not offloading. Works with every Seedess server SDK (Node, Python, Go, PHP, Java, Ruby, .NET, Rust, Elixir), the browser bundle, and raw REST.
---

# Seedess

Seedess makes viewers share the video segments they already watch. The CDN carries less, the
bill drops, and the player stays the player — a plugin, not a migration.

**Live docs:** [Quickstart](https://seedess.com/docs/quickstart/) ·
[Libraries](https://seedess.com/docs/libraries/) · [Players](https://seedess.com/docs/players/) ·
[API](https://seedess.com/docs/api/) · [OpenAPI](https://seedess.com/openapi.json)

There are **two planes**, and the credential boundary is the most important rule:

| Plane | Runs | Credential | What it does |
| --- | --- | --- | --- |
| **Control plane** | Your server | `key_…` (secret) | Create/refresh/kill streams, read metrics |
| **Data plane** | The browser | `pk_…` (per stream) | Playlists, segments, signaling, ICE config |

**Never put a `key_` in a browser or mobile app.** The page only receives a `pk_` token and
the stream id.

## The 60-second path

### 1. Create a stream (server)

```bash
curl -s https://seedess.com/api/v1/streams \
  -H "Authorization: Bearer $SEEDESS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://origin.example/master.m3u8","id":"demo"}'
```

Response (abridged):

```json
{
  "ok": true,
  "id": "demo",
  "publicToken": "pk_…",
  "playback": {
    "master": "/play/demo/master.m3u8?token=pk_…",
    "signaling": "/signaling/room/demo?token=pk_…"
  }
}
```

Keep `id` and `publicToken`; make the playback URLs absolute against `https://seedess.com`.

### 2. Expose only the handoff to the page

```js
// Your own endpoint, e.g. GET /api/seedess/demo
res.json({ stream: 'demo', token: 'pk_…' });
```

### 3. Play it in the browser

The live browser bundle is `https://seedess.com/p2p.js`. It is built from `@seedess/p2p`
and exports `createPlayer`, `attach`, `auto`, `SegmentMesh`, `Signaling`, `sha256Hex`.

```html
<script src="https://cdn.jsdelivr.net/npm/hls.js@1"></script>
<script type="module">
  import { createPlayer } from 'https://seedess.com/p2p.js';

  const { stream, token } = await fetch('/api/seedess/demo').then((r) => r.json());

  const player = await createPlayer(document.querySelector('video'), { stream, token });

  player.on('stats', (stats) => {
    console.log('p2p', stats.p2pBytes, 'cdn', stats.httpBytes, 'peers', stats.peers);
  });
</script>
```

Already using hls.js? Patch it once:

```js
import { auto } from 'https://seedess.com/p2p.js';

auto({ stream: 'demo', token: 'pk_…' });

const hls = new Hls();
hls.loadSource(masterUrl); // your existing manifest
hls.attachMedia(video);
```

### 4. Verify

Open the page in two tabs. A healthy run shows `p2pBytes` growing in the second tab,
`httpBytes` growing only on fallback, `peers` at least 1, and `fallbacks`/`hashFailures` near
zero. If `p2pBytes` stays at zero, check `turn: true` in `/signaling/config`; most failed
P2P is STUN-only NAT, not the player.

## Which library to use

### Server SDKs (`*-sdk`)

Use these when you are editing the user's backend. They all expose the same surface:

```
createStream · getStream · listStreams · refreshStream
disablePeers · enablePeers · getMetrics · sendTelemetry
```

| Language | Repository | Install while the registry is pending |
| --- | --- | --- |
| Node.js | `Seedess/node-sdk` | `npm install github:Seedess/node-sdk` |
| Python | `Seedess/python-sdk` | `pip install git+https://github.com/Seedess/python-sdk` |
| Go | `Seedess/go-sdk` | `go get github.com/Seedess/go-sdk` |
| PHP | `Seedess/php-sdk` | Composer VCS repository (Packagist pending) |
| Java | `Seedess/java-sdk` | build from source / Maven pending |
| Ruby | `Seedess/ruby-sdk` | `gem 'seedess-sdk', git: 'https://github.com/Seedess/ruby-sdk'` |
| .NET | `Seedess/dotnet-sdk` | project reference / NuGet pending |
| Rust | `Seedess/rust-sdk` | `seedess-sdk = { git = "https://github.com/Seedess/rust-sdk" }` |
| Elixir | `Seedess/elixir-sdk` | `{:seedess_sdk, git: "https://github.com/Seedess/elixir-sdk"}` |

Method names follow the language: camelCase (JS/TS, PHP, Java, Kotlin, Swift, Dart),
snake_case (Python, Ruby, Rust, Elixir), PascalCase with `Async` (.NET). `disablePeers` maps
to `POST /kill`; `enablePeers` maps to `POST /revive`.

### Player packages (`*-p2p`)

| Player | Integration | P2P? |
| --- | --- | --- |
| hls.js | `createPlayer` / `attach` / `auto` | Yes |
| Video.js with an hls.js tech | `player.seedess({ stream, token })` | Yes |
| dash.js | `@seedess/dash-p2p` + `sw.js` | Yes (Service Worker) |
| Native HLS (Safari/iOS) | none | No — stays on CDN |
| Video.js VHS | none | No — no-op |
| Shaka / native mobile | — | Not shipped |

`auto()` only patches seams a player exposes. It never claims a player it cannot wrap.

## The rest of the lifecycle

- **Live streams** do not refresh themselves. Call `refreshStream(id)` on the segment cadence.
- **Kill switch:** `disablePeers(id)` forces the CDN and keeps playback.
- **Controls:** the dashboard/API sets `offloadCap`, `allowedOrigins`, `meteredDefault`.
- **Telemetry:** `POST /api/v1/telemetry` with `sessionId`, `streamId`, `cdnBytes`, `p2pBytes`,
  `fallbacks`, `hashFailures`, `peers`. Best-effort; 204 always.
- **Metrics:** `getMetrics(id)` returns CDN bytes, P2P bytes, offload %, failures, peers,
  sessions.

## Reference files

- [reference/access-methods.md](reference/access-methods.md) — raw REST vs server SDK vs
  browser bundle vs MCP, with credentials.
- [reference/api.md](reference/api.md) — every operation, grouped by tag.
- [reference/openapi.json](reference/openapi.json) — OpenAPI 3.1 for tools and agents.
- [reference/schemas/](reference/schemas/) — the JSON Schemas for every request and response.
- [reference/client.md](reference/client.md) — player options, stats and limits.
- [reference/sdks.md](reference/sdks.md) — per-language methods and examples.
- [reference/troubleshooting.md](reference/troubleshooting.md) — 0 P2P, CORS, TURN, kill switch.

## Gotchas

- **Package publication is pending.** The browser bundle at `https://seedess.com/p2p.js` is
  live; npm/PyPI/etc. may still be empty. Use the GitHub installs above and say so.
- **CORS:** `/play/*`, `/signaling/config`, `/demo/config` and `/p2p.js` allow cross-origin.
  If a custom host blocks them, the player falls back to the CDN.
- **TURN:** without a TURN relay, symmetric NAT peers cannot connect. Check `turn: true` and
  `iceServers` in `/signaling/config`.
- **Native mobile cannot offload today.** A Swift/Kotlin/Flutter client can manage streams and
  playback URLs, but not P2P.
- **The stream id is the room.** Use `{ stream, token }` rather than three URLs.
- **Do not re-encode or fork the player.** The adapter only replaces the fragment fetch.
