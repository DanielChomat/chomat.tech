---
name: simplify
description: Review the current changes in this Astro + vanilla-CSS portfolio (chomat.tech v2) for the specific simplifications this codebase rewards — rem-first conversions, inline-style → scoped <style> moves, dead component variants from the v2 redesign, hardcoded copy that should live in SITE, and CSS that fights the design system. Operates on changed files unless given a path.
---

# /simplify (chomat.tech v2)

A project-tailored simplification pass for chomat.tech v2. The
generic "look for reuse, quality, efficiency" framing misses the
things this codebase actually rewards. Use these rules instead.

## Scope

Default scope is the changed files on the current branch:

```bash
git diff --name-only "$(git merge-base HEAD V2-redesign)..HEAD"
```

If the user passes a path, use that instead.

## What to look for (in priority order)

### 1. Inline styles → scoped `<style>`

AGENTS.md is explicit: no `style="..."` attributes in `.astro`
markup. The one allowed exception is a *dynamic* CSS custom
property (e.g., `style={\`--ph-h: ${heightRem};\`}`).

Find: `grep -nP '\sstyle="[^"]+"' src/components src/pages src/layouts`.

For each match, move the rule into the file's scoped `<style>` block
under a class. If the file has no `<style>` block yet, add one at
the bottom following the existing pattern (see `Hero.astro` or any
existing section).

### 2. `px` values that should be `rem`

Only legitimate `px` values (per AGENTS.md):

- `1px` hairline borders / dividers (`border: 1px solid var(--line)`).
- Box-shadow offsets.
- JS-internal pixels in `IntersectionObserver` rootMargin.
- Sub-pixel decoration values inside SVG data URIs.

Everything else should be rem. Convert: `px / 16` → rem (e.g.,
`1.2px` → `0.075rem`).

Find: `grep -nE '[: ][0-9]+\.[0-9]+px|[: ][2-9][0-9]*px' src/styles src/components src/pages | grep -v 'box-shadow\|1px solid\|rootMargin\|inset 0 0'`.

Spot-check each hit — `2px solid` borders are legitimate edge-cases
the rule doesn't strictly cover; defer to the author. The clear wins
are values like `12px`, `22px`, `88px` outside box-shadow/borders.

### 3. Hardcoded copy that should live in `SITE`

`src/data/site.ts` is the home for **all site-level prose** — hero
copy, section headings, contact cards, footer, page-specific
strings. Project/experience/company text lives in the relevant
Content Collection.

Find string literals in `src/components/homepage/*.astro`,
`src/pages/*.astro` that are user-visible prose (not classnames,
not `aria-label="…"` boilerplate). Anything ≥3 words of marketing
or editorial copy belongs in `SITE` or in a Content Collection.

### 4. `min-height` on grid cards

AGENTS.md: "Don't add `min-height: …rem` to cards to enforce row
alignment — that's grid's job." CSS Grid's default
`align-items: stretch` keeps cards in the same row equal-height.

Find: `grep -nE 'min-height:\s*[0-9]' src/styles src/components src/pages | grep -i 'card\|.*ph\b'`.

Each hit is suspect. Real exceptions: `placeholder` SVGs that need a
fixed shape (`9 / 16` aspect-ratio is preferred — see Now thumbs).

### 5. Dead component variants from the v2 redesign

The design canvas under `design/` shipped many variants
(`HomepageA/B/C/D`, `MobileHomepageACompact*`, `NotFoundA/B`,
`ExperienceExpandedA/B`). The locked-in choices are:

- Homepage: variant A no-navbar (mobile) / pill nav (desktop).
- /404: variant A sketched.
- /experience: variant A v1 (`ExperienceExpandedA` with `ExpAboutV1`,
  `Pro='strip'`).

If you find CSS/JS in `src/` that only matches a *non-shipped*
variant (e.g., bottom-dock mobile nav, sitemap-as-art 404), flag it
for removal. Don't auto-delete — confirm with the user.

> Note: `design/` is gitignored, so collaborators without the
> original canvas can't see what was rejected. Treat the list above
> as authoritative until the design canvas is published elsewhere.

### 6. Selectors that fight the cascade

AGENTS.md enforces:

- `@layer reset, base, components, utilities` order in `global.css`.
- Each partial wraps its rules in a single `.wf { … }` parent with
  `&` for state/child selectors.
- Native CSS nesting only (no preprocessor).

Find: rules in `src/styles/components/*.css` that:
- Use `>` or descendant selectors instead of nested `& .child` /
  `& > .child`.
- Live outside the `.wf { … }` block.
- Use bare class selectors that could be expressed as nested state
  on a parent (e.g., `.card.active` written as a separate top-level
  rule).

### 7. CSS custom properties in `@media` query conditions

Don't attempt `@media (max-width: var(--bp))`. No browser supports
it. Hard rule from AGENTS.md.

### 8. Astro-specific gotchas

- `<script>` blocks in `.astro` files are deferred ES modules — they
  run *after* the document is parsed. Find any
  `addEventListener('DOMContentLoaded', …)` inside a `.astro`
  `<script>` and flag it: the wrapping is dead weight.
- `for (const item of nodeList)` — `NodeListOf<T>` doesn't implement
  `Symbol.iterator` under Astro's TS lib config. Look for it; wrap
  in `Array.from(…)` if you see it.

## Output

Group findings by file. For each one:

- File:line reference.
- One-line description of the issue.
- Suggested fix (concrete diff fragment, not just "convert to rem").

End with a short summary line: "N findings across M files; would
you like me to apply them?" — then wait. Don't auto-apply.

## What this skill does not do

- It does not run `yarn build` / `yarn check:astro` — that's
  `/verify`'s job.
- It does not refactor for performance — this is a static site, the
  shippable wins are clarity, not microseconds.
- It does not propose new abstractions. "Three similar lines is
  better than a premature abstraction" — that line is from this
  project's instructions and applies here.
