// Contact page (standalone route).
import { motion } from "framer-motion";
import ContactSection from "@/pages/sections/ContactSection";

export default function ContactPage() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <ContactSection />
    </motion.main>
  );
}
