# Handoff Δ: Miguel Jesus Design System (round 2)

This bundle contains **only what changed** since the first Claude Code handoff (`design_handoff_design_system/`). It's not self-contained: use it on top of the previous handoff to know what to update in the codebase.

If you haven't applied the first handoff yet, use it as the base and apply these deltas on top.

---

## TL;DR

Six things shifted:

1. **Accent color** swapped from electric blue `#0088ff` to cobalt `#1a6bff`. Full ramp re-derived for both light and dark.
2. **Paper scale neutralised.** The canvas was reading too yellow. Same warm direction, much less saturation.
3. **`ink-100` neutralised** from `#e3e0d8` (cream) to `#dad7d0` (near-neutral, barely warm).
4. **Home hero reworked.** The previous restrained, typography-only hero is replaced by a full-bleed cobalt field with a duotone portrait. This is the system's one permitted dramatic moment.
5. **Iconography locked.** Lucide is the chosen set, **stroke 2.0px** (not 1.5 as previously documented). Brand marks (GitHub, LinkedIn, etc) still live separately as flat SVG.
6. **List bullet marker** changed from center-dot (`·`) to en-dash glyph (`–`, U+2013) in the accent color, Geist semi-bold (600). Center-dot is still the inline metadata separator. **The em dash (`—`, U+2014) is still banned everywhere.**

---

## 1. Color tokens

### Accent ramp (light)

| Token | Was | Now |
|---|---|---|
| `--accent` | `#0088ff` | `#1a6bff` |
| `--accent-hover` | `#006fd9` | `#0050e0` |
| `--accent-press` | `#0058b0` | `#003db8` |
| `--accent-soft` | `#e5f2ff` | `#e6edff` |
| `--accent-line` | `#b8dcff` | `#bccfff` |

### Accent ramp (dark)

| Token | Was | Now |
|---|---|---|
| `--accent` | `#4fa8ff` | `#4d82ff` |
| `--accent-hover` | `#74beff` | `#709bff` |
| `--accent-press` | `#a4d5ff` | `#99b8ff` |
| `--accent-soft` | `#11253b` | `#122a5e` |
| `--accent-line` | `#1f3f63` | `#1f3a7a` |

### Paper scale (light)

| Token | Was | Now | Notes |
|---|---|---|---|
| `--paper-50` | `#fffefb` | `#fdfcfa` | Elevated surfaces |
| `--paper-100` | `#fffdf7` | `#fbfaf6` | Canvas (page background) |
| `--paper-200` | `#faf7ef` | `#f5f3ed` | Subtle band |
| `--paper-300` | `#f1ede2` | `#ebe9e2` | Sunken |
| `--paper-400` | `#e6e0d0` | `#dcd9d0` | Borders, dividers |

Direction is the same (warm cast), saturation is dialed way down so it reads as a clean off-white rather than cream.

### Ink scale

| Token | Was | Now |
|---|---|---|
| `--ink-100` | `#e3e0d8` | `#dad7d0` |

Everything else in the ink scale is unchanged.

---

## 2. Hardcoded RGBA literals to update

Anywhere a previous build used the canvas paper as an RGBA literal (typically the sticky nav backdrop), update:

```
rgba(255, 253, 247, 0.85)  →  rgba(251, 250, 246, 0.85)
```

---

## 3. Home hero (reworked)

The Home hero was previously a centred prose block on the canvas (restrained, typography-only). It now reads as a full-bleed cobalt section with a duotone portrait. See `ui_kits/portfolio/Home.jsx` in this bundle for the reference markup.

Key details to recreate:

- **Section background:** `var(--accent)` (cobalt), full-bleed, `min-height: min(720px, 88vh)`.
- **Portrait:** anchored bottom-right, `width: min(62%, 980px)`, `mix-blend-mode: luminosity`, `filter: contrast(1.05)`. This produces a clean cobalt-duotone effect against the blue background.
- **Vignette:** radial gradient from top-left, `rgba(8,14,32,0.85)` → transparent, behind the text for legibility.
- **Headline:** `clamp(48px, 7.2vw, 96px)`, Geist 700, `line-height: 0.98`, `letter-spacing: -0.035em`, white. Copy: "Hi, I'm Miguel."
- **Subtitle:** `var(--text-lg)` Aleo, `rgba(255,255,255,0.92)`, max-width 520px.
- **Meta strip:** small Geist row (Lisbon / availability / contact email), center-dot separators, 78% white.
- **Scroll affordance:** centered bottom button, Geist 12px uppercase "SELECTED WORK" + 16px chevron-down, jumps to the work index.
- **Hairline divider** along the bottom of the section in `rgba(255,255,255,0.18)`.

The work index below is unchanged.

---

## 4. Iconography: Lucide @ 2px

- **Family:** Lucide (locked in).
- **Stroke width:** `2.0` (previously documented as 1.5).
- Apply as either `stroke-width="2"` on each rendered SVG or via `lucide.createIcons({ attrs: { 'stroke-width': 2 } })`.
- Sizes (unchanged): 16px inline · 20px in button · 24px standalone.
- Color: still `currentColor`. Accent only on active state.

**Note:** Lucide no longer ships brand icons (GitHub, etc). Brand marks (GitHub, LinkedIn, Read.cv, Mastodon, X) live in `assets/brand-icons/` as flat SVG and keep their canonical glyph.

---

## 5. List bullets (en-dash marker)

Replace any `·`-as-bullet implementations with the en-dash marker.

```html
<ul class="bullets">
  <li><span class="marker">–</span><span>Defined product vision and roadmap</span></li>
  <li><span class="marker">–</span><span>Built and maintained a design system</span></li>
</ul>
```

```css
.bullets { list-style: none; padding: 0; margin: 0; }
.bullets li {
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 6px;
  padding: 3px 0;
  font-family: var(--font-serif);
  font-size: 14px;
  line-height: 1.55;
}
.bullets .marker {
  color: var(--accent);
  font-family: var(--font-sans);
  font-weight: 600;
  line-height: 1.5;
}
```

Spec details:

- Glyph: `–` (U+2013, en dash). **Not** `—` (U+2014, em dash).
- Color: `var(--accent)`.
- Font: Geist semi-bold (600).
- Layout: 18px marker column, 6px gap to text.

Center-dot (`·`, U+00B7) is unchanged as the inline metadata separator (e.g. `Linear · Issue view · 2024`).

---

## 6. Copy rule update

The previous handoff said em dashes were fine in prose. **Reverted.** No em dashes anywhere in copy: design strings, marketing, docs, alt text, error messages, all of it. Rewrite the sentence, or use a period, a colon, or parentheses. Curly quotes (`"…"`, `'`), real apostrophes, Oxford commas. No emoji.

The only em dash exception is the typographic glyph used for the bullet marker (covered above), and even that is the en dash, not the em dash. The em dash glyph never appears.

---

## Files in this bundle

```
delta/
├── README.md                         ← this file
├── colors_and_type.css               ← updated tokens (drop-in replacement)
├── ui_kits/portfolio/                ← updated reference impl
│   ├── Home.jsx                      ← reworked bold hero
│   ├── Nav.jsx                       ← updated backdrop RGBA
│   ├── components.jsx                ← Tag accent color updated
│   ├── CaseStudy.jsx                 ← cover gradient updated
│   └── About.jsx                     ← cover gradient updated
└── preview/                          ← updated spec cards (use to verify visually)
    ├── colors-accent.html
    ├── colors-dark.html              ← now shows full cobalt ramp
    ├── colors-ink.html
    ├── colors-paper.html
    └── brand-iconography.html        ← shows the four icon-family options + new bullet pattern
```

The CSS file and JSX files are full replacements; copy them over the equivalents in your codebase (or apply equivalent changes if you've already restructured into framework-native components).

---

## What did NOT change

- Type scale, leading, tracking, weights
- Type families (Aleo, Geist, Geist Mono)
- Spacing, radii, shadow, motion tokens
- Status colors (positive, warning, critical)
- Ink scale (except `ink-100`)
- Nav structure, footer structure, case-study layout, About layout
- 8pt grid, content widths
- Hover/press/focus behavior on buttons, links, inputs
- All rules around imagery, hero treatment limits, no-emoji, no-decorative-accent

If a previous component was correct, leave it alone.
