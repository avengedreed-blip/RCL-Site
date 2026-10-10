# Security Headers

Reed Creative Labs is a static Next.js site deployed on Vercel.

Security headers are configured in `vercel.json` so they apply to the exported
static deployment. The Content Security Policy intentionally allows
`'unsafe-inline'` for scripts and styles because the current static Next export
emits inline bootstrap scripts and inline style behavior. The policy does not
allow eval-based script execution, third-party script domains, tracking pixels,
advertising cookies, or external analytics origins.

Production uses the official `@vercel/speed-insights` and `@vercel/analytics`
packages. Both are gated on `VERCEL_ENV=production` and use same-origin Vercel
script/intake paths, without widening the Content Security Policy.

Filters allow only canonical published page URLs, strip queries and fragments,
and reject unknown, foreign-origin or credential-bearing URLs. Do Not Track and
Global Privacy Control suppress records. Web Analytics rejects custom events.

On October 9, 2026, the owner approved Vercel's daily visitor hash and technical
metadata for aggregate visits and popular-page reporting. This replaces the
previous no-fingerprinting requirement specifically for Vercel Web Analytics.
Advertising, session replay, heatmaps, custom click tracking, and cross-site
profiles remain excluded. Provider-side hashing and metadata collection are not
removed by the URL filter; see `/privacy` for disclosure.

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
