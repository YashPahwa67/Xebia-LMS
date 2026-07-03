// My Batches — cohorts assigned to the trainer, drill into the learner roster.
import { Link } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge, { statusTone } from "@/components/ui/Badge";
import { TRAINER_BATCHES } from "@/data/trainerData";

export default function TrainerBatchesPage() {
  const columns = [
    { key: "batch", header: "Batch", render: (r) => <div><p className="font-medium">{r.batch}</p><p className="text-xs text-muted">{r.meta}</p></div> },
    { key: "org", header: "Organisation" },
    { key: "learners", header: "Learners" },
    { key: "status", header: "Status", render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => (
      <Link to={`/trainer/batches/${encodeURIComponent(r.batch)}`} className="inline-flex rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-canvas dark:border-night-line dark:text-white dark:hover:bg-white/10">View roster</Link>
    ) },
  ];

  return (
    <div>
      <PageHeader title="My Batches" subtitle="Cohorts assigned to you, with roster size" />
      <DataTable columns={columns} rows={TRAINER_BATCHES} rowKey="batch" paginated pageSize={8} />
    </div>
  );
}
