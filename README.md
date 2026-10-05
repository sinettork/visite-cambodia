# Cambodia Tourism (Next.js + Tailwind + MySQL)

1. `npm install`
2. Copy the example env file: `cp .env.example .env.local`
3. If you have MySQL running locally, import the database: `mysql -u root -p < db/schema.sql`
4. Paste your CSS into `app/site.css`
5. `npm run dev` then open http://localhost:3000

The app includes built-in fallback sample data so the homepage still loads even before a local MySQL database is configured. When you do connect MySQL, the app uses the live database automatically.

Add photos to `public/images/` and set `places.image_url` (e.g. `/images/angkor-wat.jpg`).
Sample prices, hours and coordinates are placeholders: verify before launch.
