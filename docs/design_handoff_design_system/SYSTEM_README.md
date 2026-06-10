# Miguel Jesus — Design System

A small, considered design system for **Miguel Jesus's portfolio site**. The portfolio is a place to showcase product design work — primarily B2B tools and apps Miguel has shipped over the years. There is one product in scope: the portfolio site itself (a content site with case studies, an index, and a few supporting pages).

The system communicates taste through restraint. Content is the point; the design is the scaffold.

---

## Sources

- **Figma file:** `mj.fig` (mounted as a virtual FS during system creation). Single page, 17 frames covering an early hero exploration, a social-sharing thumbnail, color swatches, and type tests. Treated as design DNA, not a literal spec.
- **Brief notes:** Author-provided written direction in the project intake. Most of the principles below derive from this brief — the Figma is exploratory.

No codebase or live site to import from yet. If those arrive, prefer them over this document as the source of truth and re-run the system against them.

---

## Index

| File                      | What's in it                                                      |
|---------------------------|-------------------------------------------------------------------|
| `README.md`               | This file — fundamentals, foundations, iconography                |
| `SKILL.md`                | Skill metadata so this folder can be used as an Agent Skill       |
| `colors_and_type.css`     | All tokens (color, type, spacing, radii, motion) + utility classes|
| `assets/`                 | Portrait, hero blob SVGs, logos, any imagery                      |
| `fonts/`                  | Local font references / fallback notes                            |
| `preview/`                | Static cards that populate the Design System tab                  |
| `ui_kits/portfolio/`      | High-fidelity portfolio site UI kit — `index.html` + components   |

---

## Content Fundamentals

The voice is the same as a senior designer who's spent years writing for B2B product UI: warm but not casual, professional but not stiff. Plain, declarative sentences. Active voice. No hype.

**Tone:** measured, observant, occasionally dry. Curious about the craft. Confident about the work without bragging. Sentences end. Paragraphs are short.

**Person:** "I" for personal voice ("I worked with…", "I led…"). "You" only when speaking directly to the reader, sparingly. Avoid the royal "we" — this is one person's portfolio.

**Casing:** Sentence case for everything. Headings, nav, buttons, labels. The only exception is the small caps eyebrow / metadata labels (`.mj-label`), which are uppercase with positive tracking — and even those are used sparingly.

**Punctuation:** Em dashes are fine — used to extend a thought. Avoid ellipses unless quoting. Oxford commas. Curly quotes (`"…"`, `'`), real apostrophes, real em-dashes. No exclamation points outside of direct quotes.

**What to avoid:**

- Marketing copy filler ("Unlock the potential of…", "elevate your success") — see Figma `Frame-2` for examples of what the *real* copy should never sound like.
- Words like *innovative*, *cutting-edge*, *seamless*, *delightful*, *crafted*.
- Emoji. Not in body, not in labels, not in nav. The system has no place for them.
- Project type tags written as ALL CAPS shouty words. Use sentence-case tags with the eyebrow style instead.

**Examples** (write like this):

> *Good:* "Helped a small ops team replace four spreadsheets with one tool. The hard part was the migration."
> *Bad:* "Architected a revolutionary unified workflow solution to transform legacy data management."

> *Good:* "Three years at Linear. Most of my work touched the issue view."
> *Bad:* "Spent an incredible journey crafting delightful experiences at Linear ✨"

> *Eyebrow / label:* `CASE STUDY` · `2024` · `LINEAR`
> *Nav:* `Work`, `Writing`, `About`, `Contact` (sentence-case, single words)
> *Button:* `Read case study →`, `Get in touch`, `View on GitHub`

**Numbers:** spell out one through nine in prose; use numerals from 10+. Dates: `2024`, `Feb 2026`. Years are fine bare.

**Project metadata pattern:**

```
Linear · Issue view · 2022–2024 · Lead designer
```

Center dots (`·`) between facts; no bullets, no slashes, no pipes.

---

## Visual Foundations

### Colors

A near-neutral system. Warm off-white paper as the page surface; near-black ink for text; one intentional blue accent that does real work (links, focus, current state). The blue is carried over from the Figma's hero accent so the system stays continuous with Miguel's existing visual direction.

| Role      | Light                     | Dark                       | Use                                  |
|-----------|---------------------------|----------------------------|--------------------------------------|
| Canvas    | `#fffdf7` warm off-white  | `#0e0e0e` near-black       | Page background                      |
| Elevated  | `#fffefb`                 | `#161616`                  | Cards, popovers                      |
| Subtle    | `#faf7ef`                 | `#1c1c1c`                  | Section bands, table stripes         |
| Ink       | `#181818`                 | `#f5f3ec`                  | Primary text                         |
| Secondary | `#555555`                 | `#b8b4a8`                  | Body secondary, captions             |
| Muted     | `#8d8d8d`                 | `#8a867c`                  | Metadata, supporting                 |
| Border    | `#e6e0d0`                 | `#262522`                  | Hairlines, dividers                  |
| **Accent**| **`#0088ff`**             | **`#4fa8ff`** (lifted)     | Links, focus, current — *only*       |
| Accent soft | `#e5f2ff`               | `#11253b`                  | Selection, soft highlights           |

**Rules:**

- The blue does exactly four things: link color, focus ring, "you are here" indicator, and selection highlight. Never a decorative fill, never a brand stripe, never a gradient.
- No gradients. The Figma hero uses a black→deep-brown gradient + blue blobs; this system does *not* carry that forward as a system motif. It can live on a single hero image if Miguel wants — but it is imagery, not a system token.
- Status colors (positive / warning / critical) exist but are quiet — close to neutral. They're for messages, not for charts or visuals.
- The palette holds up in both light and dark with no redesign — same tokens, inverted neutrals, accent lifted one stop in dark to maintain contrast.

### Typography

Two families, used with intent:

- **Body — Aleo** (serif). The workhorse for prose: case study text, descriptions, anything someone is meant to read. Slab serif, designed for reading sizes, with good rhythm. Generous leading (1.7) on case-study prose.
- **Display & UI — Geist** (sans). Headings, nav, buttons, labels, all UI chrome. Restrained, modern, neutral. Replaces the Figma's DIN Alternate (see substitution note below).
- **Code — Geist Mono**.

Type scale: 12 / 13 / 14 / 16 / 17 / 19 / 22 / 26 / 32 / 40 / 52 / 64. One step at a time. **Nothing above 64px** — the brief explicitly bans oversized type used to fill space.

Leading: tight (1.1) for display; snug (1.25) for headings; relaxed (1.6) for body; prose (1.7) for case studies. Tracking is mildly negative for display, neutral for body, positive for `.mj-label` eyebrows.

### Spacing & grid

8pt grid. Tokens go `space-1` (4px) through `space-40` (160px). Common rhythm:

- Gap between body paragraphs: `space-6` (24px)
- Gap between sections inside a case study: `space-16` (64px)
- Section padding on the page: `space-24` (96px) top/bottom desktop, `space-12` (48px) mobile
- Content columns: `--content-narrow` 640px (prose), `--content-prose` 720px, `--content-wide` 960px (image), `--content-page` 1200px (page max)

Case study pages get more breathing room than the index/nav layer — taller section gaps, narrower text columns, more whitespace around imagery. The index is denser by design.

### Backgrounds & imagery

- **Pages:** flat warm off-white. No textures, no patterns, no noise. The paper itself is the texture.
- **Images:** color photography is allowed but framed deliberately. Treatment options in priority order: (1) full color, untouched; (2) B&W with cool gradient backdrop (carried over from the Figma social-thumbnail treatment — see `assets/miguel-portrait.png` for the reference); (3) duotone in ink + accent, used very rarely. Never sepia, never warm filters.
- **Hero treatment:** one optional dramatic moment on the home page — the Figma's portrait-on-blue can survive there as a single piece of imagery, not as a recurring motif.
- **No hand-drawn illustration.** No mascots. No icons that try to be cute.

### Layout & containers

- Cards are usually borderless. When a border is needed, it's a 1px hairline in `--border-subtle`, never a shadow + border combo.
- Case study cards: large image + sentence-case title + one-line description + metadata row. No gradient overlays, no fake "depth."
- Tables: hairline rules only, no zebra stripes unless density demands it. Subtle column dividers acceptable.

### Borders, radii, shadows

- **Borders:** 1px (`--rule`) is the default. 2px (`--rule-bold`) is reserved for emphasis (active tab underline, current-page indicator) — and even then, the accent does most of the heavy lifting via color.
- **Radii:** mostly 0. The system is square. Soft radii (`--radius-md` 8px) appear on photographic media (case-study covers) and on accent capsules (a tag pill). Avatars are circles. Buttons are 4px (`--radius-sm`) — subtle.
- **Shadows:** restrained, mostly absent. `--shadow-sm` is the maximum used in normal layout (popovers, hover-lifted cards). No giant drop shadows. No coloured shadows. No glow.

### Animation & interaction

- **Easing:** `cubic-bezier(0.2, 0.7, 0.2, 1)` (out) for most things; `ease-in-out` for state changes.
- **Durations:** 120ms (fast), 180ms (normal), 220ms (slow). Nothing slower in UI.
- **No bounces. No spring physics. No scroll-jacking. No parallax.** This is explicit in the brief.
- **Hover:** links shift hue (`--accent` → `--accent-hover`) and the underline thickens from `--accent-line` to `currentColor`. Cards may lift via a `--shadow-sm` swap. Buttons darken slightly.
- **Press:** primary button drops to `--accent-press`. Secondary button flips background to `--bg-subtle`. No shrink transforms.
- **Focus:** visible ring using `--shadow-focus` (3px halo in `--accent-soft`). Always visible, always 3px, always the soft accent.
- **Transitions:** apply to color, background, border, opacity, transform. Never on width/height/layout.

### Transparency & blur

Rare. Used in exactly two places:

- The optional hero portrait can sit over a soft accent gradient with a subtle blur backdrop (the Figma's treatment) — but it's one moment, not a motif.
- Modal scrims: 60% ink-900 with a 4px backdrop blur.

No frosted nav bars, no translucent cards.

---

## Iconography

The portfolio uses very few icons — by design. Most navigation is text. Icons appear only where they carry information that text would labor over: external link arrows, the GitHub mark, RSS, a chevron in a dropdown.

**Approach:**

- **Lucide** (`https://lucide.dev`) is the chosen system. Stroke icons, 1.5px stroke, square caps, `24×24` viewBox. Loaded from CDN — see `ui_kits/portfolio/index.html` for the import. Sizes used: 16px (inline with text), 20px (button-embedded), 24px (standalone).
- **Brand marks** (GitHub, Read.cv, LinkedIn, Mastodon, Twitter/X) live in `assets/brand-icons/` as flat SVG. They keep their canonical glyph; do not restyle them.
- **No icon font.** No emoji as icons. No unicode arrows in nav.
- **Color:** icons inherit `currentColor`. The accent blue is used only when the icon represents an active or interactive state.

Inline arrows on links (e.g. `Read case study →`) use the actual `→` character (U+2192) for typographic consistency with the body serif. This is the *only* unicode-as-icon usage allowed.

This is a substitution. The Figma defines no icon set. Lucide was chosen because its stroke weight and restraint match the rest of the system. If Miguel prefers a different set (Phosphor regular, Tabler, custom), swap by editing `ui_kits/portfolio/components/Icon.jsx`.

---

## Fonts

The Figma uses three fonts. The system rationalises down to two:

| Figma usage                 | This system            | Notes                                              |
|-----------------------------|------------------------|----------------------------------------------------|
| **DIN Alternate** (display) | **Geist** (self-hosted) | User-supplied brand font, loaded from `fonts/`.   |
| **Aleo** (body, used once)  | **Aleo** (self-hosted) | Preserved. User-supplied .ttf.                    |
| **Inter** (logo, used once) | _dropped_              | Wordmark unified with Geist.                       |

All three families are bundled as variable `.ttf` files in `fonts/`. The site is fully offline-capable.

---

## Open questions for Miguel

1. Confirm Geist is acceptable as the display/UI sans (substituting DIN Alternate). If not, name a preferred face.
2. Confirm Aleo as the body serif. The alternative is a more classical text serif like Source Serif 4 or Newsreader — both would also work, but I'd rather use what's in your Figma.
3. The accent blue (`#0088ff`) is taken directly from the Figma. Confirm — or pick a different stop on the same hue (e.g. `#1a6fff` if you want it slightly less saturated).
4. Lucide for icons — yes / no / different set?
5. Hero treatment: keep the Figma's black-gradient-with-blue-blobs + B&W portrait as a one-off home page hero, or skip imagery entirely on the home page?
