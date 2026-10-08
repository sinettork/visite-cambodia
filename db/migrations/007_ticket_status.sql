USE cambodia_tourism;

ALTER TABLE places
  ADD COLUMN ticket_status ENUM('free','unknown','check') NULL AFTER ticket_usd;

-- Existing numeric prices are retained but must be checked against the current source.
UPDATE places
SET ticket_status = CASE
  WHEN ticket_usd IS NULL THEN 'unknown'
  ELSE 'check'
END
WHERE ticket_status IS NULL;

-- Mark a place as free only when its editorial record explicitly verifies that claim.
UPDATE places
SET ticket_status = 'free'
WHERE slug = 'la-plantation-pepper-farm';
