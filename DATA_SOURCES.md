# Data provenance and limitations

## What is retained

`data.js` contains manually transcribed historical player and season figures plus
the author's scouting text. The previous project documentation named **Sofascore**
for season statistics, **FFF** for national-team information, **Paris Saint-Germain**
for club information and **LinkedIn** for public profile references. Those are
historical attribution statements, not a verified per-field source map.

Exact source pages, retrieval timestamps, original screenshots, competition filters
and provider definitions are not included in this repository. Consequently, the
figures cannot be audited against their original snapshots here. No new collection,
live feed or verification of current player statistics is claimed.

## Interpretation limits

- The 2025/26 entry contains eight appearances and is a partial-season sample.
  Do not compare its raw totals with full-season totals as a performance trend.
- The frozen date `2026-01-12` is used for age calculation, not proof that every
  statistic was collected on that date. Market value, national-team appearances,
  shirt number and physical details are static historical entries as well.
- Successful-dribble attempts are not retained. The stored success rates cannot
  be recomputed from the successful-dribble counts alone.
- The percentage bands are illustrative author-selected exercise thresholds.
  No league cohort, distribution, sampling method or validated percentile is supplied.
- Scouting observations are qualitative interpretation. They are not outputs of a
  predictive model, and the historical figures do not establish an elite ranking.
- Provider totals and separately rounded expected metrics may differ at the last
  decimal place. Existing xGI entries are retained as transcribed; no unsupported
  correction or reconstruction of source precision has been made.
- Position, tactical role, minutes, competition definitions and opponent strength
  can affect comparison. This page does not control for those factors.

## Reuse and future updates

Public availability is not proof of a right to redistribute provider data. The MIT
license applies to original code, not third-party data or trademarks. Check provider
terms and applicable permissions before adding or redistributing source material.
No endorsement by Barça Innovation Hub, clubs or statistics providers is implied.

For a verifiable dataset update, record each field's exact source URL, competition
and season filter, retrieval date, provider definition and permitted reuse terms.
Preserve only source material you are authorized to retain. Keep incomplete samples
explicitly marked and distinguish calculated indicators from transcribed values.
