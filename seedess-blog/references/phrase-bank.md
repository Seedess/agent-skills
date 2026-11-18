# Phrase bank

Long form with sources and the ten hero paragraphs: [`docs/blog/01-phrase-bank.md`](../../../docs/blog/01-phrase-bank.md).
This file is the working subset.

## The buyer's words

**Diagnosis**

- "Our CDN bill is the second-largest line item after payroll."
- "Egress is what kills us, not storage."
- "The bill scales linearly with viewers."
- "We're paying to send the same bytes 20,000 times."
- "Every new viewer costs us money."
- "We can't grow into the model."
- "Video is a negative-margin product for us."
- "It's fine until you hit scale."

**Evaluation**

- "What does it actually save on our traffic?"
- "I can't take a 40% risk to save 40%."
- "Who supports this at 2am?"
- "What happens when the peer isn't there?"
- "Does it touch the player?"
- "Show me the invoice, not the deck."
- "I need something I can put in front of finance."

**Engineering**

- "Our ladder tops out at 7.8 Mbps for 1080p."
- "The 1080p rung carries most of the bytes."
- "We're paying for cache fill we never budgeted for."
- "Multi-CDN gave us failover, not savings."
- "P2P sounds great until you have to debug it in production."

**Finance**

- "What's the cost per delivered hour?"
- "What's the payback period?"
- "Is this a new line item or a reduction?"
- "What's the exit if it doesn't work?"

## Vocabulary substitutions

| Not this | This |
| --- | --- |
| P2P CDN | peer-assisted delivery |
| hybrid CDN | the CDN plus the viewers |
| eCDN | (avoid — enterprise internal video) |
| bandwidth savings | CDN bytes billed |
| mesh network | peers on the same stream |
| decentralized / Web3 | (never) |

## The ten heroes (verbatim)

### 1. The bill is four meters wearing one number

> Your CDN invoice looks like a single number. It is at least four: bytes delivered, requests served,
> cache filled from origin, and the rate you negotiated per region. Most teams optimise the third
> decimal of the rate while the first two meters run unmanaged. Before you switch providers, price the
> meters — because the cheapest CDN in the market cannot fix a bill that is mostly bytes you did not
> need to send.

### 2. The cheapest byte is the one a viewer already has

> Every viewer on your platform has already downloaded the segment they are watching. On a popular
> stream, the same four-second fragment is fetched thousands of times, from an edge you pay for, to
> people who could have handed it to each other. Peer-assisted delivery is not a new CDN. It is the
> decision to let the audience carry the part of the load it already holds.

### 3. You can cut the bill without touching the player

> The reason video delivery costs are hard to fix is that every fix looks like a migration: a new CDN,
> a new encoder, a new player, a new quarter of engineering time. There is a smaller change. Keep the
> player. Keep the CDN. Add one adapter that lets viewers serve the segments they already fetched, and
> measure what the CDN no longer bills.

### 4. Your ladder is a cost decision disguised as a quality decision

> A 1080p H.264 rung is specified at 6 to 7.8 Mbps. A 360p rung is 0.365 Mbps. Every viewer who sits
> on the top rung costs roughly twenty times what a viewer on the bottom rung costs, and on most
> catalogues the top rung is where the bytes are. The ladder was designed to protect quality. It is
> paid for like a budget line. Both statements are true, and only one of them is usually measured.

### 5. Latency is the most expensive feature you ship

> Low latency is not free. It shows up as shorter segments, more requests, thinner buffers, more cache
> misses and a higher rebuffering risk — all of which land on the same invoice as your video. The
> question is not whether low latency is worth it. It is which minutes of your product actually need
> it, and what the other minutes are paying for it.

### 6. Four ways to cut a video bill

> There are exactly four levers on a video delivery bill: the rate you pay per byte, the bytes each
> viewer needs, the bytes you deliver twice, and who delivers them. Every vendor in this market sells
> one lever and implies the others do not exist. A serious evaluation prices all four against your own
> traffic, then picks the combination that leaves the player, the encoding and the provider intact.

### 7. Migration is the most expensive way to save 10%

> Switching CDNs feels like progress: a new contract, a lower rate, a migration plan. Then the
> engineering starts — signed URLs, token auth, origin rules, DRM, failover, dashboards, the long tail
> of edge cases — and the saving arrives months later, at whatever the new rate turns out to be after
> the introductory tier. If the goal is a smaller bill, there is a shorter path that does not require
> moving a single byte of origin.

### 8. Ask for a pilot, not a platform

> No engineering leader should sign a delivery contract on a vendor's average. The only number that
> matters is the offload on your traffic, your geography and your player. That is measurable in thirty
> days, on a share of production traffic, with the CDN bill as the referee. If the saving is zero, you
> should pay zero. Anything else is a leap of faith with your name on the purchase order.

### 9. The first question is not whether P2P works

> It does work; the open-source engines are free and the enterprise vendors have sold it for a decade.
> The useful question is what happens when it does not: when the peer is behind symmetric NAT, when the
> segment is corrupt, when the viewer is on iOS, when the room is empty at 3am. A delivery layer is
> judged by its fallback, not its best case.

### 10. Your CFO does not need a CDN strategy

> They need one number: what the same product costs to deliver next quarter, and what changes if you do
> nothing. Everything else — PoPs, codecs, peers, protocols — is an implementation detail that belongs
> in the appendix. The strongest internal case for changing delivery is a single page: current spend,
> verified offload, new spend, risk, exit.

## Hero to post

1 → 1 · 2 → 2 · 4 → 3 · 1 variant → 4 · 5 → 5 · 6 → 6 · 7 → 7 · 8 → 8 · 9 → 9 · 10 → 10.
Hero 3 is the short-form/social opener.

## Banned

revolutionary · game-changing · unlock · supercharge · seamless · effortless · cutting-edge · "in
today's digital landscape" · delve · moreover · "it's not just X, it's Y" · "the future of video" ·
blockchain · token · on-chain · decentralized · "BitTorrent in the browser" · "70%" · "guaranteed
savings" (unless the pilot terms are quoted in the same sentence).
