# Security Headers

Reed Creative Labs is a static Next.js site deployed on Vercel.

Security headers are configured in `vercel.json` so they apply to the exported
static deployment. The Content Security Policy intentionally allows
`'unsafe-inline'` for scripts and styles because the current static Next export
emits inline bootstrap scripts and inline style behavior. The policy does not
allow eval-based script execution, third-party script domains, analytics
endpoints, tracking scripts, tracking pixels, advertising cookies, or external
service origins.

No third-party analytics or tracking scripts are currently allowed. Any future
analytics, forms, accounts, purchases, downloads, newsletters, cookies, tracking
pixels, or telemetry require an explicit privacy/legal review and updates to the
privacy policy, terms, and this file before implementation.

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
