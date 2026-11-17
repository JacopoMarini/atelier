# Interface checklist

Grouped by area. WCAG 2.2 success criteria are in brackets where one applies; unbracketed items are
quality guidelines.

## Structure and semantics

- [ ] One `<h1>`; heading levels do not skip; headings form a usable outline. [1.3.1]
- [ ] Landmarks: `header`, `nav`, `main`, `footer`; one `main`. [1.3.1]
- [ ] Buttons are `<button>`, links are `<a href>`; links navigate, buttons act. [4.1.2]
- [ ] No click handlers on `div`/`span` without role, tabindex and key handling. [2.1.1, 4.1.2]
- [ ] `lang` set on `<html>`; changes of language marked. [3.1.1, 3.1.2]
- [ ] Page `<title>` describes the page and updates on route change. [2.4.2]
- [ ] DOM order matches visual order. [1.3.2, 2.4.3]
- [ ] Lists are lists, tables are tables with `<th scope>`. [1.3.1]

## Keyboard and focus

- [ ] Everything operable by keyboard; no traps. [2.1.1, 2.1.2]
- [ ] Visible focus on every interactive element, at least 3:1 against its surroundings; use
      `:focus-visible`, never remove outlines without a replacement. [2.4.7, 2.4.11, 1.4.11]
- [ ] Focused elements are not hidden under sticky headers or cookie bars. [2.4.11]
- [ ] Skip link to main content. [2.4.1]
- [ ] Dialogs trap focus while open, close on Escape, return focus to the trigger. [2.4.3]
- [ ] No positive `tabindex`.
- [ ] Shortcuts that use single characters can be turned off or remapped. [2.1.4]

## Names, labels and announcements

- [ ] Every control has an accessible name; icon-only buttons have `aria-label`. [4.1.2]
- [ ] Visible label text is contained in the accessible name. [2.5.3]
- [ ] Images have meaningful `alt`, or `alt=""` when decorative. [1.1.1]
- [ ] Status changes (saved, errors, results count) announced via `aria-live` or `role="status"`. [4.1.3]
- [ ] ARIA only where native HTML cannot do the job; no conflicting roles.

## Forms

- [ ] Every input has a visible `<label>`; placeholders are not labels. [3.3.2]
- [ ] Correct `type`, `inputmode` and `autocomplete` (name, email, tel, street-address, one-time-code).
      [1.3.5]
- [ ] Errors identified in text, linked with `aria-describedby`, with a suggestion to fix. [3.3.1, 3.3.3]
- [ ] Focus moves to the first error on submit; user input is kept.
- [ ] Paste is never blocked, including in password and code fields. [3.3.8]
- [ ] Authentication does not rely on memory tests or puzzles alone. [3.3.8]
- [ ] Information already entered is not asked for again in the same process. [3.3.7]
- [ ] Legal, financial and data-deleting submissions can be reviewed, corrected or reversed. [3.3.4]
- [ ] Submit button stays enabled until the request starts; then shows progress and prevents double
      submit.

## Colour and contrast

- [ ] Text 4.5:1, large text 3:1. [1.4.3]
- [ ] UI component boundaries and meaningful graphics 3:1. [1.4.11]
- [ ] Colour is never the only way to convey information (errors, chart series, required fields).
      [1.4.1]
- [ ] Works in forced-colors / Windows High Contrast mode (borders not only from box-shadow).
- [ ] Dark mode, if offered, passes the same checks.

## Layout, zoom and reflow

- [ ] Zoom not disabled (`user-scalable=no`, `maximum-scale=1` are failures). [1.4.4]
- [ ] Content reflows at 320 CSS px without horizontal scroll (except tables, maps, code). [1.4.10]
- [ ] Text spacing can be increased without loss of content. [1.4.12]
- [ ] Content on hover or focus is dismissible, hoverable and persistent. [1.4.13]
- [ ] Orientation is not locked. [1.3.4]

## Pointer and touch

- [ ] Targets at least 24 × 24 px, or spaced so a 24 px circle does not overlap another target
      [2.5.8]; aim for 44 × 44 px on touch-first UI.
- [ ] Drag actions have a single-pointer alternative (buttons, inputs). [2.5.7]
- [ ] Multi-finger and path gestures have simple alternatives. [2.5.1]
- [ ] Actions trigger on pointer up, so they can be cancelled by moving away. [2.5.2]

## Motion and time

- [ ] `prefers-reduced-motion` honoured with a designed reduced version. [2.3.3]
- [ ] Anything moving for more than 5 s can be paused. [2.2.2]
- [ ] Nothing flashes more than three times a second. [2.3.1]
- [ ] Time limits can be extended or turned off. [2.2.1]
- [ ] No animation on keyboard-driven, high-frequency actions.

## Content and media

- [ ] Videos have captions; audio has transcripts. [1.2.1, 1.2.2]
- [ ] Autoplaying media is muted and pausable. [1.4.2]
- [ ] Link text makes sense out of context, or the context is programmatic. [2.4.4]
- [ ] Help mechanisms (contact, chat, FAQ) appear in the same place across pages. [3.2.6]
- [ ] Long strings (names, emails, IDs, translations) wrap or truncate gracefully.
- [ ] Numbers that align or update use tabular numerals; dates and numbers follow the locale.

## Performance as UX

- [ ] Largest Contentful Paint under 2.5 s, Interaction to Next Paint under 200 ms, Cumulative Layout
      Shift under 0.1.
- [ ] Images sized and in modern formats, `loading="lazy"` below the fold, `fetchpriority="high"` on
      the hero image, `width`/`height` or `aspect-ratio` set.
- [ ] Fonts subset, preloaded when critical, with metric-matched fallbacks.
- [ ] Long lists virtualised; no thousands of DOM nodes.

## Navigation and state

- [ ] URL reflects filters, tabs, pagination and open panels; back button works as expected.
- [ ] Current page marked in navigation (`aria-current="page"`). [2.4.8]
- [ ] Destructive actions confirmed with the object named, or undoable.
- [ ] Unsaved changes warned about before leaving.
