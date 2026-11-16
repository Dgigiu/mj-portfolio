# Handoff

Last updated: 2026-11-16 (session 42, build audit fixes on branch `improve/nov-audit`, not pushed)

Older session notes live in [docs/handoff-archive.md](docs/handoff-archive.md), unchanged. Read them only when you need the detail behind a decision; the git log carries the same narrative per commit.

## Current state

- **Live:** https://migueljss.com, deployed by GitHub Actions to GitHub Pages on every push to `main` (`public/CNAME`, `site` in `astro.config.mjs`, no `base`). `origin/main` is `f6df688` (session 41 copy fixes, the new CV and the Food Save paragraph split are all live).
- **Branch `improve/nov-audit`** (session 42): the November build audit, one commit per item, not pushed or merged. Pushing or merging to `main` deploys, so wait for Miguel. Details in "Session 42" below.
- **Routes (8 built pages):** `/`, `/about/`, `/contact/`, `/privacy/`, `/404`, and `/work/team-files/`, `/work/myfoodways/`, `/work/food-save/`.
- **Case study H2s** (the jump list and its Umami section slugs follow these word for word):
  - Team Files (8): Everyone sees the latest version; Role; Download, edit, re-upload, repeat; The 2023 UX review; What long tenure lets you notice; A design system engineers built from; Beyond the product; Keeping it coherent while it grows.
  - MyFoodways (7): Cooking from what’s in the fridge; Role; Recipes that don’t fit real life; Making the mission practical; Search, profile, recipes and challenges; Contrast versus a fixed brand; Good design isn’t enough on its own.
  - Food Save (9): Ready-to-use measures for busy kitchens; Role; Food waste in a low-margin business; Designing for the decision-makers; From competition to practical tool; A library kitchens could act on; Stepping in as interim PM; Part of a pair; Smaller, and better for it.
- **CV:** `public/miguel-jesus-cv.pdf`, stamped `?ref=cv` (session 41 export). Per-application copies in `docs/Applications/` predate it and were not regenerated.
- **Reviews:** three `/pd-portfolio-review` passes (85, 90, 88 out of 100, all "ready to send"). The session 41 ranked fixes 1 to 4 landed and are live; fix 5 (a miPlay case) is open below.

## Session 42 (2026-11-16): build audit, branch `improve/nov-audit`

Plan: [docs/improvement-plan-2026-11.md](docs/improvement-plan-2026-11.md) (commit `7e45a4f`). Each item below is one commit; the build is clean after each (0 errors, 0 warnings, 8 pages). Visual checks ran on `npm run preview` in headless Chrome and the in-app browser pane, never on the live site.

1. `7b4b41f` **Skip link** shows on keyboard focus: `.skip-link` in `global.css`, fixed top left above the nav, canvas fill, Geist `--text-sm`, focus ring. Enter moves the next Tab into `main`.
2. `b3c16f9` **Forced colors:** every `:focus-visible` rule uses `outline: var(--rule-bold) solid transparent` instead of `outline: none`, so high contrast mode repaints a ring. Checked in headless Chrome with `forced-colors: active` emulated: before, 59 of 59 focusables across home, Team Files, About and Contact had no outline; after, none lacked one. The zoom dialog close button too.
3. `e73b73f` **Nav:** "Work" is current on case pages (`is-active`, `aria-current="true"`); home keeps `aria-current="page"`. Privacy and 404 have none.
4. `e9cae70` **Share previews:** case `og:image` is a 1200×630 JPG (q80; cards and covers stay WebP). Added `og:site_name`, `og:image:width`/`height`/`alt`, `og:type` (`article` on cases via the new `ogType` prop) and a `Person` JSON-LD block on home only. After deploy, paste a case URL into LinkedIn's Post Inspector to confirm the preview.
5. **Font preload: dropped, not committed.** Measured on `npm run preview` in headless Chrome (cache off, 9 Mbps down, 165 ms latency, 9 runs each, 1440 and 375, home and Team Files). With Geist and Aleo preloaded the fonts finished about 160 ms sooner (about 510 ms vs 670 ms), but first paint and LCP moved about 80 ms later (LCP medians 492 to 512 ms vs 416 to 428 ms) because the fonts compete with the CSS and hero image for bandwidth. Layout shift was about 0 either way (max 0.0003). No gain on the plan's measures, so the preload is not in the build. The hashed URLs did match the CSS, so the fonts would not have downloaded twice.
6. `4281397` **Docs:** this file cut down (the rest moved to the archive); `CLAUDE.md` and `README.md` corrected (live domain, self-hosted fonts).

7. `b59f060` **Cobalt surface tokens:** new `--fg-on-accent-soft` (92%), `-quiet` (78%), `-faint` (70%), `--border-on-accent` (18%) from `--on-accent-rgb`, and `--hero-shade` / `--hero-shade-rgb` (#080e20) for the vignette and veil. `index.astro`, `ContactOutro` and `Footer` now carry no color literals. Pure refactor: home top, home at 400 px scroll, home bottom and Team Files bottom at 1440 and 375 are byte-identical PNGs before and after, and computed colors match. `theme-color` stays a literal (a meta tag cannot read tokens). The zoom dialog backdrop `rgba(14, 14, 16, 0.78)` is still a literal (outside the cobalt surfaces).
8. `49ee646` **Prune originals:** `scripts/prune-originals.mjs` runs after `astro build` and deletes PNG and JPG files in `dist/_astro` that nothing in `dist` references (25 files, 15 MB; `dist` 23 to 7 MB). The three JPG share images stay. Every `/_astro/` URL in the built HTML, CSS and JS resolves, and every image on home, About and the three cases returns 200 from preview.
9 and 12. `2ac1d84` **About:** LinkedIn link is now `https://www.linkedin.com/in/migueljss/` with `rel="me noopener noreferrer"`; the closing sentence ends "…on LinkedIn at linkedin.com/in/migueljss, or open the CV (PDF)." with "CV" linking the PDF (`data-umami-event="CV open"`, location `about`). Checked rendered at 1440 and 375, no overflow; the PDF returns 200.
10. `fea44a4` **Home title:** "Miguel Jesus · Senior Product Designer" in `<title>` and `og:title`. The suffix check is now `title.startsWith("Miguel Jesus")`; the other seven titles are unchanged.
11. `d616811` **Nav on phones:** block padding `--space-4` under 720 px. Measured in headless Chrome: 82 px tall at 1440 and 721, 66 px at 720, 375 and 360; links on one row; hit areas 55 px; a heading reached from the collapsed jump list lands at 96 px, 30 px clear of the nav (Team Files and Food Save, 720, 375, 360).
13. `4bb6b27` **`skills-lock.json`** is ignored (next to the Impeccable entries), not deleted, not committed.

`DESIGN.md` now covers the on-accent tokens, the forced-colors outline, "Work" as current on case pages, the phone nav padding and the skip link.

## Open items

**Content (needs Miguel)**
- A short miPlay case from `docs/Case Studies/cs-board-game-app.md` (fix 5 of the session 41 review). The office editor draft (`cs-office-editor.md`) is also on hold. Each needs images in `src/assets/case-studies/<slug>/`, a new mdx and an `order` value.
- Food Save "Used in professional kitchens": a kitchen count would strengthen it, if known.
- Team Files "so we carefully designed around those limits" could name what was chosen for the open-in-new-tab case.
- Whether TF-05 and TF-06 need larger text inline (the zoom dialog already handles the zoomed view).
- LinkedIn Experience is hidden when signed out; compare it signed in against the CV dates.
- Per-application CVs in `docs/Applications/` carry older wording.

**Checks**
- MyFoodways, Food Save and Contact were read from HTML in session 40, not checked rendered at 375 px.
- After the audit branch deploys: LinkedIn Post Inspector on a case URL (item 4). Forced colors was checked by emulation only, not on Windows High Contrast.
- **iCloud duplicates:** the repo sits in a synced Documents folder, and files named `* 2.*` keep appearing (`dist/index 2.html` and 24 more in `dist`, and `.git/index 2` dated 2026-11-16 17:44, during session 42). `dist` is rebuilt on CI so the deploy is unaffected, and git works normally. Worth moving the repo out of the synced folder or excluding it; nothing was deleted.

**Design system**
- `DESIGN.md` does not document the case header outcomes list yet.
- The zoom dialog backdrop color is a literal in `ZoomDialog.astro`; `README.md` still lists the deleted `HeroGradient` component.
- Card hover (whole-card blue wash) is a placeholder until the revised design system lands (memory).
- Dark-mode tokens exist in `tokens.css` but are not wired; out of scope during the job search.

**Known non-issues (don't re-flag)**
- Lighthouse contrast on the home cards is the reveal animation's 0.75 start opacity, not real (memory).
- At 1440×900 the project list starts below the first screen; kept by preference (large hero).
- Brave and uBlock block Umami; accepted, no proxy.

## Decisions that must not regress

- No hero entrance animations. Reveals stay faint: opacity from 0.75, 8px travel, no stagger, observer threshold 0.
- Hero content stays minimal (no eyebrow, no meta line). Hero portrait has no width cap; fix layout by reframing, not shrinking. Hero layout values and copy are Miguel's to change.
- Cobalt has four sanctioned full-bleed uses (hero panel, hero glow, contact band, footer strip). Everywhere else it marks only links, focus, current state and markers.
- Work-card order is title, benefit, description, meta, CTA; the compact "More case studies" variant keeps meta above title.
- Accent is `#155fe8` (AA on the canvas). `--fg-muted` (#8d8d8d) is decorative only.
- On `.container` sections use `padding-block`, never the `padding` shorthand.
- Team Files reach figure is "over 9,000 active installations" everywhere.
- No em dashes anywhere, docs and alt text included.

## Reusable methods

**Hero overlap measurement** (any hero subtitle or headline change): sweep an iframe of `/` from 1101 to 1441 px wide in 4 px steps at 768, 800 and 900 px tall; for each text line compare the right edge of its word boxes with the leftmost portrait pixel with alpha above 128 in the same rows. A negative gap is an overlap. Full write-up under session 37 in the archive.

**Headless Chrome over DevTools** (jump list, forced colors, timing): launch Chrome with `--headless=new --remote-debugging-port`, drive it with Node's built-in WebSocket (`Emulation.setDeviceMetricsOverride`, `Emulation.setEmulatedMedia`, `Page.navigate`, `Runtime.evaluate`, `Page.captureScreenshot`) and remove `astro-dev-toolbar` before capturing. The in-app browser pane does not run IntersectionObserver callbacks while hidden, so it is unreliable for scroll-driven checks. Details under session 37 in the archive.

## Quick reference

```
npm run dev       # http://localhost:4321/ (design lab at /lab)
npm run build     # astro check && astro build
npm run preview
npm run cv -- <company>   # stamp a per-application CV (see the cv-stamp skill)
```

- Tokens: [src/styles/tokens.css](src/styles/tokens.css) (canonical). Global styles: [src/styles/global.css](src/styles/global.css). Type: [src/styles/typography.css](src/styles/typography.css).
- Case study source of truth: `src/content/case-studies/*.mdx`. `docs/Case Studies/` matters only for the unpublished drafts.
- Do not open migueljss.com in a browser for checks (it counts in Umami); use curl, or opt out first (memory: Umami opt-out in the browser pane).
- Conventions: warm canvas `#fbfaf6`, never pure white; 8pt spacing tokens, no magic numbers; one `h1` per page; visible focus rings; `prefers-reduced-motion` respected; US English, sentence case, no fluff.
