// FAQ page (standalone route).
import { motion } from "framer-motion";
import FaqSection from "@/pages/sections/FaqSection";

export default function FaqPage() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <FaqSection />
    </motion.main>
  );
}
