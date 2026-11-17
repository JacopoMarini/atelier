# Scroll-driven storytelling

In a scroll film, scroll position is the timeline. Done well, it lets a visitor control the pace of a
story; done badly, it hijacks scrolling and makes a page slow and nauseating. These rules keep it on the
right side.

## Choose the lightest tool that works

| Need | Tool |
|---|---|
| Reveal, progress bar, parallax, simple pinned fade | **CSS scroll-driven animations** (`animation-timeline: view()` / `scroll()`), no JS |
| Pinned sections, multi-step timelines, scrubbing tied to sections, snapping | **GSAP ScrollTrigger** |
| Smooth, inertial scrolling that feeds a scrub | **Lenis**, synced to GSAP's ticker |
| Product rotating or a scene playing as you scroll | **Image sequence on canvas** (best quality) or **scrubbed video** (lighter to produce) |
| True 3D scene | Three.js / React Three Fiber, scroll drives the camera |

CSS scroll timelines need a fallback or progressive enhancement: wrap in
`@supports (animation-timeline: view())` and let the content be fully readable without it.

## Structure

- Divide the story into **chapters**. Each chapter is a pinned scene with a defined scroll length
  (e.g. `end: "+=150%"`), one idea, and its text.
- Text must be readable at rest at every point, not only mid-animation. Never let the only copy of a
  message exist in a frame the user scrolls past quickly.
- Give the visitor orientation: chapter markers, a progress indicator, and a way to skip to the end or
  to a chapter.
- End pinned sequences before forms, pricing and anything the user needs to use.

## Scrubbed video

- Encode for seeking: every frame a keyframe, no B-frames, so `currentTime` jumps are instant.

  ```bash
  ffmpeg -i in.mp4 -an -vf "scale=1920:-2,fps=30" -c:v libx264 -preset veryfast \
    -crf 23 -g 1 -keyint_min 1 -bf 0 -movflags +faststart -pix_fmt yuv420p scrub-1920.mp4
  ```

  Make a smaller version for phones (e.g. 960 px wide, crf 26) and pick by viewport.
- Map scroll progress to `video.currentTime` inside a requestAnimationFrame loop, smoothing toward the
  target rather than setting it on every scroll event.
- `muted`, `playsinline`, `preload="auto"`, a poster frame, and a fallback image if the video cannot
  load.
- iOS Safari seeks slowly on long or large files: keep clips short (under ~10 s) and small.

## Image sequences

- Export 60–150 frames as WebP or AVIF, sized per breakpoint.
- Preload progressively: first frame immediately, then every eighth frame, then fill the gaps, so the
  scene is scrubbable early in coarse steps.
- Draw to a `<canvas>` sized with `devicePixelRatio` (capped at 2) and `object-fit: cover` maths.
- Release memory for sequences far off screen on long pages.

## GSAP + Lenis skeleton

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduce) {
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.timeline({
    scrollTrigger: { trigger: "#chapter-1", start: "top top", end: "+=150%", scrub: true, pin: true },
  })
    .from("#chapter-1 .title", { yPercent: 20, opacity: 0 })
    .to("#chapter-1 .product", { scale: 1.15 }, "<");
});
```

`gsap.matchMedia()` cleans up and rebuilds animations when breakpoints or motion preferences change.

## Mobile

- Touch scrolling has momentum and the browser chrome resizes the viewport: use `svh`/`dvh` units for
  pinned scenes and call `ScrollTrigger.refresh()` after fonts and images load.
- Shorten pinned distances on phones; long pins feel like a stuck page.
- Consider replacing scrubbed sequences with short autoplaying loops or static frames on low-power
  devices (`navigator.connection.saveData`, small `deviceMemory`).
- Never disable native scrolling or zoom.

## Accessibility and performance checklist

- [ ] Reduced motion: no pinning or scrubbing; content in a normal reading order with static images.
- [ ] All story text is real HTML text, in DOM order matching the visual order.
- [ ] Keyboard users can scroll through and reach every link; focus is not trapped inside pins.
- [ ] Nothing flashes more than three times per second.
- [ ] Largest Contentful Paint under 2.5 s on 4G: poster image first, heavy media later.
- [ ] No layout shift when media loads (reserve space with `aspect-ratio`).
- [ ] Frame rate holds on a mid-range phone; screenshot frames down the page with
      `shoot.mjs --scroll 8` and review them in order.
