# Post contract

The rules every Seedess post must pass before it is published. These override generic blog advice
where they conflict (length, stock imagery, rhetorical questions, CTA placement).

## Gate 1 — The reader

- [ ] The first 60 words name the reader's symptom, not the category.
- [ ] No product mention before the reader has a model of the problem.
- [ ] Every claim answers "so what for the invoice?".
- [ ] The post would be useful to someone who never buys.

## Gate 2 — The numbers

- [ ] Every number has a label (verified rate, arithmetic, modeled, controlled test, vendor claim,
      internal metric) and a date where it is a rate.
- [ ] The arithmetic is shown for any derived figure.
- [ ] Controlled-test results state n and the method link.
- [ ] No 70%, no "guaranteed savings", no field average that does not exist.
- [ ] Rates match `evidence.md` and the date is in the post.

## Gate 3 — Structure

- [ ] H1 is the promise; deck carries the number.
- [ ] The paragraph after the deck answers the title in 40–60 words.
- [ ] H2s stand alone; a reader who skims only headings gets the argument.
- [ ] Length: 1,100 (exec) / 1,600–1,800 (default) / 2,400 max (decision). No padding to hit a count.
- [ ] One CTA. One product section. One next-post link.
- [ ] FAQ of 3–6 questions with 40–60 word answers where the post poses questions.

## Gate 4 — Visuals

- [ ] 1–3 diagrams, each a different type (flow, bars, waterfall, matrix, timeline).
- [ ] Inline SVG, dark-mode compatible, `role="img"`, `aria-label`, caption, source line.
- [ ] No stock photography, no decorative screenshots.
- [ ] The data in each chart appears in `evidence.md` or is labelled modeled.

## Gate 5 — Voice and hygiene

- [ ] No banned phrases (`phrase-bank.md`).
- [ ] No blockchain, token, on-chain, decentralized, "BitTorrent in the browser".
- [ ] No claim that a player/SDK/feature ships when it does not.
- [ ] Limits stated before the reader asks: native HLS, DRM-strict, ultra-low latency, mobile apps.
- [ ] Headings sentence case; numbers with units; no adjective doing evidence's job.

## Gate 6 — Conversion

- [ ] Ends with the three-part offer: the number, the low-risk action, the proof.
- [ ] The audit is described concretely (invoice, ladder, geography, player).
- [ ] Pilot terms quoted wherever money appears: 30% of verified savings, no fee if zero, cancel
      anytime.
- [ ] Links: `/benchmark/`, `/demo/`, `/pricing/`, and the next post in the sequence.

## Gate 7 — Discoverability

- [ ] Title 50–60 characters where possible; description 150–160.
- [ ] One primary query; two or three secondary; no keyword stuffing.
- [ ] Internal links to the flagship and the next post; external links to primary sources only.
- [ ] BlogPosting + FAQPage schema; author, datePublished, dateModified.
- [ ] Canonical, OG and Twitter tags; `article` OG type.

## Scoring

Score with the generic blog skill's five categories. Publish at 80+. A post that fails any gate above
does not ship regardless of score.

## Review checklist for a second reader

1. Would an engineer forward this to their CTO? Would the CTO understand the number?
2. Is there any sentence a competitor could screenshot as unfair or wrong?
3. Is the product section removable without breaking the post? (It should be.)
4. Does the post still work if the reader's CDN is not one we mentioned?
