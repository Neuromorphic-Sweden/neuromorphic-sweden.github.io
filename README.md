# Neuromorphic Sweden

Public website for the neutral Swedish neuromorphic research and innovation ecosystem.

## Routes

- `/` — public under-construction page
- `/preview/` — unlinked development preview of the full website

Preview routes include `noindex` metadata and are disallowed in `public/robots.txt`. This keeps them out of normal navigation and asks search engines not to index them, but the route is not authentication and should not be used for confidential content.

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

The public landing page uses `src/components/SpikeMatrixField.astro`. The previous signal
illustration remains unchanged in `src/components/SignalField.astro`; to restore it, change only
the `LandingSignalField` import path in `src/pages/index.astro` from `SpikeMatrixField.astro` to
`SignalField.astro`.

## Deployment

Pushes to `main` are built and deployed to GitHub Pages by `.github/workflows/deploy.yml`.
