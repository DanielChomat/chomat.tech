---
name: add-section
description: Scaffold a new homepage section under src/components/homepage/ — creates the .astro file with the project's standard structure, a typed copy block in SITE, registers it in src/pages/index.astro, and optionally adds a nav entry. Use when the user wants a new top-level homepage section (a peer of Hero / Now / Experience / Work / Tech / Companies / Contact).
---

# /add-section

Scaffold a peer section for the homepage. Follows the conventions in
`AGENTS.md` and the existing sections under
`src/components/homepage/`.

## Required information

Ask the user for:

- **Section name** (PascalCase, e.g., `Writing`). This becomes the
  component filename and the SITE key (lowercased).
- **Section anchor** (kebab-case, e.g., `writing`). Used as the
  section `id` and the nav `href`.
- **Number** (e.g., `§06`) — shown in the section-mark rail and
  kicker. Increment from the existing sections; today's max is `§05`
  (Contact).
- **Kicker** — short uppercase label (e.g., `Writing`).
- **Heading** — split into `headingMain` + `headingMuted` so the
  muted half can wrap onto a second visual line, matching every
  other section.
- **Intro / body** — what the section actually does.
- **Add to nav?** — boolean. If yes, append to `SITE.nav` with both
  `label` and `short` fields (the short form is what the mobile pill
  menu uses).

## Files to touch

1. **`src/data/site.ts`** — add a typed copy block:

   ```ts
   writing: {
       number: "§06",
       kicker: "Writing",
       headingMain: "Notes,",
       headingMuted: "mostly half-formed.",
       intro: "…",
   },
   ```

   If the section needs lists or sub-items, follow the shape used by
   `now`, `experience`, `work`, `tech`, or `contact` for inspiration
   — these are the canonical patterns. Don't invent a new shape for
   the same job.

2. **`src/components/homepage/<Name>.astro`** — match the existing
   sections' shape:

   ```astro
   ---
   import { SITE } from "../../data/site.ts";
   import Kicker from "../primitives/Kicker.astro";

   const { writing: copy } = SITE;
   ---

   <section id="writing">
       <div class="section-mark">
           <span class="lineno">{copy.number}</span>
       </div>
       <header>
           <div class="row row-between row-baseline">
               <Kicker>{copy.kicker}</Kicker>
               <!-- optional link/meta to the right -->
           </div>
           <h2 class="t-heading section-heading">
               <span>{copy.headingMain}</span>{" "}
               <span class="muted">{copy.headingMuted}</span>
           </h2>
           <p class="t-body muted section-intro">{copy.intro}</p>
           <div class="section-divider"></div>
       </header>

       <!-- section body — bento, list, cards, whatever fits -->
   </section>

   <style>
       .section-heading {
           margin-top: 0.375rem;
       }
       .section-intro {
           margin-top: 0.375rem;
           max-width: 36.25rem;
       }
   </style>
   ```

   - Use `<h2>` for the section heading (not `<h3>`).
   - Use `<article>` for each repeated item if the section is a list.
   - **No inline `style=""`** — scoped `<style>` only. The one
     allowed exception is dynamic CSS custom properties (e.g.,
     `style={\`--ph-h: ${heightRem};\`}`).
   - Section-local visual tweaks go in this `<style>` block. Design
     tokens stay in `src/styles/components/*.css`.

3. **`src/pages/index.astro`** — import + render in the section
   stack:

   ```astro
   import Writing from "../components/homepage/Writing.astro";
   ```

   Place the `<Writing />` element inside `<div class="section-stack">`
   at the position the user wants. If unclear, default to *before*
   Contact (the closing section).

4. **`src/data/site.ts` → `nav`** (only if user asked to add to nav):

   ```ts
   { label: "Writing", short: "writing", href: "#writing" },
   ```

## After writing

1. `yarn check:astro` — verifies imports + typed copy access.
2. `yarn build` — confirms the section renders in the static output.
3. If the section is in the nav, scroll the mobile menu to verify the
   short label fits. The mobile pill panel is narrow.

## Don't

- Don't add a section-specific stylesheet under
  `src/styles/components/` unless multiple sections need the same
  rules. Local tweaks belong in the scoped `<style>` block.
- Don't add a tablet breakpoint. The repo uses a single mobile
  breakpoint at `45rem` (per AGENTS.md).
- Don't fight the `.page-body` `max-width: 80rem` cap. The section
  lives inside that container.
- Don't add `min-height` to cards to enforce row alignment — CSS
  Grid handles that.
