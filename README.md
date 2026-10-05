# Cambodia Tourism (Next.js + Tailwind + MySQL)

## Getting started

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set your MySQL connection values.
3. Import `db/schema.sql` into your MySQL server.
4. Start the app with `npm run dev` and open http://localhost:3000.

The app uses MySQL when configured and falls back to sample data if the database cannot be reached. English and Khmer are supported.

## Project structure

- `app/` — Next.js routes, layouts, and styles
- `components/` — shared UI components
- `db/schema.sql` — MySQL schema and sample records
- `lib/db/` — MySQL connection pool
- `lib/repositories/` — database queries
- `lib/types/` — shared data types

Sample prices, hours, and coordinates are placeholders; verify them before launch.
