# Handoff

Last updated: 2026-10-07 (session 29)

**Status at session close: [PR #10](https://github.com/Dgigiu/mj-portfolio/pull/10) (`zoom-tall-images`) merged to `main` as `1794a7d` and live on migueljss.com.** It makes the zoom dialog readable for tall figures (details below). Deploy succeeded; the live Team Files page carries the new markup, size attributes, inline script and CSS (checked with curl, not the browser, to keep the visit out of Umami). The `zoom-tall-images` branch was deleted locally and on origin after the merge. Earlier in session 29, [PR #8](https://github.com/Dgigiu/mj-portfolio/pull/8) (shared folder authentication and narrow views) and [PR #9](https://github.com/Dgigiu/mj-portfolio/pull/9) (TF renumbering) were merged and are live, and their branches deleted. Still open for Miguel: whether TF-05 and TF-06 need larger text inline (readability notes below); this PR addresses the zoomed view, not the inline one.

## What changed in this session (2026-10-07, session 29, continued: zoom for tall figures)

On branch **`zoom-tall-images`**, off `main` after PR #9. Changes in [ZoomDialog.astro](src/components/ZoomDialog.astro), plus two data attributes in [Figure.astro](src/components/Figure.astro) and [CompareImages.astro](src/components/CompareImages.astro).

**The rule** (one helper, `shouldScroll`, and one constant, `MIN_FIT_SHARE = 0.7`):

- Work out two widths: the width if the whole image fits on screen (today's behavior), and the width if only the width is fitted (capped at the natural width, so no upscaling).
- If the whole-image width would be less than 70% of the width-fit width, the dialog switches to tall mode: the image fills the width and scrolls vertically inside the dialog, opening at the top. Otherwise nothing changes.
- The available width and height are read from the dialog's computed CSS (`max-width`, padding, border, and the image's `max-height`), so the CSS stays the only source for sizes. The rule runs again on resize while the dialog is open.
- Why 0.7: on laptop viewports, 1600×1055 figures land at about 0.77 to 0.89 and stay contained, while TF-05 (1600×1452) lands at about 0.56 to 0.66 and scrolls. When tall mode does apply, the image is always at least 43% taller than the available space, so a figure that would only overflow by a few pixels never gets a small scroll.
- Triggers now pass `data-zoom-width` and `data-zoom-height`, so the decision happens before the image loads and nothing jumps.

**Measurements** (layout sizes, Team Files, Chrome):

| Figure | 1440×900 before | 1440×900 after | 1280×800 before | 1280×800 after |
| --- | --- | --- | --- | --- |
| TF-05 (1600×1452) | 833×756, fits | 1283×1164, scrolls (749px visible) | 732×664, fits | 1136×1031, scrolls (657px visible) |
| TF-01 to TF-04, TF-07, TF-08 (1600×1055) | 1147×756 | same, no scroll | 1007×664 | same, no scroll |
| TF-06 (1600×758) | 1283×608 | same, no scroll | 1136×538 | same, no scroll |
| TF-09 (1600×720) | 1283×577 | same, no scroll | 1136×511 | same, no scroll |

- **TF-05 readability when zoomed:** the image now shows at about 80% of the frame at 1440×900 (was 52%) and 71% at 1280×800 (was 46%). The failure modal's body text is about 9.5px at 1440 and 8.5px at 1280 (was about 6px), clearly readable at 1:1. Modal titles are about 13px and 12px. Account emails are about 7px and 6px.
- **MyFoodways and Food Save:** all 12 figures measure identically on this branch and on `main` at 1440×900 (checked by stashing the change), with no scroll. MFW-02 (1600×940) and MFW-07 (1600×740) are wide and stay contained.
- **Phone, 375×812:** every Team Files figure opens and closes normally, and none scroll. TF-05 included: on a portrait phone the width is the limit, so it already fills the full width (303×275). **Phone landscape, 812×375:** the 1600×1055 figures and TF-05 switch to scrolling, because there is so little height; the two wide figures stay contained. Worth a look in review; raising or lowering `MIN_FIT_SHARE` is the one place to tune it.
- `/lab/components`: the Figure and CompareImages zooms open and close normally (CompareImages passes its sizes too).

**Behavior fixed or added along the way:**

- **Page scroll lock.** The page behind was not actually locked before: wheeling over the backdrop scrolled it (3000 to 3500px in a test). Now `html:has(.zoom-dialog[open])` sets `overflow: hidden` with `scrollbar-gutter: stable`, so the page doesn't move or shift. Verified with real wheel events over the image and the backdrop.
- **Backdrop click is stricter.** It now closes only when both the press and the release land outside the dialog's box. A drag that starts on the image or scrollbar and ends on the backdrop no longer closes it (verified), and clicking the dialog's own padding no longer closes it either (before, it did).
- **Focus.** In tall mode the scroll area gets `tabindex="0"` and focus on open, with the site's focus ring when opened by keyboard. Arrow keys and Space scroll it (verified with real key events). Shift+Tab reaches the close button; Esc and the close button work; focus returns to the figure on close. PageUp and PageDown couldn't be exercised: the test tool's synthetic PageDown doesn't scroll even a plain page. If a resize switches the dialog back to contained while the scroll area has focus, focus moves to the close button.
- Unchanged: caption, alt, open and close transitions, reduced motion. `scrollbar-gutter: stable` and `overscroll-behavior: contain` apply only in tall mode, so contained figures don't get a gutter.
- The design hook flags the dialog's empty `<img>` as a broken image. That's a false positive and predates this change: the script sets `src` before the dialog opens.
- Build clean (0/0/0). No console errors from this change; two stale 500s in the dev log date from the renumbering, between the file renames and the import update.

## What changed in this session (2026-10-07, session 29, continued: TF figure renumbering)

Team Files figure files now follow render order, TF-01 to TF-09. The cover stays `TF-00-cover.jpg` (Figma frame `TF-00-cover-banner`). On branch **`tf-renumber-figures`**, off `main` after PR #8.

| Old | New | Figma node |
| --- | --- | --- |
| TF-06-value-proposition | TF-01-value-proposition | `4070:4503` |
| TF-07-ux-improvements | TF-02-ux-improvements | `4120:4227` |
| TF-03-attach-files | TF-03-attach-files (unchanged) | `4070:4533` |
| TF-02-connect-folder | TF-04-connect-folder | `4070:4475` |
| TF-09-authentication | TF-05-authentication | `4194:3276` |
| TF-10-narrow-views | TF-06-narrow-views | `4210:5062` |
| TF-04-layout | TF-07-layout | `4070:4559` |
| TF-05-automation-settings | TF-08-automation-settings | `4070:4581` |
| TF-08-design-system | TF-09-design-system | `4178:3610` |

- **Figma** (`oIt1mAagsb5rIThaLCjvFt`, page "Version 2"): the eight frames were renamed to the new names. Their export settings (PNG at 1x, no suffix) take the filename from the frame name, so a fresh export now lands on the right repo filename. Canvas positions and layer order were not touched. The "Version 1" page was not looked at or changed.
- **Repo:** `git mv` for the eight files, so git records them as pure renames with unchanged bytes. The import block in [team-files.mdx](src/content/case-studies/team-files.mdx) was rewritten in render order; the variable names, alts and captions are unchanged. The two lab pages that use the layout figure ([components.astro](src/lab/pages/components.astro), [playground.astro](src/lab/pages/playground.astro)) now import `TF-07-layout.png`.
- **Older HANDOFF entries keep the old names**, since they record what happened at the time. Use the table above to translate them.
- Build clean (0/0/0). Browser check: the Team Files page renders TF-01 to TF-09 in order, each at its usual size, with no failed requests; `/lab/components` and `/lab/playground` load the layout figure.

## What changed in this session (2026-10-07, session 29, Team Files shared folder authentication and narrow views)

Copy plus two figures in [team-files.mdx](src/content/case-studies/team-files.mdx). The brief asked for a new branch off `main`, but most of its edits already sat on the unmerged `copy/team-files-shared-auth` (session 28, rooted on current `main`). So **`tf-auth-narrow-views`** was cut from that branch's tip: it keeps the session 28 copy and the TF-04 and TF-08 re-exports, and adds this session's work on top.

- **Copy, checked against the brief word for word** (curly apostrophes kept, per the file's convention): Edit A (onboarding opener "dropping the separate Team Files sign-up"), Edit B (two shared folder paragraphs plus the TF-09 figure), Edit C (narrow views sentence at the end of the narrow spaces paragraph) and Edit D ("**Layout options.**" bullet) were already on the branch from session 28 and match. New this session: the TF-09 alt text was replaced with the brief's wording, and the TF-10 figure was added after the narrow spaces paragraph, before "Design execution".
- **`TF-10-narrow-views.png`**, new: 1600×758, PNG at 1x, Figma `oIt1mAagsb5rIThaLCjvFt` ("Team-Files-app"), page "Version 2", frame node `4210:5062`. Imported as `narrowViews`. It shows the full-width file manager with folder actions in a right-hand column, and the narrow panel with the same actions under one "..." button, shown open, with a "Folder actions: grouped under one button" callout.
- **`TF-09-authentication.png`**, re-exported: 1600×1452, node `4194:3276`, overwritten in place. The frame changed in Figma after session 28's export: modal text and buttons are larger, and the failure modal body now wraps to three lines. Callouts and arrows are unchanged.
- Neither figure was resized, cropped or padded. Both render at their natural ratio: 718×652 and 718×340 in the 720px column at 1440.
- **Not renumbered, on purpose.** Figures in render order (file, section):
  1. TF-06-value-proposition, Product
  2. TF-07-ux-improvements, Strategy
  3. TF-03-attach-files, Core UX challenges
  4. TF-02-connect-folder, Core UX challenges
  5. TF-09-authentication, Core UX challenges
  6. TF-10-narrow-views, Core UX challenges
  7. TF-04-layout, Design execution
  8. TF-05-automation-settings, Design execution
  9. TF-08-design-system, Design execution

  The cover (`TF-00-cover.jpg`) comes before all of them and isn't a Figure. Note that TF-03 also renders before TF-02, not only the new ones.
- Build clean (0/0/0). Browser check at 1440: both figures are in the right spots with their captions; all 9 figures load; no 4xx responses, no console errors; the old onboarding sentence and old layout bullet are gone. No em or en dashes added.

### Readability at the rendered width (reported, images unchanged)

Sizes are CSS px at the 718px inline width (the frame is scaled to about 45%). Estimated from pixel crops at 1x and 2x and checked against 1:1 browser captures.

- **TF-09:** callouts (Connected accounts, Access granted, Locked folders, Failed attempt) and "Account has no access" are about 11 to 13px and read easily. Modal titles ("Authenticate", "Authentication failed") are about 7.5px and readable. "Connected places", the Google Drive names, the "Access granted" toast title and the button labels are about 5.5 to 6px: readable if you look for them, sharper on retina. The failure modal body is also about 5.5px; it can be made out on retina with effort but not comfortably on a 1x display. It is clearer than session 28's export, where it was about 4 to 5px. Account emails, quota lines and folder subtitles are about 4px and unreadable, which is fine because they're texture. Zoom only gets the image to 833px wide at 1440×900, because the frame is tall, so the modal body is still about 6px there.
- **TF-10:** the callout is about 12px and reads easily; the "Documentation Sample Folder" title is about 8px. File names (Images, Blue balance sheet.xlsx, DataJournalismHandbook.pdf, Geometric presentation.pptx, Report.docx) and the menu items (New folder, New document, Upload file, Ordering) are about 5.5px: legible on retina, soft on 1x. File size and date lines are about 4px. Zoom helps a lot here: the frame is wide, so the dialog shows it at 1283px and file names reach about 10px.
- The story reads from the callouts and the overall shape in both figures, so neither depends on the small text.
- Side note: in the Browser pane the `srcset` picked the 800w variant at 2x DPR. That is most likely the pane's scaled-down emulation, since `sizes` is `(min-width: 800px) 800px` and a real 2x browser should pick 1600w. It's unrelated to this change and was left alone.

## What changed in this session (2026-10-02, session 28, continued: TF-04 and TF-08 re-exports)

Images only, no copy or code changes. Second commit on branch **`copy/team-files-shared-auth`** (unmerged at the time, so it was reused instead of a new branch).

- **`TF-04-layout.png`** re-exported (1600×1055, node `4070:4559`), overwritten in place. Callouts restyled: all three now have the check icon and a bold label with a colon ("Per issue or page: set layout options", "Preview: reflects the selected settings", "Admin: set default layout options"). The numbered "1" marker and the all-bold "Visualization of selected settings" callout are gone. Alt and caption left as they were; neither mentions a numbered step or "visualization".
- **`TF-08-design-system.png`** re-exported (1600×720, node `4178:3610`), overwritten in place. The mdx already imported this file. The change is a hand cursor on the hover row.
- Build clean (8 pages, 0/0/0). Both figures render at the same size and position as before (718×473 and 718×323 in the 720px column at 1440).
- **Dev cache gotcha:** `astro dev` serves `/_image` URLs with a one-year `max-age` and the URL doesn't change when a file is overwritten in place, so a browser that already loaded the page keeps showing the old image. Hard-reload (or use a fresh profile) to see a re-export locally. Production isn't affected: the built file names carry a content hash, and both changed.

## What changed in this session (2026-10-02, session 28, Team Files shared-folder authentication)

Copy plus one new figure in [team-files.mdx](src/content/case-studies/team-files.mdx). On branch **`copy/team-files-shared-auth`** (off `main`), pushed at session close, **not merged** (see status above).

- **New figure `TF-09-authentication.png`** (1600×1452, PNG at 1x), exported from Figma `oIt1mAagsb5rIThaLCjvFt` ("Team-Files-app"), page "Version 2", frame node `4194:3276`. Export checked against the frame: all four callouts (Connected accounts, Access granted, Locked folders, Failed attempt), the red "Account has no access" label, and all four arrows (blue to the account picker, green to Access granted, red down to the failure modal, blue return from "Try another account") are in.
- **Core UX challenges copy:**
  - Onboarding paragraph opener is now "Another turning point was dropping the separate Team Files sign-up that the app's first version required." (was "removing mandatory authentication").
  - Two new paragraphs after "...every default state has to teach.": shared folders at larger companies (security and accountability), then the admin choice between simple sharing and per-person sign-in. The TF-09 figure follows them, before the narrow spaces paragraph.
  - Narrow spaces paragraph gained a closing sentence ("In narrow views, attachments dropped secondary metadata first..."). Its own figure comes later; no placeholder added.
- **Design execution:** the layout bullet is now "**Layout options.**" and no longer mentions responsive or mobile behavior.
- **Not renumbered, on purpose.** TF-09 sits between TF-02 and TF-04 in page order. File names stay as they are until all new figures are placed.
- Build clean (8 pages, 0/0/0). Browser-checked at 1440 and 375: figure in the right spot, no horizontal overflow, zoom dialog opens, no console errors. No em or en dashes, curly apostrophes throughout.

### Flagged for Miguel (reported, nothing changed)

- **TF-09 is only partly readable at the desktop figure width.** The prose column renders it at 718px, so the 1600px frame is scaled to about 45%. The four callouts and "Account has no access" land around 11px and read fine. Modal titles ("Authenticate", "Authentication failed") land around 6px: recognizable, not comfortable. The failure modal's body text, the button labels, and the folder and account names land around 4 to 5px and can't be read on a 1x display; on retina they are sharp but still too small to read without leaning in. The callouts carry the story on their own.
- **Zoom helps less than on other figures.** The frame is taller than the other TF figures (1452 vs 1055), so in a 1440×900 window the zoom dialog is height-limited to 833px wide, only about 16% larger than inline. Modal body text is still around 5px there.
- **At 375px** the figure is 333px wide; even the callouts drop to about 5px, so mobile readers depend on zoom.
- Small thing in the frame itself: the blue return arrow runs up through the right edge of the failure screen, over the row behind the modal.

## What changed in this session (2026-09-29, session 27, MyFoodways image)

- Re-exported `MFW-01-product.png` (1600×1055) from Figma `m1vVaKCwVkvG4AtieNx7NW` ("MyFoodways"), node `193:4558`, overwriting the file in place. Miguel updated the left phone: now an Android device showing the "Just for you" suggestions screen (pasta salad with courgette), was an iPhone with "Your handpicked recipes". The right phone (search screen) is unchanged.
- No mdx change: the figure's alt and caption describe only the search screen, so they still hold.
- On branch `mfw-product-image`, merged via PR. Build clean (8 pages, 0/0/0).

## What changed in this session (2026-09-29, session 27, continued)

**Status: `tf-image-updates` merged to `main` via PR #6 (`606faca`) and live on migueljss.com.** Deploy succeeded; the live Team Files page shows the new design system figure and the corrected onboarding paragraph. The batch was merged before the remaining Team Files images were in, at Miguel's call; any further TF images go in a new branch. The `tf-image-updates` branch still exists locally and on origin.

Third change in the `tf-image-updates` batch: text only.

- Factual correction to the onboarding paragraph ("Another turning point...") in Core UX challenges of [team-files.mdx](src/content/case-studies/team-files.mdx). Inside issues, the app only appears once something is shared: users usually first met it as a file attached to an issue, which they could open or unlock by connecting their own cloud account. People who opened the app from the Jira apps menu landed in an empty file manager, and that's where the tour lived (was "a short in-app tour"). The following paragraph ("That call was strategic...") is unchanged.
- Build clean (0/0/0), no em or en dashes added. Browser check done later in the session: new paragraph renders, old wording gone, next paragraph unchanged, no failed requests or console errors from the page.

**Merge order (resolved):** `feat/design-lab` landed on `main` first (PR #5). `main` was then merged into `tf-image-updates` to open its PR; the only conflict was `HANDOFF.md`, resolved by keeping every session entry (the lab entry is relabeled "design lab session" since it was also numbered 27).

## What changed in this session (2026-09-29, session 27)

Second change in the open Team Files image batch on branch **`tf-image-updates`**. Merged via PR #6 (see status above).

- New design system figure `TF-08-design-system.png`, exported from Figma `oIt1mAagsb5rIThaLCjvFt` ("Team-Files-app"), page "Version 2", frame node `4178:3610`, at **1600×720**. Intentionally wider than the other TF figures (1600×1055); not resized or padded. It shows the item component: content types with their own actions; normal, hover, and disabled states; and selection and nesting options.
- In [team-files.mdx](src/content/case-studies/team-files.mdx), the `designSystem` import now points to it; the Figure (Design execution, after the design system paragraph) keeps its position, with new alt and caption. Surrounding text unchanged.
- Deleted `tf-getting-started-system.png`, now unreferenced (session 20 had kept it because the Figma file had no matching frame; this frame replaces it).
- Build clean (0/0/0). Rendered page resolves the figure to the new image in the same spot; renders at a 2.22 ratio with the frame matching the image (no cropping or letterboxing); no 404s or console errors. No em or en dashes added.
- Session 26's uncommitted paragraph (below) was committed separately on the same branch in this session.

## What changed in this session (2026-09-29, design lab session)

Built a **design lab**, a Storybook-style workbench for Miguel to play with the system. On branch **`feat/design-lab`** (off `main`), merged to `main` via PR #5. Real Storybook was ruled out: its Astro support is experimental, and it would need React wrappers that drift from the shipped components.

- **Dev only.** Lives in [src/lab/](src/lab/). [integration.mjs](src/lab/integration.mjs) injects the `/lab/*` routes only when `command === "dev"`, so nothing reaches `dist/` or the sitemap (verified after a build).
- **Pages:** `/lab` overview; `/lab/tokens` (parses `tokens.css` as text on every request, so it can't drift: swatches with dark values and live WCAG contrast against the canvas, type scale, leading, tracking, weights, spacing, layout, radii, borders, shadows, hoverable motion tracks); `/lab/type` (element defaults, `mj-*` utilities, prose specimen); `/lab/components` (every component with variants and edge cases on real case study content, props tables, reveal replay); `/lab/playground` (retune semantic colors, fonts, type scale, spacing density, radius, motion speed across the whole lab, persisted in localStorage, with a copyable `:root` diff; never writes to `tokens.css`); `/lab/viewports` (any page in 375/768/1280 iframes, so media queries fire for real).
- **Dark theme toggle** in the lab sidebar sets `data-theme="dark"`, exercising the dark token set that the site doesn't wire up yet.
- **One production refactor:** the image zoom dialog (markup, script, styles) moved out of [BaseLayout.astro](src/layouts/BaseLayout.astro) into [ZoomDialog.astro](src/components/ZoomDialog.astro) so the lab can reuse it. No behavior change; zoom and Esc-to-close verified on the Team Files page.
- Sample copy in lab stories (quotes, stat labels, the placeholder card) is marked as sample; no invented claims.
- Build clean (8 pages, 0/0/0).
- **Merge note:** sessions 25 and 26 are on `tf-image-updates` (session 26 uncommitted and stashed when this branch was cut: `git stash pop` after switching back). Expect a small HANDOFF.md conflict when both branches land; keep all three entries.

## What changed in this session (2026-09-29, session 26)

Copy-only, on branch `tf-image-updates` (committed in session 27).

- New paragraph in [team-files.mdx](src/content/case-studies/team-files.mdx) "Core UX challenges": the connected-folder log story ("Support was one of the best places to do that noticing..."), placed after "On its own this is a small thing..." and before "Another turning point...". No figure, no other text changes.
- Same paragraph also inserted in the gitignored `docs/Case Studies/cs-team-files.md` at Miguel's request, even though that doc is otherwise obsolete for published cases (see session 25).
- Build clean (8 pages, 0/0/0); paragraph order confirmed in the built Team Files page.

## What changed in this session (2026-09-28, session 25)

First of several Team Files image updates, batched on branch **`tf-image-updates`**. Committed, **not pushed, PR still pending** until the remaining images are in.

- New figure `TF-07-ux-improvements.png` (1600×1055, exported from Figma `oIt1mAagsb5rIThaLCjvFt`, node `4120:4227`) placed after the 2023 UX review paragraph, before "Core UX challenges", in [team-files.mdx](src/content/case-studies/team-files.mdx).
- Same paragraph gained: "I also gave every file and folder action its own icon, so they could be scanned at a glance."
- **Workflow change:** the mdx is now the source of truth for published case studies; the `docs/Case Studies/*.md` docs are obsolete for them (Claude Chat reads the mdx from the repo). CLAUDE.md updated. Surfaced because `cs-team-files.md` had drifted: its UX review paragraph has an extra sentence (Atlassian design system, larger metadata labels, revised contrast) that was never in the mdx. Miguel approved adding it to the mdx (after the error messages sentence), and the accessibility sentence after it was shortened to "...as it did through every release, from clear system feedback to error tolerance." to avoid repeating contrast and legibility.

## What changed in this session (2026-09-28, session 24)

Added cookieless analytics via **Umami Cloud** (free Hobby tier). Merged via PR #3 and live; confirmed a live pageview reaches `gateway.umami.is/api/send` (200). Chosen over Plausible (paid) and GA4 (needs cookies and a consent banner). No cookies or device storage, so no banner; disclosed on a new `/privacy` page linked from the footer.

- **Config** in [src/lib/analytics.ts](src/lib/analytics.ts): script URL, website ID (`ae146c72-...`, public by design), `data-domains="migueljss.com"`. Also holds the `track()` / `tagReferral()` client helpers, which no-op quietly when the tracker is missing (dev, ad blockers).
- **Tracker tag** rendered by [BaseLayout.astro](src/layouts/BaseLayout.astro) only in production builds with a non-empty ID. `data-domains` keeps `npm run preview` on localhost out of the stats.
- **Events**: `Case study read` (end-of-article marker in [CaseStudyLayout.astro](src/layouts/CaseStudyLayout.astro), prop `case`); `Case study card` (props `case`, `from`: home/more); `Email click`, `LinkedIn click`, `CV open` (prop `location`: footer/outro/contact/about). Click events use Umami's `data-umami-event` attributes, no extra JS.
- **Application links**: `?ref=<company>` (letters, digits, `-`, `_`; max 40) tags the Umami session via `umami.identify({ ref })`, so every page in that visit can be filtered by company. Company-level tags only, never a person's name (the privacy page says so).
- **Miguel's side**: exclude own visits by running `localStorage.setItem("umami.disabled", 1)` in the console on migueljss.com in each browser used.
- Verified: build 8 pages, 0/0/0; tracker renders only with an ID; read event fires once per view with the right slug; `ref` tagging lowercases and rejects junk values. Note for browser testing: when the Browser pane is hidden, IntersectionObserver doesn't fire, so front the pane before testing scroll events.
- **CV stamper** for per-application tags: `npm run cv -- <tag>` ([scripts/stamp-cv.mjs](scripts/stamp-cv.mjs), uses `pdf-lib`, dev dependency) rewrites only the CV's clickable migueljss.com link to `?ref=<tag>` and saves to `docs/Applications/<tag>/Miguel Jesus - CV - Senior Product Designer.pdf` (gitignored; the company is never in the filename). Render is pixel-identical to the source, metadata untouched. Wrapped in a local project skill, `/cv-stamp <company>` (`.claude/skills/cv-stamp/`, not in git since `.claude/` is ignored), which also slugifies the name, logs `date,company,tag` to `docs/Applications/log.csv`, and reveals the file in Finder.
- **Site CV now carries `?ref=cv`** (stamped in place). **When a new Pages export replaces `public/miguel-jesus-cv.pdf`, run `npm run cv -- cv --in-place` before committing**, or the tag is lost.

## What changed in this session (2026-09-28, session 23)

Copy-only pass on [team-files.mdx](src/content/case-studies/team-files.mdx) to align with Miguel's revised CV and LinkedIn. On branch `copy/team-files-cv-alignment`, **not merged or pushed** pending Miguel's review.

- Applied: TOPDOX pivot sentence ("valued it but wouldn't pay, companies would"), Role opener (only one working as a designer; design-literate PO co-founder), Strategy sentence on trial-to-paid and retention after the 2023 UX review, design system paragraph sentence on developer time and consistency as product quality, Beyond the product sentence on site/listing experiments, Impact churn paragraph plus new quote lead-in, last Learnings bullet.
- Skipped: the "Project Summary" Role and Impact lines (the case has no such block, only the `role`/`period` frontmatter shown in the meta line, and no impact field), and the Constraints "Instead of finalizing..." replacement (that sentence doesn't exist in the current MDX). Both need Miguel's call.
- Leftovers flagged, not changed: "sole designer" still in team-files.mdx Role paragraph and on the About page (two spots); "around 3.7 stars" in the Impact sentence; `role: "Co-founder and founding designer"` frontmatter.
- Follow-up (same session, same branch): `role` frontmatter is now "Product designer and co-founder"; Impact sentence now "used by over 9,000 companies and rated 3.7 out of 4 on the Atlassian Marketplace during my tenure"; dropped "As the sole designer," from the Role paragraph; Constraints paragraph's second sentence replaced with the CTO spec review wording (the old trailing clause "while still keeping core user experience principles intact" went with it).
- **Done:** About page "sole designer" rewrites, confirmed by Miguel and applied to [about.astro](src/pages/about.astro) and mirrored in `docs/about-page.md`: intro now "For most of my career I've been the only designer on small teams, working directly with engineering and product."; Strategy paragraph now "As the only designer on small teams, I prioritized...". Constraints paragraph opener trimmed to "I worked closely with engineering from the start."
- Branch `copy/team-files-cv-alignment` merged to `main` via PR #2.
- Follow-up on `main`: Team Files "Beyond the product" opener trimmed to "My work didn't stop at the product." (dropped "As a founder and the only designer,").

## What changed in this session (2026-09-25, session 22)

- **CV PDF updated** ([public/miguel-jesus-cv.pdf](public/miguel-jesus-cv.pdf)) with Miguel's latest version. The site filename stays `miguel-jesus-cv.pdf` so existing links keep working. The Dropbox source was renamed: it's now `2026-01 Portfolio MJ + AI/Miguel Jesus - CV - Senior Product Designer.pdf` (was `CV Miguel Jesus - Senior Product Designer.pdf`).

## What changed in this session (2026-09-14, session 21)

Copy-only pass, Miguel's request: drop the "20+ years" / "since 2005" framing from headline copy on age-bias grounds, while keeping full work history and dates everywhere they already appear (case study role dates, about page timeline).

- **Home hero subhead** ([index.astro](src/pages/index.astro)): "For 20+ years I've designed SaaS and mobile products..." → "I've spent the last decade designing SaaS and mobile products...".
- **About H1 + opening paragraph** ([about.astro](src/pages/about.astro)): "Twenty years of designing clear experiences..." → "Designing clear experiences for complex products."; the lede's "I've been designing for over 20 years, starting in..." → "I started in graphic and web design, and have spent the last decade focused on...".
- **Footer tagline** ([Footer.astro](src/components/Footer.astro)): "Designing with clarity and calm purpose since 2005." → "...for complex products."
- **CV PDF swapped** ([public/miguel-jesus-cv.pdf](public/miguel-jesus-cv.pdf)), Miguel replaced the file directly, same filename so existing links keep working.
- Repo-wide search also turned up "20+ years" in three internal docs (`PRODUCT.md`, `docs/portfolio-brief-claude-design.md`, `docs/about-page.md`) and the gitignored `docs/old md versions/about-page-mj.md`. Flagged rather than auto-changed, since they're not rendered site copy; Miguel chose to leave them as-is (historical/working docs, not corrected).
- Build clean (7 pages, 0/0/0). Browser-verified hero, about, and footer render the new copy; case study role dates (2013, 2014, 2018 to 2025, etc.) untouched.
- Shipped as commit `de02358`, pushed to `main`.

## What changed in this session (2026-09-07, session 20)

Fixed the default OG/share image (`public/og/default.png`, home/about/contact only, per-case-study images untouched) so it survives iOS's share-sheet square crop. Miguel spotted the bug live: sharing `migueljss.com` via the iOS Share Sheet showed a preview icon with "el Jesus" / "duct Designer", the tail ends of "Miguel Jesus" / "Senior Product Designer" cut off. Root cause: iOS crops a centered 630×630 square out of the 1200×630 `og:image` for that icon slot (x: 285–915); the old layout was left-aligned starting at x=96, so the crop landed mid-word. The `apple-touch-icon.png` itself was already correct, this was purely the OG image's design.

- **Prototyped the fix in Figma first** (Miguel's request), on the "share assets" page of the [MJ Design System](https://www.figma.com/design/rUbsiKyYr0xITgTGVXJjJT/MJ-Design-System) file (new page, was empty), frame **"OG - Default (crop-safe)"** (`94:2`). Centered composition: a white rounded "MJ" badge (echoes `apple-touch-icon.png`, inverted for the cobalt field) above "Miguel Jesus" / "Senior Product Designer", a thin rule, then the tagline, all centered horizontally. Verified via bounding boxes that name (x 412–789) and tagline (x 390–811) both sit inside the 285–915 crop window with 100px+ margin. Miguel approved as-is, no refinements made.
- **Ported to [scripts/build-og-image.mjs](scripts/build-og-image.mjs)**: replaced the left-aligned SVG layout with the centered one (badge rect + text, centered name/subtitle, centered divider + tagline). Also dropped the top-left radial vignette, the approved Figma frame is flat cobalt, matching the `apple-touch-icon` treatment more directly.
- Regenerated `public/og/default.png`. Build clean (7 pages, 0/0/0).
- This only touches the fallback OG image (home/about/contact). Per-case-study OG images are generated from each case's `banner` (a screenshot/product photo, not text), so they aren't subject to the same failure mode and weren't touched.

## Where we are

**Domain switch happened this session.** The portfolio now lives at **https://migueljss.com**, deployed via GitHub Actions to GitHub Pages, HTTPS enforced. Repo at **https://github.com/Dgigiu/mj-portfolio**. The old staging URL `https://dgigiu.github.io/mj-portfolio/...` redirects (301) to the matching path on the new domain, GitHub Pages handles this automatically now that the custom domain is registered.

Astro is configured with `site: 'https://migueljss.com'` and no `base` (removed). All internal links use the normalized base exported from [src/lib/paths.ts](src/lib/paths.ts), which now just collapses to `/`.

The staging-only `noindex` guard (added session 10) is gone automatically: it was keyed off the github.io host in `Astro.site`, which is no longer that host. Nothing to undo, this was the designed behavior.

Build is clean (`npm run build` → 7 pages, 0 errors / 0 warnings). PageSpeed Insights on the live domain (mobile): 97 Performance / 95 Accessibility / 100 Best Practices / 100 SEO. The lone accessibility point is a known non-issue, see the session 19 changelog entry.

## What changed in this session (2026-08-31, session 19)

Miguel updated the background on the Figma frames for Food Save and MyFoodways; re-exported every frame already wired into the site for both cases and overwrote the existing files in place (same filenames, same node IDs as prior sessions, no mdx changes needed). Build clean (7 pages, 0/0/0), all images verified 200 with correct dimensions via the dev server.

- **Food Save** (`RqT7cSB5meoG2VQu7ggWNo`, page "version 2"): re-exported `FS-02-library`, `FS-03-measure-detail`, `FS-04-tasklist`, `FS-05-home` (PNG, 1600×1055). `FS-00-cover-banner.jpg` and `FS-00-cover-thumb.jpg` also re-exported but came back byte-identical to the existing files, the cover frames weren't touched by this background update.
- **MyFoodways** (`m1vVaKCwVkvG4AtieNx7NW`, page "v2", file key newly recorded here since it wasn't in HANDOFF before): re-exported all nine frames, `MFW-00-cover-banner.jpg`/`MFW-00-cover-thumb.jpg` (JPG, 1920×960 / 1200×900) and `MFW-01-product` through `MFW-08-post-launch-changes` (PNG, native frame sizes). All changed.
- Also resolved the myfoodways `recipe2` open item from session 17/18 and cleaned the stale "Let's cook" second-screen paragraph out of `docs/Case Studies/cs-myfoodways-app.md` (gitignored staging doc, doc tidiness only, no code change).
- **Home hero copy swapped** ([index.astro](src/pages/index.astro)), Miguel's revision, more conversational than the old "Calm products for complex work.": headline is now "Hi! I'm Miguel. I design products from first sketch to first release and beyond.", subhead "For 20+ years I've designed SaaS and mobile products, connecting user needs with business goals. A few of those stories are below." The old headline was short enough to need a manual two-line break (`.hero-break`, session 12); the new one is long enough to wrap naturally, so the forced break and its CSS (including the now-mobile-only override) were removed as dead code. Same `clamp(44px, 5.3vw, 72px)` font ceiling and 600px column, no other hero CSS touched. Browser-verified at 375/1024/1200/1440px: wraps to 3 to 5 lines depending on width, stays clear of the portrait at every size checked (the known session-12 overlap risk), no console errors. Build clean (7 pages, 0/0/0). Resolves the "Hero copy" item that was open since session 11.
- **Team Files got its real images**, closing the last open placeholder-cover item from session 16. Figma file `oIt1mAagsb5rIThaLCjvFt` ("Team-Files-app"), page "Version 2" (node `4070:4347`, from the URL Miguel gave): exported `TF-00-cover-banner`/`TF-00-cover-thumb` (JPG, 1920×960 / 1200×900) and `TF-02-connect-folder`, `TF-03-attach-files`, `TF-04-layout`, `TF-05-automation-settings`, `TF-06-value-proposition` (PNG, 1600×1055), matching every frame the mdx already imports. Frontmatter `thumbnail`/`banner` repointed from the old single `TF-01-hero-cover.png` to the new two-image pair, giving Team Files the same cover treatment as the other two cases. Deleted the now-unused `TF-01-hero-cover.png` and `TF-01-hero.png` (the latter was already unused since session 11). `tf-getting-started-system.png` left alone, it's a real product screenshot, not a Figma export, and nothing in the Figma file corresponds to it. Build clean (7 pages, 0/0/0), verified via rendered HTML that both the case page and the home card resolve to the new files, no console errors.
- **Team Files also got a whole-body text resync**, from Miguel's freshly updated **[docs/Case Studies/cs-team-files.md](docs/Case Studies/cs-team-files.md)** (the images landing prompted him to also update the doc, same day). Real content changes: a new paragraph and figure in Product contrasting a frozen Confluence attachment with Team Files' live preview (the `TF-06-value-proposition` figure moved here from "Beyond the product," which now has no figure); a new closing sentence on permissions settings in the connect-folder flow, with its figure caption updated to match; a new sentence on the attach flow's live preview, ditto; minor bullet rewording in Design execution. All five newly-real figure alt/captions were rewritten from the doc since the old ones were written blind against placeholders before any real image existed. One conflict surfaced and was resolved with Miguel: his first doc pass had softened the Impact stat to "used by thousands of teams" and dropped the 3.7-star rating from that sentence, which would have regressed the "over 9,000 companies" figure standardized in session 7 (see "Decisions that must not regress"). Flagged it before writing; Miguel fixed the doc itself to restore "over 9,000 companies" (specifically "companies," not "teams") with the rating, so the shipped text matches the doc exactly, no override needed. Dropped the unused `CompareImages` import. Headings normalized to the site's sentence-case/no-ampersand convention as usual (`Problem & Context` → `Problem and context`, etc.), doc's `FIGMA:` placeholders left as-is (this doc wasn't asked to have them replaced with real paths, unlike food-save's). Build clean (7 pages, 0/0/0), all 8 figures verified rendering in order with 200s, no console errors.
- **Collapsed thumbnail + banner into a single cover image**, discussed and greenlit by Miguel after noticing the OG image (1200×630, 1.905:1) is nearly the same ratio as the banner (was 1920×960, 2:1). One export now covers the case page hero, the home + "more case studies" cards, and the per-case OG/share image, replacing the two-image-per-case system from session 16.
  - **Schema** ([config.ts](src/content/config.ts)): `thumbnail` field removed. `banner` is now the only cover field, documented as 1200:630, export 1920×1008 (previously 1920×960 for banner, 1200×900 for thumbnail).
  - **New unified ratio, 1200:630, everywhere a cover shows**: [CaseStudyCard.astro](src/components/CaseStudyCard.astro)'s `.card-media` (both the home-grid and the compact "more case studies" variant, which was `16:10`) and [CaseStudyLayout.astro](src/layouts/CaseStudyLayout.astro)'s `.cover-img` (was locked to `2:1`) all changed from their old ratios to `aspect-ratio: 1200 / 630`. `object-fit: cover` still guards against an export that isn't exact.
  - **Per-case OG image generated at build time from `banner`**, no more per-case static files needed: `CaseStudyLayout.astro` calls `getImage({ src: banner, width: 1200, height: 630, fit: "cover", format: "webp" })` and passes the result's `.src` straight to `BaseLayout`'s `ogImage` prop. `fit: "cover"` matters: without it, `getImage` preserved the source's own ratio and ignored the requested height (produced 1200×600 from the still-2:1 interim source, not 1200×630) rather than cropping to the requested box. The generic `og/default.png` (home/about/contact, [scripts/build-og-image.mjs](scripts/build-og-image.mjs)) is untouched, it's just the fallback now for pages with no `banner`.
  - **`BaseLayout.astro`'s `ogImage` prop simplified**: used to be a bare filename the layout concatenated with `base` (`"og/default.png"` → `${base}${ogImage}`), which can't accept an `astro:assets` result since `getImage()`'s `.src` already includes `base` itself. Now `ogImage` is a full site-root-relative path end to end (default value computed the same way, `` `${base}og/default.png` ``), and `BaseLayout` just does `new URL(ogImage, Astro.site)`.
  - **Assets renamed and unused files dropped**: `<PREFIX>-00-cover-banner.jpg` → `<PREFIX>-00-cover.jpg` for all three cases (`git mv`, history preserved); the three now-unused `<PREFIX>-00-cover-thumb.jpg` files deleted. All three mdx frontmatters updated to the single `banner:` field pointing at the renamed file.
  - **New 1920×1008 exports landed same session**: Miguel updated all three Figma covers in place (same node IDs, `FS-00-cover-banner`/`MFW-00-cover-banner`/`TF-00-cover-banner` frames resized from 1920×960 to 1920×1008, the separate thumb frames deleted from all three files). Re-exported and swapped in at the renamed paths. The `fit: "cover"` transitional crop mentioned above is no longer doing any real work now that the source matches the target ratio exactly, confirmed by the generated OG webp coming out at precisely 1200×630 (no longer 1200×600 short of target, which is what an unmatched ratio without `fit: "cover"` would have produced).
  - Build clean (7 pages, 0/0/0), browser-verified: OG meta tag resolves to a real `1200×630` webp per case study (verified pixel dimensions with the new sources, not just the URL), home cards and case-page hero both render at the new ratio with the actual new compositions, no console errors, no leftover `thumbnail` references anywhere in `src/`.
- **Home hero headline split into two visual beats** ([index.astro](src/pages/index.astro)), Miguel's follow-up once the single-block headline was live: "Hi! I'm Miguel." reads as its own line at the full size, then a gap, then "I design products from first sketch to first release and beyond." wraps on its own at a smaller size for hierarchy (Miguel supplied a reference screenshot of the target look). Markup: the `<h1>` now wraps two `<span>`s (`.hero-title-lead`, `.hero-title-body`) instead of one text node, still a single `<h1>` landmark. `.hero-title-body` is `font-size: 0.65em` (relative to the h1's own responsive `clamp(44px, 5.3vw, 72px)`, so it scales at every breakpoint without its own clamp) with slightly tighter `letter-spacing: -0.02em`. Both spans are `display: block` with `text-wrap: balance` set directly on each, since making them block-level splits the h1 into two separate wrapping contexts and balance doesn't inherit across that split. The `margin-bottom: 0.25em` gap between them is on `.hero-title-lead`, also em-based off its own (full) size. Browser-verified at 375/1440/1920px against Miguel's reference, no console errors, build clean (7 pages, 0/0/0).
- **Domain switch to migueljss.com, executed.** Miguel added DNS at his registrar (Namecheap): 4× A records on `@` to the GitHub Pages IPs (`185.199.108.153`–`.111.153`) and a CNAME on `www` → `dgigiu.github.io`. First pass had two of the four A records mistakenly on `www` instead of `@`; caught and corrected before proceeding. Once DNS was confirmed:
  - **astro.config.mjs**: `site` → `https://migueljss.com`, `base` removed entirely.
  - **public/robots.txt**: sitemap URL updated to `https://migueljss.com/sitemap-index.xml`.
  - **public/CNAME** created with `migueljss.com` (new file, wasn't in the repo before).
  - **Custom domain registered on GitHub Pages** via `gh api -X PUT repos/Dgigiu/mj-portfolio/pages -f cname=migueljss.com`. Confirmed via `gh api repos/Dgigiu/mj-portfolio/pages`: `html_url` now `http://migueljss.com/`, DNS already showing verified (`pending_domain_unverified_at: null`) since the records were in place first, HTTPS cert in progress (`https_certificate.state: "authorization_created"`, `https_enforced: false` until that finishes).
  - No other code changes needed: both `src/lib/paths.ts`'s `base` export and `BaseLayout.astro`'s staging-`noindex` guard were written back in sessions 10–11 specifically to self-resolve at this exact moment (base collapses to `/`, noindex clears because `Astro.site.hostname` no longer ends in `github.io`), and did.
  - Build clean (7 pages, 0/0/0), verified in the built output: all internal links root-relative (no `/mj-portfolio/` prefix), zero `noindex` occurrences, canonical/`og:image`/sitemap all point to `migueljss.com`, `CNAME` file present in `dist/`. Browser-verified the dev server serves correctly at `/` with no base prefix.
  - **Fully verified live, same session**: cert reached `"approved"` for both `migueljss.com` and `www.migueljss.com` within a couple minutes (DNS was already correct going in, so no waiting on propagation). Enabled `https_enforced` via `gh api -X PUT repos/Dgigiu/mj-portfolio/pages -F https_enforced=true` (note `-F` not `-f`, the endpoint rejects a string `"true"` for a boolean field). Confirmed live: `https://migueljss.com/` and sub-paths serve 200 with the correct content; `https://www.migueljss.com/` 301s to the apex; **old staging URLs redirect to the matching path on the new domain**, not just the homepage (`https://dgigiu.github.io/mj-portfolio/work/team-files/` → `https://migueljss.com/work/team-files/`, 301), better than the flat "path breaks" HANDOFF originally expected. Plain `http://migueljss.com/` returned 200 instead of redirecting right after flipping `https_enforced`; confirmed minutes later it was just edge-cache propagation lag, `http://` now correctly 301s to `https://migueljss.com/`. Domain switch is fully done, nothing left open.
- **PageSpeed Insights run on the live domain** (mobile): Performance 97, Accessibility 95, Best Practices 100, SEO 100. FCP 1.5s, LCP 1.8s, TBT 0ms, CLS 0, Speed Index 3.8s. The one accessibility deduction is a contrast finding on the home cards' `.card-summary`/`.card-meta`/`.card-cta`, traced to the `[data-reveal]` scroll animation's 0.75 pre-reveal opacity (Lighthouse snapshots off-screen cards mid-animation; the underlying colors pass AA at full opacity). Miguel confirmed this isn't a real issue and it should stay as-is, not a code fix; see [[project_lighthouse_contrast_false_positive]] in memory so a future audit doesn't re-flag it as new. Two minor performance insights noted but not acted on: cache lifetimes (~272 KiB, largely outside our control on GitHub Pages' CDN) and render-blocking requests (~1,170ms).

## What changed in this session (2026-08-29, session 18)

Full resync of [food-save.mdx](src/content/case-studies/food-save.mdx) from **[docs/Case Studies/cs-food-save-app.md](docs/Case Studies/cs-food-save-app.md)**, plus the first real image set for this case (previously all placeholders). Build clean (7 pages, 0/0/0), all 5 new images verified 200 in-browser and correctly wired into both the case page and the home card.

- **Images exported from Figma** (`RqT7cSB5meoG2VQu7ggWNo`, page "version 2") via the Figma MCP: `FS-02-library`, `FS-03-measure-detail`, `FS-04-tasklist`, `FS-05-home` (all PNG, 1600×1055, matching the existing UI-screen convention) and the cover, exported as **both** `FS-00-cover-banner.jpg` (1920×960) and `FS-00-cover-thumb.jpg` (1200×900). Only the banner frame was asked for, but a matching `FS-00-cover-thumb` frame already existed in the Figma page at exactly the 1200×900 target from the session-16 spec, so I exported it too rather than reusing the banner for both slots. This finally gives food-save the same two-image cover treatment myfoodways got in session 17 (the open item from that session). Format followed the established pattern exactly: jpg for the photographic cover (hand holding a phone), png for the UI-screen frames, scale 1, filenames matching frame names verbatim.
- **Old placeholder images deleted**: `FS-01-hero-cover.png`, `FS-01-hero.png`, `FS-03-tasklist.png` (content now `FS-04-tasklist.png`), `FS-04-home.png` (content now `FS-05-home.png`).
- **Whole-body rewrite from the doc**, same approach as session 17's myfoodways pass. New content folded in: a "Home" subsection under Design execution (previously the home screen had no dedicated write-up), a sentence about sharing a measure directly with a colleague in Measure library, and a closing Collaboration paragraph tying the user research back to the budget-saving implementation choice. Measure library and Measure detail are now two sequential `<Figure>`s instead of a `<CompareImages>` side-by-side, matching how the doc presents them as full multi-panel screens rather than single-screen comparisons; `CompareImages` import dropped since nothing uses it anymore in this file.
- **Bullet-list semicolons restored to match the doc**, consistent with [[feedback_bullet_list_punctuation]] and the immediately preceding commit that did the same for myfoodways: the UX design learnings list (previously plain periods, a leftover from session 6 before that convention was established) now uses semicolons with a final full stop, like every other list in this file.
- **Minor editorial smoothing kept from the pre-existing text over the doc's raw phrasing** in two spots, both same-meaning, not content changes: the Role section's "Moritz and Mark (Swiss Foodways team → United Against Waste)" stayed as flowing prose rather than the doc's arrow shorthand; the Part of a pair section's "Food Save suggested measures to adopt; the Waste Tracker showed..." kept its semicolon over the doc's comma splice.
- **Doc file itself updated too**: replaced all five `FIGMA:name` placeholders in `cs-food-save-app.md` with real relative paths to the exported assets, per this session's explicit request (the myfoodways doc was left with its placeholders after its session-17 resync; this is a deliberate difference this time, not an inconsistency to fix).

## What changed in this session (2026-08-28, session 17)

Full resync of [myfoodways.mdx](src/content/case-studies/myfoodways.mdx) from Miguel's **[docs/Case Studies/cs-myfoodways-app.md](docs/Case Studies/cs-myfoodways-app.md)** (edited with Claude Chat). First pass in this session had only folded in the images + accessibility section and left the rest of the older prose alone; Miguel flagged that his broader text edits weren't showing up, so this pass rewrote the whole body from the doc, not just the diff. Build clean (0/0), all images verified 200 + decoding in-browser, 8 figures render in the right order.

- **Whole-body rewrite from the doc.** Every section (Product, Problem and context, Research, Solution strategy, Key features, Accessibility, Collaboration, Impact and reflections) now matches the doc's current text. Only normalized two established, pre-existing site conventions that predate this case: sentence-case headings ("Problem and context" not "Problem & Context" — matches food-save.mdx/team-files.mdx) and curly quotes/apostrophes (per the "use typographic apostrophes and quotes" commit). Also US-spelled "Favorites" (doc had UK "Favourites") per the site's US English rule, and dropped bullets' trailing semicolons to match the site's no-trailing-punctuation list style.
- **Structural change carried over from the doc:** Problem and context now runs as two sequential single figures (problem image → paragraph → solution image) rather than the old side-by-side `<CompareImages>`. `CompareImages` import removed from this file since nothing uses it anymore.
- **Accessibility is its own top-level section** (`## Accessibility over time`), after Key features, before Collaboration. Two new figures in it: `MFW-07-accessibility.png` and `MFW-08-post-launch-changes.png`.
- **Covers switched to jpg.** Miguel exported both `.jpg` and `.png` versions of the covers on purpose (jpg for compression, since they're photographic). Switched `thumbnail`/`banner` to the `.jpg` sources and deleted the now-unused `.png` duplicates. Both jpgs confirmed exact target dimensions: thumb 1200×900 (4:3), banner 1920×960 (2:1).
- **Renamed on disk:** `MFW-01-hero.png` → `MFW-01-product.png`; `MFW-08-post launch changes.png` → `MFW-08-post-launch-changes.png` (spaces break JS imports).

### Open item for Miguel

- ~~`MFW-05-flexible-recipe2.png` still doesn't exist~~ — resolved (session 19, 2026-08-31): recipe2 was never a second screen, it was a newer version of the same recipe image. `MFW-05-flexible-recipe.png` is the current, correct file; no second figure needed. The doc's `cs-myfoodways-app.md` still has a stale "Let's cook" second-screen paragraph and `FIGMA:MFW-05-flexible-recipe2` placeholder left over from before this was resolved (gitignored staging file, not cleaned up).
- ~~The other two case studies (food-save, team-files) still point `thumbnail`/`banner` at their old single hero-cover placeholder~~ — food-save got its real images and two-image cover treatment in session 18; team-files got the same in session 19. All three case studies now have real, two-image covers.

## What changed in this session (2026-08-28, session 16)

Split the single case-study `cover` image into **two independent images per case** so Miguel can compose and crop the home card and the case-page hero separately. Miguel is producing the new images; this session was the code side. Build clean (`npm run build` → astro check + 7 pages, 0 errors).

- **Schema ([src/content/config.ts](src/content/config.ts)):** `cover` removed; replaced by two optional fields, `thumbnail` and `banner`. Each falls back to the other in code, so a case with only one image still renders everywhere.
- **Wiring:** [CaseStudyLayout.astro](src/layouts/CaseStudyLayout.astro) hero now uses `banner ?? thumbnail`; home cards ([index.astro](src/pages/index.astro)) and the "More case studies" list use `thumbnail ?? banner`. [work/[slug].astro](src/pages/work/[slug].astro) passes both through. `CaseStudyCard`'s prop stayed the generic `cover` (caller decides which image to feed it).
- **All three MDX files** (food-save, myfoodways, team-files) now set both `thumbnail` and `banner` to the existing `*-hero-cover.png` as a placeholder, so nothing breaks until the new images land.

### Image target sizes (for the new images)

- **Thumbnail (home + "more case studies" cards):** hard **4:3** crop, `object-fit: cover` trims overflow. Max on-screen width 456px; Astro emits 480/800/1200 variants. **Export 1200 × 900 px.** Keep key content off the edges (center-cropped) and clear of the rounded corners.
- **Banner (case study page hero):** locked to **2:1** (illustrative strip), enforced via `aspect-ratio: 2 / 1` + `object-fit: cover` on `.cover-img` so it reserves space (no layout shift) and crops any off-ratio export instead of distorting. Max on-screen width 960px (`--content-wide`); Astro emits 960/1440/1920 variants. **Export 1920 × 960 px.** Miguel chose 2:1 since the banner is now more illustrative than the old cover.

**When new images land:** drop files into `src/assets/case-studies/<slug>/`, point `thumbnail:` and `banner:` at them in each MDX frontmatter (currently both point at the same placeholder), then `npm run build`.

## What changed in this session (2026-07-01, session 14)

Design-system work, mostly in the **Figma** file (MJ Design System, `rUbsiKyYr0xITgTGVXJjJT`), plus a token wire-up in code. No site UI changed; the new accents have no consumer in the Astro site yet (there is no badge/annotation component), so this is design-system-only until those ship. Not yet browser-relevant, so no build/preview run.

- **Spacing + radius variables added to Figma** (Primitives collection): `spacing/0…40` (8pt grid, mirrors `tokens.css`, scoped WIDTH_HEIGHT + GAP) and `radius/none…pill` (scoped CORNER_RADIUS). Code already had these; this brought Figma to parity.
- **Second accent = gold `#e89e15`** ("accent 2"). Context: Miguel needs annotation badges (warning triangle, etc.) that read over case study screenshots; the old `status/warning` amber washed out. Gold is cobalt's near-complement. In Figma: new `gold/*` primitive ramp; the existing `accent2/*` semantic tokens were **repointed** from sienna to gold (they already backed the warning badge, so it flipped automatically).
- **Decoupled connector from badge.** Key finding: no gold can be both "gold" and dark enough to stay legible over the grey Figma board (a thin dashed line needs luminance contrast; gold is intrinsically light). So the badge carries the color and the **connector line goes neutral ink**. The Step Connector component's `Color=Warning` variant became `Color=Ink` (rebound to `ink/700`). `Color=Cobalt` left as-is. **Caveat for next session:** if the Step Connector is consumed as a library component in the case-study working file, those instances may need reattaching after the variant rename.
- **Icon contrast fix (AA).** White over gold is only ~2.3:1 (fails). The warning glyph now uses a new `accent2/on-accent2` token → `ink/900` (`#181818`, ~7.8:1). The cobalt star glyph keeps white `fg/on-accent`. So "on-accent" is per-accent now: white on cobalt, ink on gold.
- **Sienna `#b8420a` kept as "accent 3"** (optional, minimal details, nothing uses it yet). New `accent3/*` tokens aliased to the `sienna/*` primitives. Figma colors page reorganized: sections now Cobalt · accent → **Gold · accent 2** → Sienna · accent 3.
- **Wired into [tokens.css](src/styles/tokens.css):** added `--accent2*` (+ `--accent2-on: var(--ink-900)`) and `--accent3*` blocks after the cobalt accent, with matching dark-mode overrides. `--accent2-on` intentionally stays `--ink-900` in dark mode too (gold badge stays light in dark, so its glyph stays dark).
- **DESIGN.md not regenerated** — its color frontmatter/prose still describes only cobalt. Regenerate with `/impeccable document` when convenient, or leave until the accents actually appear in the UI.

## What changed in this session (2026-07-01, session 15)

Ran `/impeccable document` (refresh mode) to bring [DESIGN.md](DESIGN.md) and its sidecar [.impeccable/design.json](.impeccable/design.json) up to date with what's actually shipped and tokenized; no site code changed. Also updated the impeccable skill itself, v3.5.0 → v3.9.0 (`npx impeccable skills update`).

- **Gold/sienna documented as reserved, not live.** Added Secondary (gold `#e89e15`) and Tertiary (sienna `#b8420a`) color groups to DESIGN.md, both marked token-only with a new **Reserved Accent Rule**: neither has a consumer in the shipped site (the annotation-badge component they were built for hasn't been built), so nothing should reference `--accent2`/`--accent3` yet.
- **Fixed a real inaccuracy, not just an omission.** The prior DESIGN.md's "One Blue Note Rule" claimed cobalt appears only at interaction points, which the shipped site has contradicted since session 12 (full-bleed hero panel, hero glow, contact band, footer strip are all non-interactive cobalt). Added a **Sanctioned Surfaces Rule** naming the four approved uses explicitly, so the doc now matches HANDOFF's "Decisions that must not regress" instead of silently disagreeing with it.
- **Documented two components that existed in code but not in the doc:** the Case Study Card's benefit standfirst line (serif, primary ink, deliberately not cobalt) and a new "Cobalt Band" signature component covering the ContactOutro/Footer pairing (two-tone full-bleed cobalt, shared hover-to-Cobalt-Line pattern).
- **Do's and Don'ts** gained matching entries: gold-on-white AA failure (2.3:1, use Gold-On-Ink `#181818` instead), and a guard against adding a fifth full-bleed cobalt surface without the same sign-off the original four got.
- Sidecar `.impeccable/design.json`: added `colorMeta` tonal ramps for gold/sienna, a new "Cobalt Band" component snippet, and synced `narrative` (rules/dos/donts) verbatim with the DESIGN.md prose.

## What changed in this session (2026-06-15, session 13)

Two mobile fixes Miguel spotted on his phone. Both shipped to `main` (deploy green); browser-verified at zero-inset for no regression, build clean (7 pages, 0/0/0). The dynamic-island fix was confirmed on-device (landscape, Brave).

- **Nav baseline alignment** ([Nav.astro](src/components/Nav.astro)): `.nav-inner` went `align-items: center` → `align-items: baseline`. The wordmark is `--text-lg` and the links `--text-md`; centering two sizes left their text baselines offset (the larger wordmark sat lower). Baseline alignment sits them on the same line.
- **Safe-area insets / dynamic island** ([BaseLayout.astro](src/layouts/BaseLayout.astro), [global.css](src/styles/global.css)): in landscape on Brave, container text slid under the dynamic island; Safari looked fine. Cause: no `viewport-fit=cover` on the viewport meta, so `env(safe-area-inset-*)` resolved to 0 and only Safari silently inset the layout. Fix: added `viewport-fit=cover`, and `.container` now pads with `max(var(--container-pad), env(safe-area-inset-left/right))`. Insets are 0 in portrait and on non-notched devices, so padding falls back to `--container-pad` unchanged (verified: 33.76px at 844px wide, identical to before). Side effect to know: with `viewport-fit=cover` the full-bleed bands (hero, contact, footer) now extend under the island area too, which is correct since they're meant to be edge-to-edge color/image. `Figure.bleed` still breaks out by `--container-pad` only, so a bleed figure stays just inside the island inset in landscape (acceptable, landscape-only edge case).

## What changed in this session (2026-06-12, session 12)

A "more impactful home page" pass that started as a `/ui-ux-pro-max` exploration (three directions mocked: refined, full-cobalt poster, hybrid; Miguel picked the **hybrid**) and grew into a full home-page rework plus a case-page cleanup. Shipped across several commits, each browser-verified and `astro check` / `npm run build` clean (7 pages, 0/0/0). Headline sizing and the exit veil were tuned live with Miguel. Several changes deliberately widen where cobalt is allowed (see the note in "Decisions that must not regress"). Everything below is live on `main`.

- **Louder, more graphic hero** ([index.astro](src/pages/index.astro)): added a single `.hero-glow` element, a deeper-cobalt bloom (`--accent-press` radial via `color-mix`) anchored to the top edge (`at 80% -12%`, `opacity: 0.9`), behind the portrait and vignette (`z-index: 0`). First pass sat it in the top-right corner at 0.55 and was invisible (hidden behind the portrait, and `--accent-press` is close to the panel value); moving it to the top edge where bare cobalt shows and raising the opacity made it read as a tonal field (deep cobalt up top, brand cobalt lower). Same hue family, so it's depth, not a second color. Hero copy and structure are otherwise unchanged (the minimal-hero decision still holds: no eyebrow, no meta line, chevron only).
- **Outcome-led work cards** ([CaseStudyCard.astro](src/components/CaseStudyCard.astro)): reordered to **title → benefit → description → meta → CTA** (was meta → title → summary → CTA). The benefit is a new serif standfirst in primary ink at `--text-lg`; the description follows in `--text-md` secondary. Benefit is intentionally **not** cobalt (it is static, not interactive) so the only blue on a card stays the "Read the case study" CTA. Compact variant (the "More case studies" grid) is untouched: still meta-above-title, no benefit/description.
- **New `benefit` field** ([config.ts](src/content/config.ts), optional string) added to all three case studies, authored as the summary's first sentence. The card strips it from `summary` (`startsWith` slice) to form the description, so nothing is printed twice. The full `summary` is unchanged and still single-sources the case-page lead and SEO/OG description.
- **Cobalt contact band** ([ContactOutro.astro](src/components/ContactOutro.astro)): the shared outro is now a full-bleed `--accent` band with white text (matching the hero's white-on-accent contrast treatment, `rgba(255,255,255,0.92)` for body). Content is unchanged (Get in touch, availability line, email at title scale, LinkedIn/CV secondary); the email and secondary links went white with an `--accent-line` hover. Applies on home and every case page (about/contact do not use it).
- **Darker-cobalt footer** ([Footer.astro](src/components/Footer.astro)): the legal/copyright strip is now an `--accent-press` band with white-ish text (`rgba(255,255,255,0.78)`), replacing the paper strip with the hairline top border. Its old `margin-top: --space-24` gap was removed, so on home/case pages it sits flush under the `--accent` contact band as a two-tone cobalt foot; on about/contact (no band above) it's a self-contained end-cap below the paper content, which keeps its own bottom padding. This is a fourth sanctioned non-interactive cobalt surface.
- **Two-line headline** ([index.astro](src/pages/index.astro)): "Calm products for complex work." is forced to two lines via a responsive `<br class="hero-break">` (dropped below 480px, where it wraps naturally). Font ceiling is `clamp(44px, 5.3vw, 72px)` and the text column went 560 → 600px. The 5.3vw rate (not steeper) is deliberate: it holds 72px down to ~1360px then eases the title smaller through the laptop range so the second line clears the portrait, which sits closer to the text as the viewport narrows. A fixed 72px overlapped the figure by ~50px at 1200px. Pixel-verified clear (glyph edge vs. the figure's opaque pixels) 1100–1440px. The whole block is nudged down `--space-12` via `transform: translateY`.
- **Hero scroll exit veil** ([index.astro](src/pages/index.astro)): a `.hero-veil` curtain (gradient transparent → translucent `--accent-press` at 70% via `color-mix` → solid deep navy `#080e20`, the vignette's navy; opacity ramps across the stops so the mid band stays readable and only the bottom edge fully covers) parked one panel height below the hero (`top: 100%`), so it's invisible at rest, without JS, and under reduced motion. The existing rAF scroll handler raises it via `--veil-shift` at `VEIL_RATE = 0.8` of scrollY (capped at 1.25× panel height); added to the panel's own scroll travel it climbs at ~1.8× and washes the portrait in cobalt-to-navy as the hero exits. Sits above the portrait but below the text (`z-index: 3`), so the headline stays legible. Rate was tuned with Miguel live: tried 1.0 and 0.9, both read too fast; landed on 0.8.
- **Removed the case-page skim layer** ([CaseStudyLayout.astro](src/layouts/CaseStudyLayout.astro), [[slug].astro](src/pages/work/[slug].astro)): the "On this page" anchor row (added session 11) is gone, Miguel found it unnecessary for these short case studies. Dropped the `.case-toc` markup and styles, the `tocEntries`/`headings` prop, and the `headings` pass from `[slug].astro`. Kept `scroll-margin-top` on prose h2s (still useful for any deep-link anchor). Do not re-add the TOC.
- Parked idea saved to memory (`project_featured_case_idea`): a larger "featured" case row, revisit at 4+ case studies. Miguel declined it now as over-emphasizing one of three.

## What changed in this session (2026-06-11, session 11)

Installed the **impeccable** design skill (`npx impeccable skills install` → `.claude/skills/impeccable/`, plus a `.github/` copy) and ran its `init` flow. No site code changed.

- **PRODUCT.md** (new, project root): strategic design context. Register: brand. Captures audience, purpose (incl. Porto remote/hybrid constraint), personality, anti-references, five design principles, accessibility commitments. Miguel's note: Linear/Vercel are a calibration for restraint, not a look to copy; "tech-minimal mimicry" is now a named anti-reference.
- **DESIGN.md** (new, project root): visual system spec in the Stitch DESIGN.md format, generated from `tokens.css` and the shipped components. North Star: "One Blue Note". Accent named "Working Cobalt". Descriptive only: `src/styles/tokens.css` remains the canonical token source.
- **`.impeccable/design.json`**: sidecar with shadow/motion/breakpoint tokens and rendered component snippets for impeccable's live panel.
- **`.impeccable/live/config.json`**: live mode preconfigured (inject into BaseLayout.astro before `</body>`; no CSP in the project).
- **CLAUDE.md**: added a "Design context" section pointing at PRODUCT.md and DESIGN.md.
- Note: future impeccable commands (`/impeccable critique <page>`, `audit`, `polish`, ...) read PRODUCT.md and DESIGN.md first. The skill's scripts were blocked by the permission classifier this session; the init flow was executed manually from the skill's reference docs.

Later in the session: ran `/impeccable critique` (site-wide, scored 34/40, snapshot in `.impeccable/critique/`), and Miguel approved fixing everything it raised. Changes shipped:

- **Custom 404** ([src/pages/404.astro](src/pages/404.astro)): wordmark voice, links to Work and Contact. Built `404.html` confirmed in dist; excluded from the sitemap. Matters for the domain switch (old `/mj-portfolio/...` URLs will 404 on the new domain).
- **Shared contact outro** ([src/components/ContactOutro.astro](src/components/ContactOutro.astro)): home and case study pages now end on the same beat; the email address is the one line at title scale (cobalt, clamps xl to 3xl). Replaced the old inline outro on the home page; case pages gained it after "More case studies".
- **Case study skim layer**: `[slug].astro` passes `headings` from `entry.render()` into CaseStudyLayout, which renders a quiet "On this page" anchor row (h2s only) under the header meta. Prose h2s carry `scroll-margin-top: var(--space-24)` to clear the sticky nav (verified: anchor lands at 96px, nav is 81px).
- **Section h2 parity**: home "Selected work" / outro / "More case studies" headings dropped their `--text-xl` overrides and now sit at the default `--text-2xl` (26px), matching card titles.
- **About portrait reframed, not shrunk**: full prose-column width (720, was capped at 320) on an `--ink-900` field with `--radius-md`. The PNG is a transparent cutout; the ink field restores the original photo's dark strip so the figure sits in a composition. `widths` raised to [720, 1080, 1440].
- **Nav tap targets**: invisible `::before` hit-area expansion on `.nav-link` (44px floor met); TOC links got `padding-block: var(--space-1)`.
- **Team Files content**: removed the Product-section figure that nearly duplicated the page cover (TF-01-hero.png, import dropped; **Miguel should veto if he wants it back**, git has it). Rating copy now reads "average Atlassian Marketplace rating around 3.7 stars out of a possible 4".
- **tokens.css**: header comment em dash replaced with a colon (the site's no-em-dash rule).
- **Retina finding withdrawn**: the critique flagged possible figure softness on retina; verified the srcset serves up to 1600w for the 800px slot, the preview browser was just emulating DPR 1 selection. No change needed.

Verification: `npm run build` clean (7 pages, 0 errors / 0 warnings); browser-checked home, Team Files (anchors, TOC, outro), About, 404 at 1280 and 375; console clean.

**CV wired in** (same session, after Miguel provided the PDF): the CV lives at [public/miguel-jesus-cv.pdf](public/miguel-jesus-cv.pdf) (served at `/miguel-jesus-cv.pdf` under the base). Linked from the contact page channels list (CV row, "Open the PDF") and from the shared outro's secondary line on home and case pages. Links use the `base` helper and open in a new tab. Verified: HEAD request returns 200 `application/pdf`; build clean. **When the CV changes, replace the file in `public/` and keep the same filename** so shared links keep working; the Dropbox source is now `2026-01 Portfolio MJ + AI/Miguel Jesus - CV - Senior Product Designer.pdf` (renamed in session 22).

**Still open from the critique**: hero headline swap (Miguel to drive, pre-dates the critique).

## What changed in session 10 (2026-06-10)

Maintenance pass from a second "what would you have done differently" review. No visual or copy changes.

- **Staging noindex** ([BaseLayout.astro](src/layouts/BaseLayout.astro)). GitHub redirects the github.io host to the custom domain at switch time but keeps the path, so any indexed `/mj-portfolio/work/...` URL would 404 on `migueljss.com`. All pages now carry `noindex` while `site` is a github.io host; nothing to undo at switch time.
- **Brief status banners.** Both briefs in `docs/` now open with a note that the shipped design system (handoff bundle + tokens.css) supersedes their visual sections. They had drifted badly (old `#F0F0F0` background, Aeonik/Inter type, HeroGradient, card blue hover wash) and CLAUDE.md tells every cold session to read them as authority.
- **HANDOFF.md restructured** (this file). Sessions 1 to 8 compacted into a history section; durable review-driven decisions moved to "Decisions that must not regress." Fixed two stale claims: two sections both titled "this session," and fonts still described as variable `.ttf` after the session 8 woff2 conversion.
- **gitignore**: now ignores all of `.claude/` (was only `settings.local.json`) and `.obsidian/` (Miguel opens the repo as an Obsidian vault; its workspace state was sitting untracked).
- **Shared base helper** ([src/lib/paths.ts](src/lib/paths.ts)). The `BASE_URL` normalization was copy-pasted in four files (BaseLayout, Nav, index, CaseStudyLayout); now a single import, and one place to simplify when the base path goes away.
- **Slug passed as a prop.** [src/pages/work/[slug].astro](src/pages/work/[slug].astro) passes `entry.slug` into CaseStudyLayout for the "More case studies" exclusion; the layout no longer reverse-engineers the slug from the pathname with a base-path regex.
- **Card image `sizes`** ([CaseStudyCard.astro](src/components/CaseStudyCard.astro)): added `(min-width: 1040px) 456px`. The card media column never exceeds 456px inside the 1040 border-box container (minus padding and gap), so wide and retina screens stop requesting oversized sources.
- **@font-face cleanup** ([tokens.css](src/styles/tokens.css)): each face listed the same woff2 URL twice (`woff2-variations` plus `woff2`); now a single `format("woff2")`.

**Left alone on purpose**: the dark-theme token block in tokens.css stays as testing scaffolding (unreachable without `data-theme="dark"`).

**Verification**: `npm run build` clean (6 pages, 0 errors / 0 warnings). Built HTML checked: `noindex` present on all six pages, new `sizes` attribute rendered, and the team-files page's "More" section links only to the other two studies.

## What changed in session 9 (2026-06-10)

Subtle motion across the site. Miguel asked for ideas, picked the "starter set," and confirmed the brief's blanket motion ban should be relaxed. The policy lives in [docs/portfolio-brief-claude-design.md](docs/portfolio-brief-claude-design.md) ("Motion" section), with pointers in the code brief and CLAUDE.md: transform/opacity only, under ~400ms or scroll-driven, text never animates, everything respects `prefers-reduced-motion` and works without JS.

**Hero parallax** ([index.astro](src/pages/index.astro))
- `.hero-portrait` lags the scroll at 12% (capped at 48px) via a `--parallax-y` custom property fed by a rAF-throttled scroll handler. Text stays static. Uses the individual `translate` CSS property.
- A one-time scale "settle" on load shipped alongside it but Miguel rejected it on review (too theatrical); removed same session.

**Scroll reveals** ([global.css](src/styles/global.css), [BaseLayout.astro](src/layouts/BaseLayout.astro), [index.astro](src/pages/index.astro), [CaseStudyLayout.astro](src/layouts/CaseStudyLayout.astro))
- Generic `[data-reveal]` mechanism on the home card list and the "More case studies" grid, revealed once by an IntersectionObserver.
- Tuned per Miguel's review: deliberately faint. Opacity starts at 0.75 (never alpha 0; Miguel raised it from 0.6 after seeing it live), travel is 8px (`--space-2`), 450ms ease-out, no stagger, observer fires at threshold 0 so the ease finishes before the card is far into view. First version (alpha 0, 12px, 60ms stagger, threshold 0.1) read as chunky.
- The pre-reveal state is double-gated: `html.js` (set by an inline script in BaseLayout head, so no-JS users always see content) and `prefers-reduced-motion: no-preference` (reduced-motion users never get dimmed content either).
- New token: `--duration-reveal` (450ms).

**Micro-interactions** ([CaseStudyCard.astro](src/components/CaseStudyCard.astro), [Nav.astro](src/components/Nav.astro))
- Card hover lift: the cover frame rises 2px alongside the existing shadow deepen, and the image scales to 1.01 inside it. Media only, card text never moves. Reduced-motion resets both.
- Nav underline ease-in: the hover underline rises in from 3px below with a fade over `--duration-fast` (Miguel preferred bottom-up over the left-to-right grow shipped first). The `border-bottom` became a `::after` pseudo-element (same 2px, same position); active state is unchanged visually (full accent underline), hover is the muted grey one.

**Zoom dialog scale** ([BaseLayout.astro](src/layouts/BaseLayout.astro))
- The existing fade (via `@starting-style` + `allow-discrete`) now pairs with `scale` 0.97 → 1 on open and back down on close. Same durations as the fade (400ms open, 200ms close); the existing reduced-motion override covers it.

**Verification**: build clean; DOM checks for parallax cap, reveal settle states, and dialog open/close path; hero screenshot confirmed no visual regression at rest.

## Decisions that must not regress

Review-driven calls from past sessions. Future sessions should not "fix" these back.

- **No hero entrance animations.** A load-time settle was tried in session 9 and rejected as too theatrical.
- **Reveals stay faint**: opacity from 0.75 (never alpha 0), 8px travel, no stagger, observer threshold 0.
- **Hero content is deliberately minimal**: no "Portfolio · 2026" eyebrow, no Porto/availability/email meta line (both removed on purpose; do not restore). Scroll affordance is the left-aligned chevron only.
- **Cobalt now has four sanctioned non-interactive uses** (session 12, Miguel-approved, widening the old "links/focus/current only, never decorative" rule): the full-bleed hero panel (pre-existing), the `.hero-glow` tonal bloom, the full-bleed `--accent` contact band, and the `--accent-press` footer strip. All stay within the cobalt hue family (`--accent` / `--accent-press`); the rule still holds everywhere else, and per-card the only blue is the CTA. Do not "restore" calm by stripping the glow, the band, or the cobalt footer.
- **Work-card order is title → benefit → description → meta → CTA** with the benefit a serif standfirst in primary ink (not cobalt). The compact "More case studies" variant intentionally keeps the old meta-above-title layout.
- **Hero portrait has no width cap** (capping shrank the figure; Miguel rejected shrinking). The right anchor freezes at 1440 and centers beyond it. The mobile framing shift is a fixed-pixel `right: -220px` because the image width is panel-height-driven, so a percentage would vary the framing across phone widths.
- **Accent is `#155fe8`**, darkened in session 5 from the v2 delta's `#1a6bff`, which failed WCAG AA at 4.31:1 on the canvas.
- **`--fg-muted` (#8d8d8d) is decorative-only.** Text that needs to be readable uses `--fg-tertiary` or darker (session 5 contrast pass).
- **On `.container` sections, use `padding-block`, never the `padding` shorthand.** The shorthand zeroes the container's safe-zone `padding-inline`. This bug shipped twice (about/contact fixed in session 3, "More case studies" in session 8).
- **Team Files reach figure is "over 9,000 companies"** everywhere it appears (standardized in session 7).
- **Geist italic faces are intentionally absent**: nothing uses italic sans or mono; browsers synthesize if ever needed.
- **No em dashes anywhere** (design strings, docs, alt text, error messages). Use a period, colon, parentheses, or rewrite.

## Session history (condensed)

Per-session detail beyond this lives in the git log; commit messages carry the same narrative.

- **Session 8 (2026-06-10)**: corrections pass from the first "what would you have done differently" review. Default OG image generated ([scripts/build-og-image.mjs](scripts/build-og-image.mjs); it had 404ed since session 1). Fonts converted to woff2 (~1MB → ~270KB, [scripts/convert-fonts.mjs](scripts/convert-fonts.mjs)). Dead code deleted (HeroGradient, old square portrait, tokens compat aliases; `--container-pad` promoted to a real token). Type scale moved from px to rem. CLAUDE.md corrected to match reality. "More case studies" container padding fixed.
- **Session 7 (2026-06-09)**: nav polish (snug tracking on links; muted grey hover underline after trying pill, accent, and heavier greys) and a copy refresh (hero blurb, Team Files and Food Save summaries, about bio). Confirmed the `summary` frontmatter single-sources three surfaces: homepage card, case page hero blurb, and meta/og description.
- **Session 6 (2026-06-09)**: case study content refresh from updated source docs in `docs/Case Studies/`. All three rewritten: Team Files gained the TOPDOX origin story, NN/g heuristic review, "Beyond the product" section; MyFoodways gained the three-screen onboarding structure and the "Accessibility inside a fixed brand" white-on-yellow story, with the period corrected to March 2018 to December 2020; Food Save gained the Waste Tracker "Part of a pair" section and an honest discontinued-with-the-program reflection. Content only.
- **Session 5 (2026-05-30)**: hero polish (mobile portrait anchored right; desktop portrait lifted above the vignette), `apple-touch-icon` + favicon refresh ([scripts/build-app-icon.mjs](scripts/build-app-icon.mjs)), WCAG AA contrast pass (accent and `--ink-400` darkened; text uses of `--fg-muted` moved to `--fg-tertiary`), responsive hero LCP preload via a named head slot. Lighthouse mobile reached 100/100/100/100 on the live site.
- **Session 4 (2026-05-29)**: hero portrait rework. New wide transparent cutout (`miguel-portrait-color-wide.png`, figure offset right), layered full-bleed composition: portrait sized by panel height, navy radial vignette for text legibility, bottom hairline, text column capped at 560, frozen 1440 right anchor. Prose list markers moved from `::marker` to positioned `::before`.
- **Session 3 (2026-05-29)**: v3 polish from a structured critique. Page container 1200 → 1040, prose 640 → 720, case-study spine unified on one left edge, about header rebuilt as a single 720 column with inline portrait, `padding-block` fix on `.about`/`.contact`, hero vignette softened at desktop, contact page expanded with response-time and open-to rows.
- **Session 2 (2026-05-28)**: Claude Design v2 delta applied. Cobalt accent, neutralised paper scale (`#fbfaf6` canvas), full-bleed cobalt hero with the color portrait cutout (after fixing text overlap and crop issues with the b&w original), en-dash list bullets.
- **Session 1 (2026-05-28)**: full design system implementation. Paper/ink/accent tokens, self-hosted Aleo + Geist + Geist Mono, all components and pages restyled (wordmark nav, borderless cards, case-study header block, zoom dialog token cleanup).

## What's live

- **Stack**: Astro 5 + MDX + sitemap, TypeScript strict, plain CSS with design system tokens, self-hosted Aleo + Geist + Geist Mono (variable woff2 in `src/assets/fonts/`)
- **Routes**: `/`, `/about`, `/contact`, `/work/team-files`, `/work/myfoodways`, `/work/food-save`
- **Design system**: Claude Design handoff v1 + v2 delta both applied. Paper/ink/single-accent palette (accent `#155fe8` after the AA darkening). Aleo serif for prose, Geist sans for all UI/display. Tokens in [src/styles/tokens.css](src/styles/tokens.css).
- **Components**: Nav, Footer, CaseStudyCard (`compact` variant), Figure, CompareImages, Quote, Stat
- **Layouts**: BaseLayout (head, OG meta, font preloads, zoom dialog, staging noindex), CaseStudyLayout (header block + cover image + body + "More case studies")
- **Pages**: Home (full-bleed cobalt hero with color portrait cutout + card stack), About (portrait + intro, prose below), Contact (channels list)
- **Assets**: wide color portrait cutout at `src/assets/brand/miguel-portrait-color-wide.png` (Home hero), b&w landscape portrait at `src/assets/brand/miguel-portrait.png` (About), case study images under `src/assets/case-studies/`, design system bundle at `docs/design_handoff_design_system/` (gitignored staging)
- **Motion** (session 9, + hero exit veil session 12): hero portrait scroll parallax, hero scroll exit veil, faint card reveals, zoom dialog scale, card hover lift, nav underline ease-in. Policy in the design brief's Motion section.

## Open items / look at these next

### Re-verify on the live site
- ~~Share-sheet icon on iOS~~ — resolved session 20: the icon itself (`apple-touch-icon.png`) was already correct; the actual bug was the default OG image's square crop cutting off text mid-word. Fixed by centering the composition. iOS caches aggressively, so if the old cropped preview still shows, force-quit Safari or clear site data (Settings → Apps → Safari → Advanced → Website Data) before re-checking.

### Fine-tuning (Miguel to drive)
- ~~Hero copy~~ — resolved session 19: swapped to the more conversational "Hi! I'm Miguel..." headline.

### Design system notes
- Geist as display/UI sans (substituting DIN Alternate from the Figma); Aleo as body serif
- No Lucide icons yet; nav and footer are text-only and work fine. v2 spec locks Lucide @ stroke 2.0 when added.
- Dark-theme tokens exist in tokens.css but are not wired to a toggle; reachable via `data-theme="dark"` for testing.

### Still to do
- ~~Per-case-study OG images~~ — done, session 19: each case study now generates its own 1200×630 OG image at build time from its `banner`, as part of the cover-image unification (see the changelog entry above). `scripts/build-og-image.mjs`'s output is now only the fallback for pages with no `banner` (home/about/contact).
- **Two new case studies on hold.** `docs/Case Studies/cs-board-game-app.md` and `cs-office-editor.md` are written but not on the site. When ready, each needs cover/inline images under `src/assets/case-studies/<slug>/`, a new `.mdx` in `src/content/case-studies/`, and an `order` value in the frontmatter.
- ~~Switching to migueljss.com~~ — done and fully verified live, session 19 (custom domain, HTTPS enforced, old staging links redirect correctly). Nothing left open here.
- **Case study updates.** Edit the mdx directly (it's the source of truth since session 25). `docs/Case Studies/` is obsolete for published cases; only the two unpublished drafts there still matter.

## Quick reference

**Dev commands**
```
npm run dev       # http://localhost:4321/
npm run build     # astro check && astro build
npm run preview
```

**Key files**
- Tokens: [src/styles/tokens.css](src/styles/tokens.css)
- Global styles: [src/styles/global.css](src/styles/global.css)
- Typography + `mj-*` utilities: [src/styles/typography.css](src/styles/typography.css)
- Base path helper: [src/lib/paths.ts](src/lib/paths.ts)
- Design system reference: [docs/design_handoff_design_system/README.md](docs/design_handoff_design_system/README.md)
- Design system v2 delta: [docs/design_handoff_design_system_delta/README.md](docs/design_handoff_design_system_delta/README.md)
- Case study source of truth: `src/content/case-studies/*.mdx` (`docs/Case Studies/` holds only unpublished drafts that still matter)

**Conventions**
- Canvas is warm off-white `#fbfaf6` (`--bg-canvas`). No pure white anywhere.
- No em dashes anywhere. Use a period, colon, parentheses, or rewrite.
- Single accent: cobalt (`--accent`, `#155fe8`). Links, focus, current state only. Never decorative.
- 8pt spacing grid. Use `--space-*` tokens, no magic numbers.
- One `h1` per page; visible focus rings; respect `prefers-reduced-motion`.
- US English, sentence case everywhere, no marketing fluff.

**Memory items (in user's Claude memory store)**
- `feedback-location-preference`: Porto, remote/hybrid only, no relocation
