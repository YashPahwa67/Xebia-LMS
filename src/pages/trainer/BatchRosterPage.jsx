// Batch roster — learners in an assigned batch with progress/score/attendance (M04).
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Button from "@/components/ui/Button";
import { TRAINER_ROSTERS } from "@/data/trainerData";

function Bar({ pct }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-24 overflow-hidden rounded-full bg-velvet-soft dark:bg-white/10">
        <div className="h-full rounded-full bg-velvet" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-muted dark:text-white/60">{pct}%</span>
    </div>
  );
}

export default function BatchRosterPage() {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const batch = decodeURIComponent(batchId);
  const roster = TRAINER_ROSTERS[batch] || [];

  const columns = [
    { key: "learner", header: "Learner", render: (r) => <div><p className="font-medium">{r.learner}</p><p className="text-xs text-muted">{r.email}</p></div> },
    { key: "progress", header: "Progress", render: (r) => <Bar pct={r.progress} /> },
    { key: "avgScore", header: "Avg score", render: (r) => <span className="tabular-nums">{r.avgScore}%</span> },
    { key: "attendance", header: "Attendance", render: (r) => <span className="tabular-nums">{r.attendance}%</span> },
  ];

  return (
    <div>
      <button onClick={() => navigate("/trainer/batches")} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-velvet dark:text-white/60">
        <FiArrowLeft /> My Batches
      </button>
      <PageHeader title={batch} subtitle={`${roster.length} learners enrolled`} />
      {roster.length === 0 ? (
        <div className="rounded-2xl border border-line bg-white p-10 text-center text-muted shadow-card dark:border-night-line dark:bg-night-surface dark:text-white/50">
          No roster for this batch. <div className="mt-3"><Button variant="outline" onClick={() => navigate("/trainer/batches")}>Back</Button></div>
        </div>
      ) : (
        <DataTable columns={columns} rows={roster} rowKey="email" paginated pageSize={10} />
      )}
    </div>
  );
}
