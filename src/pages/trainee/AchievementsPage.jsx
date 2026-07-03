// Achievements — badges and higher-order awards earned from performance (M05 rewards).
import { FiAward, FiStar } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import { MY_BADGES, MY_AWARDS } from "@/data/traineeData";

function Section({ title, children }) {
  return (
    <div className="mb-8 last:mb-0">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted/80 dark:text-white/50">{title}</h2>
      {children}
    </div>
  );
}

export default function AchievementsPage() {
  return (
    <div>
      <PageHeader title="Achievements" subtitle="Badges and awards earned from your performance" />

      <Section title="Badges">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {MY_BADGES.map((b) => (
            <div key={b.code} className="flex flex-col items-center rounded-2xl border border-line bg-white p-5 text-center shadow-card dark:border-night-line dark:bg-night-surface">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-velvet-soft text-velvet dark:bg-velvet/20 dark:text-velvet-bright">
                <FiAward className="text-xl" />
              </span>
              <p className="mt-3 text-sm font-semibold text-ink dark:text-white">{b.label}</p>
              <p className="mt-0.5 text-xs text-muted dark:text-white/50">{b.awarded}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Awards">
        {MY_AWARDS.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white p-8 text-center text-muted shadow-card dark:border-night-line dark:bg-night-surface dark:text-white/50">
            No awards yet.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {MY_AWARDS.map((a) => (
              <div key={a.title} className="flex items-center gap-4 rounded-2xl border border-cta-orange/30 bg-cta-orange/5 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cta-orange/15 text-cta-orange">
                  <FiStar className="text-xl" />
                </span>
                <div>
                  <p className="font-bold text-ink dark:text-white">{a.title}</p>
                  <p className="text-xs text-muted dark:text-white/60">{a.basis} · {a.awarded}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
