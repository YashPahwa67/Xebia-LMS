// Batches — create cohorts and manage enrolment (M02 — batch, batch_student).
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge, { statusTone } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RowActions from "@/components/ui/RowActions";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Modal from "@/components/ui/Modal";
import { useCrud } from "@/hooks/useCrud";
import { MGR_BATCHES } from "@/data/managerData";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

export default function ManagerBatchesPage() {
  const crud = useCrud(MGR_BATCHES, "batch");
  const [form, setForm] = useState({ batch: "", org: "", branch: "", domain: "" });

  const openNew = () => { setForm({ batch: "", org: "", branch: "", domain: "" }); crud.openNew(); };
  const save = () => {
    if (!form.batch.trim()) return toast.error("Batch name is required");
    crud.save({ batch: form.batch, org: form.org || "—", branch: form.branch || "—", domain: form.domain || "—", learners: 0, status: "PLANNED" });
    toast.success("Batch created");
    crud.closeForm();
  };

  const columns = [
    { key: "batch", header: "Batch", render: (r) => <div><p className="font-medium">{r.batch}</p><p className="text-xs text-muted">{r.domain} · {r.branch}</p></div> },
    { key: "org", header: "Organisation" },
    { key: "learners", header: "Learners" },
    { key: "status", header: "Status", render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => <RowActions onEdit={() => crud.openEdit(r)} onDelete={() => crud.setDeleting(r)} /> },
  ];

  return (
    <div>
      <PageHeader title="Batches" subtitle="Create cohorts and enrol students batch-wise" action={<Button onClick={openNew}><FiPlus /> New batch</Button>} />

      <DataTable columns={columns} rows={crud.rows} rowKey="batch" paginated pageSize={8} />

      <Modal open={crud.editing !== null} onClose={crud.closeForm} title={crud.editing?.batch ? "Edit batch" : "New batch"}
        footer={<><Button variant="outline" onClick={crud.closeForm}>Cancel</Button><Button onClick={save}>Save</Button></>}>
        <div className="flex flex-col gap-4">
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Batch name</label><input value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value })} className={inputCls} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Organisation</label><input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} className={inputCls} /></div>
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Branch</label><input value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} className={inputCls} /></div>
          </div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Domain</label><input value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })} className={inputCls} /></div>
        </div>
      </Modal>

      <ConfirmDialog open={crud.deleting !== null} onClose={() => crud.setDeleting(null)} onConfirm={crud.confirmDelete} message={`Delete batch "${crud.deleting?.batch}"?`} />
    </div>
  );
}
