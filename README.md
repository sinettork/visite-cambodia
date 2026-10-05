# Cambodia Tourism (Next.js + Tailwind + MySQL)

## Getting started

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set your MySQL connection values.
3. Import `db/schema.sql` into your MySQL server.
4. Apply each SQL migration in `db/migrations/` in filename order.
5. Start the app with `npm run dev` and open http://localhost:3000.

The app uses MySQL when configured and falls back to sample data if the database cannot be reached. English and Khmer are supported. Province guides cover all 25 Cambodian provinces and municipality. Place listings can be classified as attractions, accommodations, or restaurants; only add named businesses after verifying their details.

## Project structure

- `app/` — Next.js routes, layouts, and styles
- `components/` — shared UI components
- `db/schema.sql` — MySQL schema and sample records
- `db/migrations/` — ordered MySQL schema and regional-guide upgrades
- `lib/db/` — MySQL connection pool
- `lib/repositories/` — database queries
- `lib/types/` — shared data types

Sample prices, hours, and coordinates are placeholders; verify them before launch.

The header background photo at `public/images/angkor-wat-header.jpg` is “Angkor panorama banner” by Chris ([Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Angkor_panorama_banner.jpg)), licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/). It is cropped to fit the header.

Food page photography in `public/images/food/` is credited in the page and sourced from Wikimedia Commons:

- [Pepper at Kep Crab Market](https://commons.wikimedia.org/wiki/File:06-Kep_Crab_Market_Cambodia-nX-3.jpg) by PsamatheM, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Fish Amok — Khmer specialty](https://commons.wikimedia.org/wiki/File:Fish_Amok-_Khmer_specialty.jpg) by Ben Yapp, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
- [Beef Lok Lak](https://commons.wikimedia.org/wiki/File:Beef_Lok_Lak.jpg) by James Antrobus, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
- [Cambodian Num Pachok](https://commons.wikimedia.org/wiki/File:Cambodian_Num_Pachok.jpg) by Stefan Fussan, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
- [Fried crab with green pepper](https://commons.wikimedia.org/wiki/File:Fried_crab_with_green_pepper.jpg) by eric yeargan, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
