# Marketio

A bilingual (Arabic / English) online store built with Next.js and Firebase. Arabic is the default locale and renders right-to-left.

> Work in progress: this branch rebuilds the old React/Vite version. Products and orders are fictional demo data.

## Stack

- Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, shadcn/ui
- next-intl with `/ar` (default, RTL) and `/en` routes
- Firebase Auth (client SDK) and Firestore via `firebase-admin` on the server
- Stripe Checkout in test mode (coming in the checkout milestone)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the Firebase values
npm run dev
```

Open http://localhost:3000. You'll be sent to `/ar` or `/en` based on your browser language.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate route types, then `tsc --noEmit` |
| `npm run check:rtl` | Fail on physical `left`/`right` Tailwind classes (use `start`/`end`, `ms`/`me`, `ps`/`pe`) |
| `npm run images` | Regenerate the placeholder product images in `public/products/` |
| `npm run seed` | Reset the Firestore `products` and `orders` collections to the demo data (needs `.env.local`) |

## Project layout

- `src/app/[locale]/` — routes, all under the locale segment
- `src/i18n/` — locales, routing, request config; translations live in `messages/{ar,en}.json`
- `src/data/products.ts` — demo catalogue: 74 brand-free products, 7 categories, 25 sub-categories, 8 invented brands (`src/data/catalog/`)
- `src/lib/catalog.ts` — the only module pages read products from (local data now, Firestore later)
- `src/stores/` — cart and wishlist (Zustand, saved to localStorage)
- `src/lib/firebase/` — `client.ts` for the browser, `admin.ts` for server code
- `scripts/seed.ts` — Firestore seed / reset

## Product images

Product photos are AI-generated studio shots (GPT Image 2 on Higgsfield). Each product is one 2×2 grid that `scripts/process-product-images.ts` splits into `public/products/<slug>/1-4.webp`. Image *i* shows colour *i*, and any images after the colours are detail shots. The prompts live in `scripts/image-prompts.ts`. Every product design is invented and has no text, logos or brands.

`npm run images` still generates simple icon placeholders, which are handy if you add products before their photos exist.
