USE cambodia_tourism;

ALTER TABLE provinces
  ADD COLUMN banner_image_url VARCHAR(500) NULL AFTER name_en;

ALTER TABLE places
  MODIFY COLUMN image_url VARCHAR(500) NULL,
  ADD COLUMN ticket_url VARCHAR(500) NULL AFTER ticket_status,
  ADD COLUMN ticket_provider VARCHAR(160) NULL AFTER ticket_url;

CREATE TABLE IF NOT EXISTS admin_audit_log (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  admin_username VARCHAR(120) NOT NULL,
  entity_type ENUM('province', 'place') NOT NULL,
  entity_slug VARCHAR(120) NOT NULL,
  changed_fields JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_admin_audit_entity (entity_type, entity_slug),
  KEY idx_admin_audit_created (created_at)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
