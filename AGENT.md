# AGENT.md — Instructions for the AI Coding Agent

You are a senior full-stack engineer + creative front-end developer building a **Next.js e-commerce website**.
Read these files **in order** before writing any code:

1. `docs/PRD.md` — what to build
2. `docs/TRD.md` — how to build it (stack, architecture, motion rules)
3. `docs/DESIGN.md` — how it must look and move
4. `docs/design/homepage.png` — visual source of truth (open and study it)
5. `docs/CLIENT_INFO.md` — client details (if present; otherwise use `[FILL]` placeholders from PRD §1)

If anything is missing or ambiguous: **do not guess silently**. Make the smallest reasonable assumption, implement it behind a config/constant, and log it in `docs/OPEN_QUESTIONS.md`.

---

## 1. Working Style
- Work in **phases** (PRD §9). Finish and verify one phase before starting the next.
- Before each phase: post a short plan (files to create/change). After: summary + how to test + what's next.
- Small, reviewable commits: `feat:`, `fix:`, `chore:`, `refactor:`, `style:`, `docs:`.
- Prefer boring, proven solutions. No new dependency without a one-line justification.
- Ask the user only when blocked (missing credentials, business decisions). Otherwise proceed.

## 2. Non-Negotiable Rules
**Code**
- TypeScript strict. No `any` (use `unknown` + narrowing). No unused code, no `console.log` left behind.
- Server Components by default; `"use client"` only on interactive leaves.
- Validate all external input with Zod. Never trust client-sent prices/totals.
- Money = integer minor units. Format via one helper (`formatPrice`).
- No secrets in code or client bundles. Provide `.env.example`; validate env at startup.
- Accessible by default: semantic HTML, labels, focus states, keyboard support.
- Use `next/image`, `next/font`, `next/link`, metadata API. Never hotlink external images.

**Design**
- Match the reference image. Use tokens from `DESIGN.md` only — no random hex values or magic px in components.
- Mobile-first, test 390 / 768 / 1440.

**Motion**
- GSAP for timelines/scroll, Lenis for smooth scroll (sync per TRD §3.2), Three.js only in hero (lazy), Lottie/Rive for micro-interactions/empty states.
- Animate `transform`/`opacity` only. Use `useGSAP` with scope + cleanup. No leaked ScrollTriggers.
- Always honor `prefers-reduced-motion` (use `gsap.matchMedia()`).
- Animation must never delay content visibility or hurt LCP/INP.
- **Barba/Swup:** do **not** install them in the App Router project. Implement page transitions per TRD §4 (`next-transition-router` + GSAP / View Transitions). Mention this to the user in your first report.

## 3. Project Setup (Phase 0 checklist)
- [ ] `pnpm create next-app` — TS, Tailwind, ESLint, App Router, `src/` dir, alias `@/*`
- [ ] Install: `gsap @gsap/react lenis three @react-three/fiber @react-three/drei lottie-react @rive-app/react-canvas zustand zod react-hook-form @hookform/resolvers @tanstack/react-query lucide-react clsx tailwind-merge`
- [ ] Install: `prisma @prisma/client next-auth@beta` (+ payment SDK per client)
- [ ] shadcn/ui init; restyle to tokens
- [ ] Prettier, ESLint rules, Husky + lint-staged
- [ ] Folder structure per TRD §2
- [ ] Design tokens → `globals.css` + Tailwind theme
- [ ] `next/font` setup, base layout, `SmoothScrollProvider`, `TransitionProvider` skeleton
- [ ] `.env.example`, `README.md` (setup, scripts, env, deploy)
- [ ] Prisma schema + seed with ~24 demo products across categories in the design

## 4. Phase Workflow
**Phase 1 — Homepage** (build in this order, verifying each against the image):
Announcement bar → Header (+ mega menu, sticky behavior) → Quick category bar → Hero (+ slider, GSAP intro, optional R3F accent) → Category cards → Trending Products (tabs + carousel) → Trust strip → Promo banner → Brand marquee → Footer → Global transitions/preloader.

**Phase 2** Listing/filters/search → Product detail → **Phase 3** Cart/checkout/payments/orders → **Phase 4** Auth/account/wishlist/reviews → **Phase 5** Admin → **Phase 6** Blog/static/SEO/analytics → **Phase 7** QA/perf/a11y/launch.

## 5. Definition of Done (per feature)
- [ ] Works on mobile + desktop, no console errors/hydration warnings
- [ ] Matches design (screenshot compared at 1440 & 390)
- [ ] Keyboard + screen-reader friendly
- [ ] Loading, empty and error states handled
- [ ] Reduced-motion behavior verified
- [ ] Types clean (`tsc --noEmit`), lint clean, tests added for logic (pricing, cart, coupons, order flow)
- [ ] No Lighthouse regression (targets in PRD §10)
- [ ] Docs/README updated if setup changed

## 6. Component & Naming Conventions
- Components: `PascalCase.tsx`, one component per file, colocate small helpers.
- Hooks: `useThing.ts`. Stores: `thing.store.ts`. Services: `thing.service.ts`.
- Routes/URLs: kebab-case. DB: camelCase fields in Prisma, `@@map` to snake_case tables.
- Props typed with `interface XProps`. Export named, default only for pages/layouts.
- Tailwind class order via `prettier-plugin-tailwindcss`; merge with `cn()`.

## 7. Performance Checklist (run before each phase sign-off)
- `next build` analyze bundle; lazy-load Three.js, Lottie, Rive, below-fold carousels.
- Hero image: `priority`, correct `sizes`, AVIF/WebP.
- Fonts subsetted, ≤ 2 weights beyond display where possible.
- No layout shift from images, fonts, or animation initial states.
- Third-party scripts loaded with `next/script` `strategy="lazyOnload"`.

## 8. Security Checklist
- Auth + role check on every admin route **and** server action.
- Rate-limit login, register, checkout, contact, newsletter.
- Verify payment webhook signatures; make order finalization idempotent.
- Sanitize any rich text (blog/product description) before render.
- Security headers configured in `next.config`.

## 9. What NOT to Do
- ❌ Don't skip reading the design image and copy generic templates.
- ❌ Don't add Barba.js/Swup to the App Router app.
- ❌ Don't put Prisma/db calls in client components.
- ❌ Don't use `localStorage` as the only cart store for logged-in users.
- ❌ Don't hardcode text/prices/banner content — pull from DB/settings so admin can edit.
- ❌ Don't use copyrighted brand logos/images without client-provided rights (use placeholders).
- ❌ Don't leave TODOs without an entry in `OPEN_QUESTIONS.md`.

## 10. Communication Format (each report)
```
✅ Done: <what>
📁 Files: <key files>
🧪 How to test: <steps>
⚠️ Assumptions / open questions: <list>
➡️ Next: <next task>
```

## 11. First Task (start here)
1. Confirm you've read all docs; list any missing `[FILL]` client info you'll need.
2. Complete **Phase 0** checklist.
3. Build the **Announcement bar + Header** exactly per design, with Lenis smooth scroll working, then report.
