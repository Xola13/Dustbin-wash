import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error(
        "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
      );
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export type Booking = {
  id?: string;
  created_at?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  suburb: string;
  bin_count: number;
  bin_types: string[];
  plan_id: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
  status?: "pending" | "confirmed" | "completed" | "cancelled";
};

export type ContactMessage = {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status?: "new" | "read" | "replied";
};
