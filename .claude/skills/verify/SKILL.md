---
name: verify
description: Run check:astro + build + biome and report only the real errors. Use before committing or pushing a branch. Filters out Biome's noUnusedImports false positives on .astro files (template-only imports), per AGENTS.md.
---

# /verify

One-shot pre-push gate for chomat.tech. Catches the things that break
CI, but stays quiet about the false positives Biome emits for
`.astro` template-only imports.

## Steps

1. **Astro type check**

   ```bash
   yarn check:astro
   ```

   Fails on missing exports, bad prop types, wrong Content Collection
   shapes. Hard error — stop here if it fails.

2. **Production build**

   ```bash
   yarn build
   ```

   Catches MDX schema mismatches, missing slugs, broken imports the
   type checker can't see. Hard error — stop here if it fails.

3. **Biome (lint + format)**

   ```bash
   npx biome check .
   ```

   Run, then filter:

   - **Ignore** `lint/correctness/noUnusedImports` *only* on `.astro`
     files — Biome can't see template-only usage of imported
     components (per AGENTS.md).
   - **Report** everything else (real `error` and `warning` lines).

   ⚠ The filter is by extension, not by analysis — if a `.astro`
   file ever has a genuinely unused import (rare but possible:
   stale dev import, refactored-out type), this skill will hide it.
   Show the user the *filtered* count alongside the real findings
   so they can spot-check if they want.

   When summarising, separate "real findings" from "skipped false
   positives" so the user can audit the filter.

## What this skill does not do

- It does not auto-fix. If you want fixes, run
  `npx biome check . --write` yourself and re-verify.
- It does not run tests — this repo has none yet.
- It does not push, commit, or open PRs. Use it as a gate; the user
  decides what's next.

## Output shape

After running, report:

- `check:astro`: pass / fail (and the diagnostic count if non-zero)
- `yarn build`: pass / fail (and which page failed if any)
- `biome`: real-error count, real-warning count, and the count of
  `noUnusedImports`-on-`.astro` lines you filtered out

Keep it under ~10 lines unless something failed.
