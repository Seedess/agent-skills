# Seedess Agent Skills

Official [Seedess](https://seedess.com) skills for coding agents — Claude Code, Cursor, Codex,
Amp, and any agent that speaks the [Agent Skills](https://agentskills.io) format.

Seedess makes viewers share the video segments they already watch, so the CDN carries fewer
bytes. The skill lets an agent create the stream, hand the browser a public token, wire
hls.js / Video.js / dash.js, and verify peer offload — using any server SDK or the live
browser bundle.

## Install

```bash
npx skills add Seedess/agent-skills
```

The [Skills CLI](https://skills.sh) installs into whichever agents you use. Add `-g` for a
user-wide install instead of per-project.

## Skills

| Skill | What it does |
| --- | --- |
| [`seedess`](seedess/) | Creates a stream, hands the page a `pk_…` token, wires the player, verifies P2P and reads metrics. Covers every server SDK and every client library. |
| [`seedess-blog`](seedess-blog/) | Writes Seedess blog posts for the engineer who owns the CDN bill: ICP, buying journey, buyer vocabulary, verified 2026 rates, the four levers, claim labels and the post contract. |

## What is in the skills

**seedess**

- `SKILL.md` — the end-to-end setup and operating flow.
- `reference/openapi.json` — OpenAPI 3.1 for every endpoint.
- `reference/schemas/` — the JSON Schemas for every request and response.
- `reference/api.md` — every operation, grouped by tag.
- `reference/access-methods.md` — raw REST vs server SDK vs browser bundle.
- `reference/client.md` — player options, stats and limits.
- `reference/sdks.md` — Node, Python, Go, PHP, Java, Ruby, .NET, Rust and Elixir.
- `reference/troubleshooting.md` — 0 P2P, CORS, TURN, kill switch.
- `scripts/create-stream.mjs` — create a stream and print the handoff.

**seedess-blog**

- `SKILL.md` — the blog voice, reader moment, sequence and gates.
- `references/icp-and-journey.md` — persona, triggers, search intent, objections.
- `references/phrase-bank.md` — buyer phrases, competitor vocabulary, ten hero paragraphs.
- `references/competitor-messaging.md` — how each vendor sells.
- `references/evidence.md` — dated rates, ladder, benchmark results, claim labels.
- `references/post-contract.md` — structure, diagram, CTA and claims gates.
- `templates/brief.md` — the per-post brief template.

## Other ways to install

**Manual**

```bash
git clone https://github.com/Seedess/agent-skills
cp -R agent-skills/seedess .claude/skills/seedess   # or .agents/skills/
```

**Agent prompt** — paste this to your agent:

> Install the Seedess agent skill from
> `https://github.com/Seedess/agent-skills`, then read `seedess/SKILL.md`.

## Links

- [Docs](https://seedess.com/docs/)
- [Libraries](https://seedess.com/docs/libraries/)
- [API](https://seedess.com/docs/api/)
- [OpenAPI](https://seedess.com/openapi.json)
- [Demo](https://seedess.com/demo/)

## License

MIT.
