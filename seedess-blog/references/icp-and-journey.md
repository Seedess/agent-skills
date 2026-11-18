# ICP and buying journey

## Primary reader

| Attribute | Detail |
| --- | --- |
| Role | Head of Engineering, VP Engineering, CTO, Head of Video/Streaming, Principal Video Engineer |
| Company | Mid-market consumer video: OTT, e-learning, creator/UGC, live events and replay, fitness, faith, niche sports |
| Scale | 5M–100M viewer-minutes/month; ≥$10k/month delivery; 10–200 engineers |
| Stack | hls.js / Shaka / video.js; HLS or DASH; CloudFront, Bunny, Cloudflare Stream, Fastly, Mux or api.video |
| Exclusions | DRM-strict (Widevine L1, premium studio), betting-grade latency, enterprise internal video, sub-1M viewer-minutes, token shoppers |
| Success | Lower delivery cost, same player, numbers finance accepts |

## Secondary reader

CFO, VP Finance, Head of Procurement. Reads one page: current spend, verified offload, new spend, risk,
exit. Post 10 exists for them.

## What put them on the page

- A bill that doubled after a launch or a hit title.
- A board or CFO request to cut cloud spend.
- Video margin negative or thin; "every new viewer costs us money".
- CDN renewal or AWS commitment negotiation.
- A latency or quality project that quietly raised delivery cost.
- A competitor launched cheaper and they need unit economics to match.

## Where they are in the decision

They have accepted the problem. They are inside ~30 days of choosing. They are comparing, usually
without naming it:

| Option | Real content | Who sells it |
| --- | --- | --- |
| Do nothing | Absorb, renegotiate at renewal | The incumbent CDN |
| Switch/add CDN | Lower $/GB, multi-CDN | Bunny, CloudFront, Fastly |
| Lower bytes per viewer | Ladder, per-title, codec | Mux, Bitmovin, in-house |
| Cut duplicate delivery | Cache, shield, TTLs | Fastly, Cloudflare, in-house |
| Change who delivers | Peer offload | Seedess, Lumen, Hive, Novage, CDNBye |

Seedess is the fifth and stacks on the first four.

## Search intent map

| Intent | Query shape | Post |
| --- | --- | --- |
| Diagnose | "why is my CDN bill so high", "cloudfront egress too expensive", "video streaming cost per GB" | 1 |
| Compare | "cheapest CDN for video", "bunny vs cloudfront", "cloudflare stream vs mux" | 1, 6 |
| Reduce | "how to reduce video streaming costs", "cut CDN costs" | 1, 6 |
| Technical | "hls bitrate ladder cost", "does lowering bitrate save money", "multi-cdn worth it" | 3, 4 |
| Latency | "low latency hls cost", "ll-hls vs ll-dash" | 5 |
| Category | "peer assisted delivery", "p2p cdn", "webrtc video offload", "p2p streaming privacy" | 2, 9 |
| Procurement | "p2p cdn pricing", "cdn savings share", "video delivery pilot" | 7, 8, 10 |

## The three actions content should cause

1. Run the 20-minute bill audit (invoice, ladder, geography, player stack).
2. Open the two-tab test on their own stream.
3. Forward the one-page case to the budget owner.

Anything larger is a sales conversation, not a blog post.

## Objections to pre-empt in every relevant post

| Objection | Answer |
| --- | --- |
| "We were going to switch CDN anyway" | Rate is one lever; switching costs weeks and saves a rate delta |
| "P2P sounds flaky" | The CDN is the floor; peers are tried first inside a hedge window; hash failure falls back |
| "Who supports it?" | One adapter, per-stream kill switch, metrics, one-line rollback |
| "iOS?" | Native HLS cannot be intercepted; those sessions stay on the CDN |
| "DRM?" | Segments stay encrypted; peers relay ciphertext; check contractual caching limits |
| "Privacy?" | Peers see IPs inside the swarm; scope rooms, use TURN, disclose, offer opt-out |
| "I can't get a new line item approved" | 30% of verified savings, no fee if savings are zero, cancel anytime |
