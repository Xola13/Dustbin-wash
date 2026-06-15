import Link from "next/link";
import { BRAND } from "@/lib/constants";

export default function CTABanner() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="relative gradient-border rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-navy-800 via-aqua-900/30 to-navy-800 p-10 lg:p-16 text-center">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-radial from-aqua-500/10 via-transparent to-transparent" />

            <div className="relative">
              <p className="text-aqua-400 font-medium text-sm mb-4">Ready to make the switch?</p>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6 max-w-2xl mx-auto">
                Your first clean is just a few clicks away
              </h2>
              <p className="text-white/50 mb-8 max-w-lg mx-auto">
                Join {">"}1,200 Cape Town households who&apos;ve ditched the wince. No
                lock-in. Cancel anytime.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/booking" className="btn-primary text-base px-8 py-4">
                  Book Your First Wash
                </Link>
                <a
                  href={`https://wa.me/${BRAND.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-base px-8 py-4"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
