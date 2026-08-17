# CLAUDE.md — spencer-portfolio

Persistent context for Claude Code. **Read this first every session, then run
`git log --oneline -15` and `git status` to establish the current state before
making any changes.**

## Project

Personal portfolio for Spencer Lewis (recent UVA CS grad targeting product
design roles). Live at spencerhlewis.com. A full redesign is in progress —
designed in Figma, built here, deployed on Vercel.

## Stack

- Static site: semantic HTML, CSS, vanilla JS. No framework, no CMS, no backend.
- Three self-hosted fonts (woff2) in `/assets/fonts`, `font-display: swap`.
- Images: WebP with PNG fallback, lazy-load below the fold, alt text on all.
- Playwright is set up to screenshot output at 1400px and 390px.
- Deploy: Vercel. `main` serves live; merge `redesign` → `main` to launch.

## Branches

- `main` — v1, currently live. Do not touch until launch.
- `redesign` — the rebuild branch. All redesign work goes here.
- `v1-archive` — frozen v1 backup.

## Source-of-truth documents (read these)

- `build-spec.md` — full design system: tokens, type scale, grid, components,
  responsive rules, per-asset placement. Authoritative for all values.
- `handoff-v2.md` — project narrative and structure overview.
- `screenshots/` — the Figma reference exports. **These outrank `build-spec.md`
  where they conflict**, because they capture proportions the spec didn't
  encode:
  - `homepage-layout.png` — desktop homepage (authoritative layout)
  - `mobile-homepage-layout.png` — homepage at mobile width
  - `herakify-case-study.png` / `harmony-case-study.png` / `yakabod-case-study.png`
  - `multimedia-gallery.png`

## Design system (summary — `build-spec.md` is authoritative)

"Woodblock + Mono": warm bone ground, ink text, one accent per project.
Graphic, high-contrast, illustrative — deliberately not white-background
minimalism.

- **Colours:** `--bone #F4EFE6` (page bg, NEVER substitute white),
  `--bone-deep #EAE3D6`, `--ink #1A1613`, `--ink-soft #3D3630`,
  `--muted #8A8175`, `--vermillion #C1392B` (sitewide accent + Multimedia),
  `--jade #1F5C4A` (Harmony), `--ochre #D89B2C` (Herakify), `--border #D6CDBE`.
  Never more than two accents in one viewport.
- **Type:** Instrument Serif (display, never <22px), Archivo (body),
  JetBrains Mono (labels/meta, never >14px). Labels and section markers are
  ALWAYS uppercase.
- **Signature element — two-tone image field:** container split vertically,
  left 39% bone-deep, right 61% project accent, hard edge, 4px radius; image at
  82–88% height, centred at 42% width so it straddles the seam.
- No drop shadows anywhere. Separation comes from the bone-deep fields.

## Intentional divergences from build-spec / Figma (do not "fix" these back)

These are deliberate calls, not drift. If a future check compares against
`build-spec.md` or the `screenshots/` PNGs and flags one of these, the
divergence is correct — the source doc is what's stale.

- **Shared container widened:** ~1432px → ~1680px max-width, desktop
  padding-inline 96px → `clamp(24px, 4vw, 48px)`. Nav (`.nav__inner`) and
  content (`.grid`) share these same numbers so they move together and stay
  aligned. 768px and mobile padding are unchanged. Figma's column is 1240px;
  this is a deliberate widen, not a regression against
  `homepage-layout.png` — don't narrow it back to match that screenshot.
  **Body copy stays capped at 640px regardless** (build-spec §3): hero
  tagline, About paragraphs, band descriptions all use `.reading-column` /
  their own `max-width: 640px`, decoupled from the container — only
  structural columns (nav, bands, two-tone fields, section frames) widen.
- **Hero `display-xl` enlarged:** desktop is now
  `clamp(128px, 11vw, 156px)`, not build-spec's flat `120px` — Spencer wants
  the name bigger. Lands ~148px at 1349px, caps at 156px by ~1512px. The
  `9ch` max-width on `.hero__name` still forces the two-line SPENCER / LEWIS
  wrap at this size (verified at 390/1349/1512/1680px) since `ch` scales
  with font-size. Mobile is untouched (still flat `56px`).
- **Project marks fill ~90% of the accent square**, not build-spec §7's
  stale "65%" — see Gotchas below for how.

## Working method (follow this)

1. Small verified steps: build or fix one section, screenshot at 1400 **and**
   390, then move on. Commit after each.
2. Verify **visually against the reference PNGs** in `screenshots/`, not only by
   checking computed values against `build-spec.md`. Every problem so far has
   been something the spec didn't capture (proportion, casing, spacing rhythm) —
   a passing computed-value check does not mean it matches the design.
3. When a spacing value in the reference doesn't land on an 8px token, **measure
   the PNG and use the real value** — do not snap to the nearest token. The
   design's rhythm is not on an 8px grid (e.g. band gaps are ~129px, not 96px);
   snapping systematically reads too tight.
4. **Commit AND push after each verified step.** (History: the entire homepage
   build once lived only on one machine, uncommitted. Don't repeat that.)

## Homepage structure

Nav (sticky) · Hero (name + tagline + mono meta row, jaguar upper-right with
caption) · Selected Work (four bands, alternating image left/right on desktop,
stacked single-column on mobile — Herakify=ochre, Harmony=jade, Yakabod=muted,
Multimedia=vermillion) · About strip (inverted `--ink` bg, text left, portrait
right) · Footer.

## Gotchas learned (don't rediscover these)

- **Nav alignment + background:** the nav must be a full-bleed bone bar
  (background spans 100% width) with an **inner wrapper**
  (`max-width: 1680px; margin-inline: auto` — same max-width as `.grid`, kept
  in sync) holding the logo and links. Putting `max-width` on `.nav` itself
  aligns the logo but shrinks the background box, so the dark About section
  bleeds through the side margins. Full-bleed bg + constrained inner wrapper
  fixes both at once.
- **Hero name** is uppercase and wraps to two lines (SPENCER / LEWIS) via a
  `ch`-based max-width so the break holds across breakpoints. `text-transform`
  lives on the hero display element.
- **Mono uppercase** for the hero meta row and jaguar caption is scoped to
  `.hero__meta` / `.hero__caption` only — NOT the base `.meta` class, or the nav
  logo and footer copyright get wrongly uppercased (both stay lowercase /
  title-case per the reference).
- **The jaguar's pink/magenta/yellow fragments are intentional** — the same
  version appears in the Figma reference. Do not try to "clean" it.
- **Two-tone field radius is 4px** (easy to misread as 0 in a screenshot).
- **Jaguar caption centring:** `align-self: flex-end` on the caption only
  matches its own (narrower) box to the image's right edge — it does not
  centre the caption under the image, since the caption's text is shorter
  than the image is wide. Fix is a `.hero__image-inner` wrapper
  (`width: fit-content; align-items: center`) around both the image and
  caption, so the wrapper shrinks to the image's rendered width and centres
  the caption within it.
- **Project marks: glyph fills ~90% of the accent square, evenly padded and
  optically centered.** This is intentionally tighter than build-spec §7's
  stale "65%" — do not loosen the marks toward that value. Achieved by
  trimming each SVG's `viewBox` to the glyph's own tight bounding box (via
  rendered `getBBox()`, expanded by half the stroke width for stroked
  glyphs — the raw path coordinates alone undercount stroked marks) rather
  than resizing the accent square: the square's size and position anchor the
  text column and carry the project accent, so it stays fixed at 56px. CSS
  then sizes the `<img>` generically for all four marks — `max-width` /
  `max-height: 50.4px` (90% of 56px) with `width`/`height: auto` — so each
  glyph's own aspect ratio decides which axis hits the 90% cap and the other
  scales proportionally, centered by the square's flexbox.
- **`clamp(24px, 4vw, 48px)` desktop padding is arithmetically flat at 48px**
  for the entire range this rule applies to (`≥1200px`): `4vw` only equals
  48px at exactly 1200px and exceeds it for every wider viewport, so the
  clamp's max branch wins throughout. This was specified exactly this way —
  implement it as written, don't "simplify" it to a flat `48px` (the clamp
  is intentional even though it's non-responsive in practice at this
  breakpoint) or silently change the breakpoint threshold to make the `4vw`
  term do something.

## Current state (VERIFY with git first)

The homepage is built and has had four fix passes: uppercase two-line name,
jaguar height cap, nav alignment, band gaps, `#work` scroll-margin, a
hamburger mobile nav with focus handling, a full spacing pass measured
boundary-by-boundary against `homepage-layout.png`, the nav full-bleed
background fix, the jaguar caption centred under the image via a
`.hero__image-inner` wrapper, the four project marks retightened to ~90%
glyph fill, and — most recently — the shared container widened to ~1680px
with a larger `display-xl`. See Gotchas for implementation notes and
**Intentional divergences from build-spec / Figma** above for what's
deliberately off-spec and why. **Run `git log`/`git status` to see what is
committed versus still in the working tree, and commit anything uncommitted
before continuing.**

Not started: three case study pages, the Multimedia gallery, mobile
refinement beyond the hamburger, and deploy.
