// Contact section: banner + two-column (get-in-touch info | accordion).
import { motion } from "framer-motion";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import SectionBanner from "@/components/common/SectionBanner";
import ContactForm from "@/features/contact/ContactForm";
import { CONTACT } from "@/constants/contact";

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-velvet">{icon}</span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted dark:text-white/50">{label}</p>
        <p className="text-sm text-ink dark:text-white/90">{value}</p>
      </div>
    </div>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-16">
      <SectionBanner title="Contact Us" subtitle="Let's build something great together." />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm font-bold uppercase tracking-wide text-velvet dark:text-velvet-bright">CONTACT</p>
          <h3 className="mt-2 text-3xl font-bold text-ink dark:text-white">Get In Touch</h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted dark:text-white/60">{CONTACT.intro}</p>
          <div className="mt-6 flex flex-col gap-4">
            <InfoRow icon={<FiMapPin />} label="Our Office" value={CONTACT.office} />
            <InfoRow icon={<FiMail />} label="Email Us" value={CONTACT.email} />
            <InfoRow icon={<FiPhone />} label="Call Us" value={CONTACT.phone} />
          </div>
        </motion.div>
        <ContactForm />
      </div>
    </section>
  );
}
