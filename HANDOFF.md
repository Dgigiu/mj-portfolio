# Handoff

Last updated: 2026-05-28 (session 2)

## Where we are

The portfolio is live at **https://dgigiu.github.io/mj-portfolio/**, deployed via GitHub Actions to GitHub Pages. Repo at **https://github.com/Dgigiu/mj-portfolio**. The custom domain `migueljss.com` is held for later — instructions in "Lower priority" below.

Astro is configured with `site: 'https://dgigiu.github.io'` and `base: '/mj-portfolio'`. All internal links use a normalized `import.meta.env.BASE_URL` so paths resolve to `/mj-portfolio/...` correctly.

Build is clean (`npm run build` → 0 errors / 0 warnings).

## What's live

- **Stack**: Astro 5 + MDX + sitemap, TypeScript strict, plain CSS with design system tokens, self-hosted Aleo + Geist + Geist Mono (variable `.ttf` in `src/assets/fonts/`)
- **Routes**: `/`, `/about`, `/contact`, `/work/team-files`, `/work/myfoodways`, `/work/food-save`
- **Design system**: Claude Design handoff v1 + v2 delta both applied. Paper/ink/single-accent (`#1a6bff` cobalt) palette. Aleo serif for prose, Geist sans for all UI/display. Tokens in [src/styles/tokens.css](src/styles/tokens.css).
- **Components**: Nav, Footer, CaseStudyCard (`compact` variant), Figure, CompareImages, Quote, Stat. HeroGradient is preserved but decoupled — not used anywhere.
- **Layouts**: BaseLayout (head, OG meta, font preloads, zoom dialog), CaseStudyLayout (header block + cover image + body + "More case studies")
- **Pages**: Home (text-only hero + card stack), About (two-column portrait + intro on desktop, prose below), Contact (simple channels list)
- **Assets**: Portrait at `src/assets/brand/miguel-portrait.png`. Case study images under `src/assets/case-studies/`. Design system bundle at `docs/design_handoff_design_system/` (gitignored staging).

## What changed in this session (2026-05-28, session 2)

Applied the v2 delta bundle from Claude Design (`docs/design_handoff_design_system_delta/`).

- **Accent → cobalt `#1a6bff`** (was electric blue `#0088ff`). Full ramp re-derived for light and dark in [tokens.css](src/styles/tokens.css). `accent-hover`, `accent-press`, `accent-soft`, `accent-line` all updated.
- **Paper scale neutralised.** Less yellow, still warm. `--paper-100` (canvas) is now `#fbfaf6` (was `#fffdf7`). Other steps shifted accordingly.
- **`--ink-100`** dropped from cream `#e3e0d8` to near-neutral `#dad7d0`.
- **`theme-color` meta** in [BaseLayout.astro](src/layouts/BaseLayout.astro) updated to `#fbfaf6` to match new canvas.
- **Home hero reworked** ([src/pages/index.astro](src/pages/index.astro)). Replaced the text-only hero with a full-bleed cobalt section: portrait absolutely positioned bottom-right with `mix-blend-mode: luminosity` + `contrast(1.05)` for a duotone effect; top-left navy radial vignette for text legibility; bottom hairline; big sans headline (`clamp(48px, 7.2vw, 96px)`); Aleo subtitle; meta strip (Porto · availability · email); centered "Selected work" scroll-down link to `#work`. Mobile reduces portrait opacity and deepens vignette. Headline kept Miguel's "Calm products for complex work." line — the spec defines treatment, not copy.
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

### Fine-tuning (Miguel to drive after reviewing the live site)
- **Hero portrait reads.** The duotone luminosity blend depends on the source portrait's luminance range. If the result feels muddy, the spec's `contrast(1.05)` filter can be nudged or the portrait can be re-cropped/re-exposed in the brand asset.
- **Hero copy.** Headline kept Miguel's existing "Calm products for complex work." line. Spec showed "Hi, I'm Miguel." as placeholder. Easy to swap if Miguel prefers the more conversational opener now that the visual is more dramatic.
- **Card hover feel**: shadow lift on the image is the current treatment. May want to add a title underline or other affordance if it feels too subtle in use.
- **About portrait on mobile**: currently full-width at narrow viewports. May want a max-width constraint (e.g. 180px) or a different crop.
- **HeroGradient**: file is preserved at [src/components/HeroGradient.astro](src/components/HeroGradient.astro) — now fully unused. Safe to delete in a future cleanup.

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
