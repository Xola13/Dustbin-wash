import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "The story behind Safe Solution — Cape Town's premium bin washing service.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-20 section-padding bg-gradient-hero">
        <div className="container-max max-w-3xl mx-auto text-center">
          <span className="badge bg-aqua-500/10 text-aqua-400 border border-aqua-500/20 mb-4">
            Our Story
          </span>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mt-3 mb-6">
            Hygiene meets purpose
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            We started Safe Solution because we were tired of the same problem everyone has but
            nobody talks about: the bin. Smelly, grimy, and frankly a health hazard — yet it sits
            outside your home where your kids and pets play.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-6">
                Why we do this
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  A dirty wheelie bin isn&apos;t just unpleasant — it&apos;s a breeding ground for
                  bacteria, flies, and disease. For households with young children, pets, and
                  elderly family members, this matters more than most people realize.
                </p>
                <p>
                  We built Safe Solution around a simple belief: premium hygiene shouldn&apos;t
                  require premium effort from you. Book once, we handle it. Same crew, same
                  high standard, every time.
                </p>
                <p>
                  We&apos;re also deeply committed to doing this responsibly. Every drop of
                  wastewater we generate is captured and disposed of at an approved facility.
                  Our sanitizing products are biodegradable and certified eco-safe.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { val: "2019", label: "Founded in Cape Town" },
                { val: "12K+", label: "Bins cleaned to date" },
                { val: "100%", label: "Wastewater captured" },
                { val: "98%", label: "Customer satisfaction" },
              ].map((s) => (
                <div key={s.label} className="glass-card p-6 text-center">
                  <div className="font-heading font-bold text-3xl gradient-text mb-1">{s.val}</div>
                  <p className="text-white/50 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-navy-900/30">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
              The people behind the clean
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                name: "[EDIT ME: Founder Name]",
                role: "Founder & CEO",
                bio: "Cape Town native with a background in hospitality and a mild obsession with cleanliness.",
              },
              {
                name: "[EDIT ME: Ops Lead Name]",
                role: "Operations Lead",
                bio: "Keeps the trucks on time, the products stocked, and the team motivated.",
              },
              {
                name: "[EDIT ME: Head Tech Name]",
                role: "Head Technician",
                bio: "The person with the pressure washer. 5 years of bin-cleaning expertise.",
              },
            ].map((t) => (
              <div key={t.name} className="glass-card p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-aqua-600 to-mint-500 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.5}>
                    <circle cx="16" cy="12" r="5" />
                    <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-white">{t.name}</h3>
                <p className="text-aqua-400 text-sm mb-2">{t.role}</p>
                <p className="text-white/50 text-sm leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="section-padding">
        <div className="container-max max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-8 text-center">
            Our sustainability commitments
          </h2>
          <div className="space-y-4">
            {[
              { icon: "🌿", title: "Eco-certified products", body: "All our sanitizing and deodorizing agents are biodegradable and certified safe for pets, children, and waterways." },
              { icon: "💧", title: "Zero wastewater discharge", body: "Every drop of contaminated water is captured on-site and disposed of at an approved treatment facility." },
              { icon: "🔋", title: "Efficient operations", body: "Our route planning minimizes fuel consumption. We're exploring electric vehicle adoption for our fleet by 2026." },
              { icon: "📦", title: "Minimal plastic", body: "Our chemical concentrates reduce packaging waste versus single-use cleaning products by up to 80%." },
            ].map((c) => (
              <div key={c.title} className="glass-card p-5 flex gap-4 hover:border-aqua-500/20 transition-all">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <h3 className="font-heading font-semibold text-white mb-1">{c.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pt-0">
        <div className="container-max text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Ready to make the switch?</h2>
          <Link href="/booking" className="btn-primary text-base px-8 py-4">
            Book Your First Wash
          </Link>
        </div>
      </section>
    </>
  );
}
