# chomat.tech v2 — release checklist

Updated 2026-06-01.

---

## Part 1 — Things Claude can do

### SEO

- [ ] **Per-page titles & descriptions** — audit `experience.astro`,
      `404.astro`, and any project/experience MDX to ensure they pass
      real `title`/`description` to `BaseLayout` (not the SITE defaults).

### Accessibility

- [ ] **Skip link** — `<a class="skip-link" href="#main">Skip to content</a>`
      at top of `<body>`, plus `id="main"` on the main landmark on each page.
      Style is `.visually-hidden` until `:focus`.
- [ ] **Heading hierarchy audit** — confirm one `<h1>` per page and no
      `<h2>→<h4>` skips. AGENTS.md notes that the homepage Experience
      `<h3>` is intentional — verify the rest.
- [ ] **Decorative glyphs marked `aria-hidden="true"`** — sweep for ←, ↓,
      ✕, →, ✻ inside interactive elements.

### Polish

- [ ] **Curly quotes + ellipsis sweep** in `src/data/site.ts` and content
      collections. Replace `"…"` straight quotes with `"…"`, `...` with `…`.
- [ ] **Non-breaking spaces** in compound brand terms that might wrap
      awkwardly (e.g., `React&nbsp;Native`, `Partners&nbsp;Bank`).
- [ ] **`text-wrap: balance` on `.t-mega` / `.t-heading`** if not already —
      avoids lonely-word widows on the last line.
- [ ] **`font-variant-numeric: tabular-nums`** on year columns in
      `/experience` and any numeric mini-UI strings.

---

## Part 2 — Things you need to do yourself

### Manual testing

- [ ] **Lighthouse run** on `yarn build && yarn preview` — aim ≥95 on all
      four (Performance, Accessibility, Best Practices, SEO). Run in an
      incognito Chrome window.
- [ ] **Real-device cross-browser test** — Safari macOS + iOS, Chrome,
      Firefox. iOS Safari is the one that bites: backdrop-filter,
      `:has()`, dynamic viewport units (`100dvh`).
- [ ] **Mobile widths** — iPhone SE (375 px) and a large Android. Watch
      for horizontal scroll, sticker overflow, capsule-nav cramping.
- [ ] **Keyboard-only tab-through** every page — NavCapsule, MobileMenu,
      ThemeToggle, SoundToggle, every link. Focus rings should be
      visible at every stop.
- [ ] **Dark mode every page, every section** — toggle once to confirm
      no flash on reload (the `BaseLayout` bootstrap script handles this,
      but verify after deploy).
- [ ] **Color contrast in dark mode** — use the browser devtools contrast
      checker on body text + muted text. Newsprint palette in dark theme
      drifts; spot-check.

### Accounts / external

- [ ] **DNS** — `chomat.tech` points to prod host, `www` redirect (or
      vice-versa), TTLs set sanely.
- [ ] **SSL** — cert valid, auto-renewing.
- [ ] **`yarn npm audit`** — review high/critical findings; accept the
      ones worth taking.
- [ ] **Resume PDF** — if Puppeteer route is wired, run it once and
      verify the output looks right before launch. (No React; use Puppeteer.)
- [ ] **Final content sweep** — read every public string out loud. No
      typos, no stale dates.

### Launch day

- [ ] **Final `/verify` + `/review` pass** on HEAD.
- [ ] **Open the merge-to-prod PR** — wait for CodeRabbit review before merging.
- [ ] **First post-deploy smoke test**: every nav link, dark/light
      toggle, mobile menu open/close, 404 page, sitemap loads,
      `/og.png` returns 200.
- [ ] **Submit sitemap to Google Search Console**.

---

## Completed

- ✅ Open Graph + Twitter meta in `BaseLayout.astro`
- ✅ Canonical URL in `BaseLayout.astro`
- ✅ `robots.txt` references sitemap (dynamic via `Astro.site`)
- ✅ JSON-LD `Person` schema in `<head>`
- ✅ `apple-touch-icon.png` (180×180) in `public/`
- ✅ `site.webmanifest` in `public/`
- ✅ `netlify.toml` with security headers (HSTS, nosniff, DENY, Referrer-Policy, Permissions-Policy)
- ✅ Cache headers (`/_astro/*` immutable, HTML no-cache, icons 30-day)
- ✅ Satori-rendered OG image route (`src/pages/og.png.ts`)
- ✅ Company logos wired into Companies strip (Partners Bank, Walletory, Purple Next, Refresh)
