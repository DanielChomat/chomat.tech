# CONTENT.md — Copy editing kit for chomat.tech

A self-contained brief for rewriting/updating any text on the site. **Hand the whole
file to an LLM** (or use it yourself) and you won't need to re-analyze the codebase.

> Scope: this file is about **words**. For *adding* a new project/experience/section
> (scaffolding + schema), use the `/add-project`, `/add-experience`, `/add-section`
> skills instead. For visual/CSS rules see `AGENTS.md`.

---

## 0. How to use this

1. Find the text you want to change in the **Content map** (§3) → it tells you the
   exact file + field.
2. Paste this whole file into an LLM, then add your request (template in §7).
3. The LLM returns edited file(s). Run `npm run build` — if frontmatter is valid and no
   `SITE` key was dropped, it passes. Then `npm run dev` to eyeball.

---

## 1. Who it's for & the voice (don't relitigate)

- **Subject:** Daniel Chomat — senior React Native / mobile product engineer, based in
  Czechia. Six years across fintech, healthcare, startups, agency.
- **Audience:** **broad personal brand** — balanced, identity-first. NOT a single
  hiring or freelance funnel. Speak to peers, clients, and the curious alike.
- **Voice:** **first person** ("I build…", "I shipped…"). Confident, tight, warm.
  Terse over flowery. Salvage warmth ("worked like a charm") but cut filler
  ("QA gurus", emoji headings).
- **Settled decisions — keep unless Daniel revisits:**
  - **No "Canada" / relocation messaging.** (Old Sanity bio + LinkedIn still say it;
    it was deliberately dropped.)
  - **"Six years (2019→)" framing.** Timeline = 3 entries (Refresh → Partners Bank →
    Freelance). Earlier roles (Unicorn 2017, 2018–19 freelance) are only nodded to in
    the About prose, never as timeline entries.
  - **Languages = `EN / ES / CZ` pills, no proficiency labels, no French.**

---

## 2. Where copy lives — two layers

1. **`src/data/site.ts`** — every section-level string (headings, kickers, CTAs, hero,
   metadata, 404, footer). One big `SITE` object, `as const`. **Edit string values
   only — never rename/remove keys** (components + the Zod-validated render depend on them).
2. **`src/content/` MDX + JSON** — per-item content with YAML frontmatter:
   - `projects/*.mdx` — portfolio items (body + frontmatter)
   - `experience/*.mdx` — roles (body + frontmatter)
   - `about/index.mdx` — bio + languages
   - `companies/*.json` — "Worked with" strip (name/order only)

The facts in the MDX were migrated from the original Sanity CMS (a one-time export, not kept
in the repo) plus **LinkedIn** (`cz.linkedin.com/in/danielchomat`) and the old live site —
the **migrated MDX is now the source of truth**. **Never invent facts** — pull from the
existing content, Daniel's LinkedIn, or ask Daniel. (Old CMS data is re-exportable from
Sanity if a fact needs re-checking.)

---

## 3. Content map — what you see on the page → where it comes from

### Homepage (`/`)

| On screen | Source |
|---|---|
| Browser tab title / meta description | `site.ts → meta.title`, `meta.description` |
| OG share-card tagline | `site.ts → meta.ogTagline`, `meta.ogLocale` |
| Nav labels | `site.ts → nav[]` (`label` desktop, `short` mobile pill) |
| Hero name | `site.ts → hero.name` |
| Hero mono identity line | `site.ts → hero.identityMono` |
| Hero bio sentence | `site.ts → hero.bioBefore/bioMark/bioMid/bioMarkAlt/bioAfter` ⚠ see §4 |
| Status card "Currently at …" | `hero.status.roleLead/roleBold/roleTrail` + `roleBody` |
| Status card "Building …" | `hero.status.buildingLead/buildingBold/buildingTrail` + `buildingBody` |
| Status card availability line | `hero.status.availability` |
| Status card button | `hero.status.ctaPrimary` (`ctaSecondary` parked) |
| "Now building" heading/eyebrow | `site.ts → now.kicker/count/headingMain/headingMuted` |
| Now small-card eyebrows | `site.ts → now.cardKickers` (keyed by project slug) |
| Now **featured** card body + tech | the **building** project with `bentoSize: xl` → its MDX body |
| Now small cards (title/body/tech) | other **building** projects → their MDX |
| Experience heading + intro | `site.ts → experience.headingMain/headingMuted/intro` |
| Experience cards (homepage) | each `experience/*.mdx` **`summary`** only (body NOT shown here) |
| "Worked with" label/range | `site.ts → companies.label/range` |
| Company names/logos | `companies/*.json` (`name`; logo = auto initials) |
| Work heading + footer note | `site.ts → work.headingMain/headingMuted/footerNote` |
| Work cards | featured non-building `projects/*.mdx`: **`tagline`, `homeLabel`, `client`, `year`, `sticker`** (body NOT shown here) |
| Tech section heading + group labels | `site.ts → tech.*` |
| Tech pills (3 groups) | `site.ts → tech.techNow / techProduction / techCurious` |
| "This site: Astro + MDX" footnote | `site.ts → tech.footnote` |
| About card prose (in Tech section) | `about/index.mdx` body |
| About language pills | `about/index.mdx` frontmatter `languages[].code` |
| Contact heading + note | `site.ts → contact.headingMain/headingMuted/note` |
| Contact cards (GitHub/LinkedIn) | `site.ts → contact.cards[]` (`kicker/handle/blurb/foot/href`) |
| Footer | `site.ts → footer.*` |

### Experience page (`/experience`)

| On screen | Source |
|---|---|
| Page title/description | `src/pages/experience.astro` (hardcoded — edit there if needed) |
| Header kicker/heading/intro | `site.ts → experiencePage.kicker/headingMain/intro` |
| "About · short version" card | `site.ts → experiencePage.about.headingLead/headingMark/headingTrail` + `pills` |
| Snapshot cards (4) | `site.ts → experiencePage.summary[]` (`kicker/title/blurb`) |
| Timeline entries: header/meta | each `experience/*.mdx` frontmatter (`company/title/location/intervals/tech`) |
| Timeline entries: summary line | `experience/*.mdx` **`summary`** |
| Timeline entries: full prose | `experience/*.mdx` **body** (shown here, unlike homepage) |

### 404 (`/404`)

All copy in `site.ts → notFound.*` (heading, body, cards, footnote).

---

## 4. Render rules & constraints (so edits don't break layout)

- **Hero bio is split across `<span>`s** (`bioBefore` → highlighted `bioMark` → `bioMid`
  → highlighted `bioMarkAlt` → `bioAfter`). Write them so concatenated they read as **one
  flowing sentence**; `bioMark`/`bioMarkAlt` are the two highlighted phrases.
- **`summary` vs body:** experience `summary` shows on **both** homepage card and
  `/experience`; the MDX **body** shows **only on `/experience`**. Don't repeat the
  summary in the body.
- **Work cards ignore the project body** — only `tagline`, `homeLabel`, `client`, `year`,
  `sticker` are visible on the homepage. Put the punch there. (The body is for a future
  `/projects` page.)
- **Now requires exactly one `building` project with `bentoSize: xl`** (the featured
  card) — currently `moments`. Don't remove it without promoting another.
- **Bento grid = 12 columns.** Sizes: `sm=4, md=5, lg=7, xl=12`. Rows should sum to 12
  (`7+5` or `4+4+4`); a partial last row is fine. The Work section is currently
  `7+5 / 7+5 / 4+4` (6 cards).
- **Length guides:** taglines 6–12 words; `homeLabel` ≤ ~5 words; status-card bodies
  1–2 short sentences; experience/project bodies 2–4 sentences; About 2–3 sentences.
- Use `&nbsp;` to keep tight pairs together (e.g. `React&nbsp;Native`) so they don't wrap.

---

## 5. Frontmatter schema (valid values — build fails otherwise)

Canonical schema: `src/content.config.ts`.

**projects/\*.mdx**
```yaml
title: string                 # required
tagline: string               # required (short line)
status: shipped|building|archived|private   # required
kind: personal|client         # required
client: string                # client work only
tech: [string, ...]
year: string                  # e.g. "2024", "21–23"
bentoSize: sm|md|lg|xl         # default sm
featured: boolean             # true = shows on homepage
sticker: { tone: butter|sage|rose|sky|lavender|teal, text: string }
homeLabel: string             # card line on homepage
order: number                 # lower = first
# body: 2–4 sentence MDX below the --- (Now cards only; Work cards hide it)
```

**experience/\*.mdx**
```yaml
company: string               # required
title: string                 # required
intervals:                    # required, ≥1; "present" = current role
    - { start: YYYY-MM-DD, end: YYYY-MM-DD | present }
location: string
tech: [string, ...]
nda: boolean
summary: string               # required, one sentence (homepage + /experience)
tint: butter|sage|rose|sky|lavender|mint|blossom|coral|peach|lime|teal|""   # teal = current role
order: number                 # 0 = current, grows downward
# body: 2–4 sentence MDX below the ---
```

**about/index.mdx** — `location: string`, `languages: [{ code: string }]` (order EN/ES/CZ).
**companies/\*.json** — `{ "name": string, "order": number }`.

---

## 6. Voice examples (before → after)

- "Built the first Czech app-only bank." → "I helped build the first Czech app-only
  bank — then came back to ship the next version."
- "Experimenting with small mobile apps…" → "Small mobile apps in evenings and weekends —
  parenting, travel, and everyday utilities. Simple, focused, useful."
- "Reads more than they should." → "I read more than I should."

---

## 7. Paste-ready prompt

```
You are editing copy for chomat.tech, Daniel Chomat's personal site. The CONTENT.md
brief below is your only context — do not ask to read the codebase.

Rules:
- Voice: first person, broad personal brand, tight + warm (CONTENT.md §1).
- Do NOT invent facts; use only what I give you or what's in the brief. Flag anything
  you're unsure about instead of guessing.
- Keep the settled decisions (no Canada, "six years" framing, EN/ES/CZ languages).
- Change string VALUES only in site.ts — never keys. Keep frontmatter enums valid (§5).
- Respect render constraints (§4): hero bio span-split, summary vs body, Work-card
  visible fields, bento 12-col math, the xl-building-project requirement.

Output: for each file, give the full new file contents OR exact find/replace blocks.

--- CONTENT.md ---
<paste this whole file>
--- END ---

What I want to change:
<<< describe the change — e.g. "rewrite the hero bio to lead with mobile",
    "update the status card: I just started at <Company>", "add a project: …" >>>
```
