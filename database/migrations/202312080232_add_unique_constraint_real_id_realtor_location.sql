ALTER TABLE realtor_location
ADD CONSTRAINT unique_real_id UNIQUE (real_id);

ALTER TABLE realtor_location
DROP COLUMN created_at;