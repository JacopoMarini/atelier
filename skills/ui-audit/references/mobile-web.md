# Mobile web feel

Most "this feels janky on my phone" reports are platform details, not animation problems. Desktop
device emulation does not reproduce most of them, so state which fixes were verified on a real device.

Fix with CSS and meta tags before reaching for JavaScript, and gate by capability (media queries), not
by user agent or screen width.

| Symptom | Cause | Fix |
|---|---|---|
| Hover style stays after a tap | Touch devices emulate hover on tap | Put hover styles inside `@media (hover: hover) and (pointer: fine)` |
| Grey or blue flash on tap | Default tap highlight | `-webkit-tap-highlight-color: transparent` on interactive elements, with a real `:active` style instead |
| Page zooms when an input is focused (iOS) | Input font size under 16 px | `font-size: max(16px, 1rem)` on inputs, selects and textareas. Never disable zoom |
| Full-height section jumps or is cut off | `100vh` includes the area behind browser chrome | Use `100svh` (stable) or `100dvh` (dynamic), with `100vh` as a fallback before it |
| Content under the notch or home bar | Safe areas ignored | `viewport-fit=cover` in the viewport meta, then `padding: env(safe-area-inset-*)` on fixed bars and full-bleed edges |
| Pull-to-refresh or bounce inside an app panel | Scroll chaining | `overscroll-behavior: contain` on scrollable panels, sheets and modals |
| Long-press selects button text or opens a menu | Default selection and callout | `user-select: none` and `-webkit-touch-callout: none` on controls only, never on body text |
| Taps feel slow | Double-tap zoom delay on old setups, or work on `touchend` | Proper viewport meta (`width=device-width, initial-scale=1`), `touch-action: manipulation` on controls |
| Scroll is janky with fixed backgrounds | `background-attachment: fixed` on mobile | Use a fixed pseudo-element or a transform-based parallax instead |
| Browser bar colour clashes | No theme colour | `<meta name="theme-color" content="…" media="(prefers-color-scheme: light)">` and a dark variant |
| Body scrolls behind an open sheet | No scroll lock | Lock the body (or use `overflow: hidden` on the root plus `overscroll-behavior`), restore position on close |
| Keyboard covers the focused input | Fixed footer or layout ignores the visual viewport | Use `dvh`, `scrollIntoView({ block: "center" })` on focus, or the `interactive-widget=resizes-content` viewport hint |
| Horizontal swipe navigates back instead of scrolling a carousel | Edge swipe conflicts | Keep carousels away from screen edges or use `overscroll-behavior-x: contain` |
| Text too small or lines too long | Desktop type scale on phones | Body at least 16 px, measure 35–60 characters on phones |

## Verify on hardware

Run the dev server bound to the network (`--host`), open it on the phone by the computer's IP, and use
Safari Web Inspector (iOS) or `chrome://inspect` (Android) to debug. Check: the keyboard, rotation,
notch, home indicator, pull-to-refresh, back gesture and a slow network.

## React Native and Expo

These rules are for the mobile web. Native apps follow platform guidelines (Human Interface Guidelines,
Material 3): native navigation, haptics for confirmations, Dynamic Type and font scaling, safe area
handling through the framework, and 44 pt (iOS) / 48 dp (Android) targets.
