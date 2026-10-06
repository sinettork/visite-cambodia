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
- `/` is the home page; `/explore` is the destination directory and search page
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

Province banner backgrounds use landmark photographs from Wikimedia Commons, with photo and license links shown on each province page:

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
