# Reed Creative Labs Site V2 Implementation Plan

## Purpose

Site V2 will present Reed Creative Labs as a disciplined software and engineering
studio spanning engineering tools, procedural desktop software, scientific
simulation, and games. The production site on `main` remains the protected
baseline while V2 is developed on `redesign/rcl-site-v2`.

The concept image is a directional reference only. It is not a production asset
and must not be copied into the public site.

## Non-Negotiable Constraints

- Preserve the official RCL logo without redrawing, recoloring, or distortion.
- Preserve static generation, metadata, canonicals, JSON-LD, sitemap, robots,
  security headers, privacy, terms, accessibility, and security statements.
- Use only verified product facts and authentic approved product media.
- Do not create fake interfaces, diagrams, code, metrics, clients, testimonials,
  screenshots, or product imagery.
- Products without approved media use the intentional `Images coming soon.`
  treatment.
- Maintain WCAG 2.2 AA interaction and contrast targets.
- Avoid unnecessary client components and new dependencies.

## Verified Featured Product Order

1. Forge
2. Forgefield
3. RCL Science Lab
4. Storm Lab
5. Phase Arcade Volume I

### Media State

| Product | Public state | Media state | Evidence |
| --- | --- | --- | --- |
| Forge | Active Development | Placeholder | No approved current-build public screenshot |
| Forgefield | Active Development | Placeholder | Public name and status approved; captures remain withheld pending current-build approval |
| RCL Science Lab | Coming Soon | Approved screenshots | Current observatory, simulation, and catalog captures |
| Storm Lab | Prototype | Placeholder | Functioning Fortran/Godot Windows prototype; no approved public capture |
| Phase Arcade Volume I | Coming Soon | Approved gameplay | Current Phase Shift, Phase Breaker, and Phase Court captures |

## Architecture

### Product Content

`content/projects.ts` remains the canonical typed source for:

- identity, category, route, status, platform, and roadmap grouping
- featured order and presentation tier
- approved media or intentional placeholder state
- current focus, milestones, verified features, and engineering facts

Route generation, homepage presentation, Products, Press, metadata, and
structured data consume the same records.

### Global Shell

The shell consists of:

- official logo
- Home, Products, Services, About, and Contact primary navigation
- shared container and section spacing primitives
- footer access to Press and all required trust/legal routes
- consistent focus-visible treatment
- responsive navigation without delayed page transitions

### Media

`ProductMediaSurface` owns public product-media presentation. It renders:

- a dimensionally stable `next/image` surface for approved media
- a semantic, intentionally designed placeholder for unavailable media

The placeholder is brand presentation, not product evidence.

### Homepage

The V2 homepage is organized as:

1. concise simulation-field hero
2. five editorial product chapters
3. engineering capabilities introduction
4. current research and technical focus
5. compact studio statement
6. direct contact call to action

Featured products are horizontal editorial chapters, not a repeated card grid.

## Design Foundations

- Graphite and near-black fields
- warm copper and gold used for rules, metadata, and interaction
- white primary type with restrained neutral supporting text
- hairline borders and small radii
- large editorial type balanced by readable body measure
- stable media ratios and explicit responsive crops
- 120-300 ms interaction transitions
- no continuous decorative motion beyond a restrained hero field
- all non-essential motion disabled by `prefers-reduced-motion`

## Delivery Sequence

### Sprint 1: Foundation

- typed product and media model
- verified Forgefield and Storm Lab records
- global shell and navigation
- design and layout tokens
- intentional media placeholder
- homepage structural skeleton
- static build, lint, type, content, and responsive checks

### Sprint 2: Product Architecture

- flexible shared product-page primitives
- mission, status, current focus, milestones, features, engineering, and gallery
- product-specific page composition without disconnected microsites
- Products catalog hierarchy for featured and secondary work

### Sprint 3: Supporting Routes

- Services engineering-studio positioning
- concise About page
- Press references and media readiness
- Contact route refinement
- route-specific metadata and structured-data review

### Sprint 4: Verification and Release Candidate

- browser matrix and keyboard audit
- responsive visual QA
- link, metadata, sitemap, and structured-data checks
- performance and asset review
- production-header and redirect verification

## Owner Decisions

Resolved on 2026-07-24:

- **Forgefield** is the approved public name. It remains **Active Development**
  and may appear as a featured product. Authentic public screenshots remain
  withheld until a current-build capture accurately represents the intended
  shipping product. Installer readiness, licensing, packaging, distribution,
  and final release validation are separate future gates.
- **Storm Lab** remains public as a featured project. Repository evidence
  supports **Prototype**: the current Windows implementation connects a modern
  Fortran atmospheric model to Godot through a versioned C ABI and C++
  GDExtension, and has passed native, Godot, and rendered validation. Radar,
  severe-weather, warning, intervention, and operational decision systems remain
  planned direction. Public imagery remains withheld until an authentic capture
  is approved.

## Future Owner Review (Non-Blocking)

These items remain deliberately conservative in the release candidate and do
not block review or preview deployment:

- Approve current-build Forge media before replacing its placeholder.
- Confirm whether `Coming Soon` remains accurate for Science Lab and Phase Arcade.
- Confirm whether macOS and Linux remain public launch targets for Science Lab.

## Definition of Done

V2 is ready for review when it:

- builds statically without type, lint, or content-check failures
- contains no fabricated product evidence
- has no broken internal links or placeholder links
- has no horizontal overflow from 320 px through wide desktop
- preserves trust, legal, SEO, metadata, and security work
- clearly distinguishes implemented products, active development, and concepts
- remains unmerged and undeployed until owner approval
