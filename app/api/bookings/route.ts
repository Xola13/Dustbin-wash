import { supabase } from "@/lib/supabase";
import type { Booking } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body: Booking = await req.json();

    const { data, error } = await supabase
      .from("bookings")
      .insert([{ ...body, status: "pending" }])
      .select()
      .single();

    if (error) {
      console.error("Supabase booking error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ booking: data }, { status: 201 });
  } catch (err) {
    console.error("Booking route error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ bookings: data });
}
