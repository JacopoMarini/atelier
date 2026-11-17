# Tells: the defaults to check a plan against

These are patterns that show up whatever the subject is. None is forbidden. Each is a default rather
than a choice, so it needs a reason from the brief or the subject inventory to stay. If the brief pins
one of them, it stays without discussion.

Use this list in step 5 of the loop (check the plan) and again in review. `scripts/tells.mjs` detects
the ones that can be found in code; the rest need your eyes.

## Palette defaults

- **Warm parchment and clay.** A cream ground (around `#F4F1EA`) with a high-contrast serif and a
  terracotta accent (around `#D97757`). The terracotta is also the accent of Claude's own interface, so
  on a client's page it reads as the tool's signature, not the client's.
- **Dark with one acid accent.** Near-black ground with a single lime, acid-green or vermilion accent.
- **Tinted near-black standing in for black** (`#0B0B0B`, `#111`, `#0A0A0A`) on every dark surface.
- **Purple-to-blue gradient washes** as backgrounds or behind headings.
- **Gradient text** on the hero headline.
- **Glows and blurred colour blobs** floating behind content with no relation to it.

## Typography defaults

- **One word accented** in the headline: one word in italic, a different colour, a highlighter or an
  underline squiggle.
- **Tracked all-caps eyebrow** above every heading ("FEATURES", "HOW IT WORKS").
- **Monospace for small labels** and metadata on a page that is not about code.
- **The same two families** you would choose for any page (a geometric sans for everything, or the
  current fashionable serif plus Inter).
- **Centred everything,** including multi-line body text.
- **Headings that wrap with one orphaned word** on the last line.

## Structure defaults

- **The stock section sequence:** hero, logo wall, three features, how it works (01/02/03),
  testimonial, pricing, CTA, footer.
- **Numbered markers** (01 / 02 / 03) on content that is not a sequence.
- **The SaaS card kit:** everything chopped into identical rounded cards with the same radius, the same
  soft grey shadow (`rgba(0,0,0,.1)`) and an icon in a tinted square at the top.
- **The big-number hero:** a giant stat, a small label, a gradient accent.
- **Bento grid** used because it is fashionable, not because the content has different weights.
- **Broadsheet pastiche:** hairline rules, zero radius, dense newspaper columns on a page that is not
  editorial.
- **Fake browser chrome** (three dots) around every screenshot.

## Ornament defaults

- **Middle-dot meta strings** (`Design · Build · Ship`).
- **"WORD — fragment" labels** with a spaced em dash.
- **Arrows appended to every link and button** (`Learn more →`).
- **Sparkle, rocket and lightning icons** as decoration.
- **Pill badges** ("New", "Beta", "AI-powered") above the headline with nothing new behind them.
- **Grain, noise and dot-grid overlays** on every section.

## Motion defaults

- **Fade-and-slide-up on every section** as it enters the viewport.
- **Hover lift and shadow on every card.**
- **Scattered effects** (a marquee here, a tilt there, a counter there) instead of one orchestrated
  moment.
- **`transition: all`** and durations above 400 ms on UI controls.

## Copy defaults

- Headlines built on "Unlock", "Elevate", "Supercharge", "Seamless", "Effortless", "Next-level",
  "Built for the future of".
- Three-word triplets ("Fast. Simple. Powerful.").
- Invented metrics and testimonials ("10,000+ happy customers", "Trusted by teams at…") that the brief
  never provided.
- CTAs that do not say what happens ("Get started", "Submit", "Learn more").

## How to replace a default

Do not swap one default for another fashionable one. Go back to the subject inventory and ask which
item could do the job the default was doing. The eyebrow label that announced "MENU" becomes the
restaurant's actual chalkboard lettering; the three feature cards become one annotated photograph of the
product in use; the gradient wash becomes a full field of the colour of the client's door.
