---
name: art-direction
description: "Art direction for pages people scroll and decide on: landing pages, marketing and product sites, brand sites, portfolios, events, restaurants, one-pagers and heroes. Use when building, redesigning or reviewing such a page, choosing typography, colour, composition or imagery, writing page copy, or when a page looks generic, templated, bland or 'AI-made'. Part of the Atelier plugin; follows the loop in the atelier skill."
---

# Art direction

A generated page is the average of every page the model has seen: centred headline, small label above
it, three icon cards, a gradient, a testimonial, a call to action. Nothing in it is wrong and nothing in
it was decided. This desk replaces averages with decisions, and then makes sure the decisions are
backed by enough substance that the page does not feel empty.

Follow the loop in the `atelier` skill. This file adds the art-direction detail for steps 3–6 and the
review criteria. References:

- `references/tells.md` – the defaults to check a plan against (step 5). Read it every time.
- `references/directions.md` – twelve compositional directions to choose from in step 4.
- `references/type-and-colour.md` – type scales, pairings, OKLCH palettes, contrast.
- `references/copy.md` – writing the page as an argument; headlines, CTAs, microcopy.

## 1. Write the page as an argument

Before any layout, list the sections as claims with their proof, one line each:

```
Hero      – Claim: you can taste the roast date. Proof: today's batch number and roast time, live.
Origin    – Claim: we buy from three farms only. Proof: the three farms, altitude, harvest month.
Process   – Claim: small drum, long development. Proof: a single annotated roast curve.
Subscribe – Claim: it arrives within 48 h of roasting. Proof: dispatch days on a calendar strip.
```

A section without a claim gets deleted. The order of claims is the order of sections. This is how you
avoid the stock sequence (hero, logo wall, three features, testimonial, pricing, CTA) without trying to.

## 2. Choose a direction

Open `references/directions.md`, shortlist three directions that could carry an item from your subject
inventory, and pick the one that carries it best rather than the most familiar. Write one line on why.
Then fill in the plan from the `atelier` loop (colour, type, layout sketch, signature move).

A direction is a composition and a temperament, not a colour scheme. "Editorial index" with a warm
palette and "editorial index" with a cold one are the same direction.

## 3. The first viewport

The hero opens with the most characteristic thing in the subject's world, in whatever form suits it:
a headline, a photograph, a product in use, a live interface, a number that matters, an interactive
moment. Decide deliberately. The big-number-with-small-label-and-gradient hero is a default; use it only
when the number truly is the story.

Rules of thumb:

- One focal point. If two things compete for first glance, one of them moves below the fold.
- The headline says what this is in the visitor's words, not the company's. Clever comes second.
- The primary action is visible without scrolling at 390 × 844.
- Text over imagery needs a contrast plan (a scrim, a solid band, a crop with calm space), not hope.

## 4. Typography carries the personality

- Choose families for this brief, not the ones you would choose for any brief. Name why each fits.
- One family is enough for most pages. Two must differ clearly in structure (a serif and a grotesk, a
  wide display and a narrow text face), never two similar sans-serifs.
- Use a real scale (see `type-and-colour.md`), set display type large enough to be an image, and let
  tracking tighten as size grows.
- Body measure 45–75 characters. Serif body text gets slightly more line-height than sans.
- Treat display type as an active part of the composition (size contrast, cropping, alignment to the
  grid, interplay with the image), not as a neutral container for the words.

## 5. Colour as fields, not sprinkles

- Build the palette in OKLCH so lightness steps are even and contrast is predictable.
- Prefer whole fields of colour (a section ground, a band, a full-bleed panel) over tinted accents on
  everything. One strong accent used rarely beats five used everywhere.
- Neutrals are tinted toward the palette's hue; pure grey looks unfinished next to a warm image.
- Check every text/ground pair for contrast before building (4.5:1 body, 3:1 large text and UI parts).

## 6. Imagery honesty

- Use the project's real pictures first. If there are none, show the subject's world: its place,
  materials and objects, from open collections with commercial-use licences and a credit line.
- Software shows its own interface, built in HTML with real-looking data that adds up, cropped and
  scaled like a photograph. Grey placeholder bars are the weakest possible picture.
- A physical product with no photography is drawn (illustration or 3D) honestly, never faked as a
  photograph.
- Generated images and video are fine when the user has a tool for them; keep one consistent art
  direction across all of them and say which images are generated.
- Every image has a job (show the thing, show the place, show the result). Decorative stock with no job
  is removed.

## 7. Substance, not just restraint

Removing ornaments is half the work. A page stripped of labels, rules, cards and gradients that gains
nothing in their place reads as thin, and people prefer a rich page with a few tells over an empty one
without them. Add substance in their place: type set larger, whole fields of colour, real pictures of
the subject's world, every section carrying its full content.

Spend boldness in one place. The signature move is loud; everything around it is quiet and exact.
Before shipping, remove one accessory.

## Turning the dial

**Bolder** (for safe, bland pages): enlarge the type scale's top end; replace a tinted accent with a
full colour field; crop images tighter and bigger; break the grid once, on purpose, where the idea
lives; cut the weakest section to give the others room.

**Quieter** (for loud, busy pages): remove every effect that is not the signature move; reduce the
palette to ground, ink and one accent; align everything to one grid; make spacing more generous and
more consistent; replace motion on load with motion on interaction.

## Review criteria

When critiquing a page, score each 1–5 and justify in one line, then list fixes ranked by impact:

1. **Idea** – is there one, and does it come from this subject rather than the category?
2. **Hierarchy** – one focal point per viewport; the eye knows where to go next.
3. **Typography** – deliberate families, real scale, good measure and rag, no orphans in headings.
4. **Colour** – coherent, contrast-safe, used as fields with intent.
5. **Imagery** – real, relevant, consistently art-directed.
6. **Copy** – specific, in the visitor's language, every section earns its place.
7. **Craft floor** – responsive, focus, reduced motion, states, performance.
8. **Tells** – how many items from `tells.md` appear unjustified.
