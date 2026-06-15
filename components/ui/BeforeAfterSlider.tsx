"use client";

import { useRef, useState, useCallback } from "react";

export default function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
    setPos(pct);
  }, []);

  const onMouseDown = () => {
    dragging.current = true;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (dragging.current) updatePos(e.clientX);
  };

  const onMouseUp = () => {
    dragging.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    updatePos(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] max-w-2xl mx-auto rounded-2xl overflow-hidden select-none cursor-col-resize"
      onTouchMove={onTouchMove}
    >
      {/* AFTER (clean) */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-aqua-900 flex items-center justify-center">
        <CleanBin />
        <span className="absolute top-4 right-4 badge bg-mint-500/20 text-mint-400 border border-mint-500/30">
          After ✦
        </span>
      </div>

      {/* BEFORE (dirty) — clipped */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 to-navy-800 flex items-center justify-center">
          <DirtyBin />
          <span className="absolute top-4 left-4 badge bg-white/10 text-white/50 border border-white/10">
            Before
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_16px_rgba(255,255,255,0.6)]"
        style={{ left: `${pos}%` }}
      >
        <button
          aria-label="Drag to compare before and after"
          onMouseDown={onMouseDown}
          onTouchStart={() => (dragging.current = true)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-10 h-10 rounded-full bg-white shadow-xl
                     flex items-center justify-center cursor-col-resize
                     hover:scale-110 transition-transform"
        >
          <svg className="w-5 h-5 text-navy-900" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 4l-4 6 4 6M13 4l4 6-4 6" stroke="currentColor" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function CleanBin() {
  return (
    <svg width="120" height="160" viewBox="0 0 120 160" fill="none" aria-hidden="true">
      <rect x="20" y="60" width="80" height="90" rx="8" fill="#06b6d4" fillOpacity="0.2" stroke="#06b6d4" strokeWidth="2" />
      <rect x="15" y="45" width="90" height="20" rx="6" fill="#0891b2" />
      <path d="M42 45V35h36v10" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M45 80l3 40M60 80v40M75 80l-3 40" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="90" cy="30" r="18" fill="#10b981" />
      <path d="M83 30l5 5 10-10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {[...Array(6)].map((_, i) => (
        <circle key={i} cx={85 + Math.cos((i / 6) * Math.PI * 2) * 28} cy={85 + Math.sin((i / 6) * Math.PI * 2) * 28} r="2" fill="#06b6d4" fillOpacity="0.6" />
      ))}
    </svg>
  );
}

function DirtyBin() {
  return (
    <svg width="120" height="160" viewBox="0 0 120 160" fill="none" aria-hidden="true">
      <rect x="20" y="60" width="80" height="90" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2" />
      <rect x="15" y="45" width="90" height="20" rx="6" fill="#374151" />
      <path d="M42 45V35h36v10" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 80c8 4 12-4 20 0s12 4 20 0 12-4 20 0" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 100c8 4 12-4 20 0s12 4 20 0 12-4 20 0" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="45" cy="75" rx="6" ry="4" fill="#4b5563" fillOpacity="0.6" />
      <ellipse cx="70" cy="110" rx="8" ry="5" fill="#4b5563" fillOpacity="0.6" />
    </svg>
  );
}
