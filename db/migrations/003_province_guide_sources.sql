USE cambodia_tourism;

ALTER TABLE province_guides
  ADD COLUMN source_urls TEXT NULL AFTER food_guide_en;
