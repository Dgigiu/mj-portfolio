# Handoff

Last updated: 2026-08-31 (session 19)

## Where we are

**Domain switch happened this session.** The portfolio now lives at **https://migueljss.com**, deployed via GitHub Actions to GitHub Pages, HTTPS enforced. Repo at **https://github.com/Dgigiu/mj-portfolio**. The old staging URL `https://dgigiu.github.io/mj-portfolio/...` redirects (301) to the matching path on the new domain, GitHub Pages handles this automatically now that the custom domain is registered.

Astro is configured with `site: 'https://migueljss.com'` and no `base` (removed). All internal links use the normalized base exported from [src/lib/paths.ts](src/lib/paths.ts), which now just collapses to `/`.

The staging-only `noindex` guard (added session 10) is gone automatically: it was keyed off the github.io host in `Astro.site`, which is no longer that host. Nothing to undo, this was the designed behavior.

Build is clean (`npm run build` → 7 pages, 0 errors / 0 warnings).

## What changed in this session (2026-08-31, session 19)

Miguel updated the background on the Figma frames for Food Save and MyFoodways; re-exported every frame already wired into the site for both cases and overwrote the existing files in place (same filenames, same node IDs as prior sessions, no mdx changes needed). Build clean (7 pages, 0/0/0), all images verified 200 with correct dimensions via the dev server.

- **Food Save** (`RqT7cSB5meoG2VQu7ggWNo`, page "version 2"): re-exported `FS-02-library`, `FS-03-measure-detail`, `FS-04-tasklist`, `FS-05-home` (PNG, 1600×1055). `FS-00-cover-banner.jpg` and `FS-00-cover-thumb.jpg` also re-exported but came back byte-identical to the existing files, the cover frames weren't touched by this background update.
- **MyFoodways** (`m1vVaKCwVkvG4AtieNx7NW`, page "v2", file key newly recorded here since it wasn't in HANDOFF before): re-exported all nine frames, `MFW-00-cover-banner.jpg`/`MFW-00-cover-thumb.jpg` (JPG, 1920×960 / 1200×900) and `MFW-01-product` through `MFW-08-post-launch-changes` (PNG, native frame sizes). All changed.
- Also resolved the myfoodways `recipe2` open item from session 17/18 and cleaned the stale "Let's cook" second-screen paragraph out of `docs/Case Studies/cs-myfoodways-app.md` (gitignored staging doc, doc tidiness only, no code change).
- **Home hero copy swapped** ([index.astro](src/pages/index.astro)), Miguel's revision, more conversational than the old "Calm products for complex work.": headline is now "Hi! I'm Miguel. I design products from first sketch to first release and beyond.", subhead "For 20+ years I've designed SaaS and mobile products, connecting user needs with business goals. A few of those stories are below." The old headline was short enough to need a manual two-line break (`.hero-break`, session 12); the new one is long enough to wrap naturally, so the forced break and its CSS (including the now-mobile-only override) were removed as dead code. Same `clamp(44px, 5.3vw, 72px)` font ceiling and 600px column, no other hero CSS touched. Browser-verified at 375/1024/1200/1440px: wraps to 3 to 5 lines depending on width, stays clear of the portrait at every size checked (the known session-12 overlap risk), no console errors. Build clean (7 pages, 0/0/0). Resolves the "Hero copy" item that was open since session 11.
- **Team Files got its real images**, closing the last open placeholder-cover item from session 16. Figma file `oIt1mAagsb5rIThaLCjvFt` ("Team-Files-app"), page "Version 2" (node `4070:4347`, from the URL Miguel gave): exported `TF-00-cover-banner`/`TF-00-cover-thumb` (JPG, 1920×960 / 1200×900) and `TF-02-connect-folder`, `TF-03-attach-files`, `TF-04-layout`, `TF-05-automation-settings`, `TF-06-value-proposition` (PNG, 1600×1055), matching every frame the mdx already imports. Frontmatter `thumbnail`/`banner` repointed from the old single `TF-01-hero-cover.png` to the new two-image pair, giving Team Files the same cover treatment as the other two cases. Deleted the now-unused `TF-01-hero-cover.png` and `TF-01-hero.png` (the latter was already unused since session 11). `tf-getting-started-system.png` left alone, it's a real product screenshot, not a Figma export, and nothing in the Figma file corresponds to it. Build clean (7 pages, 0/0/0), verified via rendered HTML that both the case page and the home card resolve to the new files, no console errors.
- **Team Files also got a whole-body text resync**, from Miguel's freshly updated **[docs/Case Studies/cs-team-files.md](docs/Case Studies/cs-team-files.md)** (the images landing prompted him to also update the doc, same day). Real content changes: a new paragraph and figure in Product contrasting a frozen Confluence attachment with Team Files' live preview (the `TF-06-value-proposition` figure moved here from "Beyond the product," which now has no figure); a new closing sentence on permissions settings in the connect-folder flow, with its figure caption updated to match; a new sentence on the attach flow's live preview, ditto; minor bullet rewording in Design execution. All five newly-real figure alt/captions were rewritten from the doc since the old ones were written blind against placeholders before any real image existed. One conflict surfaced and was resolved with Miguel: his first doc pass had softened the Impact stat to "used by thousands of teams" and dropped the 3.7-star rating from that sentence, which would have regressed the "over 9,000 companies" figure standardized in session 7 (see "Decisions that must not regress"). Flagged it before writing; Miguel fixed the doc itself to restore "over 9,000 companies" (specifically "companies," not "teams") with the rating, so the shipped text matches the doc exactly, no override needed. Dropped the unused `CompareImages` import. Headings normalized to the site's sentence-case/no-ampersand convention as usual (`Problem & Context` → `Problem and context`, etc.), doc's `FIGMA:` placeholders left as-is (this doc wasn't asked to have them replaced with real paths, unlike food-save's). Build clean (7 pages, 0/0/0), all 8 figures verified rendering in order with 200s, no console errors.
- **Collapsed thumbnail + banner into a single cover image**, discussed and greenlit by Miguel after noticing the OG image (1200×630, 1.905:1) is nearly the same ratio as the banner (was 1920×960, 2:1). One export now covers the case page hero, the home + "more case studies" cards, and the per-case OG/share image, replacing the two-image-per-case system from session 16.
  - **Schema** ([config.ts](src/content/config.ts)): `thumbnail` field removed. `banner` is now the only cover field, documented as 1200:630, export 1920×1008 (previously 1920×960 for banner, 1200×900 for thumbnail).
  - **New unified ratio, 1200:630, everywhere a cover shows**: [CaseStudyCard.astro](src/components/CaseStudyCard.astro)'s `.card-media` (both the home-grid and the compact "more case studies" variant, which was `16:10`) and [CaseStudyLayout.astro](src/layouts/CaseStudyLayout.astro)'s `.cover-img` (was locked to `2:1`) all changed from their old ratios to `aspect-ratio: 1200 / 630`. `object-fit: cover` still guards against an export that isn't exact.
  - **Per-case OG image generated at build time from `banner`**, no more per-case static files needed: `CaseStudyLayout.astro` calls `getImage({ src: banner, width: 1200, height: 630, fit: "cover", format: "webp" })` and passes the result's `.src` straight to `BaseLayout`'s `ogImage` prop. `fit: "cover"` matters: without it, `getImage` preserved the source's own ratio and ignored the requested height (produced 1200×600 from the still-2:1 interim source, not 1200×630) rather than cropping to the requested box. The generic `og/default.png` (home/about/contact, [scripts/build-og-image.mjs](scripts/build-og-image.mjs)) is untouched, it's just the fallback now for pages with no `banner`.
  - **`BaseLayout.astro`'s `ogImage` prop simplified**: used to be a bare filename the layout concatenated with `base` (`"og/default.png"` → `${base}${ogImage}`), which can't accept an `astro:assets` result since `getImage()`'s `.src` already includes `base` itself. Now `ogImage` is a full site-root-relative path end to end (default value computed the same way, `` `${base}og/default.png` ``), and `BaseLayout` just does `new URL(ogImage, Astro.site)`.
  - **Assets renamed and unused files dropped**: `<PREFIX>-00-cover-banner.jpg` → `<PREFIX>-00-cover.jpg` for all three cases (`git mv`, history preserved); the three now-unused `<PREFIX>-00-cover-thumb.jpg` files deleted. All three mdx frontmatters updated to the single `banner:` field pointing at the renamed file.
  - **New 1920×1008 exports landed same session**: Miguel updated all three Figma covers in place (same node IDs, `FS-00-cover-banner`/`MFW-00-cover-banner`/`TF-00-cover-banner` frames resized from 1920×960 to 1920×1008, the separate thumb frames deleted from all three files). Re-exported and swapped in at the renamed paths. The `fit: "cover"` transitional crop mentioned above is no longer doing any real work now that the source matches the target ratio exactly, confirmed by the generated OG webp coming out at precisely 1200×630 (no longer 1200×600 short of target, which is what an unmatched ratio without `fit: "cover"` would have produced).
  - Build clean (7 pages, 0/0/0), browser-verified: OG meta tag resolves to a real `1200×630` webp per case study (verified pixel dimensions with the new sources, not just the URL), home cards and case-page hero both render at the new ratio with the actual new compositions, no console errors, no leftover `thumbnail` references anywhere in `src/`.
- **Home hero headline split into two visual beats** ([index.astro](src/pages/index.astro)), Miguel's follow-up once the single-block headline was live: "Hi! I'm Miguel." reads as its own line at the full size, then a gap, then "I design products from first sketch to first release and beyond." wraps on its own at a smaller size for hierarchy (Miguel supplied a reference screenshot of the target look). Markup: the `<h1>` now wraps two `<span>`s (`.hero-title-lead`, `.hero-title-body`) instead of one text node, still a single `<h1>` landmark. `.hero-title-body` is `font-size: 0.65em` (relative to the h1's own responsive `clamp(44px, 5.3vw, 72px)`, so it scales at every breakpoint without its own clamp) with slightly tighter `letter-spacing: -0.02em`. Both spans are `display: block` with `text-wrap: balance` set directly on each, since making them block-level splits the h1 into two separate wrapping contexts and balance doesn't inherit across that split. The `margin-bottom: 0.25em` gap between them is on `.hero-title-lead`, also em-based off its own (full) size. Browser-verified at 375/1440/1920px against Miguel's reference, no console errors, build clean (7 pages, 0/0/0).
- **Domain switch to migueljss.com, executed.** Miguel added DNS at his registrar (Namecheap): 4× A records on `@` to the GitHub Pages IPs (`185.199.108.153`–`.111.153`) and a CNAME on `www` → `dgigiu.github.io`. First pass had two of the four A records mistakenly on `www` instead of `@`; caught and corrected before proceeding. Once DNS was confirmed:
  - **astro.config.mjs**: `site` → `https://migueljss.com`, `base` removed entirely.
  - **public/robots.txt**: sitemap URL updated to `https://migueljss.com/sitemap-index.xml`.
  - **public/CNAME** created with `migueljss.com` (new file, wasn't in the repo before).
  - **Custom domain registered on GitHub Pages** via `gh api -X PUT repos/Dgigiu/mj-portfolio/pages -f cname=migueljss.com`. Confirmed via `gh api repos/Dgigiu/mj-portfolio/pages`: `html_url` now `http://migueljss.com/`, DNS already showing verified (`pending_domain_unverified_at: null`) since the records were in place first, HTTPS cert in progress (`https_certificate.state: "authorization_created"`, `https_enforced: false` until that finishes).
  - No other code changes needed: both `src/lib/paths.ts`'s `base` export and `BaseLayout.astro`'s staging-`noindex` guard were written back in sessions 10–11 specifically to self-resolve at this exact moment (base collapses to `/`, noindex clears because `Astro.site.hostname` no longer ends in `github.io`), and did.
  - Build clean (7 pages, 0/0/0), verified in the built output: all internal links root-relative (no `/mj-portfolio/` prefix), zero `noindex` occurrences, canonical/`og:image`/sitemap all point to `migueljss.com`, `CNAME` file present in `dist/`. Browser-verified the dev server serves correctly at `/` with no base prefix.
  - **Fully verified live, same session**: cert reached `"approved"` for both `migueljss.com` and `www.migueljss.com` within a couple minutes (DNS was already correct going in, so no waiting on propagation). Enabled `https_enforced` via `gh api -X PUT repos/Dgigiu/mj-portfolio/pages -F https_enforced=true` (note `-F` not `-f`, the endpoint rejects a string `"true"` for a boolean field). Confirmed live: `https://migueljss.com/` and sub-paths serve 200 with the correct content; `https://www.migueljss.com/` 301s to the apex; **old staging URLs redirect to the matching path on the new domain**, not just the homepage (`https://dgigiu.github.io/mj-portfolio/work/team-files/` → `https://migueljss.com/work/team-files/`, 301), better than the flat "path breaks" HANDOFF originally expected. One loose end: plain `http://migueljss.com/` was still returning 200 instead of redirecting to https right after flipping `https_enforced`, likely edge-cache propagation lag rather than a real misconfiguration, worth a re-check next session if it hasn't self-resolved.

## What changed in this session (2026-08-29, session 18)

Full resync of [food-save.mdx](src/content/case-studies/food-save.mdx) from **[docs/Case Studies/cs-food-save-app.md](docs/Case Studies/cs-food-save-app.md)**, plus the first real image set for this case (previously all placeholders). Build clean (7 pages, 0/0/0), all 5 new images verified 200 in-browser and correctly wired into both the case page and the home card.

- **Images exported from Figma** (`RqT7cSB5meoG2VQu7ggWNo`, page "version 2") via the Figma MCP: `FS-02-library`, `FS-03-measure-detail`, `FS-04-tasklist`, `FS-05-home` (all PNG, 1600×1055, matching the existing UI-screen convention) and the cover, exported as **both** `FS-00-cover-banner.jpg` (1920×960) and `FS-00-cover-thumb.jpg` (1200×900). Only the banner frame was asked for, but a matching `FS-00-cover-thumb` frame already existed in the Figma page at exactly the 1200×900 target from the session-16 spec, so I exported it too rather than reusing the banner for both slots. This finally gives food-save the same two-image cover treatment myfoodways got in session 17 (the open item from that session). Format followed the established pattern exactly: jpg for the photographic cover (hand holding a phone), png for the UI-screen frames, scale 1, filenames matching frame names verbatim.
- **Old placeholder images deleted**: `FS-01-hero-cover.png`, `FS-01-hero.png`, `FS-03-tasklist.png` (content now `FS-04-tasklist.png`), `FS-04-home.png` (content now `FS-05-home.png`).
- **Whole-body rewrite from the doc**, same approach as session 17's myfoodways pass. New content folded in: a "Home" subsection under Design execution (previously the home screen had no dedicated write-up), a sentence about sharing a measure directly with a colleague in Measure library, and a closing Collaboration paragraph tying the user research back to the budget-saving implementation choice. Measure library and Measure detail are now two sequential `<Figure>`s instead of a `<CompareImages>` side-by-side, matching how the doc presents them as full multi-panel screens rather than single-screen comparisons; `CompareImages` import dropped since nothing uses it anymore in this file.
- **Bullet-list semicolons restored to match the doc**, consistent with [[feedback_bullet_list_punctuation]] and the immediately preceding commit that did the same for myfoodways: the UX design learnings list (previously plain periods, a leftover from session 6 before that convention was established) now uses semicolons with a final full stop, like every other list in this file.
- **Minor editorial smoothing kept from the pre-existing text over the doc's raw phrasing** in two spots, both same-meaning, not content changes: the Role section's "Moritz and Mark (Swiss Foodways team → United Against Waste)" stayed as flowing prose rather than the doc's arrow shorthand; the Part of a pair section's "Food Save suggested measures to adopt; the Waste Tracker showed..." kept its semicolon over the doc's comma splice.
- **Doc file itself updated too**: replaced all five `FIGMA:name` placeholders in `cs-food-save-app.md` with real relative paths to the exported assets, per this session's explicit request (the myfoodways doc was left with its placeholders after its session-17 resync; this is a deliberate difference this time, not an inconsistency to fix).

## What changed in this session (2026-08-28, session 17)

Full resync of [myfoodways.mdx](src/content/case-studies/myfoodways.mdx) from Miguel's **[docs/Case Studies/cs-myfoodways-app.md](docs/Case Studies/cs-myfoodways-app.md)** (edited with Claude Chat). First pass in this session had only folded in the images + accessibility section and left the rest of the older prose alone; Miguel flagged that his broader text edits weren't showing up, so this pass rewrote the whole body from the doc, not just the diff. Build clean (0/0), all images verified 200 + decoding in-browser, 8 figures render in the right order.

- **Whole-body rewrite from the doc.** Every section (Product, Problem and context, Research, Solution strategy, Key features, Accessibility, Collaboration, Impact and reflections) now matches the doc's current text. Only normalized two established, pre-existing site conventions that predate this case: sentence-case headings ("Problem and context" not "Problem & Context" — matches food-save.mdx/team-files.mdx) and curly quotes/apostrophes (per the "use typographic apostrophes and quotes" commit). Also US-spelled "Favorites" (doc had UK "Favourites") per the site's US English rule, and dropped bullets' trailing semicolons to match the site's no-trailing-punctuation list style.
- **Structural change carried over from the doc:** Problem and context now runs as two sequential single figures (problem image → paragraph → solution image) rather than the old side-by-side `<CompareImages>`. `CompareImages` import removed from this file since nothing uses it anymore.
- **Accessibility is its own top-level section** (`## Accessibility over time`), after Key features, before Collaboration. Two new figures in it: `MFW-07-accessibility.png` and `MFW-08-post-launch-changes.png`.
- **Covers switched to jpg.** Miguel exported both `.jpg` and `.png` versions of the covers on purpose (jpg for compression, since they're photographic). Switched `thumbnail`/`banner` to the `.jpg` sources and deleted the now-unused `.png` duplicates. Both jpgs confirmed exact target dimensions: thumb 1200×900 (4:3), banner 1920×960 (2:1).
- **Renamed on disk:** `MFW-01-hero.png` → `MFW-01-product.png`; `MFW-08-post launch changes.png` → `MFW-08-post-launch-changes.png` (spaces break JS imports).

### Open item for Miguel

- ~~`MFW-05-flexible-recipe2.png` still doesn't exist~~ — resolved (session 19, 2026-08-31): recipe2 was never a second screen, it was a newer version of the same recipe image. `MFW-05-flexible-recipe.png` is the current, correct file; no second figure needed. The doc's `cs-myfoodways-app.md` still has a stale "Let's cook" second-screen paragraph and `FIGMA:MFW-05-flexible-recipe2` placeholder left over from before this was resolved (gitignored staging file, not cleaned up).
- ~~The other two case studies (food-save, team-files) still point `thumbnail`/`banner` at their old single hero-cover placeholder~~ — food-save got its real images and two-image cover treatment in session 18; team-files got the same in session 19. All three case studies now have real, two-image covers.

## What changed in this session (2026-08-28, session 16)

Split the single case-study `cover` image into **two independent images per case** so Miguel can compose and crop the home card and the case-page hero separately. Miguel is producing the new images; this session was the code side. Build clean (`npm run build` → astro check + 7 pages, 0 errors).

- **Schema ([src/content/config.ts](src/content/config.ts)):** `cover` removed; replaced by two optional fields, `thumbnail` and `banner`. Each falls back to the other in code, so a case with only one image still renders everywhere.
- **Wiring:** [CaseStudyLayout.astro](src/layouts/CaseStudyLayout.astro) hero now uses `banner ?? thumbnail`; home cards ([index.astro](src/pages/index.astro)) and the "More case studies" list use `thumbnail ?? banner`. [work/[slug].astro](src/pages/work/[slug].astro) passes both through. `CaseStudyCard`'s prop stayed the generic `cover` (caller decides which image to feed it).
- **All three MDX files** (food-save, myfoodways, team-files) now set both `thumbnail` and `banner` to the existing `*-hero-cover.png` as a placeholder, so nothing breaks until the new images land.

### Image target sizes (for the new images)

- **Thumbnail (home + "more case studies" cards):** hard **4:3** crop, `object-fit: cover` trims overflow. Max on-screen width 456px; Astro emits 480/800/1200 variants. **Export 1200 × 900 px.** Keep key content off the edges (center-cropped) and clear of the rounded corners.
- **Banner (case study page hero):** locked to **2:1** (illustrative strip), enforced via `aspect-ratio: 2 / 1` + `object-fit: cover` on `.cover-img` so it reserves space (no layout shift) and crops any off-ratio export instead of distorting. Max on-screen width 960px (`--content-wide`); Astro emits 960/1440/1920 variants. **Export 1920 × 960 px.** Miguel chose 2:1 since the banner is now more illustrative than the old cover.

**When new images land:** drop files into `src/assets/case-studies/<slug>/`, point `thumbnail:` and `banner:` at them in each MDX frontmatter (currently both point at the same placeholder), then `npm run build`.

## What changed in this session (2026-07-01, session 14)

Design-system work, mostly in the **Figma** file (MJ Design System, `rUbsiKyYr0xITgTGVXJjJT`), plus a token wire-up in code. No site UI changed; the new accents have no consumer in the Astro site yet (there is no badge/annotation component), so this is design-system-only until those ship. Not yet browser-relevant, so no build/preview run.

- **Spacing + radius variables added to Figma** (Primitives collection): `spacing/0…40` (8pt grid, mirrors `tokens.css`, scoped WIDTH_HEIGHT + GAP) and `radius/none…pill` (scoped CORNER_RADIUS). Code already had these; this brought Figma to parity.
- **Second accent = gold `#e89e15`** ("accent 2"). Context: Miguel needs annotation badges (warning triangle, etc.) that read over case study screenshots; the old `status/warning` amber washed out. Gold is cobalt's near-complement. In Figma: new `gold/*` primitive ramp; the existing `accent2/*` semantic tokens were **repointed** from sienna to gold (they already backed the warning badge, so it flipped automatically).
- **Decoupled connector from badge.** Key finding: no gold can be both "gold" and dark enough to stay legible over the grey Figma board (a thin dashed line needs luminance contrast; gold is intrinsically light). So the badge carries the color and the **connector line goes neutral ink**. The Step Connector component's `Color=Warning` variant became `Color=Ink` (rebound to `ink/700`). `Color=Cobalt` left as-is. **Caveat for next session:** if the Step Connector is consumed as a library component in the case-study working file, those instances may need reattaching after the variant rename.
- **Icon contrast fix (AA).** White over gold is only ~2.3:1 (fails). The warning glyph now uses a new `accent2/on-accent2` token → `ink/900` (`#181818`, ~7.8:1). The cobalt star glyph keeps white `fg/on-accent`. So "on-accent" is per-accent now: white on cobalt, ink on gold.
- **Sienna `#b8420a` kept as "accent 3"** (optional, minimal details, nothing uses it yet). New `accent3/*` tokens aliased to the `sienna/*` primitives. Figma colors page reorganized: sections now Cobalt · accent → **Gold · accent 2** → Sienna · accent 3.
- **Wired into [tokens.css](src/styles/tokens.css):** added `--accent2*` (+ `--accent2-on: var(--ink-900)`) and `--accent3*` blocks after the cobalt accent, with matching dark-mode overrides. `--accent2-on` intentionally stays `--ink-900` in dark mode too (gold badge stays light in dark, so its glyph stays dark).
- **DESIGN.md not regenerated** — its color frontmatter/prose still describes only cobalt. Regenerate with `/impeccable document` when convenient, or leave until the accents actually appear in the UI.

## What changed in this session (2026-07-01, session 15)

Ran `/impeccable document` (refresh mode) to bring [DESIGN.md](DESIGN.md) and its sidecar [.impeccable/design.json](.impeccable/design.json) up to date with what's actually shipped and tokenized; no site code changed. Also updated the impeccable skill itself, v3.5.0 → v3.9.0 (`npx impeccable skills update`).

- **Gold/sienna documented as reserved, not live.** Added Secondary (gold `#e89e15`) and Tertiary (sienna `#b8420a`) color groups to DESIGN.md, both marked token-only with a new **Reserved Accent Rule**: neither has a consumer in the shipped site (the annotation-badge component they were built for hasn't been built), so nothing should reference `--accent2`/`--accent3` yet.
- **Fixed a real inaccuracy, not just an omission.** The prior DESIGN.md's "One Blue Note Rule" claimed cobalt appears only at interaction points, which the shipped site has contradicted since session 12 (full-bleed hero panel, hero glow, contact band, footer strip are all non-interactive cobalt). Added a **Sanctioned Surfaces Rule** naming the four approved uses explicitly, so the doc now matches HANDOFF's "Decisions that must not regress" instead of silently disagreeing with it.
- **Documented two components that existed in code but not in the doc:** the Case Study Card's benefit standfirst line (serif, primary ink, deliberately not cobalt) and a new "Cobalt Band" signature component covering the ContactOutro/Footer pairing (two-tone full-bleed cobalt, shared hover-to-Cobalt-Line pattern).
- **Do's and Don'ts** gained matching entries: gold-on-white AA failure (2.3:1, use Gold-On-Ink `#181818` instead), and a guard against adding a fifth full-bleed cobalt surface without the same sign-off the original four got.
- Sidecar `.impeccable/design.json`: added `colorMeta` tonal ramps for gold/sienna, a new "Cobalt Band" component snippet, and synced `narrative` (rules/dos/donts) verbatim with the DESIGN.md prose.

## What changed in this session (2026-06-15, session 13)

Two mobile fixes Miguel spotted on his phone. Both shipped to `main` (deploy green); browser-verified at zero-inset for no regression, build clean (7 pages, 0/0/0). The dynamic-island fix was confirmed on-device (landscape, Brave).

- **Nav baseline alignment** ([Nav.astro](src/components/Nav.astro)): `.nav-inner` went `align-items: center` → `align-items: baseline`. The wordmark is `--text-lg` and the links `--text-md`; centering two sizes left their text baselines offset (the larger wordmark sat lower). Baseline alignment sits them on the same line.
- **Safe-area insets / dynamic island** ([BaseLayout.astro](src/layouts/BaseLayout.astro), [global.css](src/styles/global.css)): in landscape on Brave, container text slid under the dynamic island; Safari looked fine. Cause: no `viewport-fit=cover` on the viewport meta, so `env(safe-area-inset-*)` resolved to 0 and only Safari silently inset the layout. Fix: added `viewport-fit=cover`, and `.container` now pads with `max(var(--container-pad), env(safe-area-inset-left/right))`. Insets are 0 in portrait and on non-notched devices, so padding falls back to `--container-pad` unchanged (verified: 33.76px at 844px wide, identical to before). Side effect to know: with `viewport-fit=cover` the full-bleed bands (hero, contact, footer) now extend under the island area too, which is correct since they're meant to be edge-to-edge color/image. `Figure.bleed` still breaks out by `--container-pad` only, so a bleed figure stays just inside the island inset in landscape (acceptable, landscape-only edge case).

## What changed in this session (2026-06-12, session 12)

A "more impactful home page" pass that started as a `/ui-ux-pro-max` exploration (three directions mocked: refined, full-cobalt poster, hybrid; Miguel picked the **hybrid**) and grew into a full home-page rework plus a case-page cleanup. Shipped across several commits, each browser-verified and `astro check` / `npm run build` clean (7 pages, 0/0/0). Headline sizing and the exit veil were tuned live with Miguel. Several changes deliberately widen where cobalt is allowed (see the note in "Decisions that must not regress"). Everything below is live on `main`.

- **Louder, more graphic hero** ([index.astro](src/pages/index.astro)): added a single `.hero-glow` element, a deeper-cobalt bloom (`--accent-press` radial via `color-mix`) anchored to the top edge (`at 80% -12%`, `opacity: 0.9`), behind the portrait and vignette (`z-index: 0`). First pass sat it in the top-right corner at 0.55 and was invisible (hidden behind the portrait, and `--accent-press` is close to the panel value); moving it to the top edge where bare cobalt shows and raising the opacity made it read as a tonal field (deep cobalt up top, brand cobalt lower). Same hue family, so it's depth, not a second color. Hero copy and structure are otherwise unchanged (the minimal-hero decision still holds: no eyebrow, no meta line, chevron only).
- **Outcome-led work cards** ([CaseStudyCard.astro](src/components/CaseStudyCard.astro)): reordered to **title → benefit → description → meta → CTA** (was meta → title → summary → CTA). The benefit is a new serif standfirst in primary ink at `--text-lg`; the description follows in `--text-md` secondary. Benefit is intentionally **not** cobalt (it is static, not interactive) so the only blue on a card stays the "Read the case study" CTA. Compact variant (the "More case studies" grid) is untouched: still meta-above-title, no benefit/description.
- **New `benefit` field** ([config.ts](src/content/config.ts), optional string) added to all three case studies, authored as the summary's first sentence. The card strips it from `summary` (`startsWith` slice) to form the description, so nothing is printed twice. The full `summary` is unchanged and still single-sources the case-page lead and SEO/OG description.
- **Cobalt contact band** ([ContactOutro.astro](src/components/ContactOutro.astro)): the shared outro is now a full-bleed `--accent` band with white text (matching the hero's white-on-accent contrast treatment, `rgba(255,255,255,0.92)` for body). Content is unchanged (Get in touch, availability line, email at title scale, LinkedIn/CV secondary); the email and secondary links went white with an `--accent-line` hover. Applies on home and every case page (about/contact do not use it).
- **Darker-cobalt footer** ([Footer.astro](src/components/Footer.astro)): the legal/copyright strip is now an `--accent-press` band with white-ish text (`rgba(255,255,255,0.78)`), replacing the paper strip with the hairline top border. Its old `margin-top: --space-24` gap was removed, so on home/case pages it sits flush under the `--accent` contact band as a two-tone cobalt foot; on about/contact (no band above) it's a self-contained end-cap below the paper content, which keeps its own bottom padding. This is a fourth sanctioned non-interactive cobalt surface.
- **Two-line headline** ([index.astro](src/pages/index.astro)): "Calm products for complex work." is forced to two lines via a responsive `<br class="hero-break">` (dropped below 480px, where it wraps naturally). Font ceiling is `clamp(44px, 5.3vw, 72px)` and the text column went 560 → 600px. The 5.3vw rate (not steeper) is deliberate: it holds 72px down to ~1360px then eases the title smaller through the laptop range so the second line clears the portrait, which sits closer to the text as the viewport narrows. A fixed 72px overlapped the figure by ~50px at 1200px. Pixel-verified clear (glyph edge vs. the figure's opaque pixels) 1100–1440px. The whole block is nudged down `--space-12` via `transform: translateY`.
- **Hero scroll exit veil** ([index.astro](src/pages/index.astro)): a `.hero-veil` curtain (gradient transparent → translucent `--accent-press` at 70% via `color-mix` → solid deep navy `#080e20`, the vignette's navy; opacity ramps across the stops so the mid band stays readable and only the bottom edge fully covers) parked one panel height below the hero (`top: 100%`), so it's invisible at rest, without JS, and under reduced motion. The existing rAF scroll handler raises it via `--veil-shift` at `VEIL_RATE = 0.8` of scrollY (capped at 1.25× panel height); added to the panel's own scroll travel it climbs at ~1.8× and washes the portrait in cobalt-to-navy as the hero exits. Sits above the portrait but below the text (`z-index: 3`), so the headline stays legible. Rate was tuned with Miguel live: tried 1.0 and 0.9, both read too fast; landed on 0.8.
- **Removed the case-page skim layer** ([CaseStudyLayout.astro](src/layouts/CaseStudyLayout.astro), [[slug].astro](src/pages/work/[slug].astro)): the "On this page" anchor row (added session 11) is gone, Miguel found it unnecessary for these short case studies. Dropped the `.case-toc` markup and styles, the `tocEntries`/`headings` prop, and the `headings` pass from `[slug].astro`. Kept `scroll-margin-top` on prose h2s (still useful for any deep-link anchor). Do not re-add the TOC.
- Parked idea saved to memory (`project_featured_case_idea`): a larger "featured" case row, revisit at 4+ case studies. Miguel declined it now as over-emphasizing one of three.

## What changed in this session (2026-06-11, session 11)

Installed the **impeccable** design skill (`npx impeccable skills install` → `.claude/skills/impeccable/`, plus a `.github/` copy) and ran its `init` flow. No site code changed.

- **PRODUCT.md** (new, project root): strategic design context. Register: brand. Captures audience, purpose (incl. Porto remote/hybrid constraint), personality, anti-references, five design principles, accessibility commitments. Miguel's note: Linear/Vercel are a calibration for restraint, not a look to copy; "tech-minimal mimicry" is now a named anti-reference.
- **DESIGN.md** (new, project root): visual system spec in the Stitch DESIGN.md format, generated from `tokens.css` and the shipped components. North Star: "One Blue Note". Accent named "Working Cobalt". Descriptive only: `src/styles/tokens.css` remains the canonical token source.
- **`.impeccable/design.json`**: sidecar with shadow/motion/breakpoint tokens and rendered component snippets for impeccable's live panel.
- **`.impeccable/live/config.json`**: live mode preconfigured (inject into BaseLayout.astro before `</body>`; no CSP in the project).
- **CLAUDE.md**: added a "Design context" section pointing at PRODUCT.md and DESIGN.md.
- Note: future impeccable commands (`/impeccable critique <page>`, `audit`, `polish`, ...) read PRODUCT.md and DESIGN.md first. The skill's scripts were blocked by the permission classifier this session; the init flow was executed manually from the skill's reference docs.

Later in the session: ran `/impeccable critique` (site-wide, scored 34/40, snapshot in `.impeccable/critique/`), and Miguel approved fixing everything it raised. Changes shipped:

- **Custom 404** ([src/pages/404.astro](src/pages/404.astro)): wordmark voice, links to Work and Contact. Built `404.html` confirmed in dist; excluded from the sitemap. Matters for the domain switch (old `/mj-portfolio/...` URLs will 404 on the new domain).
- **Shared contact outro** ([src/components/ContactOutro.astro](src/components/ContactOutro.astro)): home and case study pages now end on the same beat; the email address is the one line at title scale (cobalt, clamps xl to 3xl). Replaced the old inline outro on the home page; case pages gained it after "More case studies".
- **Case study skim layer**: `[slug].astro` passes `headings` from `entry.render()` into CaseStudyLayout, which renders a quiet "On this page" anchor row (h2s only) under the header meta. Prose h2s carry `scroll-margin-top: var(--space-24)` to clear the sticky nav (verified: anchor lands at 96px, nav is 81px).
- **Section h2 parity**: home "Selected work" / outro / "More case studies" headings dropped their `--text-xl` overrides and now sit at the default `--text-2xl` (26px), matching card titles.
- **About portrait reframed, not shrunk**: full prose-column width (720, was capped at 320) on an `--ink-900` field with `--radius-md`. The PNG is a transparent cutout; the ink field restores the original photo's dark strip so the figure sits in a composition. `widths` raised to [720, 1080, 1440].
- **Nav tap targets**: invisible `::before` hit-area expansion on `.nav-link` (44px floor met); TOC links got `padding-block: var(--space-1)`.
- **Team Files content**: removed the Product-section figure that nearly duplicated the page cover (TF-01-hero.png, import dropped; **Miguel should veto if he wants it back**, git has it). Rating copy now reads "average Atlassian Marketplace rating around 3.7 stars out of a possible 4".
- **tokens.css**: header comment em dash replaced with a colon (the site's no-em-dash rule).
- **Retina finding withdrawn**: the critique flagged possible figure softness on retina; verified the srcset serves up to 1600w for the 800px slot, the preview browser was just emulating DPR 1 selection. No change needed.

Verification: `npm run build` clean (7 pages, 0 errors / 0 warnings); browser-checked home, Team Files (anchors, TOC, outro), About, 404 at 1280 and 375; console clean.

**CV wired in** (same session, after Miguel provided the PDF): the CV lives at [public/miguel-jesus-cv.pdf](public/miguel-jesus-cv.pdf) (served at `/miguel-jesus-cv.pdf` under the base). Linked from the contact page channels list (CV row, "Open the PDF") and from the shared outro's secondary line on home and case pages. Links use the `base` helper and open in a new tab. Verified: HEAD request returns 200 `application/pdf`; build clean. **When the CV changes, replace the file in `public/` and keep the same filename** so shared links keep working; the Dropbox source was `2026-01 Portfolio MJ + AI/CV Miguel Jesus - Senior Product Designer.pdf`.

**Still open from the critique**: hero headline swap (Miguel to drive, pre-dates the critique).

## What changed in session 10 (2026-06-10)

Maintenance pass from a second "what would you have done differently" review. No visual or copy changes.

- **Staging noindex** ([BaseLayout.astro](src/layouts/BaseLayout.astro)). GitHub redirects the github.io host to the custom domain at switch time but keeps the path, so any indexed `/mj-portfolio/work/...` URL would 404 on `migueljss.com`. All pages now carry `noindex` while `site` is a github.io host; nothing to undo at switch time.
- **Brief status banners.** Both briefs in `docs/` now open with a note that the shipped design system (handoff bundle + tokens.css) supersedes their visual sections. They had drifted badly (old `#F0F0F0` background, Aeonik/Inter type, HeroGradient, card blue hover wash) and CLAUDE.md tells every cold session to read them as authority.
- **HANDOFF.md restructured** (this file). Sessions 1 to 8 compacted into a history section; durable review-driven decisions moved to "Decisions that must not regress." Fixed two stale claims: two sections both titled "this session," and fonts still described as variable `.ttf` after the session 8 woff2 conversion.
- **gitignore**: now ignores all of `.claude/` (was only `settings.local.json`) and `.obsidian/` (Miguel opens the repo as an Obsidian vault; its workspace state was sitting untracked).
- **Shared base helper** ([src/lib/paths.ts](src/lib/paths.ts)). The `BASE_URL` normalization was copy-pasted in four files (BaseLayout, Nav, index, CaseStudyLayout); now a single import, and one place to simplify when the base path goes away.
- **Slug passed as a prop.** [src/pages/work/[slug].astro](src/pages/work/[slug].astro) passes `entry.slug` into CaseStudyLayout for the "More case studies" exclusion; the layout no longer reverse-engineers the slug from the pathname with a base-path regex.
- **Card image `sizes`** ([CaseStudyCard.astro](src/components/CaseStudyCard.astro)): added `(min-width: 1040px) 456px`. The card media column never exceeds 456px inside the 1040 border-box container (minus padding and gap), so wide and retina screens stop requesting oversized sources.
- **@font-face cleanup** ([tokens.css](src/styles/tokens.css)): each face listed the same woff2 URL twice (`woff2-variations` plus `woff2`); now a single `format("woff2")`.

**Left alone on purpose**: the dark-theme token block in tokens.css stays as testing scaffolding (unreachable without `data-theme="dark"`).

**Verification**: `npm run build` clean (6 pages, 0 errors / 0 warnings). Built HTML checked: `noindex` present on all six pages, new `sizes` attribute rendered, and the team-files page's "More" section links only to the other two studies.

## What changed in session 9 (2026-06-10)

Subtle motion across the site. Miguel asked for ideas, picked the "starter set," and confirmed the brief's blanket motion ban should be relaxed. The policy lives in [docs/portfolio-brief-claude-design.md](docs/portfolio-brief-claude-design.md) ("Motion" section), with pointers in the code brief and CLAUDE.md: transform/opacity only, under ~400ms or scroll-driven, text never animates, everything respects `prefers-reduced-motion` and works without JS.

**Hero parallax** ([index.astro](src/pages/index.astro))
- `.hero-portrait` lags the scroll at 12% (capped at 48px) via a `--parallax-y` custom property fed by a rAF-throttled scroll handler. Text stays static. Uses the individual `translate` CSS property.
- A one-time scale "settle" on load shipped alongside it but Miguel rejected it on review (too theatrical); removed same session.

**Scroll reveals** ([global.css](src/styles/global.css), [BaseLayout.astro](src/layouts/BaseLayout.astro), [index.astro](src/pages/index.astro), [CaseStudyLayout.astro](src/layouts/CaseStudyLayout.astro))
- Generic `[data-reveal]` mechanism on the home card list and the "More case studies" grid, revealed once by an IntersectionObserver.
- Tuned per Miguel's review: deliberately faint. Opacity starts at 0.75 (never alpha 0; Miguel raised it from 0.6 after seeing it live), travel is 8px (`--space-2`), 450ms ease-out, no stagger, observer fires at threshold 0 so the ease finishes before the card is far into view. First version (alpha 0, 12px, 60ms stagger, threshold 0.1) read as chunky.
- The pre-reveal state is double-gated: `html.js` (set by an inline script in BaseLayout head, so no-JS users always see content) and `prefers-reduced-motion: no-preference` (reduced-motion users never get dimmed content either).
- New token: `--duration-reveal` (450ms).

**Micro-interactions** ([CaseStudyCard.astro](src/components/CaseStudyCard.astro), [Nav.astro](src/components/Nav.astro))
- Card hover lift: the cover frame rises 2px alongside the existing shadow deepen, and the image scales to 1.01 inside it. Media only, card text never moves. Reduced-motion resets both.
- Nav underline ease-in: the hover underline rises in from 3px below with a fade over `--duration-fast` (Miguel preferred bottom-up over the left-to-right grow shipped first). The `border-bottom` became a `::after` pseudo-element (same 2px, same position); active state is unchanged visually (full accent underline), hover is the muted grey one.

**Zoom dialog scale** ([BaseLayout.astro](src/layouts/BaseLayout.astro))
- The existing fade (via `@starting-style` + `allow-discrete`) now pairs with `scale` 0.97 → 1 on open and back down on close. Same durations as the fade (400ms open, 200ms close); the existing reduced-motion override covers it.

**Verification**: build clean; DOM checks for parallax cap, reveal settle states, and dialog open/close path; hero screenshot confirmed no visual regression at rest.

## Decisions that must not regress

Review-driven calls from past sessions. Future sessions should not "fix" these back.

- **No hero entrance animations.** A load-time settle was tried in session 9 and rejected as too theatrical.
- **Reveals stay faint**: opacity from 0.75 (never alpha 0), 8px travel, no stagger, observer threshold 0.
- **Hero content is deliberately minimal**: no "Portfolio · 2026" eyebrow, no Porto/availability/email meta line (both removed on purpose; do not restore). Scroll affordance is the left-aligned chevron only.
- **Cobalt now has four sanctioned non-interactive uses** (session 12, Miguel-approved, widening the old "links/focus/current only, never decorative" rule): the full-bleed hero panel (pre-existing), the `.hero-glow` tonal bloom, the full-bleed `--accent` contact band, and the `--accent-press` footer strip. All stay within the cobalt hue family (`--accent` / `--accent-press`); the rule still holds everywhere else, and per-card the only blue is the CTA. Do not "restore" calm by stripping the glow, the band, or the cobalt footer.
- **Work-card order is title → benefit → description → meta → CTA** with the benefit a serif standfirst in primary ink (not cobalt). The compact "More case studies" variant intentionally keeps the old meta-above-title layout.
- **Hero portrait has no width cap** (capping shrank the figure; Miguel rejected shrinking). The right anchor freezes at 1440 and centers beyond it. The mobile framing shift is a fixed-pixel `right: -220px` because the image width is panel-height-driven, so a percentage would vary the framing across phone widths.
- **Accent is `#155fe8`**, darkened in session 5 from the v2 delta's `#1a6bff`, which failed WCAG AA at 4.31:1 on the canvas.
- **`--fg-muted` (#8d8d8d) is decorative-only.** Text that needs to be readable uses `--fg-tertiary` or darker (session 5 contrast pass).
- **On `.container` sections, use `padding-block`, never the `padding` shorthand.** The shorthand zeroes the container's safe-zone `padding-inline`. This bug shipped twice (about/contact fixed in session 3, "More case studies" in session 8).
- **Team Files reach figure is "over 9,000 companies"** everywhere it appears (standardized in session 7).
- **Geist italic faces are intentionally absent**: nothing uses italic sans or mono; browsers synthesize if ever needed.
- **No em dashes anywhere** (design strings, docs, alt text, error messages). Use a period, colon, parentheses, or rewrite.

## Session history (condensed)

Per-session detail beyond this lives in the git log; commit messages carry the same narrative.

- **Session 8 (2026-06-10)**: corrections pass from the first "what would you have done differently" review. Default OG image generated ([scripts/build-og-image.mjs](scripts/build-og-image.mjs); it had 404ed since session 1). Fonts converted to woff2 (~1MB → ~270KB, [scripts/convert-fonts.mjs](scripts/convert-fonts.mjs)). Dead code deleted (HeroGradient, old square portrait, tokens compat aliases; `--container-pad` promoted to a real token). Type scale moved from px to rem. CLAUDE.md corrected to match reality. "More case studies" container padding fixed.
- **Session 7 (2026-06-09)**: nav polish (snug tracking on links; muted grey hover underline after trying pill, accent, and heavier greys) and a copy refresh (hero blurb, Team Files and Food Save summaries, about bio). Confirmed the `summary` frontmatter single-sources three surfaces: homepage card, case page hero blurb, and meta/og description.
- **Session 6 (2026-06-09)**: case study content refresh from updated source docs in `docs/Case Studies/`. All three rewritten: Team Files gained the TOPDOX origin story, NN/g heuristic review, "Beyond the product" section; MyFoodways gained the three-screen onboarding structure and the "Accessibility inside a fixed brand" white-on-yellow story, with the period corrected to March 2018 to December 2020; Food Save gained the Waste Tracker "Part of a pair" section and an honest discontinued-with-the-program reflection. Content only.
- **Session 5 (2026-05-30)**: hero polish (mobile portrait anchored right; desktop portrait lifted above the vignette), `apple-touch-icon` + favicon refresh ([scripts/build-app-icon.mjs](scripts/build-app-icon.mjs)), WCAG AA contrast pass (accent and `--ink-400` darkened; text uses of `--fg-muted` moved to `--fg-tertiary`), responsive hero LCP preload via a named head slot. Lighthouse mobile reached 100/100/100/100 on the live site.
- **Session 4 (2026-05-29)**: hero portrait rework. New wide transparent cutout (`miguel-portrait-color-wide.png`, figure offset right), layered full-bleed composition: portrait sized by panel height, navy radial vignette for text legibility, bottom hairline, text column capped at 560, frozen 1440 right anchor. Prose list markers moved from `::marker` to positioned `::before`.
- **Session 3 (2026-05-29)**: v3 polish from a structured critique. Page container 1200 → 1040, prose 640 → 720, case-study spine unified on one left edge, about header rebuilt as a single 720 column with inline portrait, `padding-block` fix on `.about`/`.contact`, hero vignette softened at desktop, contact page expanded with response-time and open-to rows.
- **Session 2 (2026-05-28)**: Claude Design v2 delta applied. Cobalt accent, neutralised paper scale (`#fbfaf6` canvas), full-bleed cobalt hero with the color portrait cutout (after fixing text overlap and crop issues with the b&w original), en-dash list bullets.
- **Session 1 (2026-05-28)**: full design system implementation. Paper/ink/accent tokens, self-hosted Aleo + Geist + Geist Mono, all components and pages restyled (wordmark nav, borderless cards, case-study header block, zoom dialog token cleanup).

## What's live

- **Stack**: Astro 5 + MDX + sitemap, TypeScript strict, plain CSS with design system tokens, self-hosted Aleo + Geist + Geist Mono (variable woff2 in `src/assets/fonts/`)
- **Routes**: `/`, `/about`, `/contact`, `/work/team-files`, `/work/myfoodways`, `/work/food-save`
- **Design system**: Claude Design handoff v1 + v2 delta both applied. Paper/ink/single-accent palette (accent `#155fe8` after the AA darkening). Aleo serif for prose, Geist sans for all UI/display. Tokens in [src/styles/tokens.css](src/styles/tokens.css).
- **Components**: Nav, Footer, CaseStudyCard (`compact` variant), Figure, CompareImages, Quote, Stat
- **Layouts**: BaseLayout (head, OG meta, font preloads, zoom dialog, staging noindex), CaseStudyLayout (header block + cover image + body + "More case studies")
- **Pages**: Home (full-bleed cobalt hero with color portrait cutout + card stack), About (portrait + intro, prose below), Contact (channels list)
- **Assets**: wide color portrait cutout at `src/assets/brand/miguel-portrait-color-wide.png` (Home hero), b&w landscape portrait at `src/assets/brand/miguel-portrait.png` (About), case study images under `src/assets/case-studies/`, design system bundle at `docs/design_handoff_design_system/` (gitignored staging)
- **Motion** (session 9, + hero exit veil session 12): hero portrait scroll parallax, hero scroll exit veil, faint card reveals, zoom dialog scale, card hover lift, nav underline ease-in. Policy in the design brief's Motion section.

## Open items / look at these next

### Re-verify on the live site
- **Share-sheet icon on iOS.** Verify the `apple-touch-icon` shows the MJ wordmark instead of an auto-cropped portrait. iOS caches the icon aggressively; if you still see the old one, force-quit Safari or clear site data (Settings → Apps → Safari → Advanced → Website Data).

### Fine-tuning (Miguel to drive)
- ~~Hero copy~~ — resolved session 19: swapped to the more conversational "Hi! I'm Miguel..." headline.

### Design system notes
- Geist as display/UI sans (substituting DIN Alternate from the Figma); Aleo as body serif
- No Lucide icons yet; nav and footer are text-only and work fine. v2 spec locks Lucide @ stroke 2.0 when added.
- Dark-theme tokens exist in tokens.css but are not wired to a toggle; reachable via `data-theme="dark"` for testing.

### Still to do
- **Per-case-study OG images.** The default 1200×630 shipped in session 8 ([scripts/build-og-image.mjs](scripts/build-og-image.mjs)) and is still the only one in use. All three cases now have final cover images (session 19), so nothing blocks building per-case-study versions: extend the same script and pass `ogImage` through CaseStudyLayout → BaseLayout (the prop plumbing already exists).
- **Two new case studies on hold.** `docs/Case Studies/cs-board-game-app.md` and `cs-office-editor.md` are written but not on the site. When ready, each needs cover/inline images under `src/assets/case-studies/<slug>/`, a new `.mdx` in `src/content/case-studies/`, and an `order` value in the frontmatter.
- ~~Switching to migueljss.com~~ — done this session (session 19), see the changelog entry above. Only remaining piece: enable "Enforce HTTPS" in repo Settings → Pages once the cert finishes provisioning.
- **Case study updates.** `docs/Case Studies/` is gitignored; drop updated `.docx` or images there and Claude can refold into the MDX.

## Quick reference

**Dev commands**
```
npm run dev       # http://localhost:4321/
npm run build     # astro check && astro build
npm run preview
```

**Key files**
- Tokens: [src/styles/tokens.css](src/styles/tokens.css)
- Global styles: [src/styles/global.css](src/styles/global.css)
- Typography + `mj-*` utilities: [src/styles/typography.css](src/styles/typography.css)
- Base path helper: [src/lib/paths.ts](src/lib/paths.ts)
- Design system reference: [docs/design_handoff_design_system/README.md](docs/design_handoff_design_system/README.md)
- Design system v2 delta: [docs/design_handoff_design_system_delta/README.md](docs/design_handoff_design_system_delta/README.md)
- Case study sources (gitignored): `docs/Case Studies/`

**Conventions**
- Canvas is warm off-white `#fbfaf6` (`--bg-canvas`). No pure white anywhere.
- No em dashes anywhere. Use a period, colon, parentheses, or rewrite.
- Single accent: cobalt (`--accent`, `#155fe8`). Links, focus, current state only. Never decorative.
- 8pt spacing grid. Use `--space-*` tokens, no magic numbers.
- One `h1` per page; visible focus rings; respect `prefers-reduced-motion`.
- US English, sentence case everywhere, no marketing fluff.

**Memory items (in user's Claude memory store)**
- `feedback-location-preference`: Porto, remote/hybrid only, no relocation
