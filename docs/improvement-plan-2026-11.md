# Improvement plan, November 2026

Written 2026-11-16 from an audit of `main` at `f6df688` (source read, production build inspected, pages checked in dev at 1024 and 375 px). For an implementing session to pick up cold.

The site is in good shape. Three portfolio reviews already covered content (88/100, "ready to send"), so this plan is about the build: accessibility defects, share previews, load behavior, and project docs that have drifted. No case study copy changes are in scope.

## Ground rules for the implementer

- Read `CLAUDE.md`, `PRODUCT.md` and `DESIGN.md` first. Skip the full `HANDOFF.md` until item 6 is done: it is too long for one read. Its first 10 lines are enough.
- Tokens only (`src/styles/tokens.css`), no new magic numbers, no `#fff` backgrounds, no em dashes in any prose, no framework islands.
- Do not change case study mdx, hero layout values, hero copy, or motion. Miguel has tuned these by hand over many sessions.
- Work on a branch (`improve/nov-audit`), one commit per item. Do not push or merge without Miguel's go-ahead: pushing to `main` deploys.
- Do not open migueljss.com in a browser for checks (it counts in Umami). Use the dev server, `npm run preview`, or curl.
- After each item: `npm run build` clean (0 errors, 0 warnings, 8 pages), then the item's own check. Check at 1440 and 375 px for anything visual.
- Update `HANDOFF.md` and, where a component's behavior changes, `DESIGN.md`.

## Part A. Defects (do these, in order)

### 1. The skip link never becomes visible

`src/layouts/BaseLayout.astro:77` renders `<a href="#main" class="visually-hidden">Skip to content</a>`. `.visually-hidden` (`src/styles/global.css:132`) has no focus state, so the first Tab on every page lands on a 1×1 px invisible link (measured in dev: focused element is "Skip to content", 1×1). Keyboard users lose their focus indicator on the first keypress, which contradicts the "visible focus rings" rule.

Fix: give the link its own `.skip-link` class in `global.css`. Hidden the same way at rest; on `:focus-visible` it shows at the top left, above the sticky nav (nav is `z-index: 10`), on `--bg-canvas` with `--fg-primary` text, Geist `--text-sm`, token padding, the standard `--shadow-focus` ring. No transition needed.

Check: Tab once on home, a case study and About: the link is visible and readable over the nav. Enter moves focus past the nav (next Tab lands inside `main`). Nothing shows at rest.

### 2. Focus rings disappear in forced-colors mode

`global.css:62-70` sets `outline: none` and draws focus with `box-shadow`. Windows High Contrast (forced colors) strips box shadows, leaving no focus indicator at all. The same pattern repeats in `CaseStudyCard.astro:75`, `Figure.astro:72`, and likely `JumpList.astro` and `ZoomDialog.astro` (grep `outline: none`).

Fix: replace each `outline: none` on a focus-visible rule with `outline: 2px solid transparent` (use a token for the width if one fits, `--rule-bold` is 2px). A transparent outline is invisible normally and is repainted in a system color under forced colors. Leave the bare `:focus { outline: none }` reset alone only if `:focus-visible` always follows it with the transparent outline.

Check: no visual change in normal mode. In Chrome DevTools, Rendering, "Emulate CSS media feature forced-colors: active": every focusable element shows an outline when tabbed to.

### 3. No nav item is current on case study pages

`src/components/Nav.astro:7-10`: "Work" is active only on an exact match with the home path, so on `/work/<slug>/` nothing in the nav is marked (confirmed in dev: zero `.is-active` links on Team Files).

Fix: mark "Work" with `is-active` when the path starts with `${base}work/` too. Keep `aria-current="page"` for the exact home match only; on case pages use `aria-current="true"` (the page is inside the section, it is not the linked page).

Check: home, each case study, About, Contact, Privacy, 404. Exactly one current item on the first four kinds, none on Privacy and 404.

### 4. Share previews

Most readers arrive from a CV link or LinkedIn, so the link preview is the first impression.

a. **Case study share images are WebP** (`src/layouts/CaseStudyLayout.astro:30`, `format: "webp"`). WebP support in link-preview scrapers is uneven, and this audit did not test LinkedIn's. Switch to `format: "jpg"` (quality around 80). The card and cover images stay WebP; only the `og:image` variant changes.

b. **Missing tags** in `BaseLayout.astro`: add `og:site_name` ("Miguel Jesus"), `og:image:width` and `og:image:height` (1200 and 630 for both the default PNG and the per-case image), and `og:image:alt`. Add an optional `ogType` prop defaulting to `website`; `CaseStudyLayout` passes `article`.

c. **Structured data**: one JSON-LD `Person` block on the home page only (name, jobTitle "Senior Product Designer", url, `sameAs` the LinkedIn profile, `address.addressLocality` "Porto"). No email in it.

d. **Home title** is just "Miguel Jesus", so a shared home link and the browser tab carry no role. Approved change: see item 10.

Check: in the built HTML, each case page has a `.jpg` `og:image` that returns 200 from `npm run preview` and is 1200×630; all tags present once; the JSON-LD parses (`JSON.parse` on the script contents). After deploy, Miguel can paste a case URL into LinkedIn's Post Inspector to confirm the preview.

### 5. Preload the two text fonts

The four woff2 files load only when the CSS asks for them, with `font-display: swap` (`tokens.css:9-40`). On a cold visit the hero h1 (Geist) and all body text (Aleo) paint in a fallback and then swap. There is no font preload on any page (the only preload is the hero portrait).

Fix: in `BaseLayout.astro`, import the Geist and Aleo roman files with `?url` and add `<link rel="preload" as="font" type="font/woff2" crossorigin>` for each. Not the italic, not Geist Mono. Confirm the preloaded URLs are the same hashed files the built CSS references (otherwise the fonts download twice).

This was not measured in the audit. Measure first: Chrome DevTools Performance on `npm run preview`, cache disabled, Fast 4G, home and Team Files, note LCP and layout shift before and after. If there is no visible gain, drop the item and say so in the handoff.

### 6. Project docs have drifted

a. **`CLAUDE.md`** says the site deploys to `dgigiu.github.io/mj-portfolio/` under a base path with "no CNAME yet". It has been live on `migueljss.com` since session 19 (`public/CNAME`, `site` in `astro.config.mjs`). Correct the intro and the "Stack at a glance" deploy line.

b. **`README.md`** says fonts come from `@fontsource`. They are self-hosted woff2 in `src/assets/fonts/`.

c. **`HANDOFF.md`** is 733 lines (about 53,000 tokens). `CLAUDE.md` says to read it first every session, but it no longer fits in one read. Its top entry also still describes the session 41 fixes as "uncommitted", though they are committed and pushed (`origin/main` is `f6df688`).
   - Move everything from "What changed in this session (2026-10-28, session 40...)" down to just above "Open items / look at these next" into a new `docs/handoff-archive.md`, unchanged.
   - Leave in `HANDOFF.md`: a short current-state summary (what is live, current H2 lists, what is open), the open items, the quick reference, and the two reusable methods (hero overlap measurement, headless Chrome for the jump list), each cut down to a few lines with a pointer to the archive. Target under 150 lines.
   - Merge the scattered "still open" notes (lines 5, 46-51, 75, 223) into the one open-items list. Drop the struck-through resolved items.
   - Add a line to `CLAUDE.md`: older session notes live in `docs/handoff-archive.md`, read only when needed.

d. **`skills-lock.json`** is untracked at the repo root. Decided: ignore it (item 13).

### 7. Token hygiene in the cobalt surfaces

The "use tokens" rule is broken in the hero, outro and footer: `#fff`, `rgba(255, 255, 255, 0.92)`, `rgba(255, 255, 255, 0.78)`, `rgba(8, 14, 32, ...)` and `#080e20` are repeated as literals across `index.astro`, `ContactOutro.astro` and `Footer.astro` (29 literal colors outside `tokens.css` in pages, layouts and components).

Fix: add a small "on accent" group to `tokens.css` (for example `--on-accent`, `--on-accent-soft`, `--on-accent-quiet`, `--hero-shade` as an RGB triplet or base color for the vignette stops) and replace the literals. Pure refactor: computed values must not change. Also change `theme-color` only if a token can feed it; a meta tag cannot read CSS variables, so leaving the literal there is fine.

Check: screenshot home (top and bottom) and a case study bottom before and after at 1440 and 375; they must be pixel-identical. Update the `DESIGN.md` color section.

## Part B. Optional, lower value

### 8. Unreferenced originals in the deploy

`dist/_astro` carries 28 original PNG and JPG files, 15 MB of the 21 MB build, and no built HTML, CSS or JS references them (every image is served as WebP). No visitor downloads them, so this only costs deploy size and time. If it is cheap, add a post-build step that deletes `_astro/*.png|jpg` files with no reference anywhere in `dist`. Run it after item 4, since the JPG share images must survive. Skip if it needs more than a short script.

### 9. About page link consistency

`about.astro:79` links LinkedIn as `https://linkedin.com/in/migueljss` without `rel="me"`; every other page uses `https://www.linkedin.com/in/migueljss/` with `rel="me noopener noreferrer"`. Align the href and rel. Leave the visible text.

## Part C. Decisions from Miguel (answered 2026-11-16)

All four are decided and are part of the work.

### 10. Home title (approved)

In `src/pages/index.astro`, the `BaseLayout` title becomes "Miguel Jesus · Senior Product Designer". `BaseLayout.astro:31` special-cases the exact string "Miguel Jesus" to skip the " · Miguel Jesus" suffix, so adjust that check (the home title must not come out as "Miguel Jesus · Senior Product Designer · Miguel Jesus"). Other pages keep "Page · Miguel Jesus".

Check: built home `<title>` and `og:title` read exactly "Miguel Jesus · Senior Product Designer"; the other seven pages are unchanged.

### 11. Tighter nav on phones (approved)

`src/components/Nav.astro`: under 720 px only, reduce the nav's block padding from `--space-6` to `--space-4` (82 px to about 66 px). Nothing else changes: same type sizes, same hairline, and the links keep their 44 px hit area (the `::before` expansion). Desktop is untouched, so the 96 px `scroll-margin-top` and the jump list rail are unaffected.

Check at 375 and 360 px on home, a case study and About: nav height, no wrap of the three links, tap targets still at least 44 px, and a heading reached from the collapsed jump list still clears the nav.

### 12. CV link on About (approved)

`src/pages/about.astro:79`, closing sentence only. Smallest edit, wording taken from the outro band:

| Where | Now | Change to |
| --- | --- | --- |
| About, "Get in touch", end of sentence | ...and you can find me on LinkedIn at linkedin.com/in/migueljss. | ...and you can find me on LinkedIn at linkedin.com/in/migueljss, or open the CV (PDF). |

"CV" is the link, to `${base}miguel-jesus-cv.pdf`, with `target="_blank" rel="noopener"`, `data-umami-event="CV open"` and `data-umami-event-location="about"` (same pattern as `ContactOutro.astro:20`). Do item 9 in the same commit.

### 13. `skills-lock.json` (approved: ignore)

Add `skills-lock.json` to `.gitignore`, next to the Impeccable skill entries, with a one-line comment. Do not delete the file and do not commit it.

## Out of scope

- Case study copy, the miPlay and office editor cases, and the stale per-application CVs in `docs/Applications/`: content work that needs Miguel.
- Dark mode. The tokens exist but the hero, covers and figures were designed for the light canvas. Not worth the risk during a job search.
- Hero layout, hero copy, motion, card hover (parked in memory until the revised design system).

## Done means

- Items 1 to 7 and 9 to 13 each landed as one commit on `improve/nov-audit` (9 and 12 share one), or are recorded as dropped with the reason.
- `npm run build` is clean.
- `HANDOFF.md` is under 150 lines and describes the true state.
- Nothing pushed without Miguel's go-ahead.
