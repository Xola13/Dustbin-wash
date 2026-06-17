import { getSupabaseAdmin } from "@/lib/supabase";

const VALID_STATUSES = ["pending", "confirmed", "completed", "cancelled"];

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    if (!VALID_STATUSES.includes(status)) {
      return Response.json({ error: "Invalid status" }, { status: 400 });
    }

    const { data, error } = await getSupabaseAdmin()
      .from("bookings")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ booking: data });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
