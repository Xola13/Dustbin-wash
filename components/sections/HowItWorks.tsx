const STEPS = [
  {
    step: "01",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.5}>
        <rect x="4" y="4" width="24" height="24" rx="5" strokeLinecap="round" />
        <path strokeLinecap="round" d="M10 16h12M10 11h12M10 21h8" />
      </svg>
    ),
    title: "Schedule Online",
    description:
      "Pick your plan, enter your address, choose a date. Takes under 2 minutes — no phone call needed.",
  },
  {
    step: "02",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M16 4v6M16 22v6M4 16h6M22 16h6" />
        <circle cx="16" cy="16" r="7" />
      </svg>
    ),
    title: "We Arrive On-Site",
    description:
      "Our team arrives with truck-mounted hot-water equipment. Your bin never leaves the property.",
  },
  {
    step: "03",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M6 16c0 5.523 4.477 10 10 10s10-4.477 10-10c0-3.5-2-7-5-9" />
        <path strokeLinecap="round" d="M16 4c-2.5 2-5 5-5 8h8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 24l3-3 3 3" />
      </svg>
    ),
    title: "Sanitize & Deodorize",
    description:
      "We scrub, pressure-wash with hot water, apply our eco-certified sanitizer, and leave it smelling fresh.",
  },
  {
    step: "04",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 16l8 8 12-12" />
      </svg>
    ),
    title: "Bin Returned Spotless",
    description:
      "Your bin is back in place, sparkling clean. You get a digital wash report notification.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <span className="badge bg-aqua-500/10 text-aqua-400 border border-aqua-500/20 mb-4">
            How It Works
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-3">
            Effortless from start to finish
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Book once, we handle the rest on schedule. You&apos;ll never think about bin hygiene again.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <div key={i} className="relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(100%_-_12px)] w-full h-px bg-gradient-to-r from-aqua-500/40 to-transparent z-10" />
              )}

              <div className="glass-card p-6 h-full hover:border-aqua-500/30 transition-all duration-300 hover:bg-white/[0.07] group">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-xl bg-aqua-500/10 flex items-center justify-center text-aqua-400 group-hover:bg-aqua-500/20 transition-colors">
                    {s.icon}
                  </div>
                  <span className="font-heading font-bold text-4xl text-white/10 group-hover:text-white/20 transition-colors">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-white text-lg mb-2">
                  {s.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
