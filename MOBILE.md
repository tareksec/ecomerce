# MOBILE.md — Mobile Responsiveness Spec (Zaya Zen)

> **Priority: MOBILE IS THE PRIMARY PLATFORM.** Most Zaya Zen visitors will arrive from **Facebook (in-app browser) on mid-range Android phones over mobile data** in Bangladesh. Design and test mobile first; desktop is the enhancement.
>
> This file **extends** `DESIGN.md` §5, `TRD.md` §3 and `AGENT.md`. If there is a conflict, **this file wins for anything under 1024px**.

---

## 0. If You Are Mid-Build (agent: do this first)
1. Audit everything already built (Announcement bar, Header, etc.) at **360, 390, 414, 768** widths.
2. Fix every issue below in existing components **before** continuing to the next section.
3. From now on, each section is only "done" when it passes the **Mobile Definition of Done (§12)**.
4. Report: `📱 Mobile audit: <what was broken> → <what you fixed>`.

---

## 1. Breakpoints & Base Rules
| Name | Width | Notes |
|---|---|---|
| `xs` | 360–389 | smallest supported (many BD Android phones) |
| `sm` | 390–639 | main target (iPhone 12–15, most Androids) |
| `md` | 640–1023 | large phones / tablets, hamburger menu still used |
| `lg` | 1024–1279 | laptop, full nav |
| `xl` | ≥1280 | full design |

- Write Tailwind **mobile-first** (base = mobile, then `md:`, `lg:`).
- **No horizontal scroll on `<body>`, ever.** Test with `document.documentElement.scrollWidth <= window.innerWidth`. Wide things (tables, carousels, chips) scroll inside their own container.
- Container padding: 16px on mobile (20px ≥ `md`).
- Minimum supported width: **360px**. Nothing may break or overlap there.
- Use `100dvh` / `svh` (not `100vh`) for full-height sections — fixes iOS/Android URL-bar jump.
- Respect safe areas: `padding-bottom: env(safe-area-inset-bottom)` on sticky bottom bars; `viewport-fit=cover`.
- Fluid type with `clamp()`: hero H1 `clamp(2rem, 8vw, 4.5rem)`; body min **16px** (prevents iOS input zoom).
- Images: always `next/image` with correct `sizes` (e.g. `(max-width: 768px) 100vw, 50vw`), aspect-ratio reserved to avoid CLS.

## 2. Touch & Interaction
- Tap targets **≥ 44×44px**, spacing ≥ 8px between them.
- **No hover-dependent UI.** Everything reachable by tap. Use `@media (hover: hover)` to scope hover effects (magnetic buttons, card lift, custom cursor = desktop only).
- Remove 300ms tap delay artifacts: `touch-action: manipulation` on buttons/links.
- Active/pressed states (scale .97 / bg tint) on all tappable elements.
- Swipe gestures for carousels (native scroll-snap or Embla/Swiper). Dragging must not block vertical page scroll.
- Inputs: correct `type`/`inputmode`/`autocomplete` (`tel` + `inputmode="numeric"` for phone, `email`, etc.). Keyboard must not cover the focused field (scroll into view).
- Avoid fixed elements stacking on top of each other (announcement bar + header + chat button + sticky CTA): max **two** fixed layers visible at once.

## 3. Layout by Section (mobile = under 768px)

### 3.1 Announcement Bar
- Height 36px. **One rotating message** (fade/slide every 3.5s), not 3 items side by side. Tap-to-pause. Phone number tappable (`tel:`).
- Hide on scroll-down (with header) to save space.

### 3.2 Header
- Height 56–60px. Layout: **☰ menu (left) · Logo (center) · search + cart (right)**. Account icon moves into the drawer/bottom nav.
- Logo: icon-only "Z" mark at `xs`, full wordmark ≥ `sm` if it fits.
- Sticky; hide on scroll-down, show on scroll-up.
- **Menu drawer:** full-height slide-in from left (GSAP), overlay dimmed, focus trapped, `Esc`/tap-outside closes, body scroll locked (`lenis.stop()`), accordion for Shop / Panjabi sub-menus, large 48px rows, contact + social links at bottom.
- **Search:** tap opens full-screen search overlay with instant suggestions and recent searches; autofocus with keyboard.

### 3.3 Quick Category Bar
- Horizontal scroll chips (`overflow-x: auto`, `scroll-snap`, hide scrollbar), no wrapping. Edge fade mask on the right to hint scroll.
- The "Need help? Chat now" button becomes the **floating chat button** (§7), not part of this bar.

### 3.4 Hero
- Stacked or overlay layout, height ~ `min(560px, 78svh)`.
- Text left-aligned over a soft gradient; model cut-out anchored bottom-right, cropped (not shrunk to tiny).
- Headline max 3 lines; subtext max 2 lines; **buttons full-width stacked** or two side-by-side if they fit (min-height 48px).
- Swipe to change slides; dots stay visible; autoplay pauses on touch.
- **No Three.js on mobile.** Use static image + light CSS/GSAP float only.
- Hero image is the LCP element: `priority`, `sizes="100vw"`, serve ≤ 60KB WebP/AVIF at 800px wide for mobile.

### 3.5 Category Cards
- Horizontal snap-scroll row, **~2.2 cards visible** (peek of next card), card width ≈ 42vw. OR 2-column grid — pick one and keep consistent.
- Whole card is tappable.

### 3.6 Trending Products / Product Grids
- Carousel: **2 cards visible** with peek, or **2-column grid** for listing pages.
- Tabs (Best Seller / New Arrivals / Top Rated): horizontally scrollable pill row, sticky under header on listing pages.
- **Price always visible** and readable (min 15px bold). Old price smaller. Discount badge doesn't overlap the wishlist heart.
- Wishlist heart hit area 44px even if icon is 20px.
- "Quick add" is a persistent small button (no hover state on mobile).
- Hide carousel arrows on touch; keep dots or a progress bar.

### 3.7 Trust Strip
- 2×2 grid (or horizontal snap row). Icons 40px, text 12–13px, no truncation.

### 3.8 Promo / Stock Clearance Banner
- Stacked: text on top, image below (or image as background with overlay). CTA full-width. Countdown (if used) fits on one line at 360px.

### 3.9 Footer
- Accordion sections (Shop, Help, Company) collapsed by default; newsletter input + button stacked; social icons row; payment icons wrap; add bottom padding for bottom nav.

## 4. Product Detail Page (most important page for conversion)
- **Gallery:** swipeable full-width carousel with dots/counter (1/5), pinch-to-zoom or tap-to-zoom modal. First image `priority`.
- Order on screen: title → **price (large)** → rating → fabric/short description → **size selector** → color → size-chart link → quantity → info accordions (Fabric & care, Delivery, Return) → reviews → related products.
- **Sticky bottom action bar** (respects safe-area): `[Add to Cart]` (primary, terracotta) + `[Buy Now]` + round `[Messenger/WhatsApp]` icon button. Bar appears once the main CTA scrolls out of view.
- **Size chart:** opens as a **bottom sheet** (drag handle, swipe down to close), table scrolls horizontally inside.
- Variant chips ≥ 44px, disabled/out-of-stock chips clearly struck-through.

## 5. Listing / Search / Filters
- Filters and Sort in a **bottom sheet** (or full-screen modal) opened by a sticky `Filter · Sort` bar. Apply/Clear buttons pinned at the bottom. Show active filter chips above the grid.
- Grid: 2 columns, gap 12px. Infinite scroll or "Load more" (with `aria-live`), preserve scroll position on back navigation.
- Skeleton loaders matching card size (no layout jump).

## 6. Cart & Checkout
- **Mini-cart:** bottom sheet or right drawer (full width ≤ 480px), shows price, qty stepper (44px buttons), remove, free-shipping progress, sticky "Checkout" button.
- **Checkout:** single column, **guest checkout default**, progress steps at top, order summary collapsible at the top ("Show order summary ৳X"), sticky "Place Order" button at bottom.
- Bangladesh-friendly form: Name · Phone (`01XXXXXXXXX` validation, `inputmode="numeric"`) · District → Thana/Area (searchable select) · Full address · Delivery area (Inside/Outside Dhaka charge updates live) · Payment (COD default, bKash, Nagad, card) · Note.
- Minimize typing: autofill attributes, remember last address, big radio cards for payment/shipping.
- Show inline validation errors under fields, scroll to first error, don't lose form data on error.
- After order: success screen (Lottie check) with order number, "Track order", and "Chat on WhatsApp" button.

## 7. Floating Chat / Messenger Button
- Bottom-right, 52px circle, above bottom nav & sticky CTA (offset with CSS variable so they never overlap). Opens Messenger/WhatsApp deep link with prefilled message (product name, size, URL).
- Hide while keyboard is open, in checkout payment step, and when the menu drawer is open.

## 8. Bottom Navigation (mobile only, < 768px)
Home · Shop · Wishlist · Cart (with badge) · Account. Height 56px + safe-area; active item terracotta with small animated indicator. Hide on scroll-down on PDP (sticky CTA takes over), show on scroll-up.

## 9. Animation on Mobile (performance-safe)
- **Lenis:** use native touch scrolling on mobile (`syncTouch: false`, `smoothTouch` off). Keep Lenis smoothing for desktop wheel only. Still keep ScrollTrigger working with native scroll.
- **Three.js / WebGL:** **disabled** below `lg`, or on low-end devices (`navigator.hardwareConcurrency <= 4`, `deviceMemory <= 4`, `saveData`), or reduced-motion.
- Use `gsap.matchMedia()` with separate mobile timelines: shorter durations (0.5–0.8s), smaller translate distances (y: 24 instead of 60), fewer staggered elements, **no scrub parallax** except maybe hero.
- Page transition: simple fast curtain/fade (≤ 500ms) on mobile.
- Custom cursor, magnetic hover, mouse-parallax: **desktop only** (`(hover: hover) and (pointer: fine)`).
- Lottie/Rive: lazy-load, autoplay only in viewport, cap at 1–2 running at a time; provide static fallback.
- Preloader: skip on mobile after first visit; max 1s.
- Always honor `prefers-reduced-motion` and `Save-Data`.
- Only animate `transform`/`opacity`. Avoid animating large blurred/shadowed layers.

## 10. Performance Targets (mobile, throttled 4G / mid-range Android)
| Metric | Target |
|---|---|
| LCP | < 2.5s (home hero, PDP image) |
| INP | < 200ms |
| CLS | < 0.1 |
| JS on first load (gzip) | < 170KB for home route (lazy-load everything below the fold) |
| Lighthouse Mobile Perf | ≥ 85 (aim 90) |
| Image weight (home above fold) | < 250KB total |
- Dynamic import: GSAP plugins used only on that page, Three.js, Lottie, Rive, chat widget, map, review widgets.
- Fonts: subset Latin + Bengali, `font-display: swap`, preload only the main weight; limit weights (400/600/700).
- Use `loading="lazy"` for below-fold images; avoid autoplay video on mobile (poster only).
- Prefetch only likely next routes on `pointerdown`/viewport, not everything.

## 11. Facebook In-App Browser & Cross-Browser Gotchas
- Test inside **Facebook in-app browser** (Android + iOS) and **Messenger in-app browser**: check sticky elements, `100dvh`, deep links, cookies/localStorage, payment redirects (bKash/SSLCommerz return URLs must land back correctly).
- `target="_blank"` and `window.open` may behave differently; prefer same-tab flows for checkout/payment.
- iOS Safari: no `position: fixed` jumping with keyboard (use `visualViewport` fix for sticky bars), disable rubber-band issues in drawers (`overscroll-behavior: contain`), input font-size ≥ 16px, `-webkit-tap-highlight-color` styled.
- Android Chrome: address-bar resize → use `dvh`; test on low RAM devices; avoid `backdrop-filter` heavy blur on big areas (jank).
- Add `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`, `theme-color` = brand black, PWA manifest + icons (from logo), optional "Add to Home Screen".

## 12. Mobile Definition of Done (every component/page)
- [ ] Works at 360, 390, 414, 768 with **no horizontal page scroll**
- [ ] All tap targets ≥ 44px; no hover-only functionality
- [ ] Text ≥ 16px in inputs; body readable without zoom; no text clipped/overlapping at 360
- [ ] Price visible on every product surface
- [ ] Sticky/fixed elements don't collide (announcement, header, chat, sticky CTA, bottom nav)
- [ ] Drawers/sheets: focus trap, scroll lock, swipe/close works, safe-area padding
- [ ] Animations have mobile variant; Three.js off; reduced-motion respected; 60fps on mid-range Android
- [ ] Images sized correctly (`sizes`), no CLS, hero LCP < 2.5s on throttled 4G
- [ ] Tested in Chrome DevTools device mode **and** on a real Android + iPhone (or BrowserStack) **and** inside Facebook in-app browser
- [ ] Bangla text renders correctly (line-height ≥ 1.6, no clipped matras/য-ফলা)
- [ ] Keyboard, screen reader labels, focus order verified

## 13. Testing Matrix
| Device / Viewport | Why |
|---|---|
| 360×800 (Galaxy A-series / Redmi) | Most common BD Android |
| 390×844 (iPhone 12–15) | iOS baseline |
| 414×896 (iPhone Plus/Max) | large iOS |
| 768×1024 (iPad portrait) | tablet |
| Landscape 844×390 | header/hero shouldn't break |
| Slow 4G + 4× CPU throttle | performance |
| Facebook in-app browser (Android + iOS) | main traffic source |

Tools: Chrome DevTools, Lighthouse mobile, WebPageTest (Mobile 4G), Playwright mobile projects (`Pixel 5`, `iPhone 13`) in CI with screenshot comparison.

## 14. Report Format for Mobile Work
```
📱 Mobile check — <component/page>
✅ Passed: <list>
🔧 Fixed: <list>
⚠️ Known issues: <list>
📊 Lighthouse mobile: Perf __ / A11y __ / SEO __ (LCP __s, CLS __)
```
