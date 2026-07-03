// Upcoming assignments list card.
import { ASSIGNMENTS } from "@/data/dashboardData";

export default function AssignmentsCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-bold text-ink">Upcoming Assignments</h3>
        <button className="rounded-full border border-velvet/40 px-3 py-0.5 text-xs font-medium text-velvet hover:bg-velvet-soft">
          View All
        </button>
      </div>
      <ul className="mt-4 flex flex-col gap-3">
        {ASSIGNMENTS.map((a) => (
          <li
            key={a.id}
            className="flex items-center justify-between rounded-xl border border-line px-4 py-3"
          >
            <span className="text-sm font-medium text-ink">{a.title}</span>
            <span className="text-xs text-muted">{a.due}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
