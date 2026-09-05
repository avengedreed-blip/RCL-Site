# Site Quality Audit and Improvement Pass

Reviewed September 5, 2026. Baseline: `19b88d5` (`main` and `origin/main` at
inspection). Work branch: `codex/site-quality-audit`. This is a review of the
current V2 site, not an endorsement based on earlier audit scores.

## Verdict

Initial quality assessment: **81/100**. Revised assessment: **84/100**.
These are editorial judgments, not calculated Lighthouse scores.

The site is a strong, recognizable engineering-studio portfolio and a credible
starting point for website and focused software inquiries. It is not yet
exceptional proof of delivering large commercial engagements. Most product
evidence concerns work in development, and there is no published client case
study demonstrating a completed brief, delivery constraints and outcome.

The graphite, restrained metallic accents, genuine Fortran/WebAssembly state
system, WebGL renderer, product imagery and family/studio voice were preserved.
No product capability, release status, roadmap, route, screenshot, price,
testimonial or customer metric was invented or changed.

## Findings and Disposition

No P0 defect was verified within this audit's scope.

| Priority / Type | Verified finding | Action |
| --- | --- | --- |
| P1 Accessibility | The continuously running hero had no user pause mechanism. | Added a keyboard-accessible 44px pause/resume control; kept reduced-motion and static fallback paths. |
| P1 Responsive | Catalog rows could outgrow the narrow right-hand column at tablet widths. | Use the ledger's actual container width to select its existing stacked row arrangement. |
| P1 Privacy | The pending performance integration stripped queries but could transmit identifying text in arbitrary 404 paths. | Allow only canonical published paths, reject unknown/foreign/credential-bearing URLs, honor DNT/GPC, and test redaction. |
| P1 Commercial | In-development product evidence is not equivalent to a delivered client case study. | Owner evidence required; no fabricated case study or outcome added. |
| P2 Visual | Feature sections received both outer band padding and inner section padding. | Remove duplicate outer padding only; preserve internal readability and the gallery/CTA payoff. |
| P2 Responsive | A shared CTA link shrank under flex layout; status text and a Firefox Forgefield heading could exceed their columns. | Prevent CTA shrink and respect the text's intrinsic minimum width in the shared grids. |
| P2 Accessibility | The featured link's accessible name did not contain its visible wording in order. | Use `View product: [product name]` and add label-in-name checks. |
| P2 Motion / Reliability | Reduced-motion reveals retained delays; preference changes during Wasm loading could race initialization; resizing a paused canvas could clear it. | Remove reduced-motion delays, check preferences across async boundaries and redraw the frozen state after resize. |
| P2 UX | Clipboard denial failed silently. | Provide a visible, announced manual-copy alternative and clean up the reset timer. |
| P2 Content | The footer contained "software and studio"; development CTAs were defensive; founder copy implied products could be tried. | Correct the typo and use concise, accurate inquiry/development wording. |
| P2 Dependencies | Four high-severity advisories were reported in the initial dependency tree. | Update compatible transitive versions; both full and production-only audits now report zero vulnerabilities. No website exploit was demonstrated. |
| P2 Testing | Source/build checks did not cover real responsive, accessibility or asynchronous lifecycle behavior. | Add Playwright/axe regression coverage and run it in pull-request CI. |

## Architecture and Code Quality

Next.js 16.2.12, React 19.2.6, TypeScript 6.0.3 and Tailwind 4.3.3 remain in
place. The site exports static HTML and has no public account, database,
payment or form-submission backend. Five flagship pages share the same layout;
the other product pages retain their existing smaller-product treatment.

The existing large stylesheet and hero lifecycle component are maintainability
costs, but replacing them during a quality pass would add unnecessary risk.
Changes stay within the affected rules and lifecycle boundaries. The route list
is now shared by the sitemap and performance-record allowlist. Product routes
continue to come from central product data.

The preexisting uncommitted privacy/discoverability work was preserved, reviewed
and hardened. It was not discarded to manufacture a clean worktree.

## Visual and Responsive Evidence

The screenshot sweep covered all 27 sitemap routes plus the branded 404. A
separate matrix covered 12 representative routes at 13 widths from 320 to
2560px, including 390, 768, 820, 1024, 1180, 1280, 1366, 1440 and 1920px.
Automated regression checks additionally exercise 360, 430, 720 and 1100px.

Reviewed the homepage, products, services, contact, about/founder, press, policy
pages, all flagship pages and representative smaller products. The existing
laptop hero focal correction was already effective and was not moved again.
Decorative, aria-hidden background lettering was distinguished from actual
content overflow rather than being mistakenly removed.

At 1440 x 900, measured document heights changed as follows:

| Product | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Forge | 7526px | 7197px | 329px |
| Forgefield | 13577px | 13249px | 328px |
| Science Lab | 8518px | 8190px | 328px |
| Phase Arcade Volume I | 8610px | 8282px | 328px |
| Storm Lab | 6332px | 6003px | 329px |

Forgefield's feature section changes from 782px to 523px. Its roadmap changes
from 678px to 609px because the replacement heading wraps less. The gallery
remains 8001px and final CTA 593px. The substantial gallery length is real media,
not empty padding, and was intentionally retained. Hero, mission, status,
current-focus and technical-profile spacing are otherwise preserved.

Full-page before/final screenshots, browser probes and raw measurements are
local ignored audit artifacts, not production assets or committed fixtures.

## Accessibility and Failure Behavior

- One main landmark and one H1 verified on all 27 public routes.
- Automated axe WCAG 2 A/AA, 2.1 A/AA and 2.2 AA checks at 390 and 1440px,
  including the normally experimental label-in-name rule.
- Product links exercised by clicking all 16 destinations and navigating back.
- Skip-link keyboard activation, clipboard success/denial, pause/resume,
  offscreen pausing, reduced motion and delayed Wasm initialization exercised.
- Visibility-change handling tested with a synthetic document visibility event;
  this is not a claim of physical OS background-tab testing.
- Forced initialization failure, unavailable WebGL2, no JavaScript and branded
  404 paths retain readable content and useful navigation.
- Mobile retains its deterministic still and does not acquire a live renderer.

Automated checks are not a WCAG certification. VoiceOver, NVDA and physical
Apple-device acceptance remain outside this run. Windows Playwright WebKit does
not provide native Tab traversal in this environment; its skip link was focused
programmatically and activated with Enter. Chromium and Firefox exercised the
native Tab path.

A separate forced-reload stress probe reproduced WebKit prefetch access-control
exceptions on both the unchanged production site and the local branch, from
the same Next.js runtime chunk. All 16 product destinations still loaded.
This remains a browser/framework caveat, not a claimed clean result or a reason
to disable all production prefetching. The normal route regression follows
click-and-Back navigation without injecting redundant document reloads.
The final WebKit suite still intermittently reports these prefetch exceptions,
including in the responsive navigation sweep, and therefore **does not pass its
final zero-exception assertion**. Its preceding route, axe, link, motion and
fallback assertions passed. No exception filter was added to manufacture a
green result. Physical Safari confirmation and upstream Next.js investigation
remain necessary before claiming clean cross-browser console behavior.

## Performance Evidence

An isolated Lighthouse 13.4.1 run used installed Chrome against a gzip-served
local production export. The desktop run used Lighthouse's actual desktop
configuration; mobile used its default throttled mobile configuration.

| Route / mode | Performance | Accessibility | Best practices | SEO | FCP | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home / mobile | 94 | 100 | 100 | 100 | 0.9s | 3.1s | 0 | 15ms |
| Services / mobile | 97 | 100 | 100 | 100 | 0.9s | 2.6s | 0 | 7ms |
| Home / desktop | 98 | 100 | 100 | 100 | 0.2s | 0.6s | 0.0023 | 123ms |

These are lab snapshots, not field percentiles or a performance certification.
The local host does not reproduce Vercel's asset-cache headers, so its cache
warning is not evidence that production caching is missing. Image-delivery and
framework-JavaScript opportunities remain. Mobile LCP warrants field monitoring.
Lighthouse's temporary Chrome profile cleanup reported an EPERM after all
reports completed; this was a local tool cleanup issue, not an application error.

Removed eager priority from below-fold featured media and added explicit fetch
priority to already-priority logo instances. No approved image was recompressed
lossily or replaced to chase a score. The pause control stops unnecessary work
when the visitor requests it; preference changes cancel initialization safely.

The route resource snapshot showed approximately 4.6KB more uncompressed home
JavaScript and 1KB more CSS, not a bundle reduction. That is a small explicit
tradeoff for controls and responsive correctness. Playwright and axe are
development-only dependencies. No claim of zero performance regression is made.

The live Fortran runtime was observed in Chrome, Edge, Firefox and WebKit at
1280px. This verifies execution, not sustained FPS, battery use, high-end GPU
performance or thermal behavior on a physical mobile device. The renderer's
existing adaptive tiers and mobile fallback remain unchanged.

## SEO, Privacy and Security

Titles, descriptions, canonicals, JSON-LD, robots, sitemap, social references and
internal product routes were checked in the generated output. The contact
description now includes website and custom-software inquiries. Existing valid
metadata was left alone; no keyword stuffing or speculative schema was added.

`llms.txt` follows the current community proposal, not a claimed formal standard
or a guarantee of model indexing. Its links are checked against published routes.

Vercel Web Analytics remains excluded because its daily visitor hash/session
grouping conflicts with the owner's stricter privacy boundary. The existing
official Speed Insights integration is production-gated and its URL boundary is
now explicit and tested. See `PRIVACY_ANALYTICS_AND_LLM_DISCOVERABILITY.md` for
the data inventory, provider sources and operational requirements. No advertising
analytics, session replay, cookies, custom behavioral events or consent banner
were added.

Both normal and `VERCEL_ENV=production` builds were tested locally. The normal
export did not initialize Speed Insights. In the production-gated build, the
official SDK initialized once and its actual `beforeSend` callback passed URL,
DNT and GPC checks without writing app cookies or browser storage. Provider
transport was replaced by a local empty script for this check: no visitor data
was sent, and provider-side collection or dashboard provisioning was not tested.

Live read-only checks confirmed HTTPS redirects, security headers and reachable
policy/security endpoints. The static Next export still needs inline bootstrap
scripts and WebAssembly compilation permissions in CSP. These are documented
tradeoffs, not grounds to claim an airtight policy. Wildcard CORS remains a
Vercel/platform response on public unauthenticated assets; it was not introduced
or changed by this pass. No penetration-test or legal-certification claim is made.

## Client Journeys and Commercial Readiness

Homepage to Services to Contact is direct. Product details provide a clear
development status, technical context, evidence where approved and a contact
path. The product-focused identity is an advantage and was not replaced by an
agency landing page.

| Prospective engagement | Likely remaining hesitation |
| --- | --- |
| $2,500 website | Wants a relevant finished example and a clear quote/handoff conversation. |
| $5,000 website | Wants evidence of content handling, responsive delivery and maintenance boundaries. |
| $10,000 software | Wants a concrete scoped example, acceptance criteria and support responsibility. |
| $25,000+ | Needs references or credible delivery evidence, milestones, risk handling and contractual clarity beyond a marketing site. |

These are review judgments, not observed conversion data. No tracking experiment
or analytics-based conversion claim was made.

## Intentionally Unchanged

- Official logo, type families, palette, header/footer structure and core layouts.
- Hero mathematics, shaders, quality tiers, scale, crop and focal placement.
- Product screenshots, gallery system, statuses, platform claims and roadmap facts.
- Restrained service boundaries and the founder's verified personal background.
- Email-only contact: no unrequested data-collecting form or unverified address.
- The clean Forge image: no private chat history or unapproved media introduced.
- No blanket card rewrite, decorative effects or speculative architecture refactor.

## Validation Commands

| Command | Result |
| --- | --- |
| `npm ci` | Passed with the committed lockfile dependency set. |
| `npm run lint` | Passed. |
| `npm run typecheck` | Passed. |
| `npm run build` | Passed; 31 generated Next routes including metadata/internal output. |
| `VERCEL_ENV=production npm run build` | Passed locally; SDK boundary checked with provider transport stubbed. |
| `npm run smoke` | Passed; includes 16 products, 5 featured products, commercial/trust checks across 29 HTML pages, Fortran, color and privacy checks. |
| `npm audit` | Zero vulnerabilities. |
| `npm audit --omit=dev` | Zero vulnerabilities. |
| `git diff --check` | Passed. |

The persistent browser command is `npm run check:browser`. It serves the static
export, checks 27 public routes at desktop/mobile sizes with axe, tests
responsive bounds, follows all product links and exercises error/fallback
behavior. The default CI browser uses software WebGL; that run is functional
verification, not a GPU benchmark. Extra engine/channel commands are documented
in README.

| Browser coverage | Result |
| --- | --- |
| Default Chromium full suite | Passed on the final export. |
| Firefox full suite | Passed against the final application changes. |
| Installed Chrome | Full-page visual matrix, live hero, paused resize and live-hero axe passed. |
| Installed Edge | Live hero/runtime and composition probe passed. |
| WebKit | Functional and axe checks passed; final zero-exception assertion failed on the baseline-reproducing prefetch caveat above. |
| Physical Safari / screen readers | Not available in this environment; not certified. |

CI is configured for pushes to `main` and pull requests targeting `main`.
Pushing this fix branch alone does not establish a green remote CI run. No merge
or manual production deployment is part of this pass.

## Remaining High-Value Work

1. Publish one truthful delivered-project case study with the original problem,
   constraints, engineering decisions, acceptance process and approved outcome.
2. Review the finished branch on an actual MacBook/iPhone with Safari/VoiceOver.
3. Verify Speed Insights provisioning and the actual production intake after an
   approved deployment; local SDK tests cannot establish provider-side handling.
4. Consider a verified studio-domain email when the owner provisions it; do not
   publish an address merely because it looks more professional.
5. Collect real field performance evidence before further renderer optimization.
   A lab score is not INP or battery-life evidence for the visitor population.

The site is suitable as a primary demonstration of RCL's visual and frontend
craft. It should support, not substitute for, delivery evidence when selling
larger software engagements.
