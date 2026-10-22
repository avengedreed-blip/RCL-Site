# Reed Creative Labs Website

Official static website for Reed Creative Labs.

## Current Portfolio

Forgefield is available now on Steam and itch.io. Steam released on October 19,
2026; its $4.99 USD purchase listing was verified October 20. The verified
storefront URLs, release date, prices, and trailer configuration live in
`content/forgefield.ts`. Steam state is explicitly `released`; a browser clock
does not control availability. itch.io remains a separate purchase option.
`public/llms.txt` points to the product page for changing availability details.
Windows 11 x64 is the current product boundary. Archived work is
retained as selected R&D; smaller mobile projects remain secondary. The shared
register in `content/projects.ts` drives public status, routes and sitemap.
See [September Launch Pass](docs/FORGEFIELD_STEAM_LAUNCH.md) for earlier verification,
and [Flagship Art Direction](docs/FORGEFIELD_FLAGSHIP_PASS.md) for the underlying visual pass.
Earlier September documents are historical snapshots.

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

## Privacy and Analytics

Production uses official `@vercel/speed-insights` for aggregate Web Vitals and
`@vercel/analytics` for visitor totals, page views, and popular pages. Both are
omitted unless `VERCEL_ENV=production`.

The owner approved Vercel Web Analytics on October 9, 2026, including its daily
visitor hash and technical metadata. This supersedes the earlier rejection of
that mechanism; it is not zero-data collection. No analytics cookies, advertising, session replay, or cross-site profiles are added.
Optional fixed conversion events are disabled by default; see the commercial handoff.
Only published page URLs are reported, with queries and fragments removed.
Do Not Track and Global Privacy Control suppress records. Provider script
requests and normal hosting processing still occur.

See [Privacy Analytics and LLM Discoverability](docs/PRIVACY_ANALYTICS_AND_LLM_DISCOVERABILITY.md)
for the data inventory, verification boundaries, and operating instructions.

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

Enable Speed Insights and Web Analytics for the project in the Vercel dashboard. Code installation alone does not enable either dashboard service.

## Commercial studio presentation

See [Commercial repositioning handoff](docs/COMMERCIAL_REPOSITIONING.md) for the
route map, evidence, email-draft inquiry flow, optional conversion configuration,
and checks. Production deployment requires owner authorization.
