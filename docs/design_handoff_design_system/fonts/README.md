# Fonts

This system uses two type families:

| Family       | Where it comes from              | License                          |
|--------------|----------------------------------|----------------------------------|
| **Aleo**     | Self-hosted (`.ttf` in this dir) | SIL Open Font License            |
| **Geist**    | Self-hosted (`.ttf` in this dir) | SIL Open Font License (Vercel)   |
| **Geist Mono** | Self-hosted (`.ttf` in this dir) | SIL Open Font License (Vercel) |

## Local files

- `Aleo-VariableFont_wght.ttf` — Aleo roman, variable weight 100–900
- `Aleo-Italic-VariableFont_wght.ttf` — Aleo italic, variable weight 100–900
- `Geist-VariableFont_wght.ttf` — Geist roman, variable weight 100–900
- `Geist-Italic-VariableFont_wght.ttf` — Geist italic, variable weight 100–900
- `GeistMono-VariableFont_wght.ttf` — Geist Mono roman, variable weight 100–900
- `GeistMono-Italic-VariableFont_wght.ttf` — Geist Mono italic, variable weight 100–900

The `@font-face` block at the top of `../colors_and_type.css` loads them with relative paths (`./fonts/...`), so the CSS file must be loaded from the project root for the paths to resolve. Inside subfolders (e.g. `ui_kits/portfolio/`), reference the CSS file as `../../colors_and_type.css` and the font paths will still resolve correctly because they're relative to the CSS file, not the HTML.

## Substitution log

| Original (Figma)  | Now in system     | Notes                                              |
|-------------------|-------------------|----------------------------------------------------|
| DIN Alternate Bold | **Geist** (self-hosted) | User-provided brand font. Resolves the original substitution. |
| Aleo Regular      | **Aleo** (self-hosted) | Preserved. User-supplied .ttf.                    |
| Inter Regular     | _dropped_         | Wordmark unified with Geist.                        |
