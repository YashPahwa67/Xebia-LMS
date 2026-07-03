// Results & feedback — finalised scores with per-domain breakdown and trainer/AI feedback.
import PageHeader from "@/components/common/PageHeader";
import Badge from "@/components/ui/Badge";
import { MY_RESULTS } from "@/data/traineeData";

export default function ResultsPage() {
  return (
    <div>
      <PageHeader title="Results" subtitle="Finalised scores and feedback across your assessments" />

      {MY_RESULTS.length === 0 ? (
        <div className="rounded-2xl border border-line bg-white p-10 text-center text-muted shadow-card dark:border-night-line dark:bg-night-surface dark:text-white/50">
          No results yet — submit an assessment to see scores here.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {MY_RESULTS.map((r) => {
            const pct = Math.round((r.score / r.max) * 100);
            return (
              <div key={r.title} className="rounded-2xl border border-line bg-white p-5 shadow-card dark:border-night-line dark:bg-night-surface">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-ink dark:text-white">{r.title}</p>
                    <p className="text-xs text-muted dark:text-white/50">{r.course} · {r.domain}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-velvet dark:text-velvet-bright">{r.score}<span className="text-sm text-muted">/{r.max}</span></p>
                    <Badge tone={pct >= 60 ? "success" : "danger"}>{pct}%</Badge>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between text-xs text-muted dark:text-white/60">
                    <span>{r.domain}</span><span>{pct}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-velvet-soft dark:bg-white/10">
                    <div className="h-full rounded-full bg-velvet" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="mt-4 rounded-xl border border-line/70 bg-canvas p-3.5 text-sm text-ink/80 dark:border-night-line/60 dark:bg-night-bg dark:text-white/70">
                  <span className="font-semibold text-ink dark:text-white">Feedback: </span>{r.feedback}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
