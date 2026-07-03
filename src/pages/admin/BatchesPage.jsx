// Batches — cohorts of learners, with approval and per-batch membership.
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge, { statusTone } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RowActions from "@/components/ui/RowActions";
import ApprovalRequests from "@/components/common/ApprovalRequests";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import BatchModal from "@/features/admin/BatchModal";
import { useCrud } from "@/hooks/useCrud";
import { BATCHES } from "@/data/adminData";

const FILTERS = ["All", "Pending", "Approved", "Rejected"];

export default function BatchesPage() {
  const crud = useCrud(BATCHES, "batch");
  const [filter, setFilter] = useState("All");

  const rows = filter === "All" ? crud.rows : crud.rows.filter((b) => b.status === filter.toUpperCase());
  const requests = crud.rows.filter((b) => b.status === "PENDING").map((b) => ({ title: b.batch, by: b.createdBy }));

  const columns = [
    { key: "batch", header: "Batch", render: (r) => <div><p className="font-medium">{r.batch}</p><p className="text-xs text-muted">{r.meta}</p></div> },
    { key: "org", header: "Organisations" },
    { key: "learners", header: "Learners" },
    { key: "status", header: "Status", render: (r) => <Badge tone={statusTone(r.status)}>{r.status === "PENDING" ? "Pending approval" : r.status}</Badge> },
    { key: "createdBy", header: "Created by" },
    { key: "actions", header: "", align: "right", render: (r) => <RowActions onEdit={() => crud.openEdit(r)} onToggle={() => crud.toggle(r, "status", "APPROVED", "PENDING")} onDelete={() => crud.setDeleting(r)} /> },
  ];

  return (
    <div>
      <PageHeader title="Batches" subtitle="Cohorts of learners, with approval and per-batch membership" action={<Button onClick={crud.openNew}><FiPlus /> New batch</Button>} />

      <div className="mb-5 flex items-center gap-2 text-sm">
        <span className="text-muted">Filter:</span>
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 font-medium transition-colors ${filter === f ? "bg-velvet text-white" : "text-muted hover:bg-velvet-soft hover:text-velvet dark:text-white/60"}`}>{f}</button>
        ))}
      </div>

      <ApprovalRequests requests={requests} />
      <DataTable columns={columns} rows={rows} rowKey="batch" />

      <BatchModal open={crud.editing !== null} onClose={crud.closeForm} initial={crud.editing} onSubmit={crud.save} />
      <ConfirmDialog open={crud.deleting !== null} onClose={() => crud.setDeleting(null)} onConfirm={crud.confirmDelete} message={`Delete batch "${crud.deleting?.batch}"?`} />
    </div>
  );
}
