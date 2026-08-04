---
name: Head & Co.
description: A head spa in Jeddah, set in warm paper and quiet serif — a system built to ask nothing of the reader.
colors:
  ricepaper: "oklch(0.953 0.013 86.8)"
  paper-high: "oklch(0.972 0.01 86)"
  oat: "oklch(0.9 0.02 80.1)"
  sand: "oklch(0.816 0.03 77.5)"
  gilt: "oklch(0.656 0.033 72)"
  taupe: "oklch(0.5 0.026 70)"
  taupe-deep: "oklch(0.52 0.026 68)"
  ink-mid: "oklch(0.4 0.02 68)"
  walnut: "oklch(0.359 0.032 58.9)"
  espresso: "oklch(0.266 0.016 67)"
  moss: "oklch(0.44 0.033 118.5)"
  moss-light: "oklch(0.482 0.033 118.5)"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(2.75rem, 7vw, 6.25rem)"
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: "-0.02em"
  h1:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(2.5rem, 6.4vw, 5.25rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(2rem, 4.2vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.07
    letterSpacing: "-0.015em"
  h3:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2.125rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "normal"
  h4:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  lead:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(1.25rem, 2vw, 1.625rem)"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  price:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: "normal"
  meta:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.22em"
  micro:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.28em"
  menu:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(1.75rem, 6vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  figure:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: "normal"
  glyph:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "2.75rem"
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: "normal"
  arabic:
    fontFamily: "IBM Plex Sans Arabic, sans-serif"
    fontSize: "clamp(1.0625rem, 1.6vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: "normal"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.06em"
rounded:
  sm: "2px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 4vw, 48px)"
  container: "1320px"
  section: "clamp(88px, 13vh, 168px)"
  section-tight: "clamp(56px, 9vh, 104px)"
  header: "76px"
components:
  button-primary:
    backgroundColor: "{colors.espresso}"
    textColor: "{colors.ricepaper}"
    typography: "{typography.meta}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "42px"
  button-primary-hover:
    backgroundColor: "{colors.walnut}"
    textColor: "{colors.ricepaper}"
  button-invert:
    backgroundColor: "{colors.ricepaper}"
    textColor: "{colors.espresso}"
    typography: "{typography.meta}"
    rounded: "{rounded.pill}"
    padding: "0 34px"
    height: "56px"
  button-invert-hover:
    backgroundColor: "{colors.oat}"
    textColor: "{colors.espresso}"
  button-ghost:
    textColor: "{colors.ricepaper}"
    typography: "{typography.meta}"
    rounded: "{rounded.pill}"
    padding: "0 30px"
    height: "56px"
  service-row:
    textColor: "{colors.espresso}"
    padding: "28px 12px 28px 0"
  service-row-hover:
    backgroundColor: "{colors.oat}"
  badge-signature:
    textColor: "{colors.moss}"
    typography: "{typography.micro}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  monogram-tile:
    backgroundColor: "{colors.oat}"
    textColor: "{colors.taupe}"
    rounded: "{rounded.sm}"
    typography: "{typography.h1}"
  nav-link:
    textColor: "{colors.ink-mid}"
    typography: "{typography.meta}"
  nav-link-current:
    textColor: "{colors.espresso}"
  menu-button:
    textColor: "{colors.espresso}"
    rounded: "{rounded.pill}"
    height: "44px"
    width: "44px"
---

# Design System: Head & Co.

## Overview

**Creative North Star: "The Unhurried Room"**

Every decision in this system exists to remove a demand from the reader. The business sells an hour in which nothing is asked of you, and the interface has to behave the same way: no surface competes for attention, no element arrives with urgency, and nothing moves unless the reader moved it. The palette is a single warm neutral family lit from one direction. There are no shadows anywhere in the implementation — depth comes from tone, and from a hairline.

The room is made of paper. A warm off-white ground carries a 3px radial grain, hairline rules in warm sand divide content instead of boxes, and corners are cut at 2px — near-square, the edge of a printed card rather than the round of a UI panel. Against that, one dark tone does all the heavy work: espresso, used both as ink on paper and as the full-bleed ground of the sections that need to go quiet.

Type carries the whole hierarchy alone. Both families ship in a **single weight** — there is no bold anywhere in this system, on purpose. Emphasis is made from size, family and tone, never from weight. Newsreader's optical-size axis means the 6rem hero and the 1.375rem price are rendered at different design sizes automatically, which is the reason it replaced the previous display face. The anti-reference is the high-contrast fashion serif the site used to wear: glamorous, cold, and wrong for a brand whose whole claim is warmth.

Motion follows the same logic. An element animates when the reader reaches it, once, and then stops; only two things loop, both on the hero — a 26s breathing scale from 1.06 to 1.16, and a 4.5s drift on the scroll cue. Scroll is eased by **Lenis 1.1.18** (vendored at `vendor/lenis.min.js`, 13 KB, no CDN dependency) at `lerp: 0.12`, with `smoothWheel: true` and `syncTouch: false` — touch stays entirely native, because the platform's own momentum beats anything we impose. Lenis eases toward the browser's real scroll position rather than replacing it, so the scrollbar, keyboard, Find-in-page and assistive tooling all still drive the page, and native `scroll` events keep firing for the header, progress rule and parallax. The whole layer is gated behind the motion setting, which defaults to the OS preference: under `prefers-reduced-motion: reduce` Lenis is never constructed and the reader gets plain browser scroll with every hover and state cue intact.

**The Borrowed Scroll Rule.** Ease the wheel; never seize it. `lerp: 0.12` settles in about 200ms. Anything slower reads as floaty and fights the reader — the hand-rolled `0.095` loop this replaced overshot every stop. Touch stays native, and reduced motion disables the layer entirely rather than merely shortening it.

**The Arrival Rule.** An element animates when the reader reaches it, once, and never again. Anything that loops forever has to earn it; exactly two things have.

**Key Characteristics:**
- One warm neutral family, lit from one direction; a single green used only for status
- Zero shadows; depth is tonal, division is a hairline
- Exactly one font weight (400) across both families
- Near-square 2px corners against fully-round pills — no radius in between
- Motion is a response to arrival, never a loop; scroll is eased, never seized

## Colors

A single warm neutral ramp from paper to espresso, with one desaturated green reserved entirely for status. Nothing in the palette is saturated; the warmest value in the system is a hairline.

### Primary
- **espresso** (`oklch(0.266 0.016 67)`): The ink. Body text on paper, and the full-bleed ground of the ritual, reviews and closing sections. The only tone dark enough to invert the page.
- **ricepaper** (`oklch(0.953 0.013 86.8)`): The ground. Page background, and the text colour whenever espresso is the surface. The system's most-used value by a wide margin.

### Secondary
- **sand** (`oklch(0.816 0.03 77.5)`): The hairline. Every divider, table rule and border in the system, plus the accent tone for links and stage numbers on dark grounds. Never a fill.
- **oat** (`oklch(0.9 0.02 80.1)`): The tint. Row hover fills, monogram tiles, and the one section band that needs to separate from ricepaper without going dark.

### Tertiary
- **moss** (`oklch(0.44 0.033 118.5)`): Status only. The "open now" badge and the Signature service pill. The single non-neutral hue in the system, and it appears on at most two elements per page.

### Neutral
- **paper-high** (`oklch(0.972 0.01 86)`): A half-step above ricepaper, for a surface that must read as raised without a border.
- **gilt** (`oklch(0.656 0.033 72)`): Focus rings on dark grounds and the header scroll-progress rule.
- **taupe** (`oklch(0.5 0.026 70)`): Tracked uppercase labels, captions, ratings and footnotes on paper. 5.25:1.
- **taupe-deep** (`oklch(0.52 0.026 68)`): Secondary body copy — descriptions under a heading. 4.83:1.
- **ink-mid** (`oklch(0.4 0.02 68)`): Inactive navigation links. 8.06:1.
- **walnut** (`oklch(0.359 0.032 58.9)`): Inline links on paper, and the primary button's hover ground. 9.59:1.

### Named Rules

**The One Green Rule.** moss is the only hue in the system that is not a warm neutral, and it means *status* — open, signature, confirmed. It never becomes a button, a heading, a border or a background. If a new element wants colour to feel important, it wants size or space instead.

**The Verified Contrast Rule.** Every text tone in this palette has a measured ratio against its intended ground, recorded above. Small text never drops below 4.5:1. A new tint is not in the system until its ratio is measured and written down — the palette failed this once already and it was the most expensive defect in the audit.

**The Hairline Rule.** sand divides; it never fills. Content is separated by a 1px rule and generous space, not by a box, a card or a border-radius. There are no cards in this system.

## Typography

**Display Font:** Newsreader (with Georgia, serif)
**Body Font:** Manrope (with ui-sans-serif, system-ui, sans-serif)
**Arabic Font:** IBM Plex Sans Arabic — loaded *only* on pages that actually set Arabic

**Character:** Newsreader is a warm, low-contrast reading serif with a true optical-size axis, so the same family renders correctly at 6.25rem and at 1.375rem without looking like two different fonts. It reads unhurried rather than editorial. Manrope sits underneath it as a quiet, near-invisible grotesque whose job is to disappear — it never competes for voice, it only carries information.

### Hierarchy
- **display** (400, `clamp(2.75rem, 7vw, 6.25rem)`, 1.0, `-0.02em`): The hero headline. Once per site.
- **h1** (400, `clamp(2.5rem, 6.4vw, 5.25rem)`, 1.02, `-0.02em`): Interior page titles.
- **h2** (400, `clamp(2rem, 4.2vw, 3.75rem)`, 1.07, `-0.015em`): Section headings.
- **h3** (400, `clamp(1.5rem, 2.4vw, 2.125rem)`, 1.15): Sub-headings and ritual stage names.
- **h4** (400, `1.5rem`, 1.2): Specialist names and small card titles.
- **lead** (400, `clamp(1.25rem, 2vw, 1.625rem)`, 1.4): Pull quotes and guest reviews.
- **price** (400, `1.375rem`, 1.3): Service names and their prices. See the Figure Rule.
- **body** (400, `1.0625rem`, 1.8): Primary prose. Held to a 34rem measure — roughly 65ch.
- **body-sm** (400, `0.9375rem`, 1.85): Descriptions beneath a heading, capped at 40ch.
- **meta** (400, `0.8125rem`, 1.6): Captions, ratings, footnotes, button labels.
- **label** (400, `0.75rem`, `0.22em`, uppercase): Section labels and field names.
- **micro** (400, `0.625rem`, `0.28em`, uppercase): The JEDDAH logo tag and the Signature pill.
- **menu** (400, `clamp(1.75rem, 6vw, 2.5rem)`): Full-screen overlay navigation links.
- **figure** (400, `clamp(3rem, 8vw, 6rem)`, 1.0): The 4.9 rating at hero scale. Proof, set large.
- **glyph** (400, `2.75rem`, 1.0): Standalone letterforms and numerals — monogram initials, ritual stage counters.
- **arabic** (400, `clamp(1.0625rem, 1.6vw, 1.25rem)`, 1.85): Arabic copy. Loaded only where Arabic is set.
- **mono** (400, `0.75rem`, `0.06em`): Bracketed placeholder notices marking content awaiting owner confirmation. Never a costume for "technical".

### Named Rules

**The Single Weight Rule.** Both families ship weight 400 and only weight 400. Hierarchy is built from size, family and tone. If a heading is not loud enough, it needs more size or more space around it — never `font-weight: 600`. Shipping a second weight also doubles the font payload, which is how this system previously carried four unused Manrope weights.

**The Figure Rule.** Numbers that are *proof* — the 4.9 rating, the 2,231 review count, SAR prices, durations — are set in Newsreader; the words labelling them stay in Manrope. The serif is what makes a price read as a considered fact rather than a data point. A price set in Manrope is a bug.

**The Role Token Rule.** Every `font-size` resolves to a `--t-*` custom property. No literal `rem` value goes in a `font-size` declaration. The only permitted exception is an `em` value scaling a glyph against its own parent — the trailing `↗`, the inline Arabic gloss — because those are relative by nature and a token would break the relationship. The system previously drifted to 33 ad-hoc sizes, including four near-identical heading ramps doing one job.

**The Arabic Load Rule.** IBM Plex Sans Arabic loads only on pages that actually render Arabic. It was previously loaded on all five pages to serve a single quotation.

## Layout

A single centred column, `1320px` maximum, with a fluid gutter of `clamp(20px, 4vw, 48px)` — the same two values on every page and every section, without exception. Inside it, content grids are declared with `repeat(auto-fit, minmax(...))` so they reflow by available space rather than by breakpoint.

Vertical rhythm is `clamp(88px, 13vh, 168px)` for a full section and `clamp(56px, 9vh, 104px)` for a page head. Section padding is always larger than any gap inside the section, which is what keeps groups reading as groups.

**Breakpoints are used sparingly and only where fluid sizing genuinely cannot express the change** — there are exactly two:

- **860px** — the header's inline navigation gives way to the menu button and the full-screen overlay. Above it the header shows five links and a "Book on Fresha" button; below it, a wordmark, a "Book" button and a menu button, on one 76px row.
- **720px** — service rows drop from three columns (name / duration / price) to two lines: the name across the full width, then duration and price sharing a second line. Fluid sizing cannot undo a `minmax()` floor, which is why this one is a real media query and not a `clamp()`.

The header is `76px` on every page, at every width. Home's is fixed and transparent over the hero, warming to a blurred ricepaper as it scrolls; interior headers are sticky and solid from the first pixel. The wordmark, breakpoint and button label are identical across all five pages so that moving between them never shifts the shell.

### Named Rules

**The Two Breakpoint Rule.** Reach for `clamp()` and `auto-fit` first. A media query is justified only when a layout floor makes fluid sizing impossible. Two exist; a third needs an argument.

**The Sticky Container Rule.** Never put `overflow-x: hidden` on an ancestor of a sticky header. It computes `overflow-y: auto`, silently makes that element the scroll container, and the header stops sticking with no error anywhere. This system shipped that bug on four pages.

## Elevation & Depth

**This system has no shadows.** There is not one `box-shadow` in the implementation, and that is the design, not an omission.

Depth is built three ways: **tone** (an espresso section against a ricepaper one reads as a different plane), **hairline** (a 1px sand rule where a border would otherwise be a box), and **blur** (`backdrop-filter: blur(10px)` on the header alone, so content passing beneath it stays legible). Nothing lifts off the page, because the page is paper.

### Named Rules

**The No Shadow Rule.** A new component does not get a shadow to look separate. It gets a tonal ground, a hairline, or space. If those three cannot express the separation, the hierarchy is wrong, not the depth.

## Shapes

Two radii, at opposite extremes, with nothing in between.

**2px (`rounded.sm`)** on every rectangular surface — images, monogram tiles, map frames, section panels. It is almost square, and reads as a trimmed paper edge rather than a rounded UI element.

**999px (`rounded.pill`)** on everything interactive and small — buttons, badges, the menu button, the skip link. The pill is how the system says *this is a control*.

Borders are 1px and always sand on paper, or ricepaper at 14–40% opacity on espresso. There are no 2px borders, no coloured left-borders, and no card containers anywhere in the system.

### Named Rules

**The Two Radius Rule.** 2px or 999px. An 8px or 12px corner belongs to a different design system and will read as borrowed.

## Components

### Buttons
- **Shape:** Fully round pill (`999px`)
- **Primary:** espresso ground, ricepaper label, `42px` tall, `22px` inline padding. Type is meta at `0.14em` tracking, uppercase. Used in the interior header.
- **Invert:** ricepaper ground, espresso label, `56px` tall, `34px` inline padding. The hero and closing calls to action.
- **Ghost:** transparent with a 1px `currentColor` border at 38% opacity, `56px` tall. The secondary hero action.
- **Hover / Focus:** primary → walnut ground; invert → oat ground plus `translateY(-2px)`. All transitions 500ms. Focus is a 2px gilt or taupe ring at `4px` offset — never removed.
- **Every external button carries a trailing `↗`** marked `aria-hidden`, plus `target="_blank"` and `rel="noopener noreferrer"`.

### Service Row (signature component)
The system's defining pattern and the thing most worth protecting. A full-width link, no card, divided from its neighbours by a sand hairline. Three columns above 720px — name and description / duration / price — collapsing to name-then-duration-and-price below it. The name is `price` type in Newsreader, the description `body-sm` in taupe-deep at 40ch, the price `price` type right-aligned. Hover fills the row with oat at 50%.

Its rule: **the price is never optional and never off-screen.** Answering price before the click is the reason the page exists.

### Monogram Tile
A 3:4 oat tile carrying a single Newsreader initial in taupe, standing in for a specialist portrait. Marked `aria-hidden` because the name follows in text directly beneath. It is a deliberate placeholder with dignity — never "Specialist A", never an empty grey box.

### Navigation
Inline links at meta size in ink-mid, warming to espresso on hover over 400ms; the current page is espresso with a 1px underline and `aria-current="page"`. Below 860px it is replaced by a menu button opening a full-screen espresso overlay: menu-size Newsreader links on hairline dividers, with the invert button pinned beneath them.

The overlay is a real modal — focus moves in on open, is trapped while open, and returns to the button that opened it; Escape closes; body scroll locks; `aria-expanded` tracks state.

### Header
`76px` on every page and width. Transparent over the hero on Home, warming to `ricepaper / 0.9` with `blur(10px)` and a sand bottom rule past 60px of scroll; solid from the start elsewhere. A 1px gilt scroll-progress rule sits along its bottom edge on Home.

## Do's and Don'ts

### Do:
- **Do** resolve every `font-size` to a `--t-*` role token; never write a literal rem value in a `font-size`.
- **Do** set proof numerals — ratings, review counts, SAR prices, durations — in Newsreader, with their labels in Manrope.
- **Do** divide content with a 1px sand hairline and space.
- **Do** measure and record the contrast ratio of any new text tone before it enters the palette.
- **Do** honour `prefers-reduced-motion` by default: stop ambient movement, keep every hover and state cue.
- **Do** ship images as `<picture>` with a WebP `srcset` and explicit `sizes`; `fetchpriority="high"` on the hero, `loading="lazy"` on everything else.
- **Do** keep the header identical across pages — 76px, same wordmark, same 860px breakpoint, same button label.

### Don't:
- **Don't** add a font weight. Both families are 400 and only 400.
- **Don't** add a `box-shadow`. There are none, and depth comes from tone, hairline and blur.
- **Don't** use a corner radius between 2px and 999px.
- **Don't** put content in a card. This system has no cards.
- **Don't** let moss become anything but status. It is not a button, a heading or a border.
- **Don't** ease the wheel aggressively. Smooth scroll is Lenis at `lerp: 0.12`, which settles in about 200ms. The hand-rolled `0.095` loop this replaced overshot every stop and read as floaty. See The Borrowed Scroll Rule.
- **Don't** animate a layout property. Transition `background-color`, `opacity`, `transform`, `clip-path` — never `padding`, `width` or `height`.
- **Don't** put `overflow-x: hidden` on an ancestor of a sticky element.
- **Don't** mix logical and physical properties in one rule. Arabic RTL is a recorded requirement; `padding-inline-start`, never `padding-left`.
- **Don't** state a fact the Fresha listing doesn't support. Invented durations and lettered specialists are what made an earlier draft read as a template.
