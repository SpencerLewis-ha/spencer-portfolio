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

- `main` — **the redesign is live here now** (merged from `redesign` via
  `--no-ff`, then pushed). This is the Vercel Production Branch —
  pushing it deploys to spencerhlewis.com. Branch off `main` for new
  work (a short-lived feature branch, verify, then merge `--no-ff` back
  into `main` and push) rather than committing to it directly.
- `redesign` — the original rebuild branch. Fully merged into `main`;
  kept around as history per standing instruction, not deleted. Treat
  as frozen — new work branches off `main`, not this.
- `v1-archive` — frozen v1 backup, from before the redesign.

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
- **Herakify's mockup asset is now `assets/herakify-map-2.png`, not
  `herakify-map.png`** — same corner-transparency-plus-rename pattern as
  Harmony's fix above (old file had bone-deep/ochre baked into its
  corners, which happened to look fine on the homepage's two-tone field
  by coincidence but showed a visible halo when the same file was reused
  on the Solution feature band's solid-ochre background). All three
  usages updated: homepage band, case-study hero field, and Solution
  feature block 1 (build-spec §8 already notes this file is deliberately
  reused across those last two placements — that's unchanged, only the
  filename/transparency is new).
- **Hero jaguar is centred in the space right of the text, not
  left-aligned within its own track:** `.hero__image` spans
  `grid-column: 2 / -1` (was `2 / 3`) with `justify-content: center` (was
  `flex-start`) — it now centers across its 420px track *plus* the
  trailing `1fr` spacer combined, instead of hugging the left edge of
  just the 420px track and leaving the spacer as dead space to its
  right. Verified: left/right gap within that combined zone is exactly
  equal at every width from 1200–1680px. The 356px height cap and top
  alignment are unchanged.
- **Case-study template: mark sits ABOVE the eyebrow, not between it and
  the title** — order is back link → mark → category tag → title →
  description (was back → category → mark → title). This is a
  deliberate divergence from the Figma order: the mark reads as a
  project badge this way, with clear space below it, instead of being
  squeezed between two text lines. **This is a template-level change —
  Harmony and Yakabod inherit this order automatically** when built from
  `herakify.html` (see "Case study template" below); don't build them
  with the old back → category → mark → title order.
- **Case-study template: Impact's body paragraph and "What I Learned"
  block are side-by-side at ≥1200px, not stacked** — both wrapped in a
  new `.impact__details` (`display: grid; grid-template-columns: 1fr 1fr`
  at that breakpoint), paragraph left, learned block right, top-aligned,
  each capped at `max-width: 640px`. Below 1200px they stack as before
  (learned block regains its `margin-top`). The 3px accent left border on
  `.learned` is unchanged. **Also a template-level change** — inherited
  by Harmony and Yakabod automatically, same as the mark reorder above.
- **Harmony's `assets/harmony-profile.png` and `harmony-events.png` are
  now `harmony-profile-2.png` / `harmony-events-2.png`** — third and
  fourth instances of the same corner-transparency-plus-rename pattern
  (`harmony-match-2.png`, `herakify-map-2.png` above). Both had fully
  opaque jade baked into all four corners; fixed programmatically this
  time (no pre-corrected file was provided) via a BFS flood-fill from
  the border inward — matches within a colour-distance tolerance of the
  sampled corner colour get set to alpha 0, then the transparent region
  is dilated 2px with a looser tolerance to also clear the anti-aliased
  edge halo, without eating into the phone-frame artwork (verified by
  compositing onto a checkerboard afterward — see Gotchas for the
  general technique if this comes up again). Used on Harmony's Solution
  feature blocks 2 and 3 (full-bleed jade background) — the baked jade
  (sampled `rgb(49, 91, 75)`) wasn't an exact match for `--jade`
  (`#1F5C4A` = `rgb(31, 92, 74)`, notably off on the red channel), so it
  read as a real if subtle seam even on a same-colour background, not
  just a visible bleed onto a different one.
- **Harmony (`harmony.html`) and Yakabod (`yakabod.html`) are both
  built**, cloned directly from `herakify.html` per the "Case study
  template" section below — this validates the template held up
  unchanged across two more projects with zero structural edits, only
  content/accent/asset swaps. Both wired into the homepage and into
  each other's `.next-project` links using the `.html` form (see the
  Herakify-link Gotcha) — note Herakify's own internal `.next-project`
  link was ALSO changed from `/harmony` to `harmony.html` as part of
  this, since it had the identical 404-on-static-server bug and this
  was the natural point to fix it.
- **Yakabod's graphics need no special wrapper CSS despite build-spec
  §8's "sitting on a bone panel with 40px padding" note** — that
  description is of what's already baked into the exported PNGs
  themselves (confirmed by opening a few: each has cream/bone padding
  built in around the flat graphic already). They're dropped into
  `.two-tone-field` / `.feature-band__media` exactly like every other
  project's phone-mockup images, no Yakabod-specific selectors anywhere.
  **Exception found and fixed:** `yak-challenge.png` did NOT actually
  have the uniform 40px padding this note assumes — its panel was
  nearly edge-to-edge with the canvas and the grid graphic inside was
  asymmetrically positioned (~177px empty margin on the left, ~1-5px on
  every other side), which made it float with an apparent drop shadow
  and uneven insets once placed in the landscape Challenge
  `.two-tone-field` (that field's generic `height:85%; width:auto`
  sizing, tuned for portrait phone mockups, exaggerated the asymmetry
  further). Rebuilt as `assets/yak-challenge-2.png`: extracted the tight
  grid-content bounding box via pixel measurement (matching on the
  ink/border-gray colours, not the bone/panel colours, since the panel
  itself has almost no margin to measure against), then recomposited
  it onto a fresh 608×605 canvas — true 40px bone padding on all four
  sides, 4px radius, fully transparent outside the panel (not baked-in
  corner colours) so it can't visually clash with whatever's behind it.
  This also makes the asset nearly square, which fixed the overflow/
  shadow problem — but it still needed one CSS change to actually
  centre: `.two-tone-field img`'s default `left: 42%` is tuned for
  images meant to straddle the field's two-tone split, not for a
  self-contained panel graphic like this one, so it rendered ~40px
  off-centre until a `.two-tone-field--centered` modifier (`left: 50%`)
  was added and applied to this field specifically — see the Gotchas
  entry on `.two-tone-field img`'s 42% positioning for the full
  explanation. If another Yakabod graphic ever looks off, check its
  actual padding AND its centering with a pixel measurement before
  assuming either is already covered — neither note covers all of them.
- **Solution feature-band text inset — `.feature-band--reverse
  .feature-band__text` needed explicit `padding-left: var(--space-xl)`
  (added ≥1200px alongside its `grid-column: 1 / 7`)** — without it, the
  reversed block's text sits flush against the container's own edge
  padding (48px, same as the *media*'s inset in the non-reversed
  blocks), while the non-reversed blocks' text sits inset ~640-850px
  (pushed over by the media column + gap). Side by side that reads as
  "block 2's text has no breathing room" even though nothing was
  technically broken — it's an unavoidable consequence of a literal
  grid mirror (reflecting `media:1/6, text:7/13` around the row's
  centre naturally swaps which element ends up flush against the row's
  own edge). Fixed by giving the reversed text a flat `--space-xl`
  (96px) left padding so it reads with comparable breathing room to the
  non-reversed blocks. This lives in the shared `.feature-band--reverse`
  rule in `styles.css`, so it applies to all three case studies
  automatically — verified holding on Herakify, Harmony, and Yakabod.
- **Challenge + Research consolidated into one section, per case study
  (template-level change, all three)** — see "Challenge + Research
  consolidation" below. (Originally written when this second block was
  still labelled "Solution" — see the section-relabel entry further
  down for why it's now "Research" and where "Solution" actually
  lives.)

### Challenge + Research consolidation (template-level, all three case studies)

Build-spec §7/§5.3 originally describes Challenge and Solution as two
separate full-width sections (Challenge: text + image field; Solution:
text + chips, no field, `.content-section--no-field`). The built
template now merges the second block into the first as **one scannable
two-column beat**: the Challenge heading/marker/paragraph and the
second block's heading/marker/paragraph(s)/chips both sit stacked in
the same left-hand text column, with the Challenge image on the right,
roughly parallel in height to the combined text. `.content-section--no-field`
and the second `<section>` are gone — there's only one `.content-section`
per case study now, containing **three** direct grid children in this
DOM order:

```html
<section class="content-section grid reveal">
  <div class="content-section__text">          <!-- Challenge copy -->
  <div class="content-section__field two-tone-field">  <!-- image -->
  <div class="content-section__text content-section__text--research">  <!-- Research copy + chips -->
</section>
```

(The modifier class is `.content-section__text--research` — renamed
from `--solution` in the same pass that relabelled the section itself,
see below. If you're grepping for it and only finding `--research`,
that's correct, not a partial migration.)

The image is a DOM sibling **between** the two text blocks, not nested
inside either — this is deliberate, not incidental. It's what makes
both layouts work with the same markup:

- **Mobile (no explicit grid-row):** all three are `grid-column: 1/-1`
  and just stack in DOM order — Challenge text → image → Research
  text+chips, matching the original mobile spec's order.
- **Desktop (≥1200px):** `.content-section__text` gets
  `grid-column:1/8; grid-row:1`, `.content-section__text--research`
  overrides to `grid-row:2` (same column, `margin-top: var(--space-l)`
  for a clear but tight break), and `.content-section__field` gets
  `grid-column:8/13; grid-row: 1 / span 2` — spanning both rows so its
  own square aspect-ratio height doesn't force row 1 to expand and
  push the second block down away from the Challenge paragraph. This
  was the key discovery: without the row-span, auto-placement (or even
  an explicit single `grid-row:1` on the field) makes row 1's height
  match the field's own square dimension, which is usually taller than
  the short Challenge paragraph alone — leaving an ugly gap before the
  second block starts. Spanning both rows lets the field sit tall on
  the right while the text column flows tightly on the left,
  independent of the field's height.

If a 4th case study is ever built from this template, copy this
three-child pattern exactly — don't reintroduce the two-section
version, and don't collapse the image back into a single nested div
inside the text block (that breaks the mobile stacking order).

### Section relabel: Challenge / Research / Solution / Impact (template-level, all three case studies, Konrad-review pass)

The section that used to read **"02 / Solution"** never actually
described a solution — it's research and problem-framing (contextual
inquiries, the persona, the design problem(s) that came out of it). The
real solutions are the feature blocks underneath, which had no heading
of their own. Fixed by renumbering the whole sequence so every label
now matches the content beneath it:

1. **`01 / Challenge`** — unchanged.
2. **`02 / Research`** — the old "02 / Solution" block, renamed
   (heading text, section-marker text, and the modifier class
   `content-section__text--research`, see above). Still keeps the
   skill chips.
3. **`03 / Solution`** — new. The full-bleed accent `.feature-bands`
   section previously had no marker/heading of its own; it now opens
   with a `.feature-bands__intro` block (marker + `.feature-bands__heading`,
   full container width, sitting directly above the first `.feature-band`)
   before the three bands. Colour handling is inverted from the normal
   `.section-marker` (which assumes a bone background): inside
   `.feature-bands__intro` the numeral is `var(--ink)` and the slash+label
   are `var(--bone)`, since the marker sits directly on the accent-coloured
   band background — the shared `.section-marker` rule would otherwise
   render the numeral in `var(--accent)` on a same-colour background and
   vanish. `.feature-bands__intro + .feature-band` gets `padding-top: 0`
   so the first band doesn't ALSO add its own full `padding-block`
   on top of the intro's own spacing (would double up).
4. **`04 / Impact`** — unchanged content, renumbered.

If a 4th case study is ever built, copy this four-marker sequence, not
the old three-marker one — `01 Challenge / 02 Research / 03 Solution /
04 Impact`, with the Solution marker living in `.feature-bands__intro`
rather than in the merged `.content-section`.

### "What I Learned" — italic reflection, no decorative mark (template-level, all three case studies)

**History, in order — this component has been through six rounds, so
don't re-litigate an earlier one blind:**

1. Originally `.learned` sat inside `.impact__details`, side-by-side
   with `.impact__body` at ≥1200px (a 2-column grid) — a sidebar next
   to the main paragraph.
2. Promoted to a full-width, **centred** closing block: `margin-inline:
   auto`, `text-align: center`, a `border-top: 1px solid var(--accent)`
   hairline, and `margin-top: var(--space-2xl)` (192px, stacking on the
   section's own `row-gap`).
3. **Reverted** — centred/top-bordered broke consistency with the
   left-aligned metrics/paragraph and the site's vertical-only accent-
   border motif, and the gap read as dead space. Went back to
   **left-aligned, 3px `border-left: var(--accent)` + `padding-left:
   var(--space-m)`**, `max-width: 640px`, spacing trimmed to a single
   `--space-l` (relying on the section's own `row-gap`, no margin-top
   of its own).
4. Bordered-callout treatment removed entirely, restyled as a large
   serif statement — no border, accent in the eyebrow label only,
   `.learned__body` at the shared `.h2` sizing (28px/36px) with its own
   `line-height: 1.3`, `max-width: 1000px` on `.learned`. Hierarchy:
   metrics (56px) → this statement (36px) → paragraph (18px).
5. **Pull-quote treatment, since removed (round 6) — kept here as
   history, not current state.** The large-serif-statement version
   competed with "Impact" in size rather than reading as distinct in
   *kind*, so `.learned__body` dropped back down to body-l sizing
   (`17px` mobile / `20px` desktop) in *italic* Instrument Serif, and a
   decorative opening quote mark (`\201C`, `.learned__body::before`)
   was added behind/left of the text at `var(--accent)` `0.16` opacity
   — static/in-flow above the text on mobile, `position: absolute` and
   `120px` at ≥768px. `.learned`'s `max-width` came down to `700px`
   (a comfortable italic-text measure, not a big-statement one) — this
   part **did** carry forward to round 6, see below.
6. **Current: same italic reflection, mark removed entirely.** The
   quote glyph was judged unnecessary — the italic body-l text plus the
   accent-coloured "WHAT I LEARNED" eyebrow above it is enough on its
   own to read as a distinct reflection beat, per direct instruction.
   `.learned__body::before` and its `≥768px` override are both deleted
   outright (not hidden, not zeroed-out — removed from the stylesheet).
   Everything else from round 5 is unchanged: italic Instrument Serif,
   `17px`/`20px`, `var(--ink)`, `700px` max-width, left-aligned to the
   paragraph column, `var(--accent)` eyebrow above it, `--space-xl`
   total gap from the paragraph above (via `.learned`'s own
   `margin-top: var(--space-l)` plus the section's `row-gap`). If a
   decorative mark is ever requested again, the round 5 entry above has
   the exact values and the two gotchas below still apply.

**Gotcha hit implementing round 5's (now-removed) quote mark, kept for
next time one gets added back:** the
first attempt used `top: -0.5em; left: -0.65em; z-index: -1` at 120px,
which computed to `-60px`/`-78px` — since `.learned__body`'s own left
edge is only 48px from the viewport edge (the standard container
gutter), an `-78px` left offset pushed most of the glyph's box past
`x: 0`, off the left edge of the viewport entirely, and it rendered as
invisible. **Em-based offsets on a decorative pseudo-element need to be
sized relative to how much real gutter space actually exists next to
the element, not chosen by feel** — an offset that reads as "a tasteful
bleed into the margin" at a wide container edge can push a large-font
pseudo-element fully off-canvas at a narrower one. Also removed the
`z-index: -1` entirely: it isn't needed (the pseudo-element's content
paints before the parent element's own text content in the same
stacking context, so the italic text naturally paints over the
low-opacity mark without any z-index at all), and `z-index: -1` on a
`position: relative` parent with `z-index: auto` doesn't reliably
create the isolated stacking context you'd expect — it very likely
contributed to the mark rendering behind other page content and
disappearing along with the offset bug. Settled on `top: -0.05em;
left: -0.15em` (barely pulled off the text's own top-left corner,
overlapping the cap-height of the first letter slightly) after
iterating with actual screenshots — don't try to compute "correct"
offsets analytically for a decorative overlap like this, just look at
it and adjust.

**Gotcha carried over from round 4:** `.learned__body` must not carry
the shared `body` class — `.case-study .body { font-size: 18px }` (a
compound selector) has higher specificity than any single-class rule
on `.learned__body` and will silently override its font-size. Round 4
already removed this class from the markup; round 5 kept it removed
and hardcoded all of `.learned__body`'s type properties directly
instead of composing from `.body`/`.body-l` tokens, to sidestep the
whole class of bug rather than re-fight it.

`.impact__details` is gone (removed in round 2, still gone) —
`.impact__body` is a direct grid child of `.impact` (`grid-column:
1/-1; max-width: 640px`, left-aligned), and `.learned` is also a direct
grid child (not nested in a wrapper), sitting after it in DOM order.

If a case study's `.impact__body` paragraph runs long, split it into
multiple `<p class="impact__body body">` siblings — no wrapper needed,
each instance's own `margin-top: var(--space-m)` provides natural
paragraph spacing from the one before it (Herakify's impact body is a
2-paragraph example of this, split for the scannability pass — see
below).

### Case-study body copy: 17px → 18px desktop, and other scannability fixes (Konrad-review pass, all three case studies)

- **`.case-study .body { font-size: 18px }`** at ≥768px — scoped to
  `.case-study` (not a change to the shared `.body` type-scale token)
  so the homepage, About, and Multimedia's body text are unaffected.
  The 640px `.reading-column` cap is untouched.
- **Paragraphs over ~4 sentences got split into two** — currently only
  Herakify's Research paragraph (5 sentences → persona-insight
  paragraph + two-design-problems paragraph) and Herakify's Impact
  body (5 short sentences → stages/measurement paragraph + a punchy
  3-sentence closer). Harmony's Research paragraph was borderline (4
  sentences) and got split too for consistency across the three case
  studies, even though it didn't strictly need it. Yakabod's Research
  and Impact paragraphs were already short enough (≤3 sentences) and
  were left as single paragraphs.
- **Each Research paragraph has 2–3 `<strong>` phrases** bolding the
  core research insight and the resulting design problem(s) (Herakify's
  literally is two explicit questions; Harmony's and Yakabod's are
  bolded on the equivalent insight/problem-framing clauses even though
  they're not phrased as questions in the original copy). Kept to the
  2–3 max per the brief — don't add more per section, it stops reading
  as emphasis and starts reading as noise.
- **Nav dropped "Work"** (sitewide, all five pages) — it's now just
  Home / About / Resume. Home already lands on `/`, which is where Work
  scrolled to anyway (`/#work`), so the link was redundant. `About` is
  unchanged, still `/#about`. This did **not** touch the case-study
  "← Back" links or the Multimedia gallery's back link — both still
  point to `/#work`, which still works fine as a same-page anchor
  target even with no nav item pointing at it directly; `#work` the
  section/id hasn't gone anywhere, only the nav's redundant link to it.

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

## Case study template — how Harmony and Yakabod were built

`herakify.html` is a **generic, reusable case-study template**, and
`harmony.html` / `yakabod.html` are both cloned from it with **zero
structural changes** — only content, accent, and image swaps. This
validates the template: it held up unchanged across two more projects.
The CSS underneath (in `styles.css`, the block headed "Case study
template — reusable for Herakify / Harmony / Yakabod") has no
Herakify-specific selectors. If the Multimedia gallery or a 4th case
study ever needs this same treatment, repeat the same process:

1. Copy `herakify.html` (or any of the three) to the new filename.
2. Change `<main class="case-study" style="--accent: var(--X)">` to the
   new project's accent. Every colour in the template — the mark square,
   section-marker numerals, the `.learned` left border, the
   feature-bands background, the `.next-project__link` — reads
   `var(--accent)` and follows automatically.
3. Swap the mark SVG (`assets/mark-*.svg`), all image `src`/`alt`/
   `width`/`height`, and every text node. **Transcribe copy directly from
   the reference screenshot** — don't paraphrase, per the standing
   instruction on this project.
4. Update `.next-project` at the bottom to point to the next one in
   sequence and give its mark a `style="--accent: var(--next-accent)"`
   override, so the preview mark shows the *next* project's colour while
   the rest of the page stays on the *current* project's accent. Confirmed
   sequence from the actual reference screenshots (not a guess): Herakify
   → Harmony → Yakabod → Herakify — a closed loop among the three case
   studies, not extending to Multimedia (which is a gallery page, not a
   case study, and isn't part of this template at all).
5. Update the homepage's project-band link for that project to the
   `.html` form (`href="harmony.html"`, not `/harmony` — see Gotchas).
   All four project-band links are now on the `.html` form, including
   Multimedia's (`multimedia.html`) — that page is a distinct structure,
   not a template clone, see its own section below.
6. Re-verify at 1200/1349/1680/390px per the working method below.
   `.two-tone-field--intro`'s 4:5 desktop / square mobile aspect override
   has now been confirmed against three different hero image aspect
   ratios (Herakify's, Harmony's, Yakabod's phone/graphic mockups) with
   no issues — it's a safe default, not something to re-derive per
   project.

**Template sections, top to bottom** (all generic class names, see
`herakify.html` for the concrete markup): `.case-intro` (back link,
**mark, then category tag** — mark reads as a badge above the eyebrow,
not squeezed between it and the title, see Intentional divergences —
title, description, `.two-tone-field--intro` hero image) →
`.details-strip` (4 hairline cells, self-adapting 1/2/4-column via the
border-on-every-cell technique — see Gotchas) → **one consolidated
`.content-section`** holding markers `01 / Challenge` and
`02 / Research` (Challenge + Research merged — see "Challenge +
Research consolidation" divergence below for the full markup/CSS
pattern) → `.feature-bands` (full-bleed accent, opens with
`.feature-bands__intro` holding marker `03 / Solution`, then 3×
`.feature-band`, add `.feature-band--reverse` to alternate — see the
"Section relabel" divergence) → `.impact` (marker `04 / Impact`,
`.metric-block` ×3, `.impact__body` paragraph(s), then **`.learned`**
as an italic reflection with no decoration at all (no border/panel/
quote-mark — accent lives in the eyebrow label only, italic Instrument
Serif at body-l sizing, `--space-xl` gap from the paragraph above) —
see the "'What I Learned'" divergence entry for the full six-round
history, this is NOT the old side-by-side `.impact__details` layout,
NOT the briefly-tried centred/top-border version, NOT the left-border
callout that came after that, NOT the large-serif-statement version
after *that*, and NOT the pull-quote-with-decorative-mark version that
came after *that* either) →
`.next-project` (bone-deep background) → the homepage's `.footer`,
reused as-is.

**Routing:** `vercel.json` has `"cleanUrls": true`, so all three case
study pages serve at both their `.html` path and the clean-URL form
(e.g. `/herakify.html` redirects to `/herakify`). Every link *within
this codebase* between these pages uses the `.html` form regardless
(see Gotchas) — the clean-URL behaviour only matters for the deployed
site being reachable at the pretty path, not for internal navigation.
Untested against a live Vercel deploy in this session (`vercel dev`
needs a login this environment doesn't have) — confirm clean-URL
routing actually resolves once this branch is deployed, don't assume
the config is sufficient on
faith alone.

## Multimedia gallery — distinct page structure (`multimedia.html`)

**Not cloned from the case-study template — built from scratch**, per
the standing instruction that this page has its own shape. It reuses
the site's nav, footer, design tokens, and self-hosted fonts (all
identical `<head>`/nav/footer markup to the case studies), but every
section in `<main>` is new. Accent is `--vermillion`, set via
`<main class="gallery" style="--accent: var(--vermillion)">` — `.gallery`
itself carries no rules, it's just the accent-variable scope, same
pattern as `.case-study`.

**Sections, top to bottom** (new classes, all in the `styles.css` block
headed "Multimedia gallery — distinct page structure"):

1. `.gallery-intro` — single column, no image field beside it (unlike
   `.case-intro`). Order is now **back link → mark → category tag →
   title → description** — mark before the eyebrow, matching the
   case-study template's own order (Konrad-review consistency pass;
   previously this page had back → category → mark → title, its
   original Figma-matched order, kept deliberately different from the
   case-study divergence — that's now considered the inconsistency, not
   the intentional choice, so it's been brought in line). The mark's
   own `margin-top` was bumped from `var(--space-s)` to `var(--space-l)`
   to match `.case-intro__content .project-mark`'s spacing exactly —
   don't leave it at the old smaller value if you touch this again.
2. `.details-strip.details-strip--3` — reuses the shared
   `.details-strip` component (already generic, used by every case
   study) with a `--3` modifier overriding to `repeat(3, 1fr)` at
   ≥1200px instead of the default `repeat(4, 1fr)`, since this page has
   three cells (Mediums / Tools / Years) not four.
3. `.motion` — 16:9 image (`aspect-ratio: 16/9; object-fit: cover`),
   caption below (`.motion__caption` — **stacked**: serif title, then
   mono meta directly beneath it, no longer a flexbox title-left/
   meta-right row, see the caption-unification note below), description
   paragraph beneath that. `.motion__media` is capped at
   `max-width: 882px` (with `margin-inline: auto` to stay centred) —
   `multimedia-animation.png` is native 882×494, and at the section's
   full grid width (1584px at 1680px viewport) it was being upscaled
   ~1.8x, rendering visibly soft/pixelated. Capping at native width
   keeps it at 1.0x on every desktop breakpoint (confirmed 1200/1349/
   1680 all render at exactly 882px now); mobile still scales it down,
   which never causes blur. **This is a resolution ceiling, not just a
   style choice** — if the section is ever widened further, or needs to
   look sharp on retina displays (which would need 1764px+ to stay
   crisp at 2x), a higher-resolution export of the animation still
   needs to come from Spencer. Don't quietly raise the cap without one.
4. `.visual-systems` — the `.triptych` (3-column grid ≥768px, single
   column + 32px gap below that). **Important:** the three
   `design-system-*.png` files are full moodboard compositions (colour
   swatches + a large wordmark + tagline + a small label), not just a
   swatch strip — display them at their own natural aspect ratio
   (`width:100%; height:auto`), not force-cropped to a fixed aspect
   with `object-fit:cover`. Cropping to 3:2 was the first attempt and
   it cut the images down to two swatches and half a wordmark; the
   reference thumbnail shows the *entire* composition scaled down, not
   a crop. Each item now has a **title (`.triptych__title`, serif h2) +
   meta (`.triptych__meta`, mono, reads "Colour + Type System" for all
   three)** beneath it, matching the Motion/Illustration sections'
   caption pattern (see below) — it used to be a single bare mono word
   with no title at all. Shared description paragraph below all three
   was also rewritten to state explicitly that these are directions
   explored for **this site's own** design system and that Wordmark
   (the first) is the one that actually got built — see the
   "Multimedia caption + process framing" note below.
5. `.illustration-photo` — the `.duo` asymmetric two-up
   (`multimedia-ink.jpg` + `multimedia-stage.jpeg`), `grid-template-
   columns: 3fr 2fr` ≥900px with `.duo__item--offset` (the second item)
   getting `margin-top: 64px` per build-spec §5.4's offset. Below
   900px it drops to a single column with no offset, 64px gap between
   items (`gap: var(--space-2xl)`). Each item has its own title/meta/
   description in a `<figcaption>` — **this section was already the
   reference implementation** for the caption system the other two
   sections were brought in line with (see below).

### Multimedia caption unification + process framing (Konrad-review pass)

The three sections used three different caption treatments: Motion had
a title+meta *row* (flexbox, space-between) with a separate description
paragraph; the triptych had only a single bare mono word per image, no
title, no per-item description; the duo section had a stacked
title → meta → description in a `<figcaption>`. Unified all three to
the duo section's pattern — **serif title, mono meta directly beneath,
then body description** (the triptych still shares one description
across all three items rather than getting per-item ones, since
they're three variations on one theme, not three independent pieces —
that's an intentional difference in content model, not a leftover
inconsistency). Concretely: `.motion__caption` dropped its
`display:flex; justify-content:space-between` (was a row) in favour of
plain block stacking; the triptych's old single `.triptych__caption`
class was replaced with `.triptych__title` (serif, `h2`) +
`.triptych__meta` (mono, muted) inside each `<figcaption>`.

Also rewrote the Visual Systems intro paragraph to read as **design-
process evidence** rather than plain illustration: it now names all
three directions (Wordmark / Poster / Instrument) explicitly and states
outright that Wordmark — the first — is the one that got built into
the live site, rather than the earlier, more oblique "the first one is
what you're looking at" phrasing.

**Grid-blowout gotcha hit while building this:** giving triptych/duo
items `width:100%` on the `<img>` was not enough to keep them inside
their grid track — CSS Grid items default to `min-width: auto`, which
factors in the image's *intrinsic* width (1552px for the design-system
PNGs) as a floor, blowing the column width out and overflowing the
viewport. Fixed with `min-width: 0` on `.triptych__item` and
`.duo__item`. Same fix as the flex/grid "min-width:auto" gotcha
generally — worth checking first any time an image inside a grid or
flex item overflows its container despite `width:100%` on the image
itself.

**Homepage wiring:** the Multimedia project-band's link is now
`href="multimedia.html"` (was the unfixed `/multimedia` clean-URL
form, since the page didn't exist yet) — same relative-link pattern as
the other three project bands.

**Copy transcription note:** two mono meta captions (`Character
Study`'s "3D Animation · Maya, 2025" and the triptych captions
"Wordmark" / "Poster" / "Instrument") were transcribed from
`screenshots/multimedia-gallery.png` at the outer limit of what's
legible — that PNG is only 466px wide and this text renders at ~7px
tall in it, right at the resolution floor. Read as confidently as
possible via pixel-level crops and contrast enhancement, but if a
higher-resolution reference ever surfaces, re-check these two spots
specifically.

## Gotchas learned (don't rediscover these)

- **Details-strip border: don't put the frame on the container when the
  container has its own `padding-inline`** (shared component, fixed once,
  applies to all four pages that use `.details-strip` — Herakify, Harmony,
  Yakabod, Multimedia). The original approach put `border-top`/`border-left`
  on `.details-strip` itself and `border-right`/`border-bottom` on every
  `.details-strip__cell`, expecting the two to meet and form one box. They
  didn't: `.details-strip` also carries `class="grid"`, which sets
  `padding-inline: clamp(24px, 4vw, 48px)` on the container — and a border
  draws at the OUTER edge of that padding, while the grid *cells* (its
  children) sit *inset* inside the padding. So the container's own
  border-top/border-left was a fixed 24-48px away from where the cells
  actually started, leaving the right side with no edge at all (the
  container had no border-right to begin with) and the bottom rule
  stopping short of the last cell. Fixed by removing the border from
  `.details-strip` entirely and giving every `.details-strip__cell` a full
  `border: 1px solid var(--border)`, then `margin: -1px 0 0 -1px` on the
  cells (with a compensating `margin: ... 0 0 1px` on the container) so
  adjacent cells' borders overlap into a single hairline instead of
  doubling — a standard border-collapse-without-`border-collapse` trick
  that works at any column count (4 cols for case studies, 3 for
  Multimedia's `--3` modifier) and any wrap point, with no per-breakpoint
  `nth-child` logic needed. If a future component needs a bordered grid
  like this, use this pattern, not the container+cells split.
- **`.two-tone-field img`'s `left: 42%` is only correct for images meant
  to straddle the field's 39/61 two-tone split** (phone mockups, mainly)
  — it is NOT a general-purpose centering value. `yak-challenge-2.png`
  (the rebuilt Yakabod Challenge graphic — see the Intentional
  divergences entry) is a self-contained bone-panel graphic, not a
  mockup meant to straddle anything, so at 42% it rendered ~40px off-
  centre (overflowing the left edge slightly, ~78px of dead space on the
  right). Added a `.two-tone-field--centered` modifier (`left: 50%`) and
  applied it to that one field in `yakabod.html`. Don't apply this
  modifier to the OTHER `.two-tone-field` usages (Herakify's
  `herakify-challenge.png`, the intro hero fields) — those are portrait
  mockups that correctly want the 42% straddle per build-spec §7.
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
- **Hero and About's 2-column breakpoint has now been investigated
  TWICE and found already correct at 1200px both times** (matching
  bands). Second pass used fresh `browser.newContext()` per width (no
  shared cache/session state) at 1200/1250/1300/1349/1512/1680px —
  side-by-side at every one, tracks shrinking gracefully, no overflow.
  Also re-audited the full cascade (grepped every `.hero`/`.hero__intro`/
  `.hero__image`/`.about__inner`/`.about__image`/`.about__content`
  occurrence in `styles.css` for a duplicate/conflicting rule, the exact
  bug class the report suspected) and found nothing. If this is reported
  as broken a third time, the CSS is very unlikely to be the cause —
  check what's actually being tested (live Vercel preview vs. local,
  deployed commit vs. latest, actual OS/browser zoom level) before
  touching this code again. Still re-verify fresh rather than trusting
  this note blindly; "correct twice" isn't a standing guarantee, but it
  is a strong prior against a third from-scratch investigation being the
  right use of time before checking the test conditions first.
- **Flood-fill technique for fixing baked-in corner colour without a
  pre-corrected file:** sample the actual corner colour (don't assume it
  matches the CSS token exactly — Harmony's baked jade was a few values
  off from `--jade`), BFS flood-fill from every border pixel matching
  that colour within a tolerance (~30) to a boolean mask, set alpha to 0
  for the mask, then dilate the mask 2px using a *looser* tolerance
  (~60) to also clear the anti-aliased edge halo without needing a
  separate erosion pass. Verify by compositing the result onto a
  checkerboard and eyeballing the edges (checked here that the phone
  frame outline wasn't eaten into). Plain BFS + numpy is enough — no
  `scipy` needed and it isn't installed in this environment anyway.

## Current state (VERIFY with git first)

The homepage has had eight fix passes (uppercase two-line name, jaguar
height cap, nav alignment, band gaps, `#work` scroll-margin, hamburger
mobile nav, a measured spacing pass, the nav full-bleed fix, jaguar
caption centring, project marks retightened to ~90%, the container widen
to ~1680px with a larger `display-xl`, the hero text/jaguar gap rebalance,
larger hero tagline/meta, a full About panel redesign, and now the hero
jaguar re-centred in the space right of the text — see Intentional
divergences for current numbers, don't trust earlier History for exact
values on anything touched more than once). The Multimedia band's asset
was swapped to a portrait image. **All four homepage project-band links
now use the `.html` form** (`herakify.html` / `harmony.html` /
`yakabod.html` / `multimedia.html`).

**All three case-study pages are built and consolidated**:
`herakify.html` (the original, and the reusable template — see "Case
study template" above), `harmony.html` and `yakabod.html` (both cloned
from it — same structural pattern, content/accent/asset swaps). All
three now carry the Konrad-review polish pass too (see the three
divergence entries above: section relabel to Challenge/Research/
Solution/Impact, "What I Learned" as a full-width closing block, and
the 18px body bump + paragraph splits/bolding) — all template-level, so
all three stayed in sync automatically or via mirrored edits. All three
are wired together and into the homepage using the `.html` link form
(Herakify → Harmony → Yakabod → Herakify, `.next-project` teasers all
point the right direction). Harmony's `harmony-profile-2.png` /
`harmony-events-2.png` and Yakabod's `yak-challenge-2.png` got the same
corner-transparency/rebuild-plus-rename pattern as `harmony-match-2.png`
and `herakify-map-2.png` before them (five instances of this pattern
now — see Gotchas for the flood-fill technique if a sixth comes up).
See Gotchas for implementation notes and **Intentional divergences from
build-spec / Figma** above for what's deliberately off-spec and why.

**The Multimedia gallery (`multimedia.html`) is built** — a distinct
page structure, not a case-study template clone — and has also had its
own consistency pass (mark/eyebrow order matched to the case studies,
caption system unified across all three sections, Visual Systems intro
rewritten as process evidence). See "Multimedia gallery — distinct page
structure" above for its sections and gotchas.

**Resume link fixed:** every page's nav AND footer "Resume" link points
to `spencer-lewis-design-resume.pdf` (Spencer's newer resume, with
small edits, pulled in from `~/Desktop/portfolio assets/` — that folder
is where Spencer stages new assets before they're brought into the
repo, worth checking there first for future asset requests). The file
actually lives at the **project root**, not in `assets/` — same place
the old `resume.pdf` was, despite build-spec/task language sometimes
calling it an "assets/" file. The old `resume.pdf` is left in place,
untouched and fully unreferenced — don't delete it without being
asked, but don't wire anything to it either.

**Nav is now Home / About / Resume** (sitewide) — "Work" was dropped,
see the Intentional divergences entry above. Case-study/Multimedia
"← Back" links are unaffected, still `/#work`.

**The site is live in production.** `redesign` was merged into `main`
with `--no-ff` and pushed — Vercel auto-deploys `main` to
spencerhlewis.com. `redesign` and `v1-archive` were both kept as
branches (not deleted) per standing instruction, purely as history at
this point; all new work should branch off `main` going forward, not
off the now-merged `redesign`. `vercel.json` has `"cleanUrls": true` so
the clean `/herakify` / `/harmony` / `/yakabod` paths resolve on the
live deploy. The current Konrad-review polish pass above was done on
its own short-lived branch off `main`, verified, then merged and pushed
the same way — follow that same pattern (branch → verify at
1200/1349/1680/390 → merge `--no-ff` into `main` → push) for any future
change now that the site is live, rather than committing straight to
`main`.

**Run `git log`/`git status` to see what is committed versus still in the
working tree, and commit anything uncommitted before continuing.**

Not started: mobile refinement beyond the hamburger.
