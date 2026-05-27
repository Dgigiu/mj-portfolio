# Handoff

Last updated: 2026-05-27

## Where we are

The portfolio is live at **https://dgigiu.github.io/mj-portfolio/**, deployed via GitHub Actions to GitHub Pages. Repo at **https://github.com/Dgigiu/mj-portfolio**. The custom domain `migueljss.com` is held for later — when Miguel is ready to switch, the change is: update `astro.config.mjs` (`site: 'https://migueljss.com'`, remove `base`), re-add `public/CNAME`, set the cname back on Pages via `gh api`, and add A records at the registrar.

Astro is configured with `site: 'https://dgigiu.github.io'` and `base: '/mj-portfolio'`. All internal links use a normalized `import.meta.env.BASE_URL` so paths resolve to `/mj-portfolio/...` correctly.

Build is clean (`npm run build` → 0 errors / 0 warnings).

What's live in the codebase:

- **Stack**: Astro 5 + MDX + sitemap, TypeScript strict, plain CSS with tokens, self-hosted Inter + Space Grotesk via `@fontsource`
- **Routes**: `/`, `/about`, `/contact`, `/work/team-files`, `/work/myfoodways`, `/work/food-save`
- **Case studies**: real content migrated from the source `.docx` files in `docs/Case Studies/` (now gitignored, used as staging area for updates), with optimized images under [src/assets/case-studies/](src/assets/case-studies/)
- **Content collection**: defined in [src/content/config.ts](src/content/config.ts); MDX entries live in [src/content/case-studies/](src/content/case-studies/); dynamic route at [src/pages/work/[slug].astro](src/pages/work/[slug].astro)
- **Components**: Nav, Footer, CaseStudyCard (with `compact` variant), Figure, CompareImages, HeroGradient, Quote, Stat. All in [src/components/](src/components/).
- **Layouts**: BaseLayout (head, OG meta, font preload, global scripts, zoom dialog), CaseStudyLayout (hero gradient + meta block + body + "More case studies" footer section)
- **Deploy**: GitHub Actions workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml), `public/CNAME` set to `migueljss.com`. First push to `main` will trigger Pages deploy once the remote is hooked up and Pages is enabled.

## Recent polish in the codebase

- **Nav**: sticky with on-scroll shadow + hairline border (toggled via small inline script)
- **Card hover**: whole card flips to `--blue-hover` with off-white text. Loud but accessible. See "Open items" below.
- **Bottom of case study pages**: compact "More case studies" section showing the other two entries (image-on-top vertical card, no summary/CTA)
- **Image zoom**: click any `Figure` or `CompareImages` image to open a native `<dialog>` with the optimized full-size image, dark blurred backdrop, caption underneath. ESC / click-outside / × button to close. Cursor: `zoom-in`. Subtle shadow shift on hover (no transform).
- **Zoom animation**: 400ms fade-in, 200ms fade-out. Safari close path uses a JS-driven `is-closing` class + `transitionend` because Safari skips the discrete `display`/`overlay` transition on close.
- **External links**: auto-promoted to `target="_blank"` via a script in BaseLayout (also handles MDX-generated links). Three known LinkedIn anchors also have explicit `target` + `rel` so they work without JS.
- **Email**: `miguel.jss@gmail.com` everywhere; subject prefilled with `Hello from migueljss.com` for Gmail filtering.
- **Copy tweaks**: dropped "Built with Astro" from footer; removed "I read everything and reply to most" on contact; removed "or relocation" from contact (see memory `feedback-location-preference`).

## This session (2026-05-27)

Quiet maintenance pass while waiting on the revised design system from Claude Design:

- Bumped deploy workflow actions to their Node 24 majors: `checkout@v6`, `setup-node@v6`, `upload-pages-artifact@v5`, `deploy-pages@v5`. Clears the Node 20 deprecation warning ahead of GitHub's June 2026 cutoff. Deploy succeeded and site is live.
- **About page rewritten** with Miguel's revised draft (source at [docs/about-page.md](docs/about-page.md)). New structure: lede paragraph → How I got here → How I work → Working with AI → Strategy and planning → Outside of work → Get in touch. Hero `h1` replaced with "Twenty years of designing clear experiences for complex products." Added a scoped `.lede` style in [about.astro](src/pages/about.astro) (uses `--text-lg` / `--text` / `--space-6`, all tokenized). Email + LinkedIn in the new "Get in touch" section are real anchors (mailto with prefilled subject matching contact page; LinkedIn marked `target="_blank"`). Build clean.

Still holding on the rest of the substantive work (OG images, cover review, Lighthouse, MDX content pass) until the new design system lands so we're not redoing it.

## Open items / look at these next

### High priority

- **Revised design system from Claude Design.** When it arrives, the card hover treatment is the first thing to revisit — current whole-card blue wash is accessible but Miguel said it's too loud. See memory `portfolio-card-hover-state`. Likely a softer treatment: wash only the media side, title color shift, or a different interaction altogether. Also expect to retune tokens (color, type scale, spacing) and possibly swap fonts in if licensed Aeonik / PP Neue Machina arrives.
- **Content pass on case studies.** Migrated content reads well but Miguel hasn't done a full review in MDX form. May want a copy pass on each `.mdx` once final voice/tone is locked.
- **Cover images.** Home page cards use the `*-hero-cover.png` files. Worth confirming those are the right thumbnails (vs e.g. a cleaner non-hero image).

### Lower priority / still to do

- **OG images.** [BaseLayout](src/layouts/BaseLayout.astro) references `/og/default.png` which doesn't exist. Need a default 1200×630 share image and per-case-study versions when content stabilizes.
- **Favicon.** Currently a hand-written SVG with "MJ" text. Probably fine for now, may want a more refined mark.
- **Lighthouse audit.** Brief targets 95+ on mobile. Not yet run on a real preview build — worth running once content is final and OG images are in.
- **Switching to migueljss.com later.** When ready: in `astro.config.mjs` set `site: 'https://migueljss.com'` and delete the `base` line; restore `public/CNAME` with `migueljss.com`; on GitHub set the custom domain back via `gh api -X PUT repos/Dgigiu/mj-portfolio/pages -f cname=migueljss.com`; add apex A records at the registrar (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and optional AAAA (`2606:50c0:8000::153` through `...8003::153`); after DNS resolves, tick "Enforce HTTPS" in repo Settings → Pages.
- **Updates to case studies.** [docs/Case Studies/](docs/Case%20Studies/) is gitignored and used as the working folder. Drop updated `.docx` or images there and Claude can refold into the MDX.

## Quick reference

**Dev commands**
```
npm install
npm run dev       # http://localhost:4321/
npm run build     # astro check && astro build
npm run preview
```

**Source of truth**
- Briefs: [docs/portfolio-brief-claude-code.md](docs/portfolio-brief-claude-code.md), [docs/portfolio-brief-claude-design.md](docs/portfolio-brief-claude-design.md)
- Case study sources (gitignored): `docs/Case Studies/`

**Conventions worth remembering**
- No pure white anywhere (`--bg` is `#f0f0f0`)
- No em dashes in copy
- No client-side framework islands unless an interaction needs one
- Use tokens (CSS custom properties in [src/styles/tokens.css](src/styles/tokens.css)), no magic numbers
- US English, no marketing fluff
- One `h1` per page; visible focus rings on interactive elements; respect `prefers-reduced-motion`

**Memory items (in user's Claude memory store)**
- `portfolio-card-hover-state` — current hover is a placeholder, revisit with design system
- `feedback-location-preference` — Porto, remote/hybrid only, no relocation
