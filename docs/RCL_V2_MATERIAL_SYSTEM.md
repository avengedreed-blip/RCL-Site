# RCL V2 Material System

The V2 material system gives the site physical hierarchy without presenting decoration as engineering evidence. It uses authored CSS gradients and local procedural texture only. It contains no stock textures, generated texture images, or simulated product UI.

## Material Tokens

| Material | Base | Highlight | Shadow | Border | Texture | Intended use | Prohibited use |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Graphite Base | `#050607` | `rgba(255,255,255,.025)` | `#020304` | `rgba(255,255,255,.08)` | Fine irregular graphite speckle | Page field and large uninterrupted dark areas | Floating cards or visible noise |
| Graphite Raised | `#0b0e11` | `rgba(255,255,255,.052)` | `rgba(0,0,0,.72)` | `rgba(216,173,109,.26)` | Low-opacity mottling and directional light | Elevated sections, records, and framed media | Large glossy panels |
| Brushed Dark Metal | `#080a0c` | `rgba(255,255,255,.042)` | `#020304` | `rgba(216,173,109,.18)` | Fine horizontal anisotropic streaks | Footer, sealed media bays, select structural areas | Every page section |
| Warm Copper | `#a65f44` | `#c9825c` | `#4a2c24` | Tonal copper-to-dark-copper | None beyond metallic ramp | Secondary edge warmth and metadata | Large fills, fog, body text, or primary controls |
| Warm Gold | `#d8ad6d` | `#f1d6a6` | `#78613d` | Champagne highlight to dark-gold edge | None beyond metallic ramp | Primary rules, active indicators, labels, and focus | Large headings or continuous glow |
| White Metal | `#eef0ef` | `#ffffff` | `#91989d` | Neutral silver hairline | Subtle reflective ramp | Primary type details and logo-adjacent highlights | Chrome glare or decorative embossing |
| Smoked Surface | `rgba(9,11,13,.82)` | `rgba(255,255,255,.04)` | `rgba(0,0,0,.65)` | `rgba(216,173,109,.2)` | Very faint graphite texture | Small instrument labels and hero status rail | Large blurred page sections |
| Technical Paper | `#d8dcdd` | `#f3f5f4` | `#969da1` | `rgba(120,97,61,.42)` | Fine neutral fiber-like cross grain | Future editorial contrast moments only | Current default sections or product panels |

## Surface Planes

1. **Background plane** uses Graphite Base with the lowest grain intensity.
2. **Structural plane** uses Graphite Raised or Brushed Dark Metal at section seams and the footer.
3. **Elevated content plane** uses tonal separation, an inner top highlight, and a restrained lower shadow.
4. **Media plane** uses a dark outer graphite frame and a fine metallic inner edge.
5. **Accent plane** uses thin copper and gold rules, labels, focus rings, and short interaction highlights.
6. **Simulation plane** remains visually dominant and receives only masked grain and edge integration.

## Texture Profiles

- `--material-texture-page`: irregular low-contrast graphite speckle for the global field.
- `--material-texture-raised`: localized mottling that supports elevated surfaces.
- `--material-texture-brushed`: horizontal anisotropic lines for select structural metal.
- `--material-texture-paper`: subtle crossed fiber for a future limited editorial surface.
- `--material-grain-page`, `--material-grain-raised`, and `--material-grain-metal` control intensity independently.

Textures remain static so they cannot shimmer during scrolling. They are suppressed or simplified in forced-colors mode.

## Reusable CSS Primitives

- `.material-graphite-base`
- `.material-graphite-raised`
- `.material-brushed-metal`
- `.material-smoked-surface`
- `.material-technical-paper`
- `.material-frame`
- `.material-media-frame`
- `.material-sealed-bay`
- `.material-control`
- `.material-simulation-plane`

These primitives establish a material role. Page-specific selectors may adjust layout, but they should not redefine the material from scratch.

## Metallic Interaction Rules

- Metallic edges are one CSS pixel.
- Copper provides a restrained secondary core; gold provides the primary narrow highlight.
- Hover sheen is user-triggered, under 400 ms, and never continuous.
- Focus uses `#f1d6a6` as a visible warm-gold outline independent of fill color.
- Reduced motion disables sheen translation and image lift.
- No meaning is communicated through metallic color alone.

## Restraint Rules

- Do not add a panel because a section feels empty.
- Do not place grain at equal strength on every plane.
- Do not put gradients behind body copy unless they model a local surface.
- Do not use copper or gold to tint large surfaces; both accents must sit on neutral graphite.
- Do not use copper-core text for normal-size copy. Its `4.19:1` contrast on Graphite 900 is reserved for non-text decoration; text uses gold, copper highlight, or white.
- Do not use metallic text for paragraphs or large headings.
- Do not substitute sealed-bay surfaces for evidence.
- Do not add fake serials, coordinates, diagnostics, certification marks, or interface controls.
- Preserve authentic product media as the highest-contrast evidence surface.

## Performance Boundary

The system uses CSS background layers, pseudo-elements, opacity, and transform. It adds no runtime JavaScript, large raster textures, SVG filters, backdrop-filter stacks, or per-frame DOM updates. The WebGL hero remains independently adaptive and is not sampled by the material layer.
