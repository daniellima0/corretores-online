alter table realtor add column UF uuid not null

CREATE TABLE uf_options (
  ufop_id UUID PRIMARY KEY,
  uf VARCHAR(2) NOT NULL
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO uf_options (ufop_id, uf) VALUES
  (uuid_generate_v4(), 'AC'),
  (uuid_generate_v4(), 'AL'),
  (uuid_generate_v4(), 'AP'),
  (uuid_generate_v4(), 'AM'),
  (uuid_generate_v4(), 'BA'),
  (uuid_generate_v4(), 'CE'),
  (uuid_generate_v4(), 'DF'),
  (uuid_generate_v4(), 'ES'),
  (uuid_generate_v4(), 'GO'),
  (uuid_generate_v4(), 'MA'),
  (uuid_generate_v4(), 'MT'),
  (uuid_generate_v4(), 'MS'),
  (uuid_generate_v4(), 'MG'),
  (uuid_generate_v4(), 'PA'),
  (uuid_generate_v4(), 'PB'),
  (uuid_generate_v4(), 'PR'),
  (uuid_generate_v4(), 'PE'),
  (uuid_generate_v4(), 'PI'),
  (uuid_generate_v4(), 'RJ'),
  (uuid_generate_v4(), 'RN'),
  (uuid_generate_v4(), 'RS'),
  (uuid_generate_v4(), 'RO'),
  (uuid_generate_v4(), 'RR'),
  (uuid_generate_v4(), 'SC'),
  (uuid_generate_v4(), 'SP'),
  (uuid_generate_v4(), 'SE'),
  (uuid_generate_v4(), 'TO');
 
 CREATE TABLE realtor_uf (
  reuf_id UUID PRIMARY KEY,
  ufop_id UUID REFERENCES uf_options(ufop_id) NOT NULL,
  real_id UUID REFERENCES realtor(real_id) NOT NULL
);

ALTER TABLE realtor
ADD CONSTRAINT unique_creci_uf_constraint
UNIQUE (creci, uf);