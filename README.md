# Neuromorphic Sweden

Public website for the neutral Swedish neuromorphic research and innovation ecosystem.

## Routes

- `/` — public landing page
- `/technology/` — introduction to neuromorphic technology
- `/focus-areas/` — strategic focus areas
- `/ecosystem/` — national ecosystem overview
- `/activities/` — project and workshop history
- `/resources/` — reports and project records
- `/resources/all/` — all published AI-assisted resources and tools, newest first
- `/about/` — purpose, principles and contact information
- `/preview/` — unlisted editorial review dashboard for crawler proposal branches

## Development

The project requires Node.js 22.12 or newer. Node.js 24 is used for GitHub Pages deployment.

```sh
npm install
npm run dev -- --background
```

Manage the background development server with:

```sh
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

Build the static site with:

```sh
npm run build
```

## Brand and illustrations

The unlinked advisory design preview at `/advisory-preview/` uses the Cortex Core artwork extracted
from the supplied design concept in `public/images/cortex-core-logo-concept.png`, paired with the
nanostructured wafer artwork in `public/images/cortex-core-nanostructured-wafer-v1.webp`. Its layout,
header, footer, palette and raster favicon are isolated from the current public homepage through
`src/layouts/AdvisoryPreviewLayout.astro`. The preview is marked `noindex, nofollow` and is not linked
from the public navigation. A code-native Cortex Core version remains available for decorative use
in `src/components/CortexCoreMark.astro`.

The Technology page uses the responsive, CSS-only signal-to-structure illustration in
`src/components/SignalToStructureField.astro`. The earlier adaptive and unidirectional versions
remain preserved in `src/components/AdaptiveSpikeMatrixField.astro` and
`src/components/SpikeMatrixField.astro`; the original signal illustration remains unchanged in
`src/components/SignalField.astro`.

## Deployment

### Local selection before GitHub upload

New crawler records remain pending in the ignored SQLite database until selected locally.
In one terminal, run the local Python review API:

```sh
.local-discovery/.venv/bin/python .local-discovery/crawler_service.py review
```

In another terminal, restart Astro in opt-in local review mode:

```sh
npm run astro -- dev stop
LOCAL_REVIEW=true npm run dev -- --background
```

Open `http://localhost:4321/preview/`. **Keep for upload** selects a record, **Discard** suppresses
its current content version, and the optional permanent checkbox suppresses its URL. Detail-page
decisions advance to the next pending record. Kept records remain visible and can be returned
to pending or discarded before upload. Decisions survive server restarts in local SQLite.

No draft JSON is written into `src/content/discovery/` during local review, so the public pages
at `/`, `/resources/`, etc. remain unaffected. Upload only the kept records with the existing
`publish-review` command, then merge that pull request on GitHub to publish. Pending and
discarded records are never exported. Keep is selection, not a factual guarantee of AI prose.

The review API binds only to `127.0.0.1:8765`; Astro must remain on localhost port 4321 (do not
use `--host`). Writes require a same-origin request and a per-session token. It exposes no Git
or publication operations. `LOCAL_REVIEW` is effective only during development; production
builds remain static and existing GitHub review links continue to work. Python code stays ignored.

If another server occupies 4321, stop it first or match `review --review-web-port 4324` with
`LOCAL_REVIEW=true npm run dev -- --background --port 4324`. Check Astro's startup address.
For an exhausted inotify watcher limit, add `CHOKIDAR_USEPOLLING=true` to the Astro command.

### GitHub Pages

Pushes to `main` are built and deployed to GitHub Pages by `.github/workflows/deploy.yml`.

AI-assisted additions are prepared by the ignored local service in `.local-discovery/`, proposed
through a `crawler/review` pull request and rendered at `review.neuromorphic-sweden.se` before
publication. See [the reviewer workflow](.github/REVIEW_WORKFLOW.md). Both normal and review builds
keep the public landing page at `/`; the unlisted editorial dashboard is available only at
`/preview/`. A build using `REVIEW_SITE=true` remains globally excluded from search indexing.
