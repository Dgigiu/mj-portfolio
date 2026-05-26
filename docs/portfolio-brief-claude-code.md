# Portfolio website: Claude Code implementation brief

## Project

Build a personal portfolio website for Miguel Jesus, Senior Product Designer based in Porto. The site showcases product case studies and supports a senior in-house product design job search. It needs to feel polished, fast, accessible, and easy to maintain.

The visual direction is being explored separately with Claude Design. See `portfolio-brief-claude-design.md` in this project for the design system. This brief covers the implementation: stack, structure, content model, and deployment.

## Stack

- **Framework**: Astro, latest stable
- **Content**: MDX for case studies, Markdown for simpler pages
- **Styling**: Plain CSS with custom properties for design tokens. No Tailwind, no CSS-in-JS. Keep it transparent and easy to inspect.
- **TypeScript**: Yes, for content collections and component props
- **Hosting**: GitHub Pages with custom domain (migueljss.com)
- **Deployment**: GitHub Actions on push to `main`
- **Node**: latest LTS

No React, Vue, or Svelte islands unless a specific interaction truly needs them. Default to plain HTML, CSS, and minimal vanilla JS.

## Repository structure

```
/
├── src/
│   ├── pages/
│   │   ├── index.astro            # Home
│   │   ├── about.astro            # About
│   │   ├── contact.astro          # Contact
│   │   └── work/
│   │       ├── team-files.mdx
│   │       ├── myfoodways.mdx
│   │       └── food-save.mdx
│   ├── layouts/
│   │   ├── BaseLayout.astro       # html shell, head, fonts, nav, footer
│   │   └── CaseStudyLayout.astro
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── CaseStudyCard.astro    # with blue hover wash
│   │   ├── Figure.astro           # captioned image
│   │   ├── CompareImages.astro    # side by side
│   │   └── HeroGradient.astro     # navy to cobalt
│   ├── content/
│   │   └── config.ts              # case study schema
│   ├── styles/
│   │   ├── tokens.css             # design tokens
│   │   ├── global.css
│   │   └── typography.css
│   └── assets/                    # images, optimized via astro:assets
├── public/
│   ├── CNAME                      # migueljss.com
│   ├── favicon.svg
│   └── og/                        # social share images
├── .github/
│   └── workflows/
│       └── deploy.yml
├── astro.config.mjs
├── package.json
└── README.md
```

## Pages and routes

- `/` Home with short intro and case study list
- `/work/team-files` Team Files case study (lead piece)
- `/work/myfoodways` MyFoodways case study
- `/work/food-save` Food Save case study
- `/about` More personal page covering background, approach, and AI-augmented workflow
- `/contact` Email and LinkedIn

## Content model

Define a `case-studies` content collection in `src/content/config.ts` with this schema:

- `title` (string)
- `slug` (string)
- `summary` (string, used on the home card and meta description)
- `role` (string, e.g., "Co-founder and sole designer")
- `period` (string, e.g., "2018 to 2025")
- `client` (string, e.g., "ikuTeam")
- `domain` (string, e.g., "B2B SaaS, Atlassian ecosystem")
- `cover` (image reference, used for the card and OG image)
- `order` (number, controls home page sequence)
- `draft` (boolean)

The `.mdx` body holds the case study content. Custom components available inside case studies: `Figure`, `CompareImages`, optional `Quote` and `Stat`.

Source content for the three case studies lives in this project as `.docx` files: `Team_Files.docx`, `my_Foodways_-_short.docx`, `Food_save_app.docx`. Convert to MDX preserving the existing section structure.

## Design system reference

The visual system is defined in `portfolio-brief-claude-design.md`. Implement tokens in `src/styles/tokens.css` as CSS custom properties. Starting values, subject to refinement:

- `--bg`: #F0F0F0 (off-white base)
- `--text`: near-black (around #0E0E10, not pure black)
- `--blue-deep`: deep navy, hero gradient start (around #0A1530)
- `--blue-bright`: bright cobalt, hero gradient end and links (around #2A7CFF)
- `--blue-hover`: saturated bright blue for the case study card hover wash
- Type scale, spacing scale, and radius tokens

Display type: bold wide-geometric sans (Aeonik Bold or PP Neue Machina). Body: clean humanist sans (Inter, IBM Plex Sans, or General Sans). Monospace for small captions or technical asides. Self-host fonts where licensing permits.

## Accessibility and performance

- Semantic HTML throughout (one `h1` per page, proper landmarks, alt text)
- WCAG AA contrast minimum on all text, AAA on body where feasible
- Visible focus states on every interactive element
- Respect `prefers-reduced-motion`; no autoplaying motion
- Lighthouse target: 95 or higher across the board on mobile
- Lazy-load images below the fold
- Preload primary font, `font-display: swap`
- Optimize images via Astro's built-in `astro:assets`

## Deployment

GitHub Actions workflow that:

1. Triggers on push to `main`
2. Installs deps and runs `npm run build`
3. Deploys `dist/` to GitHub Pages via `actions/deploy-pages`
4. Custom domain configured via `public/CNAME`

## Local development

- `npm install`
- `npm run dev` for local server with hot reload
- `npm run build` to build for production
- `npm run preview` to preview the build locally

Keep the README current with these commands and a brief project overview.

## What to avoid

- Pure white backgrounds anywhere
- Em dashes in any generated content
- Carousels, parallax, scroll-jacking, hero animations
- Client-side framework islands unless truly needed
- Analytics or tracking by default (add later if wanted, e.g., Plausible)
- Default Bootstrap blues or generic AI-design aesthetics
- Inline styles, magic numbers, or duplicated values; use tokens

## Suggested first steps

1. Initialize Astro with MDX, sitemap, and content collections
2. Set up `tokens.css` with placeholder values
3. Build `BaseLayout`, `Nav`, `Footer`
4. Build `CaseStudyCard` and a stub of the home page
5. Migrate Team Files content from `Team_Files.docx` into `.mdx` with appropriate component breaks for figures
6. Wire up the GitHub Pages deployment workflow
7. Iterate on visual details against the Claude Design output

## Notes on tone

Any copy generated or suggested for the site should follow the Writing Voice Profile in this project: clear, grounded, practical, no marketing fluff, no hyperbole, no em dashes, US English.
