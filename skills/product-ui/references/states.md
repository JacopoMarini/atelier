# State matrix

Every data-bearing screen and component must handle each row. In review, go row by row and mark each
as handled, missing or not applicable.

| State | What the user should see | Common failure |
|---|---|---|
| **First use (empty, never had data)** | What this place is for, why it matters, the one action that fills it, ideally with a sample or import | A blank table with "No data" |
| **Empty after filtering** | That filters caused it, which ones, and a one-click way to clear them | Same message as first use |
| **Loading (first load)** | A skeleton matching the final layout; nothing for loads under ~300 ms | Full-page spinner, layout jump on arrival |
| **Loading (refresh / pagination)** | Existing content stays; a subtle inline indicator | Content disappears and reappears |
| **Partial data** | What loaded, what failed, retry for the failed part | Whole screen fails because one widget failed |
| **Error (recoverable)** | What happened in plain words, what to do, a retry; user input preserved | "Something went wrong" |
| **Error (permission)** | That they lack access, who can grant it, how to request it | Generic 403 page |
| **Offline** | That they are offline, what still works, that changes will sync | Silent failure |
| **Success** | Confirmation in the same verb as the action, with undo if possible | No feedback, or a modal that must be dismissed |
| **Too much data** | Pagination or virtualisation, totals, search, sensible truncation | Thousands of DOM rows, broken layout |
| **Very long content** | Long names, emails, IDs, translated strings handled with wrapping or truncation and a tooltip | Overflowing cells, buttons that grow |
| **Very short / missing content** | Missing avatar, missing optional fields, zero values shown as zero | "undefined", "NaN", empty boxes |
| **Disabled** | Visibly disabled, with a reason on hover or nearby | Unclear why nothing happens |
| **Destructive** | Confirmation naming the object, or immediate action with undo | "Are you sure?" with no object named |
| **Slow action in progress** | Button shows progress and keeps its width; double submit prevented | Double charges, frozen UI |
| **Keyboard only** | Everything reachable and operable, visible focus, logical order | Focus lost after dialogs close |
| **Narrow screen (360–390 px)** | A designed layout, not a squashed one | Horizontal page scroll |
| **Dark mode (if supported)** | A rebuilt palette with correct contrast | Inverted colours, invisible borders |
| **Localised** | Text expansion (+30 % for Italian/German), date/number formats, RTL if needed | Truncated labels, US-only formats |
