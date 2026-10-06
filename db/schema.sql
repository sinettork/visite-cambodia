CREATE DATABASE IF NOT EXISTS cambodia_tourism CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cambodia_tourism;

CREATE TABLE provinces (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(80) NOT NULL UNIQUE,
  name_km VARCHAR(120) NOT NULL,
  name_en VARCHAR(120) NOT NULL
);

CREATE TABLE places (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(120) NOT NULL UNIQUE,
  province_id INT NOT NULL,
  category ENUM('history','nature','beach','adventure','culture','food') NOT NULL,
  name_km VARCHAR(160) NOT NULL,
  name_en VARCHAR(160) NOT NULL,
  summary_km TEXT,
  summary_en TEXT,
  image_url VARCHAR(255),
  ticket_usd DECIMAL(6,2) NULL,
  ticket_status ENUM('free','unknown','check') NULL,
  open_hours VARCHAR(80) NULL,
  access_km TEXT NULL,
  access_en TEXT NULL,
  source_urls TEXT NULL,
  lat DECIMAL(9,6) NULL,
  lng DECIMAL(9,6) NULL,
  views INT NOT NULL DEFAULT 0,
  FOREIGN KEY (province_id) REFERENCES provinces(id),
  KEY idx_category (category)
);

-- SAMPLE DATA: verify every price, hour and coordinate before launch.
INSERT INTO provinces (slug, name_km, name_en) VALUES
 ('siem-reap','សៀមរាប','Siem Reap'),('phnom-penh','ភ្នំពេញ','Phnom Penh'),
 ('kampot','កំពត','Kampot'),('kep','កែប','Kep'),
 ('preah-sihanouk','ព្រះសីហនុ','Sihanoukville'),('ratanakiri','រតនគិរី','Ratanakiri');

INSERT INTO places (slug, province_id, category, name_km, name_en, summary_km, summary_en, ticket_usd, ticket_status, open_hours, lat, lng, views) VALUES
 ('angkor-wat',1,'history','ប្រាសាទអង្គរវត្ត','Angkor Wat','ប្រាសាទដ៏ធំបំផុតនៅលើពិភពលោក។','The largest religious monument in the world.',37,'check','05:00-17:30',13.4125,103.8670,100),
 ('royal-palace',2,'culture','រាជវាំង','Royal Palace','ដំណាក់ព្រះមហាក្សត្រនៅរាជធានីភ្នំពេញ។','The royal residence in the capital.',10,'check','08:00-17:00',11.5636,104.9314,80),
 ('bokor-national-park',3,'nature','ឧទ្យានជាតិបូកគោ','Bokor National Park','ភ្នំខ្ពស់ដែលមានអាកាសធាតុត្រជាក់។','A cool hill station with old colonial ruins.',NULL,'unknown',NULL,10.6200,104.0500,60),
 ('kep-crab-market',4,'food','ផ្សារក្តាមកែប','Kep Crab Market','ក្តាមស្រស់ចម្អិនជាមួយម្រេចកំពត។','Fresh crab cooked with Kampot pepper.',NULL,'unknown','07:00-18:00',10.4833,104.3167,50),
 ('koh-rong',5,'beach','កោះរ៉ុង','Koh Rong','កោះខ្សាច់ស និងទឹកថ្លា។','Island beaches with clear water.',NULL,'unknown',NULL,10.7000,103.2800,70),
 ('yeak-laom-lake',6,'nature','បឹងយក្សឡោម','Yeak Laom Lake','បឹងភ្នំភ្លើងដ៏ស្អាត។','A volcanic crater lake in the forest.',5,'check','07:00-17:00',13.9000,106.9800,40);
