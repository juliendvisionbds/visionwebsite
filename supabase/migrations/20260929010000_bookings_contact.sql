-- Réservations depuis la page /contact : message libre + page d'origine.
alter table public.quiz_bookings add column if not exists message text;
alter table public.quiz_bookings add column if not exists source text not null default 'plan';
