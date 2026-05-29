# AGENTS.md

Rules and conventions for AI agents (and humans) working on **chomat.tech v2**.
Read this before editing — it captures decisions already made so they don't get
relitigated on every PR.

The canonical product spec lives in `TECHNICAL_ROADMAP.md`; this file is the
*operational* layer (how, not what).

---

## Stack at a glance

- **Astro 6.x** (static generation, Content Collections, `<ClientRouter />`).
  Collection config lives at `src/content.config.ts` (the legacy
  `src/content/config.ts` location was removed in v6).
- **TypeScript** everywhere, strict mode.
- **Vanilla CSS** with PostCSS (no preprocessor, no Tailwind). Native nesting +
  `@layer` cascade.
- **MDX 5** for content (`@astrojs/mdx@^5`, paired with Astro 6).
- **Yarn** is the active package manager (lockfile = `yarn.lock`). The spec
  mentions pnpm; don't switch without asking.
- **Node 22 LTS** on Netlify (`.nvmrc`); some deps (`sitemap@9`) require ≥20.19.5.
- **Biome 2.x** for lint+format. Stylelint is *not* installed — CSS-keyword-case
  is uncatched by tooling but we fix it on review.
- **No React, no Solid, no Preact.** Interactivity = vanilla `<script>` blocks
  inside `.astro` files. The same applies to React-based build tooling
  (`@react-pdf/renderer` is off the table; use Puppeteer for `/resume.pdf` when
  that ships).

---

## File layout

```
src/
├── components/
│   ├── homepage/          one component per section (Hero, Now, Experience, …)
│   ├── nav/               NavCapsule, MobileMenu, SoundToggle, ThemeToggle
│   └── primitives/        small reusable bits (Pill, HandArrow, LogoMark, Placeholder, …)
├── content/
│   ├── projects/*.mdx     one project per file
│   ├── experience/*.mdx   one role/company per file (Partners Bank has 2 intervals)
│   ├── companies/*.json   logo-strip data
│   └── about/index.mdx    bio + languages
├── content.config.ts      Zod schemas for projects/experience/companies/about (Astro 6 location)
├── data/
│   ├── site.ts            ALL site-level prose (hero, section headers, contact, footer, notFound)
│   └── format.ts          display helpers (formatIntervals, bentoCol, stickerClass, tintClass, initials)
├── layouts/
│   └── BaseLayout.astro   <html>, <head>, theme-color metas, viewport, fonts
├── pages/
│   ├── index.astro        composes the homepage sections; reads nav from SITE
│   ├── experience.astro   long-form /experience subpage
│   ├── 404.astro          sketched not-found page (copy from SITE.notFound)
│   ├── og.png.ts          static /og.png (Satori + Resvg)
│   └── robots.txt.ts      robots rules + sitemap reference
└── styles/
    ├── global.css         manifest: @layer order + @import partials
    ├── reset.css
    ├── tokens.css         .wf root + .wf.pal-newsprint / .wf.pal-spritz + .wf.v3; dark via html[data-theme="dark"]
    ├── type.css
    ├── utilities.css      bento grid, flex helpers, dividers
    └── components/        card / pill / controls / nav / layout / decorations / logomark
```

Component-local layout/visual tweaks go in scoped `<style>` blocks at the
bottom of each `.astro` file. The design system lives in `src/styles/`.

---

## CSS rules

### Sizing
- **rem-first.** `1rem = 16px`. Convert px values: `px / 16` → rem.
- The **only** legitimate `px` are:
  - `1px` hairline borders / dividers (`border: 1px solid var(--line)`,
    `height: 1px`).
  - Box-shadow offsets (e.g., `0 1px 0 …`, `2px 2px 0 var(--text)`).
  - JS-internal pixels in `IntersectionObserver` rootMargin (DOM API requirement).
  - Sub-pixel decoration values inside SVG data URIs.
- **Fluid type** via `clamp(min-rem, vw-based-mid, max-rem)`. Used for
  `.t-mega`, `.t-heading`, and the Now featured `<h3>`.
- **Intrinsic sizing.** Do **not** add `min-height: …rem` to cards. CSS Grid's
  default `align-items: stretch` keeps cards in the same row equal-height.
  Full-width cards size to content.

### Layout container
- `.page-body` is capped at `max-width: 80rem` and centered with
  `margin-inline: auto`. Add new sections inside; don't fight the cap.
- **Single mobile breakpoint:** `@media (max-width: 45rem)`. Do not add a
  tablet breakpoint without strong reason. The desktop layout reflows OK
  between 720px and 1024px.
- **CSS custom properties cannot be used in `@media` query conditions.** Don't
  attempt `@media (max-width: var(--bp))`. No browser supports it; the
  `@custom-media` draft would need a PostCSS plugin (spec forbids
  preprocessors).

### Cascade & nesting
- **Cascade order:** `@layer reset, base, components, utilities;` declared
  once in `global.css`. Every partial declares its own `@layer X { … }` block.
- **Inside each partial, wrap rules under a single `.wf { … }` parent** and
  use `&` for state/child selectors. Resolves to identical specificity but
  reads as one tree.
- **Native CSS nesting only** (no preprocessor). Children use `& .child` or
  `& > .child`. States use `&.X`, `&[data-Y]`, `&:hover`.
- **Responsive `@media` overrides are co-located** inside the rule they affect
  (nested), not collected at the bottom. Exceptions are multi-selector
  rules like `:is(.col-4, .col-5, …)` collapse.

### Inline styles
- **No `style="..."` attributes in `.astro` markup.** Move layout/visual rules
  into scoped `<style>` blocks under the component.
- **One exception**: passing a *dynamic value* via a CSS custom property,
  e.g. `style={\`--ph-h: ${heightRem};\`}` on Placeholder. Pure variable
  declaration, not a property override; the actual `height: var(--ph-h, …)`
  rule lives in CSS.

### Animation & motion
- **All transitions gate on `prefers-reduced-motion`.** Add a
  `@media (prefers-reduced-motion: reduce) { transition: none }` block for
  any rule with a `transition`.

### Misc gotchas
- `currentcolor` is **lowercase** per spec (not `currentColor`). Stylelint's
  `value-keyword-case` would flag it; we hand-fix.
- Quote multi-word *and* single-word font names in `font-family` for
  consistency (`"Menlo"`, not `Menlo`).
- Border-radius pill shape uses `9999rem`, not `999px` (rem-first).
- iOS Safari chrome bands: two `<meta name="theme-color">` tags gated by
  `prefers-color-scheme` — light `#f3efe4` (the active `pal-spritz` bg),
  dark `#0e0d0a`. A small script in `BaseLayout` syncs them to the resolved
  `data-theme`. Pair with `viewport-fit=cover`; fixed UI uses
  `env(safe-area-inset-{top,bottom})`.

---

## HTML / semantic rules

Prefer the correct element over a `<div>` with classes:

- `<nav aria-label="…">` for navigation containers.
- `<main>` for the primary page content (one per page).
- `<article>` for each project / experience / work card.
- `<h1>`–`<h6>` for section headings (`.t-title` → `<h3>`, `.t-heading` → `<h2>`).
- `<p>` for prose paragraphs (body copy, taglines).
- `<ul>/<li>` for lists of items (tech pills, wormholes, logo strip, mobile menu).
- `<button type="button">` for interactive controls (sound toggle, mobile menu
  trigger) — never a styled `<div>`. Expose state via `aria-pressed` /
  `aria-expanded`.
- `<a href="…">` for navigation. If something *looks* clickable, it should be
  a real anchor or button — no inert `<span>` masquerading as a link.

Decorative SVGs get `aria-hidden="true"` and `focusable="false"`.

---

## Content & data

- **Project / experience / company / about content** lives in Content
  Collections under `src/content/`. Validated by Zod schemas in
  `src/content.config.ts` (the Astro 6 location; the legacy
  `src/content/config.ts` was removed in v6 — see "Stack at a glance").
- **Site-level prose** (hero copy, section headings, contact cards, footer)
  lives in `src/data/site.ts` as one big typed object. Components import
  from `SITE`.
- **Display formatting** (interval strings, sticker class, tint class,
  bento col map) lives in `src/data/format.ts`. Add helpers there rather
  than inline.
- **Helper style:** define module-level helpers as arrow-function
  expressions (`export const fn = (x): T => …`), not `function`
  declarations. Single-expression bodies stay concise; use a block body
  only when there's branching or local state.
- Project frontmatter mirrors the spec: `status`, `kind`, `tech[]`,
  `bentoSize`, `featured`, `startDate`/`endDate`, `sticker.{tone,text}`,
  `homeLabel`, `year`. See `src/content.config.ts`.

---

## Astro-specific gotchas

- `<script>` blocks in `.astro` files compile to **ES modules**, which are
  deferred by default. Do **not** wrap their bodies in `DOMContentLoaded` —
  the document is already parsed when the module runs.
- `NodeListOf<T>` doesn't implement `Symbol.iterator` under Astro's TS lib
  config. Wrap in `Array.from(…)` before `for…of`.
- Astro Content Collections (v6) use the `glob()` loader from
  `astro/loaders`. Render MDX bodies via `const { Content } = await render(entry)`.
- Astro Image — `<Image>` with explicit dimensions is the canonical path.
  Sharp is auto-installed.

---

## Workflow

### PRs and review
- One coherent change per PR. The branch naming convention is
  `<kind>/<short-slug>` (`fix/responsive`, `chore/repo-hygiene`,
  `feat/v2-redesign-source`).
- Merge style: **squash**. Matches the repo's existing history.
- **CodeRabbit reviews every PR.** After `gh pr create`, do **not** call
  `gh pr merge` immediately — merging before the bot finishes logs
  "Review failed - the pull request is closed" and wastes the review.
  Wait for the bot.
- **Rate-limit escape:** if CodeRabbit is rate-limited or stuck "in
  progress" for many minutes, skip waiting and continue with the next
  task. The user has explicitly authorised this.
- On review findings: verify each against current code; fix valid ones,
  skip invalid ones with a brief reason; commit + push.

### Commits
- Imperative subject (`fix: …`, `refactor(css): …`, `feat: …`).
- Body explains *why* over *what* — the diff already shows the what.
- Include `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>` when an
  agent did the work.

### Build & verify
- `yarn check:astro` — Astro type/diagnostic check.
- `yarn check:ts` — TypeScript only.
- `yarn check:lint` — Biome lint + format. Auto-fix with `yarn check:fix`.
- `yarn check:code` — runs all three above in sequence. The CI workflow
  (`.github/workflows/check.yml`) runs this on every PR.
- `yarn build` — production build (also catches MDX/schema errors).

Biome's `noUnusedImports` and `noUnusedVariables` rules are turned off
for `.astro` files via a `biome.json` override: Biome can't see
template-only usage of imports and props in Astro frontmatter, so the
rules would otherwise emit a wave of false positives.

### What *not* to do
- Don't merge a PR before CodeRabbit finishes (unless rate-limited).
- Don't add React or React-based packages "for one tiny thing."
- Don't add `min-height` to cards to enforce row alignment — that's grid's job.
- Don't write inline `style=""` attributes; use scoped `<style>`.
- Don't add a tablet breakpoint without a concrete reason.
- Don't reintroduce React (no `@astrojs/react`). v2 is deliberately
  vanilla-script-island only.
- Don't fabricate URLs or generate documentation files unless explicitly
  asked.

---

## When you're stuck

- Spec questions → `TECHNICAL_ROADMAP.md`.
- "Where does this style live?" → look in `src/styles/global.css` for the
  partial map, then open the right partial. Component-local tweaks are in
  the relevant `.astro`'s `<style>` block.
- "Where does this copy come from?" → `src/data/site.ts` for site prose,
  `src/content/<collection>/<slug>.mdx` for project/experience/company data.
- "Why does this class exist?" → `git log -p -- src/styles/<file>` plus
  the diff that introduced it.
