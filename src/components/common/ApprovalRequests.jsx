// Reusable "Requests to approve" panel used by Batches and Courses.
import { FiCheck, FiX } from "react-icons/fi";

export default function ApprovalRequests({ requests }) {
  if (!requests.length) return null;
  return (
    <div className="mb-6 rounded-2xl border border-cta-orange/30 bg-cta-orange/5 p-4">
      <p className="mb-3 text-sm font-semibold text-ink dark:text-white">
        Requests to approve ({requests.length})
      </p>
      <div className="flex flex-col gap-2">
        {requests.map((r) => (
          <div key={r.title} className="flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3 dark:border-night-line dark:bg-night-surface">
            <span className="text-sm text-ink dark:text-white/90">
              <span className="font-medium">{r.title}</span>
              {r.by && <span className="text-muted"> by {r.by}</span>}
            </span>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 rounded-lg bg-emerald-brand px-3 py-1.5 text-xs font-semibold text-white hover:brightness-95">
                <FiCheck /> Approve
              </button>
              <button className="flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-canvas dark:border-night-line dark:text-white dark:hover:bg-white/10">
                <FiX /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
