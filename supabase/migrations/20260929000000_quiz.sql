-- Leads du quiz « diagnostic gratuit » (/commencer) et demandes d'échange (/commencer/plan).
-- Écriture uniquement côté serveur (clé service_role) : RLS activé, aucune policy publique.

create table if not exists public.quiz_leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  email           text not null,
  metier          text,
  taille          text,
  douleurs        text[] not null default '{}',
  blocage         text,
  ou              text,
  qui             text,
  outils          text[] not null default '{}',
  frequence       smallint,
  summary         text,
  priorities      jsonb,
  answers         jsonb not null,
  plan_email_sent boolean not null default false
);
create index if not exists quiz_leads_email_idx on public.quiz_leads (lower(email));
create index if not exists quiz_leads_created_at_idx on public.quiz_leads (created_at desc);
alter table public.quiz_leads enable row level security;

create table if not exists public.quiz_bookings (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  slot        text not null,
  slot_label  text not null,
  name        text not null,
  company     text not null,
  email       text not null,
  phone       text,
  summary     text,
  answers     jsonb
);
create index if not exists quiz_bookings_created_at_idx on public.quiz_bookings (created_at desc);
alter table public.quiz_bookings enable row level security;
