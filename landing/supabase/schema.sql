-- Create a table for storing generation history
create type generation_status as enum ('processing', 'completed', 'failed');

create table public.generations (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  input_image_url text not null,
  glb_url text,
  usdz_url text,
  status generation_status not null default 'processing',
  created_at timestamp with time zone not null default now(),
  primary key (id)
);

-- Enable RLS
alter table public.generations enable row level security;

-- Policies
create policy "Users can view their own generations"
  on public.generations for select
  using (auth.uid() = user_id);

create policy "Users can insert their own generations"
  on public.generations for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own generations"
  on public.generations for update
  using (auth.uid() = user_id);

-- Storage bucket for uploads
insert into storage.buckets (id, name, public) 
values ('uploads', 'uploads', true)
on conflict (id) do nothing;

create policy "Users can upload their own images"
  on storage.objects for insert
  with check ( bucket_id = 'uploads' and auth.uid() = owner );

create policy "Public access to uploads"
  on storage.objects for select
  using ( bucket_id = 'uploads' );
