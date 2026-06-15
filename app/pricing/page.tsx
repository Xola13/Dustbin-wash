"use client";

import { useState } from "react";
import Link from "next/link";
import { PRICING_TIERS, COMMERCIAL_TIERS } from "@/lib/constants";
import { formatZAR } from "@/lib/utils";

export default function PricingPage() {
  const [tab, setTab] = useState<"residential" | "commercial">("residential");

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 section-padding bg-gradient-hero">
        <div className="container-max text-center">
          <span className="badge bg-aqua-500/10 text-aqua-400 border border-aqua-500/20 mb-4">
            Transparent Pricing
          </span>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mt-3 mb-4">
            Simple, honest pricing
          </h1>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            No hidden fees. No lock-in contracts. Just a spotless bin.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center rounded-xl bg-white/5 border border-white/10 p-1">
            {(["residential", "commercial"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200
                  ${tab === t
                    ? "bg-aqua-500 text-navy-950 shadow-lg shadow-aqua-500/25"
                    : "text-white/50 hover:text-white"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding pt-0">
        <div className="container-max">
          {tab === "residential" ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {PRICING_TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    className={`relative glass-card p-7 flex flex-col gap-5 transition-all duration-300
                      hover:scale-[1.02]
                      ${tier.popular ? "border-aqua-500/50 shadow-xl shadow-aqua-500/10" : "hover:border-aqua-500/30"}`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="badge bg-aqua-500 text-navy-950 font-bold px-4 py-1">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div>
                      <h2 className="font-heading font-bold text-2xl text-white">{tier.name}</h2>
                      <p className="text-white/40 text-sm mt-1">{tier.frequency}</p>
                    </div>

                    <div className="flex items-baseline gap-1 border-b border-white/5 pb-5">
                      <span className="font-heading font-bold text-4xl text-white">
                        {formatZAR(tier.price)}
                      </span>
                      <span className="text-white/40 text-sm">/{tier.period.replace("per ", "")}</span>
                    </div>

                    <ul className="space-y-3 flex-1">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-white/60">
                          <svg className="w-4 h-4 text-mint-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l4 4 6-6" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/booking?plan=${tier.id}`}
                      className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200
                        ${tier.popular
                          ? "bg-aqua-500 hover:bg-aqua-400 text-navy-950 hover:shadow-lg hover:shadow-aqua-500/25"
                          : "border border-white/15 hover:border-aqua-400/50 text-white hover:bg-white/5"}`}
                    >
                      Choose {tier.name}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Add-ons */}
              <div className="glass-card p-6 max-w-2xl mx-auto text-center">
                <h3 className="font-heading font-semibold text-white mb-2">Additional bins?</h3>
                <p className="text-white/50 text-sm">
                  Add extra bins to any plan for just{" "}
                  <strong className="text-aqua-400">R79 per bin per clean</strong>.
                  Add them during checkout or contact us to update your plan.
                </p>
              </div>
            </>
          ) : (
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {COMMERCIAL_TIERS.map((tier) => (
                <div key={tier.id} className="glass-card p-7 flex flex-col gap-5 hover:border-aqua-500/30 transition-all hover:scale-[1.02]">
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-white">{tier.name}</h2>
                    <p className="text-white/40 text-sm mt-1">{tier.bins} · {tier.frequency}</p>
                  </div>
                  <div className="flex items-baseline gap-1 border-b border-white/5 pb-5">
                    <span className="font-heading font-bold text-4xl text-white">
                      {formatZAR(tier.price)}
                    </span>
                    <span className="text-white/40 text-sm">/month</span>
                  </div>
                  <Link
                    href={`/contact?plan=${tier.id}`}
                    className="w-full text-center py-3 rounded-xl border border-white/15 hover:border-aqua-400/50 text-white font-semibold text-sm hover:bg-white/5 transition-all"
                  >
                    Get a Quote
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Comparison table */}
      <section className="section-padding pt-0 pb-20">
        <div className="container-max">
          <h2 className="font-heading font-bold text-2xl text-white mb-6">What&apos;s included in every plan</h2>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/50 font-medium">Feature</th>
                  <th className="p-4 text-center text-white/50 font-medium">One-Off</th>
                  <th className="p-4 text-center text-white/50 font-medium">Monthly</th>
                  <th className="p-4 text-center text-aqua-400 font-semibold">Bi-Weekly</th>
                  <th className="p-4 text-center text-white/50 font-medium">Weekly</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Hot-water pressure wash", true, true, true, true],
                  ["Eco-certified sanitizer", true, true, true, true],
                  ["Deodorizing treatment", true, true, true, true],
                  ["On-site service (bin stays put)", true, true, true, true],
                  ["Wastewater removed responsibly", true, true, true, true],
                  ["Digital wash report", false, false, true, true],
                  ["Priority scheduling", false, false, true, true],
                  ["Free bin exterior wipe-down", false, true, true, true],
                ].map(([label, ...vals]) => (
                  <tr key={String(label)} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="p-4 text-white/70">{label}</td>
                    {vals.map((v, i) => (
                      <td key={i} className="p-4 text-center">
                        {v ? (
                          <svg className="w-5 h-5 text-mint-400 mx-auto" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l4 4 6-6" />
                          </svg>
                        ) : (
                          <span className="text-white/20">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
