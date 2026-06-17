"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

type MediaItem = { src: string; alt: string; type: "image" | "video" };

const MEDIA: MediaItem[] = [
  { src: "/gallery/WhatsApp Video 2026-06-17 at 11.26.20.mp4", alt: "Bin wash in action", type: "video" },
  { src: "/gallery/468303195_540150115489808_1874641589993957322_n.jpg", alt: "Bin cleaning in action", type: "image" },
  { src: "/gallery/468303226_540150235489796_7816801740283807520_n.jpg", alt: "Clean wheelie bin result", type: "image" },
  { src: "/gallery/468314698_540150172156469_5482335147486034963_n.jpg", alt: "On-site bin wash", type: "image" },
];

function VideoSlot({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative aspect-square rounded-xl overflow-hidden group border border-white/5
                 hover:border-aqua-500/40 transition-all duration-300 hover:scale-[1.02]
                 hover:shadow-xl hover:shadow-aqua-500/10 bg-navy-800 col-span-2 sm:col-span-1"
    >
      <video
        src={src}
        muted
        loop
        playsInline
        autoPlay
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {/* Play icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-black/50 border-2 border-white/60 flex items-center justify-center
                        group-hover:bg-aqua-500/70 group-hover:border-aqua-400 transition-all duration-300">
          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-950/80 to-transparent p-3
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-xs font-medium">{alt}</p>
      </div>
    </button>
  );
}

function PhotoSlot({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  const [errored, setErrored] = useState(false);

  if (errored) return null;

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
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);
  const open = useCallback((item: MediaItem) => setLightbox(item), []);

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
          {MEDIA.map((item, i) =>
            item.type === "video" ? (
              <VideoSlot key={i} src={item.src} alt={item.alt} onClick={() => open(item)} />
            ) : (
              <PhotoSlot key={i} src={item.src} alt={item.alt} onClick={() => open(item)} />
            )
          )}
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="Close"
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
              onClick={() => setLightbox(null)}
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div
              className="w-full max-w-3xl rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.type === "video" ? (
                <video
                  src={lightbox.src}
                  controls
                  autoPlay
                  className="w-full max-h-[80vh] rounded-2xl"
                />
              ) : (
                <div className="relative aspect-video">
                  <Image
                    src={lightbox.src}
                    alt={lightbox.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
