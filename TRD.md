# TRD — Technical Requirements Document

## 1. Tech Stack

### Core
| Layer | Choice |
|---|---|
| Framework | Next.js (latest stable), **App Router**, React Server Components |
| Language | TypeScript (`strict: true`) |
| Styling | Tailwind CSS + CSS variables for design tokens |
| UI primitives | shadcn/ui (Radix) — restyle to match `DESIGN.md` |
| Icons | `lucide-react` (match the thin-line style in design) |
| Forms / validation | React Hook Form + Zod |
| Client state | Zustand (cart drawer, UI state) |
| Server state | TanStack Query (client-side fetching only where needed) |
| Package manager | pnpm |

### Backend / Data
| Layer | Choice |
|---|---|
| Database | PostgreSQL (Neon / Supabase / VPS) |
| ORM | Prisma |
| Auth | Auth.js (NextAuth v5) — email+password, Google; role: `CUSTOMER` / `ADMIN` |
| Payments | Stripe **and/or** local gateway per client (`[FILL]` — e.g. SSLCommerz, bKash, Nagad) + COD. Use a `PaymentProvider` interface so gateways are swappable |
| Images | Cloudinary or S3 + `next/image` |
| Email | Resend (or SMTP) + React Email templates |
| Search | Postgres full-text (v1); Meilisearch/Algolia optional later |
| Cache | Next.js caching + ISR (`revalidateTag` on admin changes) |
| Rate limit | Upstash Redis or in-memory fallback in dev |
| Hosting | Vercel (recommended) or VPS with Docker |

### Animation Stack
| Tool | Role |
|---|---|
| **GSAP** (+ `ScrollTrigger`, `SplitText`, `Flip`, `@gsap/react` `useGSAP`) | All timeline & scroll animation |
| **Lenis** | Smooth scroll, synced with GSAP ticker |
| **Three.js** via `@react-three/fiber` + `@react-three/drei` | Hero 3D accent (floating shapes / shopping-bag / soft particles). Lazy-loaded |
| **Lottie** (`lottie-react`) | Success/empty/loader/404 animations |
| **Rive** (`@rive-app/react-canvas`) | Interactive micro-interactions (wishlist heart, cart icon, toggles) |
| **Page transitions** | See §4 — *use a React-router-compatible approach, not Barba/Swup* |

## 2. Architecture

```
/src
  /app
    (store)/            # public storefront route group
      page.tsx          # home
      shop/ women/ men/ accessories/ product/[slug]/ cart/ checkout/ ...
    (auth)/login register ...
    account/
    admin/              # protected, role=ADMIN
    api/                # route handlers (webhooks, uploads)
    layout.tsx  globals.css
  /components
    /ui                 # shadcn primitives
    /layout             # Header, Footer, AnnouncementBar, MegaMenu
    /home               # Hero, CategoryCards, TrendingProducts, TrustStrip, PromoBanner, BrandStrip
    /product            # ProductCard, Gallery, VariantPicker, ReviewList
    /cart /checkout /admin
    /motion             # animation building blocks (see §3)
  /lib
    db.ts auth.ts stripe.ts utils.ts validators/ constants.ts
  /server               # server actions, services (product.service.ts, order.service.ts ...)
  /hooks  /store  /types  /styles
/prisma  schema.prisma  seed.ts
/public  /brand  /lottie  /rive  /models  /images
/docs    PRD.md TRD.md AGENT.md DESIGN.md design/homepage.png OPEN_QUESTIONS.md
```

**Rules**
- Server Components by default. `"use client"` only for interactive/animated leaves.
- Data fetching in server components / server actions via service layer — never call Prisma from client.
- All mutations validated with Zod on the server.
- Money stored as **integer minor units** (cents/poisha), formatted at the edge.

## 3. Motion Architecture (important)

### 3.1 Providers (in root layout)
```
<SmoothScrollProvider>   // Lenis + gsap.ticker sync + ScrollTrigger.update
  <TransitionProvider>   // page transitions
    {children}
  </TransitionProvider>
</SmoothScrollProvider>
```

### 3.2 Lenis ↔ GSAP sync (canonical)
```ts
"use client";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```
- Disable/soften Lenis when `prefers-reduced-motion`, and on touch devices use native scroll (`syncTouch: false`).
- Stop Lenis while modals/drawers are open (`lenis.stop()` / `lenis.start()`).
- Destroy on unmount; guard against double init in React Strict Mode.

### 3.3 Reusable motion components (`/components/motion`)
- `<Reveal>` — fade/translate/clip on scroll (variants: `up`, `left`, `mask`, `stagger`)
- `<SplitHeading>` — SplitText line/word reveal for big headlines
- `<Magnetic>` — magnetic hover for CTAs
- `<Parallax>` — scroll-linked y/scale for images
- `<Marquee>` — infinite brand-strip scroll (GSAP or CSS, pause on hover)
- `<LottiePlayer>` / `<RiveIcon>` — lazy wrappers with reduced-motion fallback
- `useGSAP` hooks with proper `scope` and cleanup (`gsap.context`) — **no orphaned ScrollTriggers**

### 3.4 Three.js rules
- Load with `next/dynamic({ ssr:false })` + `IntersectionObserver` (mount only when visible).
- Single `<Canvas>` for hero only in v1; `dpr={[1, 1.5]}`, `frameloop="demand"` when offscreen.
- Assets: compressed `.glb` (Draco/meshopt) < 500 KB; textures KTX2/WebP.
- **Fallback:** on mobile low-end / `prefers-reduced-motion` / WebGL unsupported → static image (the design's model photo).
- Never let WebGL block LCP: hero LCP element remains the real `<Image priority>`; 3D is decorative overlay.

### 3.5 Performance budget for motion
- JS added by animation libs (gzip): GSAP core+ScrollTrigger ≈ 45 KB, Lenis ≈ 4 KB — OK. Three.js/R3F only on routes/sections that need it.
- Animate `transform` and `opacity` only. No animating `top/left/width/height/box-shadow` on scroll.
- `will-change` only during animation. Use `gsap.matchMedia()` for responsive/reduced-motion variants.

## 4. Page Transitions — ⚠️ Barba / Swup note

**Barba.js and Swup are designed for traditional multi-page HTML sites; they intercept links and swap DOM containers, which conflicts with the Next.js App Router (React owns the DOM, RSC streaming, Suspense, router cache). Using them in Next.js commonly causes broken hydration, duplicated listeners and scroll bugs.**

**Decision:** achieve the *same visual result* (Barba/Swup-style transitions) with Next-compatible tooling:
1. **Primary:** `next-transition-router` (or a custom `TransitionProvider`) + **GSAP timelines** for leave/enter (e.g. colored curtain wipe in brand pink/purple with logo, then reveal).
2. **Progressive enhancement:** View Transitions API (`document.startViewTransition`) for supported browsers; GSAP fallback otherwise.
3. Lenis: `scrollTo(0, { immediate: true })` on route change; refresh ScrollTrigger after enter animation.
4. Skip transitions under `prefers-reduced-motion`; keep duration ≤ 900ms total.

*If the client explicitly insists on Barba/Swup*, the agent must first note the risk in `OPEN_QUESTIONS.md` and only then prototype in an isolated branch.

## 5. Data Model (Prisma — starting point)
Entities: `User`, `Account/Session` (Auth.js), `Address`, `Category` (self-relation for parent), `Product`, `ProductImage`, `ProductVariant` (size, color, sku, stock, priceOverride), `Cart`, `CartItem`, `Wishlist`, `Order`, `OrderItem`, `Payment`, `Coupon`, `Review`, `Banner` (hero/promo, ordered, active), `HomeSection` (config), `BlogPost`, `Setting` (key/json), `Subscriber`.

Key fields to include: `Product { slug @unique, name, description, basePrice, salePrice?, badges[], ratingAvg, ratingCount, isActive, tags[] }`, `Order { number @unique, status, subtotal, discount, shipping, tax, total, currency, shippingAddress Json, paymentStatus }`.

Indexes: `slug`, `categoryId`, `isActive+createdAt`, `Order.userId`, full-text on `name/description`.

## 6. API / Server Actions
- Server Actions: cart ops, wishlist toggle, apply coupon, place order, review submit, newsletter, contact form.
- Route Handlers: payment webhooks (`/api/webhooks/stripe`, gateway IPN), image upload signing, revalidate hook.
- Every handler: auth check → Zod validation → rate-limit (public ones) → service call → typed result `{ ok, data | error }`.

## 7. Caching & Rendering
| Page | Strategy |
|---|---|
| Home | ISR (revalidate on banner/product change via tags) |
| Listing | SSR/ISR with searchParams; cache by tag `products` |
| Product | ISR + `generateStaticParams` for top products |
| Cart/Checkout/Account/Admin | Dynamic, no-store |
| Blog | ISR |

## 8. Security
- Passwords: argon2/bcrypt via Auth.js adapter flow; email verification optional v1.
- CSRF: Next server actions built-in; verify webhook signatures.
- Headers via `next.config`: CSP (allow gsap/lottie/rive assets, image hosts), HSTS, X-Frame-Options, Referrer-Policy.
- Never trust client prices — recompute totals server-side at checkout.
- Admin routes protected in middleware **and** re-checked in server actions.
- Env vars validated at boot with Zod (`env.ts`).

## 9. Testing & Quality
- ESLint (next/core-web-vitals) + Prettier + `tsc --noEmit` in CI.
- Unit: Vitest (pricing, coupon, cart math).
- E2E: Playwright — browse → add to cart → checkout (test gateway) on mobile + desktop viewports.
- Visual check: compare against `docs/design/homepage.png` at 1440 & 390 widths.
- Lighthouse CI on home, listing, product.
- Husky + lint-staged pre-commit.

## 10. Environment Variables (`.env.example`)
```
DATABASE_URL=
AUTH_SECRET=
AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
CLOUDINARY_URL=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=
```

## 11. Deployment
- Vercel (preview per PR, production on `main`), or Docker + Nginx on VPS.
- DB migrations: `prisma migrate deploy` in release step. Seed script for demo catalog.
- Image domains whitelisted in `next.config`.
- Monitoring: Sentry + Vercel Analytics.
