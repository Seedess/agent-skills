# Browser client

The browser bundle is `https://seedess.com/p2p.js`. It is an ES module, served with CORS, and
built from `@seedess/p2p` → `@seedess/hls-p2p`. hls.js is a peer: load it first.

```html
<script src="https://cdn.jsdelivr.net/npm/hls.js@1"></script>
<script type="module">
  import { createPlayer } from 'https://seedess.com/p2p.js';
  const player = await createPlayer(document.querySelector('video'), {
    stream: 'demo',
    token: 'pk_…',
  });
</script>
```

## The two entry points

| Entry | Use |
| --- | --- |
| `createPlayer(video, { stream, token })` | One player. Returns a controller immediately. |
| `auto({ stream, token })` | Patch every hls.js player created after the call. |

`attach(hls, { stream, token })` is the explicit form when you already have an `Hls` instance.
Call it before `loadSource()`.

`{ stream, token }` derives the master, signaling and config URLs. Explicit
`signalingUrl`/`configUrl`/`origin` still win.

## Player support

| Player | Works? | How |
| --- | --- | --- |
| hls.js | Yes | `createPlayer`, `attach`, `auto` |
| Video.js with an hls.js tech | Yes | `player.seedess({ stream, token })` |
| Video.js VHS | No | No `Hls` instance; no-op |
| dash.js | Yes | `@seedess/p2p/dash` + `sw.js` |
| Safari native HLS | No | No interceptable seam; CDN |
| Shaka | No | Not shipped |
| Native iOS/Android | No | No native mesh |

## Options

| Option | Default | Meaning |
| --- | --- | --- |
| `stream` | — | Stream id. Also the room. |
| `token` | — | Per-stream public token (`pk_…`). |
| `origin` | `https://seedess.com` | Base for derived URLs. |
| `signalingUrl` / `configUrl` | derived | Advanced full URLs. |
| `room` | stream | Signaling sub-room (the server scopes it to the stream). |
| `peerId` | random | Identity within the room. |
| `role` | `peer` | `seed` always reads the origin and never requests peer bytes. |
| `verifyMode` | `auto` | `sha256`, `size`, or `auto`. |
| `requestTimeout` | `30000` | Per-peer timeout before origin fallback. |
| `haveWaitMs` | `800` | Grace for a peer bitfield. |
| `hedgeDelay` | `1000` | Delay before the CDN fetch starts in parallel. Raise over TURN. |
| `iceServers` | config | Override `/signaling/config`. |
| `hlsConfig` | `{}` | Passed to `new Hls()`. |
| `profile` | `false` | Per-segment route logs. |

## Controller

`createPlayer`/`attach` return:

| Member | Meaning |
| --- | --- |
| `stats` | p2pBytes, httpBytes, segmentsP2P, segmentsHttp, hashFailures, unverified, fallbacks, peers, connectedPeers, error |
| `on('stats', fn)` | Subscribe; returns an unsubscribe function. |
| `waitForPeers(ms)` | Resolve true when a peer joins. |
| `waitForOpenPeer(ms)` | Resolve true when a data channel is open. |
| `waitForHave(seq, ms)` | Resolve true when a peer has that segment. |
| `destroy()` | Close sockets and stop the mesh. |

## Two playback modes

- **Seedess-hosted:** the player loads `/play/:id/master.m3u8`; Seedess serves segments.
- **Overlay:** the player keeps your manifest; peers share your CDN segments. A stream record
  is still required for the room and token.

## Verification

Two tabs on the same stream: the second should show `p2pBytes > 0` and `peers >= 1`. If not,
read [`troubleshooting.md`](troubleshooting.md).
