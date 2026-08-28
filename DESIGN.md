---
name: Miguel Jesus Portfolio
description: A warm-paper, typography-driven portfolio with a single working cobalt accent.
colors:
  working-cobalt: "#155fe8"
  cobalt-hover: "#0050e0"
  cobalt-press: "#003db8"
  cobalt-wash: "#e6edff"
  cobalt-line: "#bccfff"
  warm-paper: "#fbfaf6"
  paper-raised: "#fdfcfa"
  paper-subtle: "#f5f3ed"
  paper-sunken: "#ebe9e2"
  paper-edge: "#dcd9d0"
  ink: "#181818"
  ink-secondary: "#555555"
  ink-tertiary: "#6f6f6f"
  ink-muted: "#8d8d8d"
  border-strong: "#b8b8b8"
  gold: "#e89e15"
  gold-hover: "#cf8c0a"
  gold-press: "#a8720a"
  gold-wash: "#fcf1dc"
  gold-line: "#f2d08f"
  gold-on: "#181818"
  sienna: "#b8420a"
  sienna-hover: "#9c360a"
  sienna-press: "#7e2c08"
  sienna-wash: "#fbeee8"
  sienna-line: "#f2c4ae"
typography:
  display:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "4rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Aleo, Source Serif 4, Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "0.08em"
rounded:
  xs: "2px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  pill: "999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "20": "80px"
  "24": "96px"
  "32": "128px"
  "40": "160px"
components:
  link:
    textColor: "{colors.working-cobalt}"
  link-hover:
    textColor: "{colors.cobalt-hover}"
  card-media:
    backgroundColor: "{colors.paper-subtle}"
    rounded: "{rounded.md}"
  code-chip:
    backgroundColor: "{colors.paper-subtle}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.12em 0.36em"
  eyebrow:
    textColor: "{colors.ink-tertiary}"
    typography: "{typography.label}"
---

# Design System: Miguel Jesus Portfolio

## 1. Overview

**Creative North Star: "One Blue Note"**

A near-monochrome composition where cobalt is the system's only working chromatic voice. The system is a quiet, well-set page: warm paper canvas, ink text, a serif reading voice for prose and a sans voice for structure. On any given card or block, color appears only where the reader acts or where the system points (links, focus, current state, list markers); cobalt also owns a small, named set of full-bleed surfaces (the hero panel, the closing contact band, the footer strip) where it functions as a structural plane rather than a decoration. Either way its use is deliberate and enumerated, never ambient. The case studies are the music; the system is the room they play in.

This system explicitly rejects the art director showcase, marketing-site flourishes, and generic AI aesthetics (gradients for their own sake, glassmorphism, overdesigned cards). It also refuses tech-minimal mimicry: the discipline of Linear or Vercel without their cool-gray look. Density is generous and editorial; long-form case studies read like well-typeset articles, not slide decks.

Motion is quiet and earned: transform and opacity only, under ~400ms or scroll-driven, text never animates, everything respects reduced motion and works without JavaScript. The current set is a hero portrait scroll parallax, a hero scroll-exit veil that washes the portrait cobalt-to-navy as the hero leaves, faint card reveals (opacity from 0.75, 8px travel, no stagger), a 2px card hover lift, a nav underline that rises in from below, and a zoom dialog that scales from 0.97. No entrance animations on the hero, ever.

Two further accents, gold and sienna, exist at the token layer (wired into `tokens.css`, and built out as a full ramp in the companion Figma design system) but have no consumer in the shipped site yet: they were added for a future annotation-badge system for case study screenshots. Until that component ships, the live UI remains cobalt-only; treat gold and sienna as reserved, not available for general use.

**Key Characteristics:**
- Warm paper canvas (#fbfaf6), never pure white
- One live accent: Working Cobalt (#155fe8), used at interaction points and at a short, named list of full-bleed surfaces
- Two reserved accents (gold, sienna) at the token layer only, awaiting a badge/annotation component
- Two type voices: Geist for display and UI, Aleo serif for prose
- Flat at rest; shadows respond to state
- 8pt spacing grid, 1040px page container, 720px prose measure

## 2. Colors

A warm-neutral field in two families (paper and ink) with one chromatic voice.

### Primary
- **Working Cobalt** (#155fe8): the live chromatic voice. Links, focus rings, current nav state, prose list markers, the blockquote rule. Darkened from #1a6bff to pass WCAG AA (5.21:1) on the canvas. Hover deepens to **#0050e0**, press to **#003db8**. **Cobalt Wash** (#e6edff) backs text selection and the focus ring; **Cobalt Line** (#bccfff) is its hairline companion. Cobalt also fills a short, named list of full-bleed non-interactive surfaces (see The Sanctioned Surfaces Rule below): the hero panel and its top-edge glow, the closing contact band, and the pressed-cobalt footer strip. Both uses stay within the same hue family; a card's own chromatic vocabulary never grows past its CTA.

### Secondary (reserved, token-only)
- **Working Gold** (#e89e15): cobalt's near-complement, added for an annotation-badge system (warning triangle and similar marks over case study screenshots) designed in Figma but not yet built in the site. Hover **#cf8c0a**, press **#a8720a**, wash **#fcf1dc**, line **#f2d08f**. White text fails AA on gold (2.3:1); its glyph token is **Gold-On-Ink** (#181818, ~7.8:1) rather than the white used on cobalt. Do not use anywhere in the live UI until the badge component ships.

### Tertiary (reserved, token-only)
- **Parked Sienna** (#b8420a): an optional third note for minimal details, kept in the token set but unused in both Figma and code today. Hover **#9c360a**, press **#7e2c08**, wash **#fbeee8**, line **#f2c4ae**.

### Neutral
- **Warm Paper** (#fbfaf6): the canvas. Every page sits on it.
- **Paper Raised** (#fdfcfa): elevated surfaces (dialogs).
- **Paper Subtle** (#f5f3ed): sunken fills, image frames while loading, inline code chips.
- **Paper Sunken** (#ebe9e2) and **Paper Edge** (#dcd9d0): deeper wells and subtle borders.
- **Ink** (#181818): primary text. Near-black, never pure black.
- **Ink Secondary** (#555555): supporting text, card summaries.
- **Ink Tertiary** (#6f6f6f): captions, meta lines, labels. The lightest gray allowed to carry readable text (4.96:1).
- **Ink Muted** (#8d8d8d): decorative only. Hairlines, hover underlines, ornament.
- **Border Strong** (#b8b8b8): emphasized rules and disabled text.

### Named Rules
**The One Blue Note Rule.** Within any card, block, or piece of prose, Working Cobalt appears only where the reader acts or the system points: links, focus, current state, markers. Never as decoration inside content, never in gradients.

**The Sanctioned Surfaces Rule.** Cobalt has exactly four non-interactive, full-bleed uses: the hero panel, the hero's top-edge glow bloom, the closing contact band, and the pressed-cobalt footer strip. All four stay within the accent/accent-press hue family. This list does not grow by default; a new full-bleed cobalt surface needs the same deliberate sign-off the original four got, not a quiet "it matches the brand" addition.

**The Reserved Accent Rule.** Gold and sienna exist in `tokens.css` and the Figma library but have no consumer in the shipped site. Don't reach for them to add "a little color" to an existing screen; they wait for the annotation-badge component they were built for.

**The Decorative-Only Muted Rule.** #8d8d8d never carries text that must be read. Readable text uses Ink Tertiary (#6f6f6f) or darker.

**The No Pure White Rule.** #ffffff appears nowhere as a background. The lightest surface is Paper Raised (#fdfcfa).

## 3. Typography

**Display Font:** Geist (with Inter, system-ui fallback)
**Body Font:** Aleo (with Source Serif 4, Georgia fallback)
**Label/Mono Font:** Geist Mono (with JetBrains Mono, ui-monospace fallback)

**Character:** A sans that structures and a serif that speaks. Geist is precise and contemporary for headings, navigation, and UI; Aleo gives long-form case study prose a warm, bookish reading voice. The pairing contrasts on the serif axis, so the two never blur.

### Hierarchy
- **Display** (700, 4rem / 3.25rem, 1.1, -0.02em): hero headline only. Hard ceiling of the scale; the page never shouts above it.
- **Headline** (600, 2.5rem, 1.1): page h1 (case study titles, About, Contact).
- **Title** (600, 1.625rem, 1.25): section h2 and card titles. Sub-titles drop to 500 at 1.375rem.
- **Body** (400, 1.0625rem, 1.7): all prose in Aleo, on a 720px measure (about 70ch). `text-wrap: pretty`.
- **Label** (500, 0.75 to 0.8125rem, 0.08em, uppercase): eyebrows and meta labels in Ink Tertiary; the accent version is reserved for the case study header block.

### Named Rules
**The Two Voices Rule.** Geist never sets paragraphs; Aleo never sets headings, labels, or UI. Each voice keeps its register.

**The Static Type Rule.** Text never animates. Blocks containing text may reveal as whole units; the glyphs themselves never move, fade, or stagger.

## 4. Elevation

Flat by default. The canvas, text, and most surfaces share one plane; depth is reserved for media (screenshots lifted slightly off the paper) and for responses to state. Card media frames carry a quiet ambient shadow that deepens on hover as the frame rises 2px; the zoom dialog floats on the largest shadow in the vocabulary. Borders and background tints (Paper Subtle, Paper Sunken) do the everyday layering work that shadows would otherwise do.

### Shadow Vocabulary
- **Whisper** (`box-shadow: 0 1px 2px rgba(24, 24, 24, 0.04)`): barely-there lift for small inline elements.
- **Resting media** (`box-shadow: 0 1px 2px rgba(24, 24, 24, 0.06), 0 1px 1px rgba(24, 24, 24, 0.03)`): default state of card covers and figures.
- **Hover lift** (`box-shadow: 0 4px 14px rgba(24, 24, 24, 0.06), 0 1px 2px rgba(24, 24, 24, 0.04)`): the engaged card state, paired with a 2px rise.
- **Dialog** (`box-shadow: 0 12px 32px rgba(24, 24, 24, 0.08), 0 2px 4px rgba(24, 24, 24, 0.04)`): zoomed images only.
- **Focus** (`box-shadow: 0 0 0 3px #e6edff`): the keyboard focus ring, in Cobalt Wash.

### Named Rules
**The Lift-On-Intent Rule.** Surfaces are flat at rest. Shadows deepen and frames rise only in response to state: hover, focus, or an open dialog. Nothing floats for decoration.

## 5. Components

### Links
- **Style:** Working Cobalt (#155fe8), no underline at rest inside UI, underlined in prose.
- **Hover:** deepens to #0050e0. **Visited** (prose only): #5a44a8.
- **Focus:** 3px Cobalt Wash ring, visible always.

### Navigation
- Wordmark left, three text links right, set in Geist at 0.875rem with snug tracking. No icons, no pills, no background.
- **Hover:** a 2px muted-gray underline rises in from 3px below with a fade (120ms). **Active page:** a full Working Cobalt underline, static.
- **Mobile:** same row, tighter gaps. No hamburger; three links fit.

### Case Study Card
- **Character:** borderless and editorial; the cover image is the card.
- **Layout:** two equal columns (cover left, text right) with a 32px gap; stacks under 720px. Compact variant is vertical with a 16:10 cover for "More case studies" and keeps the older meta-above-title order.
- **Cover frame:** 4:3, 8px radius, Paper Subtle fill behind the image, resting-media shadow.
- **Text order (full variant):** title, then a serif benefit standfirst (Aleo 1.1875rem, Ink, not cobalt), then the description (Aleo, Ink Secondary), then the meta line (Geist 0.8125rem Ink Tertiary), then a cobalt "Read the case study →" cue. The benefit is static framing copy, so it deliberately withholds the accent; on the card, blue stays reserved for the one line the reader can act on.
- **Hover:** frame rises 2px, shadow deepens to hover-lift, image scales to 1.01. Media only; text never moves.

### Cobalt Band (signature)
- **Character:** a full-bleed accent panel that closes a page instead of fading it out on paper. Two instances share the pattern: the **Contact Outro** (`--accent`, white text, the email address at title scale as the one line that steps forward) and the **Footer strip** (`--accent-press`, one shade darker, meta-scale text at reduced opacity) that sits flush beneath it with no seam margin, reading as one two-tone cobalt foot on pages that carry both.
- **Text on band:** white at full opacity for the primary line, `rgba(255,255,255,0.92)` for supporting copy, `rgba(255,255,255,0.78)` for the footer's quieter meta and social links.
- **Hover:** band links lift to Cobalt Line (#bccfff) rather than a darker blue, since the surface is already the accent.

### Figures / Media
- Screenshots sit in 8px-radius frames on Paper Subtle with the resting shadow, full prose width or full bleed. Captions in Geist 0.8125rem Ink Tertiary. Click opens the zoom dialog (fade + scale from 0.97).

### Blockquote / Quote
- Aleo at 1.1875rem, Ink, with a 2px Working Cobalt left rule and 20px inset. One of only two places the accent forms a line (the other is the active nav underline).

### Inline Code
- Geist Mono at 0.92em on a Paper Subtle chip, 4px radius. Code blocks invert: Ink background, Warm Paper text.

### Prose Lists (signature)
- No native bullets. An en-dash marker in Working Cobalt, set in Geist 600, hangs in a 1.6em indent; ordered lists use cobalt numerals the same way. The accent quietly structures the reading.

## 6. Do's and Don'ts

### Do:
- **Do** keep Working Cobalt (#155fe8) at interaction and wayfinding only inside cards and prose; if a screen gains a second chromatic element there, remove one. Full-bleed cobalt is limited to the four sanctioned surfaces (hero panel, hero glow, contact band, footer strip).
- **Do** keep gold (#e89e15) and sienna (#b8420a) at the token layer only until the annotation-badge component ships; nothing in the live site should reference `--accent2` or `--accent3` yet.
- **Do** set all prose in Aleo on the 720px measure and all structure in Geist.
- **Do** use the 8pt spacing tokens and the semantic color tokens; no magic numbers, no raw hex in components.
- **Do** keep reveals faint: opacity from 0.75 (never alpha 0), 8px travel, no stagger, 450ms ease-out.
- **Do** use `padding-block` on `.container` sections; the `padding` shorthand zeroes the safe-zone inline padding.
- **Do** give every interactive element a visible 3px Cobalt Wash focus ring and a reduced-motion fallback.

### Don't:
- **Don't** use pure white backgrounds anywhere; the canvas is Warm Paper #fbfaf6.
- **Don't** read as an "art director showcase" or add "marketing-site flourishes"; the work carries the weight.
- **Don't** reach for "generic AI design aesthetics": gradients for their own sake, overdesigned cards, glassmorphism, default Bootstrap blues.
- **Don't** drift into tech-minimal mimicry; cool grays and developer-tool styling are off-register here.
- **Don't** add carousels, scroll-jacking, autoplaying or looping motion, or any entrance animation on the hero.
- **Don't** animate text, ever. Whole blocks may move; glyphs may not.
- **Don't** set readable text in #8d8d8d; it is decorative only.
- **Don't** use em dashes in any string, including alt text and error messages.
- **Don't** pair white text with gold (#e89e15); it fails AA at ~2.3:1. When the badge component ships, its glyph uses Gold-On-Ink (#181818, ~7.8:1) instead.
- **Don't** add a fifth full-bleed cobalt surface without the same explicit sign-off the original four (hero panel, hero glow, contact band, footer strip) got.
