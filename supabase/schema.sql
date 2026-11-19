-- Jalankan di Supabase -> SQL Editor
create table if not exists public.messages (
  id text primary key,
  session_id text not null,
  sender text not null check (sender in ('user', 'bot')),
  text text not null,
  created_at bigint not null
);

create index if not exists idx_messages_session_created
  on public.messages (session_id, created_at);

-- RLS aktif tanpa policy: anon key tidak bisa akses.
-- Server pakai service_role key yang bypass RLS.
alter table public.messages enable row level security;
