import Accordion from "@/components/ui/Accordion";
import { FAQS } from "@/lib/constants";

export default function FaqSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge bg-aqua-500/10 text-aqua-400 border border-aqua-500/20 mb-4">
              Got Questions?
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mt-3">
              Frequently asked questions
            </h2>
            <p className="text-white/50 mt-4">
              Can&apos;t find your answer? Ask our AI assistant or reach out via WhatsApp.
            </p>
          </div>

          <Accordion items={FAQS} />
        </div>
      </div>
    </section>
  );
}
