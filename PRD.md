# PRD — Product Requirements Document
**Project:** Fashion E-commerce Website (working name: *Chronics* — "Style, Your Way")
**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS
**Design reference:** `docs/design/homepage.png` (see `DESIGN.md`)

> ⚠️ Agent: `[FILL]` marked fields client info diye replace hobe. Client info na pawa porjonto assumption nio na — placeholder rekhe kaj koro, ar `OPEN_QUESTIONS.md` e likhe rakho.

---

## 1. Client Information
**Full details: `docs/CLIENT_INFO.md`.** Summary:
- **Brand:** ZAYA ZEN — *Panjabi & Menswear* · Domain: zayazenbd.com · FB: facebook.com/zayazen.bd
- **Niche:** Designer Panjabi (menswear), Bangladesh market · Currency ৳ BDT · Bangla + English **[CONFIRM]**
- **Active campaign:** #স্টক_ক্লিয়ারেন্স_অফার (Stock Clearance)
- **Payments:** COD, bKash, Nagad, SSLCommerz **[CONFIRM]** · Shipping: Inside/Outside Dhaka **[FILL]**
- Remaining `[FILL]` items (phone, address, policies, sizes, real photos) live in `CLIENT_INFO.md` §5.

### 1.1 Menswear Adaptation of the Reference Design (IMPORTANT)
The reference image (`homepage.png`) is a **women's fashion** template. Keep its **layout, spacing, structure and motion**, but adapt to Zaya Zen:
- **Colors/brand:** replace pink/lavender with Zaya Zen palette (black, terracotta, warm off-white) — see `DESIGN.md` §0.
- **Content:** menswear only — models, products, category names, copy. No women's items.
- **Categories (suggested, [CONFIRM]):** Designer Panjabi, Casual Panjabi, Shirts, T-Shirts, Pajama & Pants, Accessories, **Stock Clearance**.
- **Nav:** Home, Shop▾, Panjabi▾, Menswear▾, Clearance, Blogs, Contact (replaces Women/Men/Accessories).
- **Brand-logo strip (Zara/H&M/Nike...):** remove — client has no partner brands. Replace with "Why Zaya Zen" (fabric, stitching, fit) or Facebook/Instagram feed strip.
- **Quick category bar:** Panjabi-focused items instead of Women's Top / Sunglasses / Bags etc.

### 1.2 Requirements Driven by Client Insights
1. **Price always visible** on every card, listing and product page (customers were asking "দাম কত").
2. **Messenger / WhatsApp order button** on product pages + floating chat button (customers are used to inbox ordering) — in addition to normal checkout. Prefilled message with product name, size, link.
3. **Stock Clearance section** on home + `/clearance` page with sale badges, optional countdown, "few left" stock indicator.
4. **Panjabi-specific product info:** fabric description (soft & comfortable), size chart (chest/length/sleeve), care instructions, color options.
5. **Bangla-first UX:** Bangla labels/price format (৳, optional Bangla digits), Bangla-friendly font, phone-number validation for BD (01XXXXXXXXX), simple address form (district/thana), COD default.
6. **Social proof from day one:** page is new (no reviews) → testimonial/reviews section, "Verified buyer" reviews, Facebook page link/embed, user-generated photo gallery.
7. **Facebook Pixel + Conversions API** (ViewContent, AddToCart, InitiateCheckout, Purchase) so FB ad traffic can be tracked and retargeted.
8. **Fast on mobile data** — most BD traffic is mobile via Facebook in-app browser: test in FB in-app browser, keep JS light, Three.js off by default on low-end devices.
9. **Order notifications** to admin via email + WhatsApp/SMS (optional) **[CONFIRM]**.

## 2. Goals
1. Modern, fast, premium-feeling fashion storefront that converts visitors to buyers.
2. Pixel-faithful implementation of the reference design, with smooth motion (GSAP + Lenis).
3. Fully working commerce flow: browse → search/filter → product → cart → checkout → order tracking.
4. Admin panel so client can manage products, orders, banners, coupons without a developer.
5. Excellent Lighthouse / Core Web Vitals despite rich animation.

## 3. Target Users
- **Shopper (primary):** mostly mobile, fashion-conscious, wants quick browse + easy checkout.
- **Returning customer:** wishlist, order history, saved addresses.
- **Admin / staff:** manages catalog, orders, marketing.

## 4. Scope

### 4.1 Storefront pages (MVP)
| Page | Route | Notes |
|---|---|---|
| Home | `/` | Sections listed in §5 |
| Shop / Listing | `/shop`, `/shop/[category]` | filters, sort, pagination/infinite |
| Women / Men / Accessories | `/women`, `/men`, `/accessories` | category landings |
| Product Detail | `/product/[slug]` | gallery, variants, reviews, related |
| Search | `/search?q=` | instant suggestions |
| Cart | `/cart` + mini-cart drawer | |
| Checkout | `/checkout` | guest + logged-in |
| Order Success / Tracking | `/order/[id]` | |
| Account | `/account/*` | profile, orders, addresses, wishlist |
| Auth | `/login`, `/register`, `/forgot-password` | |
| Blogs | `/blogs`, `/blogs/[slug]` | |
| Contact | `/contact` | form + map/info |
| Static | `/privacy`, `/terms`, `/returns`, `/shipping` | |
| 404 / Error | — | on-brand, animated (Lottie) |

### 4.2 Admin panel (MVP) — `/admin`
- Dashboard (sales, orders, low stock)
- Products CRUD (images, variants: size/color, stock, price, sale price, badges)
- Categories CRUD
- Orders (status flow: pending → paid → packed → shipped → delivered → cancelled/refunded)
- Customers
- Coupons / discounts
- Homepage content: hero slides, category cards, promo banners, brand strip
- Blog posts CRUD
- Settings (store info, shipping, taxes)

### 4.3 Out of scope (v1)
Multi-vendor marketplace, native mobile app, AR try-on, loyalty points. *(Design mentions "Extra 10% off on App" — treat as static text unless client provides an app.)*

## 5. Homepage Functional Requirements (from design)
1. **Announcement bar** — Free shipping · Easy 30-day returns · Extra 10% off on app · phone number. Values come from settings.
2. **Header** — Logo, nav (Home, Shop▾, Women▾, Men▾, Accessories, Blogs, Contact), search, account, cart with live count badge. Sticky, hides on scroll-down / shows on scroll-up. Mega-menu dropdowns for Shop/Women/Men.
3. **Quick category bar** — Women's Top, Women's Wear, Sunglasses, Shoes Store, Bags Store, Jewelry Store + "Need help? Chat now" button (opens chat widget / WhatsApp link).
4. **Hero slider** — "Special Offer" eyebrow, headline, subtext, 2 CTAs (Shop Now / Explore Collection), model image, pagination dots, autoplay + swipe. Content editable from admin.
5. **Category cards (5)** — New Arrival, Sunglasses, Women's Shoes, Big Offer, Stylish Bags; each links to filtered listing.
6. **Trending Products** — tabs: Best Seller / New Arrivals / Top Rated; carousel with arrows + dots; product card = image, discount badge, wishlist heart, rating + review count, name, price, old price, quick-add.
7. **Trust strip** — Free Worldwide Shipping, 30-Day Return Policy, Secure Payment, 24/7 Customer Support.
8. **Promo banner** — "New Arrivals Just For You" with CTA.
9. **Brand strip** — logo marquee of partner brands.
10. **Footer** — newsletter signup, links, contact, socials, payment icons, copyright. *(Not shown in design → follow the same style.)*

## 6. Core Commerce Requirements
- **Catalog:** categories, variants (size/color), multiple images, SKU, stock, sale price, tags (best-seller, new, top-rated auto/manual).
- **Cart:** persistent (guest → localStorage/cookie; logged-in → DB), quantity edit, coupon apply, shipping estimate, free-shipping progress bar.
- **Wishlist:** heart on cards; guests prompt login or local save.
- **Search & Filter:** category, price range, size, color, rating, on-sale; sort (popular, newest, price ↑↓).
- **Checkout:** address, shipping method, payment, order summary, guest checkout, validation, order confirmation email.
- **Orders:** status timeline, invoice PDF, email notifications.
- **Reviews:** verified-buyer reviews, star rating, moderation.
- **SEO:** metadata per page, OpenGraph, JSON-LD (Product, Breadcrumb, Organization), sitemap, robots.
- **Analytics:** GA4 / Meta Pixel hooks (consent-aware).

## 7. Non-Functional Requirements
| Area | Target |
|---|---|
| Performance | LCP < 2.5s, INP < 200ms, CLS < 0.1 on mid-range mobile |
| Animation | 60fps; no layout thrash; respects `prefers-reduced-motion` |
| Accessibility | WCAG 2.1 AA; keyboard nav; focus states; alt text; contrast checked |
| Responsive | 360px → 1920px+; mobile-first |
| Security | OWASP basics, CSRF, rate-limit auth & checkout, input validation (Zod), no secrets in client |
| SEO | Server-rendered product/listing pages, ISR for catalog |
| Browser support | Last 2 versions Chrome, Safari, Firefox, Edge; iOS Safari 16+ |

## 8. Motion Requirements (summary — details in `DESIGN.md`)
Smooth scroll (Lenis) · scroll-driven reveals (GSAP ScrollTrigger) · page transitions · hero 3D accent (Three.js, lazy) · micro-interactions & empty/success states (Lottie/Rive). Motion must **enhance**, never block shopping.

## 9. Milestones
| Phase | Deliverable |
|---|---|
| 0 | Repo setup, tooling, design tokens, layout shell |
| 1 | Homepage (all sections + animations) |
| 2 | Listing, product detail, search |
| 3 | Cart, checkout, payments, orders |
| 4 | Auth, account, wishlist, reviews |
| 5 | Admin panel |
| 6 | Blog, static pages, SEO, analytics |
| 7 | QA, performance tuning, accessibility audit, launch |

## 10. Acceptance Criteria (high level)
- Homepage matches the reference design within reasonable pixel tolerance on desktop (1440) and mobile (390).
- A user can complete a purchase end-to-end on mobile.
- Admin can add a product and it appears on the storefront without redeploy.
- Lighthouse mobile: Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95.
- All animations disabled/simplified under `prefers-reduced-motion`.
