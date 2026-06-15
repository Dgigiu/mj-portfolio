# Handoff

Last updated: 2026-06-15 (session 13)

## Where we are

The portfolio is live at **https://dgigiu.github.io/mj-portfolio/**, deployed via GitHub Actions to GitHub Pages. Repo at **https://github.com/Dgigiu/mj-portfolio**. The custom domain `migueljss.com` is held until content settles (Miguel is working on case study images); switch steps in "Still to do" below.

The staging deploy emits `<meta name="robots" content="noindex">` on every page (added session 10) so the temporary `/mj-portfolio/...` URLs never get indexed; the guard keys off the github.io host in `Astro.site` and clears automatically at the domain switch.

Astro is configured with `site: 'https://dgigiu.github.io'` and `base: '/mj-portfolio'`. All internal links use the normalized base exported from [src/lib/paths.ts](src/lib/paths.ts).

Build is clean (`npm run build` → 6 pages, 0 errors / 0 warnings).

## What changed in this session (2026-06-15, session 13)

Two mobile fixes Miguel spotted on his phone. Both shipped to `main` (deploy green); browser-verified at zero-inset for no regression, build clean (7 pages, 0/0/0). The dynamic-island fix itself needs an on-device landscape confirm on Brave (the headless preview has no physical island).

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
- **Dynamic island in landscape (Brave).** Session 13 added `viewport-fit=cover` + safe-area `max()` padding to fix container text sliding under the island. The headless preview can't reproduce a physical island, so confirm on-device: a case study page (e.g. Team Files) in landscape on Brave should keep all text clear of the island. Force-refresh / clear site data if the old CSS is cached.
- **Share-sheet icon on iOS.** Verify the `apple-touch-icon` shows the MJ wordmark instead of an auto-cropped portrait. iOS caches the icon aggressively; if you still see the old one, force-quit Safari or clear site data (Settings → Apps → Safari → Advanced → Website Data).

### Fine-tuning (Miguel to drive)
- **Hero copy.** Headline still says "Calm products for complex work." Easy to swap if a more conversational opener feels right.

### Design system notes
- Geist as display/UI sans (substituting DIN Alternate from the Figma); Aleo as body serif
- No Lucide icons yet; nav and footer are text-only and work fine. v2 spec locks Lucide @ stroke 2.0 when added.
- Dark-theme tokens exist in tokens.css but are not wired to a toggle; reachable via `data-theme="dark"` for testing.

### Still to do
- **Per-case-study OG images.** The default 1200×630 shipped in session 8 ([scripts/build-og-image.mjs](scripts/build-og-image.mjs)). Per-case-study versions wait on final cover images; extend the same script and pass `ogImage` through CaseStudyLayout → BaseLayout (the prop plumbing already exists).
- **Cover images.** Home page cards use the `*-hero-cover.png` files. Worth confirming those are the right thumbnails.
- **Two new case studies on hold.** `docs/Case Studies/cs-board-game-app.md` and `cs-office-editor.md` are written but not on the site. When ready, each needs cover/inline images under `src/assets/case-studies/<slug>/`, a new `.mdx` in `src/content/case-studies/`, and an `order` value in the frontmatter.
- **Switching to migueljss.com.** When ready:
  1. Set `site: 'https://migueljss.com'` and remove `base` in `astro.config.mjs` (this also clears the staging `noindex` automatically; confirm it is gone from the built HTML).
  2. Update the sitemap URL in [public/robots.txt](public/robots.txt) (currently hardcoded to the staging domain).
  3. Restore `public/CNAME` with `migueljss.com`; run `gh api -X PUT repos/Dgigiu/mj-portfolio/pages -f cname=migueljss.com`.
  4. Add apex A records at the registrar (`185.199.108.153` to `.111.153`) and optional AAAA records; tick "Enforce HTTPS" in repo Settings → Pages.
  5. Spot-check that old `dgigiu.github.io/mj-portfolio/...` URLs redirect somewhere sensible.
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
