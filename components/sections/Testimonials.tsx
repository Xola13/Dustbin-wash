"use client";

import { useState } from "react";

const TESTIMONIALS = [
  {
    name: "Thandi M.",
    suburb: "Constantia",
    rating: 5,
    text: "I genuinely didn't know bin cleaning could feel like a luxury service. The bin smells like a spa now. Worth every cent.",
  },
  {
    name: "Nadia van der Berg",
    suburb: "Claremont",
    rating: 5,
    text: "With two young kids and a dog, our bins were a biohazard. Safe Solution sorted it out — fast, professional, and no mess left behind.",
  },
  {
    name: "Simon K.",
    suburb: "Sea Point",
    rating: 5,
    text: "Set up the bi-weekly plan and completely forgot about it. That's the point, isn't it? Highly recommend.",
  },
  {
    name: "Priya R.",
    suburb: "Newlands",
    rating: 5,
    text: "Love that they use eco-certified products. Clean bin, clean conscience. The team is always on time and super polite.",
  },
  {
    name: "Marcus O.",
    suburb: "Hout Bay",
    rating: 5,
    text: "Was skeptical at first, but after the first clean I booked the monthly plan on the spot. The before/after is unreal.",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const visible = [
    TESTIMONIALS[idx % TESTIMONIALS.length],
    TESTIMONIALS[(idx + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(idx + 2) % TESTIMONIALS.length],
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="text-center mb-14">
          <span className="badge bg-aqua-500/10 text-aqua-400 border border-aqua-500/20 mb-4">
            Customer Stories
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-3">
            They no longer wince
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {visible.map((t, i) => (
            <div key={`${idx}-${i}`} className="glass-card p-6 flex flex-col gap-4">
              <div className="flex text-aqua-400">
                {"★".repeat(t.rating)}
              </div>
              <p className="text-white/70 text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-white text-sm">{t.name}</p>
                <p className="text-white/40 text-xs">{t.suburb}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === idx % TESTIMONIALS.length
                  ? "bg-aqua-400 w-6"
                  : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
