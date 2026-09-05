# Security Headers

Reed Creative Labs is a static Next.js site deployed on Vercel.

Security headers are configured in `vercel.json` so they apply to the exported
static deployment. The Content Security Policy intentionally allows
`'unsafe-inline'` for scripts and styles because the current static Next export
emits inline bootstrap scripts and inline style behavior. The policy does not
allow eval-based script execution, third-party script domains, tracking pixels,
advertising cookies, or external analytics origins.

The production build is configured with only the official
`@vercel/speed-insights` package. Vercel injects its script and intake routes
through randomized same-origin paths, so the existing same-origin script and
connection policy remains sufficient. The component is omitted unless
`VERCEL_ENV` is `production`.

The telemetry filter allows only canonical, published page paths, strips queries
and fragments, and drops unknown or credential-bearing URLs. Do Not Track and
Global Privacy Control suppress performance records.

Vercel Web Analytics is intentionally not installed. It creates a daily visitor
hash and groups page views into sessions, which does not meet the studio's
stricter no-fingerprinting standard. Custom analytics events, advertising
analytics, session recording, heatmaps, and cross-site tracking remain
prohibited. Any expansion beyond anonymous aggregate performance metrics
requires a new privacy, legal, security, and data-minimization review.

Public vulnerability-reporting guidance is available at `/security`, with a
machine-readable contact at `/.well-known/security.txt`. The security.txt
record expires on July 15, 2027 and must be reviewed before that date.

The repo does not intentionally configure global CORS. Static public pages,
robots.txt, and sitemap.xml should not emit wildcard CORS. If production sends a
global wildcard CORS header, remove that rule from Vercel project/account
settings or other platform-level configuration outside this repo.

Static image assets use a one-week cache with stale revalidation instead of
`immutable` caching because the current filenames are human-readable and may be
replaced without fingerprinted names.
