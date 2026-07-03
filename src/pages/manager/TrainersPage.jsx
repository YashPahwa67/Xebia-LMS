// Trainers — onboarded trainers, with type, domains and org count (M02 onboarding).
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
import { MGR_TRAINERS } from "@/data/managerData";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

export default function TrainersPage() {
  const crud = useCrud(MGR_TRAINERS, "name");
  const [form, setForm] = useState({ name: "", type: "INTERNAL", domain: "" });

  const openNew = () => { setForm({ name: "", type: "INTERNAL", domain: "" }); crud.openNew(); };
  const save = () => {
    if (!form.name.trim()) return toast.error("Trainer name is required");
    crud.save({ name: form.name, type: form.type, domain: form.domain || "—", orgs: 0, status: "ACTIVE" });
    toast.success("Trainer onboarded");
    crud.closeForm();
  };

  const columns = [
    { key: "name", header: "Trainer", render: (r) => <div><p className="font-medium">{r.name}</p><p className="text-xs text-muted">{r.domain}</p></div> },
    { key: "type", header: "Type", render: (r) => <Badge tone="neutral">{r.type}</Badge> },
    { key: "orgs", header: "Orgs" },
    { key: "status", header: "Status", render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => <RowActions onEdit={() => crud.openEdit(r)} onToggle={() => crud.toggle(r, "status", "ACTIVE", "INACTIVE")} onDelete={() => crud.setDeleting(r)} /> },
  ];

  return (
    <div>
      <PageHeader title="Trainers" subtitle="Onboard and manage trainers across organisations" action={<Button onClick={openNew}><FiPlus /> Onboard trainer</Button>} />

      <DataTable columns={columns} rows={crud.rows} rowKey="name" paginated pageSize={8} />

      <Modal open={crud.editing !== null} onClose={crud.closeForm} title={crud.editing?.name ? "Edit trainer" : "Onboard trainer"}
        footer={<><Button variant="outline" onClick={crud.closeForm}>Cancel</Button><Button onClick={save}>Save</Button></>}>
        <div className="flex flex-col gap-4">
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} /></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputCls}><option>INTERNAL</option><option>EXTERNAL</option></select></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Domain</label><input value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })} className={inputCls} placeholder="e.g. Full Stack · DevOps" /></div>
        </div>
      </Modal>

      <ConfirmDialog open={crud.deleting !== null} onClose={() => crud.setDeleting(null)} onConfirm={crud.confirmDelete} message={`Deactivate trainer "${crud.deleting?.name}"?`} confirmLabel="Deactivate" />
    </div>
  );
}
