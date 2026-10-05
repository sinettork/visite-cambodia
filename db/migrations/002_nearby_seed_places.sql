USE cambodia_tourism;

INSERT INTO places (
  slug, province_id, listing_type, category, name_km, name_en,
  summary_km, summary_en, lat, lng, views
)
SELECT
  'angkor-thom', id, 'attraction', 'history', 'អង្គរធំ', 'Angkor Thom',
  'រាជធានីបុរាណនៃអាណាចក្រខ្មែរ ដែលមានប្រាសាទបាយ័ននៅកណ្ដាល។',
  'The ancient Khmer capital, with Bayon Temple at its centre.',
  13.4413, 103.8593, 90
FROM provinces WHERE slug = 'siem-reap'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);

INSERT INTO places (
  slug, province_id, listing_type, category, name_km, name_en,
  summary_km, summary_en, lat, lng, views
)
SELECT
  'wat-phnom', id, 'attraction', 'culture', 'វត្តភ្នំ', 'Wat Phnom',
  'វត្តប្រវត្តិសាស្ត្រនៅលើភ្នំកណ្ដាលរាជធានីភ្នំពេញ។',
  'A historic hilltop pagoda in central Phnom Penh.',
  11.5763, 104.9230, 75
FROM provinces WHERE slug = 'phnom-penh'
ON DUPLICATE KEY UPDATE
  listing_type = VALUES(listing_type),
  category = VALUES(category),
  name_km = VALUES(name_km),
  name_en = VALUES(name_en),
  summary_km = VALUES(summary_km),
  summary_en = VALUES(summary_en),
  lat = VALUES(lat),
  lng = VALUES(lng),
  views = VALUES(views);
