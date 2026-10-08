USE cambodia_tourism;

ALTER TABLE places
  ADD COLUMN business_type ENUM('hotel', 'guest_house', 'restaurant', 'cafe', 'other') NULL AFTER listing_type,
  ADD COLUMN publication_status ENUM('draft', 'published', 'paused') NOT NULL DEFAULT 'published' AFTER business_type,
  ADD KEY idx_place_publication_status (publication_status, province_id, listing_type);

ALTER TABLE places
  ALTER COLUMN publication_status SET DEFAULT 'draft';
