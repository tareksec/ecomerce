# OPEN_QUESTIONS.md — Zaya Zen E-Commerce

This file tracks missing client specifications, assumptions made, and questions needing confirmation.

## 1. Missing Client Information ([FILL] Items)
| Item | Field / Topic | Current Assumption | Client Confirmation Needed |
|---|---|---|---|
| 1 | Phone & WhatsApp Number | Placeholder: `+880 1700-000000` | Real customer support & order WhatsApp number |
| 2 | Support Email | Placeholder: `support@zayazenbd.com` | Official email address |
| 3 | Physical Address / Shop Location | Placeholder: `Dhaka, Bangladesh` | Physical store or showroom address (if any) |
| 4 | Delivery Charges | Inside Dhaka: ৳70, Outside Dhaka: ৳130 | Official shipping rates |
| 5 | Free Shipping Threshold | Orders over ৳3,000 get free shipping | Exact threshold |
| 6 | Return & Exchange Policy | 7 days exchange for size/defect with tags intact | Exact exchange terms |
| 7 | Panjabi Size Chart | Standard BD sizing (Chest 38, 40, 42, 44, 46; Length 40–44) | Exact brand sizing chart |
| 8 | Payment Gateway Credentials | COD + bKash / Nagad manual + SSLCommerz test mode | SSLCommerz / bKash merchant API keys |
| 9 | Real Product Photography | High-res mockups & curated Bangladeshi model Panjabi photos | Real catalog images & model lookbooks |
| 10 | Social Links | Facebook: `facebook.com/zayazen.bd`, Instagram: placeholder | Instagram, TikTok handles (if active) |

## 2. Key Technical & Architectural Assumptions Made
1. **Currency:** Bangladeshi Taka (৳ BDT) with integer minor units (poisha or whole taka).
2. **Language Toggle:** Default English with Bangla toggle (English / বাংলা).
3. **Database:** SQLite for local rapid dev / PostgreSQL with Prisma ORM.
4. **Messenger / WhatsApp Quick Ordering:** Floating button and product page CTA pre-fills message text with product title, SKU, selected size, and URL.
5. **No Barba.js/Swup:** Using App Router native transitions + GSAP timelines per TRD §4.
