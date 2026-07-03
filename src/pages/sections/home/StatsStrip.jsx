// Stats strip below the hero.
import { STATS } from "@/constants/home";

export default function StatsStrip() {
  return (
    <section className="border-y border-line bg-white dark:border-night-line dark:bg-night-surface">
      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-night-line">
        {STATS.map((s) => (
          <div key={s.label} className="px-6 py-8 text-center">
            <p className="text-3xl font-bold text-velvet dark:text-velvet-bright">{s.value}</p>
            <p className="mt-1 text-sm text-muted dark:text-white/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
