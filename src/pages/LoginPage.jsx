// Login page — the hero login section only.
import { motion } from "framer-motion";
import HeroSection from "@/pages/sections/HeroSection";

export default function LoginPage() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <HeroSection />
    </motion.main>
  );
}
