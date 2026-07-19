# Homepage Replication Spec — essyudeme.com

A complete, self-contained description of the homepage: stack, design system, and every section in order with layout, styling, copy, and motion. Written so the page can be rebuilt exactly, anywhere, without access to the original code.

---

## 1. Stack & global setup

- **Framework:** Next.js (App Router) + React, TypeScript.
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"`), design tokens defined as CSS variables in `:root` and mapped via `@theme inline`.
- **Motion:** Framer Motion for all animation.
- **Icons:** lucide-react (stroke icons, usually `strokeWidth` 1.8–2.2).
- **Fonts (next/font/google):**
  - **Inter** — body font. Weights 400–800. CSS var `--font-inter`.
  - **Hanken Grotesk** — display font, normal + italic. CSS var `--font-hanken`.
- Page scaffold: `<main class="min-h-screen bg-background pt-6">` containing, in order: Navbar → Hero → Resources (bento) → Manifesto → Projects → Interlude → Choose Your Adventure (marquee) → Newsletter → Footer. A custom round cursor overlays everything.
- **Meta:** title `Essy Udeme — Products, people, and the stories that connect them`; description `Creator, builder, and storyteller. Explore products, journals, research, and ready-to-use templates.`

## 2. Design system

### 2.1 Color tokens (light theme only)

| Token | Value | Use |
|---|---|---|
| `background` | `oklch(0.975 0.004 90)` | page — soft warm off-white |
| `foreground` | `oklch(0.18 0.01 260)` | body text |
| `card` | `#fcfcfb` | card surfaces (never stark white) |
| `ink` | `oklch(0.22 0.005 260)` | deep near-black for dark cards/text |
| `sage` (primary) | `oklch(0.72 0.07 145)` | CTA green |
| `sage-soft` | `oklch(0.92 0.04 140)` | soft green fills |
| `butter` | `oklch(0.9 0.105 93)` | warm yellow (smiley, stars, dots) |
| `butter-soft` | `oklch(0.94 0.058 93)` | soft yellow fills |
| `lavender` | `#e09ff1` | accent (underlines, cursor hover) |
| `lavender-soft` | `#f3ddfb` | soft lavender fills |
| `muted-foreground` | `oklch(0.5 0.01 260)` | secondary text |
| `border` | `oklch(0.92 0.005 90)` | hairlines |

Base radius token: `0.625rem` (cards use much larger explicit radii, see below).

**Hard rule:** no ambient color washes, no gradient backgrounds, no image scrims. Surfaces are flat `card`/`ink`/soft tints. The only gradients anywhere are micro-shading inside the 3D manifesto pills and the glossy cursor ball.

### 2.2 Typography

- **Body:** Inter, `letter-spacing: -0.0375em` (≈ −0.6px at 16px) applied on `html, body`. Antialiased.
- **Display (`.font-display`):** Hanken Grotesk, weight 400, `letter-spacing: -3px` (unlayered CSS so it beats utility tracking classes). Italic display moments use its italic style.
- Common sizes: body/meta text `14px`; card titles `17–20px` semibold, `tracking-tight`; bento titles exactly `20px`; section display headings `clamp(2.5rem–4.75rem)`; hero `clamp(2.35rem, 5.4vw, 4.25rem)`.

### 2.3 Surfaces, shadows, buttons

- Card surfaces: `bg-card` with `ring-1 ring-black/5` and generous radii — `24–28px` small cards, `32–44px` hero-size cards.
- Standard subtle shadow (bento + project cards): `0 1px 2px rgba(0,0,0,0.03), 0 24px 44px -32px rgba(0,0,0,0.14)`.
- **Primary pill button:** `rounded-full bg-sage px-5/6 py-2.5/3 text-[14px] font-medium text-white`, hover → `bg-ink`; when inside a hoverable card the gap between label and arrow widens on hover (`gap-1.5 → gap-2.5`).
- **Outline pill:** `rounded-full border border-ink/15 text-ink`, hover → filled ink.
- **Round arrow chip** (cards): `size-9 rounded-full bg-sage-soft text-ink` with `ArrowUpRight`, hover → `bg-sage text-white`.
- **Floating chip surface** (nav pieces): `rounded-full border border-black/5 bg-card/90 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.12)] backdrop-blur-md`.

### 2.4 Motion language

- Shared easing `EASE = cubic-bezier(0.22, 1, 0.36, 1)`; durations 0.45/0.6/0.85s.
- Default reveal: fade + rise 22px, `whileInView`, `viewport {once: true, margin: "-12%"}`.
- Springs for "sticker" pops: `stiffness ~200–260, damping ~17–20`.
- `editorial-underline` utility: 1.5px underline drawn via background-image that wipes in from the left over 0.45s on hover/focus; rests visible on touch devices.

### 2.5 Custom cursor

On fine-pointer devices the native cursor is hidden (`cursor: none`) and replaced by a 20px glossy ball (black radial shading + white specular highlight) that lerps toward the pointer at 0.15/frame. Hovering any interactive element grows it to 25px and recolors it lavender. Touch devices keep the native cursor.

---

## 3. Navbar

Three floating pieces on the page (bar scrolls away, not sticky), max-width `6xl`:

1. **Wordmark (left, bare):** pulsing butter dot (ping animation) + "Essy Udeme" in display font 19px.
2. **Links pill (dead center, desktop only):** floating-chip surface, 14px muted links: Home, Resources, Projects, About. Active link = `bg-sage-soft font-medium text-ink shadow-sm` pill. **Resources** has a hover dropdown (rounded-3xl card, 3 items with label + 12px description):
   - The Rabbit Hole — "Issues for curious people" → /stories
   - Tools & Templates — "Ready-to-use files" → /resources/tools
   - The Product Lab — "Thinking, ideas & teardowns" → /resources/lab
3. **CTA (right, desktop):** sage pill "Build With Me" → /contact.

**Mobile:** the pill and CTA are replaced by a white floating-chip circle button (size-11, dark Menu/X icon) that expands a rounded-3xl card menu (max-height/opacity transition, 300ms): nav links as rows, the Resources row with a chevron that expands an indented child list, and a full-width sage "Build With Me" at the bottom under a hairline.

---

## 4. Hero

Centered column, max-width `5xl`, `pt-16 pb-16` mobile / `pt-6 pb-36` desktop. Children stagger in (0.14s apart) with fade-up.

1. **SmileyMark:** 56px butter-yellow circle. Inside, a vertical "reel" cycles forever: smiley face (blinks a wink at ~1.4s) → scrolls up → waving hand (rotate −12°↔18° wave) → scrolls back to smiley. Hand-drawn SVG faces, 500ms reel transitions.
2. **Badge:** pill "Open to Collaborations" — card bg, 12px medium text at 70% foreground, pulsing sage dot.
3. **Headline (h1):** display font, `clamp(2.35rem, 5.4vw, 4.25rem)`, `leading-[1.08]`. Base color `foreground/55` (soft grey); the words **"Products, people,"** and **"stories"** are full `foreground` for emphasis. Text: *"Products, people, and the [media] stories between [media] them."* Two 72×44px rounded-2xl **MediaBoxes** sit inline mid-sentence (vertical-align middle), each crossfading through 4 lifestyle photos every 3s (offset from each other so they never match). Mobile breaks into 4 lines — "Products, people," is a block with `mb-[0.14em]` so all line gaps match the media-inflated lines; desktop reads in 3 lines. Choreography: media boxes pop in first (scale 0.6→1 at 0.14/0.18s), words de-blur in left to right (blur 6px→0, 0.4→0.84s delays).
4. **Subline:** 16px muted — `Creator · Builder · Storyteller` (dots at 50% opacity).
5. **CTAs:** sage pill "Explore My Work" (→ #projects, soft sage-tinted shadow, arrow nudges right on hover) + outline pill "Or grab a freebie" (→ #resources).

---

## 5. Resources bento

`max-w-6xl`, 12-column grid × 2 rows on desktop (single column mobile), gap-4. Cards drift in from their side of the grid (outer-left from left −60px, outer-right from right +60px, middle rises 34px), staggered 0.12s. All cards: radius 26px, standard subtle shadow, `bg-card`, hover lifts −4px. **All bento titles are 20px semibold.**

| Position | Card |
|---|---|
| Left, spans 2 rows | **The Rabbit Hole** — photo (4/5) inset in an 18px-radius frame with p-3; butter circle with rabbit icon + eyebrow "THE RABBIT HOLE"; title "Every issue starts with a product."; body "Where it ends is anyone's guess. Follow the trail into the stories hiding in plain sight."; sage pill "Fall in →". Whole card links to /stories. Image zooms 1.08→1 on reveal, 1.04 on hover. |
| Middle top | **Tools & Templates** — sage-soft rounded-xl icon tile (template glyph); title "Tools & Templates"; body "Notion systems, Figma files, and checklists."; bottom row: animated counter **20+** (counts up on view, 28px semibold) over "Ready to use", next to sage pill "Explore →". Two tiny floating "mini-document" cards (white, rotated 8°/−10°) drift in on the right as decoration. → /resources/tools |
| Right top, wide | **The Product Lab** — image (44% width, left) + text column: title "The Product Lab"; body "Product thinking, opportunity finding, and teardowns of products in the wild."; sage pill "Explore →". → /resources/lab |
| Middle bottom, wide | **Headline card** — `bg-sage-soft`, centered: display italic "resources" at `clamp(2.75rem,5vw,4.25rem)` (letter-spacing animates 0.04em → −0.01em as it rises in); below, "You'd want to know my product process, but I too wants to find out." |
| Right bottom | **Profile card** — full-bleed portrait photo, zooms on hover; sage circular globe badge pops in top-left (scale/rotate spring). Whole card → /about. |

---

## 6. Manifesto

Centered, `max-w-4xl`. One long line in display font `clamp(1.7rem, 4vw, 2.9rem)`, `leading-[1.3]`, ink:

> "Around here, ideas turn into websites, apps, decks, stories, & digital experiences built with the user in mind."

- **Scroll-scrubbed typewriter:** every character fades/de-blurs in sequence, driven by scroll progress (scrub, not time), so the sentence types itself as you scroll (window overlap ~4 chars, resolves at 90% of the scroll range).
- **Three glossy 3D tooltip tags** float around the text, springing in (scale 0.4, over-rotated → settle) and bobbing ±6px forever, each offset so they never sync:
  - `@creator` — dark gloss (near-black vertical gradient), top-left, tilt −7°
  - `@storyteller` — sage gloss, top-right, tilt 6°
  - `@builder` — butter gloss, bottom-right, tilt 5°
  - Each is a rounded-[14px] bubble with an inset top highlight, colored drop shadow, and a small rotated-square tail pointing at the text.

---

## 7. Projects (sticky scroll-stack)

Centered header: display italic "projects" at `clamp(2.75rem,6vw,4.75rem)` with a hand-drawn **lavender curved underline** that draws itself on scroll-in (SVG path, pathLength 0→1, 0.9s); sub-copy 14px: "A small set of products built with care — calm interfaces, careful copy, and a quiet bias for shipping."

**Stack mechanics:** wrapper height = `projects × 100vh`. Each card is `sticky top-20/24` in its own viewport-tall slot; as the next card scrolls over, the previous scales to 0.94 and lifts −24px (scrubbed). Cards are 32px radius (44px desktop), ~72–78vh tall on desktop, 2-column (text left / image right; image stacks first on mobile), subtle standard shadow, tint rotating per card: butter-soft → sage-soft → lavender-soft → card.

Card anatomy: outlined pill tag with sage dot (first tag), display title `clamp(1.7rem,3vw,2.6rem)`, meta row `YEAR • ROLE` (12px uppercase, tracked), description (14–15px, line-clamped to 3 on mobile), sage pill "View Case Study ↗" + text link "Go live ↗". Image inset p-3/4 with 24/32px radius, zooms 1.04 on hover. Bottom-right: two size-9 circles — card-colored arrow chip + ink index badge (01…04). **Stat chip:** top-left on the photo, rounded-2xl, springs in on view (fade, rise 16px, scale 0.75→1, rotate 0→−3° or +2°, delay 0.25s, spring 260/20); alternates ink/card background; holds big stat (20/24px) + caption (10/11px) + 4 tiny equalizer bars.

The four projects (title — tag — year — role — stat — description):
1. **Streamline Dashboard** — Web App — 2026 — Product Design · Build — "38%" / "faster decision loop" — "A real-time analytics dashboard with AI-powered insights for growing startups."
2. **Insight Studio** — Web App — 2025 — Design Engineering — "12" / "weeks to public beta" — "An analytics workspace built for product teams who move from data to decision in an afternoon."
3. **Pocket Coach** — Mobile App — 2025 — Founding Designer — "4.8★" / "avg rating" — "A mobile companion for new founders — gentle nudges, structured rituals, quiet space to think."
4. **Sage Deck** — Templates — 2024 — Design · Story — "3,400" / "decks shipped" — "A pitch deck system for storytellers — clean templates, brand-aware slides, a voice that lets the work speak."

Under the last card: outline pill "Explore all projects ↗" → /projects.

---

## 8. Interlude

Same scroll-typewriter treatment and sizing as the Manifesto (`clamp(1.9rem,4.4vw,3.25rem)`):

> "I build in the open — so the templates [media] I plan with, the tools I swear by, & the lessons [media] I learn are **yours** to **keep.**"

- "yours" and "keep." are italic sage.
- Two inline **pebble-shaped** media chips (organic border-radius `42% 58% 55% 45% / 55% 45% 58% 42%`, ~0.85em tall) crossfade photo pairs every 2.4s.
- After "keep." sits a **mini fan**: three tiny photo cards (~0.72em wide, white 
  frames, ring + drop shadow) that fan open to −14°/0°/14° with springs when scrolled into view and fold back when scrolled away.

---

## 9. Choose Your Adventure (marquee)

Centered header: display "choose your **adventure**" (underlined word italic + lavender curved underline), sub: "Templates, tools, pieces, teardowns — drifting past. Catch one and take it with you, no digging required."

**Marquee:** one horizontal belt, content duplicated twice, translating −50% on a linear loop (16s mobile / 26s desktop), paused on hover, edges masked to transparent (5% fade each side). Cards 260px (mobile) / 320px wide.

Pick card: rounded-[28px] card, p-3, ring, shadow; 4:3 cover with soft-tinted uppercase label chip top-left; below: 17px semibold title (1 line), 14px blurb (2 lines), and the round sage-soft arrow chip (fills sage on hover). Five picks:
1. **Template** (sage-soft chip) — Founder OS — "A weekly operating system for solo founders…" → /resources/tools/founder-os
2. **Tool** (lavender-soft) — User Interview Script — "Questions that get past polite answers." → /resources/tools/user-interview-script
3. **Piece** (butter-soft) — Designing quiet software in a loud world — "The best tools fade…" → /stories/designing-quiet-software
4. **Teardown** (white/85) — How Paystack onboards its users — a UX research teardown — "A frame-by-frame look at how Paystack turns a nervous first-time user into a confident one…" → /resources/lab/paystack-onboarding-teardown
5. **Checklist** (sage-soft) — Launch Checklist — "Every box I tick before pressing publish." → /resources/tools/launch-checklist

---

## 10. Newsletter

One rounded-[44px] **ink** panel, max-w-5xl, white text, rises in on view. Two columns (1.15fr/1fr desktop):

**Left:** lavender-soft chip "✦ THE LETTER" (12px uppercase tracked); display heading `clamp(2.1rem,4.4vw,3.4rem)`: "Good things, straight / *to your inbox*" (second line italic sage); body 14px white/65: "New builds, fresh tools and templates, subscriber-only offers, and the occasional essay — sent when there's something genuinely worth your time, not on a schedule."; proof row: four overlapping white circles (ink ring) holding inline SVG brand marks — Claude (warm orange burst), VS Code, Figma, Canva — next to five butter stars over "My fave brands".

**Right (form card):** rounded-[28px] `white/6` glass card, white/10 ring. Email input (rounded-full, white/10, sage focus ring, placeholder "Your email") + full-width sage button "Get the good stuff ✈" (hover ink) + 12px white/40 fine print: "You'll be signed up to my free letter on Substack. / No spam, just value. Unsubscribe anytime." Submit opens `https://essyudeme.substack.com/subscribe?email=…` in a new tab.

---

## 11. Footer

One big rounded-[44px] flat `card` panel (hairline ring, soft shadow):

1. **Status bar** (hairline below): pulsing sage dot + "What are we building today?" · right: "Essy Udeme® — 2026".
2. **Middle grid:** left — two link columns with 12px uppercase tracked headers: *Navigation* (Home, About, Projects, Contact) and *Explore* (The Rabbit Hole, Tools & Templates, The Product Lab), 15px links with editorial-underline hover. Right (right-aligned on desktop) — SmileyMark, then display heading `clamp(2.25rem,4.6vw,3.6rem)`: "Let's build something / people *remember*" ("remember" italic sage) revealed word-by-word (rise + de-blur, 0.055s stagger), then ink pill "Build with me →" (hover sage) → /contact.
3. **Bottom bar** (hairline above): "© 2026 Essy Udeme. All rights reserved." · socials X, LinkedIn, Instagram, GitHub (editorial underline + tiny ↗).
4. **Watermark:** giant display italic "Essy Udeme" (`clamp(3.5rem,18vw,15rem)`) at 7% ink opacity, clipped at the panel's bottom edge, revealed word-by-word on scroll.

---

## 12. Assets needed

Nine photos (all warm, editorial, people/workspace lifestyle): `profile.jpg` (portrait), `dev-diary.jpg`, `research-vault.jpg`, `book-notes.jpg`, `inline-1..4.jpg` (hero/interlude media chips), `project-1..4.jpg` (project covers, 16:10-ish). Plus the inline SVGs described above (smiley reel, wave hand, brand marks, curved underline path, template icon).

## 13. Interaction summary (quick checklist)

- [ ] Custom glossy cursor (fine pointers only), lavender + grow on hover
- [ ] Smiley reel loop (nav-adjacent hero + footer)
- [ ] Pulsing dots (logo, badge, footer status)
- [ ] Hero stagger: media pops → words de-blur; grey headline with 3 emphasized words
- [ ] Bento directional drift-in + hover lifts + counter + floating mini-docs
- [ ] Scroll-scrubbed typewriter ×2 (manifesto, interlude) + 3D bobbing tags + inline fan
- [ ] Sticky project stack with scale/lift hand-off + spring stat stickers + curved underline
- [ ] Infinite marquee, pause on hover, edge fade masks
- [ ] Word-by-word footer reveal + giant watermark
- [ ] Editorial underline on all footer/social links
