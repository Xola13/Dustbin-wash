const BADGES = [
  { icon: "🌿", label: "Eco-Certified Products" },
  { icon: "🛡️", label: "Fully Insured" },
  { icon: "🏠", label: "Locally Owned" },
  { icon: "⭐", label: "Satisfaction Guarantee" },
  { icon: "🐾", label: "Pet & Kid Safe" },
  { icon: "♻️", label: "Zero Waste Discharge" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-white/5 bg-navy-900/50 py-6 overflow-hidden">
      <div className="flex gap-8 animate-[marquee_30s_linear_infinite]" style={{ width: "max-content" }}>
        {[...BADGES, ...BADGES].map((b, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 text-sm font-medium text-white/50 whitespace-nowrap"
          >
            <span className="text-base">{b.icon}</span>
            <span>{b.label}</span>
            <span className="text-aqua-600 ml-4">·</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
