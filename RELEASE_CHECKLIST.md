# chomat.tech v2 — release checklist

Generated 2026-05-18 against `V2-redesign` @ `41803cc`.
Items are unchecked. Move them as you go.

`/verify` baseline at scan time: ✅ `check:astro` clean, ✅ `yarn build` clean,
biome findings are all template-only false positives in `.astro` files
(not real bugs).

---

## Part 1 — Things I (Claude) can do for you

Each is a small, scoped PR. Tell me which to start with; I'll branch off
`V2-redesign`, implement, run `/verify` + `/review`, and open the PR for
CodeRabbit review.

### SEO

- [ ] **Add Open Graph + Twitter meta to `BaseLayout.astro`**
      Currently only `<title>` + `<meta description>`. Need `og:title`,
      `og:description`, `og:image`, `og:url`, `og:type`, `twitter:card`,
      `twitter:image`. Image source: Satori-rendered per-page (see below).
- [ ] **Add canonical URL** to `BaseLayout.astro`:
      `<link rel="canonical" href={new URL(Astro.url.pathname, Astro.site)} />`
- [x] **Reference sitemap from `robots.txt`**
      Done — `src/pages/robots.txt.ts` generates `robots.txt` from
      `Astro.site`, emitting a `Sitemap:` line (replaced the static
      `public/robots.txt`).
- [ ] **JSON-LD `Person` schema** in `<head>` — name, url, jobTitle, and
      `sameAs: ["https://github.com/DanielChomat",
      "https://linkedin.com/in/danielchomat"]`.
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

### Likeness / polish

- [ ] **`apple-touch-icon.png` (180×180)** in `public/` so iOS home-screen
      saves look right. Currently only `favicon.svg` exists.
- [ ] **`site.webmanifest`** (PWA-lite: name, short_name, theme_color,
      icons). Cheap, helps "Add to Home Screen."
- [ ] **Curly quotes + ellipsis sweep** in `src/data/site.ts` and content
      collections. Replace `"…"` straight quotes with `"…"`, `...` with `…`.
- [ ] **Non-breaking spaces** in compound brand terms that might wrap
      awkwardly (e.g., `React&nbsp;Native`, `Partners&nbsp;Bank`).
- [ ] **`text-wrap: balance` on `.t-mega` / `.t-heading`** if not already —
      avoids lonely-word widows on the last line.
- [ ] **`font-variant-numeric: tabular-nums`** on year columns in
      `/experience` and any numeric mini-UI strings.

### Infra — Netlify

- [ ] **`netlify.toml` with security headers**:
      `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`,
      `Referrer-Policy: strict-origin-when-cross-origin`,
      `Permissions-Policy` (deny camera, mic, geo, payment),
      and a minimal CSP. The inline theme-bootstrap script in
      `BaseLayout.astro` needs a SHA-256 hash in `script-src`
      (preferred) or a relaxed `'unsafe-inline'` (avoid).
- [ ] **Cache headers** — `/_astro/*` immutable
      (`Cache-Control: public, max-age=31536000, immutable`), HTML
      no-cache or short SWR.
- [ ] **Satori-rendered OG image route** — `/og/[slug].png` (or
      `/og.png` for the default). Newsprint palette, page title
      rendered as text. Plug the result into the OG meta from the
      SEO section above.

---

## Part 2 — Things you need to do yourself

These need a human's eyes, accounts, or hardware. I can't do them from
this terminal.

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

### Decisions (settled 2026-05-18)

- ✅ **Hosting**: Netlify
- ✅ **OG images**: Satori-rendered per-page
- ✅ **Analytics**: none
- ✅ **JSON-LD `sameAs`**: GitHub (`DanielChomat`), LinkedIn (`danielchomat`)

### Accounts / external

- [ ] **DNS** — `chomat.tech` points to prod host, `www` redirect (or
      vice-versa), TTLs set sanely.
- [ ] **SSL** — cert valid, auto-renewing. Most hosts handle this; verify
      after first deploy.
- [ ] **Domain email** — `daniel@chomat.eu` SPF/DKIM if you're sending
      from the site (contact form). Skip if no outbound email.
- [ ] **`yarn npm audit`** — review high/critical findings; accept the
      ones worth taking.
- [ ] **Resume PDF** — if Puppeteer route is wired, run it once and
      verify the output looks right before launch. (Per memory: no React,
      Puppeteer over @react-pdf.)
- [ ] **Final content sweep** — read every public string out loud. No
      typos, no stale dates, no "lorem" you forgot (I already grepped —
      none found, but a human read still catches things).

### Launch day

- [ ] **Final `/verify` + `/review` pass** on `V2-redesign` HEAD.
- [ ] **Open the merge-to-prod PR** (or whatever ships V2-redesign).
      Wait for CodeRabbit per memory — don't merge before its review
      finishes.
- [ ] **First post-deploy smoke test**: every nav link, dark/light
      toggle, mobile menu open/close, 404 page, sitemap loads,
      `/og` image (if Satori route ships).
- [ ] **Submit sitemap to Google Search Console** (and Bing Webmaster
      if you care). One-time.

---

## Reference: scan strengths at time of writing

For your peace of mind — these are already in good shape:

- ✅ Zero inline `style=""` attributes anywhere
- ✅ Zero `transition: all`; zero `outline: none`
- ✅ Px usage all within AGENTS.md allowlist (hairlines, box-shadow)
- ✅ `prefers-reduced-motion` blocks in 5 stylesheets
- ✅ `:focus-visible` rules present (5 occurrences)
- ✅ Zero raw `<img>` tags (Astro `<Image>` or placeholders only)
- ✅ 22 `aria-*` attributes already in components
- ✅ No `lorem` / `TODO` / `placeholder` / `coming soon` in
      `src/data/` or `src/content/`
