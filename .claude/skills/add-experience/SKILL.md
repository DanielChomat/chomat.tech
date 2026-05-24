---
name: add-experience
description: Scaffold a new experience MDX entry under src/content/experience/ with valid frontmatter matching the Zod schema in src/content/config.ts. Use when the user wants to add a job/role/freelance interval (or a new interval to an existing entry).
---

# /add-experience

Scaffold an experience entry for the Content Collection at
`src/content/experience/`. The schema in `src/content/config.ts`
(`experience`) requires `intervals` as an array of
`{ start: Date, end: Date | "present" }` — that's what powers the
`isCurrent()` / `formatIntervals()` helpers and the "currently here"
state on the timeline.

## Two flows

### A. New entry (new company)

**Schema-required (Zod will reject the build without these):**

- **company** — display name.
- **title** — role (e.g., "Mobile Engineer").
- **intervals** — at least one `{ start, end }` pair. `end: present`
  if it's the current role. Partners Bank in this repo has two
  intervals because the user left and came back — that's the
  canonical case for using more than one.
- **summary** — one-sentence headline (shown on homepage card).

Plus:

- **Slug** — filename without `.mdx`, kebab-case. Not a frontmatter
  field but you can't write the file without picking one.
- **Body** — MDX prose below the frontmatter, 2–4 sentences. Don't
  repeat the summary.

**Worth asking anyway (defaults exist, but the user usually cares):**

- **location** — e.g., "Prague, CZ", "Remote". Optional; the homepage
  card and `/experience` chapter both show it when present.
- **tech** — list of stack pills. Defaults to `[]`. An empty tech row
  looks incomplete on the chapter card.
- **tint** — `butter | sage | rose | sky | lavender | teal | ""`.
  Default `""`. Use `teal` for the "currently here" entry to make
  the card stand out on both the homepage and `/experience`.

**Pure optional (skip unless the user asks):**

- **nda** — boolean; default `false`. Sets sticker behaviour.
- **order** — sorting; default `0`. The current role is `0` and
  earlier roles grow downward.

### B. New interval on an existing entry

The user came back to a previous employer. Don't create a new file;
*append* an interval to the existing entry's frontmatter:

```yaml
intervals:
    - start: 2021-09-01
      end: 2023-08-31
    - start: 2025-09-01
      end: present
```

If the new interval is current, also set `tint: teal` (so the
"currently here" treatment moves to this entry) and confirm with the
user before flipping the tint on any *other* entry off.

## Writing the file

Create `src/content/experience/<slug>.mdx`:

```mdx
---
company: <Display name>
title: <Role>
intervals:
    - start: YYYY-MM-DD
      end: YYYY-MM-DD            # or `present`
location: "<City, CC>"            # quote if it has a comma
tech:
    - <pill>
    - <pill>
nda: false
summary: "<one-line summary>"
tint: ""                          # "teal" if currently here
order: 0
---

<prose body>
```

Dates are real YAML dates (no quotes), `present` is the literal
unquoted word. `order` should grow from the current role downward
— the homepage and `/experience` sort by it.

## After writing

1. `yarn check:astro` — catches schema drift immediately.
2. Both the homepage Experience section and `/experience` will pick
   the entry up from the collection. No manual wiring.
3. If you set this entry as currently-here, the timeline jump-nav on
   `/experience` will highlight it and the "Currently here" sticker
   and StatusPill light up automatically — driven by
   `isCurrent(intervals)`.

## Anti-patterns

- Don't put company copy in `src/data/site.ts` — that file is for
  site-level prose only. Experience copy lives in the MDX.
- Don't add the entry to a hand-written list anywhere; both consumers
  read the collection.
- Don't change `order` without coordinating with the user — it
  re-shuffles the homepage card row.
