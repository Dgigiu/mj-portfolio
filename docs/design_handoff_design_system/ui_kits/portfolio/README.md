# Portfolio UI Kit

A high-fidelity recreation of Miguel Jesus's portfolio site, built against the design system in this project.

## What's here

| File              | What it is                                                |
|-------------------|-----------------------------------------------------------|
| `index.html`      | Entry point — loads React, mounts the app, hash routing  |
| `components.jsx`  | Shared primitives — Eyebrow, Tag, Footer, Icon, Link, Button |
| `Nav.jsx`         | Top nav with sentence-case links and current-state accent |
| `Home.jsx`        | Index page — hero + work list                            |
| `CaseStudy.jsx`   | Case study read view — long-form prose with figures      |
| `About.jsx`       | Short bio + contact                                       |

## Screens

1. **Home** (`#/`) — wordmark, restrained hero, list of case studies with eyebrow metadata
2. **Case study** (`#/work/linear`) — full read view with prose, figures, next/prev
3. **About** (`#/about`) — short bio, portrait, contact links

Click between them via the nav. The work-list rows on Home link straight into the case study read.

## What this is not

A storybook. It is a recreation of the site as someone would experience it. Components are factored small (each screen pulls from `components.jsx`) so they can be reused for slides, mocks, or production scaffolding.

## Notes

- Content is illustrative — placeholder case studies (Linear, Stripe Atlas, Atlassian). Real projects, real copy, and real screenshots come from Miguel.
- The portrait on About is the one from the Figma (`assets/miguel-portrait.png`).
- Lucide icons are loaded from CDN; see `index.html`.
