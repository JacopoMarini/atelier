# Atelier

**One design studio for Claude Code.** Art direction for sites, product UI and design systems, motion
and scrollytelling, accessibility and visual QA, in a single plugin with one shared workflow.

There are dozens of excellent design skills, and installing several of them gives Claude overlapping,
sometimes contradictory rules. Atelier is an original synthesis: it studies the most-used design skills,
keeps their best ideas, removes the duplicates, and organises everything as four desks behind one
director.

[Italiano più sotto](#italiano)

## What's inside

| Skill | What it does |
|---|---|
| `atelier` | The director. Routes the request, owns the shared loop: read the brief, inventory the subject, plan on one screen, check the plan against defaults, build, look, audit, hand off. |
| `art-direction` | Landing pages, brand and marketing sites, portfolios. Pages as arguments, twelve compositional directions, type scales, OKLCH palettes, imagery honesty, copy, and a list of generated-look tells. |
| `product-ui` | Dashboards, tables, forms, settings, onboarding, docs. A full state matrix, token architecture and a `DESIGN.md` template. |
| `motion` | Whether to animate, easing, duration, springs, gestures, performance, reduced motion, and scroll-driven storytelling (CSS scroll timelines, GSAP ScrollTrigger + Lenis, scrubbed video, image sequences). |
| `ui-audit` | WCAG 2.2 AA checklist, interface guidelines, mobile-web fixes, severity-ranked reports with file and line. |

Two scripts are shared by every desk:

- `scripts/tells.mjs` – dependency-free static sweep for accessibility defects and generated-look tells
  in HTML, CSS, JSX, TSX, Vue, Svelte and Astro files. `--strict` makes it usable in CI.
- `scripts/shoot.mjs` – Playwright screenshots at 390/768/1440 px, a reduced-motion capture, optional
  scroll frames (`--scroll N`), dark mode (`--dark`) and an axe-core scan (`--axe`).

## Install

In Claude Code:

```
/plugin marketplace add JacopoMarini/atelier
/plugin install atelier@atelier
```

For the screenshot and axe passes, in the project you are designing:

```bash
npm i -D playwright axe-core
npx playwright install chromium
```

## Use

Ask naturally ("redesign this landing page, it looks generic", "audit the checkout for accessibility",
"add a scroll-driven intro for the product") and the right desk loads. Or call the director with a
command:

```
/atelier:atelier plan    the homepage for a specialty roaster in Melbourne
/atelier:atelier build   src/pages/index.tsx
/atelier:atelier critique src/app/dashboard
/atelier:atelier audit   src/
/atelier:atelier polish  src/components/Pricing.tsx
/atelier:atelier bolder  | quieter | animate | document
```

Run the scripts directly:

```bash
node ~/.claude/plugins/.../atelier/scripts/tells.mjs src --only defects --strict
node ~/.claude/plugins/.../atelier/scripts/shoot.mjs http://localhost:5173 --scroll 6 --axe
```

## Principles

1. The brief wins over taste.
2. Refine or redesign, never both.
3. Content is real: no invented logos, numbers or testimonials.
4. The quality floor (responsive, focus, reduced motion, contrast, states) is not optional.
5. Nothing is finished until it has been looked at.

## Credits

Atelier contains no copied text from other skills. Its ideas were learned from the projects listed in
[CREDITS.md](CREDITS.md); go and use them too.

## License

MIT © Jacopo Marini

---

## Italiano

**Un unico studio di design per Claude Code.** Art direction per siti, UI di prodotto e design system,
motion e scrollytelling, accessibilità e controllo visivo, in un solo plugin con un flusso di lavoro
condiviso.

Installare più skill di design insieme dà a Claude regole che si sovrappongono e a volte si
contraddicono. Atelier è una sintesi originale: studia le skill di design più usate, tiene le idee
migliori, elimina i doppioni e organizza tutto in quattro "scrivanie" guidate da un direttore.

Le skill sono scritte in inglese per un pubblico internazionale, ma funzionano con richieste in
italiano e rispettano la lingua del progetto (tipografia italiana compresa: virgolette, apostrofi,
decimali con la virgola).

Installazione:

```
/plugin marketplace add JacopoMarini/atelier
/plugin install atelier@atelier
```

Poi basta chiedere: "rifai questa landing, sembra generata", "fai un audit di accessibilità del
checkout", "aggiungi un'intro guidata dallo scroll". Per screenshot e scansione axe servono
`playwright` e `axe-core` nel progetto.
