# DESIGN.md

`DESIGN.md` at the project root records design decisions so later sessions, and other people, keep
them. Write it after a new build or redesign, update it when a decision changes, and read it at step 1
of every Atelier loop.

Keep it short (one to three screens). Record decisions and reasons, not documentation of every
component.

## Template

```markdown
# Design

## Product
One paragraph: what this is, who uses it, the main job, the surface types (Pitch, Stage, Tool, Read).

## Idea
The design idea in one sentence, and the subject-inventory item it comes from.

## Principles
3–5 short rules specific to this product (not generic ones like "be consistent").

## Tokens

### Colour
| Token | Value (OKLCH) | Role |
|---|---|---|
| --color-ground | oklch(…) | Page background |
| --color-ink | oklch(…) | Body text |
| --color-accent | oklch(…) | Primary actions, focus, selection |
| … | | |

### Type
| Token | Family / size / line-height / weight | Use |
|---|---|---|

### Space, radius, elevation, motion
Scale values and where each is used. Motion: durations, easing curves, what animates and what never does.

## Components
Only the decisions that are not obvious from the code: why the table has no zebra stripes, why
dialogs are reserved for destructive actions, and so on.

## Voice
Two sample sentences, words we use, words we avoid.

## Do not
Patterns tried and rejected, with the reason, so they are not reintroduced.

## Changelog
- YYYY-MM-DD: what changed and why.
```

## Token architecture

```
primitive  → --blue-600, --space-4, --radius-2          (raw values, never used directly in components)
semantic   → --color-action, --space-inline-md          (meaning; themes swap these)
component  → --button-bg: var(--color-action)           (optional; for components with many variants)
```

Themes (light, dark, high contrast, brand variants) are new mappings at the semantic layer. Components
never change between themes.

For Tailwind projects, put semantic tokens in CSS variables and map them in the theme config, so
utilities read `bg-action` rather than `bg-blue-600`.
