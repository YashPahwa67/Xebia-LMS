// Assignments — trainer↔org/domain links scheduling relies on (M02 — trainer_org_link).
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge, { statusTone } from "@/components/ui/Badge";
import { MGR_ASSIGNMENTS } from "@/data/managerData";

export default function TrainerAssignmentsPage() {
  const columns = [
    { key: "trainer", header: "Trainer", render: (r) => <span className="font-medium">{r.trainer}</span> },
    { key: "org", header: "Organisation" },
    { key: "domain", header: "Domain" },
    { key: "status", header: "Status", render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
  ];

  return (
    <div>
      <PageHeader title="Assignments" subtitle="Trainer ↔ organisation / domain links that scheduling relies on" />
      <DataTable columns={columns} rows={MGR_ASSIGNMENTS} rowKey="trainer" paginated pageSize={8} />
    </div>
  );
}
