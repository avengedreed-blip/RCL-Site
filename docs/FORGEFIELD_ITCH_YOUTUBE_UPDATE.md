# Forgefield itch.io and YouTube update

Prepared October 14, 2026. The owner reviewed the local preview and explicitly authorized publishing to main.

## Presentation

- Homepage, featured listing, product page, press/agency copy, metadata, and discovery copy now distinguish **Available Now on itch.io** from **Coming to Steam October 19, 2026**.
- Primary action: **Get Forgefield** on the homepage/listing and **Get Forgefield on itch.io** on the product page, both linking to <https://reed-creative-labs.itch.io/forgefield>.
- Secondary action: **Wishlist on Steam**, linking to <https://store.steampowered.com/app/5356880/>. Steam remains in its manually controlled coming-soon state.
- The product page keeps its existing captures and adds **See Forgefield in Motion** immediately below the opening Eventide image. Its responsive 16:9 player loads <https://www.youtube.com/watch?v=IoJ5lge2tWI> only after activation, using youtube-nocookie.com with autoplay disabled. A direct watch link remains usable without JavaScript.
- Footer order is TikTok, Facebook, YouTube. The existing labeled buttons, arrow icon, hover treatment, and responsive wrapping are preserved. YouTube links to <https://www.youtube.com/@ReedCreativeLabs> with an accessible channel label. TikTok and Facebook URLs are unchanged.

## Source verification

- itch.io returned HTTP 200 in the browser and showed Buy Now, a $4.99 USD minimum, and `FORGEFIELD-Latest.zip`. The command-line fetch was rate-limited; the browser verification succeeded. No purchase was made.
- The official Steam listing showed October 19, 2026 and “not yet available on Steam.” No wishlist or account action was performed.
- YouTube's oEmbed response identified “FORGEFIELD | Official Launch Trailer | 9 Living Worlds” and the supplied RCL channel. Real embedded playback succeeded: current time 6.848 seconds, paused false, readyState 4, no video error.
- No video publication timestamp was verified. Structured data uses a truthful CreativeWork reference for the trailer rather than fabricating VideoObject properties. The product offer points to the verified itch.io listing; Steam's future date is not represented as the overall product release date.

## Changed files

| Area | Files |
| --- | --- |
| Availability and discovery | `content/forgefield.ts`, `content/projects.ts`, `app/page.tsx`, `lib/structured-data.ts`, `public/llms.txt` |
| Purchase actions | `components/ForgefieldItchLink.tsx`, `components/ForgefieldSteamLink.tsx`, `components/ForgefieldLaunch.tsx`, `app/globals.css` |
| Product page and trailer | `components/product-pages/ForgefieldProductPage.tsx`, `components/ForgefieldTrailer.tsx`, `components/ForgefieldTrailer.module.css` |
| Social links | `components/SiteFooter.tsx`, `components/ButtonLink.tsx` |
| Privacy and security | `content/legal.ts`, `vercel.json`, `SECURITY.md`, `docs/PRIVACY_ANALYTICS_AND_LLM_DISCOVERABILITY.md` |
| Verification and documentation | `scripts/browser-check.mjs`, `scripts/launch-check.mjs`, `scripts/portfolio-check.mjs`, `README.md`, this report |

No dependencies or duplicate video assets were added. Other product data and the homepage renderer are unchanged. The pre-existing untracked `marketing/` directory is excluded from this work.

## Verification

- Production build, TypeScript, lint, smoke, portfolio, launch, commercial, trust, hero, color, and privacy checks passed.
- Native Edge playback confirmed; zero YouTube, ytimg, or googlevideo requests occurred before the load action.
- The CI player test uses a stub solely to verify activation, keyboard access, reserved aspect ratio, and no layout shift. The separate native playback check above uses the real video.
- Desktop/mobile screenshots inspected; the 200% text test exposed an overflow in the closing section, fixed by stacking its inner layout. Targeted enlarged-text recheck passed.
- Direct trailer and purchase links verified with JavaScript disabled.
- Final full browser regression rerun passed: 27 routes, desktop/mobile axe, responsive bounds, 200% text enlargement, product navigation, keyboard/clipboard, motion and async cancellation, no-WebGL, no-JavaScript, and 404 handling. No browser runtime errors. Console output included a redundant fullscreen-permission warning and a stylesheet preload timing warning.
- Preview and screenshots: `http://127.0.0.1:4173/projects/forgefield`, `output/playwright/forgefield-release/`, and `output/playwright/forgefield-trailer-playing.png`.

## Deployment

The initial request prohibited automatic deployment. The owner subsequently requested: “Push to main and make it live.” Publish only the scoped changes through the existing Vercel Git integration, then verify production storefront links, optional trailer playback, response headers, and social links. No dashboard setting or new service is required. Deployment results are reported in the release conversation.
