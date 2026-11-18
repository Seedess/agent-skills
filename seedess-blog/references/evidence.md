# Evidence and allowed claims

Every number in a Seedess post must be labelled as one of: **verified rate**, **arithmetic**,
**modeled**, **controlled test**, **vendor claim**, **internal metric**. If it is none of these, do not
publish it until a source is fetched and added here.

## 1. Delivery rates (verified 13 November 2026)

First-tier data transfer out, North America / Europe, unless noted.

| Provider | Rate | Notes | Source |
| --- | --- | --- | --- |
| Bunny CDN Standard | $0.01/GB NA/EU | $0.03 Asia/Oceania, $0.045 South America, $0.06 ME/Africa, 119 PoPs, $1/mo minimum | bunny.net/pricing/cdn |
| Bunny CDN Volume | $0.005/GB | 10 PoPs; $0.004 from 500 TB, $0.002 from 1 PB | bunny.net/pricing/cdn |
| Cloudflare Stream | $1 per 1,000 min delivered | Storage $5/mo per 1,000 min; no egress fee; 4-second segments | developers.cloudflare.com/stream/pricing |
| AWS CloudFront | $0.085/GB | First 10 TB; 1 TB/month always free; request fees extra | egresscost.com/cdn-pricing |
| Fastly | $0.12/GB | 100 GB free/region/month; $0.19–$0.28 in parts of Asia/Africa/India | egresscost.com/cdn-pricing |
| Google Cloud CDN | $0.08/GiB cache egress | Plus $0.01/GiB cache fill, lookups; billed in GiB | egresscost.com/cdn-pricing |
| Azure Front Door | $0.0825/GB | Plus $35/mo Standard base; Zone 1 | egresscost.com/cdn-pricing |
| S3 direct egress | $0.09/GB | Comparison point only | egresscost.com/cdn-pricing |
| Mux | $0.001/min delivery | After 100,000 free minutes/month; storage $0.003/min/month | mux.com/pricing.md |

Date-stamp every table. Rates change; a 2025 rate in a 2026 post is a credibility failure.

## 2. Bitrate ladder (verified specification)

Apple HLS authoring specification, 16:9 H.264 variants:

| Resolution | Bitrate |
| --- | --- |
| 1920×1080 | 6,000 and 7,800 kbps |
| 1280×720 | 3,000 and 4,500 kbps |
| 960×540 | 2,000 kbps |
| 768×432 | 730 and 1,100 kbps |
| 640×360 | 365 kbps |

Source: developer.apple.com HLS authoring specification. These are "one possible set", not a mandate —
say that.

## 3. Arithmetic conversions

- 1 hour at 5 Mbps ≈ 2.25 GB (5 Mbps × 3,600 s ÷ 8 = 2,250 MB).
- 25M viewer-minutes = 416,667 stream-hours.
- 416,667 stream-hours × 2.25 GB ≈ 937,500 GB ≈ 938 TB.
- At $0.085/GB ≈ $79,700/month; at $0.01/GB ≈ $9,400/month. Range: **$9.4k–$79k**.
- 40% offload at $0.085/GB removes ~$31,900/month; fee at 30% of savings ~$9,600.

Label as **arithmetic** or **modeled**, never as measured.

## 4. Seedess controlled test (controlled test, n=1–2)

From https://seedess.com/benchmark/ — one seeder plays first, one leecher joins after, SHA-256
verification, CDN fallback beyond the hedge window:

| Proof | Leecher offload | Peer / CDN bytes | Hash failures | Runs |
| --- | --- | --- | --- | --- |
| Static VOD · HLS fMP4 | 100% | 8.8 MB / 0 | 0 | 1 |
| Live HLS loop · hls.js | 100% | 5.3 MB / 0 | 0 | 1 |
| Existing manifest · HLS proxy | 100% | — | 0 | 2 |
| Low-latency DASH · buffered | 54% | 3.6 MB / 3.0 MB | 0 | 1 |
| Low-latency DASH · thin buffer | 94% | with rebuffering | 0 | 1 |

Always state the sample size. Never call this a field average.

## 5. Planning assumption

**40% offload** — used in the homepage comparison, pricing model and posts. It is a planning number
chosen to be defensible, not the maximum. The pilot replaces it with a measured number.

## 6. Industry claims (vendor claim — label, do not adopt)

| Claim | Source |
| --- | --- |
| 55–85% delivery-cost reduction | Lumen/Streamroot (via Partech, Lumen release; recorded in docs/market-research.md) |
| Up to 80% VOD bandwidth savings | Novage |
| ~$0.50/user/month; single events from ~$985 | Hive Streaming pricing summaries |
| Peer offload bundled into Teams | Microsoft eCDN (Peer5, acquired 2021) |

## 7. Structural facts usable as evidence

- Netflix Open Connect embeds cache appliances in 1,000+ ISP networks and runs 60+ data centres to
  localise delivery and avoid transit. Source: openconnect.netflix.com. Use it to show that moving
  bytes closer to viewers is the established cost strategy, not a novelty.
- CDNBye describes its engine as "let your viewers become your unlimitedly scalable CDN" and supports
  HLS/VOD with WebRTC data channels. Source: github.com/cdnbye/hlsjs-p2p-engine.
- Novage states public trackers handle ~1,000–2,000 concurrent viewers without server software.
  Source: github.com/Novage/p2p-media-loader. Use for the commoditisation point.

## 8. What we do not have (say so)

- No field benchmark with real customer traffic yet.
- No measured savings distribution across geographies.
- No published third-party audit of offload.
- No mobile native P2P.

Posts that mention savings must not imply these exist.

## 9. Claim labels cheat sheet

| Label | Means | Example |
| --- | --- | --- |
| Verified rate | Taken from the provider's page on a stated date | "$0.085/GB (CloudFront, 13 Nov 2026)" |
| Arithmetic | Multiplication of the reader's own inputs | "2.25 GB per stream-hour at 5 Mbps" |
| Modeled | Arithmetic plus stated assumptions | "$9.4k–$79k per month at 25M viewer-minutes" |
| Controlled test | Our two-peer test, n stated | "100% offload, n=1" |
| Vendor claim | Someone else's number, attributed | "Lumen claims 55–85%" |
| Internal metric | Seedess's own product data, dated | "median offload across pilot streams" |
