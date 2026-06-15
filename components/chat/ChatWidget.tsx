"use client";

import { useState, useRef, useEffect } from "react";
import { BRAND } from "@/lib/constants";

type Message = { role: "user" | "assistant"; content: string };

const HINT_PROMPTS = [
  "What's included in the bi-weekly plan?",
  "Do you service my area?",
  "How do I book a one-off clean?",
  "What products do you use?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show "ask me anything" hint after 3s on first load
  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    setShowHint(false);

    const userMsg: Message = { role: "user", content: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: data.reply || "Sorry, something went wrong. Please try again or WhatsApp us.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `Sorry, I can't respond right now. Please WhatsApp us at ${BRAND.whatsapp} for immediate help.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96
                     glass-card shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
          style={{ maxHeight: "min(600px, calc(100vh - 120px))" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-aqua-600 to-aqua-700 px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" d="M2 10c0-4.418 3.134-8 7-8s7 3.582 7 8c0 1.33-.33 2.582-.914 3.673L16 14l-1.5-4.5A8 8 0 012 10z" />
                </svg>
              </div>
              <div>
                <p className="font-heading font-bold text-white text-sm">Safe Solution AI</p>
                <p className="text-white/70 text-xs">Ask me anything</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <AssistantAvatar />
                  <div className="glass-card px-4 py-3 text-sm text-white/80 leading-relaxed max-w-[80%]">
                    Hi! I&apos;m the Safe Solution AI. Ask me about our plans, service area, what products we use — anything. I can also help you start a booking. 🚿✨
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pl-8">
                  {HINT_PROMPTS.map((h) => (
                    <button
                      key={h}
                      onClick={() => sendMessage(h)}
                      className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-white/50
                                 hover:border-aqua-400/50 hover:text-aqua-400 transition-all"
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                {m.role === "assistant" && <AssistantAvatar />}
                <div
                  className={`px-4 py-3 rounded-xl text-sm leading-relaxed max-w-[80%] whitespace-pre-wrap
                    ${m.role === "user"
                      ? "bg-aqua-600 text-white ml-auto"
                      : "glass-card text-white/80"}`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2">
                <AssistantAvatar />
                <div className="glass-card px-4 py-3 flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-aqua-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 flex gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about pricing, booking, service area..."
              disabled={loading}
              className="input-field flex-1 text-xs py-2.5"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl bg-aqua-500 hover:bg-aqua-400 text-navy-950
                         flex items-center justify-center flex-shrink-0 transition-colors
                         disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 8h12M9 4l5 4-5 4" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* FAB */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2">
        {/* Hint bubble */}
        {showHint && !open && (
          <div className="glass-card px-4 py-2 text-sm text-white/70 max-w-[200px] text-right animate-fade-in">
            Ask me anything ✨
          </div>
        )}
        <button
          onClick={() => { setOpen((v) => !v); setShowHint(false); }}
          aria-label={open ? "Close AI chat" : "Open AI chat"}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center
                       transition-all duration-300 hover:scale-110 active:scale-95
                       ${open
                         ? "bg-navy-800 border border-white/20 text-white"
                         : "bg-aqua-500 text-navy-950 shadow-aqua-500/30 animate-pulse_slow"}`}
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 28 28" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" d="M4 18c0-7.18 4.477-13 10-13s10 5.82 10 13c0 2.03-.47 3.94-1.3 5.6L24 25l-2.2-6.3A12.8 12.8 0 014 18z" />
              <path strokeLinecap="round" d="M9 15h10M9 11h7" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

function AssistantAvatar() {
  return (
    <div className="w-7 h-7 rounded-full bg-aqua-600/30 border border-aqua-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
      <svg className="w-3.5 h-3.5 text-aqua-400" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" d="M2 8c0-3 2.239-5 5-5s5 2 5 5c0 .9-.23 1.75-.63 2.49L12 12l-1.5-3.3A5 5 0 012 8z" />
      </svg>
    </div>
  );
}
