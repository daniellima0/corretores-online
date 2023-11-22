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