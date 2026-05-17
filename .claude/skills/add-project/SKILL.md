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

## Schema-required (Zod will reject the build without these)

Per `src/content/config.ts` (`projects` collection):

- **title** — displayed name (e.g., "Walletory").
- **tagline** — one short line (8–12 words).
- **status** — one of `shipped`, `building`, `archived`, `private`.
- **kind** — `personal` or `client`.

Plus you need:

- **Slug** — filename without `.mdx`, kebab-case. Becomes the entry
  id. Not a frontmatter field, but you can't write the file without
  picking one.
- **Body** — MDX prose, 2–4 sentences. Not in frontmatter; it's the
  content below the `---` block.

## Worth asking anyway (defaults exist, but the user usually has an opinion)

- **tech** — array of pills (`["React Native", "TypeScript"]`).
  Defaults to `[]`. An empty tech list looks anaemic on the homepage
  card.
- **year** — short label on the card (`2023`, `21–23`). Optional.
  Cards without a year look incomplete.

If `kind=client`, also ask:

- **client** — display name. Optional in the schema but the card's
  meta line reads weirdly without it for client work.
- **nda** — `true` if the project is NDA'd. Defaults to `false`.
  Affects sticker behaviour.

## Pure optional fields (skip unless the user asks)

- `bentoSize`: `"sm" | "md" | "lg" | "xl"` — default `"sm"` (col-4).
  `"lg"` is the wide feature card. Only bump if the user asks for a
  featured layout.
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
- `links.{live, repo, caseStudy}` — outbound URLs; URL-validated by
  Zod, so `live: "TBD"` will break the build. Omit instead.
- `cover` — image path. Skip until the project has art.

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
