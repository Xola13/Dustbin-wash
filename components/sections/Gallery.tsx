"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

const PHOTOS = [
  { src: "/gallery/468303195_540150115489808_1874641589993957322_n.jpg", alt: "Bin cleaning in action" },
  { src: "/gallery/468303226_540150235489796_7816801740283807520_n.jpg", alt: "Clean wheelie bin result" },
  { src: "/gallery/468314698_540150172156469_5482335147486034963_n.jpg", alt: "On-site bin wash" },
];

function PhotoSlot({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="aspect-square rounded-xl bg-navy-800 border border-white/5 flex flex-col items-center justify-center gap-2 text-white/20">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1}>
          <rect x="4" y="4" width="24" height="24" rx="3" />
          <path strokeLinecap="round" d="M4 22l7-7 5 5 4-4 8 8" />
          <circle cx="22" cy="11" r="2.5" />
        </svg>
        <span className="text-xs">Add photo</span>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="relative aspect-square rounded-xl overflow-hidden group border border-white/5
                 hover:border-aqua-500/40 transition-all duration-300 hover:scale-[1.02]
                 hover:shadow-xl hover:shadow-aqua-500/10 bg-navy-800"
    >
      <Image
        src={src}
        alt={alt}
        fill
        onError={() => setErrored(true)}
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 640px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
        <p className="text-white text-xs font-medium">{alt}</p>
      </div>
    </button>
  );
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const open = useCallback((src: string) => setLightbox(src), []);

  return (
    <section className="section-padding bg-navy-900/30">
      <div className="container-max">
        <div className="text-center mb-12">
          <span className="badge bg-aqua-500/10 text-aqua-400 border border-aqua-500/20 mb-4">
            Real Results
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mt-3">
            See it to believe it
          </h2>
          <p className="text-white/50 mt-3">
            Every job we do — on-site, zero mess, every time.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {PHOTOS.map((p, i) => (
            <PhotoSlot key={i} src={p.src} alt={p.alt} onClick={() => open(p.src)} />
          ))}
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="Close"
              className="absolute top-4 right-4 text-white/70 hover:text-white"
              onClick={() => setLightbox(null)}
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden">
              <Image
                src={lightbox}
                alt="Gallery photo"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
