# Handoff: Miguel Jesus Design System

## Overview

This bundle contains the complete **Miguel Jesus Design System** — a small, considered, typography-driven system for Miguel Jesus's portfolio site. It is restrained by design: warm off-white paper as the canvas, near-black ink for text, and **one** intentional blue accent (`#0088ff`) that does real work (links, focus, current state) and nothing else.

The system was authored as design DNA (Figma + brief notes) and rationalised down to a single CSS token file, two type families, and a high-fidelity React UI kit demonstrating the system in use as a portfolio site.

Your job: bring this system into a real codebase as the foundation Miguel's portfolio (and any future surfaces) will be built on.

---

## About the Design Files

The files in this bundle are **design references and a token contract**, not production code to copy wholesale. Specifically:

- **`colors_and_type.css`** is the source of truth for tokens. It's plain CSS custom properties — portable to any framework. Treat the variable names and values as the canonical contract; the utility classes (`.mj-*`) are reference implementations of the system, useful as a sanity check for what each token should produce visually.
- **`ui_kits/portfolio/`** is a working React prototype (JSX-in-browser via Babel) that recreates the portfolio site end-to-end (Home, Case Study, About, Nav, Footer). It is a **reference implementation** — the component composition, copy patterns, layout decisions, and interaction details are correct; the delivery mechanism (in-browser Babel, no build step, hash routing) is not what production should look like.
- **`preview/`** contains static HTML cards that document individual aspects of the system (color swatches, type specimens, spacing rulers, component states). Use them when you need to see exactly what a token or component is supposed to look like.

Recreate this in the target codebase's environment (React/Next, Vue/Nuxt, Astro, SvelteKit — whatever Miguel is building in) using its established patterns. If there is no codebase yet, **Next.js with the App Router** is the recommended starting point: it matches the static, content-first nature of the portfolio (case studies, an index, About), supports MDX for case-study prose, and self-hosts fonts trivially.

## Fidelity

**High-fidelity (hifi).** Every token has a final value. Every component in the UI kit has final colors, typography, spacing, and interaction states. Recreate pixel-perfectly using the codebase's existing libraries and patterns.

The one place fidelity is intentionally illustrative is **content**: the case studies in the UI kit (Linear, Stripe Atlas, Atlassian) are placeholder copy and placeholder imagery. Real projects, real copy, and real screenshots come from Miguel.

---

## What's in this bundle

```
design_handoff_design_system/
├── README.md                    ← this file
├── SYSTEM_README.md             ← original system fundamentals (long-form)
├── SKILL.md                     ← skill metadata (for context)
├── colors_and_type.css          ← all design tokens + utility classes
├── fonts/                       ← self-hosted variable .ttf files
│   ├── Aleo-VariableFont_wght.ttf
│   ├── Aleo-Italic-VariableFont_wght.ttf
│   ├── Geist-VariableFont_wght.ttf
│   ├── Geist-Italic-VariableFont_wght.ttf
│   ├── GeistMono-VariableFont_wght.ttf
│   ├── GeistMono-Italic-VariableFont_wght.ttf
│   └── README.md
├── assets/                      ← imagery
│   ├── miguel-portrait.png
│   ├── blur-blob-1.svg
│   ├── blur-blob-2.svg
│   └── blur-blob-3.svg
├── ui_kits/portfolio/           ← reference React implementation
│   ├── index.html
│   ├── components.jsx
│   ├── Nav.jsx
│   ├── Home.jsx
│   ├── CaseStudy.jsx
│   ├── About.jsx
│   └── README.md
└── preview/                     ← static spec cards (open in browser)
    ├── colors-*.html
    ├── type-*.html
    ├── spacing-*.html
    ├── components-*.html
    └── brand-*.html
```

To browse the reference UI kit locally, serve the bundle root with any static server and open `ui_kits/portfolio/index.html`. The kit references `colors_and_type.css` via `../../colors_and_type.css`, so paths only resolve when the whole bundle is served from a single root.

---

## Implementation plan (suggested)

1. **Stand up the app shell.** Next.js (App Router) recommended; otherwise match Miguel's stack. Tailwind is fine but not required — the system is just CSS custom properties.
2. **Import tokens.** Copy `colors_and_type.css` into the app's global stylesheet directory and import it once at the root layout. Tokens are now globally available.
3. **Self-host fonts.** Copy the `fonts/` folder into `public/fonts/` (or framework equivalent). Adjust the `@font-face` URLs in `colors_and_type.css` if the path changes. Prefer the framework's font loader if it gives better CSS-vars integration (e.g. `next/font/local`) — wire its CSS variables back to `--font-sans` / `--font-serif` / `--font-mono`.
4. **Build primitive components** from `ui_kits/portfolio/components.jsx`: `Eyebrow`, `Tag`, `Link`, `Button`, `Icon`, `Footer`. These are the system's smallest reusable parts.
5. **Build layout components**: `Nav`, `Page` (max-width container with section padding), `Prose` (case-study body wrapper).
6. **Build screens**: Home, Case Study, About — port from the JSX references.
7. **Verify against `preview/` cards** as you go. Each card is the spec for one slice of the system.

---

## Design Tokens

All tokens live in `colors_and_type.css` as CSS custom properties on `:root`. Dark variant is on `:root[data-theme="dark"]` (or class `.theme-dark`). Toggle by flipping the `data-theme` attribute on `<html>`.

### Colors — light

| Token | Hex | Role |
|---|---|---|
| `--paper-50` | `#fffefb` | Elevated surfaces |
| `--paper-100` | `#fffdf7` | Canvas (page background) |
| `--paper-200` | `#faf7ef` | Subtle band, table stripes |
| `--paper-300` | `#f1ede2` | Sunken surfaces |
| `--paper-400` | `#e6e0d0` | Borders, dividers |
| `--ink-900` | `#181818` | Primary text |
| `--ink-700` | `#333333` | Heavy body |
| `--ink-500` | `#555555` | Secondary text |
| `--ink-400` | `#747474` | Tertiary |
| `--ink-300` | `#8d8d8d` | Muted, metadata |
| `--ink-200` | `#b8b8b8` | Disabled |
| `--ink-100` | `#e3e0d8` | Very subtle on paper |
| `--accent` | `#0088ff` | **The** accent — links, focus, current |
| `--accent-hover` | `#006fd9` | Hover state |
| `--accent-press` | `#0058b0` | Pressed state |
| `--accent-soft` | `#e5f2ff` | Selection bg, soft wash |
| `--accent-line` | `#b8dcff` | Soft underlines |
| `--positive` | `#1f7a4d` | Success messaging |
| `--positive-soft` | `#e6f3eb` | |
| `--warning` | `#a86a00` | Warning messaging |
| `--warning-soft` | `#fbf0db` | |
| `--critical` | `#b3261e` | Error messaging |
| `--critical-soft` | `#fbe9e7` | |

### Colors — dark variant

| Token | Hex |
|---|---|
| `--bg-canvas` | `#0e0e0e` |
| `--bg-elevated` | `#161616` |
| `--bg-subtle` | `#1c1c1c` |
| `--bg-sunken` | `#0a0a0a` |
| `--fg-primary` | `#f5f3ec` (warm off-white) |
| `--fg-secondary` | `#b8b4a8` |
| `--fg-tertiary` | `#8a867c` |
| `--fg-muted` | `#66635b` |
| `--fg-disabled` | `#3a3833` |
| `--border-subtle` | `#262522` |
| `--border-strong` | `#3a3833` |
| `--accent` | `#4fa8ff` (lifted one stop) |
| `--accent-hover` | `#74beff` |
| `--accent-press` | `#a4d5ff` |
| `--accent-soft` | `#11253b` |
| `--accent-line` | `#1f3f63` |

### Accent — rules of use

The blue does exactly four things:

1. Link color
2. Focus ring (`--shadow-focus` = `0 0 0 3px var(--accent-soft)`)
3. "You are here" indicator (current nav, active tab)
4. Selection highlight

**Never** as a decorative fill, brand stripe, gradient, button background for non-primary actions, icon tint outside of active states, or chart color.

### Typography — families

| Variable | Stack |
|---|---|
| `--font-serif` | `"Aleo", "Source Serif 4", Georgia, "Times New Roman", serif` |
| `--font-sans` | `"Geist", "Inter", system-ui, -apple-system, "Segoe UI", sans-serif` |
| `--font-mono` | `"Geist Mono", "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace` |

Aleo and Geist (+ Geist Mono) are bundled in `fonts/` as variable `.ttf` files, weights 100–900, with italic variants. The site is fully offline-capable.

### Typography — scale

12 / 13 / 14 / 16 / 17 / 19 / 22 / 26 / 32 / 40 / 52 / 64 px. **Hard ceiling at 64px** — no oversized hero type.

| Token | Size |
|---|---|
| `--text-2xs` | 12px |
| `--text-xs` | 13px |
| `--text-sm` | 14px |
| `--text-base` | 16px |
| `--text-md` | 17px (prose default) |
| `--text-lg` | 19px |
| `--text-xl` | 22px |
| `--text-2xl` | 26px |
| `--text-3xl` | 32px |
| `--text-4xl` | 40px |
| `--text-5xl` | 52px |
| `--text-6xl` | 64px |

Leading: `--leading-tight` 1.1 (display) · `--leading-snug` 1.25 (headings) · `--leading-normal` 1.45 · `--leading-relaxed` 1.6 (body) · `--leading-prose` 1.7 (case studies) · `--leading-loose` 1.85.

Tracking: `--tracking-tight` -0.02em · `--tracking-snug` -0.01em · `--tracking-normal` 0 · `--tracking-wide` 0.02em · `--tracking-label` 0.08em (caps labels).

Weight: `--weight-regular` 400 · `--weight-medium` 500 · `--weight-semi` 600 · `--weight-bold` 700.

### Typography — utility classes

Use these to verify your component implementations match the system. Reproduce the same combinations in your component library (Tailwind utilities, CSS modules, styled-components — whatever the codebase uses).

| Class | Family | Size | Weight | Leading | Tracking | Use |
|---|---|---|---|---|---|---|
| `.mj-display-xl` | sans | 64 | 700 | 1.1 | -0.02em | Massive display (rare) |
| `.mj-display-lg` | sans | 52 | 700 | 1.1 | -0.02em | Hero |
| `.mj-display-md` | sans | 40 | 600 | 1.1 | -0.01em | Page H1 |
| `.mj-h1` | sans | 32 | 600 | 1.25 | -0.01em | Section H1 |
| `.mj-h2` | sans | 26 | 600 | 1.25 | -0.01em | H2 |
| `.mj-h3` | sans | 22 | 500 | 1.45 | 0 | H3 |
| `.mj-h4` | sans | 19 | 500 | 1.45 | 0 | H4 |
| `.mj-prose` | serif | 17 | 400 | 1.7 | 0 | Case study body |
| `.mj-body` | serif | 16 | 400 | 1.6 | 0 | Default body |
| `.mj-body-sm` | serif | 14 | 400 | 1.6 | 0 | Secondary body |
| `.mj-ui` | sans | 14 | 400 | 1.45 | 0 | UI chrome |
| `.mj-caption` | sans | 13 | 400 | 1.45 | 0 | Captions |
| `.mj-label` | sans | 12 | 500 | 1.1 | 0.08em | UPPERCASE labels |
| `.mj-eyebrow` | sans | 13 | 500 | 1.1 | 0.08em | UPPERCASE eyebrow (accent) |
| `.mj-mono` | mono | 0.92em | — | — | -0.005em | Inline code |

### Spacing — 8pt grid

`--space-0` 0 · `--space-1` 4 · `--space-2` 8 · `--space-3` 12 · `--space-4` 16 · `--space-5` 20 · `--space-6` 24 · `--space-8` 32 · `--space-10` 40 · `--space-12` 48 · `--space-16` 64 · `--space-20` 80 · `--space-24` 96 · `--space-32` 128 · `--space-40` 160.

Common rhythm:

- Body paragraph gap: `--space-6` (24px)
- Section gap inside a case study: `--space-16` (64px)
- Page section padding: `--space-24` (96px) desktop / `--space-12` (48px) mobile
- Content widths: `--content-narrow` 640px (prose) · `--content-prose` 720px · `--content-wide` 960px (image) · `--content-page` 1200px (page max)

### Radii

`--radius-none` 0 · `--radius-xs` 2 · `--radius-sm` 4 · `--radius-md` 8 · `--radius-lg` 12 · `--radius-pill` 999.

The system is square by default. `--radius-md` only on photographic media (case-study covers). Buttons: `--radius-sm` (4px). Tags: `--radius-pill`. Avatars: full circle.

### Borders

- `--hairline` / `--rule` = 1px (default for everything)
- `--rule-bold` = 2px (reserved for active-state emphasis)
- `--border-subtle`, `--border-strong`, `--border-focus`

### Shadows

Restrained. `--shadow-sm` is the max for normal layout.

- `--shadow-xs` — barely-there lift
- `--shadow-sm` — popovers, hover lift on cards
- `--shadow-md` — overlays
- `--shadow-lg` — modals
- `--shadow-focus` — `0 0 0 3px var(--accent-soft)` — focus ring, always visible

No coloured shadows, no glow.

### Motion

- Easing: `--ease-out` = `cubic-bezier(0.2, 0.7, 0.2, 1)`; `--ease-in-out` = `cubic-bezier(0.4, 0, 0.2, 1)`
- Duration: `--duration-fast` 120ms · `--duration-normal` 180ms · `--duration-slow` 220ms
- `--transition-base` = `all var(--duration-normal) var(--ease-out)`

**No bounces. No spring physics. No scroll-jacking. No parallax.** Transitions apply to color, background, border, opacity, transform — never width/height/layout.

---

## Screens / Views

### 1. Home (`/`)

**Purpose:** Index page — wordmark, short hero statement, list of case studies.

**Layout:**
- Top nav (full-width hairline divider on bottom, sentence-case links, current-state accent)
- Hero: `--content-narrow` (640px) centred, page padding `--space-24` top
- Eyebrow + display-md heading + prose intro paragraph
- Work list: `--content-wide` (960px) centred, vertical stack of case-study rows
- Each row: large cover image (radius `--radius-md`) + title (`.mj-h2`) + one-line description (`.mj-body` secondary) + metadata row (`.mj-caption` muted, center-dot separators)
- Footer (hairline-divided)

**Components:** `Nav`, `Eyebrow`, `Tag`, `Link`, `Footer`. See `ui_kits/portfolio/Home.jsx`.

### 2. Case study (`/work/<slug>`)

**Purpose:** Long-form read view of a single project.

**Layout:**
- Nav (same)
- Header block: `--content-prose` (720px) centred — eyebrow (project type · year · client), display-md title, one-line subtitle, metadata row
- Cover image: `--content-wide` (960px), `--radius-md`
- Body prose: `--content-narrow` (640px), `.mj-prose`, paragraph gap `--space-6`, section gap `--space-16`
- Figures inline at `--content-wide` with `.mj-caption` underneath
- Prev/next nav at bottom, hairline-divided

**Components:** `Eyebrow`, `Prose` wrapper, `Figure`, prev/next nav.

### 3. About (`/about`)

**Purpose:** Short bio, portrait, contact.

**Layout:**
- Nav (same)
- Two-column on desktop, stacked on mobile: portrait (`assets/miguel-portrait.png`) left + bio prose right
- Contact links as inline-flow text with `.mj-link` styling
- Footer

**Components:** `Eyebrow`, `Prose`, `Link`, brand-icon links.

### 4. Nav (shared)

**Purpose:** Top-level nav for all pages.

**Layout:** Flex row, `--content-page` (1200px) max-width, page horizontal padding `--space-8`, vertical padding `--space-6`. Wordmark left ("Miguel Jesus" in Geist `--weight-semi`, `--text-md`). Links right: `Work`, `Writing`, `About`, `Contact`. Sentence case, single words, `.mj-ui` styling.

**Current state:** the active link gets `color: var(--accent)` and a 2px (`--rule-bold`) underline in `--accent`. Inactive links: `--fg-primary`, no underline.

**Hairline divider** along the bottom in `--border-subtle`.

### 5. Footer (shared)

Hairline top divider. Small print row in `.mj-caption`, `--fg-tertiary`. Center-dot separators. Brand-icon links on the right (GitHub, Read.cv, etc) in `currentColor`, 16px.

---

## Interactions & Behavior

### Links (`.mj-link`)
- Default: `color: var(--link)` (accent), underline in `--accent-line` 1px, offset 3px
- Hover: `color: var(--link-hover)`, underline shifts to `currentColor`
- Visited: `var(--link-visited)` (a quiet plum) — only on prose body, not on UI
- Transition: `--transition-base`

### Buttons
- Primary: bg `--accent`, fg `--fg-on-accent`, radius `--radius-sm` (4px), padding `--space-3` / `--space-5`. Hover: `--accent-hover`. Press: `--accent-press`.
- Secondary: transparent bg, 1px border `--border-strong`, fg `--fg-primary`. Hover: bg `--bg-subtle`. Press: bg `--paper-300`.
- Focus: `--shadow-focus` ring on either variant. **No shrink transforms on press.**
- Disabled: fg `--fg-disabled`, no hover.

### Cards (case-study rows)
- Default: no border, no shadow.
- Hover: optional `--shadow-sm` lift. Image scales — **no** (no transforms in idle motion). Title color stays `--fg-primary`; underline does **not** appear on hover (it's a row, not a link).
- The whole row is clickable; click handler navigates to the case study route.

### Inputs (forms — minimal in this product)
- 1px border `--border-subtle`, radius `--radius-sm`, padding `--space-3` / `--space-4`, font `--font-sans` `--text-sm`.
- Focus: border `--border-focus`, ring `--shadow-focus`.

### Navigation
- Current route gets accent color + 2px accent underline.
- Hover on non-active link: subtle color shift to `--fg-secondary`.

### Animations
- 120–220ms only. Easing `--ease-out` for transforms, `--ease-in-out` for state.
- Transition base: `all var(--duration-normal) var(--ease-out)` — apply to color, bg, border, opacity, transform only.
- Page navigation: hash routing in the reference; in production use the framework's router. No page transitions; instant nav is intentional.

### Selection
`::selection { background: var(--selection-bg); color: var(--selection-fg); }` — applied globally via the token CSS.

---

## State Management

The portfolio is a content site; state requirements are minimal.

- **Route** — handled by the framework's router (Next.js App Router, etc). Reference uses hash routing.
- **Theme** — `data-theme="dark"` on `<html>`, persisted in `localStorage`. Default to system preference via `prefers-color-scheme` on first load. No theme switcher in the current design; build the plumbing now, expose the toggle if Miguel asks for it.
- **Case study data** — load from MDX/Markdown files at build time. Each case study has: `slug`, `title`, `subtitle`, `client`, `year`, `role`, `cover`, `body`, `figures[]`, `next`, `prev`.

No client state beyond that.

---

## Content & Voice

These are non-negotiable. Match them in every string Miguel ships.

- **Tone:** measured, observant, occasionally dry. No marketing speak.
- **Person:** "I" for personal voice. "You" sparingly. Never the royal "we".
- **Casing:** Sentence case everywhere except `.mj-label` / `.mj-eyebrow` (uppercase with `--tracking-label`).
- **Punctuation:** em dashes are fine, Oxford commas, curly quotes, real apostrophes. No exclamation points outside quotes. No emoji anywhere.
- **Numbers:** one through nine spelled out in prose; 10+ as numerals.
- **Metadata pattern:** `Linear · Issue view · 2022–2024 · Lead designer` — center dots, no slashes/pipes/bullets.
- **Inline link arrows:** the actual `→` character (U+2192). The only unicode-as-icon usage allowed.

Banned words: *innovative, cutting-edge, seamless, delightful, crafted*. ALL-CAPS shouty tags.

See `SYSTEM_README.md` for full copy examples (the "Examples" block under Content Fundamentals).

---

## Iconography

- **Lucide** (https://lucide.dev) is the system. Stroke icons, 1.5px stroke, square caps, 24×24 viewBox.
- Sizes: 16px (inline with text), 20px (button-embedded), 24px (standalone).
- Color: inherits `currentColor`. Accent only on active/interactive states.
- **Brand marks** (GitHub, LinkedIn, Read.cv, Mastodon, X) are flat SVG, keep canonical glyph, do not restyle. Place in `assets/brand-icons/` in the production project.
- **No icon font, no emoji, no unicode arrows in nav.** The single exception is `→` (U+2192) in link text.

Lucide is loaded from CDN in the reference UI kit. In production, use the framework-native package (`lucide-react`, `lucide-vue-next`, etc).

---

## Assets

| File | Source | Use |
|---|---|---|
| `assets/miguel-portrait.png` | Original Figma | About page portrait |
| `assets/blur-blob-1.svg` ··· `blur-blob-3.svg` | Generated | Optional home-page hero — single moment, not a motif |
| `fonts/Aleo-*.ttf` | SIL Open Font License | Body serif |
| `fonts/Geist-*.ttf` | SIL Open Font License (Vercel) | Display + UI sans |
| `fonts/GeistMono-*.ttf` | SIL Open Font License (Vercel) | Code |

**Imagery rules:** color photography allowed but framed deliberately. Treatments in priority order: (1) full color untouched; (2) B&W with cool gradient backdrop; (3) duotone ink + accent, rare. **Never sepia, never warm filters.** No textures, no patterns, no noise on page backgrounds.

**Hero treatment:** one optional dramatic moment on the home page (the portrait-on-blue from the Figma can live there as a single image, not a recurring motif). Otherwise, skip imagery on the home page.

---

## Files for reference

| Path | Why you'd open it |
|---|---|
| `colors_and_type.css` | The token contract. Source of truth. |
| `SYSTEM_README.md` | Full system fundamentals — content voice, foundations, iconography, font substitution log. Read this once front-to-back. |
| `ui_kits/portfolio/index.html` | Reference app entry point — how pieces compose. |
| `ui_kits/portfolio/components.jsx` | Reference primitives — Eyebrow, Tag, Link, Button, Icon, Footer. Match these. |
| `ui_kits/portfolio/Home.jsx` / `Nav.jsx` / `CaseStudy.jsx` / `About.jsx` | Per-screen reference markup + composition. |
| `preview/colors-*.html` | Visual spec for every color token. |
| `preview/type-*.html` | Visual spec for every type style. |
| `preview/spacing-*.html` | 8pt grid, radii, shadow ramp. |
| `preview/components-*.html` | Button states, link states, nav, case-card, tags, inputs. |
| `preview/brand-*.html` | Wordmark, portrait treatment, iconography rules. |
| `fonts/README.md` | Font loading + substitution log. |

---

## Open questions to confirm before shipping

These were flagged by the system author and should be resolved with Miguel before going live:

1. Geist as the display/UI sans (substituting DIN Alternate from the Figma) — confirm or name a preferred face.
2. Aleo as the body serif — confirm or swap to Source Serif 4 / Newsreader.
3. Accent blue `#0088ff` — confirm or pick a different stop on the same hue (e.g. `#1a6fff` if less saturated is preferred).
4. Lucide for icons — yes / no / different set?
5. Home-page hero treatment — keep the Figma's black-gradient + blue-blobs + B&W portrait as a one-off, or skip imagery on the home page entirely?

These don't block initial implementation — pick the documented defaults and surface a switch point so Miguel can change his mind cheaply.
