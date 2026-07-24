# RCL V2 Color System

This document is the canonical color contract for the V2 site. The visual hierarchy is graphite, white, gold, then copper. Warmth comes from small metallic accents rather than tinted dark surfaces.

## Visual Proportion

| Role | Target presence | Rule |
| --- | ---: | --- |
| Graphite | 65-80% | Owns the page field, navigation, footer, sections, frames, and controls. |
| White | 12-22% | Owns headings, product names, primary copy, and important values. |
| Gold | 2-6% | Primary highlight for focus, active state, rules, indexes, and critical metadata. |
| Copper | 3-8% | Secondary metal for edge depth, supporting borders, local light, and cooler thermal regions. |

The percentages are visual targets, not arithmetic quotas. A full-page image must read black/graphite first, white second, gold third, and copper fourth.

## Semantic Tokens

| Token | Value | Intended usage |
| --- | --- | --- |
| `--color-graphite-950` | `#020304` | Deepest page and media surround |
| `--color-graphite-900` | `#050607` | Primary graphite field |
| `--color-graphite-850` | `#080a0c` | Brushed and structural surfaces |
| `--color-graphite-800` | `#0b0e11` | Raised controls and panels |
| `--color-graphite-700` | `#15191d` | Highest neutral surface |
| `--color-bg-primary` | Graphite 950 | Root page background |
| `--color-bg-secondary` | Graphite 900 | Major section field |
| `--color-bg-elevated` | Graphite 800 | Raised region |
| `--color-surface-graphite` | Graphite 850 | Structural surface |
| `--color-surface-raised` | Graphite 700 | Highest neutral surface |
| `--color-text-primary` | `#f5f6f4` | Headings and high-emphasis copy |
| `--color-text-secondary` | `#c9ced1` | Body copy |
| `--color-text-muted` | `#858d93` | Secondary metadata |
| `--color-accent-gold` | `#d8ad6d` | Primary highlight |
| `--color-accent-gold-bright` | `#f1d6a6` | Focus, specular edge, thermal highlight |
| `--color-accent-gold-dark` | `#78613d` | Narrow metallic shadow only |
| `--color-accent-copper` | `#a65f44` | Secondary border and thermal body |
| `--color-accent-copper-bright` | `#c9825c` | Readable copper detail where needed |
| `--color-accent-copper-dark` | `#4a2c24` | Narrow metallic shadow only |
| `--color-border-subtle` | `rgb(255 255 255 / .08)` | Neutral separation |
| `--color-border-accent` | `rgb(216 173 109 / .26)` | Important metallic edge |
| `--color-focus` | `#f1d6a6` | Keyboard focus |
| `--color-glow-gold` | `rgb(216 173 109 / .16)` | Small local illumination |
| `--color-glow-copper` | `rgb(166 95 68 / .10)` | Secondary local illumination |

## Role Rules

### Graphite

- Large surfaces must use Graphite 950 through 700.
- A dark surface must remain approximately neutral. Red-heavy or orange-heavy near-black is prohibited.
- Grain and brushed texture may change luminance slightly but may not shift the surface toward brown.

### White

- Major headings remain white or neutral white-metal.
- Warm white is limited to specular detail and the inner thermal region of the hero.
- Beige, cream, and ivory are not page-level text colors.

### Gold

- Gold is the primary interaction and state color.
- Active navigation, focus rings, primary rules, indexes, and important labels use gold.
- Gold does not fill large panels or headings.

### Copper

- Copper is a secondary metal, not a background family.
- Copper may appear in fine borders, lower metallic edges, secondary metadata, and cooler hero plasma.
- Copper-core text is prohibited for normal-size copy because its contrast on Graphite 900 is `4.19:1`.
- Large copper gradients, copper-filled buttons, fog, and page washes are prohibited.

## Gradient and Texture Rules

- Large gradients move only between graphite values or graphite and transparency.
- Metallic gradients are constrained to one-pixel edges, compact controls, or small details.
- Local illumination stays below the readability layer and never sits directly behind body copy.
- Texture remains neutral white-on-graphite. Brown mottling, rust flecks, beige noise, and orange dust are prohibited.

## Hero Thermal Ramp

The live renderer and deterministic fallback share the same hierarchy:

1. neutral graphite at the coolest edge
2. controlled copper in secondary plasma
3. warm gold in the energized body
4. pale gold near the inner structure
5. warm white at the hottest structure

The event horizon and surrounding environment remain black and graphite. Orange is not a standalone palette stop.

## Contrast Reference

Measured against Graphite 900 (`#050607`):

| Foreground | Contrast |
| --- | ---: |
| Primary text `#f5f6f4` | `18.71:1` |
| Secondary text `#c9ced1` | `12.78:1` |
| Muted text `#858d93` | `6.01:1` |
| Gold `#d8ad6d` | `9.77:1` |
| Bright gold `#f1d6a6` | `14.40:1` |
| Copper `#a65f44` | `4.19:1` |
| Bright copper `#c9825c` | `6.60:1` |

Color never carries status by itself. Text, labels, and structure remain present in reduced-color and forced-color environments.

## Enforcement

`npm run check:color` verifies:

- semantic token presence
- removal of the rejected orange/brown legacy values
- graphite-first button treatment
- gold focus treatment
- live and fallback hero palette signatures
- minimum contrast for text and primary highlights
