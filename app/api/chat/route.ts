import Groq from "groq-sdk";
import { AI_SYSTEM_PROMPT } from "@/lib/constants";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Invalid messages" }, { status: 400 });
    }

    const sanitized = messages.map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: String(m.content).slice(0, 2000),
    }));

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 512,
      messages: [
        { role: "system", content: AI_SYSTEM_PROMPT },
        ...sanitized,
      ],
    });

    const text = response.choices[0]?.message?.content ?? "";

    return Response.json({ reply: text });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
