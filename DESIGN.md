---
name: Bhuvana Sundaram
description: A quiet, dark, single-page portfolio in ink navy and marigold for a frontend-focused full-stack engineer.
colors:
  ink-navy: "hsl(229 36% 9%)"
  ink-elevated: "hsl(229 32% 12%)"
  ink-tile: "hsl(229 26% 16%)"
  warm-paper: "hsl(35 30% 91%)"
  warm-muted: "hsl(30 7% 68%)"
  warm-subtle: "hsl(30 5% 52%)"
  marigold: "hsl(39 87% 61%)"
  hairline: "hsl(35 30% 91% / 0.1)"
  hairline-strong: "hsl(35 30% 91% / 0.2)"
typography:
  display:
    fontFamily: "Literata Variable, ui-serif, Georgia, serif"
    fontSize: "clamp(2.75rem, 6vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Literata Variable, ui-serif, Georgia, serif"
    fontSize: "clamp(2rem, 3.6vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Literata Variable, ui-serif, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.25
  body-lead:
    fontFamily: "Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
  mono:
    fontFamily: "JetBrains Mono Variable, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.33
    fontFeature: "tnum"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  gutter-sm: "20px"
  gutter-md: "32px"
  gutter-lg: "64px"
  section-y: "64px"
  section-y-lg: "96px"
  content-max: "68rem"
  rail-width: "13rem"
components:
  text-link:
    textColor: "{colors.marigold}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: "44px"
  text-link-hover:
    textColor: "{colors.warm-paper}"
  text-link-quiet:
    textColor: "{colors.warm-muted}"
    typography: "{typography.label}"
    height: "44px"
  text-link-quiet-hover:
    textColor: "{colors.warm-paper}"
  nav-item:
    textColor: "{colors.warm-muted}"
    typography: "{typography.label}"
    padding: "8px 0"
  nav-item-active:
    textColor: "{colors.marigold}"
  tag:
    textColor: "{colors.warm-muted}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  logo-tile:
    backgroundColor: "{colors.ink-tile}"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.none}"
    size: "32px"
  tool-chip:
    backgroundColor: "{colors.ink-elevated}"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.none}"
    padding: "8px 12px 8px 8px"
  project-card:
    backgroundColor: "{colors.ink-elevated}"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.none}"
    padding: "20px"
  round-button:
    backgroundColor: "{colors.ink-elevated}"
    textColor: "{colors.warm-muted}"
    rounded: "{rounded.full}"
    size: "36px"
  round-button-hover:
    textColor: "{colors.marigold}"
---

# Design System: Bhuvana Sundaram

## Overview

**Creative North Star: "The Ink-and-Marigold Notebook"**

A quiet, single-column reading page on a deep ink-navy ground, with warm paper-coloured text and one marigold voice. The structure is deliberately plain: a fixed left menu, sections separated by hairlines, serif headings, and text links instead of buttons. The personality comes from small, reused touches rather than spectacle: one italic marigold word in every section heading, a single programming-language word that softly rotates in the hero, company and tool marks drawn as single-colour glyphs, and a cat in the menu that talks when clicked.

Density is relaxed and editorial. Edges are square, surfaces are flat, depth comes from tone (ground, elevated, tile) and 10% / 20% hairlines. Motion is limited to colour transitions, a small north-east nudge on outbound arrows, the rotating word, and the cat; all of it collapses under reduced motion. The confirmed anti-reference (from PRODUCT.md) is the old site: starfields, glass cards, gradient text, floating blobs and magnetic buttons.

**Key Characteristics:**
- Dark only; ink-navy ground, warm text, a single marigold accent.
- Literata headings with one italic marigold word; Hanken Grotesk body; JetBrains Mono for dates and the rotating word.
- Square corners everywhere except small circular controls.
- Underlined text links; no filled buttons.
- Flat tonal layering with hairline borders; shadows only on floating overlays.
- Logos rendered as monochrome marks inside muted square tiles.

## Colors

A near-monochrome warm-on-ink palette with one saturated marigold that is reserved for emphasis and state.

### Primary
- **Marigold** (hsl(39 87% 61%)): the only accent. Primary text links and their underline, the active nav item, the italic accent word in each heading, inline emphasis spans in prose, experience dates, list diamond bullets, hover borders on project media and cards, the focus ring, and text selection.

### Neutral
- **Ink Navy** (hsl(229 36% 9%)): page ground and mobile top bar.
- **Ink Elevated** (hsl(229 32% 12%)): the desktop menu rail, mobile nav drawer, personal-project cards, tool chips, and floating overlays.
- **Ink Tile** (hsl(229 26% 16%)): the fill of logo tiles only.
- **Warm Paper** (hsl(35 30% 91%)): headings, the name, titles, and primary readable text.
- **Warm Muted** (hsl(30 7% 68%)): body paragraphs, section intros, quiet links, inactive nav, tags.
- **Warm Subtle** (hsl(30 5% 52%)): taglines, locations, secondary dates, outbound arrow at rest, footer links.
- **Hairline** (hsl(35 30% 91% / 0.1)): default border on every element: section dividers, rail edge, tiles, cards.
- **Hairline Strong** (hsl(35 30% 91% / 0.2)): screenshot frames, tags, round controls, quiet link underline, scrollbar thumb.

### Named Rules
**The One Marigold Rule.** Marigold is the only hue on the page. It marks emphasis, the current place, and interaction, never a fill behind large areas; the only filled marigold surface is the skip link and text selection.

**The Borrowed Border Rule.** Borders are always the text colour at 10% or 20% alpha, never a separate grey, so lines stay warm on the navy ground.

**The Two Pools Rule.** The content background carries two faint fixed radial gradients: a marigold glow at 7% from the top right and a deep blue pool (hsl(229 55% 22% / 0.45)) from the bottom left. The menu rail alone carries a 32px grid of faint plus marks (text colour at 14%). Neither pattern appears anywhere else.

## Typography

**Display Font:** Literata Variable (with ui-serif, Georgia)
**Body Font:** Hanken Grotesk Variable (with ui-sans-serif, system-ui)
**Label/Mono Font:** JetBrains Mono Variable (with ui-monospace)

**Character:** A bookish, optical-size serif for headings against a clean, slightly warm grotesk for reading; the mono is a small engineer's signature, used sparingly.

### Hierarchy
- **Display** (500, clamp(2.75rem, 6vw, 4.5rem), 1.05, -0.025em): the name in the hero only, set on two lines.
- **Headline** (500, clamp(2rem, 3.6vw, 2.75rem), 1.1, -0.02em): one per section, with a single italic marigold word.
- **Title** (500, 1.125rem to 1.5rem, tight leading): project, company and passion titles. Featured work at 1.5rem, cards and companies at 1.25rem, compact rows and captions at 1.125rem.
- **Body lead** (400, 1.125rem): the hero summary line; section intros sit at 1rem in Warm Muted.
- **Body** (400, 0.9375rem, 1.6): paragraphs and highlights in Warm Muted; card descriptions drop to 0.875rem. Prose blocks are capped near 56rem.
- **Label** (500, 0.875rem): text links, nav items, the small list subheads ("Earlier", "Stack", "AI tools") in Warm Muted, sentence case.
- **Mono** (400, 0.75rem, tabular numerals): employment dates. The rotating hero word uses the same family at 600, 1.0625rem.

### Named Rules
**The Italic Word Rule.** Every section headline carries exactly one italic word in Marigold at normal weight. One word, never a phrase, never the whole heading.

**The No Full Stop Rule.** Headings and the name never end in a full stop.

**The Mono Is For Time Rule.** JetBrains Mono appears only for dates and the rotating language word. It is not used for tags, nav, or labels.

## Layout

Desktop (1024px and up) is a fixed left rail (13rem) on Ink Elevated with section nav at the top and the cat button at the bottom; content sits to its right in a centred column capped at 68rem with 20 / 32 / 64px side gutters by breakpoint. Below 1024px the rail becomes a sticky 56px top bar with the name in Literata and a Menu text button that opens an elevated drawer holding the same nav and cat.

Sections are stacked full-width bands separated by a top hairline, with 64px vertical padding (96px from 768px). The hero is roughly 88% of the viewport tall on desktop, with text left and a 4:5 portrait right (up to 19rem). Grids: featured work 2 columns; earlier work 2 columns of compact rows (8rem thumbnail plus text); personal projects 2 then 3 columns; experience as rows with a 14rem company column; toolkit 2 / 3 / 4 columns; outside work a 12-column collage (5 + 7) where the tall photo stretches to match its neighbours. Anchor scrolling is smooth with a scroll padding of 1.5rem (4.5rem under the mobile bar).

## Elevation & Depth

The page is flat. Depth is tonal: Ink Navy ground, Ink Elevated for the rail, cards, chips and drawers, Ink Tile for logo tiles, each edged with a hairline. Shadows exist only on the two floating overlays that sit above content.

### Shadow Vocabulary
- **Bubble float** (`box-shadow: 0 12px 32px -12px rgba(0,0,0,0.6)`): the cat's speech bubble.
- **Popover float** (`box-shadow: 0 16px 40px -16px rgba(0,0,0,0.7)`): the "how this site was built" card in the footer.

### Named Rules
**The Flat Page Rule.** Nothing in the document flow casts a shadow. Only elements that float over content (bubble, popover) get a soft, dark, downward shadow.

## Shapes

Square corners (0px) are the default for every surface: images, screenshots, cards, chips, tags, tiles, overlays. The radius exceptions are small, round, icon-only controls (the 40px cat button and the 36px back-to-top button, fully round) and the cat's speech bubble (16px with a 2px tail corner at bottom left), which belongs to the easter egg. Screenshots carry a strong hairline frame; portrait and outside-work photos sit unframed. List bullets in experience are small rotated squares outlined in Marigold.

## Components

### Text links
Understated and typographic; the site has no filled buttons.
- **Shape:** inline text, 44px minimum hit height, 1px underline offset 6px.
- **Primary:** Marigold text and underline; hover turns text Warm Paper.
- **Quiet:** Warm Muted text with a Hairline Strong underline; hover turns both Warm Paper.
- **Arrows:** links that stay on the page have no icon. Anything that leaves the page ends in a north-east arrow (15-20px, stroke 1.75) that nudges up and right on hover and turns Marigold. The large contact email is a primary text link at 1.125rem.

### Tags
- **Style:** Hairline Strong 1px border, no fill, Warm Muted 0.75rem text, 2px 8px padding, square.

### Logo tiles
- **Style:** a 32px square (24px inline in the hero, 44px for companies) filled with Ink Tile and a hairline, holding one monochrome mark in Warm Paper. Company logos are raster files masked to a single colour; tool logos are Simple Icons glyphs. Both read as the same family.

### Cards / Containers
- **Personal project card:** Ink Elevated fill, hairline border, square, 16:10 screenshot across the top divided by a hairline, 20px body padding, tags pinned to the bottom. Whole card is the link; hover turns the border Marigold.
- **Featured and compact work rows:** unboxed. The screenshot frame turns Marigold on hover and the title turns Marigold.
- **Tool chip:** Ink Elevated fill, hairline border, logo tile plus name; hover strengthens the border.

### Navigation
- **Style:** a plain vertical list of section names in the label style, 8px vertical padding. Inactive is Warm Muted, hover Warm Paper, the current section Marigold (tracked by scroll position). No numbering, bars or icons.
- **Mobile:** sticky top bar on the ground colour with a hairline bottom; Menu / Close text button with a small icon reveals an elevated drawer.

### Round controls
- **Cat button:** 40px circle, Hairline Strong border, Warm Subtle icon; hover or talking turns border and icon Marigold, with a short wiggle.
- **Back to top:** 36px circle on Ink Elevated, fixed bottom right, appears after the hero leaves view with a fade and 8px rise.

### Cat easter egg (signature)
Clicking the menu cat shows a speech bubble near the bottom left for six seconds: Ink Elevated, Hairline Strong border, 0.875rem text, the bubble radius described in Shapes, and a short spring pop-in. Lines cycle on each click and are announced politely to screen readers.

## Do's and Don'ts

### Do:
- **Do** keep Marigold (hsl(39 87% 61%)) as the only accent and spend it on emphasis, the current place, and interaction.
- **Do** give every section headline exactly one italic Marigold word, with no trailing full stop.
- **Do** draw borders as the text colour at 10% or 20% alpha.
- **Do** use underlined text links for actions; add the north-east arrow only when the link leaves the page.
- **Do** render any new logo as a single-colour mark inside a square Ink Tile tile.
- **Do** keep surfaces square (0px) and flat; reserve full rounding for small icon-only circular controls.
- **Do** respect reduced motion: every transition and animation collapses to near zero.

### Don't:
- **Don't** add filled or pill buttons; actions are text links.
- **Don't** introduce a light theme or a second accent hue.
- **Don't** put shadows on in-flow content; only floating overlays get one.
- **Don't** use JetBrains Mono for labels, tags or navigation.
- **Don't** add the starfields, glass cards, gradient text, floating blobs or magnetic buttons of the old site (PRODUCT.md anti-reference).
- **Don't** extend the plus-mark grid or the radial glows to other surfaces; the grid belongs to the rail, the glows to the page ground.
