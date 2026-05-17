---
name: review
description: Pre-CodeRabbit local review for chomat.tech v2 PRs. Reviews the current branch against the rules in AGENTS.md and the patterns CodeRabbit has been catching on this repo (semantic HTML landmarks, rem-first sizing, accessibility attributes). Use before `gh pr create` so the first CodeRabbit pass has less to find — and so you're not blocked when CodeRabbit is rate-limited.
---

# /review (chomat.tech v2)

A local pre-flight review. CodeRabbit is the authoritative reviewer
on this repo, but it's been rate-limited mid-session (see PR #57)
and tends to find the same handful of things — most of which a
local pass can catch first.

## Scope

The current branch's diff against `V2-redesign`:

```bash
git diff "$(git merge-base HEAD V2-redesign)"..HEAD
```

If the user passes a PR number, fetch its diff via
`gh pr diff <n>` instead.

## What to check, in priority order

### 1. Semantic HTML landmarks

AGENTS.md: "Prefer the correct element over a `<div>` with classes."
CodeRabbit reliably catches:

- `<div>` wrappers around lists of links → should be
  `<nav aria-label="…">`. Historical examples on this repo (verify
  against current code before quoting them at the user — these
  files have evolved):
  - The mobile menu dropdown panel (was `<div>`, now `<nav>`).
  - The `/experience` breadcrumb row (was `<div class="exp-crumbs">`).
  - The `/experience` timeline jump-nav (was `<aside>`).
- `<div>` wrappers around content items that should be `<article>`
  (projects, experience chapters, contact cards).
- Section headings that should be `<h2>` not `<h3>` (the homepage
  Experience cards' company name is `<h3>` — that one's correct
  because the section header is `<h2>`).
- Buttons that should be `<button type="button">` not styled
  `<div>`s; expose state via `aria-pressed` / `aria-expanded`.

### 2. Accessibility on visually-collapsed text

If any text uses `display: none` or `visibility: hidden` at the
mobile breakpoint, the surrounding interactive element needs an
explicit `aria-label` so screen readers still announce the
destination. CodeRabbit caught this on `.exp-crumb-home` — the home
label is hidden on mobile, so the anchor needs
`aria-label={copy.homeCrumb}`.

Also: decorative glyphs (←, ↓, ✕, →) inside interactive elements
should have `aria-hidden="true"` so they're not double-announced.

### 3. `aria-current` on in-page active links

When a nav exposes "which item is current," the active link should
carry `aria-current` — `"page"` for cross-page nav, `"true"` for
in-page jump nav (like `/experience`'s timeline). CodeRabbit caught
this on the `.exp-jumpnav-link.current`.

### 4. rem-first sizing

Per AGENTS.md, the only legitimate `px` are:

- `1px` hairline borders.
- Box-shadow offsets.
- JS-internal pixels in `IntersectionObserver` rootMargin.
- Sub-pixel decoration values inside SVG data URIs.

CodeRabbit flagged `1.2px` / `1px` on the mobile-menu hamburger
bars; both got converted to rem. Scan the diff for any other px
values that aren't on the allowed list.

### 5. Inline `style=""` attributes

None allowed in `.astro` markup except for dynamic CSS custom
properties. Search the diff for `style="`. Each hit gets moved to a
scoped `<style>` block under a class name.

### 6. CodeRabbit-specific anti-patterns

- **`<aside>` for in-page navigation lists.** `<aside>` is a
  *complementary* landmark; in-page jump nav should be `<nav>`. The
  `/experience` timeline got flagged for this.
- **`@media (max-width: var(--bp))`.** No browser supports CSS
  custom properties inside `@media` conditions. Don't ship this.
- **Tablet breakpoint added without strong reason.** This repo uses
  a single mobile breakpoint at `45rem`. Any new
  `@media (min-width: …rem)` outside that one needs justification.

### 7. PR workflow checks

- Branch name follows `<kind>/<short-slug>` (e.g., `fix/responsive`,
  `feat/404-page-variant-a`, `chore/repo-hygiene`).
- Commit subjects are imperative (`fix: …`, `feat: …`, `refine: …`).
- No `--amend` on commits already pushed to origin — this repo
  squash-merges, so adding a new commit is the right move.
- `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>` trailer
  present on agent-authored commits.

### 8. Build & type gates

If the diff touches `src/`:

```bash
yarn check:astro      # type / diagnostic
yarn build            # production build, surfaces MDX schema errors
```

Both should pass before you ship. (Use `/verify` for this — it also
filters Biome's `noUnusedImports` false positives on `.astro` files.)

### 9. Focus states (folded in from Vercel web-interface-guidelines)

Every interactive element needs a *visible* focus indicator. The
canonical rules:

- Never `outline: none` without a replacement focus style.
- Prefer `:focus-visible` over `:focus` — avoids the focus ring
  flashing on plain mouse clicks.
- For compound controls (e.g., a pill button with an icon), use
  `:focus-within` on the parent so focus state composes.

Scan the diff for any `outline:` declarations and any new
`<button>`, `<a>`, or focusable custom control. If the diff adds a
new interactive element without a `:focus-visible` rule, flag it.

### 10. Animation discipline

From AGENTS.md and the Vercel ruleset:

- `transition: all` is banned — list properties explicitly. A real
  `transition` line names what's animating (e.g.,
  `transition: transform 180ms ease, opacity 180ms ease`).
- Animate only `transform` and `opacity` where possible — they stay
  on the compositor. Avoid animating `width`, `height`, `top`,
  `left`, `background`.
- `prefers-reduced-motion: reduce` block present for any rule with
  a `transition` (AGENTS.md hard rule).
- For SVG glyphs that rotate or scale, put the transform on a
  `<g>` wrapper with `transform-box: fill-box; transform-origin: center`.

### 11. Typography polish

Easy to miss in copy and class names but cheap to fix:

- `…` not `...` (real ellipsis, not three dots). Search the diff
  for `\.\.\.` in user-visible strings (skip URLs and code).
- `"…"` curly quotes for prose, not `"…"` straight quotes. The
  homepage copy already uses them; new copy should match.
- Non-breaking spaces in compound terms: `⌘&nbsp;K`, `10&nbsp;MB`,
  brand names that shouldn't break (`React&nbsp;Native`,
  `Partners&nbsp;Bank` if it ever wraps oddly).
- `text-wrap: balance` on headings — prevents lonely-word widows
  on the last line. Already worth applying to `.t-mega`,
  `.t-heading`, and section heading splits if not already.
- `font-variant-numeric: tabular-nums` on columns of numbers
  (year columns in /experience, the IGIC mini-UI numbers).
- Loading/progress strings end with `…`: "Loading…", "Saving…".

### 12. Image dimensions (CLS prevention)

When any `<img>` ships (e.g., when the Placeholder is replaced
with real art):

- Explicit `width` and `height` attributes — prevents Cumulative
  Layout Shift.
- Below-the-fold images: `loading="lazy"`.
- Above-the-fold (hero, featured Now): `fetchpriority="high"` and
  consider preloading.
- Astro's `<Image>` component handles most of this; flag any raw
  `<img>` tags in the diff that don't.

### 13. Touch & mobile interaction

Cheap one-time adds that the design system doesn't already have:

- `touch-action: manipulation` on tap-to-act elements (kills the
  300ms double-tap zoom delay on iOS).
- `-webkit-tap-highlight-color` set intentionally (default is grey;
  brand-aligned or transparent reads better).
- `overscroll-behavior: contain` on the mobile menu panel so
  scrolling inside it doesn't bubble to the page.

### 14. Performance hints

- No layout-reading APIs (`getBoundingClientRect`, `offsetWidth`,
  `offsetHeight`, `scrollTop`) inside render or rAF without
  batching. The existing IntersectionObserver pattern in
  `NavCapsule.astro` and `MobileMenu.astro` is the right model.
- Critical fonts (Geist Variable, Geist Mono Variable) should be
  preloaded with `<link rel="preload" as="font" type="font/woff2"
  crossorigin>` and have `font-display: swap` set. Check the
  Astro-emitted `<head>` once before shipping a typography change.
- For any future large list (>50 items), virtualize with
  `content-visibility: auto` or a virtualization helper. The
  current homepage tops out at ~12 projects so this is forward-
  looking.

### 15. CodeRabbit timing

After opening the PR, **wait for CodeRabbit before merging.** Quote
from AGENTS.md: "merging before the bot finishes logs 'Review
failed - the pull request is closed' and wastes the review."

The escape clause: "if CodeRabbit is rate-limited or stuck 'in
progress' for many minutes, skip waiting and continue." We've used
this on PR #57.

## Output

Group findings by category (Semantic HTML / a11y / Focus / Sizing /
Inline styles / Animation / Typography / Images / Touch /
Performance / Workflow). For each one:

- File:line.
- The rule it violates.
- Suggested fix (concrete diff).

End with:

- "Pre-flight verdict: ready to push / N fixes recommended first."
- If verdict is "ready," remind the user that CodeRabbit will still
  do its own pass and may surface things this skill doesn't know
  about yet.

## What this skill does not do

- It does not push, open PRs, or merge. That's the user's call.
- It does not run `gh pr review --approve` — the review is for
  internal triage, not for marking the PR approved.
- It does not replace CodeRabbit. CodeRabbit sees patterns this
  skill hasn't learned about yet.

## Updating this skill

When CodeRabbit catches a *new* pattern this skill missed, add it to
the list above so future runs catch it locally. The skill should
get smarter with each PR it learns from.
