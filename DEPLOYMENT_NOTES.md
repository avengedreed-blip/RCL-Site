# Deployment Notes

Reed Creative Labs is a static Next.js export deployed on Vercel.

## CORS

The repo does not intentionally configure `Access-Control-Allow-Origin` for the
marketing site. Static HTML, robots.txt, sitemap.xml, and public marketing pages
do not need wildcard CORS for normal browser navigation.

If production responses include a global wildcard CORS header, remove it from
Vercel dashboard project settings or any account-level/header rule outside this
repository. Do not replace it with another global wildcard. If a future static
asset class needs CORS, scope it to that exact path and document the consumer.

## Redirects

`vercel.json` keeps HTTPS `www.reedcreativelabs.com` canonicalized to
`https://reedcreativelabs.com`. If `http://www.reedcreativelabs.com` first
redirects to HTTPS `www` before apex, that first hop is handled before the
repository redirect rules run. Configure the domain or redirect rule in Vercel
so plain HTTP `www` goes directly to `https://reedcreativelabs.com/` when the
platform allows it.

## Privacy And Product Changes

Update `/privacy`, `/terms`, and `SECURITY.md` before adding forms, analytics,
accounts, purchases, downloads, newsletters, cookies, tracking scripts, pixels,
or third-party telemetry.
