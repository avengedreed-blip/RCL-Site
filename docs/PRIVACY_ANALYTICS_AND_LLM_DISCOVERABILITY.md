# Privacy Analytics and LLM Discoverability

Last reviewed: October 21, 2026

## Decision

On October 9, 2026, the owner approved Vercel Web Analytics after reviewing its
daily visitor hash and technical metadata. This supersedes the earlier decision
to exclude it. Production now includes the official Web Analytics and Speed
Insights integrations. Local development and preview deployments omit both.

Web Analytics measures aggregate visitor totals, page views, and popular pages.
The October 21 brief also authorizes optional fixed conversion events. These
remain disabled by default; RCL_CONVERSION_EVENTS=1 enables them on a supported
Pro/Enterprise plan. Names: contact_click, partnership_inquiry, product_outbound.
No event properties are supplied. These are click counts, not confirmed leads
or purchases. No advertising, replay, heatmaps, cross-site profiles, or
application-supplied personal identifiers are added.

## Web Analytics Data Inventory and Limits

Vercel documents a request-derived visitor hash that resets daily, with the
visitor session discarded after 24 hours. This does not mean aggregate records
are deleted after 24 hours. Its data points may include event time, URL, dynamic
path, referrer, filtered query parameters, approximate geolocation, browser and
OS versions, device type, and SDK version. RCL strips page URL queries/fragments,
allows only published paths, and rejects custom events unless explicitly enabled. Provider-derived
metadata and hashing are not removed by that filter. This is not zero-data
collection or a promise of no fingerprinting.

`components/ProductionAnalytics.tsx` gates the integration.
`components/PrivacyAnalytics.tsx` uses the official Next.js SDK and
`sanitizeAnalyticsEvent` in `lib/privacy-metrics.ts`. Only clean page-view URLs and, when enabled, clean conversion URLs are returned. Unknown, foreign-origin and credential-bearing URLs are dropped.
DNT and GPC suppress records; scripts may still load and normal hosting data is
still processed. Failure or blocking of analytics does not affect navigation.

The SDK uses same-origin Vercel intake, retaining the existing CSP. No database,
custom collector, analytics cookies, or application-written browser identifiers
are introduced. Aggregate page popularity indicates interest in pages; it does
not measure social-button clicks or prove purchase intent.

## Speed Insights Data Inventory

According to Vercel's Speed Insights privacy documentation, each performance
data point may contain:

- Route
- URL after query strings and fragments are removed by RCL
- Network speed category
- Browser and version
- Device type
- Device operating system
- Country code
- Web Vital value
- Web Vital attribution, such as the responsible page element
- SDK information
- Server-received event time

Vercel states that Speed Insights does not associate these records with an
individual visitor or IP address and does not store information that could
reconstruct a browsing session.

RCL does not add names, email addresses, account IDs, custom event payloads,
search terms, form values, user-generated content, advertising IDs, or
cross-site identifiers to Speed Insights.

## Runtime Architecture

- components/ProductionSpeedInsights.tsx is the production-environment gate.
- components/PrivacySpeedInsights.tsx owns the official Vercel integration and
  URL redaction boundary.
- `PrivacySpeedInsights` imports the official `@vercel/speed-insights` Next.js component.
- The boundary renders only when `VERCEL_ENV` equals `production`.
- Local development and Vercel preview builds do not initialize it.
- Vercel version 2 dynamic configuration provides randomized same-origin script
  and intake paths.
- The existing Content Security Policy permits only same-origin scripts and
  connections, so no third-party analytics origin is added.
- A `beforeSend` filter removes URL query strings and fragments before intake.
- `lib/privacy-metrics.ts` limits records to canonical published page paths,
  supplied by the same static-route list and product data as the sitemap.
- Invalid, credential-bearing, foreign-origin and unknown URLs are dropped,
  including arbitrary paths on the branded 404.
- Do Not Track and Global Privacy Control suppress records in `beforeSend`.
  These signals do not prevent the script request itself; normal hosting
  processing still applies. No legal certification is implied.
- No custom analytics events are configured.

The static export remains independently renderable. Failure or blocking of the
Speed Insights script does not affect page content, navigation, accessibility,
or product functionality.

## Operations

1. Enable Speed Insights for the production project in the Vercel dashboard.
2. Enable Web Analytics for the same project, within the existing plan.
3. Deploy through the normal Vercel Git integration.
4. Confirm the production document requests a randomized same-origin Speed
   Insights script and sends Web Vitals to its same-origin intake route.
5. Confirm Web Analytics page-view intake succeeds and the dashboard shows data.
   Confirm development and preview environments do not request either script.
6. Re-review this decision if Vercel changes its collected fields, identifier
   behavior, retention, subprocessors, or intake architecture.

Enabling Speed Insights in the Vercel dashboard may have plan-dependent usage
limits or cost. That dashboard action is outside this repository.

## Public Disclosure

The source of truth for visitor-facing disclosure is content/legal.ts and the
rendered /privacy page. `README.md`, `SECURITY.md`, and `DEPLOYMENT_NOTES.md` document
the engineering and operational boundaries.

## Local Verification

October 9: production and preview builds passed. The Web Analytics browser
check verified SDK initialization, the registered beforeSend filter, clean
published URLs, rejection of unknown pages/custom events, DNT/GPC suppression,
and no app-written cookies/local/session storage. The preview build requested
no Web Analytics script. Provider scripts were stubbed, so these checks do not
prove Vercel collector or dashboard activation. Repeat with:

- `npm run check:privacy`
- `VERCEL_ENV=production npm run build`, then `npm run check:analytics-browser -- --production`
- `VERCEL_ENV=preview npm run build`, then `npm run check:analytics-browser`

Set environment variables using the syntax for your shell. On Windows, set
`RCL_BROWSER_CHANNEL=msedge` if using installed Edge instead of bundled Chromium.
CI runs both browser checks with the downloaded Chromium runtime.


The September 5 quality pass built both the normal export and a local
`VERCEL_ENV=production` export. The normal build made no Speed Insights script
request. In the production-gated build, the official SDK initialized once and
its runtime `beforeSend` callback stripped queries/fragments, rejected an
unknown path, and returned null for DNT and GPC. No app cookies, local storage
or session storage were written in that test.

The provider script was stubbed locally to prevent telemetry transmission.
This verifies the application integration, not Vercel's collector, retention or
dashboard configuration. Those operational checks still require an approved
deployment. `npm run check:privacy` provides persistent pure-filter and public
route/llms.txt regression coverage.

## llms.txt

`public/llms.txt` follows the current llms.txt community proposal: a Markdown H1,
a short blockquote summary, and curated lists of important links. `llms.txt` is a
community convention, not an IETF, W3C, robots, or search-engine standard. It
does not grant permission beyond normal public access, does not override
robots.txt, and does not guarantee indexing or citation by any model provider.

The file contains only already-public, source-controlled descriptions and links.
It includes no private documentation, credentials, internal prompts, unpublished
roadmaps, or personal data.

## Primary Sources

- Vercel Speed Insights privacy:
  https://vercel.com/docs/speed-insights/privacy-policy
- Vercel Speed Insights package and version 2 intake:
  https://vercel.com/docs/speed-insights/package
- Vercel Speed Insights quickstart:
  https://vercel.com/docs/speed-insights/quickstart
- Vercel Web Analytics privacy and visitor hashing:
  https://vercel.com/docs/analytics/privacy-policy
- llms.txt proposal:
  https://llmstxt.org/

## Re-Review Triggers

A new review is required before:

- adding Vercel Web Analytics or another traffic analytics product;
- creating custom analytics events;
- collecting query strings that may contain personal information;
- adding forms, accounts, checkout, authentication, or user-generated content;
- enabling session recording, heatmaps, fingerprinting, advertising, or
  cross-site measurement;
- changing the production environment gate;
- changing the public privacy disclosure.

## Optional Forgefield Trailer

The owner requested the official YouTube trailer on October 14, 2026. A local
poster and native button render first; there are no YouTube scripts, thumbnails,
preconnects, or iframe requests before activation. Activation creates a
`youtube-nocookie.com` iframe with autoplay disabled. No consent is persisted.
YouTube receives ordinary connection and player data once activated; its storage
and privacy practices apply. The direct watch link works without JavaScript.
CSP permits only this frame origin, and Permissions-Policy delegates fullscreen
to it. Storefront links stay direct, with checkout and downloads on itch.io.
