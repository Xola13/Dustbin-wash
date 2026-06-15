"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-950/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="container-max section-padding py-0">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <BinLogo />
            <span
              className="font-heading font-bold text-lg text-white tracking-tight
                         group-hover:text-aqua-400 transition-colors duration-200"
            >
              {BRAND.name}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="btn-ghost">
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/booking" className="btn-primary">
              Book a Wash
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-4 border-t border-white/10 mt-2 pt-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="btn-ghost justify-start w-full"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/booking" onClick={() => setOpen(false)} className="btn-primary w-full">
                Book a Wash
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function BinLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="#06b6d4" fillOpacity="0.15" />
      <rect x="9" y="13" width="14" height="14" rx="2" fill="#06b6d4" fillOpacity="0.3" stroke="#06b6d4" strokeWidth="1.5" />
      <rect x="7" y="10" width="18" height="4" rx="1.5" fill="#06b6d4" strokeWidth="1.5" />
      <path d="M13 10V8h6v2" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 17l1.5 5M19 17l-1.5 5M16 17v5" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="22" cy="9" r="4" fill="#10b981" />
      <path d="M20.5 9l1 1 2-2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
