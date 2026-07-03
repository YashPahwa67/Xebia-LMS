// Marketing home page — hero, stats, features, testimonial, CTA.
import { motion } from "framer-motion";
import HomeHero from "@/pages/sections/home/HomeHero";
import StatsStrip from "@/pages/sections/home/StatsStrip";
import FeaturesSection from "@/pages/sections/home/FeaturesSection";
import TestimonialSection from "@/pages/sections/home/TestimonialSection";
import CtaSection from "@/pages/sections/home/CtaSection";

export default function HomePage() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <HomeHero />
      <StatsStrip />
      <FeaturesSection />
      <TestimonialSection />
      <CtaSection />
    </motion.main>
  );
}
