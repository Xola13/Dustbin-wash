-- ──────────────────────────────────────────────────────────────────────────────
-- Safe Solution — Supabase Schema
-- Run this in your Supabase SQL editor: https://app.supabase.com
-- ──────────────────────────────────────────────────────────────────────────────

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Service Areas ─────────────────────────────────────────────────────────────
create table if not exists service_areas (
  id          uuid primary key default uuid_generate_v4(),
  suburb      text not null unique,
  city        text not null default 'Cape Town',
  active      boolean not null default true,
  created_at  timestamptz default now()
);

-- ── Pricing Tiers ─────────────────────────────────────────────────────────────
create table if not exists pricing_tiers (
  id             uuid primary key default uuid_generate_v4(),
  slug           text not null unique,   -- 'weekly', 'biweekly', 'monthly', 'oneoff'
  name           text not null,
  price_zar      integer not null,       -- price in cents
  period         text not null,
  frequency      text not null,
  features       text[] not null default '{}',
  is_popular     boolean not null default false,
  is_commercial  boolean not null default false,
  active         boolean not null default true,
  created_at     timestamptz default now()
);

-- ── Customers ─────────────────────────────────────────────────────────────────
create table if not exists customers (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text not null unique,
  phone       text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── Bookings ──────────────────────────────────────────────────────────────────
create table if not exists bookings (
  id               uuid primary key default uuid_generate_v4(),
  created_at       timestamptz default now(),
  customer_name    text not null,
  customer_email   text not null,
  customer_phone   text not null,
  address          text not null,
  suburb           text not null,
  bin_count        integer not null default 1,
  bin_types        text[] not null default '{"General Waste"}',
  plan_id          text not null,
  preferred_date   date not null,
  preferred_time   text not null,
  notes            text,
  status           text not null default 'pending'
                   check (status in ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- ── Contact Messages ──────────────────────────────────────────────────────────
create table if not exists contact_messages (
  id          uuid primary key default uuid_generate_v4(),
  created_at  timestamptz default now(),
  name        text not null,
  email       text not null,
  phone       text,
  message     text not null,
  status      text not null default 'new'
              check (status in ('new', 'read', 'replied'))
);

-- ── Subscriptions ─────────────────────────────────────────────────────────────
create table if not exists subscriptions (
  id              uuid primary key default uuid_generate_v4(),
  created_at      timestamptz default now(),
  customer_email  text not null,
  customer_name   text not null,
  suburb          text not null,
  address         text not null,
  plan_id         text not null,
  bin_count       integer not null default 1,
  bin_types       text[] not null default '{"General Waste"}',
  status          text not null default 'active'
                  check (status in ('active', 'paused', 'cancelled')),
  payfast_token   text,                 -- populated after PayFast integration
  next_wash_date  date,
  updated_at      timestamptz default now()
);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Enable RLS (anyone can insert bookings / contact messages via the anon key,
-- but only authenticated service-role can read/update them)

alter table bookings enable row level security;
alter table contact_messages enable row level security;
alter table subscriptions enable row level security;
alter table customers enable row level security;

-- Allow anonymous inserts (booking form, contact form)
create policy "Anyone can create a booking"
  on bookings for insert to anon with check (true);

create policy "Anyone can create a contact message"
  on contact_messages for insert to anon with check (true);

-- Service role / authenticated admins can read everything
create policy "Service role reads all bookings"
  on bookings for select using (auth.role() = 'service_role');

create policy "Service role reads all messages"
  on contact_messages for select using (auth.role() = 'service_role');

-- Public reads for pricing and service areas
create policy "Anyone reads service areas"
  on service_areas for select using (true);

create policy "Anyone reads pricing tiers"
  on pricing_tiers for select using (true);
