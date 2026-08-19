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
- `assets/ashleyto-reference.png` — a **2× capture** (halve its pixel
  measurements before using them) of ashleyto.com's About section, used to
  set the proportions and type relationship for our own About panel (see
  Intentional divergences below). Not a Figma export like the files above
  and not itself the design target — the *panel proportions and text/body
  weight relationship* were measured from it, but the portrait treatment
  (contained/centered vs. her full-bleed) and the colour palette
  (`--ink`/`--bone`/`--vermillion` vs. her terracotta/cream) are
  deliberately NOT copied.

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
  **Body copy stays capped near 640px regardless** (build-spec §3): hero
  tagline and (future) band descriptions use `.reading-column` /
  `max-width: 640px`, decoupled from the container — only structural columns
  (nav, bands, two-tone fields, section frames) widen. **About paragraphs are
  the one exception**, at `max-width: 800px` (see the About-text entry below
  for the full history — it's been widened twice) — this was a deliberate
  further widen on top of the container change, not the container leaking
  into body copy.
- **Hero `display-xl` enlarged:** desktop is now
  `clamp(128px, 11vw, 156px)`, not build-spec's flat `120px` — Spencer wants
  the name bigger. Lands ~148px at 1349px, caps at 156px by ~1512px. The
  `9ch` max-width on `.hero__name` still forces the two-line SPENCER / LEWIS
  wrap at this size (verified at 390/1349/1512/1680px) since `ch` scales
  with font-size. Mobile is untouched (still flat `56px`).
- **Hero tagline and meta enlarged**, moving toward ashleyto.com's fuller
  feel — the name was already big; the tagline and meta read small and left
  the hero empty. `.hero__tagline`: `.body-l`'s 17px/20px → 22px mobile /
  28px desktop. `.hero__meta`: `.meta`'s flat 12px → flat 14px (the mono
  `≤14px` ceiling from build-spec §2 — don't push this further). Both are
  overrides scoped to the hero classes, not changes to the shared
  `.body-l` / `.meta` type-scale tokens, so nothing else on the site moved.
- **About panel redesigned around `assets/ashleyto-reference.png`'s
  proportions (its 3rd revision — do not re-litigate the earlier
  "hug-right" or 800px/27px versions, both superseded):**
  `grid-template-columns: 9% 40% 1fr` on `.about__inner` at ≥1200px — text
  starts 9% into the panel and runs 40% of its width (both measured
  directly off the reference, confirmed via `getpixel()` scanning, not
  eyeballed). The remaining ~51% is the portrait's zone: `.about__image`
  gets `height: 100%` and centers its `<img>` (`max-width: 70%`,
  `max-height: 520px`) — this reliably lands the image's rendered height
  exactly equal to the text column's height with 0px vertical offset
  (verified at three desktop widths), and equal left/right margins within
  its zone, satisfying "contained, centred, capped, vertically centred
  against the text" without hand-tuned numbers. **This deliberately does
  NOT copy the reference's photo treatment** — hers is full-bleed to the
  panel's top/right/bottom edges; ours is contained on all four sides.
  Body copy: `.about__paragraph`'s `.body` base (16px/17px) → 19px mobile
  / 22px desktop (this is a *decrease* from the previous revision's
  21/27px — the ashleyto reference's body sits closer to build-spec's own
  body-l scale than the earlier oversized pass assumed), `line-height:
  1.5`. The "ABOUT ME" heading is no longer `.label` (JetBrains Mono
  11px) — see build-spec §2's documented exception and the Gotcha below.
  `.about__inner`'s own `max-width: 1680px` (matching the site container)
  and ink background are unchanged from the prior revision.
- **Project marks fill ~90% of the accent square**, not build-spec §7's
  stale "65%" — see Gotchas below for how.
- **Homepage Multimedia band image:** `multimedia-landingpage.png`
  (portrait, 1939×2400), not `multimedia-ink.jpg` (landscape) — build-spec
  §8 updated to match. Sized the same way as the other three bands (85%
  height, centred on the 39/61 seam, `object-fit: contain`) so Multimedia is
  no longer the odd one out. The Multimedia *gallery page* (not yet built)
  still lists `multimedia-ink.jpg` for its own section 3 — that's a
  different placement and wasn't part of this change.
- **Harmony's phone-mockup asset is now `assets/harmony-match-2.png`,
  not `harmony-match.png`.** The old file had solid jade
  (`#1F5C4A`-ish, baked in at export) filling all four corners of its
  transparent PNG, which bled onto the bone-deep 39% side of the two-tone
  field wherever the corners overhung it (confirmed via `getpixel()` alpha
  sampling — old file's corners were fully opaque jade, new file's are
  genuinely transparent). Fixing the file in place wasn't enough on its
  own: browsers/CDNs can serve the stale cached bitmap for a same-named
  URL indefinitely, so the file was `git mv`'d to a new filename
  (`-2` suffix) to force a cache-busted URL. **If a future asset swap
  needs to fix a *visual* bug in an existing file, rename it — don't just
  overwrite the same filename** — or the fix may not visibly land for
  anyone with the old file cached. No CSS changed for this fix; the
  two-tone-field gradient background was already generic and already sat
  behind the image.
- **Homepage Herakify link uses `href="herakify.html"`, not
  `href="/herakify"`.** The clean-URL form 404s when served by a plain
  static file server (`python3 -m http.server`, or any dev server without
  Vercel's rewrite layer) since there's no literal `/herakify` resource —
  only `vercel.json`'s `cleanUrls` makes that path resolve, and only once
  actually deployed to Vercel. `herakify.html` works identically in both
  environments (`cleanUrls` still 308-redirects it to `/herakify` in
  prod), so it's the safer form for any link *within this codebase* to
  another page in this codebase. Keep using extensionless paths only for
  things that are genuinely deploy-target-specific.

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

## Case study template — reuse this for Harmony and Yakabod

`herakify.html` is the reference implementation of a **generic, reusable
case-study template**. Building Harmony or Yakabod means copying it and
swapping content/accent — the CSS underneath (in `styles.css`, the block
headed "Case study template — reusable for Herakify / Harmony / Yakabod")
has no Herakify-specific selectors, so it should need zero changes.

**To reskin for a new project:**

1. Copy `herakify.html` → `harmony.html` (or `yakabod.html`).
2. Change `<main class="case-study" style="--accent: var(--ochre)">` to
   the new project's accent (`--jade` for Harmony, `--muted` for Yakabod).
   Every colour in the template — the mark square, section-marker numerals,
   the `.learned` left border, the feature-bands background, the
   `.next-project__link` — reads `var(--accent)` and follows automatically.
3. Swap the mark SVG (`assets/mark-*.svg`), all image `src`/`alt`/
   `width`/`height`, and every text node. **Transcribe copy directly from
   the reference screenshot** (`screenshots/harmony-case-study.png` /
   `yakabod-case-study.png`) — don't paraphrase, per the standing
   instruction on this project.
4. Update `.next-project` at the bottom to point to *its* next project
   (Harmony → Yakabod → Multimedia, presumably — check the reference for
   the actual sequence build-spec/Figma intends) and give its mark a
   `style="--accent: var(--jade-or-whatever)"` override like Herakify's
   does for Harmony's jade mark, so the preview mark shows the *next*
   project's colour while the rest of the page stays on the *current*
   project's accent.
5. Update the homepage's project-band link for that project to
   `href="harmony.html"` (extensionless `href="/harmony"` 404s outside
   Vercel — see Gotchas; Herakify's link was already fixed this way, the
   other two still need it once their pages exist).
6. Re-verify at 1349/1512/1680/390px per the working method below, and
   confirm the two-tone-field aspect override (`.two-tone-field--intro`,
   4:5 desktop / square mobile) still reads correctly for that project's
   hero image aspect ratio — it was tuned against Herakify's phone
   mockup and hasn't been checked against Harmony's or Yakabod's assets.

**Template sections, top to bottom** (all generic class names, see
`herakify.html` for the concrete markup): `.case-intro` (back link,
category tag, mark, title, description, `.two-tone-field--intro` hero
image) → `.details-strip` (4 hairline cells, self-adapting 1/2/4-column
via the border-on-every-cell technique — see Gotchas) → `.content-section`
×2 (Challenge with a supporting `.two-tone-field`, Solution without one —
add `.content-section--no-field`) → `.feature-bands` (full-bleed accent,
3× `.feature-band`, add `.feature-band--reverse` to alternate) →
`.impact` (`.section-marker`, `.metric-block` ×3, `.learned`) →
`.next-project` (bone-deep background) → the homepage's `.footer`, reused
as-is.

**Routing:** `vercel.json` has `"cleanUrls": true`, so `herakify.html`
serves at both `/herakify.html` and `/herakify` (redirecting the former to
the latter). This wasn't previously configured — the homepage's
`href="/herakify"` links predate this file existing. Untested against a
live Vercel deploy in this session (`vercel dev` needs a login this
environment doesn't have) — confirm clean-URL routing actually resolves
once this branch is deployed, don't assume the config is sufficient on
faith alone.

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
- **Hero's fractional grid columns grew a dead gap after the 1680px widen:**
  `.hero__intro`/`.hero__image` were `grid-column: 1/7` / `7/13` (6-of-12
  fractions). Fine at 1432px, but at 1680px neither the text (capped by its
  own content) nor the jaguar (capped by `max-height`) fills its 6-column
  share, so the empty space between them grew with the container — 282px at
  1349px up to 588px at 1680px. Swapping `.hero__image` to
  `justify-content: flex-start` only partly fixed it (anchored the jaguar to
  its column's start, but the column's start position itself still moves
  with a fractional split). The real fix: give `.hero` its own
  `grid-template-columns: minmax(0, 680px) minmax(0, 420px) 1fr` for this
  row specifically — intro and image get capped tracks, the trailing `1fr`
  absorbs whatever width is left over on the right. Gap is now a flat 64px
  at every width from 1349–1680px instead of growing. **Same underlying
  fix if any other side-by-side pair here starts drifting apart as the
  container widens further**: check whether it's on fractional
  `grid-template-columns` (or `%`-based) tracks — those grow with the
  container even when the content inside them doesn't.
- **`grid-row: 1` is needed on BOTH items of any reversed/mirrored
  side-by-side pair**, not just the "normal" ones — this has now bitten
  `.project-band--reverse`, `.about__image`/`.about__content`, and
  `.feature-band--reverse` (fixed proactively there, since I knew to look
  for it this time). Root cause: when the visually-second column has an
  EARLIER `grid-column` line than the visually-first one (i.e. DOM order
  and column order disagree), the browser's auto-placement cursor won't
  place them in the same implicit row. Anything new with a "reverse"
  modifier needs this from the start — don't wait to discover it.
- **A shared `class="grid"` on an element you're about to give
  component-specific `grid-template-columns` will silently fight you.**
  `.about__inner` had `class="about__inner grid"` from the original build
  (reusing `.grid`'s responsive column counts). When the About rework gave
  `.about__inner` its own `grid-template-columns` / `max-width`, the
  still-present `.grid` class ALSO kept applying its own
  `padding-inline: clamp(24px, 4vw, 48px)` at 1200px — doubling the inset
  on top of `.about`'s own padding (measured: portrait sat 96px from the
  edge instead of the intended 48px). Fix was removing the redundant
  `grid` class once `.about__inner` had its own complete width/padding
  system. **Check an element's full class list before debugging a
  layout-math discrepancy** — a legacy shared class contributing
  properties you forgot about is a likely culprit.
- **`fullPage` Playwright screenshots taken right after `page.goto()` can
  miss `loading="lazy"` images and `.reveal` scroll-triggered content.**
  Hit this twice this session: (1) the reveal.js IntersectionObserver
  never fires for sections the test script jumps past (e.g. scrolling
  straight from top to `scrollHeight` skips everything in between at
  viewport heights shorter than the page), leaving `.reveal` elements at
  `opacity: 0` in the final screenshot even though the real site is fine;
  (2) `portrait.jpg`'s `loading="lazy"` meant it hadn't loaded yet when a
  same-tick `fullPage` screenshot fired, so it rendered blank. Both looked
  like real bugs until re-checked. **Always scroll through the full page
  in small increments (a `for` loop in ~250-400px steps with a short wait
  each step) before taking a verification screenshot** — don't jump
  straight to the bottom and back.
- **Details-strip hairlines that self-adapt to any column count:** give
  the grid container `border-top` + `border-left`, give every cell
  `border-right` + `border-bottom`. Adjacent cells' borders then coincide
  into single hairlines automatically, in both directions, regardless of
  how many columns wrap per row — no `:nth-child` logic needed even though
  the column count itself changes at three different breakpoints (1 below
  480px, 2 from 480–1199px, 4 at ≥1200px).
- **Playwright's `.click()` can't target a `display: contents` element
  directly** — `boundingBox()` returns `null` for it (there's no box to
  click, that's the point of the property), so `locator(...).click()`
  hangs/times out waiting for a navigation that a real user's mouse click
  would trigger fine. This applies to every `.project-band__link` (and
  now `.next-project` if it ever gets one). **Click a visible descendant
  instead** (e.g. `.project-band__headline`) to test link navigation —
  the click still activates the anchor in a real browser via normal event
  bubbling, Playwright's API just needs a literal box to aim at.
- **Hero and About's 2-column breakpoint was investigated and found
  already correct at 1200px** (matching bands) — instrumented checks at
  1200/1250/1300/1349px all showed proper side-by-side layout with tracks
  shrinking gracefully, no overflow, no visual break. If this is reported
  as broken again, suspect a stale cache or an undeployed commit on
  whatever's being tested against (the Harmony corner-bleed report in the
  same conversation turned out to be exactly this kind of caching issue)
  before assuming the CSS regressed — but re-verify with a fresh
  `page.goto()` + screenshot rather than trusting this note blindly,
  since "already correct" is a snapshot of one point in time, not a
  standing guarantee.

## Current state (VERIFY with git first)

The homepage has had seven fix passes (uppercase two-line name, jaguar
height cap, nav alignment, band gaps, `#work` scroll-margin, hamburger
mobile nav, a measured spacing pass, the nav full-bleed fix, jaguar
caption centring, project marks retightened to ~90%, the container widen
to ~1680px with a larger `display-xl`, the hero text/jaguar gap rebalance,
larger hero tagline/meta, and now a full About panel redesign — see
Intentional divergences for the current numbers, and don't trust any
About sizing/layout details mentioned earlier in this file's history over
that section). The Multimedia band's asset was swapped to a portrait
image; Harmony's phone-mockup asset is now `harmony-match-2.png` (renamed
to bust a stale-cache issue on top of the corner-transparency fix); the
homepage's Herakify link is `herakify.html` (was the clean-URL-only
`/herakify`, which 404s outside Vercel). See Gotchas for implementation
notes and **Intentional divergences from build-spec / Figma** above for
what's deliberately off-spec and why.

**Herakify's case study page is built** (`herakify.html`) and doubles as
the reusable template for Harmony and Yakabod — see the "Case study
template" section above before starting either of those (and update its
own homepage link the same way as Herakify's once it exists — extensionless
`.html`, not a bare clean-URL path). `vercel.json` has `"cleanUrls": true`
so `/herakify` still resolves once actually deployed to Vercel; this
remains unverified against a live deploy in this session (`vercel dev`
needs a login this environment doesn't have).

**Run `git log`/`git status` to see what is committed versus still in the
working tree, and commit anything uncommitted before continuing.**

Not started: the Harmony and Yakabod case study pages (template exists,
content doesn't), the Multimedia gallery, mobile refinement beyond the
hamburger, and deploy.
