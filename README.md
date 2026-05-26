# Miguel Jesus, portfolio

Personal portfolio site for Miguel Jesus, Senior Product Designer. Live at [migueljss.com](https://migueljss.com).

## Stack

- [Astro](https://astro.build) with MDX and sitemap
- TypeScript (strict)
- Plain CSS with custom-property tokens
- Self-hosted fonts via `@fontsource`
- Deployed to GitHub Pages on push to `main`

## Local development

```bash
npm install
npm run dev      # local server with hot reload
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Project structure

```
src/
  pages/
    index.astro            home
    about.astro
    contact.astro
    work/[slug].astro      dynamic case study route
  layouts/
    BaseLayout.astro
    CaseStudyLayout.astro
  components/
    Nav, Footer, CaseStudyCard, Figure,
    CompareImages, HeroGradient, Quote, Stat
  content/
    config.ts              case-studies collection schema
    case-studies/*.mdx     case study source
  styles/
    tokens.css             design tokens (color, type, spacing)
    global.css             resets, base, focus, motion
    typography.css         type scale, headings, body
public/
  CNAME                    custom domain
  favicon.svg
  robots.txt
.github/workflows/
  deploy.yml               GitHub Pages deploy
```

## Content

Case studies live as MDX in `src/content/case-studies/`. Each entry has a frontmatter schema defined in `src/content/config.ts`:

- `title`, `slug`, `summary`
- `role`, `period`, `client`, `domain`
- `cover` (optional image)
- `order` (controls home page sequence)
- `draft` (boolean, default false)

Components available inside MDX: `Figure`, `CompareImages`, `Quote`, `Stat`.

To add a new case study: create `src/content/case-studies/<slug>.mdx` with the required frontmatter, set `order`, and it will appear on the home page.

## Design tokens

All visual decisions live in `src/styles/tokens.css` as CSS custom properties. Change a token once and it propagates everywhere.

Key tokens:

- `--bg`: off-white `#f0f0f0`
- `--text`: near-black `#0e0e10`
- `--blue-deep`: navy `#0a1530` (hero gradient start)
- `--blue-bright`: cobalt `#2a7cff` (hero gradient end, links)
- `--blue-hover`: card hover wash

Fonts: Space Grotesk for display, Inter for body, system mono for technical asides. Licensed display fonts (Aeonik, PP Neue Machina) can swap in later by replacing the font imports in `BaseLayout.astro` and updating `--font-display`.

## Deployment

GitHub Actions builds and deploys `dist/` to GitHub Pages on every push to `main`. The custom domain is configured via `public/CNAME`. First deploy requires Pages to be enabled in the repo settings with source set to "GitHub Actions".

## Conventions

- No pure white. `--bg` is `#f0f0f0`.
- No em dashes in any prose.
- No client-side framework islands unless an interaction truly needs one.
- No inline styles or magic numbers. Use tokens.
- Visible focus rings on every interactive element.
- Respect `prefers-reduced-motion`.
