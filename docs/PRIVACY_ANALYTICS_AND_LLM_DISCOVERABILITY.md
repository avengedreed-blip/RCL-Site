# Privacy Analytics and LLM Discoverability

Last reviewed: September 5, 2026

## Decision

Reed Creative Labs enables Vercel Speed Insights only on production deployments.
Vercel Web Analytics is intentionally excluded.

This is a data-minimization decision, not a claim that every product described as
privacy-friendly is interchangeable. The studio's public standard prohibits
fingerprinting, advertising tracking, cross-site tracking, behavioral profiles,
and unnecessary visitor-level data.

## Ethics Assessment

| Capability | Decision | Reason |
| --- | --- | --- |
| Vercel Web Analytics | Rejected | It identifies a daily visitor with a hash created from incoming request data and groups page views into sessions. That mechanism is privacy-oriented compared with advertising analytics, but it does not meet RCL's stricter no-fingerprinting rule. |
| Vercel Speed Insights | Approved with boundaries | Vercel states that performance records are anonymous, are not tied to an individual visitor or IP address, and cannot reconstruct a browsing session. The data is used to aggregate Web Vitals. |
| Custom analytics events | Prohibited | They are unnecessary for the stated performance objective and could create behavioral measurement. |
| Cookies or browser storage | Prohibited | The approved integration does not require RCL to set analytics cookies or write analytics identifiers to local or session storage. |
| Advertising and session-replay tools | Prohibited | They conflict directly with the studio's public privacy position. |

The closest privacy-preserving alternative to Web Analytics is aggregate
server/CDN request counts already available to the hosting operator, reviewed
only when operationally necessary. This repository does not add a visitor
analytics script for traffic, referrer, demographic, or conversion reporting.

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
2. Do not enable Web Analytics.
3. Deploy through the normal Vercel Git integration.
4. Confirm the production document requests a randomized same-origin Speed
   Insights script and sends Web Vitals to its same-origin intake route.
5. Confirm development and preview environments do not request the script.
6. Re-review this decision if Vercel changes its collected fields, identifier
   behavior, retention, subprocessors, or intake architecture.

Enabling Speed Insights in the Vercel dashboard may have plan-dependent usage
limits or cost. That dashboard action is outside this repository.

## Public Disclosure

The source of truth for visitor-facing disclosure is content/legal.ts and the
rendered /privacy page. `README.md`, `SECURITY.md`, and `DEPLOYMENT_NOTES.md` document
the engineering and operational boundaries.

## Local Verification

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
