---
name: add-project
description: Scaffold a new project MDX entry under src/content/projects/ with valid frontmatter that matches the Zod schema in src/content/config.ts. Use when the user wants to add a portfolio project (shipped, building, archived, or private).
---

# /add-project

Scaffold a new project for the Content Collection at
`src/content/projects/`. The frontmatter must match the Zod schema in
`src/content/config.ts` (`projects`); if you skip a required field
the build will fail with a useful error, but it's faster to get it
right the first time.

## Required information

Ask the user only for what you can't reasonably infer:

- **Slug** (filename without `.mdx`). Use kebab-case. Becomes the
  entry id.
- **Title** — the displayed name (e.g., "Walletory").
- **Tagline** — one short line (8–12 words).
- **Status** — one of `shipped`, `building`, `archived`, `private`.
- **Kind** — `personal` or `client`.
- **Year** — short label shown on the card (e.g., `2023`, `21–23`).
- **Tech** — array of pills (e.g., `["React Native", "TypeScript"]`).
- **Body** — 2–4 sentences of prose for the MDX body.

If `kind=client`, also ask for **client** (display name) and whether
it's NDA'd (`nda: true`) — sets the privacy/sticker behaviour.

## Optional fields with sensible defaults

- `bentoSize`: `"sm" | "md" | "lg" | "xl"` — default `"sm"`. The
  homepage Work bento uses `sm` (col-4) by default; `lg` is the wide
  feature card. Only bump it if the user asks for a featured layout.
- `featured`: boolean, default `false`. Set `true` only for the
  homepage Hero/Now featured slot.
- `sticker`: `{ tone: "butter|sage|rose|sky|lavender|teal", text: string }`.
  Skip unless the user wants a corner sticker (e.g., "NDA",
  "ARCHIVED", "STILL UP").
- `homeLabel` — override the card title shown on the homepage if it
  differs from `title`.
- `order` — sorting; default `0`. Lower numbers come first.
- `startDate` / `endDate` — ISO dates; only needed if you want the
  homepage to sort/group by time.

## Schema source of truth

Open `src/content/config.ts` and follow the `projects` collection
schema exactly. If the schema has changed, trust the schema, not this
doc.

## Writing the file

Create `src/content/projects/<slug>.mdx` with this shape:

```mdx
---
title: <Title>
tagline: "<one-liner>"
status: <shipped|building|archived|private>
kind: <personal|client>
client: "<Client Name>"   # only if kind=client
year: "<short>"
tech:
    - <pill>
    - <pill>
bentoSize: sm
featured: false
sticker:
    tone: <tone>
    text: <STICKER>
order: 0
---

<prose body — 2–4 sentences>
```

Quote string values that contain `:`, `#`, or smart quotes. Drop any
optional field you don't need rather than leaving it empty — the
schema is strict and an empty string is *not* the same as omitting.

## After writing

1. Run `yarn check:astro` — it will surface schema errors immediately.
2. If the project should appear on the homepage Work bento right
   away, no further wiring is needed; the section reads the
   collection. If it should be the hero/featured tile, set
   `featured: true` and confirm with the user that they want it
   promoted ahead of the current featured project.
3. Tell the user the file path and the homepage location it'll
   appear (Work bento row N, or featured slot).

## Anti-patterns

- Don't add a project to a hand-written list anywhere — the homepage
  reads the collection.
- Don't invent fields that aren't in the schema; if the user wants
  metadata that doesn't exist, propose extending the schema in
  `src/content/config.ts` first and stop.
