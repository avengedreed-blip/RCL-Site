# Reed Creative Labs Website

Official static website for Reed Creative Labs.

## Current Portfolio

Forgefield leads as Launching Soon, followed by Phase Arcade Volume I in Final
Testing, then Project Load Bearing and Static Drift in Active Development.
These are not released-product or download claims. The shared register in
`content/projects.ts` drives Home, Products, Press, routes and sitemap.
See [September 2026 Portfolio Baseline](docs/SEPTEMBER_2026_PORTFOLIO.md) for
verified product sources, withdrawn pages, current media and remaining boundaries.

Built with:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static export

## Local Development

```bash
npm ci
npm run dev
```

## Production Checks

```bash
npm run typecheck
npm run lint
npm run build
npm run smoke
npx playwright install --with-deps chromium --only-shell
npm run check:browser
npm audit
```

Use Node.js 24. Browser checks serve the production export on an ephemeral local
port, check every public route at desktop and mobile sizes with axe, and exercise
navigation, responsive bounds, clipboard failure, motion controls, and fallbacks.
The default Chromium run uses software WebGL for CI reproducibility, not for
hardware performance measurements. No test server remains running afterward.

For installed Chrome or Edge, set `RCL_BROWSER_CHANNEL=chrome` or `msedge`.
For additional engines, install them with `npx playwright install firefox webkit`
and set `RCL_BROWSER_ENGINE=firefox` or `webkit` before `npm run check:browser`.
WebKit coverage does not replace testing Safari on actual Apple hardware.
The September 2026 audit reproduces intermittent Next.js prefetch exceptions
in Windows WebKit on both production and the local export. The optional WebKit
run retains its strict exception assertion and can fail on that known issue;
see `docs/SITE_QUALITY_AUDIT.md` for the verified scope and limitations.

The production output is static. Do not use `next start` to serve the export;
use `npm run dev` for local review or the normal Vercel deployment for hosting.

## Privacy-Preserving Performance Measurement

The production deployment is configured to use the official
`@vercel/speed-insights` integration for anonymous aggregate Web Vitals. The
component is omitted unless `VERCEL_ENV=production`, so local development and
preview deployments do not initialize it.

Reed Creative Labs does not use Vercel Web Analytics. That product creates a
daily visitor hash and groups page views into sessions, which does not satisfy
the studio's stricter no-fingerprinting standard. Query strings and URL
fragments are removed before metrics are sent. No custom analytics events,
advertising trackers, cookies, session recording, heatmaps, or cross-site
profiles are used.

Only published page paths are eligible for performance records. Unknown URLs
are dropped, and Do Not Track or Global Privacy Control suppresses records.

The implementation decision, data inventory, and operating boundaries are
documented in [Privacy Analytics and LLM Discoverability](docs/PRIVACY_ANALYTICS_AND_LLM_DISCOVERABILITY.md).

## LLM Discoverability

`public/llms.txt` provides a concise, source-controlled guide to the studio,
products, services, and important public routes. It follows the current
`llms.txt` community proposal; it is not represented as an IETF, W3C, or
search-engine standard.

## Deployment

Deploy on Vercel as a Next.js project. The production domain is:

```text
reedcreativelabs.com
```

Speed Insights must also be enabled for the project in the Vercel dashboard. The repository does not enable Vercel Web Analytics.
