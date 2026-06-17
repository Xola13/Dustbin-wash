import { getSupabaseAdmin } from "@/lib/supabase";
import type { ContactMessage } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body: ContactMessage = await req.json();

    const { data, error } = await getSupabaseAdmin()
      .from("contact_messages")
      .insert([{ ...body, status: "new" }])
      .select()
      .single();

    if (error) {
      console.error("Supabase contact error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ message: data }, { status: 201 });
  } catch (err) {
    console.error("Contact route error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
