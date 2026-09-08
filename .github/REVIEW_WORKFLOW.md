# AI-assisted content review

Crawler proposals are reviewed through GitHub pull requests. The Python crawler, database, raw
pages and model prompts remain local on the Ubuntu server; only proposed JSON records are pushed.

## Reviewer workflow

1. Open the crawler pull request and wait for `Validate proposed content` and the review deployment
   to pass.
2. Open `https://review.neuromorphic-sweden.se/`. It renders the current review branch using the
   same Astro components as the public site.
3. Open each candidate, follow its original source and check names, dates, claims, links and neutral
   wording. AI-estimated TRL ranges must be treated as provisional.
4. To correct a record, select **Edit** in the review site, edit the JSON on the proposal branch and
   commit. Wait for the preview to rebuild.
5. To reject one record in a batch, delete its JSON file from the proposal branch. To reject an
   entire single-record proposal, close the pull request and apply the `rejected` label.
6. When every remaining record is suitable, submit an approving GitHub review and merge the pull
   request into `main`. The merge is the publication decision.
7. The existing GitHub Pages workflow publishes `main` to `neuromorphic-sweden.se`.

Reviewers need repository access to edit or approve. A maintainer with merge permission performs
the final publication action.

## Repository settings

Protect `main` with a GitHub ruleset or classic branch protection rule:

- require a pull request;
- require at least one approving review;
- require `build` from `Validate proposed content`;
- require conversations to be resolved;
- dismiss stale approval after new commits;
- block force pushes and direct pushes.

Create a `rejected` label. The local crawler's `sync-reviews` command uses this label to record a
closed proposal as rejected rather than merely deferred.

## Configure the stable review deployment

Create a separate Cloudflare Pages project connected to this GitHub repository. It supplements,
but does not replace, the GitHub Pages production deployment.

Use these settings:

```text
Project name:       neuromorphic-sweden-review
Production branch:  crawler/review
Build command:      npm run build
Build output:       dist
Node version:       24
Environment:        REVIEW_SITE=true
Custom domain:      review.neuromorphic-sweden.se
```

The crawler maintains one active `crawler/review` pull request at a time. The stable branch keeps
the custom review domain current. Do not enable the production domain
`www.neuromorphic-sweden.se` in Cloudflare Pages; it remains served by GitHub Pages.

The review routes include `noindex, nofollow` metadata and are absent from public navigation. They
are unlisted, not confidential: proposal branches and their content are publicly readable.

If Cloudflare Pages has not yet been configured, reviewers can download the `review-site-*`
artifact from the pull request's Actions run or check out the branch and run:

```sh
npm ci
npm run dev -- --background
```

Then open `http://localhost:4321/preview/`.
