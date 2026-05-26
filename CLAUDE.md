# Project instructions

This is Miguel Jesus's personal portfolio site (`migueljss.com`). It's a small Astro site whose purpose is showcasing product case studies for a senior in-house design job search.

## Start every session by reading

1. **[HANDOFF.md](HANDOFF.md)** — what landed in the last session and what's open. Always read first.
2. **[docs/portfolio-brief-claude-code.md](docs/portfolio-brief-claude-code.md)** — implementation brief (stack, structure, deploy)
3. **[docs/portfolio-brief-claude-design.md](docs/portfolio-brief-claude-design.md)** — visual direction brief

When the work in the current session changes the state of the project meaningfully, update `HANDOFF.md` before wrapping. The next session will land cold and rely on it.

## Stack at a glance

- Astro 5 + MDX + sitemap, TypeScript strict
- Plain CSS with custom-property tokens — no Tailwind, no CSS-in-JS
- Self-hosted fonts via `@fontsource`
- GitHub Pages on push to `main`, custom domain via `public/CNAME`

## Where things live

```
src/
  pages/                    routes (index, about, contact, work/[slug])
  layouts/                  BaseLayout, CaseStudyLayout
  components/               Nav, Footer, CaseStudyCard, Figure, etc.
  content/
    config.ts               case-studies schema
    case-studies/*.mdx      case study source
  assets/case-studies/      images consumed by astro:assets
  styles/                   tokens.css, global.css, typography.css
public/                     CNAME, favicon, robots, OG images
docs/                       briefs; Case Studies/ folder is a gitignored
                            staging area for content updates
```

## Conventions

- **No pure white.** `--bg` is `#f0f0f0`. Don't introduce `#fff` fallbacks.
- **No em dashes** in any prose.
- **No client-side framework islands** unless an interaction genuinely needs one.
- **Use tokens** in [src/styles/tokens.css](src/styles/tokens.css) — no magic numbers, no duplicated literal values.
- **One `h1` per page**, semantic landmarks, visible focus rings, respect `prefers-reduced-motion`.
- **Voice**: clear, grounded, US English, no marketing fluff, no superlatives.

## Working with case study content

Case study source `.docx` files live in `docs/Case Studies/` (gitignored). When Miguel updates them, refold the changes into the corresponding `src/content/case-studies/<slug>.mdx`. Images go into `src/assets/case-studies/<slug>/` so `astro:assets` can optimize them.

## Common commands

```
npm install
npm run dev       # http://localhost:4321/
npm run build     # astro check && astro build
npm run preview
```
