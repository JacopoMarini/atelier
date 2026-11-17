---
name: motion
description: "Motion design and engineering for web UI: deciding whether something should animate, easing, duration, springs, gestures and drag, micro-interactions, enter/exit transitions, stagger, performance, reduced motion, and scroll-driven storytelling (pinned scenes, scroll-scrubbed video and image sequences, CSS scroll timelines, GSAP ScrollTrigger, Lenis). Use when adding, fixing or reviewing animation or building a scroll experience. Part of the Atelier plugin."
---

# Motion

Motion exists to explain change: where something came from, where it went, what the interface heard.
Motion that explains nothing is decoration, and decoration repeated a hundred times a day becomes
friction. This desk decides first whether to animate, and only then how.

For scroll-driven storytelling, read `references/scroll.md` after this file.

## Decide before animating

Answer in order. Stop as soon as the answer is "don't".

**1. How often will this be seen?**

| Frequency | Decision |
|---|---|
| Many times a minute (keyboard shortcuts, command palette, typing, list navigation by keys) | No animation |
| Many times a day (hover, tabs, toggles, menus) | Minimal: under 150 ms, opacity or a tiny transform |
| Occasionally (dialogs, drawers, toasts, page transitions) | Standard animation |
| Rarely (onboarding, first success, celebrations, marketing) | Room for character |

Actions triggered from the keyboard never wait for an animation.

**2. What does it explain?** Valid answers: where an element came from or went (spatial continuity),
that a state changed, that the input was received, how something works (marketing and onboarding),
or softening a jarring jump. "It looks nice" is only valid for rare moments.

**3. What does it cost?** Time the user waits, main-thread work, battery, and motion sensitivity.

## Easing

- **Entering or reacting to the user:** ease-out. Fast start means immediate feedback.
- **Moving or morphing on screen:** ease-in-out.
- **Colour, opacity, hover:** a gentle ease or ease-out.
- **Continuous motion (progress, marquee, scroll-linked):** linear.
- **Never ease-in for UI.** A slow start reads as lag, at exactly the moment the user is watching.

The CSS keywords are soft. Define stronger curves once as tokens:

```css
:root {
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);       /* quint-like; default for UI */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);   /* very decisive; large entrances */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);    /* on-screen movement */
  --ease-sheet: cubic-bezier(0.32, 0.72, 0, 1);     /* drawers and bottom sheets */
}
```

## Duration

| Element | Duration |
|---|---|
| Press feedback, toggles | 80–150 ms |
| Tooltips, small popovers | 120–200 ms |
| Menus, dropdowns, selects | 150–250 ms |
| Dialogs, drawers, sheets | 200–400 ms |
| Page transitions | 250–450 ms |
| Marketing, storytelling | As long as the story needs |

UI motion stays under about 300 ms. Exits are faster than entrances (roughly two thirds). Distance
matters: a larger travel can take slightly longer; a tiny one should be quicker.

## Craft rules

- **Animate `transform` and `opacity`.** They skip layout and paint. Animating `width`, `height`,
  `top`, `margin` or `box-shadow` costs every frame. Use `clip-path`, `scale` or the FLIP technique
  instead of animating size.
- **List the properties.** `transition: transform 180ms var(--ease-out), opacity 180ms`, never
  `transition: all`.
- **Nothing appears from nothing.** Enter from `scale(0.95)` and `opacity: 0`, not `scale(0)`.
- **Origin matters.** Popovers and menus grow from their trigger (`transform-origin` set to the
  anchor side). Centered dialogs grow from the centre.
- **Press feedback.** Pressable elements scale to about 0.97 on `:active`, 100–150 ms.
- **Interruptible beats scripted.** Prefer transitions (which retarget mid-flight) over keyframes
  (which restart) for anything the user can trigger rapidly. Springs keep velocity when interrupted.
- **Stagger lightly.** 30–60 ms between items, capped so the last item starts within ~300 ms. Never
  block interaction during a stagger.
- **Hover only where hover exists.** Wrap hover effects in `@media (hover: hover) and (pointer: fine)`.
- **Enter without JavaScript** where supported: `@starting-style` for elements that appear, and the
  View Transitions API for page and state transitions, with a plain fallback.
- **Tooltips:** delay the first, then show neighbours instantly while one is open.
- **Crossfades that look like two objects:** add a brief `filter: blur(2–4px)` during the swap to
  merge them, and keep blur small (it is expensive in Safari).

## Springs and gestures

Use springs for things the user's hand drives: drag, swipe, pull, sheets, elements that follow the
pointer. Prefer the bounce/duration model (`{ type: "spring", duration: 0.4, bounce: 0.15 }`) because it
is easy to reason about. Bounce stays at 0–0.25 in UI; more is for play.

Gestures:

- Dismiss on velocity as well as distance: a quick flick should be enough.
- Past a boundary, add resistance that grows with distance instead of a hard stop.
- Capture the pointer once a drag starts; ignore extra touches mid-drag.
- Let the user interrupt any animation by grabbing the element again.

## Performance

- CSS animations and the Web Animations API run off the main thread for transform and opacity; they
  stay smooth while JavaScript is busy. Prefer them for predetermined motion.
- JS-driven animation (requestAnimationFrame, library layout animations, per-frame motion values) is
  for dynamic, gesture-driven or interruptible motion. Watch for dropped frames under load.
- Setting a CSS variable on a parent recalculates styles for every child. For per-frame updates, write
  `transform` on the element itself.
- `will-change` only on elements about to animate, removed afterwards.
- Test on a mid-range phone with CPU throttling, not only on a fast laptop.

## Reduced motion

`prefers-reduced-motion: reduce` means less movement, not no feedback:

- Remove translation, scaling, parallax, auto-playing video, scroll-jacking and large zooms.
- Keep opacity and colour transitions that help comprehension, shortened.
- Scroll-scrubbed scenes become static frames or a simple sequence with plain scrolling.
- Provide a pause control for anything that moves for more than 5 seconds (WCAG 2.2.2).

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Use the blanket reset only as a safety net; design the reduced version of important moments on purpose.

## Personality

Motion should match the product. A banking dashboard is crisp and quick; a children's app can be
springy; a luxury brand can be slower and use gentle eases. Decide the motion character in the plan
(two or three words) and keep it consistent.

## Review format

When reviewing motion code, answer with one table, a row per issue:

| Before | After | Why |
|---|---|---|
| `transition: all 400ms ease-in` | `transition: transform 180ms var(--ease-out), opacity 180ms` | Name properties; ease-in feels laggy; UI under 300 ms |

Then list what needs checking in slow motion or on a real device. To slow everything for inspection,
multiply durations temporarily (DevTools Animations panel at 10–25 %) and step frame by frame.
