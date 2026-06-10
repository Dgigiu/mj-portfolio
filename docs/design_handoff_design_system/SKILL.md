---
name: miguel-jesus-design
description: Use this skill to generate well-branded interfaces and assets for Miguel Jesus's portfolio, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping. Restrained, typography-driven, near-neutral with one blue accent.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

Key files:
- `README.md` — content fundamentals, visual foundations, iconography, font substitution notes
- `colors_and_type.css` — all design tokens + ready-to-use utility classes
- `assets/` — portrait imagery, hero blob SVGs, logos
- `ui_kits/portfolio/` — high-fidelity component recreations for the portfolio site

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view, with `colors_and_type.css` imported and Aleo + Geist webfonts loaded.

If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design (case study layout? home page? a slide? a one-pager?), ask a few clarifying questions, and act as an expert designer who outputs HTML artifacts or production code depending on the need.

**Core principles to honor at all times:**
- Restraint over expression. Content first, design second.
- One accent color (blue `#0088ff`). It does links, focus, current state. Nothing else.
- No gradients (one optional hero moment excepted). No emoji. No oversized hero type.
- Aleo serif for prose; Geist sans for everything structural.
- 8pt grid. Square by default; soft radii only on photographic media.
- Subtle interactions — 120–220ms, no bounces.
