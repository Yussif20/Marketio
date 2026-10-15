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
| `npm run seed` | Reset the Firestore `products` and `orders` collections to the demo data (needs `.env.local`) |

## Project layout

- `src/app/[locale]/` — routes, all under the locale segment
- `src/i18n/` — locales, routing, request config; translations live in `messages/{ar,en}.json`
- `src/data/products.ts` — demo catalogue (27 brand-free products in 7 categories)
- `src/lib/firebase/` — `client.ts` for the browser, `admin.ts` for server code
- `scripts/seed.ts` — Firestore seed / reset
