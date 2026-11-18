---
name: seedess-blog
description: Write and brief Seedess blog posts for video-platform engineering leaders who are cutting delivery costs — the ICP, the buying moment, their exact vocabulary, the four levers on a CDN bill, verified pricing, and the proof/data rules. Use when writing, briefing or reviewing a Seedess blog post, planning the content sequence, or turning a cost objection into an article. Pairs with the blog skill for mechanics; this skill supplies the market, the voice and the claims discipline.
---

# Seedess blog

Seedess sells peer-assisted video delivery to the person who owns the CDN bill. This skill is the
market and voice layer for that blog: who reads it, what they say, what we may claim, and how each
post is built.

It does not replace the generic `blog` skill (briefs, outlines, SEO, schema, scoring). Load that for
mechanics; load this for the market, the wording and the rules.

## The reader, in one paragraph

Head of Engineering, VP Engineering or CTO at a mid-market consumer video platform — OTT, e-learning,
creator/UGC, live events, fitness, faith, niche sports — doing 5M–100M viewer-minutes a month and
spending ≥$10k/month on delivery. Web player on hls.js, Shaka or video.js. Not DRM-strict. They have
the invoice, they have a decision inside 30 days, and they are comparing five options they have not
named. They do not search for "peer-assisted delivery"; they search for why the bill is high.

## The moment

Solution-aware, category-confused, evaluating. The four levers on the bill:

1. **Rate** — what you pay per byte (switch, renegotiate, committed use).
2. **Bytes per viewer** — the ladder, codec, playback policy.
3. **Duplicate bytes** — cache fill, multi-CDN, short TTLs, origin shield.
4. **Who delivers** — peers share segments viewers already fetched.

Seedess is lever 4 and stacks on 1–3. Every post should price the levers honestly before it mentions
us.

## Voice

- Engineer-to-engineer. Short sentences. Numbers with units. No adjectives doing the work of evidence.
- Write like their Slack channel, not a landing page.
- Lead with the symptom and the number; never with the category.
- State limits before the reader finds them. That is the credibility mechanism.
- One product mention per post, late, after the reader has the model.

**Banned:** revolutionary, game-changing, unlock, supercharge, seamless, effortless, cutting-edge,
"in today's digital landscape", "delve", "moreover", "it's not just X, it's Y", "the future of video".
**Never:** blockchain, token, on-chain, decentralized, "BitTorrent in the browser", "70% savings",
a savings number without its label.

## Structure contract

Every post ships with:

| Element | Rule |
| --- | --- |
| H1 + deck | H1 is the search-shaped promise; deck is one sentence with the number |
| Answer-first | The first paragraph after the deck answers the title in 40–60 words |
| H2s | Question or claim, each standalone; the reader skims |
| Length | 1,100 (exec) to 2,400 (decision); 1,600–1,800 default. No padding |
| Data | Every number has a label: verified rate, arithmetic, modeled, controlled test, vendor claim |
| Diagrams | 1–3 inline SVG, different types, `role="img"`, aria-label, caption, source |
| CTA | One: bill audit; secondary: benchmark/demo; then the next post |
| Proof | Link `/benchmark/` and `/demo/`; never assert a result without the method |
| Schema | BlogPosting + FAQPage where the post has questions |

Full rules: [references/post-contract.md](references/post-contract.md).

## The sequence

1. What your video delivery bill is made of (flagship, hub)
2. How much of your bill can peers actually carry?
3. Your bitrate ladder is a cost decision
4. The redundancy tax
5. The latency bill
6. Four ways to cut a video bill (decision)
7. You do not have to migrate
8. Run a pilot your CFO will approve
9. Six questions engineers ask first
10. The one-page case (exec)

Briefs: [`docs/blog/02-post-briefs/`](../../docs/blog/02-post-briefs/). Publish order:
1 → 6 → 2 → 8 → 9 → 3 → 4 → 5 → 7 → 10.

## How to use this skill

**Writing a post from a brief**

1. Read the brief in `docs/blog/02-post-briefs/`.
2. Load [references/evidence.md](references/evidence.md) — use only those numbers, with their labels.
3. Load [references/phrase-bank.md](references/phrase-bank.md) — heroes and buyer language.
4. Draft to the structure contract. Add the diagrams the brief asks for.
5. Check every claim against `evidence.md`. Any number not there needs a source fetched and added.
6. Run the generic `blog` skill's SEO/quality pass, then the gates in `post-contract.md`.

**Briefing a new post**

Copy `templates/brief.md`, fill hero → middle → ending → diagrams → sources → claims → CTA. Add it to
the sequence in `docs/blog/02-post-briefs/README.md` with its role in the journey.

**Reviewing**

Score against the gate table. A post fails if it has an unlabelled number, a banned phrase, a product
mention before the model, or a claim that outruns the evidence.

## Where we fit, in one line

Not a CDN, not an encoder, not a migration: the only lever measured on the buyer's own bill, stacked
on whatever they already run.

## References

- [references/icp-and-journey.md](references/icp-and-journey.md) — persona, triggers, disqualifiers, search intent
- [references/phrase-bank.md](references/phrase-bank.md) — buyer phrases, competitor vocabulary, 10 hero paragraphs
- [references/competitor-messaging.md](references/competitor-messaging.md) — how each vendor sells, and the gap
- [references/evidence.md](references/evidence.md) — verified rates, ladder, benchmark results, allowed claims
- [references/post-contract.md](references/post-contract.md) — structure, diagram, CTA and claims gates
- [templates/brief.md](templates/brief.md) — one-page brief template

## Related Seedess assets

- Docs: https://seedess.com/docs/ · Libraries: https://seedess.com/docs/libraries/
- Benchmark method: https://seedess.com/benchmark/ · Demo: https://seedess.com/demo/
- Pricing: https://seedess.com/pricing/ · OpenAPI: https://seedess.com/openapi.json
- Agent skill: https://github.com/Seedess/agent-skills
