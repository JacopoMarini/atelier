---
name: ui-audit
description: "Audit and visual QA for web interfaces: WCAG 2.2 AA accessibility, interface guidelines (keyboard, focus, forms, touch targets, content, performance), mobile web feel (sticky hover, input zoom, safe areas, 100vh), and screenshot-based visual review at several widths. Use when reviewing a page, component or app before shipping, when asked for an accessibility or quality audit, or as the last step of any Atelier build. Reports ranked findings with file and line."
---

# UI audit

An audit finds what a user would trip over, ranks it, and says how to fix it. It combines three passes:
an automated sweep, a code read against the checklist, and a visual look at the rendered result.

Shared scripts are in the plugin's `scripts/` folder (`${CLAUDE_PLUGIN_ROOT}/scripts`, or two levels
above this file).

References:

- `references/checklist.md` – the full checklist, grouped by area.
- `references/mobile-web.md` – fixes that make a web app feel native on phones.

## Pass 1: automated sweep

```bash
node ${CLAUDE_PLUGIN_ROOT}/scripts/tells.mjs <src-folder-or-files>
```

Flags code-level defects (removed focus outlines, disabled zoom, `transition: all`, `100vh`, small input
fonts, images without `alt`, positive `tabindex`, click handlers on non-interactive elements, and common
generated-look tells). Findings are leads; confirm each before reporting.

If the page runs, also render it:

```bash
node ${CLAUDE_PLUGIN_ROOT}/scripts/shoot.mjs <url-or-file> --out .atelier/shots --axe
```

`--axe` injects axe-core when it can be loaded and writes `axe.json` next to the screenshots. axe finds
roughly a third to a half of WCAG issues; the rest need passes 2 and 3.

## Pass 2: read the code against the checklist

Walk `references/checklist.md` area by area for the files in scope. Pay most attention to the things no
tool sees: focus order and focus return, meaningful names for controls, states (see
`product-ui/references/states.md`), error handling in forms, and reading order versus visual order.

## Pass 3: look

Open the screenshots at 390, 768 and 1440 px and the reduced-motion capture. Check:

- Hierarchy reads at a glance; nothing important is below the fold on a phone that should not be.
- No horizontal scroll, no overlapping elements, no clipped text, no orphaned words in headings.
- Focus is visible on every interactive element (tab through, or screenshot with focus forced).
- Contrast holds where text meets images and gradients.
- Touch targets look large enough and are not crowded.
- The reduced-motion version is complete and readable.

When there is no way to render (no browser, server-only route), say so and list what still needs a
visual check.

## Severity

| Level | Meaning | Examples |
|---|---|---|
| **Blocker** | Someone cannot complete the task | Keyboard trap, unlabeled form fields, submit only by mouse, contrast far below AA on body text, zoom disabled |
| **Major** | Task is possible but hard, or a WCAG AA failure | Missing focus styles, errors not announced, 24 px targets crowded, motion with no reduced version |
| **Minor** | Friction or polish | Inconsistent spacing, missing hover gating, `transition: all`, widow words |
| **Note** | Taste or improvement | Generated-look tells, opportunities for delight |

## Report format

Start with a one-paragraph verdict and the count per severity. Then one table, sorted by severity:

| # | Severity | Where | Problem | Fix | WCAG |
|---|---|---|---|---|---|
| 1 | Blocker | `src/Login.tsx:42` | Password field has no label; screen readers announce "edit text" | Add `<label for="password">` | 1.3.1, 4.1.2 |

Close with what was verified and how (script, code read, screenshots, real device) and what still needs
a human or a real device. When asked to fix, fix in severity order and re-run the passes that cover the
changes.

## Scope notes

- This audit approximates WCAG 2.2 AA conformance; it is not a certification. Say so when someone needs
  a formal statement (for example a public-sector accessibility declaration).
- For legal or public-sector requirements (European Accessibility Act, Section 508, national PA rules),
  name the standard and flag that a full manual audit with assistive technology is needed.
