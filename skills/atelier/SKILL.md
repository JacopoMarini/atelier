---
name: atelier
description: "Design director for any frontend work: plans, routes and checks web design so it looks decided rather than generated. Use when the user asks to design, redesign, restyle, polish, critique or review a website, landing page, portfolio, app screen, dashboard, component, animation or scroll experience, or says a page looks generic, templated or 'AI-made'. Routes to art-direction, product-ui, motion and ui-audit, and owns the shared loop: brief, plan, default check, build, look, audit."
argument-hint: "[plan | build | critique | audit | polish | bolder | quieter | animate | document] [target]"
---

# Atelier

Atelier is one design studio with four desks. This file is the studio manager: it decides which desk
handles the request, and it owns the loop every desk follows. The desks are sibling skills in this
plugin:

| Desk | Skill | Takes |
|---|---|---|
| Art direction | `art-direction` | Pages people scroll and decide on: landing, marketing, brand, portfolio, event, restaurant, one-pager |
| Product UI | `product-ui` | Screens people work in: dashboards, tables, forms, settings, onboarding, empty and error states, design systems and tokens |
| Motion | `motion` | Animation, transitions, gestures, micro-interactions, scroll-driven storytelling and video scrubbing |
| Audit | `ui-audit` | Accessibility (WCAG 2.2 AA), interface guidelines, mobile web feel, visual QA by screenshot |

Most real requests touch two desks. A landing page is art direction plus a motion pass plus an audit.
A dashboard is product UI plus an audit. Load the desks you need, in that order, and no others.

Shared tools live in the plugin's `scripts/` folder. Call them as `${CLAUDE_PLUGIN_ROOT}/scripts/...`;
if that variable is empty, the folder is two levels above this file (`<this skill>/../../scripts`).

## Rules that outrank everything below

1. **The brief wins.** If the user pins a font, palette, era, layout or reference site, follow it
   exactly, even when it matches a pattern this plugin calls a default. Steering a clear brief toward
   your own taste is a failure, not a rescue.
2. **Refine or redesign, never both.** A refinement keeps the existing identity, copy and behaviour and
   changes only what was asked. A redesign keeps content, function and constraints and replaces the
   look. Do not polish a look you were asked to replace, and do not replace a look you were asked to
   polish. If the request is unclear on this, ask once.
3. **Content is real.** Use the brief's real names, numbers and copy. When copy is missing, write it in
   the product's voice; never ship lorem ipsum, fake logos, invented testimonials or vanity metrics
   presented as fact.
4. **The quality floor is not optional and not announced.** Responsive to 360 px, visible keyboard
   focus, reduced motion respected, contrast passing AA, real states for loading, empty and error. Do
   it without listing it as a feature.
5. **You have not finished until you have looked.** Render the result and inspect it at the sizes it
   ships at. Code that has never been seen is a draft.

## Routing

Read the arguments first.

- **No argument and no clear task:** ask what they want to make or fix, offering the four desks as
  options. Do not start work.
- **`plan [target]`:** run steps 1–5 of the loop and stop with the plan for approval.
- **`build [target]`:** run the whole loop.
- **`critique [target]`:** load the matching desk, then `ui-audit`, and review without editing. Score
  and rank findings; propose fixes.
- **`audit [target]`:** load `ui-audit` only.
- **`polish [target]`:** a refinement pass: spacing rhythm, type details, states, focus, motion
  timing. Load the matching desk and `ui-audit`. Change nothing structural.
- **`bolder` / `quieter [target]`:** load `art-direction` (or `product-ui` for app screens) and read
  its "Turning the dial" section.
- **`animate [target]`:** load `motion`.
- **`document`:** load `product-ui` and write or update `DESIGN.md` from the existing code.
- **Anything else:** treat it as `build` if something must be made, `critique` if something must be
  judged.

Choosing the desk: decide by the surface being made, not the company. A developer tool's homepage is
art direction; a fashion brand's order-history screen is product UI; a docs page is product UI with
reading rules (see `product-ui` → "Reading surfaces").

## The loop

Every desk follows these nine steps. The desks add their own detail to steps 3–6.

### 1. Read what is real

Before designing, find out:

- **Subject and audience.** What is this, who is it for, and the one thing the surface must get them
  to do or understand.
- **Stack and constraints.** Framework, CSS approach, component library, browsers, performance budget.
- **What already exists.** Look for `DESIGN.md`, `PRODUCT.md`, a tokens file, Tailwind config, theme
  files, a component library, brand assets. Existing tokens are law for a refinement and evidence for
  a redesign.
- **What imagery truly exists.** Real photos, product screenshots, illustration, an image or video
  generation tool you can call, or nothing. Never plan a layout around pictures you do not have.

If the request is vague, state your reading in one line and continue. Ask only when a missing fact
blocks the work (no product name, no idea what the product does).

### 2. Name the surface type

Pick one. It sets how much expression the work gets.

- **Pitch** – the visitor decides and acts (landing, pricing, campaign). Full commitment to a point of
  view.
- **Stage** – the work itself is the content (portfolio, gallery, showcase). The interface recedes.
- **Tool** – the user completes tasks (app, dashboard, admin, editor). Precision over expression;
  familiar patterns earn their place.
- **Read** – the user needs to understand (docs, articles, help). Comprehension first, then pleasure.

### 3. Inventory the subject

Write eight to twelve things that belong to this subject and no competitor: its name and what it means,
its place and that place's materials, colours, signs and light; the numbers in the brief; its rituals,
hours and constraints; the printed and physical objects of its world (tickets, labels, receipts,
packaging, instruments). For a Tool, inventory the user's work instead: the objects they handle, the
decisions they make, how often, under what pressure.

This list is where the design idea comes from. Generic pages come from categories ("a coffee site");
distinctive pages come from one item on this list ("the roaster lights the drum at 5:40 every day").

### 4. Plan on one screen

Write a compact plan before any code:

- **Idea:** one sentence connecting the design to one inventory item.
- **Colour:** 4–6 named values (prefer OKLCH) with their roles: ground, ink, accent, support, state.
- **Type:** one or two families with roles and a scale. Two families must be clearly different.
- **Layout:** an ASCII sketch of the first viewport and the section sequence, with alignment rules.
- **Signature move:** the single memorable thing. Everything else stays disciplined around it.
- **Motion:** at most one orchestrated moment for a Pitch or Stage, feedback-only motion for a Tool.

### 5. Check the plan against the defaults

Open `art-direction/references/tells.md` and compare each line of the plan with it. For every line that
you would have written for any similar brief, replace it with a choice taken from the inventory, and say
in one line what you changed and why. Patterns pinned by the brief stay. This step is where most of the
quality comes from; do not skip it because the plan "looks fine".

### 6. Build

Follow the desk's build rules. Build with real content end to end. Keep CSS specificity flat (one
class per component part, tokens as custom properties) so spacing rules do not cancel each other.

### 7. Look

Render and screenshot at 390, 768 and 1440 px wide, full page, plus reduced-motion:

```bash
node ${CLAUDE_PLUGIN_ROOT}/scripts/shoot.mjs <url-or-html-file> --out .atelier/shots
```

Add `--scroll 6` for scroll-driven pages to capture frames down the page. Open the images and judge
them like a juror: hierarchy at a glance, rhythm, crowding, orphaned words, broken wraps, contrast,
whether the signature move actually lands. Fix everything one look reveals, then look again. Batch
fixes; do not screenshot after every tweak.

If the page cannot run here (no browser, server-only app), say so and review the code instead, naming
what still needs a visual check.

### 8. Audit

```bash
node ${CLAUDE_PLUGIN_ROOT}/scripts/tells.mjs <src-folder-or-files>
```

This flags common defects and generated-look tells in HTML, CSS, JSX and TSX. Treat its output as
leads, not verdicts: a pinned brief can justify a flagged pattern. Then run the `ui-audit` checklist
for anything the script cannot see (focus order, labels, states, touch targets).

### 9. Hand off

Report in a few lines: the idea, the signature move, what you checked and how, anything that still
needs a human eye or a real device. For new or redesigned products, write or update `DESIGN.md` (see
`product-ui/references/design-md.md`) so the next session keeps the same decisions.

## Turning down a request

If asked to imitate a real brand's identity so closely that it could be mistaken for it, or to
reproduce a protected logo or character, decline that part and offer an original direction in the
same spirit.
