--Migration: 202311220031_schema
CREATE TABLE public.auth_status (
	aust_id uuid NOT NULL,
	"type" varchar NOT NULL,
	CONSTRAINT auth_status_pkey PRIMARY KEY (aust_id)
);

CREATE TABLE public.regions_used (
	reus_id uuid NOT NULL,
	region varchar NOT NULL,
	CONSTRAINT regions_used_pkey PRIMARY KEY (reus_id)
);

CREATE TABLE public.contact_options (
	coop_id uuid NOT NULL,
	"type" varchar NOT NULL,
	CONSTRAINT contact_options_pkey PRIMARY KEY (coop_id)
);

CREATE TABLE public."user" (
	user_id uuid NOT NULL,
	aust_id uuid NOT NULL,
	"name" varchar NOT NULL,
	cpf varchar NOT NULL,
	email varchar NOT NULL,
	"password" varchar NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	deleted_by uuid NULL,
	date_of_birth date NOT NULL,
	telephone jsonb NOT NULL,
	CONSTRAINT user_pkey PRIMARY KEY (user_id),
	CONSTRAINT user_aust_id_fkey FOREIGN KEY (aust_id) REFERENCES public.auth_status(aust_id)
);

CREATE TABLE public.realtor (
	real_id uuid NOT NULL,
	user_id uuid NOT NULL,
	creci varchar NOT NULL,
	description varchar NULL,
	is_online bool NOT NULL,
	CONSTRAINT realtor_pkey PRIMARY KEY (real_id),
	CONSTRAINT realtor_user_id_key UNIQUE (user_id),
	CONSTRAINT realtor_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id)
);

CREATE TABLE public.realtor_regions (
	rere_id uuid NOT NULL,
	reus_id uuid NOT NULL,
	real_id uuid NOT NULL,
	CONSTRAINT realtor_regions_pkey PRIMARY KEY (rere_id),
	CONSTRAINT realtor_regions_real_id_fkey FOREIGN KEY (real_id) REFERENCES public.realtor(real_id),
	CONSTRAINT realtor_regions_reus_id_fkey FOREIGN KEY (reus_id) REFERENCES public.regions_used(reus_id)
);

CREATE TABLE public.realtor_location (
	relo_id uuid NOT NULL,
	real_id uuid NOT NULL,
	latitude numeric(10, 6) NULL,
	longitude numeric(10, 6) NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT realtor_location_pkey PRIMARY KEY (relo_id),
	CONSTRAINT realtor_location_real_id_fkey FOREIGN KEY (real_id) REFERENCES public.realtor(real_id)
);

CREATE TABLE public.socials_options (
	soop_id uuid NOT NULL,
	coop_id uuid NOT NULL,
	icon varchar NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT socials_options_pkey PRIMARY KEY (soop_id),
	CONSTRAINT socials_options_coop_id_fkey FOREIGN KEY (coop_id) REFERENCES public.contact_options(coop_id)
);

CREATE TABLE public.socials_realtor (
	soci_id uuid NOT NULL,
	soop_id uuid NOT NULL,
	real_id uuid NOT NULL,
	contact_info varchar NOT NULL,
	CONSTRAINT socials_realtor_pkey PRIMARY KEY (soci_id),
	CONSTRAINT socials_realtor_real_id_fkey FOREIGN KEY (real_id) REFERENCES public.realtor(real_id),
	CONSTRAINT socials_realtor_soop_id_fkey FOREIGN KEY (soop_id) REFERENCES public.socials_options(soop_id)
);

-- Migration: 202311230837_add_safety_questions
create table safety_questions (
	saqu_id UUID primary key,
	question VARCHAR unique not null
);

create table safety_questions_user (
	squu_id UUID primary key,
	saqu_id UUID references safety_questions(saqu_id) not null,
	user_id UUID references "user"(user_id) not null,
	answer VARCHAR not null
);

--Migration: 202312051540_remove_deleted_by_user
ALTER TABLE "user" DROP COLUMN IF EXISTS deleted_by;

--Migration: 202312080232_add_unique_constraint_real_id_realtor_location
ALTER TABLE realtor_location
ADD CONSTRAINT unique_real_id UNIQUE (real_id);

ALTER TABLE realtor_location
DROP COLUMN created_at;

--Migration: 202312082111_add_unique_constraint_region
ALTER TABLE regions_used
ADD CONSTRAINT unique_regions
UNIQUE (region);

--Migration: 202312090354_add_new_constraints
ALTER TABLE "user"
ADD CONSTRAINT unique_email UNIQUE (email);

ALTER TABLE realtor
ADD COLUMN avatar VARCHAR(255);

--Migration: 202312111514_major_database_changes
drop table if exists regions_used, realtor_regions; 

ALTER TABLE realtor
ADD COLUMN regions VARCHAR(255);

drop table if exists contact_options, socials_options, socials_realtor; 

alter table realtor 
add column realtor_instagram VARCHAR(255);

alter table realtor 
add column realtor_facebook VARCHAR(255);

alter table realtor 
add column realtor_whatsapp VARCHAR(255);

--Migration: 202312120027_add_uf_options_and_unique_creci_uf_constraint
alter table realtor add column UF uuid not null;

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

--Migration: 202312121107_drop_relational_table_realtor_uf_and_add_foreign_key_to_uf_options
drop table realtor_uf;

ALTER TABLE realtor
RENAME COLUMN uf TO uf_id;

ALTER TABLE realtor
ADD CONSTRAINT fk_realtor_uf
FOREIGN KEY (uf_id) REFERENCES uf_options(ufop_id);

--Migration: 202312121211_add_unique_constraint_to_uf
alter table uf_options add constraint unique_uf unique(uf);

--Migration: 202312122200_rename_column_uf_id_on_realtor_table
alter table realtor rename column uf_id to ufop_id;

--Migration: 202406041546_removal_safety_questions
drop table safety_questions_user;
drop table safety_questions;

--Seed: 202406031535_authStatusInsert
insert into auth_status (aust_id, "type") values ('de83fab0-e435-4ed1-976b-6ee6a3fea310', 'realtor'),
('14fced63-064e-45f9-9ee6-864e3526961a','user');