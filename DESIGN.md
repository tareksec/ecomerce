# DESIGN.md — UI Design System + Instructions

**Reference image:** `docs/design/homepage.png` — the agent MUST open and study this image before building any UI. This file describes it in words; **the image is the source of truth** for layout, spacing and mood.

Mood: *fresh, playful, feminine-modern, pastel gradients, rounded shapes, confident pink accent.*

---

## 0. ZAYA ZEN BRAND OVERRIDE (takes priority over §1 colors and reference imagery)

The reference image is a women's fashion template with a pink/lavender palette. For **Zaya Zen (Panjabi & Menswear)**, keep the layout/structure/motion but re-skin as a **premium, calm, masculine-modern** store. Logo: `public/brand/logo.png` — black rounded-square with white "Z"; wordmark "ZAYA" (ink) + "ZEN" (terracotta, underlined); tagline "PANJABI & MENSWEAR" in wide letter-spacing gray.

```css
:root {
  /* Zaya Zen brand — sample exact values from the logo */
  --ink-900: #111111;        /* logo black, headings, dark surfaces */
  --terracotta-500: #C4653F; /* primary accent (replaces --pink-500): CTAs, badges, active nav, "ZEN" */
  --terracotta-600: #A9532F; /* hover */
  --terracotta-100: #F7E3DA; /* soft tint */
  --sand-50: #FAFAF8;        /* page bg (logo background) */
  --sand-100: #F1EEE8;       /* section bg / cards */
  --stone-400: #8A8580;      /* tagline / muted text */
  --line: #E7E3DC;
  --success: #2E7D5B;
}
```
- **Mapping from reference:** pink → terracotta · purple announcement bar → `--ink-900` (white text) · lavender hero gradient → warm sand→terracotta-tint gradient `linear-gradient(135deg,#FAFAF8,#F1E2D8)` · pastel category cards → rotate sand / terracotta-100 / stone tint / cream · rounded pills, 16px radius and soft shadows stay.
- **Typography:** **Poppins** (matches the logo) for Latin; **Hind Siliguri** or **Noto Sans Bengali** for Bangla. Headings 700–800, uppercase letter-spaced small labels like the tagline.
- **Hero:** eyebrow "Stock Clearance Offer" (or current campaign), headline options (client to approve): "Elegance in Every Thread" / "Wear Tradition, Your Way"; second line in terracotta. Right side: menswear model in Panjabi (cut-out PNG/WebP). Replace pink sparkles with subtle geometric/dotted pattern in terracotta at low opacity.
- **Cards:** product image aspect 3:4 on `--sand-100`; **price prominent** (terracotta, bold) + old price strikethrough; sale badge terracotta; fabric tag e.g. "Soft Fabric".
- **Extra components for this brand:** size-chart modal, "Order on Messenger/WhatsApp" secondary button, floating chat button, clearance countdown strip.
- **Motion tone:** same GSAP/Lenis system, but slower and more refined (lerp .08, durations 0.8–1.2s, expo.out); fewer playful bounces; Three.js accent (optional) = slow floating fabric/thread ribbon or soft terracotta particles, not sparkles.
- **Page transition curtain:** ink-black → terracotta wipe with the "Z" icon.
- **Preloader:** the "Z" icon draws in, then "ZAYA ZEN" wordmark fades up.
- All references below to *pink/lavender/women's items* are **structural examples only** — apply this override.

---

## 1. Design Tokens

### 1.1 Colors (approximate — sample exact values from the image, then lock them here)
```css
:root {
  /* Brand */
  --pink-500: #F43F7E;      /* primary CTA, accents, badges, active nav */
  --pink-600: #E02A6B;      /* hover */
  --pink-100: #FFE3EC;
  --purple-700: #5B49B5;    /* announcement bar */
  --purple-400: #A78BFA;
  --lavender-200: #DCD0FA;  /* hero gradient */
  --lavender-100: #EDE7FD;

  /* Pastel card backgrounds */
  --peach-100: #FFE2D6;
  --blue-100: #D6E6FF;
  --yellow-100: #FFF0B8;
  --blush-100: #FFD9E8;

  /* Neutrals */
  --ink-900: #14123A;       /* headings (deep navy) */
  --ink-600: #4A4868;       /* body */
  --ink-400: #8B89A3;       /* muted */
  --line: #ECEAF4;          /* borders */
  --surface: #FFFFFF;
  --bg: #FFFFFF;

  /* Feedback */
  --star: #F5A524;
  --success: #22C55E;
}
```
Gradients: hero `linear-gradient(135deg, #EDE7FD 0%, #C9B8F5 100%)` · promo banner `linear-gradient(135deg, #FFE8E0 0%, #FFC4CF 100%)`.

### 1.2 Typography
- Font: **Plus Jakarta Sans** (or Poppins/Outfit — pick whichever is closest to the image), loaded via `next/font` with `display: swap`.
- Display/H1 (hero): 64–72px desktop / 40px mobile, weight 800, line-height 1.05. Second line in `--pink-500`.
- H2 (section titles): 28–32px, 700, centered, with short pink underline (40×3px, radius full).
- Body: 16px / 1.6; small text 13–14px; nav 13px uppercase-ish, letter-spacing .02em, weight 500.
- Eyebrow ("Special Offer", "New Collection"): 16px, weight 500, `--pink-500`.

### 1.3 Radius, shadow, spacing
- Radius: buttons `12px`, cards `16px`, pills/tabs `999px`, hero image blobs circular.
- Shadow: cards `0 6px 24px rgba(20,18,58,.06)`; hover `0 14px 36px rgba(244,63,126,.16)`.
- Container: max-width **1280px**, padding-x 20px (mobile) / 32px (desktop). Section vertical rhythm: 64–96px.
- Grid: 12-col desktop, 4-col mobile; gap 24px.

---

## 2. Components

**Buttons**
- Primary: pink fill, white text, 48px height, radius 12, arrow icon (→) on right, hover: darken + arrow nudges 4px.
- Secondary/Outline: white/transparent, 1px lavender-gray border, ink text.
- Chat button (subheader): pink fill, small, with avatar icon.

**Product Card** (see Trending Products)
- White card, 1px `--line` border, radius 16, padding 12.
- Top-left discount badge (pink pill, e.g. `-25%`); top-right heart icon (outline → filled pink on click).
- Product image on soft neutral, aspect ~3:4, `object-contain`.
- Below: 5-star row (amber) + `(128)` count · name (14px, 500) · price (pink, bold) + old price (gray, strikethrough).
- Hover: lift 6px, shadow, second image crossfade if available, "Quick Add" slides up.

**Category Card** — pastel background (rotate through blush / blue / peach / yellow / blush), radius 16, small label top ("Caps", "Women"), bold uppercase title ("NEW ARRIVAL"), "Shop Now →" link at bottom-left, model/product image cut-out on the right.

**Tabs** — pill buttons; active = pink fill + white text; inactive = white with border.

**Trust item** — soft circular tinted icon (purple/pink/blue/yellow) + bold title + gray subtitle; 4 items inside one rounded white bar with dividers.

**Badges** — small pill, pink bg, white text, 11px bold.

---

## 3. Page Sections (Homepage — top to bottom)

| # | Section | Layout notes |
|---|---|---|
| 1 | **Announcement bar** | Full-width `--purple-700`, white 12px text. 3 items left (icons: truck, return, phone-app) — phone number right. Collapses to a rotating single message on mobile. |
| 2 | **Header** | White, 72px. Left: logo (pink bag icon + "Chronics" bold + tagline). Center: nav with active pink underline on "HOME". Right: search, user, cart w/ pink count badge. Sticky w/ blur on scroll. |
| 3 | **Quick category bar** | Thin strip, 6 items with small line icons + uppercase 11px labels; far right pink "NEED HELP? CHAT NOW" button. Horizontal scroll on mobile. |
| 4 | **Hero** | Full-width lavender gradient, ~520px tall. Left: eyebrow, 2-line headline, subtext, 2 buttons. Right: model cutout w/ purple hat/pink bag, decorative dotted grid, white sparkle lines, star/ribbon confetti, big soft circle bottom-right. 3 pagination dots bottom-left (active = elongated pink). |
| 5 | **Category cards** | 5 equal cards in a row (desktop), horizontal snap-scroll (mobile). |
| 6 | **Trending Products** | Centered H2 + underline, tabs row, 5-card carousel (desktop) / 2 visible (mobile), arrows + dots below. |
| 7 | **Trust strip** | 4-col rounded bar w/ shadow. 2×2 on mobile. |
| 8 | **Promo banner** | Peach→pink gradient, left text ("New Collection" eyebrow, "New Arrivals **Just For You**" — "Just For" pink, "You" ink), CTA; right: model with shopping bags + sparkles. |
| 9 | **Brand strip** | White rounded bar, 7 brand logos grayscale/mono, infinite marquee. Use only licensed logos or placeholders. |
| 10 | **Footer** | Not in image — design in the same language: dark navy `--ink-900` or soft lavender; newsletter card in pink. |

**Assets:** Model photos / product images in the reference are AI-style placeholders. Ask client for real photography; until then use placeholder images at the same aspect ratios and cut-out PNG/WebP with transparent background for hero + category cards. Never hotlink.

---

## 4. Animation Spec (modern + smooth)

**Global feel:** easing `power3.out` / `expo.out` for entrances, `power2.inOut` for transitions. Durations 0.6–1.2s. Stagger 0.06–0.12s. Nothing bouncy except playful micro-interactions.

### 4.1 Smooth scroll — Lenis
`lerp: 0.1`, synced with GSAP ticker (see TRD §3.2). Anchor links use `lenis.scrollTo`. Header hide/show on scroll direction from Lenis velocity.

### 4.2 Page load / Preloader
- Brief brand preloader (≤ 1.2s, skip on repeat visits via sessionStorage): logo draw-in (Lottie/Rive or SVG stroke) + pink curtain lifting up.
- Then hero intro timeline.

### 4.3 Hero (GSAP timeline + optional Three.js)
1. Headline: SplitText lines slide up from mask, stagger .1.
2. "Fashion Vibe" pink line: slight delay + color sweep.
3. Subtext + buttons fade/translate up.
4. Model image: scale 1.08 → 1, clip-path reveal from bottom; subtle mouse-parallax (±12px) on model, sparkles, dots at different depths.
5. Decorative elements (stars, ribbons, sparkle lines): gentle infinite float (yoyo sine, 3–5s, randomized).
6. **Three.js accent (optional, lazy):** soft floating 3D shapes (translucent pink/lavender spheres, small shopping-bag or star meshes) behind the model, reacting to mouse. Falls back to static decoration on mobile/reduced-motion.
7. Slider: crossfade + slide of text/image; dots animate width.

### 4.4 Scroll reveals (ScrollTrigger)
- Section titles: SplitText reveal + underline scaleX 0→1.
- Category cards: staggered rise (y:60, opacity 0) with slight rotation settle; hover → image scale 1.08, card lift, arrow slide.
- Product cards: stagger in from bottom as row enters; tab switch → cards cross-animate using GSAP `Flip` (or fade-out/in stagger).
- Trust strip: icons pop (scale .6 → 1, back.out) with stagger; number/icon micro loop on hover (Rive/Lottie).
- Promo banner: parallax on model (y ±40) + text mask reveal; bags gently sway.
- Brand strip: continuous marquee; slows on hover.
- Use `scrub` sparingly (parallax only); `once: true` for reveals.

### 4.5 Micro-interactions
- **Wishlist heart:** Rive (or Lottie) fill + burst; optimistic UI.
- **Add to cart:** product image "flies" to cart icon (GSAP Flip path), cart badge bounces; mini-cart drawer slides in (Lenis paused).
- **Buttons:** Magnetic hover (desktop only), arrow nudge, press scale .97.
- **Nav dropdown / mega menu:** height+opacity reveal with staggered links.
- **Cursor (desktop, optional):** small pink follower that grows on interactive elements. Off on touch.
- **Form/checkout:** step progress bar animates; success → Lottie checkmark + confetti.
- **Empty states / 404:** Lottie illustrations (empty cart, no results).

### 4.6 Page transitions (Barba/Swup-style, Next-compatible)
Leave: pink→purple curtain wipes up with logo mark (0.5s). Enter: curtain continues off, new page content reveals with stagger (0.5s). Implemented with `next-transition-router` + GSAP (see TRD §4). Skip for reduced-motion.

### 4.7 Motion safety rules
- Respect `prefers-reduced-motion`: replace with simple opacity fades, disable Lenis smoothing, Three.js, parallax, marquee speed.
- Never animate above-the-fold LCP content with `opacity:0` initial states that delay paint > 300ms; use CSS initial state carefully and avoid layout shift.
- Cleanup every ScrollTrigger/tween on unmount (`useGSAP` scope).
- Test at 60fps on a mid-range Android; if not, simplify.

---

## 5. Responsive Rules
| Breakpoint | Behavior |
|---|---|
| ≥1280 | Full design as in image |
| 1024–1279 | Nav condensed, cards 4 visible |
| 768–1023 | Hamburger menu, hero stacked with image below/behind text, cards 3 visible |
| <768 | Announcement rotates, quick-cat bar scrolls, hero text left + image cropped right, product carousel 2 visible, trust 2×2, sticky bottom mobile nav optional (Home / Shop / Wishlist / Cart / Account) |

Touch targets ≥ 44px. Disable hover-only effects on touch.

---

## 6. Accessibility
- Contrast: pink `#F43F7E` on white for text ≥ 18px bold only; for small text use `--pink-600` or ink. White text on pink buttons: verify ≥ 4.5:1 (darken to `#E02A6B` if needed).
- Visible focus ring (2px pink + offset).
- All icons buttons have `aria-label`; carousels have pause + keyboard controls; tabs use proper ARIA roles.
- Images: meaningful `alt`; decorative sparkles `aria-hidden`.

---

## 7. Agent Instructions for This File
1. Open `docs/design/homepage.png`, zoom mentally section by section, and **eyedrop exact colors**, then update §1.1.
2. Build tokens first (`tailwind.config` + `globals.css`), then primitives, then sections in order §3.
3. After each section: screenshot at 1440 and 390 widths, compare with the reference, fix deviations > 4px spacing / wrong color / wrong font weight.
4. Do not invent new visual styles; extend the existing language for pages not in the image (listing, product, cart, checkout, account, admin) using the same tokens, radius, shadows and pastel accents.
5. Keep brand names in the logo strip as placeholders until client confirms licensed assets.
