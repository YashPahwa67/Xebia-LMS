// "Crafting the Future of Workforce Development" — 3 feature cards.
import { motion } from "framer-motion";
import { FiZap, FiShield, FiLayers } from "react-icons/fi";
import { FEATURES } from "@/constants/home";

const ICONS = { spark: FiZap, shield: FiShield, layers: FiLayers };
const TINTS = {
  velvet: "bg-velvet text-white",
  emerald: "bg-emerald-brand text-white",
};

export default function FeaturesSection() {
  return (
    <section className="bg-canvas py-20 dark:bg-night-bg">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-bold text-ink dark:text-white">
          Crafting the Future of Workforce Development
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted dark:text-white/60">
          Deeply integrated tools that prioritize clarity, performance, and meaningful growth.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon];
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-line bg-white p-7 shadow-card transition-transform hover:-translate-y-1 dark:border-night-line dark:bg-night-surface"
              >
                <span className={`grid h-11 w-11 place-items-center rounded-xl ${TINTS[f.tint]}`}>
                  <Icon className="text-lg" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink dark:text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted dark:text-white/60">{f.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
