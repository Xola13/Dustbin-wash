"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 section-padding bg-gradient-hero">
        <div className="container-max text-center max-w-2xl mx-auto">
          <span className="badge bg-aqua-500/10 text-aqua-400 border border-aqua-500/20 mb-4">
            Get in Touch
          </span>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mt-3 mb-4">
            We&apos;d love to hear from you
          </h1>
          <p className="text-white/50">
            Have a question, a custom quote request, or just want to say hi? We typically respond within 2 hours.
          </p>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact info */}
            <div className="space-y-6">
              <h2 className="font-heading font-bold text-2xl text-white">Contact details</h2>

              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" d="M2 6.5c0 7.456 6.044 13.5 13.5 13.5H17a1.5 1.5 0 001.5-1.5v-1.94a1.5 1.5 0 00-1.108-1.449l-2.757-.69a1.5 1.5 0 00-1.636.74L12.26 16a11.65 11.65 0 01-5.26-5.26l1.339-.739a1.5 1.5 0 00.74-1.636l-.69-2.757A1.5 1.5 0 006.94 4H5a1.5 1.5 0 00-1.5 1.5L3.5 6.5z" />
                    </svg>
                  ),
                  label: "Phone",
                  value: BRAND.phone,
                  href: `tel:${BRAND.phone}`,
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" d="M2.5 5.5A2.5 2.5 0 015 3h10a2.5 2.5 0 012.5 2.5v9A2.5 2.5 0 0115 17H5a2.5 2.5 0 01-2.5-2.5v-9z" />
                      <path strokeLinecap="round" d="M3 6l7 5 7-5" />
                    </svg>
                  ),
                  label: "Email",
                  value: BRAND.email,
                  href: `mailto:${BRAND.email}`,
                },
              ].map((c) => (
                <div key={c.label} className="glass-card p-5 flex gap-4 items-center hover:border-aqua-500/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-aqua-500/10 flex items-center justify-center text-aqua-400 flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-white/40 text-xs">{c.label}</p>
                    <a href={c.href} className="text-white font-medium hover:text-aqua-400 transition-colors text-sm">
                      {c.value}
                    </a>
                  </div>
                </div>
              ))}

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi Safe Solution! I'd like to find out more about your bin washing service.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card p-5 hover:border-mint-500/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-mint-500/10 flex items-center justify-center text-mint-400 flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.399 5.605L0 24l6.545-1.371A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.032-1.386l-.361-.214-3.735.982.999-3.645-.235-.374A9.818 9.818 0 1112 21.818z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/40 text-xs">WhatsApp (fastest response)</p>
                  <p className="text-white font-medium text-sm group-hover:text-mint-400 transition-colors">
                    Chat with us on WhatsApp →
                  </p>
                </div>
              </a>

              {/* Google Maps embed */}
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/30" style={{ minHeight: 220 }}>
                <iframe
                  src="https://maps.google.com/maps?q=Crossroads,+Cape+Town,+South+Africa&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Safe Solution — Crossroads, Cape Town"
                />
              </div>
            </div>

            {/* Form */}
            <div className="glass-card p-6 sm:p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-mint-500/20 border-2 border-mint-500/40 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-mint-400" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 16l8 8 12-12" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white mb-2">Message sent!</h3>
                  <p className="text-white/50">We&apos;ll get back to you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="font-heading font-bold text-2xl text-white mb-6">Send us a message</h2>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Your name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Jane Smith"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Email address *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="jane@example.com"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Phone (optional)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+27 XX XXX XXXX"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Message *</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="How can we help?"
                      rows={5}
                      className="input-field resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      {error}
                    </p>
                  )}

                  <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
