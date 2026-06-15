"use client";

import { useState } from "react";
import { SERVICE_SUBURBS } from "@/lib/constants";

export default function ServiceArea() {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? SERVICE_SUBURBS : SERVICE_SUBURBS.slice(0, 12);

  return (
    <section className="section-padding bg-navy-900/30">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Google Maps embed */}
          <div className="rounded-2xl overflow-hidden border border-white/10 aspect-square max-w-md mx-auto lg:mx-0 shadow-xl shadow-black/30">
            <iframe
              src="https://maps.google.com/maps?q=Crossroads,+Cape+Town,+South+Africa&t=&z=12&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Safe Solution service area — Cape Town"
            />
          </div>

          {/* Suburb list */}
          <div>
            <span className="badge bg-aqua-500/10 text-aqua-400 border border-aqua-500/20 mb-4">
              Service Area
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mt-3 mb-4">
              We come to you
            </h2>
            <p className="text-white/50 mb-8">
              Currently serving Cape Town and its surrounds. Enter your address on the booking
              page to confirm coverage — we&apos;re expanding regularly.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {shown.map((suburb) => (
                <span
                  key={suburb}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm"
                >
                  {suburb}
                </span>
              ))}
            </div>

            {SERVICE_SUBURBS.length > 12 && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="text-aqua-400 text-sm font-medium hover:text-aqua-300 transition-colors"
              >
                {expanded ? "Show less ↑" : `Show all ${SERVICE_SUBURBS.length} suburbs ↓`}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
