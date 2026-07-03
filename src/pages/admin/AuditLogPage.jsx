// Audit Log — immutable record of privileged actions.
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";

const AUDIT = [
  { at: "2026-07-02 09:34", actor: "admin@xebia.lms", action: "PERMISSION_GRANT", target: "TRAINER → COURSE:MANAGE" },
  { at: "2026-07-02 09:20", actor: "admin@xebia.lms", action: "USER_INVITE", target: "learner@xebia.lms" },
  { at: "2026-07-01 18:02", actor: "admin@xebia.lms", action: "ORG_CREATE", target: "State Technical University" },
];

const columns = [
  { key: "at", header: "Timestamp", render: (r) => <span className="font-mono text-xs">{r.at}</span> },
  { key: "actor", header: "Actor" },
  { key: "action", header: "Action", render: (r) => <Badge tone="neutral">{r.action}</Badge> },
  { key: "target", header: "Target", render: (r) => <span className="text-muted dark:text-white/60">{r.target}</span> },
];

export default function AuditLogPage() {
  return (
    <div>
      <PageHeader title="Audit Log" subtitle="Immutable record of privileged actions" />
      <DataTable columns={columns} rows={AUDIT} rowKey="at" />
    </div>
  );
}
