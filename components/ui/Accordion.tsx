"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface Props {
  items: AccordionItem[];
}

export default function Accordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="glass-card overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between gap-4 p-5 text-left
                       hover:bg-white/5 transition-colors duration-150"
          >
            <span className="font-heading font-semibold text-white text-sm sm:text-base">
              {item.question}
            </span>
            <span
              className={cn(
                "flex-shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center",
                "text-aqua-400 transition-transform duration-200",
                open === i && "rotate-45"
              )}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" d="M6 1v10M1 6h10" />
              </svg>
            </span>
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              open === i ? "max-h-96" : "max-h-0"
            )}
          >
            <p className="px-5 pb-5 text-white/60 text-sm leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
