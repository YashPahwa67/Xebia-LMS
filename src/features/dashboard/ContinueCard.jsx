// "Pick up where you left off" card.
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "@/components/ui/Button";
import { CONTINUE } from "@/data/dashboardData";

export default function ContinueCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-velvet">Pick up where you left off</span>
        <span className="rounded-full bg-velvet-soft px-3 py-1 text-xs font-medium text-velvet">
          {CONTINUE.step}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-bold text-ink">{CONTINUE.title}</h3>
      <p className="text-sm text-muted">{CONTINUE.chapter}</p>

      <div className="mt-4 flex items-center gap-3">
        <ProgressBar value={CONTINUE.progress} />
        <span className="text-sm font-bold text-ink">{CONTINUE.progress}%</span>
      </div>

      <div className="mt-5 flex gap-3">
        <Button variant="primary" className="flex-1">
          RESUME MODE
        </Button>
        <Button variant="outline" className="flex-1">
          View Syllabus
        </Button>
      </div>
    </div>
  );
}
