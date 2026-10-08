USE cambodia_tourism;

CREATE TABLE IF NOT EXISTS admin_accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(254) NOT NULL UNIQUE,
  display_name VARCHAR(120) NOT NULL,
  password_hash VARCHAR(161) NOT NULL,
  admin_role ENUM('admin', 'editor') NOT NULL DEFAULT 'editor',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  session_version INT UNSIGNED NOT NULL DEFAULT 1,
  created_by VARCHAR(254) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_admin_accounts_active (is_active, admin_role)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_security_log (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  admin_username VARCHAR(254) NOT NULL,
  action VARCHAR(40) NOT NULL,
  target_email VARCHAR(254) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_admin_security_log_created (created_at)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
