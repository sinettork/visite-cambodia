# Cambodia Tourism (Next.js + Tailwind + MySQL)

## Getting started

1. Install Node.js 24 LTS (the project pins Node 24 in `.nvmrc` and `package.json`), then install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set your MySQL connection values.
3. Import `db/schema.sql` into your MySQL server.
4. Apply each SQL migration in `db/migrations/` in filename order, once per database, after taking a backup. Migration `004_province_story_content.sql` adds province storytelling fields; `005_province_traveler_content.sql` adds researched trip-planning notes and source references; `006_place_traveler_content.sql` adds richer destination guides and source references; `007_ticket_status.sql` separates free, unconfirmed and price-to-check ticket states; `008_mysql_catalog_parity.sql` adds access/source fields and upserts the complete 42-place fallback catalog into MySQL; `009_admin_content_fields.sql` adds province image, ticket purchase and admin audit fields; `010_angkor_enterprise_ticket_link.sql` links Angkor Wat's ticket information to the official Angkor Enterprise site; `011_business_place_listings.sql` adds business subtypes and draft/published visibility; `012_admin_accounts.sql` adds named admin accounts and security-event logging.
5. Verify MySQL with `mysqladmin --protocol=tcp -h 127.0.0.1 -P 3306 ping`, then start the app with `npm run dev` and open http://localhost:3000.

The app uses MySQL when configured and falls back to sample data if the database cannot be reached. English and Khmer are supported at `/en/...` and `/km/...`; older URLs with `?lang=en` or `?lang=km` redirect to the matching locale path. Most pages are statically rendered and refreshed at most every hour; destination search filters render on request. The MySQL connection pool is reused globally, with a maximum of 10 connections. `images.unoptimized` is enabled for any Next.js Image components; current page photos use native `<img>` tags and are not processed by the Next.js image optimizer. Use `npm run dev` for development (the first request to each route compiles it); use `npm run build` followed by `npm run start` to check production performance locally. Province guides cover all 25 Cambodian provinces and municipality, and destination pages can carry researched editorial content covering history, highlights, visit planning, traveler tips and sources. Research uses tourism references, Wikipedia, UNESCO, APSARA and conservation sources where relevant. Place listings can be classified as attractions, accommodations, or restaurants; only add named businesses after verifying their details.

## Project structure

- `app/` — Next.js routes, layouts, and styles
- `/km` and `/en` are the Khmer and English home pages; `/km/explore` and `/en/explore` are the destination directories and search pages
- `components/` — shared UI components
- `db/schema.sql` — MySQL schema and sample records
- `db/migrations/` — ordered MySQL schema and regional-guide upgrades
- `lib/db/` — MySQL connection pool
- `lib/repositories/` — database queries
- `lib/types/` — shared data types

Sample prices, hours, and coordinates are placeholders; verify them before launch.

## Admin content management

The admin workspace is available at `/admin` with Overview, Places, Provinces, Media Library, Activity Log, Settings, and Administrators sections. It edits province guides and place details, and can add hotels, guest houses, restaurants, cafes and other places. Place search supports province, type, and publication-status filters. New places are drafts and remain hidden until published; publishing requires bilingual names, a description and at least one verified source URL. Admins can select up to 100 places and move them to draft or pause them in one audited operation; bulk actions cannot publish records. Editors can create drafts and edit content, but cannot change publishing status or manage accounts. Admins can publish content and download a JSON content export. The bootstrap super-admin alone can create, disable, and change roles or passwords for named team accounts. Passwords for database-backed accounts are stored as scrypt hashes; disabling an account, changing its role, or resetting its password revokes its existing sessions. The bootstrap account is configured with `ADMIN_EMAIL` and a unique `ADMIN_PASSWORD` of at least 16 characters in the server environment; keep them private and never expose them as `NEXT_PUBLIC_*` values or commit them. `ADMIN_SESSION_SECRET` is optional; if set, use a random value of at least 32 characters. Otherwise, the app derives the session-signing key from the admin password. Team-account recovery is performed by a super-admin password reset; the app does not send recovery email.

Image uploads accept JPG, PNG and WebP files up to 5 MB. Files are stored outside the public build output in `./uploads` by default and served from `/media/...`; set `ADMIN_UPLOAD_DIR` to a persistent, writable directory on the server. The JSON content export is for content transfer/review only; it is not a restorable database backup and does not include image files. Production operations must separately schedule encrypted off-site MySQL backups and back up the persistent media directory, then regularly test a restore in a separate environment. The Node.js host and reverse proxy should limit request bodies to approximately 6 MB, persist the media volume, enforce HTTPS, and apply shared rate limiting to `/api/admin/login` across app instances. Ticket purchase links must be verified HTTPS destinations before publishing; source links are retained on the page as references.

The header background photo at `public/images/angkor-wat-header.jpg` is “Angkor panorama banner” by Chris ([Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Angkor_panorama_banner.jpg)), licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/). It is cropped to fit the header.

Food page photography in `public/images/food/` is sourced from Wikimedia Commons. Attribution is documented here and is not shown in the page UI:

- [Pepper at Kep Crab Market](https://commons.wikimedia.org/wiki/File:06-Kep_Crab_Market_Cambodia-nX-3.jpg) by PsamatheM, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Fish Amok — Khmer specialty](https://commons.wikimedia.org/wiki/File:Fish_Amok-_Khmer_specialty.jpg) by Ben Yapp, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
- [Beef Lok Lak](https://commons.wikimedia.org/wiki/File:Beef_Lok_Lak.jpg) by James Antrobus, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
- [Cambodian Num Pachok](https://commons.wikimedia.org/wiki/File:Cambodian_Num_Pachok.jpg) by Stefan Fussan, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
- [Fried crab with green pepper](https://commons.wikimedia.org/wiki/File:Fried_crab_with_green_pepper.jpg) by eric yeargan, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).

Individual currency guide banknote images in `public/images/riel-*.jpg` are sourced from Wikimedia Commons. Their required attribution is recorded here rather than shown in the user interface. Keep this attribution available while these images are used publicly, or replace them with properly licensed production images:

- [100 riel](https://commons.wikimedia.org/wiki/File:100Camdianrielnote_01.JPG) and [500 riel](https://commons.wikimedia.org/wiki/File:500Camdianrielnote_04.JPG), Paasikivi, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [1,000 riel](https://commons.wikimedia.org/wiki/File:1000_Cambodian_Riels_-_2016.jpg), Biylegisz, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [2,000 riel](https://commons.wikimedia.org/wiki/File:2000_Riel_obverse.jpg), [5,000 riel](https://commons.wikimedia.org/wiki/File:5000Camdianrielnote(reverse)03.JPG), [10,000 riel](https://commons.wikimedia.org/wiki/File:10000_riel_2001_reverse.jpg), [20,000 riel](https://commons.wikimedia.org/wiki/File:20000_riel_2008_reverse.jpg), and [50,000 riel](https://commons.wikimedia.org/wiki/File:50000_riel_reverse.jpg), licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/); creators are credited beside each note.

Province banner backgrounds use landmark photographs from Wikimedia Commons. Attribution is documented here and is not shown in the province page UI:

- [Banteay Chhmar Temple Entrance](https://commons.wikimedia.org/wiki/File:Banteay_Chhmar_Temple_Entrance.JPG) by Andrew Marino, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
- [Ta Dumbong statue](https://commons.wikimedia.org/wiki/File:Ta_Dumbong_statue_2.jpg) by Christophe95, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Kizuna Bridge across the Mekong](https://commons.wikimedia.org/wiki/File:Kizuna_Bridge_across_Mekong_River_-_Kampong_Cham_-_Cambodia_(48328824301).jpg) by Adam Jones, [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).
- [Kirirom National Park](https://commons.wikimedia.org/wiki/File:Kirirom_National_Park.jpg) by Arie, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
- [Sambor Prei Kuk temple](https://commons.wikimedia.org/wiki/File:Sambor_Prei_Kuk_N16_(2)_en_2014.jpg) by Pierre André, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Durian Roundabout sculpture in Kampot](https://commons.wikimedia.org/wiki/File:2022.08-516-214ap1_sculpture,_monument_Durian_Roundabout,Kampot,KH_sat20aug2022-1556h.jpg) by Rik Schuiling / TropCrop-TCS, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Koh Kong bridge](https://commons.wikimedia.org/wiki/File:Kohkongbridge2007.jpg) by Tony Hobbs, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
- [Irrawaddy dolphins in Kratie](https://commons.wikimedia.org/wiki/File:Kratie.-_les_dauphins_de_l%27Irrawaddy.webm) by Pierre André, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Bou Sra Waterfall](https://commons.wikimedia.org/wiki/File:Bou_Sra_Waterfall,_Mondulkiri,_Cambodia.jpg) by Dtfman, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
- [Eight Doors Direction Temple at Phnom Yat](https://commons.wikimedia.org/wiki/File:Eight_Doors_Direction_Temple_(Phnom_Yat).jpg) by Kiensvay, [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
- [Wat Phnom](https://commons.wikimedia.org/wiki/File:2016_Phnom_Penh,_Wat_Phnom_(07).jpg) by Marcin Konsek, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Sihanoukville coastline at dawn](https://commons.wikimedia.org/wiki/File:Panorama_-_Sihanoukville_at_dawn.jpg) by Dmitry Makeev, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Prasat Preah Vihear](https://commons.wikimedia.org/wiki/File:03_Prasat_Preah_Vihear-nX-06532.jpg) by PsamatheM, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Sompove Meas Island in Pursat](https://commons.wikimedia.org/wiki/File:Sompove_Meas_Island,_Pursat_province,_Cambodia.jpg) by Sotheaboth, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
- [Yeak Laom Lake in Ratanakiri](https://commons.wikimedia.org/wiki/File:Yeak_Laom_Lake_in_Paranoma_-Photo_2016-.jpg) by Chamnanmuon, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Bavet in Svay Rieng](https://commons.wikimedia.org/wiki/File:Bavet.JPG) by BrightRaven, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
- [China-Cambodia Friendship Bridge in Stung Treng](https://commons.wikimedia.org/wiki/File:China-Cambodia_friendship_bridge_in_Stung_treng.jpg) by vive le vélo, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
- [Phnom Chisor stairway in Takeo](https://commons.wikimedia.org/wiki/File:Phnom_Chisor_stairs.jpg) by Christina Andrada, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
- [Memot earthwork in Tboung Khmum](https://commons.wikimedia.org/wiki/File:Memot_earthwork.jpg) by Alison Kyra Carter, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Crab statue in Kep](https://commons.wikimedia.org/wiki/File:Crab_Statue_in_Sea_with_Threatening_Sky_-_Kep_-_Cambodia_(48543458912).jpg) by Adam Jones, [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).
