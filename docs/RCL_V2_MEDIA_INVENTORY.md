# RCL V2 Media Inventory

Last verified: 2026-07-24

This inventory separates product evidence from brand-only and retired concept
media. A file being present in `public/` does not make it approved product
evidence.

## Approved product evidence

| Asset | Product | Source | Authentic | Public use | Alt text | Ownership |
| --- | --- | --- | --- | --- | --- | --- |
| `/images/projects/phase-shift-gameplay-01.webp` | Phase Shift / Phase Arcade Volume I | Owner-provided capture from the current desktop build | Yes | Homepage chapter, product pages, gallery, social composition | Phase Shift gameplay with a photon moving through a cyan and magenta tunnel. | Reed Creative Labs |
| `/images/projects/phase-breaker-gameplay-01.webp` | Phase Breaker / Phase Arcade Volume I | Owner-provided capture from the current desktop build | Yes | Product pages, gallery, social composition | Phase Breaker gameplay inside a cyan and magenta containment chamber. | Reed Creative Labs |
| `/images/projects/phase-court-gameplay-02.webp` | Phase Court / Phase Arcade Volume I | Native Godot 4.7 capture from the current desktop build | Yes | Product pages, gallery, social composition | Phase Court desktop gameplay showing a cyan player paddle returning the glowing ball across the magenta court. | Reed Creative Labs |
| `/images/projects/rcl-science-lab-observatory.jpg` | RCL Science Lab | Owner-provided capture from the current application | Yes | Homepage chapter, product hero, gallery | RCL Science Lab observatory launch screen with simulation and learning-path navigation. | Reed Creative Labs |
| `/images/projects/rcl-science-lab-protostar-formation.jpg` | RCL Science Lab | Owner-provided capture from the current application | Yes | Product gallery | RCL Science Lab protostar formation simulation interface. | Reed Creative Labs |
| `/images/projects/rcl-science-lab-catalog-browser.jpg` | RCL Science Lab | Owner-provided capture from the current application | Yes | Product gallery | RCL Science Lab simulation catalog browser interface. | Reed Creative Labs |
| `/images/projects/rcl-science-lab-stable-orbits.jpg` | RCL Science Lab | Owner-provided capture from an earlier current-build review | Yes, but superseded as primary | Supporting use only; the three newer captures are preferred | RCL Science Lab stable orbits simulation interface. | Reed Creative Labs |

## Official brand and social media

| Asset | Product | Source | Authentic | Public use | Notes | Ownership |
| --- | --- | --- | --- | --- | --- | --- |
| `/images/rcl-logo-full.png` | Studio | Official RCL brand asset | Yes | Brand identity | Preserve without alteration. | Reed Creative Labs |
| `/images/rcl-logo-full.webp` | Studio | Delivery-sized lossless WebP derivative of the official RCL logo | Yes | Site header, footer, and studio identity | Generated from the approved PNG at the component's declared 720-pixel source width without altering the logo design. | Reed Creative Labs |
| `/images/rcl-logo-mark.png` | Studio | Official RCL brand asset | Yes | Favicons, social avatars, and other compact brand contexts | Preserve without alteration. | Reed Creative Labs |
| `/images/social/forge.jpg` | Forge | RCL typographic social treatment | Brand-authentic, not product evidence | Open Graph and Twitter preview | Contains no simulated interface and must not be described as a screenshot. | Reed Creative Labs |
| `/images/social/phase-arcade-volume-1.jpg` | Phase Arcade Volume I | RCL composition derived from real product captures | Yes | Open Graph, Twitter, collection preview | Must remain consistent with the current public status language. | Reed Creative Labs |
| `/images/social/rcl-science-lab.jpg` | RCL Science Lab | RCL composition using a real application capture | Yes | Open Graph and Twitter preview | Product UI is authentic. | Reed Creative Labs |
| `/images/social/phase-shift.jpg` | Phase Shift | RCL composition using a real gameplay capture | Yes | Open Graph and Twitter preview | Product gameplay is authentic. | Reed Creative Labs |
| `/images/social/phase-breaker.jpg` | Phase Breaker | RCL composition using a real gameplay capture | Yes | Open Graph and Twitter preview | Product gameplay is authentic. | Reed Creative Labs |
| `/images/social/phase-court.jpg` | Phase Court | RCL composition using a real gameplay capture | Yes | Open Graph and Twitter preview | Product gameplay is authentic. | Reed Creative Labs |
| `/images/social/phase-arcade-volume-2.jpg` | Phase Arcade Volume II | RCL typographic social treatment | Brand-authentic, not product evidence | Social preview only | Do not present as gameplay or a product screenshot. | Reed Creative Labs |
| `/images/social/pigs-can-fly.jpg` | Pigs Can Fly? | RCL typographic social treatment | Brand-authentic, not product evidence | Social preview only | Do not present as gameplay or a product screenshot. | Reed Creative Labs |

## Removed legacy and prohibited assets

The following legacy assets were removed from the public bundle during the V2
authenticity audit. They were generated concepts, decorative images without
product provenance, or superseded previews and must not be restored as product
evidence.

| Asset | Classification | Reason |
| --- | --- | --- |
| `/images/home/phase-arcade-card.jpg` | Legacy generated concept image | Removed; it depicted an arcade cabinet rather than real Phase Arcade gameplay. |
| `/images/home/rcl-hero-cinematic.jpg` | Legacy concept image | Removed; it was not the live Fortran-backed hero or product evidence. |
| `/images/home/rcl-technical-orb.jpg` | Legacy decorative asset | Removed; superseded by the procedural V2 system. |
| `/images/home/red-atmosphere.jpg` | Legacy decorative asset | Removed; it was not tied to a real product state. |
| `/images/home/red-floor-glow.jpg` | Legacy decorative asset | Removed; it was not tied to a real product state. |
| `/images/home/red-grid-tech.jpg` | Legacy decorative asset | Removed; it was not tied to a real product state. |
| `/images/projects/misread-card.jpg` | Abstract identity artwork | Removed; it was not a screenshot or approved product evidence. |
| `/images/projects/talk-to-me-card.jpg` | Abstract identity artwork | Removed; it was not a screenshot or approved product evidence. |
| `/images/social/phase-breaker-coming-soon.jpg` | Superseded typographic preview | Removed; replaced by the authentic gameplay-based social image. |

## Products using the approved no-media state

- Forge
- Forgefield
- Storm Lab
- Neon Drift
- Falling From The Sky
- Pigs Can Fly?
- Phase Arcade Volume II
- Darren In The Woods 2
- Talk To Me AAC
- Bloom
- Misread

These routes must display `Images coming soon.` instead of generated art,
mockups, interface simulations, or stock media.

Forgefield and Storm Lab imagery remains intentionally withheld by owner
decision. Forgefield needs a current-build capture that accurately represents
the intended shipping product. Storm Lab needs an authentic prototype capture
approved for public use. Neither placeholder is evidence of a released product.

## Procedural hero provenance

The homepage hero is generated at runtime from the Fortran source in
`simulation/hero/hero_flow.f90`. It is not a video, stock asset, AI-generated
image, or pre-rendered product mockup. Compilation and runtime details are
documented in `docs/FORTRAN_HERO_VISUALIZATION.md`.

## Reverification rule

Product captures should be reverified whenever the visible interface or
gameplay meaning changes. New media is approved only after its source build,
caption, alt text, and public-use status are recorded here.
