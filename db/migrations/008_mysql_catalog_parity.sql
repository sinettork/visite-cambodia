USE cambodia_tourism;

-- Keep the live MySQL catalog aligned with lib/data/sample-data.ts.
-- Re-running this migration is safe: columns are conditional and records upsert by slug.
ALTER TABLE places
  ADD COLUMN IF NOT EXISTS access_km TEXT NULL AFTER open_hours,
  ADD COLUMN IF NOT EXISTS access_en TEXT NULL AFTER access_km,
  ADD COLUMN IF NOT EXISTS source_urls TEXT NULL AFTER access_en;

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'angkor-wat', id, 'attraction', 'history', 'ប្រាសាទអង្គរវត្ត', 'Angkor Wat', 'មហាសំណង់ប្រាសាទបុរាណធំបំផុតនៅលើពិភពលោក និងជានិមិត្តរូបជាតិនៃប្រទេសកម្ពុជា។', 'The largest religious monument in the world and the iconic national symbol of Cambodia.', NULL, '37.00', 'check', '05:00-17:30', NULL, NULL, NULL, '13.4125', '103.8670', '1200' FROM provinces WHERE slug = 'siem-reap'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'bayon-temple', id, 'attraction', 'history', 'ប្រាសាទបាយ័ន', 'Bayon Temple', 'ប្រាសាទថ្មដ៏ល្បីល្បាញដែលមានរូបព្រហ្មមុខបួនញញឹមជាង ២០០ ស្ថិតនៅចំកណ្ដាលក្រុងអង្គរធំ។', 'Famous temple in Angkor Thom known for its 216 serene, gigantic stone faces.', NULL, '37.00', 'check', '07:30-17:30', NULL, NULL, NULL, '13.4414', '103.8587', '850' FROM provinces WHERE slug = 'siem-reap'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'ta-prohm', id, 'attraction', 'nature', 'ប្រាសាទតាព្រហ្ម', 'Ta Prohm Temple', 'ប្រាសាទដែលល្បីល្បាញដោយសារឫសឈើធំៗដុះព័ទ្ធជុំវិញផ្ទាំងថ្មបុរាណ។', 'Atmospheric jungle temple where giant silk-cotton and strangler fig tree roots intertwine with ruins.', NULL, '37.00', 'check', '07:30-17:30', NULL, NULL, NULL, '13.4348', '103.8893', '780' FROM provinces WHERE slug = 'siem-reap'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'raffles-grand-hotel-angkor', id, 'accommodation', 'culture', 'សណ្ឋាគារ រ៉ាហ្វល ហ្គ្រេន អង្គរ', 'Raffles Grand Hotel d''Angkor', 'សណ្ឋាគារប្រណីតរចនាបថបារាំងបុរាណលំដាប់ផ្កាយ ៥ ក្បែរដងស្ទឹងសៀមរាប។', 'Historic landmark luxury hotel combining French-colonial elegance with Cambodian heritage hospitality.', NULL, '280.00', 'check', '24/7', NULL, NULL, NULL, '13.3672', '103.8594', '450' FROM provinces WHERE slug = 'siem-reap'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'cuisine-wat-damnak', id, 'restaurant', 'food', 'ភោជនីយដ្ឋាន វ៉ាត់ដំណាក់', 'Cuisine Wat Damnak', 'ភោជនីយដ្ឋានលំដាប់កំពូលដែលកែច្នៃម្ហូបខ្មែរបែបសហសម័យដោយប្រើប្រាស់គ្រឿងផ្សំក្នុងស្រុក។', 'Award-winning fine dining bringing innovative Cambodian gastronomy using seasonal local ingredients.', NULL, '45.00', 'check', '18:30-22:30', NULL, NULL, NULL, '13.3534', '103.8576', '390' FROM provinces WHERE slug = 'siem-reap'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'royal-palace', id, 'attraction', 'culture', 'ព្រះបរមរាជវាំង', 'Royal Palace & Silver Pagoda', 'ដំណាក់ព្រះមហាក្សត្រនៃព្រះរាជាណាចក្រកម្ពុជា និងព្រះវិហារព្រះកែវមរកតដ៏ពិសិដ្ឋ។', 'Magnificent Khmer royal complex featuring the Throne Hall and the revered Silver Pagoda.', NULL, '10.00', 'check', '08:00-11:00, 14:00-17:00', NULL, NULL, NULL, '11.5636', '104.9314', '920' FROM provinces WHERE slug = 'phnom-penh'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'national-museum-cambodia', id, 'attraction', 'history', 'សារមន្ទីរជាតិកម្ពុជា', 'National Museum of Cambodia', 'សារមន្ទីរប្រវត្តិសាស្ត្រធំបំផុតដែលតាំងបង្ហាញរូបបដិមា និងវត្ថុបុរាណខ្មែរជាង ១៤ ០០០ មុខ។', 'Cambodia''s largest museum of cultural history, housing unparalleled collections of Khmer art and sculpture.', NULL, '10.00', 'check', '08:00-17:00', NULL, NULL, NULL, '11.5656', '104.9288', '610' FROM provinces WHERE slug = 'phnom-penh'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'rosewood-phnom-penh', id, 'accommodation', 'culture', 'សណ្ឋាគារ រ៉ូសវូដ ភ្នំពេញ', 'Rosewood Phnom Penh', 'សណ្ឋាគារប្រណីតលំដាប់ខ្ពស់បំផុតនៅលើអគារវឌ្ឍនៈកាពីតាល ជាមួយនឹងទេសភាពទីក្រុង ៣៦០ ដឺក្រេ។', 'Ultra-luxury hotel perched in the Vattanac Capital Tower offering panoramic views of the capital.', NULL, '240.00', 'check', '24/7', NULL, NULL, NULL, '11.5724', '104.9198', '380' FROM provinces WHERE slug = 'phnom-penh'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'malis-restaurant-phnom-penh', id, 'restaurant', 'food', 'ភោជនីយដ្ឋាន ម្លិះ ភ្នំពេញ', 'Malis Restaurant Phnom Penh', 'ភោជនីយដ្ឋានម្ហូបខ្មែរប្រណីតបែបដើមល្បីល្បាញដោយមុខម្ហូបប្រចាំតំបន់ និងបរិយាកាសល្អប្រណីត។', 'Renowned living Cambodian cuisine restaurant serving authentic national dishes in an elegant courtyard setting.', NULL, '25.00', 'check', '06:30-22:30', NULL, NULL, NULL, '11.5540', '104.9272', '520' FROM provinces WHERE slug = 'phnom-penh'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'bokor-national-park', id, 'attraction', 'nature', 'ឧទ្យានជាតិព្រះមុនីវង្ស បូកគោ', 'Bokor National Park', 'ភ្នំខ្ពស់ដែលមានអាកាសធាតុត្រជាក់ ទេសភាពព្រៃធម្មជាតិ ទឹកធ្លាក់ពពកវិល និងសំណង់ប្រវត្តិសាស្ត្រ។', 'Misty highland national park known for cool mountain air, Popokvil waterfall, and historical colonial buildings.', NULL, NULL, 'unknown', '06:00-18:00', NULL, NULL, NULL, '10.6200', '104.0500', '740' FROM provinces WHERE slug = 'kampot'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'la-plantation-pepper-farm', id, 'attraction', 'nature', 'ចម្ការម្រេច ឡាផ្លានតាសិន', 'La Plantation Pepper Farm', 'ចម្ការម្រេចកំពតសរីរាង្គលំដាប់ពិភពលោក ផ្តល់ការទស្សនាដោយឥតគិតថ្លៃ និងភ្លក់រសជាតិម្រេចគ្រប់ប្រភេទ។', 'Award-winning organic Kampot pepper plantation offering guided agricultural tours and tastings.', NULL, NULL, 'free', '09:00-18:00', NULL, NULL, NULL, '10.6558', '104.3721', '460' FROM provinces WHERE slug = 'kampot'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'rikitikitavi-kampot', id, 'restaurant', 'food', 'រីគីទីគីតាវី កំពត', 'Rikitikitavi Riverside Bistro', 'ប៊ីស្ត្រូតាមមាត់ស្ទឹងកំពត មានអាហារខ្មែរ និងអន្តរជាតិឆ្ងាញ់ៗជាមួយទេសភាពថ្ងៃលិចដ៏ស្រស់ស្អាត។', 'Popular riverside bistro and lounge offering Asian fusion dishes, cocktails, and sunset river views.', NULL, '12.00', 'check', '07:30-23:00', NULL, NULL, NULL, '10.6080', '104.1780', '310' FROM provinces WHERE slug = 'kampot'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'kep-crab-market', id, 'restaurant', 'food', 'ផ្សារក្តាមកែប', 'Kep Crab Market', 'ផ្សារមាត់សមុទ្រដ៏ល្បីល្បាញ ដែលមានក្តាមសមុទ្រស្រស់ៗស្រង់ពីទឹកភ្លាមៗឆាជាមួយម្រេចខ្ចីកំពត។', 'Vibrant coastal seafood market famous for fresh blue swimmer crab cooked on-the-spot with green Kampot pepper.', NULL, NULL, 'unknown', '06:30-19:00', NULL, NULL, NULL, '10.4833', '104.3167', '890' FROM provinces WHERE slug = 'kep'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'kep-national-park', id, 'attraction', 'nature', 'ឧទ្យានជាតិកែប', 'Kep National Park', 'ឧទ្យានជាតិព្រៃភ្នំជាប់មាត់សមុទ្រ មានផ្លូវដើរព្រៃ និងចំណុចមើលទេសភាពឈូងសមុទ្រថៃយ៉ាងស្រស់ត្រកាល។', 'Lush coastal mountain park featuring well-marked nature trails and spectacular views over the Gulf of Thailand.', NULL, '1.00', 'check', '06:00-18:00', NULL, NULL, NULL, '10.4920', '104.3050', '420' FROM provinces WHERE slug = 'kep'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'veranda-natural-resort-kep', id, 'accommodation', 'nature', 'រីហ្សតធម្មជាតិ វេរ៉ាន់ដា កែប', 'Veranda Natural Resort Kep', 'រីហ្សតលើចង្កេះភ្នំកែប រចនាបែបផ្ទះឈើធម្មជាតិព័ទ្ធជុំវិញដោយដើមឈើធំៗ និងទេសភាពសមុទ្រ។', 'Hilltop eco-resort nestled in Kep''s lush forest canopy overlooking the islands and sea.', NULL, '95.00', 'check', '24/7', NULL, NULL, NULL, '10.4890', '104.3080', '340' FROM provinces WHERE slug = 'kep'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'koh-rong', id, 'attraction', 'beach', 'កោះរ៉ុង', 'Koh Rong Island', 'កោះធម្មជាតិដ៏ធំដែលមានឆ្នេរខ្សាច់សក្បុស ទឹកសមុទ្រថ្លាដូចកញ្ចក់ និងជីវចម្រុះបាតសមុទ្រសម្បូរបែប។', 'Cambodia''s premier island paradise boasting pristine white-sand beaches, bioluminescent plankton, and crystal bays.', NULL, NULL, 'unknown', '24/7', NULL, NULL, NULL, '10.7000', '103.2800', '820' FROM provinces WHERE slug = 'preah-sihanouk'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'koh-rong-sanloem-saracen-bay', id, 'attraction', 'beach', 'ឆ្នេរសារ៉ាសេនបេ កោះរ៉ុងសន្លឹម', 'Saracen Bay (Koh Rong Sanloem)', 'ឆ្នេរសមុទ្រស្ងប់ស្ងាត់ មានទឹករាក់ថ្លាដូចកញ្ចក់ ស័ក្តិសមបំផុតសម្រាប់ការសម្រាកលម្ហែកាយបែបស្ងប់ស្ងាត់។', 'Serene turquoise cove on Koh Rong Sanloem with powdery white sand and relaxed beachside bungalows.', NULL, NULL, 'unknown', '24/7', NULL, NULL, NULL, '10.5950', '103.3100', '540' FROM provinces WHERE slug = 'preah-sihanouk'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'phnom-sampeau-bat-caves', id, 'attraction', 'nature', 'ភ្នំសំពៅ និងរូងប្រចៀវ', 'Phnom Sampeau & Bat Caves', 'ភ្នំថ្មកំបោរប្រវត្តិសាស្ត្រ និងទិដ្ឋភាពហ្វូងប្រចៀវរាប់លានក្បាលហើរចេញពីរូងពេលថ្ងៃរៀបលិច។', 'Limestone mountain with scenic hilltop shrines, historical caves, and an evening mass bat exodus spectacle.', NULL, '3.00', 'check', '06:00-18:30', NULL, NULL, NULL, '13.0238', '103.0975', '670' FROM provinces WHERE slug = 'battambang'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'bambootrain-battambang', id, 'attraction', 'adventure', 'រទេះភ្លើងឫស្សី (ណូរី) បាត់ដំបង', 'Bamboo Train (Norry)', 'មធ្យោបាយធ្វើដំណើរបែបប្រជាប្រិយលើផ្លូវដែកកាត់វាលស្រែ និងទេសភាពជនបទបាត់ដំបង។', 'Unique local transport experience riding a motorized bamboo platform along scenic rural rail tracks.', NULL, '5.00', 'check', '07:00-17:30', NULL, NULL, NULL, '13.0480', '103.1890', '590' FROM provinces WHERE slug = 'battambang'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'jaan-bai-restaurant', id, 'restaurant', 'food', 'ភោជនីយដ្ឋាន ចានបាយ បាត់ដំបង', 'Jaan Bai Restaurant', 'ភោជនីយដ្ឋានសហគមន៍ដែលបម្រើម្ហូបខ្មែរបែបច្នៃប្រឌិត និងគាំទ្រការបណ្ដុះបណ្ដាលយុវជនមូលដ្ឋាន។', 'Celebrated social enterprise restaurant serving creative Cambodian tapas and seasonal farm-to-table dishes.', NULL, '10.00', 'check', '11:00-22:00', NULL, NULL, NULL, '13.1023', '103.1989', '320' FROM provinces WHERE slug = 'battambang'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'bou-sra-waterfall', id, 'attraction', 'nature', 'ទឹកធ្លាក់ប៊ូស្រា', 'Bou Sra Waterfall', 'ទឹកធ្លាក់ដ៏ធំអស្ចារ្យ ៣ ជាន់ កណ្តាលព្រៃភ្នំក្រាស់នៃខេត្តមណ្ឌលគិរី។', 'Spectacular multi-tiered cascade surrounded by lush indigenous rainforest in Mondulkiri.', NULL, '2.50', 'check', '07:00-17:30', NULL, NULL, NULL, '12.5694', '107.4194', '630' FROM provinces WHERE slug = 'mondulkiri'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'elephant-valley-project-mondulkiri', id, 'attraction', 'nature', 'គម្រោងអភិរក្សដំរីជ្រលងភ្នំ មណ្ឌលគិរី', 'Elephant Valley Project', 'ជម្រកអភិរក្សដំរីធម្មជាតិដែលអនុញ្ញាតឱ្យភ្ញៀវដើរមើលដំរីរស់នៅក្នុងព្រៃដោយសេរី ដោយគ្មានការជិះដំរី។', 'Pioneering ethical elephant sanctuary where rescued elephants roam freely in their natural jungle habitat.', NULL, '55.00', 'check', '08:00-17:00', NULL, NULL, NULL, '12.4500', '107.1800', '480' FROM provinces WHERE slug = 'mondulkiri'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'yeak-laom-lake', id, 'attraction', 'nature', 'បឹងយក្សឡោម', 'Yeak Laom Volcanic Lake', 'បឹងភ្នំភ្លើងបុរាណរាងមូលដូចកែវ មានទឹកថ្លាឈ្វេងព័ទ្ធជុំវិញដោយ���្រៃស្រោងពិសិដ្ឋរបស់ជនជាតិដើមភាគតិច។', 'Pristine 4,000-year-old volcanic crater lake surrounded by sacred jungle and indigenous cultural trails.', NULL, '2.00', 'check', '07:00-17:00', NULL, NULL, NULL, '13.7314', '107.0178', '550' FROM provinces WHERE slug = 'ratanakiri'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'prasat-preah-vihear', id, 'attraction', 'history', 'ប្រាសាទព្រះវិហារ', 'Preah Vihear Temple', 'សម្បត្តិបេតិកភណ្ឌពិភពលោកយូណេស្កូ ស្ថិតនៅលើកំពូលភ្នំដងរែក កម្ពស់ ៥២៥ ម៉ែត្រ។', 'UNESCO World Heritage cliff-top Khmer temple perched dramatically atop the Dângrêk Mountains.', NULL, '10.00', 'check', '07:30-16:30', NULL, NULL, NULL, '14.3908', '104.6800', '710' FROM provinces WHERE slug = 'preah-vihear'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'koh-ker-pyramid', id, 'attraction', 'history', 'រមណីយដ្ឋានប្រាសាទកោះកេរ', 'Koh Ker Pyramid Complex', 'រាជធានីបុរាណសតវត្សរ៍ទី ១០ ដែលមានប្រាសាទធំជារាងពីរ៉ាមីត ៧ ជាន់ដ៏អស្ចារ្យ (បេតិកភណ្ឌពិភពលោក)។', '10th-century ancient capital known for Prasat Thom, a striking 7-tiered stepped pyramid temple (UNESCO).', NULL, '15.00', 'check', '07:30-17:30', NULL, NULL, NULL, '13.7844', '104.5361', '640' FROM provinces WHERE slug = 'preah-vihear'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'tatai-waterfall-koh-kong', id, 'attraction', 'nature', 'ទឹកធ្លាក់តាតៃ កោះកុង', 'Tatai Waterfall', 'ទឹកធ្លាក់ដ៏ស្រស់ស្អាតលើដងទន្លេតាតៃ ហ៊ុមព័ទ្ធដោយព្រៃភ្នំក្រវាញដ៏ធំទូលាយ។', 'Scenic wide river cascade nestled in the Cardamom Mountain rainforest ecosystem.', NULL, '2.00', 'check', '07:00-17:30', NULL, NULL, NULL, '11.5833', '103.1167', '430' FROM provinces WHERE slug = 'koh-kong'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'cardamom-tented-camp', id, 'accommodation', 'adventure', 'រីហ្សតតង់ ភ្នំក្រវាញ កោះកុង', 'Cardamom Tented Camp', 'ជំរំតង់បែបអេកូឡូស៊ីលំដាប់ខ្ពស់ ដែលរួមចំណែកដល់ការការពារព្រៃភ្នំក្រវាញ និងសត្វព្រៃកម្រ។', 'Eco-luxury tented safari camp helping protect the biodiversity of the Cardamom National Park.', NULL, '160.00', 'check', '24/7', NULL, NULL, NULL, '11.5167', '103.2000', '350' FROM provinces WHERE slug = 'koh-kong'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'wat-nokor-bachey', id, 'attraction', 'history', 'វត្តនគរបាជ័យ កំពង់ចាម', 'Wat Nokor Bachey', 'ប្រាសាទថ្មភក់បុរាណសតវត្សរ៍ទី ១១ ដែលមានវត្តពុទ្ធសាសនាទំនើបកសាងជាប់គ្នាយ៉ាងអស្ចារ្យ។', '11th-century sandstone Angkorian temple complex seamlessly fused with a vibrant modern Buddhist pagoda.', NULL, '3.00', 'check', '07:00-17:30', NULL, NULL, NULL, '12.0050', '105.4380', '390' FROM provinces WHERE slug = 'kampong-cham'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'oudong-mountain-heritage', id, 'attraction', 'history', 'ភ្នំឧដុង្គ (ព្រះរាជទ្រព្យ)', 'Oudong Mountain Royal Heritage', 'អតីតរាជធានីខ្មែរបុរាណដែលមានព្រះចេតិយតម��កល់ព្រះបរមអដ្ឋិអតីតព្រះមហាក្សត្រ និងព្រះបរមសារីរិកធាតុ។', 'Former royal capital with magnificent hilltop stupas housing royal ashes and holy Buddha relics.', NULL, NULL, 'unknown', '07:00-17:30', NULL, NULL, NULL, '11.8167', '104.7500', '510' FROM provinces WHERE slug = 'kandal'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'kampi-dolphins-kratie', id, 'attraction', 'nature', 'អន្លង់ផ្សោតកាំពី ក្រចេះ', 'Kampi Dolphin Sanctuary', 'អន្លង់ទឹកជ្រៅដងទន្លេមេគង្គ ជម្រកសត្វផ្សោតក្បាលត្រឡោក (Irrawaddy Dolphins) ដ៏កម្រ។', 'Prime Mekong river pool to observe the rare and endangered freshwater Irrawaddy dolphins by local boat.', NULL, '9.00', 'check', '07:00-17:00', NULL, NULL, NULL, '12.6000', '105.9800', '490' FROM provinces WHERE slug = 'kratie'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'banteay-chhmar', id, 'attraction', 'history', 'ប្រាសាទបន្ទាយឆ្មារ', 'Banteay Chhmar Temple', 'ប្រាសាទអង្គរដ៏ធំនៅចុងសតវត្សទី១២ ដល់ដើមសតវត្សទី១៣ ដែលមានថែវ ប៉មមុខ ចម្លាក់លៀនទាប កសិណ និងប្រាសាទរណបជាច្រើន។', 'A major late-12th- to early-13th-century Angkorian temple complex with galleries, face towers, bas-reliefs, moats and satellite temples.', NULL, '5.00', 'check', NULL, 'តាមផ្លូវជាតិលេខ ៥៦/៥៦A ពីសិរីសោភ័ណប្រហែល ៥៩–៦៥ គីឡូម៉ែត្រ។ គួររៀបចំយានជំនិះជាមុន និងអាចទាក់ទងសហគមន៍ទេសចរណ៍សម្រាប់មគ្គុទ្ទេសក៍។', 'Reach Banteay Chhmar via National Road 56/56A, about 59–65 km north of Sisophon. Arrange transport ahead and consider the local community tourism service for guides.', '["https://whc.unesco.org/en/tentativelists/6456/","https://www.tourismcambodia.com/activities/community-based-tourism-cbt/banteay-chhmar-community-based-tourism-site.htm","https://www.visitbanteaychhmar.org/the-temples/"]', '14.0711', '103.0997', '320' FROM provinces WHERE slug = 'banteay-meanchey'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'kampong-chhnang-floating-villages', id, 'attraction', 'culture', 'ភូមិបណ្ដែតទឹកកំពង់ឆ្នាំង', 'Kampong Chhnang Floating Villages', 'បទពិសោធន៍តាមទន្លេសាប ជាមួយផ្ទះបណ្ដែតទឹក កន្លែងនេសាទ និងសហគមន៍រស់នៅតាមទឹកនៅមុខក្រុងកំពង់ឆ្នាំង។', 'A Tonlé Sap river experience among floating houses, fishing lots and waterside communities near Kampong Chhnang town.', NULL, NULL, 'unknown', NULL, 'ទៅកំពង់ផែក្រុងកំពង់ឆ្នាំង ហើយជួលទូកមូលដ្ឋានប្រហែល ១–២ ម៉ោង។ ចម្ងាយ និងផ្លូវទឹកប្រែប្រួលតាមរដូវ។', 'Go to the Kampong Chhnang town port and hire a local boat for roughly 1–2 hours. The route and distance vary with the season and village location.', '["https://tourismcambodia.org/provinces/60/kampong-chhnang","https://www.tourismcambodia.com/travelguides/provinces/kampong-chhnang/what-to-see/374_tonle-sap-view.htm","https://mapcarta.com/W664110520"]', '12.2961', '104.6695', '310' FROM provinces WHERE slug = 'kampong-chhnang'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'kirirom-national-park', id, 'attraction', 'nature', 'ឧទ្យានជាតិព្រះសុរាម្រិត-កុសមៈ គិរីរម្យ', 'Kirirom National Park', 'ឧទ្យានភ្នំដែលមានព្រៃស្រល់ ទឹកជ្រោះ ផ្កាអ័រគីដេ និងសក្តានុពលមើលសត្វស្លាប នៅស្រុកភ្នំស្រួច។', 'A conserved mountain park known for pine forests, waterfalls, orchids and birdwatching in Phnom Sruoch district.', NULL, NULL, 'unknown', NULL, 'ពីភ្នំពេញតាមផ្លូវជាតិលេខ ៤ ប្រហែល ១១៧ គីឡូម៉ែត្រ ហើយត្រូវរៀបចំយានជំនិះសម្រាប់ផ្លូវឡើងភ្នំចុងក្រោយ។', 'From Phnom Penh, follow National Road 4 for about 117 km, then arrange local transport for the final mountain approach.', '["https://www.tourismcambodia.com/travelguides/provinces/kampong-speu/what-to-see/320_kirirom-national-park.htm","https://www.tourismcambodia.com/travelguides/provinces/kampong-speu/how-to-get-there.htm","https://nominatim.openstreetmap.org/search?q=Kirirom+National+Park%2C+Cambodia&format=jsonv2&limit=5"]', '11.3068542', '104.0527431', '300' FROM provinces WHERE slug = 'kampong-speu'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'sambor-prei-kuk', id, 'attraction', 'history', 'ប្រាសាទសំបូរព្រៃគុក', 'Sambor Prei Kuk Temple Zone', 'តំបន់ប្រាសាទបុរាណនៃរាជធានីឦសានបុរៈរបស់ចេនឡា ដែលមានប្រាសាទជាង ១០០ និងស្ថាបត្យកម្មមុនអង្គរ។', 'The archaeological zone of ancient Ishanapura, with more than 100 pre-Angkorian temples and distinctive octagonal sanctuaries.', NULL, NULL, 'unknown', NULL, 'ពីក្រុងកំពង់ធំប្រហែល ៣០–៣៥ គីឡូម៉ែត្រតាមផ្លូវជាតិលេខ ៦៤។ អាចប្រើតុកតុក ឬម៉ូតូ ហើយត្រូវដើររវាងក្រុមប្រាសាទ។', 'About 30–35 km north of Kampong Thom town via National Road 64; a tuk-tuk or motorbike is practical, with walking between temple groups.', '["https://whc.unesco.org/en/list/1532/","https://whc.unesco.org/en/list/1532/maps/","https://ctb.gov.kh/travel-tips/21"]', '12.8725', '105.0431', '390' FROM provinces WHERE slug = 'kampong-thom'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'ba-phnom-resort', id, 'attraction', 'culture', 'រមណីយដ្ឋានបាភ្នំ', 'Ba Phnom Resort', 'តំបន់ធម្មជាតិ និងវប្បធម៌ដែលមានភ្នំជាប់គ្នា វត្តបាភ្នំ ទេសភាពលើកំពូល និងសំណល់បុរាណនៅស្រុកបាភ្នំ។', 'A cultural and natural landscape with connected hills, Wat Ba Phnom, summit views and archaeological remains in Ba Phnom district.', NULL, NULL, 'unknown', NULL, 'ពីភ្នំពេញតាមផ្លូវជាតិលេខ ១ បត់នៅផ្សារកំពង់ស្នឹង ហើយបន្តប្រហែល ៧ គីឡូម៉ែត្រ។', 'From Phnom Penh, follow National Road 1, turn at Kampong Sneung market and continue about 7 km; ask locally for the final rural turn.', '["https://www.tourismcambodia.com/travelguides/provinces/prey-veng/what-to-see/93_ba-phnom-resort.htm","https://www.khmertimeskh.com/501337622/government-establishes-chheu-kach-ba-phnom-mountain-cultural-heritage-site/","https://www.openstreetmap.org/node/860954295"]', '11.2561243', '105.3890437', '280' FROM provinces WHERE slug = 'prey-veng'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'kampong-luang-floating-village', id, 'attraction', 'culture', 'សហគមន៍ភូមិបណ្ដែតទឹកកំពង់ហ្លួង', 'Kampong Luang Floating Village', 'សហគមន៍ភូមិបណ្ដែតទឹកលើបឹងទន្លេសាប ដែលអាចជិះទូកទស្សនាជីវភាពអ្នកនេសាទ ព្រៃលិចទឹក និងថ្ងៃលិច។', 'A Tonle Sap floating-village community where boat trips reveal fishing life, flooded forest and sunset views.', NULL, NULL, 'unknown', NULL, 'ពីទីប្រជុំជនស្រុកក្រគរ តាមផ្លូវជាតិលេខ ៥៤ ប្រហែល ៧ គីឡូម៉ែត្រទៅមាត់ទឹក ហើយរៀបចំទូកមូលដ្ឋាន។', 'From Krakor district town, take National Road 54 for about 7 km to the waterfront and arrange a local boat; water levels affect access.', '["https://cata.org.kh/en/tourism-maps/114-pursat-province","https://www.cata.org.kh/km/tourism-maps/114-pursat-province","https://www.geonames.org/1828265"]', '12.57321', '104.20827', '290' FROM provinces WHERE slug = 'pursat'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'stung-treng-ramsar-site', id, 'attraction', 'nature', 'តំបន់រ៉ាមសារស្ទឹងត្រែង', 'Stung Treng Ramsar Site', 'តំបន់ដីសើមរ៉ាមសារតាមទន្លេមេគង្គ មានទឹកជួរ អន្លង់ កោះ និងព្រៃលិចទឹក ជាជម្រកសត្វស្លាប និងផ្សោតទន្លេ។', 'An internationally important Mekong wetland with rapids, deep pools, islands and flooded forest supporting birds and Irrawaddy dolphins.', NULL, NULL, 'unknown', NULL, 'ប្រហែល ៥ គីឡូម៉ែត្រពីក្រុងស្ទឹងត្រែង។ គួររៀបចំទូកមូលដ្ឋាន ដើម្បីទស្សនាព្រៃលិចទឹក និងទឹកជួរ ហើយបញ្ជាក់ស្ថានភាពទឹកជាមុន។', 'About 5 km from Stung Treng town. Arrange a local boat to view flooded forest and rapids, and confirm water and landing conditions before departure.', '["https://rsis.ramsar.org/sites/default/files/rsiswp_search/exports/Ramsar-Sites-annotated-summary-Cambodia.pdf","https://www.mekongfishnetwork.org/everyone-invited-visit-stung-treng-ramsar-site/","https://iucn.org/resources/grey-literature/climate-change-vulnerability-assessment-stung-treng-ramsar-site-cambodia"]', '13.734167', '106.000000', '270' FROM provinces WHERE slug = 'stung-treng'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'prey-ba-sak', id, 'attraction', 'history', 'ប្រាសាទព្រៃបាសាក់', 'Prey Ba Sak Temple', 'ទីតាំងបុរាណវិទ្យា និងកន្លែងសក្ការៈជនបទក្បែរទន្លេវ៉ៃគូ ដែលមានសំណល់ប្រាសាទ និងបរិយាកាសព្រៃឈើ។', 'A rural archaeological and spiritual site near the Vaiko River, with temple remains and a wooded setting.', NULL, NULL, 'unknown', NULL, 'ប្រហែល ៨.៥ គីឡូម៉ែត្រភាគអាគ្នេយ៍ពីក្រុងស្វាយរៀង តាមផ្លូវជនបទ។ គួរប្រើកូអរដោនេ និងសួរអ្នកស្រុកសម្រាប់ផ្លូវចុងក្រោយ។', 'About 8.5 km southeast of Svay Rieng town on rural roads; use the coordinates and ask locally for the final approach.', '["https://www.tourismcambodia.com/travelguides/provinces/svay-rieng/what-to-see/65_prey-ba-sak.htm","https://www.yosothor.org/publications/khmer-renaissance/chapter-four/prasat-brosak.html","https://www.guidetrip.info/place/basac-temple-tourism-site"]', '11.052997', '105.839663', '250' FROM provinces WHERE slug = 'svay-rieng'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'phnom-da', id, 'attraction', 'history', 'ប្រាសាទភ្នំដា', 'Phnom Da Temple', 'ប្រាសាទបុរាណលើភ្នំខាងត្បូងអង្គរបូរី ដែលស្ថិតក្នុងតំបន់បេតិកភណ្ឌអង្គរបូរី–ភ្នំដា និងមានសំណង់ជាប់ពាក់ព័ន្ធជាច្រើន។', 'A hilltop temple south of Angkor Borei, part of the proposed Angkor Borei–Phnom Da heritage area with nearby related monuments.', NULL, NULL, 'unknown', NULL, 'ពីក្រុងតាកែវប្រហែល ២៤ គីឡូម៉ែត្រតាមទឹក ឬទៅអង្គរបូរីប្រហែល ៣ គីឡូម៉ែត្រទៀត។ ផ្លូវទឹកអាចងាយស្រួលជាងនៅពេលផ្លូវគោកជន់លិច។', 'About 24 km east of Takeo town by canal, or about 3 km from Angkor Borei town; the canal can be easier when roads flood.', '["https://whc.unesco.org/en/tentativelists/6455/","https://www.tourismcambodia.com/travelguides/provinces/takeo/what-to-see/62_phnom-da.htm","https://cambodianess.com/article/visiting-the-angkor-borei-museum-and-phnom-da-temple-site"]', '10.964489', '104.988715', '340' FROM provinces WHERE slug = 'takeo'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'ta-moan-thom', id, 'attraction', 'history', 'ប្រាសាទតាមាន់ធំ', 'Prasat Ta Moan Thom', 'ប្រាសាទខ្មែរបែបហិណ្ឌូនៅលើជួរភ្នំដងរែកជាប់ព្រំដែន ដែលមានប្រាង្គកណ្ដាល សំណង់ថ្មបាយក្រៀម និងលិង្គធម្មជាតិ។', 'A late-11th-century Khmer-Hindu temple on the Dangrek Mountains, with a central sanctuary, laterite structures and a natural rock linga.', NULL, NULL, 'unknown', '09:00–15:00 (reported 2025; verify before travel)', 'តំបន់ព្រំដែនដែលស្ថានភាពសន្តិសុខអាចផ្លាស់ប្តូរ។ ផ្លូវចុងក្រោយជាផ្លូវភ្នំ ហើយអាចត្រូវការការអនុញ្ញាត ឬការណែនាំពីមូលដ្ឋាន។ កុំឆ្លងរបាំង ឬព្រំដែនអន្តរជាតិ។', 'This is a security-sensitive border area. The final approach is mountainous and may require local permission or escort; do not cross barriers or the international border.', '["https://cambodianess.com/article/growing-number-of-cambodian-thais-visitors-at-ta-moan-thom-temple","https://cambodianess.com/article/a-wish-to-visit-sacred-ta-moan-thom-photo-story","https://www.cambotours.com/prasat-ta-muen-thom.html"]', '14.3493', '103.2666', '220' FROM provinces WHERE slug = 'oddar-meanchey'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'wat-phnom-yat', id, 'attraction', 'culture', 'វត្តភ្នំយ៉ាត', 'Wat Phnom Yat', 'រមណីយដ្ឋានវប្បធម៌លើភ្នំក្នុងក្រុងប៉ៃលិន ដែលមានវត្ត ចេតិយ អាស្រម និងទេសភាពក្រុងពីលើកំពូល។', 'A hilltop cultural site in Pailin City with a pagoda, stupas, shrines and views over the city and surrounding plains.', NULL, NULL, 'unknown', NULL, 'ស្ថិតតាមផ្លូវជាតិលេខ ៥៧ ជិតវត្តរតនសោភ័ណ។ អាចឡើងតាមជណ្តើរ ២៤២ កាំ ឬជិះយានយន្តទៅកំពូល។', 'Along National Road 57 near Wat Ratan Sophon; reach the summit by the 242-step stairway or by moto/car.', '["https://cata.org.kh/en/tourism-maps/88-pailin-province","https://www.tourismcambodia.com/travelguides/provinces/pailin/what-to-see/280_phnom-yat.htm","https://www.travelfish.org/sight_profile/cambodia/western_cambodia/pailin/pailin/1078"]', '12.846013', '102.610204', '260' FROM provinces WHERE slug = 'pailin'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (slug, province_id, listing_type, category, name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status, open_hours, access_km, access_en, source_urls, lat, lng, views)
SELECT 'wat-preah-theat-thmor-da', id, 'attraction', 'history', 'ប្រាសាទវត្តព្រះធាតុថ្មដា', 'Wat Preah Theat Thmor Da Temple', 'តំបន់ប្រាសាទបុរាណនៅស្រុកអូររាំងឪ ដែលមានប្រាសាទព្រះធាតុ បឹង ទីសក្ការៈ និងសាលាមេរុមេនាសម័យអាណានិគម។', 'An ancient temple area in Ou Reang Ov district with Preah Theat temple, a pond, worship statues and a colonial-era hall.', NULL, NULL, 'unknown', NULL, 'ពីកំពង់ចាមតាមផ្លូវជាតិលេខ ៧ បន្តតាមផ្លូវជាតិលេខ ១១ ហើយតាមផ្លូវដីប្រហែល ៨ គីឡូម៉ែត្រ។ គួរប្រើម៉ូតូ ឬយានយន្តខ្ពស់ក្រោយភ្លៀង។', 'From Kampong Cham, take National Road 7 then National Road 11, followed by about 8 km on a dirt track; a motorbike or high-clearance vehicle is prudent after rain.', '["https://www.tourismcambodia.com/travelguides/provinces/tbong-khmum/what-to-see/130_wat-preah-theat-thmor-da-temple.htm","https://elevationmap.net/preah-theat-thma-da-preah-theat-ou-reang-kh-1003256169"]', '11.84012', '105.477764', '240' FROM provinces WHERE slug = 'tboung-khmum'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  image_url = VALUES(image_url),
  ticket_usd = VALUES(ticket_usd),
  ticket_status = VALUES(ticket_status),
  open_hours = VALUES(open_hours),
  access_km = VALUES(access_km),
  access_en = VALUES(access_en),
  source_urls = VALUES(source_urls),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

-- Expected upsert count: 42 places.
