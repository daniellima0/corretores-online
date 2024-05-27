drop table realtor_uf;

ALTER TABLE realtor
RENAME COLUMN uf TO uf_id;

ALTER TABLE realtor
ADD CONSTRAINT fk_realtor_uf
FOREIGN KEY (uf_id) REFERENCES uf_options(ufop_id);