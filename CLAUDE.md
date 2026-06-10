# Project instructions

This is Miguel Jesus's personal portfolio site. It's a small Astro site whose purpose is showcasing product case studies for a senior in-house design job search. It currently deploys to `https://dgigiu.github.io/mj-portfolio/`; the move to the final domain (`migueljss.com`) happens once content settles (steps in HANDOFF.md).

## Start every session by reading

1. **[HANDOFF.md](HANDOFF.md)** — what landed in the last session and what's open. Always read first.
2. **[docs/portfolio-brief-claude-code.md](docs/portfolio-brief-claude-code.md)** — implementation brief (stack, structure, deploy)
3. **[docs/portfolio-brief-claude-design.md](docs/portfolio-brief-claude-design.md)** — visual direction brief

When the work in the current session changes the state of the project meaningfully, update `HANDOFF.md` before wrapping. The next session will land cold and rely on it.

## Stack at a glance

- Astro 5 + MDX + sitemap, TypeScript strict
- Plain CSS with custom-property tokens: no Tailwind, no CSS-in-JS
- Self-hosted variable fonts (Aleo, Geist, Geist Mono) as woff2 in `src/assets/fonts/`, declared in `tokens.css`
- GitHub Pages on push to `main`, currently under the `/mj-portfolio` base path (no CNAME yet; final domain pending)

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
public/                     favicon, app icons, robots, OG images
scripts/                    one-shot generators (app icon, OG image, font conversion)
docs/                       briefs; Case Studies/ folder is a gitignored
                            staging area for content updates
```

## Conventions

- **No pure white backgrounds.** The canvas is warm off-white `#fbfaf6` (`--bg-canvas`). Don't introduce `#fff` background fallbacks.
- **No em dashes** in any prose.
- **No client-side framework islands** unless an interaction genuinely needs one.
- **Use tokens** in [src/styles/tokens.css](src/styles/tokens.css) — no magic numbers, no duplicated literal values.
- **One `h1` per page**, semantic landmarks, visible focus rings, respect `prefers-reduced-motion`.
- **Motion is allowed but quiet** (policy in the design brief, updated June 2026): `transform`/`opacity` only, under ~400ms or scroll-driven, never animate text, no carousels or scroll-jacking. Current set: hero parallax, faint card reveals (never from alpha 0), zoom dialog scale, card hover lift, nav underline ease-in. No entrance animations on the hero.
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
