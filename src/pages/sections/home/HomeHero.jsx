// Home hero — headline, subtitle, CTAs over the isometric illustration.
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import heroArt from "@/assets/images/home-hero.png";

export default function HomeHero() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-canvas dark:bg-night-bg">
      <img
        src={heroArt}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90 dark:opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/60 to-transparent dark:from-night-bg/90 dark:via-night-bg/70" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-7xl px-6 py-24 text-center lg:py-32"
      >
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-ink dark:text-white sm:text-5xl">
          Innovation &amp; Learning
          <br />
          Without <span className="font-serif italic text-velvet dark:text-velvet-bright">Boundaries</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted dark:text-white/70">
          Empower your workforce with a modular learning ecosystem designed for the modern
          enterprise. Scale expertise effortlessly across your entire organization.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button variant="emerald" className="!bg-cta-orange !px-7 !py-3.5 hover:!brightness-95" onClick={() => navigate("/login")}>
            Get Started
          </Button>
          <Button variant="outline" className="!px-7 !py-3.5">
            View Demo
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
