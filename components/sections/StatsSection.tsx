import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { STATS } from "@/lib/constants";

export default function StatsSection() {
  return (
    <section className="section-padding bg-gradient-to-r from-navy-900 via-aqua-900/20 to-navy-900">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
            The numbers speak for themselves
          </h2>
          <p className="text-white/50 mt-3">
            Real impact, every wash, every week.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="glass-card p-6 text-center hover:border-aqua-500/30 transition-all">
              <div className="font-heading font-bold text-3xl sm:text-4xl gradient-text mb-2">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <p className="text-white/50 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
