# Handoff

Last updated: 2026-05-29 (session 3)

## Where we are

The portfolio is live at **https://dgigiu.github.io/mj-portfolio/**, deployed via GitHub Actions to GitHub Pages. Repo at **https://github.com/Dgigiu/mj-portfolio**. The custom domain `migueljss.com` is held for later — instructions in "Lower priority" below.

v3 polish pass shipped to main on 2026-05-29 (`e6e39d0` + `c770e20`). Mobile visual verification still pending — see "Open items" below.

Astro is configured with `site: 'https://dgigiu.github.io'` and `base: '/mj-portfolio'`. All internal links use a normalized `import.meta.env.BASE_URL` so paths resolve to `/mj-portfolio/...` correctly.

Build is clean (`npm run build` → 0 errors / 0 warnings).

## What's live

- **Stack**: Astro 5 + MDX + sitemap, TypeScript strict, plain CSS with design system tokens, self-hosted Aleo + Geist + Geist Mono (variable `.ttf` in `src/assets/fonts/`)
- **Routes**: `/`, `/about`, `/contact`, `/work/team-files`, `/work/myfoodways`, `/work/food-save`
- **Design system**: Claude Design handoff v1 + v2 delta both applied. Paper/ink/single-accent (`#1a6bff` cobalt) palette. Aleo serif for prose, Geist sans for all UI/display. Tokens in [src/styles/tokens.css](src/styles/tokens.css).
- **Components**: Nav, Footer, CaseStudyCard (`compact` variant), Figure, CompareImages, Quote, Stat. HeroGradient is preserved but decoupled — not used anywhere.
- **Layouts**: BaseLayout (head, OG meta, font preloads, zoom dialog), CaseStudyLayout (header block + cover image + body + "More case studies")
- **Pages**: Home (full-bleed cobalt hero with color portrait cutout + card stack), About (two-column portrait + intro on desktop, prose below), Contact (simple channels list)
- **Assets**: Color portrait cutout at `src/assets/brand/miguel-portrait-color.png` (used on Home hero — transparent bg, portrait orientation 3072×3821). B&W landscape portrait at `src/assets/brand/miguel-portrait.png` (used on About). Case study images under `src/assets/case-studies/`. Design system bundle at `docs/design_handoff_design_system/` (gitignored staging).

## What changed in this session (2026-05-29, session 3)

Full v3 polish pass driven by a structured design critique. Five phases, all landed.

**Phase 1: tighten the content spine (Option A from the plan)**

- **Page content max → 1040.** `--content-page` dropped from `1200` to `1040` in [tokens.css](src/styles/tokens.css). Every `.container` (home `.work` / `.outro`, about, case study layout) now caps at 1040 with deliberate negative space at wide viewports. Reads as an editorial spine rather than a layout that forgot to extend.
- **Prose width → 720 (from 640).** Global `.prose` in [global.css](src/styles/global.css) now uses `--content-prose` (720) instead of `--content-narrow` (640). Aligns with the design-system token name and matches the case-study header width.
- **Case-study spine unified.** Added `.case-body .prose { margin-inline: 0; }` in [CaseStudyLayout.astro](src/layouts/CaseStudyLayout.astro). Header (720), cover (944, capped by container), and prose (720) all share the same left edge. DOM-verified: all three measure `left: 488px` at a 1568 viewport.

**Phase 2: about header rebalance + portrait perf**

- **Portrait now inline above title** in a single 720 column ([about.astro](src/pages/about.astro)). Dropped the sticky 280+1fr grid. `.about-header` is `display: flex; flex-direction: column; max-width: var(--content-prose)`. Portrait wrap at `max-width: 320px`, shrinks to 240 below 720px viewports.
- **Portrait perf**: added `loading="eager"` and `fetchpriority="high"` on the `<Image>`, plus tighter `widths={[320, 640]}` to match the new display target. Should resolve the late-LCP paint flagged in the critique.
- **Fixed pre-existing padding bug**: `.about` and `.contact` used the `padding` shorthand which was clobbering `.container`'s `padding-inline`. Changed both to `padding-block` so the container's safe-zone inline padding is preserved (matters at narrow viewports).

**Phase 3: hero refinements** ([index.astro](src/pages/index.astro))

- **Vignette softened**: default cobalt-to-navy radial dropped from `rgba(8,14,32,0.88)` → `0.45` at the center, with the falloff curve adjusted to taper sooner. The heavier version still fires at `<=1100px` where the text column gets closer to the photo. Stops the upper-left from feeling like atmospheric noise.
- **Portrait crown breathing room**: `height: 100%` → `height: calc(100% - var(--space-4))` on `.hero-portrait` so Miguel's hairline doesn't kiss the top edge of the cobalt block.
- **Hero subtitle to full white**: was `rgba(255,255,255,0.92)` (~4.8:1 on cobalt — borderline AA). Now `#fff` for AA headroom.
- **Selected work scroll affordance**: padding bumped to `var(--space-3) var(--space-5)`, added a 1px `rgba(255,255,255,0.24)` border and pill radius at rest, light background tint + brighter border on hover. Now reads as an obviously-clickable pill instead of a label floating on cobalt.

**Phase 4: contact page substance** ([contact.astro](src/pages/contact.astro))

- Replaced the trailing `.note` paragraph with two more rows in the channels list:
  - `Response — Within a couple of working days.`
  - `Open to — Senior in-house product design, remote or hybrid from Porto.`
- Used `.channel-value` spans for the non-link values (paired styling with `.channels a`). Reduces the empty lower half without adding new components.

**Phase 5: verification**

- `npm run build` clean (0 errors / 0 warnings / 0 hints), 6 pages built.
- Visual verification at 1568 desktop on `/`, `/about`, `/contact`, `/work/team-files` via Astro dev server + Chrome MCP screenshots.
- DOM-measured left/width on all three case-study spine pieces and the about header + prose to confirm shared left edges.
- Mobile breakpoints inherit cleanly from the unified container. No new media queries needed beyond what was already in place. Visual mobile-width screenshot pass not done (Chrome MCP `resize_window` wouldn't shrink the viewport in this environment) — worth a quick real-device pass before declaring v3 done.

## What changed in the previous session (2026-05-28, session 2)

Applied the v2 delta bundle from Claude Design (`docs/design_handoff_design_system_delta/`).

- **Accent → cobalt `#1a6bff`** (was electric blue `#0088ff`). Full ramp re-derived for light and dark in [tokens.css](src/styles/tokens.css). `accent-hover`, `accent-press`, `accent-soft`, `accent-line` all updated.
- **Paper scale neutralised.** Less yellow, still warm. `--paper-100` (canvas) is now `#fbfaf6` (was `#fffdf7`). Other steps shifted accordingly.
- **`--ink-100`** dropped from cream `#e3e0d8` to near-neutral `#dad7d0`.
- **`theme-color` meta** in [BaseLayout.astro](src/layouts/BaseLayout.astro) updated to `#fbfaf6` to match new canvas.
- **Home hero reworked** ([src/pages/index.astro](src/pages/index.astro)). Replaced the text-only hero with a full-bleed cobalt section: portrait absolutely positioned bottom-right with `mix-blend-mode: luminosity` + `contrast(1.05)` for a duotone effect; top-left navy radial vignette for text legibility; bottom hairline; big sans headline; Aleo subtitle; meta strip (Porto · availability · email); centered "Selected work" scroll-down link to `#work`. Headline kept Miguel's "Calm products for complex work." line — the spec defines treatment, not copy.
- **Hero text overlap fix.** Initial spec used `clamp(48px, 7.2vw, 96px)` headline sized for the spec's placeholder copy "Hi, I'm Miguel." (3 words). With Miguel's longer headline, text bled past the safe cobalt zone into the photo area at laptop widths. Wrapped the eyebrow/h1/subtitle/meta in `.hero-content` with `max-width: 560px`, lowered the headline ceiling to `clamp(44px, 6vw, 80px)`, deepened the base vignette, and added a 1100 px breakpoint that widens the vignette further.
- **Hero portrait crop fix.** The original b&w source was a 3618×2184 *landscape* frame with Miguel on the right and an intentionally-empty black expanse on the left, designed so the empty-left blends into cobalt via the luminosity blend. The initial `object-fit: cover` + `object-position: center right` was cropping that black-left off and leaving a hard rectangular edge mid-frame. Dropped `object-fit` and explicit width — image now renders at its natural aspect (height-driven, `width: auto`), anchored bottom-right.
- **Hero portrait → color cutout.** Per follow-up feedback, swapped the b&w-duotone treatment for a color portrait. New source at `src/assets/brand/miguel-portrait-color.png` is a transparent cutout in portrait orientation (3072×3821, ~0.80 aspect). Dropped `mix-blend-mode: luminosity` and `filter: contrast(1.05)` from the hero portrait — color now reads naturally, cobalt shows through the transparent area around Miguel. Renders ~580 px wide at section height (narrower than the previous ~1200 px landscape), so it sits comfortably on the right with very little overlap into the text column. About page kept the original b&w portrait file, since its two-column framed layout was working as-is.
- **En-dash list bullets** ([typography.css](src/styles/typography.css)). MDX `<ul>` lists in `.prose` now use `::marker` content `"– "` in `--accent`, Geist semi-bold. Center-dot (`·`) stays as inline metadata separator. Also exposed an explicit `.bullets` class matching the spec for custom lists.
- Nav backdrop didn't need updating — it uses `var(--bg-canvas)` directly rather than an RGBA literal, so it picked up the new canvas color automatically.

Build is clean (0 errors / 0 warnings / 0 hints). Portrait optimized from 2.8 MB source to 14–71 KB across responsive widths.

## What changed in the previous session (2026-05-28, session 1)

Full design system implementation in two passes (desktop app ran Phase 1; Claude Code web ran Phases 2–4).

**Phase 1**
- `tokens.css` replaced with paper/ink/accent system. Compat aliases kept old token names alive while components were being rewritten, then stripped as each component was updated.
- Fonts swapped: Aleo (serif body) + Geist (sans UI/display) + Geist Mono. Old `@fontsource/inter` and `@fontsource/space-grotesk` removed.
- `global.css` and `typography.css` rewritten. All `mj-*` utility classes added. Focus ring is now `--shadow-focus` (3px accent-soft halo). `::selection` uses accent-soft.
- `theme-color` meta updated to `#fffdf7`.

**Phases 2–4**
- Nav: wordmark-only, always-on hairline bottom, active route = accent color + 2px underline. Frosted glass and on-scroll behavior removed.
- Footer: single `.mj-caption` meta row with LinkedIn + Email links on the right.
- CaseStudyCard: blue hover wash gone. Borderless at rest. Image gets `--shadow-md` on hover. Meta uses `·` separators. Title in Geist semi. Summary in Aleo serif secondary.
- Figure / CompareImages: focus ring → `--shadow-focus`. Captions → Geist sans `--fg-tertiary`.
- Quote: Aleo body, 2px `--accent` border-left, Geist sans uppercase attribution.
- Stat: Geist semi number, Geist sans uppercase label.
- CaseStudyLayout: new header block at 720px — eyebrow + display title + summary + metadata row. Cover image at 960px with `--radius-md`. HeroGradient removed.
- index.astro: text-only hero at 640px with eyebrow + h1 + Aleo intro. Cards stacked with `--space-16` gap.
- about.astro: two-column desktop (portrait left, intro right), single-column prose below. Portrait from design bundle optimized 2.8 MB → 330 KB by Astro.
- contact.astro: h1 + hairline-divided channels list with `.mj-label` row labels.
- BaseLayout zoom dialog: token cleanup throughout.

## Open items / look at these next

### Verify on the live site
- **Mobile pass at real device widths.** v3 was visually verified at 1568 desktop only. CSS breakpoints (hero, cards, contact, case title, about portrait) are in place and reason correctly, but a quick pass on iPhone + Android at 375–414px is the next thing to do before tagging v3 final.
- **Lighthouse mobile audit.** Brief target is 95+. Phase 2 added eager-loading + fetchpriority to the about portrait, which was a likely LCP culprit. Worth running once the mobile pass is clean.

### Fine-tuning (Miguel to drive after reviewing the live site)
- **Hero copy.** Headline still says "Calm products for complex work." Spec showed "Hi, I'm Miguel." as placeholder. Easy to swap if the more conversational opener feels right.
- **Card hover feel**: shadow lift on the image is the current treatment. May want a title underline or other affordance if it feels too subtle.
- **HeroGradient**: file is preserved at [src/components/HeroGradient.astro](src/components/HeroGradient.astro) — fully unused. Safe to delete in a future cleanup.

### Design system open questions (defaulted to spec — change cheaply if needed)
- Geist as display/UI sans (substituting DIN Alternate from the Figma)
- Aleo as body serif
- Accent `#1a6bff` cobalt (v2 delta — was electric `#0088ff`)
- No Lucide icons yet — nav and footer are text-only and work fine. v2 spec locks Lucide @ stroke 2.0 when added.

### Still to do
- **OG images.** BaseLayout references `/og/default.png` which doesn't exist. Affects social share previews only — no visual impact on the site. Need a default 1200×630 and per-case-study versions when content is settled.
- **Case study content pass.** The MDX files read well but Miguel hasn't reviewed them since initial migration. Worth a pass once the visual direction feels right.
- **Cover images.** Home page cards use the `*-hero-cover.png` files. Worth confirming those are the right thumbnails.
- **Lighthouse audit.** Brief target is 95+ mobile. Not yet run — do it once content and OG images are final.
- **Favicon.** Hand-written SVG with "MJ" text. Fine for now; may want a more refined mark later.
- **Switching to migueljss.com.** When ready: set `site: 'https://migueljss.com'` and remove `base` in `astro.config.mjs`; restore `public/CNAME` with `migueljss.com`; run `gh api -X PUT repos/Dgigiu/mj-portfolio/pages -f cname=migueljss.com`; add apex A records at the registrar (`185.199.108.153–.111.153`) and optional AAAA records; tick "Enforce HTTPS" in repo Settings → Pages.
- **Case study updates.** `docs/Case Studies/` is gitignored — drop updated `.docx` or images there and Claude can refold into the MDX.

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
- Design system reference: [docs/design_handoff_design_system/README.md](docs/design_handoff_design_system/README.md)
- Design system v2 delta: [docs/design_handoff_design_system_delta/README.md](docs/design_handoff_design_system_delta/README.md)
- Case study sources (gitignored): `docs/Case Studies/`

**Conventions**
- Canvas is warm off-white `#fbfaf6` (`--bg-canvas`). No pure white anywhere.
- No em dashes anywhere (v2 spec made this universal — design strings, marketing, docs, alt text, error messages). Use a period, colon, parentheses, or rewrite.
- Single accent: `#1a6bff` cobalt. Links, focus, current state only. Never decorative.
- 8pt spacing grid. Use `--space-*` tokens, no magic numbers.
- One `h1` per page; visible focus rings; respect `prefers-reduced-motion`.
- US English, sentence case everywhere, no marketing fluff.

**Memory items (in user's Claude memory store)**
- `feedback-location-preference` — Porto, remote/hybrid only, no relocation
