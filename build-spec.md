# spencerhlewis.com — Build Spec

Handoff document for implementation. Paste this into Claude Code alongside the
desktop screenshots and exported assets.

---

## 0. How to use this

Attach alongside:
- Desktop screenshots of all five pages
- Mobile screenshot of the homepage
- `/assets` folder: project marks (SVG), jaguar hero (PNG), all project screens,
  Yakabod graphics, multimedia images

Desktop layouts are authoritative — match them closely. Mobile follows the
rules in section 5.

---

## 1. Design tokens

Define these as CSS custom properties. Nothing in the build should use a raw
hex value.

```css
:root {
  /* colour */
  --bone:       #F4EFE6;  /* page background. NEVER substitute white */
  --bone-deep:  #EAE3D6;  /* image fields, secondary surfaces */
  --ink:        #1A1613;  /* body text, inverted section backgrounds */
  --ink-soft:   #3D3630;  /* secondary text */
  --muted:      #8A8175;  /* metadata, captions, Yakabod accent */
  --vermillion: #C1392B;  /* primary accent, Multimedia accent */
  --jade:       #1F5C4A;  /* Harmony accent */
  --ochre:      #D89B2C;  /* Herakify accent */
  --border:     #D6CDBE;  /* hairlines, dividers */

  /* spacing — 8px base */
  --space-2xs:  4px;
  --space-xs:   8px;
  --space-s:   16px;
  --space-m:   24px;
  --space-l:   48px;
  --space-xl:  96px;
  --space-2xl:192px;

  /* radius */
  --radius-none: 0;
  --radius-sm:   4px;
}
```

**Colour rules**
- Vermillion is the only accent that appears sitewide (links, section labels)
- Jade and ochre are project-scoped — they only appear on their own project's
  card and case study
- Never more than two accents visible in one viewport
- Accent marks, it never fills body text

---

## 2. Typography

Three families, all Google Fonts: **Instrument Serif**, **Archivo**,
**JetBrains Mono**.

| Token | Family | Desktop | Mobile | Line height | Tracking |
| :---- | :---- | :---- | :---- | :---- | :---- |
| display-xl | Instrument Serif | 120px | 56px | 0.95 | -0.01em |
| display-l | Instrument Serif | 80px | 40px | 1.0 | -0.01em |
| h1 | Instrument Serif | 56px | 32px | 1.1 | 0 |
| h2 | Instrument Serif | 36px | 28px | 1.2 | 0 |
| h3 | Archivo Medium | 22px | 19px | 1.3 | 0 |
| body-l | Archivo | 20px | 17px | 1.6 | 0 |
| body | Archivo | 17px | 16px | 1.65 | 0 |
| body-s | Archivo | 15px | 14px | 1.6 | 0 |
| label | JetBrains Mono | 11px | 11px | 1.4 | 0.05em |
| meta | JetBrains Mono | 12px | 12px | 1.5 | 0.02em |

**Rules**
- Labels and section markers are ALWAYS uppercase
- Body copy max width 640px (~68 characters)
- Instrument Serif never below 22px
- JetBrains Mono never above 14px
- Section markers: `01 / CHALLENGE` — numeral in project accent, label in ink

---

## 3. Layout & grid

| Property | Desktop ≥1200 | Tablet 768–1199 | Mobile <768 |
| :---- | :---- | :---- | :---- |
| Max content width | 1240px | full − margins | full − margins |
| Columns | 12 | 8 | 4 |
| Gutter | 24px | 20px | 16px |
| Page margin | 96px | 48px | 24px |
| Reading column | 640px | 640px | full |

Breakpoints: `1200px` and `768px`.

---

## 4. Global rules

- **No drop shadows anywhere.** Separation comes from the bone-deep fields.
- Media corner radius `4px`. Colour fields and inverted sections `0`.
- Tap targets minimum 44px on mobile.
- `prefers-reduced-motion` disables all reveals and any idle animation.

**Motion**
| Element | Behaviour | Timing |
| :---- | :---- | :---- |
| Section reveal on scroll | 16px rise + fade, at 15% viewport entry | 600ms ease-out |
| Project card hover | Image scale 1.03, accent underline draws left→right | 300ms ease-out |
| Link hover | Underline draws in, colour → vermillion | 200ms |
| Cursor | Default. No custom cursor. | — |

No parallax. No scroll-jacking. Case study pages only move on reveals and
link states.

---

## 5. Responsive rules

Desktop is designed. These describe what happens below `768px`.
Tablet (`768–1199px`) keeps desktop structure with reduced margins and an
8-column grid.

### 5.1 Global

- Nav: four links collapse to a hamburger, 44px tap target
- All multi-column layouts become single column
- Section spacing drops from `--space-2xl` to `--space-xl`
- Mono labels stay 11px — do not scale them down

### 5.2 Homepage

**Hero** — stacks: name → tagline → mono meta row → jaguar image at full
column width → mono caption beneath.

**Selected Work** — the four bands stack into one column. Alternating
left/right is **dropped entirely**. Each band becomes:
1. Square two-tone image field, full column width
2. 24px gap
3. Mark, category tag, headline, project name, chips, accent link — all
   left-aligned beneath

64px between bands. Skill chips wrap to multiple lines rather than shrinking.

**About strip** — portrait image first at full width, then label, paragraph,
link. Keeps the inverted `--ink` background, 48px internal padding.

**Footer** — links stack vertically, left-aligned.

### 5.3 Case studies

**Intro** — the two-column hero stacks. Order: back link → category tag →
mark → title → description → hero image field beneath. The image field
changes from 4:5 to a square at full column width.

**Details strip** — the four-cell horizontal row becomes a **2×2 grid**.
Hairlines run between cells in both directions. Below 480px it becomes a
single column with hairlines between rows.

**Challenge** — text first, then the supporting image field at full column
width beneath. Field height auto, image at 84% of field height.

**Solution bands** — this is the most important one. Bands stay full-bleed
edge to edge in the project accent, but:
- Alternating direction is dropped — every band is image-then-text
- Band height becomes auto rather than fixed
- Image sits centred at 80% of column width, 48px padding above
- Heading and description sit beneath the image, left-aligned, 32px gap
- Bands still stack directly against each other with no gap between them

**Impact** — the three metric blocks become a single column, left-aligned,
32px apart. Numerals stay Instrument Serif but step down to 40px. The
What I Learned block keeps its 3px accent left border.

**Next project** — unchanged, full width.

### 5.4 Multimedia

**Section 1 (Motion)** — unchanged, already full width. The caption row
stacks: title, then meta beneath.

**Section 2 (Visual Systems triptych)** — the three 3:2 images become a
single column stack, 32px apart. Each keeps its mono caption beneath. The
shared description sits below all three.

**Section 3 (Illustration & Photography)** — the asymmetric two-up becomes a
single column. The 64px vertical offset is dropped. Each image keeps its
title, meta, and description beneath it. 64px between the two.

---

## 6. Page structure

Single page with anchor navigation, plus separate case study routes.

| Route | Content |
| :---- | :---- |
| `/` | Hero, Selected Work, About strip, footer |
| `/#work` | Anchor to Selected Work |
| `/#about` | Anchor to About strip |
| `/herakify` | Case study — accent `--ochre` |
| `/harmony` | Case study — accent `--jade` |
| `/yakabod` | Case study — accent `--muted` |
| `/multimedia` | Gallery — accent `--vermillion` |
| Resume | External PDF link, opens in new tab |

Nav links: Home / Work / About / Resume.

---

## 7. Component patterns

**Two-tone image field** — the signature element. A container split
vertically: left 39% `--bone-deep`, right 61% the project accent. Hard edge,
no gradient. `4px` radius on the container. The image inside sits at 82–88%
of container height, fully visible, horizontally centred at 42% of container
width so it straddles the split.

**Project mark** — 56px square of the project accent colour, `--ink` glyph.
The glyph fills ~90% of the square on its larger dimension, evenly padded and
optically centred — trim each SVG's viewBox to the glyph's own tight bounds
rather than relying on a fixed pixel inset, since different glyph shapes need
different padding to read as visually equal.

**Section marker** — `01 / CHALLENGE`. Numeral in project accent, slash and
label in `--ink`. JetBrains Mono 11px uppercase, 0.05em.

**Skill chip** — JetBrains Mono 11px, 1px `--border`, `4px` radius,
8px × 12px padding.

**Details strip** — horizontal row, 1px `--border` hairlines between cells.
Label in mono 11px uppercase `--muted`, value in mono 12px `--ink`.

**Metric block** — Instrument Serif numeral (56px desktop / 40px mobile),
mono 11px uppercase `--muted` label beneath.

**What I Learned block** — 3px left border in the project accent, 24px left
padding, body text at 17px.

---

## 8. Assets

All assets live in `/assets`. Exact filenames and placements:

### Marks — SVG, 48px, ink fill on an accent square

| File | Accent square |
| :---- | :---- |
| `mark-herakify.svg` | `--ochre` |
| `mark-harmony.svg` | `--jade` |
| `mark-yakabod.svg` | `--muted` |
| `mark-multimedia.svg` | `--vermillion` |

### Homepage

| File | Placement |
| :---- | :---- |
| `jaguar-vermillion-clean.png` | Hero. Transparent PNG — sits directly on bone, no container, no field. |
| `herakify-map.png` | Herakify band, two-tone field |
| `harmony-match.png` | Harmony band, two-tone field |
| `yak-hero.png` | Yakabod band, two-tone field |
| `multimedia-ink.jpg` | Multimedia band, two-tone field |
| `portrait.jpg` | About strip |

### Herakify — accent `--ochre`

| File | Placement |
| :---- | :---- |
| `herakify-map.png` | **Hero** and Solution feature block 1 |
| `herakify-challenge.png` | Challenge supporting image |
| `herakify-chat.png` | Solution feature block 2 |
| `herakify-exhibit.png` | Solution feature block 3 |

### Harmony — accent `--jade`

| File | Placement |
| :---- | :---- |
| `harmony-landing.png` | Hero |
| `harmony-challenge.png` | Challenge supporting image |
| `harmony-match.png` | Solution feature block 1 |
| `harmony-profile.png` | Solution feature block 2 |
| `harmony-events.png` | Solution feature block 3 |

### Yakabod — accent `--muted`

All Yakabod graphics are 252 × 508 portrait, sitting on a `--bone` panel with
40px internal padding and `4px` radius, inside the two-tone field.

| File | Placement |
| :---- | :---- |
| `yak-hero.png` | Hero |
| `yak-challenge.png` | Challenge supporting image |
| `yak-coverage.png` | Solution feature block 1 — Test Coverage |
| `yak-defects.png` | Solution feature block 2 — Defect Tracking |
| `yak-docs.png` | Solution feature block 3 — Documentation Standards |

### Multimedia — accent `--vermillion`

| File | Placement |
| :---- | :---- |
| `multimedia-animation.png` | Section 1, full-width 16:9 |
| `design-system-1.png` | Section 2 triptych, left |
| `design-system-2.png` | Section 2 triptych, centre |
| `design-system-3.png` | Section 2 triptych, right |
| `multimedia-ink.jpg` | Section 3, left |
| `multimedia-stage.jpeg` | Section 3, right |

### Notes

- The jaguar must stay the **vermillion** version — the original pure red
  vibrates against bone.
- Herakify's hero and its first Solution feature block use the same file
  (`herakify-map.png`). That's intentional.
- Yakabod graphics are flat colour and compress well; the phone screens do not.
  Serve WebP with PNG fallback.

---

## 9. Build notes

- Static site. No CMS, no backend.
- Semantic HTML — `<nav>`, `<main>`, `<article>`, `<footer>`.
- Images: WebP with PNG fallback. Lazy-load everything below the fold.
- Self-host the three fonts rather than using Google's CDN. `font-display: swap`.
- Alt text on every image.
- The hamburger menu needs keyboard focus handling and an escape-to-close.
- Test the two-tone fields carefully at the 768px breakpoint — the 39/61 split
  is the thing most likely to break.
