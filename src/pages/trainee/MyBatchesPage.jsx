// My Batches — cohorts the learner belongs to.
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge, { statusTone } from "@/components/ui/Badge";
import { MY_BATCHES } from "@/data/traineeData";

export default function MyBatchesPage() {
  const columns = [
    { key: "batch", header: "Batch", render: (r) => <div><p className="font-medium">{r.batch}</p><p className="text-xs text-muted">{r.meta}</p></div> },
    { key: "org", header: "Organisation" },
    { key: "trainer", header: "Trainer" },
    { key: "status", header: "Status", render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
  ];

  return (
    <div>
      <PageHeader title="My Batches" subtitle="Cohorts you are a member of" />
      <DataTable columns={columns} rows={MY_BATCHES} rowKey="batch" paginated pageSize={8} />
    </div>
  );
}
