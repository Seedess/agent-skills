# Access methods

Seedess has two planes and four ways to reach the control plane. They all hit the same API.

## Credentials

| Credential | Where | Use |
| --- | --- | --- |
| `key_…` API key | Server only | Create/control streams, read metrics |
| `pk_…` public token | Browser | One stream's playback, signaling and config |
| `seedess_session` cookie | Dashboard | Accounts, orgs, metering, invoices |

Base URL: `https://seedess.com`.

Get an API key from the [dashboard](https://dash.seedess.com) → organisation → server keys.
The raw key is shown once.

## Raw REST

```bash
curl -s https://seedess.com/api/v1/streams \
  -H "Authorization: Bearer $SEEDESS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://origin.example/master.m3u8","id":"demo"}'
```

Every operation and schema is in [`api.md`](api.md), [`openapi.json`](openapi.json) and
[`schemas/`](schemas/). Live copies:
`https://seedess.com/openapi.json`, `https://seedess.com/docs/api/`.

## Server SDKs

Best when editing the user's backend. They expose the same eight methods:

```
createStream · getStream · listStreams · refreshStream
disablePeers · enablePeers · getMetrics · sendTelemetry
```

See [`sdks.md`](sdks.md) for install and examples in Node, Python, Go, PHP, Java, Ruby, .NET,
Rust and Elixir. Registry publication is pending; use the GitHub installs shown there.

## Browser bundle

The live, no-build entry is `https://seedess.com/p2p.js`. It exports `createPlayer`, `attach`,
`auto`, `SegmentMesh`, `Signaling`, `sha256Hex` and `DEFAULT_ICE`.

```js
import { createPlayer } from 'https://seedess.com/p2p.js';

const player = await createPlayer(video, { stream: 'demo', token: 'pk_…' });
```

The bundle is built from `@seedess/p2p` (which re-exports `@seedess/hls-p2p`) and is served
with CORS. npm publication of the package is pending. See [`client.md`](client.md).

## MCP

A dedicated Seedess MCP server is **not shipped yet**. The REST/SDK surface above is the
contract it will expose. Do not claim a Seedess MCP tool exists.

## Skill

This directory is the skill. Install it with:

```bash
npx skills add Seedess/agent-skills
```

or copy `skills/seedess` into `.claude/skills/`, `.agents/skills/`, or the directory your
agent reads.
