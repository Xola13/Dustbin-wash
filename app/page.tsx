import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import HowItWorks from "@/components/sections/HowItWorks";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import Gallery from "@/components/sections/Gallery";
import PricingPreview from "@/components/sections/PricingPreview";
import Testimonials from "@/components/sections/Testimonials";
import ServiceArea from "@/components/sections/ServiceArea";
import StatsSection from "@/components/sections/StatsSection";
import FaqSection from "@/components/sections/FaqSection";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />

      {/* Before/After */}
      <section className="section-padding bg-navy-900/30">
        <div className="container-max">
          <div className="text-center mb-12">
            <span className="badge bg-aqua-500/10 text-aqua-400 border border-aqua-500/20 mb-4">
              See the Difference
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mt-3">
              Drag to reveal the transformation
            </h2>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      <Gallery />
      <PricingPreview />
      <Testimonials />
      <StatsSection />
      <ServiceArea />
      <FaqSection />
      <CTABanner />
    </>
  );
}
