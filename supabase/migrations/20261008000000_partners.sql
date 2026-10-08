-- Programme partenaires (prescripteurs) : candidatures depuis /devenir-partenaire,
-- recommandations et contrats rattachés, suivis dans admin.visionbds.com et partenaires.visionbds.com.
-- Lecture et écriture uniquement côté serveur (clé service_role) : RLS activé, aucune policy publique.

create table if not exists public.partners (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  status          text not null default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  name            text not null,
  email           text not null unique check (email = lower(email)),
  phone           text,
  company         text,
  profile         text,
  network         text,
  commission_rate numeric(5,2) not null default 15 check (commission_rate >= 0 and commission_rate <= 100),
  decided_at      timestamptz,
  welcome_sent_at timestamptz,
  last_login_at   timestamptz,
  todo_done       text[] not null default '{}',
  notes           text
);
create index if not exists partners_status_idx on public.partners (status, created_at desc);
alter table public.partners enable row level security;

-- Une entreprise recommandée par un partenaire (déclarée par lui ou saisie par l'équipe).
create table if not exists public.partner_referrals (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  partner_id    uuid not null references public.partners (id) on delete cascade,
  company       text not null,
  contact_name  text,
  contact_email text,
  contact_phone text,
  note          text,
  status        text not null default 'new' check (status in ('new', 'call', 'signed', 'lost')),
  source        text not null default 'partner' check (source in ('partner', 'admin'))
);
create index if not exists partner_referrals_partner_idx on public.partner_referrals (partner_id, created_at desc);
alter table public.partner_referrals enable row level security;

-- Un contrat signé grâce à un partenaire. Le taux est figé sur le contrat au moment de la saisie.
create table if not exists public.partner_contracts (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  partner_id         uuid not null references public.partners (id) on delete restrict,
  referral_id        uuid references public.partner_referrals (id) on delete set null,
  client             text not null,
  title              text,
  amount_ht          numeric(12,2) not null check (amount_ht >= 0),
  signed_at          date not null,
  commission_rate    numeric(5,2) not null check (commission_rate >= 0 and commission_rate <= 100),
  commission_amount  numeric(12,2) generated always as (round(amount_ht * commission_rate / 100, 2)) stored,
  commission_paid_at date
);
create index if not exists partner_contracts_partner_idx on public.partner_contracts (partner_id, signed_at desc);
alter table public.partner_contracts enable row level security;
