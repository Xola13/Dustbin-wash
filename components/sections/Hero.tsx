"use client";

import Link from "next/link";
import { BRAND } from "@/lib/constants";

// Pre-generated so SSR and client render identical markup (no Math.random() at render time)
const PARTICLES = [
  { w: 4.31, h: 6.67, l: 47.96, t: 67.11, dur: 4.46, del: 0.26 },
  { w: 5.95, h: 7.44, l: 24.12, t: 57.29, dur: 2.08, del: 0.90 },
  { w: 4.78, h: 7.98, l: 66.64, t: 88.34, dur: 3.76, del: 0.87 },
  { w: 5.71, h: 7.21, l: 82.13, t: 43.69, dur: 3.18, del: 0.62 },
  { w: 3.54, h: 2.49, l: 84.13, t: 60.43, dur: 2.88, del: 0.48 },
  { w: 3.72, h: 7.41, l: 67.29, t: 96.34, dur: 3.30, del: 1.05 },
  { w: 5.42, h: 7.21, l:  7.83, t: 26.11, dur: 3.56, del: 0.32 },
  { w: 3.75, h: 5.34, l: 53.48, t: 48.73, dur: 3.42, del: 1.53 },
  { w: 6.07, h: 7.82, l:  3.66, t: 91.45, dur: 3.44, del: 0.01 },
  { w: 6.14, h: 6.38, l: 55.70, t:  6.93, dur: 2.82, del: 0.11 },
  { w: 6.43, h: 5.15, l: 82.54, t: 11.25, dur: 3.05, del: 1.51 },
  { w: 4.09, h: 6.70, l: 33.05, t: 13.40, dur: 2.58, del: 1.28 },
  { w: 2.48, h: 3.06, l: 62.97, t: 34.65, dur: 3.38, del: 0.88 },
  { w: 3.87, h: 3.95, l: 45.48, t: 46.80, dur: 4.65, del: 0.96 },
  { w: 6.78, h: 7.79, l: 93.43, t: 68.35, dur: 4.08, del: 1.94 },
  { w: 7.50, h: 7.44, l: 70.58, t: 16.78, dur: 2.52, del: 1.31 },
  { w: 5.61, h: 3.92, l: 56.45, t: 31.21, dur: 3.67, del: 0.33 },
  { w: 4.39, h: 7.01, l: 27.24, t: 90.02, dur: 3.75, del: 0.90 },
  { w: 5.99, h: 6.60, l:  1.56, t: 43.92, dur: 4.51, del: 1.36 },
  { w: 5.48, h: 4.87, l: 67.47, t: 42.40, dur: 2.92, del: 1.69 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-aqua-400/10"
            style={{
              width: `${p.w}px`,
              height: `${p.h}px`,
              left: `${p.l}%`,
              top: `${p.t}%`,
              animation: `fadeIn ${p.dur}s ease-in-out ${p.del}s infinite alternate`,
            }}
          />
        ))}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-aqua-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-mint-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-max section-padding pt-32 lg:pt-40 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="animate-slide-up">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-aqua-500/10 border border-aqua-500/20 text-aqua-400 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-aqua-400 animate-pulse" />
              Cape Town&apos;s Premium Bin Washing Service
            </div>

            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.08] tracking-tight mb-6">
              Your Bin,
              <br />
              <span className="gradient-text">Brilliantly</span>
              <br />
              Clean.
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
              {BRAND.subtagline} We wash, sanitize, and deodorize your wheelie bins
              on-site — using eco-certified products that are safe for kids, pets,
              and the planet.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/booking" className="btn-primary text-base px-8 py-4">
                Book Your Wash
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <Link href="/pricing" className="btn-secondary text-base px-8 py-4">
                See Plans
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 text-sm text-white/40">
              <div className="flex -space-x-2">
                {["bg-aqua-600", "bg-mint-500", "bg-navy-600", "bg-aqua-500"].map((c, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full ${c} border-2 border-navy-950 flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {["T", "N", "S", "A"][i]}
                  </div>
                ))}
              </div>
              <span>
                <strong className="text-white">1,240+</strong> happy households served
              </span>
              <div className="flex text-aqua-400">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Animated bin graphic */}
          <div className="flex justify-center animate-fade-in">
            <AnimatedBin />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
        <span>scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

function AnimatedBin() {
  return (
    <div className="relative w-64 h-80 lg:w-80 lg:h-96">
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-aqua-500/10 blur-3xl scale-150" />

      <svg
        viewBox="0 0 240 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
        aria-hidden="true"
      >
        {/* Bin body */}
        <rect x="40" y="120" width="160" height="180" rx="12" fill="#0f1a35" stroke="#06b6d4" strokeWidth="2" />
        <rect x="50" y="140" width="140" height="10" rx="5" fill="#06b6d4" fillOpacity="0.2" />
        <rect x="50" y="165" width="140" height="10" rx="5" fill="#06b6d4" fillOpacity="0.1" />

        {/* Lid */}
        <rect x="30" y="90" width="180" height="35" rx="10" fill="#0891b2" />
        <rect x="80" y="70" width="80" height="25" rx="8" fill="#0891b2" />

        {/* Handle */}
        <path d="M85 70V58h70v12" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" />

        {/* Stripes */}
        <path d="M70 200l6 80M120 200v80M170 200l-6 80" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />

        {/* Water droplets */}
        <ellipse cx="60" cy="150" rx="4" ry="6" fill="#22d3ee" fillOpacity="0.8" className="animate-pulse" />
        <ellipse cx="80" cy="110" rx="3" ry="4" fill="#22d3ee" fillOpacity="0.6" />
        <ellipse cx="170" cy="140" rx="4" ry="6" fill="#22d3ee" fillOpacity="0.7" className="animate-pulse" />

        {/* Steam/sparkle effect */}
        <g className="animate-pulse">
          <path d="M100 80 Q95 65 100 50 Q105 35 100 20" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.5" />
          <path d="M120 85 Q115 68 120 50 Q125 32 120 15" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.4" />
          <path d="M140 80 Q145 65 140 50 Q135 35 140 20" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.5" />
        </g>

        {/* Sparkles */}
        <g fill="#10b981">
          <polygon points="190,100 193,110 203,110 195,116 198,126 190,120 182,126 185,116 177,110 187,110" opacity="0.8" />
          <polygon points="30,160 32,166 38,166 33,170 35,176 30,172 25,176 27,170 22,166 28,166" opacity="0.6" />
        </g>

        {/* Check mark badge */}
        <circle cx="195" cy="195" r="22" fill="#10b981" />
        <path d="M185 195l8 8 14-14" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
