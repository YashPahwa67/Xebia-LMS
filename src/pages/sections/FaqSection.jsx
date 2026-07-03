// FAQ section: banner + two-column (heading/copy | accordion).
import { motion } from "framer-motion";
import SectionBanner from "@/components/common/SectionBanner";
import Accordion from "@/components/common/Accordion";
import { FAQS } from "@/constants/faqs";

export default function FaqSection() {
  return (
    <section id="faqs" className="scroll-mt-16">
      <SectionBanner
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our learning platform."
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm font-bold uppercase tracking-wide text-velvet dark:text-velvet-bright">FAQ&apos;S</p>
          <h3 className="mt-2 text-3xl font-bold leading-tight text-ink dark:text-white">
            Frequently Asked <span className="text-velvet dark:text-velvet-bright">Questions</span>
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted dark:text-white/60">
            Find answers to common questions about enrollment, certifications, support, and course
            accessibility. We&apos;re here to make your learning journey seamless.
          </p>
        </motion.div>
        <Accordion items={FAQS} idPrefix="faq" />
      </div>
    </section>
  );
}
