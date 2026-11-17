---
name: product-ui
description: "Design for screens people work in: dashboards, admin and analytics views, tables, forms, settings, billing, inboxes, editors, onboarding, empty, loading and error states, plus docs and reading surfaces. Also builds and documents design systems: tokens, components, DESIGN.md. Use when building, refactoring or reviewing app UI, extracting tokens from existing code, or writing a DESIGN.md. Part of the Atelier plugin; follows the loop in the atelier skill."
---

# Product UI

On a page, design persuades. In a product, design gets out of the way so the user can finish the job,
and the brand lives in precise details. Expression is measured in correctness: alignment, density,
state coverage, speed, copy that names things the way users think.

Follow the loop in the `atelier` skill. For step 3, inventory the user's work, not the brand: the
objects they handle, the decisions they make, how often, under what pressure, on what device.

References:

- `references/states.md` – the state matrix every screen must cover.
- `references/design-md.md` – the DESIGN.md template and the token architecture.

## Principles

1. **Familiar beats novel.** Users bring habits from every other app. A table, a sidebar, a command
   palette and a settings form should behave the way they expect. Innovate only where the user's job is
   unusual.
2. **Density follows frequency.** Screens used all day can be dense; screens used once a month need
   explanation. Offer density settings in data-heavy tools.
3. **One primary action per view.** Secondary actions are visibly secondary; destructive actions are
   separated and confirmed or undoable.
4. **Every number is real and adds up.** Totals equal their parts, percentages sum, dates are plausible.
   Dashboards state one finding per chart in its title ("Refunds doubled after the 3 March release"),
   not just a metric name.
5. **The URL is state.** Filters, tabs, pagination, sort order and opened panels survive reload and can
   be shared.
6. **Speed is design.** Optimistic updates for safe actions, skeletons that match the final layout,
   no spinners for under 300 ms, no layout shift when data arrives.

## Layout

- Use a spacing scale on a 4 px base (4, 8, 12, 16, 24, 32, 48, 64). Every gap comes from the scale.
- Group by proximity first, then by background, then by borders. Most dividers can be removed by
  spacing.
- Align to a few strong edges. Labels, values and actions in a form share columns.
- Sidebars hold navigation, not content; keep them collapsible on narrow screens.
- Tables: left-align text, right-align numbers with tabular numerals, keep the header sticky, allow
  column sorting where order matters, truncate with a tooltip rather than wrapping IDs.
- Responsive does not mean stacked: decide for each region what happens at 390, 768 and 1280 px. Tables
  become cards or gain horizontal scroll with a pinned first column.

## Components

- Buttons: clear hierarchy (primary, secondary, ghost, destructive), a pressed state, a loading state
  that keeps the width, a disabled state with a reason available.
- Inputs: visible label (never placeholder-only), helper text, error text tied with
  `aria-describedby`, correct `type`, `inputmode` and `autocomplete`, 16 px minimum font size on mobile.
- Forms: validate on blur and submit, not on every keystroke; keep the user's input after an error;
  focus the first invalid field; never block paste.
- Dialogs: for decisions that need focus. Trap focus, close on Escape, return focus to the trigger.
  Prefer inline editing or a side panel for anything the user does often.
- Toasts: for confirmations, with undo where possible. Never for errors the user must act on.
- Charts: one series colour per meaning, consistent across the product; direct labels over legends;
  axis starting at zero for bars; a table alternative for screen readers.

## Brand in a tool

Brand appears in: the type family and its set details, one accent colour used for primary actions and
focus, the quality of icons, the empty-state illustrations, the voice of microcopy, and motion
character. It does not appear as gradients, glows, decorative cards or icons in tinted squares on
every heading.

## Reading surfaces

Docs, help centres, changelogs and long articles follow product rules plus:

- Measure 60–75 characters, generous line-height, clear heading levels that form a usable outline.
- A table of contents for long pages, sticky on wide screens, highlighting the current section.
- Code blocks with copy buttons, line wrapping control and language labels.
- Anchor links on every heading; the URL updates as the reader scrolls.
- Search that is reachable from the keyboard (`/` or `Ctrl/Cmd K`).

## Design systems

When the task is to create, extract or document a system:

1. **Inventory what exists.** Grep colours, font sizes, spacing values, radii, shadows and z-indexes.
   Count each value's uses. Near-duplicates (`#111` vs `#121212`, 15 px vs 16 px) are drift.
2. **Collapse to tokens** in three layers: primitive (`--blue-600`), semantic (`--color-action`,
   `--color-danger`, `--space-inline-md`), component (`--button-bg`). Code references semantic or
   component tokens only.
3. **Name by role, not appearance.** `--color-surface-raised`, not `--grey-50`.
4. **Write DESIGN.md** with the template in `references/design-md.md`, including the decisions and the
   reasons, so future sessions do not drift.
5. **Migrate in small steps,** one component family at a time, with screenshots before and after.

## Turning the dial

**Bolder** for a lifeless tool: give the accent real work (primary actions, focus, selection), add
weight contrast to headings, design the empty states, and introduce one memorable detail (a distinctive
icon set, a signature chart style, a satisfying confirmation moment).

**Quieter** for a noisy tool: remove borders that spacing already implies, reduce colours to neutrals
plus one accent plus status colours, unify radii and shadows to one or two levels, cut decorative icons,
replace badges with plain text where they carry no state.

## Review criteria

Score 1–5 with one line each, then ranked fixes:

1. **Task clarity** – can a first-time user tell what this screen is for and what to do next?
2. **Hierarchy and density** – right amount on screen for how often it is used.
3. **State coverage** – every row of `states.md` handled.
4. **Consistency** – tokens, components and copy behave the same everywhere.
5. **Feedback and speed** – actions confirm, errors guide, nothing shifts.
6. **Accessibility** – run `ui-audit`.
