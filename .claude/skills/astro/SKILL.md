---
name: astro
description: Astro framework reference, but project-aware for chomat.tech v2. Use when a question is about Astro itself — CLI commands, project structure, Content Collections, adapters, hydration islands, view transitions — and you want the answer routed through this repo's conventions (Yarn, Biome, vanilla CSS with @layer, MDX 4, no React). Defers to AGENTS.md for hard rules and to docs.astro.build for everything else.
---

# Astro on chomat.tech v2

A reference skill for working with the Astro framework *in this
repo*. Generic Astro tutorials default to `npx`, npm, ESLint, and
React islands; chomat.tech v2 uses Yarn, Biome, and vanilla `<script>`
islands. Lead with the project's choices; fall back to upstream docs
for everything else.

**Source of truth:** [AGENTS.md](../../../AGENTS.md) for hard rules,
[docs.astro.build](https://docs.astro.build) for API surface.

---

## What's installed

- **Astro 5.x** — static generation, Content Collections,
  `<ClientRouter />`. Don't bump major.
- **`@astrojs/mdx@^4`** — MDX 4. Bumping to 5 requires Astro 6;
  don't do it in isolation.
- **`@astrojs/sitemap`** — generates `sitemap-index.xml` at build.
- **`@fontsource-variable/geist`**, **`@fontsource-variable/geist-mono`**
  — self-hosted variable fonts. No CDN.
- **TypeScript strict** everywhere.
- **No React, no Solid, no Preact.** Interactivity = vanilla
  `<script>` blocks inside `.astro` files.

---

## Project structure (the real one)

```
src/
├── components/
│   ├── homepage/      One per section (Hero, Now, Experience, Work,
│   │                  Tech, Companies, Contact, SiteFooter)
│   ├── nav/           NavCapsule, MobileMenu, SoundToggle
│   └── primitives/    Pill, Kicker, Placeholder, HandArrow, …
├── content/
│   ├── config.ts      Zod schemas for projects/experience/
│   │                  companies/about
│   ├── projects/*.mdx
│   ├── experience/*.mdx
│   ├── companies/*.json
│   └── about/index.mdx
├── data/
│   ├── site.ts        All site-level prose (hero, sections, footer)
│   └── format.ts      formatIntervals, isCurrent, bentoCol,
│                      stickerClass, tintClass
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro    Homepage (composes the sections)
│   ├── 404.astro      /404
│   └── experience.astro   /experience long-form
└── styles/
    ├── global.css     @layer order + @import partials
    ├── reset.css
    ├── tokens.css     .wf root + .wf.pal-newsprint + .wf.v3
    ├── type.css
    ├── utilities.css
    └── components/    card / pill / controls / nav / layout /
                        decorations
```

---

## CLI commands — use the wired-up scripts

The scripts in `package.json` are what CI and the dev workflow use.
Prefer them over raw `npx`:

| Goal | Use this | Not this |
|---|---|---|
| Dev server | `yarn dev` | `npx astro dev` |
| Production build | `yarn build` | `npx astro build` |
| Type / Astro diagnostics | `yarn check:astro` | `npx astro check` |
| TypeScript only | `yarn check:ts` | `npx tsc --noEmit` |
| Generate types after content change | `yarn check:astro` (it syncs) | `npx astro sync` |
| Lint + format | `npx biome check .` | (no `astro lint` exists) |
| Pre-push gate | `/verify` skill (covers all of the above) | manual sequence |

`npx astro add <integration>` is fine for one-shot integration
installs — it rewrites `astro.config.mjs` and adds the dep. But
afterwards, all subsequent builds go through `yarn`.

---

## Content Collections (the actual schema)

Defined in `src/content/config.ts`. Four collections:

- **`projects`** — portfolio entries under `src/content/projects/*.mdx`.
  Required: `title`, `tagline`, `status`, `kind`. See `/add-project`.
- **`experience`** — roles under `src/content/experience/*.mdx`.
  Required: `company`, `title`, `intervals` (min 1), `summary`.
  See `/add-experience`. Partners Bank uses two intervals (left,
  came back).
- **`companies`** — logo-strip data, JSON files.
- **`about`** — bio + languages, MDX.

Loaders use the `glob()` loader from `astro/loaders`. MDX bodies
are rendered via `const { Content } = await render(entry)`.

If you change a schema in `config.ts`, run `yarn check:astro` —
it regenerates types in `.astro/`. The dev server picks them up
automatically.

---

## Astro-specific gotchas (from AGENTS.md, surfaced here too)

- **`<script>` blocks compile to ES modules.** They're deferred by
  default. **Don't wrap their bodies in `DOMContentLoaded`** —
  the document is already parsed when the module runs.
- **`NodeListOf<T>` doesn't implement `Symbol.iterator`** under
  Astro's TS lib config. Wrap in `Array.from(…)` before `for…of`.
- **`<Image>` is the canonical image path.** Sharp is auto-installed.
  Pass explicit dimensions; the component handles `loading="lazy"`
  for below-fold images.
- **CSS custom properties cannot be used in `@media` conditions.**
  No browser supports `@media (max-width: var(--bp))`. Use a
  literal `45rem`.
- **Native CSS nesting only** — no preprocessor. `& .child`,
  `& > .child`, `&.state`, `&[data-x]`, `&:hover`.

---

## Adding things

| Want to add | Skill | Notes |
|---|---|---|
| A homepage section | `/add-section` | Scaffolds the .astro file, SITE copy block, and registers in index.astro. |
| A portfolio project | `/add-project` | Builds an MDX entry against the projects schema. |
| A role / employer | `/add-experience` | Builds an MDX entry; the Partners Bank "came back" pattern is documented. |
| A new top-level page (peer of /experience, /404) | No skill — copy `src/pages/experience.astro` as a starting point. Mount NavCapsule + MobileMenu + SoundToggle. |
| An integration (e.g., `@astrojs/cloudflare`) | `npx astro add <name> --yes`, then re-run `yarn check:astro` to sync types. |

---

## Don't do (project-specific bans, source: AGENTS.md)

- Don't add React, Preact, or any React-based build tool
  (`@react-pdf/renderer`). Use Puppeteer for the planned
  `/resume.pdf`.
- Don't bump `@astrojs/mdx` to 5 without bumping Astro to 6.
- Don't switch to pnpm; Yarn is the package manager.
- Don't add a tablet breakpoint — the repo uses one mobile
  breakpoint at `45rem`.
- Don't add inline `style=""` (one exception: dynamic CSS custom
  properties).

---

## When you need more

- **API reference**: [docs.astro.build](https://docs.astro.build) —
  the upstream docs are authoritative for anything not pinned here.
- **Config reference**: [astro config reference](https://docs.astro.build/en/reference/configuration-reference/).
- **LLM-friendly index**: [docs.astro.build/llms.txt](https://docs.astro.build/llms.txt).

When upstream Astro guidance contradicts this repo (npx vs yarn,
React islands vs vanilla scripts, etc.), AGENTS.md wins.
