create table public.password_reset_code (
 pwrc_id uuid not null,
 user_id uuid not null,
 code varchar not null,
 created_at timestamptz not null default now(),
 constraint password_reset_code_pkey primary key (pwrc_id),
 constraint password_reset_code_user_id_fkey foreign key (user_id) references public."user"(user_id)
)