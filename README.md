# Football scouting technical file — Désiré Doué

A static, interactive scouting report developed by **João Salero** as an educational
exercise for the Professional Diploma in Football Scouting and Tactical Analysis
at Barça Innovation Hub (2026). This is an independent student project; it does not
represent an official club, provider or institution publication.

The report combines season selection, player information, descriptive metrics,
canvas charts and authored scouting observations. It demonstrates a small JavaScript
data model and a browser interface without a framework, backend or external runtime service.

**Historical case study:** the stored figures are manually transcribed snapshots,
not current statistics. The 2025/26 entry is a partial season. Exact source URLs and
extraction dates are not recorded here, so the values cannot be independently reproduced
from this repository. See [data provenance and limitations](DATA_SOURCES.md).

## Run locally

Serve the repository over HTTP so the browser can load its JavaScript modules:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

On Windows, use `py -3 -m http.server 8000 --bind 127.0.0.1` if appropriate for your
Python installation. Open <http://127.0.0.1:8000>. No dependency installation or build
step is required. Opening `index.html` directly through `file://` may block module loading.

For GitHub Pages, publish the repository root. The expected project URL is
<https://joaosalero.github.io/football_scouting_-_analysis/>; this URL is not a
claim that the current deployment has been verified.

## Explore the report

Choose a season from 2022/23 to 2025/26. The identity block, age reference, KPIs,
metric tables and generated summary update together. The charts show all stored
snapshots and remain a historical overview when the selection changes. Goals plus
assists are raw totals, so the partial 2025/26 entry is not directly comparable with
full-season totals. Dragging the pitch marker changes only the visual position and
does not persist a new player role.

The default season uses the fixed **age reference** `2026-01-12`; earlier seasons
use 1 August of the season's start year. This date controls age calculation only.
It is not an asserted data-extraction date or a freshness indicator.

## Data and interpretation

SDR% means successful dribbles divided by attempted dribbles, multiplied by 100.
The denominator is absent from the retained dataset, so displayed SDR rates are
transcribed values rather than recomputed measurements. The numeric interpretation
bands are illustrative exercise thresholds, not measured league averages or validated
European rankings. Scouting text is authored interpretation and should be checked
against video and a complete dataset before recruitment decisions.

## Structure

| File | Responsibility |
| --- | --- |
| `data.js` | Single source for player details, historical snapshots and interpretation thresholds |
| `app.js` | Imports the model and renders controls, tables, summaries and charts |
| `index.html` | Accessible page structure and chart descriptions |
| `styles.css` | Presentation and responsive layout |
| `DATA_SOURCES.md` | Provenance gaps, sampling limits and reuse considerations |

Edit `data.js` to change model values; there is no second dataset in the controller.

## Validation

With Node.js available:

```bash
node --check app.js
node --check data.js
node --test tests/scouting.test.cjs
```

The regression checks exercise default rendering, historical age references, season
changes and the model/controller connection with a minimal DOM harness. They do not
verify external statistics, image rendering, screen-reader behavior or a live deployment.

## License

The repository's original code is available under the [MIT license](LICENSE).
Provider data, institutional names and third-party marks retain their respective
rights; this code license does not establish permission to redistribute external datasets.
