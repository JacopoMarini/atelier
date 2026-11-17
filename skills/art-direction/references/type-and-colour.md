# Type and colour

## Type scales

Pick a ratio by how much drama the direction needs, then derive sizes from a 16–18 px base. Use
`clamp()` so the top of the scale grows with the viewport while body text stays put.

| Ratio | Name | Use for |
|---|---|---|
| 1.125 | Major second | Dense product UI, docs |
| 1.2 | Minor third | Most app screens, quiet utility |
| 1.25 | Major third | Balanced marketing pages |
| 1.333 | Perfect fourth | Editorial, confident marketing |
| 1.5 | Perfect fifth | Poster, field and figure, launches |
| 1.618+ | Golden and above | One or two display sizes only; never for the whole scale |

Fluid display example:

```css
:root {
  --step-0: clamp(1rem, 0.96rem + 0.2vw, 1.125rem);
  --step-1: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
  --step-2: clamp(1.6rem, 1.4rem + 1vw, 2.25rem);
  --step-3: clamp(2.2rem, 1.7rem + 2.4vw, 3.75rem);
  --step-4: clamp(3rem, 2rem + 5vw, 7rem);
}
```

Details that separate set type from default type:

- Line-height falls as size rises: about 1.5–1.65 for body, 1.1–1.2 for headings, 0.9–1.05 for display.
- Letter-spacing tightens slightly at display sizes (−0.01 to −0.04 em) and opens slightly for small
  caps or very small text.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- `font-variant-numeric: tabular-nums` wherever numbers align or update (prices, tables, timers).
- Real quotes and apostrophes (’ “ ”), real ellipsis (…), non-breaking spaces between numbers and units.
- Load only the weights you use; `font-display: swap`; size-adjusted fallbacks to avoid layout shift.

## Pairing logic

A pairing works when the two families do different jobs and look different at a glance:

- **Contrast of structure:** a serif display with a grotesk text face, or a wide display with a narrow
  text face.
- **Contrast of voice:** a characterful display (stencil, slab, high-contrast didone, hand-drawn) with a
  neutral, highly readable text face.
- **Single superfamily:** one family with optical sizes or a variable width axis. Often the most
  sophisticated choice; vary weight, width and size for hierarchy.

Say in the plan why each family fits this subject (its era, its material, its signage, its tone).

## Colour in OKLCH

OKLCH separates lightness (L), chroma (C) and hue (H), so a ramp with even L steps looks even, and
contrast is predictable from L alone.

A five-role palette:

```css
:root {
  --ground:  oklch(97% 0.012 85);   /* page background, tinted toward the hue */
  --ink:     oklch(22% 0.02 85);    /* body text; not pure black */
  --accent:  oklch(62% 0.17 35);    /* the one strong colour; used rarely */
  --support: oklch(80% 0.06 160);   /* fields, panels, secondary surfaces */
  --line:    oklch(88% 0.015 85);   /* borders, dividers */
}
```

Rules:

- Tint neutrals slightly toward the main hue (chroma 0.005–0.02).
- Keep accents out of body text unless contrast passes at that size.
- For dark themes, do not invert: rebuild the ramp. Raise accent lightness, lower its chroma, and use
  surface lightness steps (e.g. 16%, 20%, 24%) for elevation instead of shadows.
- Set `color-scheme: light dark` and a matching `<meta name="theme-color">`.

## Contrast targets (WCAG 2.2)

| Element | Minimum |
|---|---|
| Body text (< 24 px, or < 18.66 px bold) | 4.5:1 |
| Large text | 3:1 |
| UI component boundaries, focus indicators, icons that carry meaning | 3:1 against adjacent colours |
| Placeholder text that conveys information | 4.5:1 |
| Disabled controls | No requirement, but must still be identifiable as disabled |

Check pairs before building. Text over images always needs a scrim, a solid band or a calm crop, and a
check at the worst point of the image.
