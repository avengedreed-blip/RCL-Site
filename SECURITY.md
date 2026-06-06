# Security Headers

Reed Creative Labs is a static Next.js site deployed on Vercel.

Security headers are configured in `vercel.json` so they apply to the exported
static deployment. The Content Security Policy intentionally allows
`'unsafe-inline'` for scripts and styles because the current static Next output
uses inline bootstrap/style behavior. It also keeps `'unsafe-eval'` for Next
runtime compatibility across Vercel environments. No third-party analytics,
tracking scripts, or external service origins are allowed.

Static image assets use a one-week cache with stale revalidation instead of
`immutable` caching because the current filenames are human-readable and may be
replaced without fingerprinted names.
