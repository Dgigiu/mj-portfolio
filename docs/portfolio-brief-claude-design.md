# Portfolio website brief

> **Status note (2026-06-10): partially superseded.** This is the original exploration brief. The shipped design system came out of the Claude Design handoff (`docs/design_handoff_design_system/` plus the v2 delta) and is implemented in `src/styles/tokens.css`: Aleo serif for body, Geist sans for display and UI, warm off-white canvas `#fbfaf6`, single cobalt accent `#155fe8`. Where the Color, Typography, or Components sections below disagree with the handoff or the tokens file, the shipped system wins. The Motion policy and Writing tone sections are current.

## Project

A personal portfolio website for Miguel Jesus, Senior Product Designer with 20+ years of experience focused on SaaS and mobile product design. The site exists to showcase product case studies and help land senior in-house product design roles.

## Audience

Design leads, hiring managers, and product people at SaaS and product companies. They will skim on phones, read deeply on laptops, and decide quickly whether the work is worth their time.

## Structure

- **Home**: Short intro, list or quiet grid of case studies, links to LinkedIn and email.
- **Case studies**: Long-form pages, one per project. Three to start: Team Files (B2B SaaS, Atlassian ecosystem), MyFoodways (sustainable recipes mobile app), Food Save (food waste tool for professional kitchens).
- **About**: A more personal page covering background, philosophy, and current focus.
- **Contact**: Email and LinkedIn. Keep it simple.

## Visual direction

### Overall feel

Closer in spirit to Linear, Vercel, or Rauno Freiberg's site than to an art director's showcase. A product designer's product: calm, structured, sophisticated. The work carries the weight; the system stays out of the way.

### Color

- **Background**: Off-white, around #F0F0F0. Warm-neutral light gray, not pure white.
- **Text**: Near-black, not pure black.
- **Blue as the expressive layer, doing two jobs**:
  - *Atmosphere*: Hero gradients running from deep navy (around #0A1530) down to bright cobalt (around #2A7CFF), used for hero sections and case study covers.
  - *Interaction*: Saturated bright blue wash on case study card hover states. Same bright blue for links and small interactive states.

The static state stays calm. Engagement gets met with color.

### Typography

- **Display and headings**: Bold, wide-geometric sans. Aeonik Bold, PP Neue Machina, or similar. Strong personality, used large.
- **Body**: Clean humanist sans (Inter, IBM Plex Sans, or General Sans) with generous line-height and a reading measure around 60 to 72 characters.
- **Captions and technical asides**: Monospace where it adds precision.

### Layout

Structured grid, generous spacing, clear vertical rhythm. Case studies as long-form pages with strong section breaks, room for full-bleed product screenshots, and side-by-side comparisons where useful. Mobile-first; screenshots scale gracefully and captions stay legible at any size.

### Components

Keep minimal: text blocks, captioned figures, image containers with subtle borders or soft shadows to lift screenshots off the background, simple case study cards (with the blue hover wash), quiet nav, quiet footer.

## Motion (policy updated June 2026)

The original brief banned all parallax and hero animation. Miguel has since opted into a small set of quiet motion, within these rules:

- Animate `transform` and `opacity` only. No layout shift, ever.
- Everything under ~400ms, or scroll-driven. Nothing loops or autoplays.
- Text never animates. Cards may reveal as whole blocks; the hero heading and subtitle stay static.
- All motion respects `prefers-reduced-motion` and degrades to static without JS.

Current set: hero portrait scroll parallax (lags at ~12%, capped); case study cards ease in once on first view (faint: opacity from 0.75, 8px travel, never from alpha 0); the image zoom dialog scales from 0.97 as it fades in; card hover lifts the cover 2px with a 1.01 image scale (media only, text stays put); the nav hover underline rises in from just below. A load-time hero "settle" animation was tried and rejected as too theatrical; don't reintroduce entrance animations on the hero.

## Writing tone

Clear, grounded, practical. No marketing fluff, no superlatives, no buzzwords. Plain precise language that respects the reader's time. US English. No em dashes anywhere.

## What to avoid

- Pure white backgrounds.
- Carousels, scroll-jacking, autoplaying or looping motion.
- Marketing-site flourishes.
- Generic AI-design aesthetics (gradients applied for their own sake, overdesigned cards, glassmorphism, default Bootstrap blues).
- Decorative motion outside the Motion policy above. Anything moves for a reason or it doesn't move.

## References

- linear.app
- vercel.com
- rauno.me
- Current site: migueljss.com (the off-white background and navy-to-cobalt hero gradient are already in place and working; build on that direction).
