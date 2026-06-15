import Link from "next/link";
import { PRICING_TIERS } from "@/lib/constants";
import { formatZAR } from "@/lib/utils";

export default function PricingPreview() {
  return (
    <section className="section-padding bg-navy-900/30">
      <div className="container-max">
        <div className="text-center mb-14">
          <span className="badge bg-aqua-500/10 text-aqua-400 border border-aqua-500/20 mb-4">
            Transparent Pricing
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-3">
            Plans that fit your lifestyle
          </h2>
          <p className="text-white/50 mt-4 max-w-lg mx-auto">
            All plans include eco-certified sanitizing, deodorizing, and waste-free on-site cleaning.
            No lock-in contracts. Cancel anytime.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative glass-card p-6 flex flex-col gap-4 transition-all duration-300
                hover:scale-[1.02] hover:border-aqua-500/40
                ${tier.popular ? "border-aqua-500/40 shadow-lg shadow-aqua-500/10" : ""}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge bg-aqua-500 text-navy-950 font-bold px-4">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <h3 className="font-heading font-bold text-white text-xl">{tier.name}</h3>
                <p className="text-white/40 text-sm mt-1">{tier.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-heading font-bold text-3xl text-white">
                  {formatZAR(tier.price)}
                </span>
                <span className="text-white/40 text-sm">/{tier.period.replace("per ", "")}</span>
              </div>

              <p className="text-aqua-400 text-sm font-medium">{tier.frequency}</p>

              <ul className="space-y-2 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                    <svg className="w-4 h-4 text-mint-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l4 4 6-6" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/booking"
                className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200
                  ${tier.popular
                    ? "bg-aqua-500 hover:bg-aqua-400 text-navy-950 hover:shadow-lg hover:shadow-aqua-500/25"
                    : "border border-white/15 hover:border-aqua-400/50 text-white hover:bg-white/5"}`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/pricing" className="btn-ghost text-aqua-400 hover:text-aqua-300">
            View full pricing & commercial plans →
          </Link>
        </div>
      </div>
    </section>
  );
}
