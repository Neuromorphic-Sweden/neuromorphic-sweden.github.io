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

## Landing-page illustration

The public landing page uses `src/components/AdaptiveSpikeMatrixField.astro`, a bidirectional
variant with sparse edge-to-frontend feedback. The unidirectional matrix animation remains in
`src/components/SpikeMatrixField.astro`, and the earlier signal illustration remains unchanged in
`src/components/SignalField.astro`. To restore either backup, change only the `LandingSignalField`
import path in `src/pages/index.astro`.

## Deployment

Pushes to `main` are built and deployed to GitHub Pages by `.github/workflows/deploy.yml`.

AI-assisted additions are prepared by the ignored local service in `.local-discovery/`, proposed
through a `crawler/review` pull request and rendered at `review.neuromorphic-sweden.se` before
publication. See [the reviewer workflow](.github/REVIEW_WORKFLOW.md). Both normal and review builds
keep the public landing page at `/`; the unlisted editorial dashboard is available only at
`/preview/`. A build using `REVIEW_SITE=true` remains globally excluded from search indexing.
