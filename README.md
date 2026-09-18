# AeroFind ✈️ — flight-booking-demo

Portfolio demo app: a fictional flight search & booking flow, built to showcase
frontend engineering and UI/UX — **not a real booking system**.

**⚠️ This is a demo.** Every airline, flight, price, and seat map is generated
in the browser. There is no backend, no database, and no real payment
processing — don't enter real card numbers or personal documents.

## Why this exists

Built as one of a handful of demo apps for [tomasarras.com.ar](https://tomasarras.com.ar),
to show real product flows (search, filters, multi-step booking, seat
selection) without relying on screenshots or a real company's branding/data.

## Stack

- [Next.js](https://nextjs.org/) (App Router) + React
- Tailwind CSS
- No backend, no database — flights are generated deterministically from the
  search query (origin/destination/date), and "bookings" are persisted only
  in the browser's `localStorage`.

## How the mock data works

- `lib/airports.js` — real-world airport codes/cities used as flavor text.
- `lib/airlines.js` — entirely fictional airlines (names, codes, colors).
- `lib/flights.js` — a seeded PRNG turns `(origin, destination, date)` into
  the same list of flights every time, so results survive navigation and
  page refreshes without needing a server. Flight IDs encode the seed, so
  `/flights/[id]` can reconstruct a single flight on demand.
- `lib/booking.js` — reads/writes "bookings" to `localStorage`. Nothing ever
  leaves the browser.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Deployed on [Vercel](https://vercel.com). No environment variables required.
