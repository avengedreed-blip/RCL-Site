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

## Privacy-Preserving Performance Measurement

The production build renders the official `@vercel/speed-insights` component
only when `VERCEL_ENV=production`. Enable Speed Insights for the Vercel project
before deployment so Vercel provisions its randomized same-origin script and
intake routes.

Enable Web Analytics for `rcl-site` in the Reed Creative Labs Vercel team. The
owner approved basic aggregate traffic analytics on October 9, 2026, including
Vercel's daily visitor hash and technical metadata. The production-only SDK
reports published page URLs with queries/fragments removed and honors DNT/GPC.
The October 21 commercial brief authorizes optional fixed conversion events.
They remain disabled unless RCL_CONVERSION_EVENTS=1 is set for a supported
Pro/Enterprise plan. Do not upgrade or incur fees without owner authorization.
See docs/COMMERCIAL_REPOSITIONING.md. Do not add advertising trackers,
session recording, heatmaps, or cross-site profiles. Verify the dashboard
service is enabled and production page-view intake succeeds after deployment.

The public disclosure is maintained in `/privacy`; the technical decision and
data inventory are in
`docs/PRIVACY_ANALYTICS_AND_LLM_DISCOVERABILITY.md`.

## Privacy And Product Changes

Update `/privacy`, `/terms`, `SECURITY.md`, and the privacy architecture note
before adding forms, traffic analytics,
accounts, purchases, downloads, newsletters, cookies, tracking scripts, pixels,
or third-party telemetry.

The public trust routes are `/privacy`, `/terms`, `/accessibility`, and
`/security`. Keep them in the sitemap and footer. Review
`LAUNCH_READINESS.md` before adding product downloads, storefront links,
checkout, accounts, telemetry, child-directed data flows, or paid client work.

Renew `public/.well-known/security.txt` before its `Expires` date and verify the
listed email remains monitored.
