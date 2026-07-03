// Organisations — onboarded orgs/universities (M02 onboarding).
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
import { MGR_ORGS } from "@/data/managerData";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

export default function ManagerOrganisationsPage() {
  const crud = useCrud(MGR_ORGS, "name");
  const [form, setForm] = useState({ name: "", type: "UNIVERSITY", branch: "" });

  const openNew = () => { setForm({ name: "", type: "UNIVERSITY", branch: "" }); crud.openNew(); };
  const save = () => {
    if (!form.name.trim()) return toast.error("Name is required");
    crud.save({ name: form.name, type: form.type, branch: form.branch || "—", status: "ACTIVE" });
    toast.success("Organisation onboarded");
    crud.closeForm();
  };

  const columns = [
    { key: "name", header: "Organisation", render: (r) => <span className="font-medium">{r.name}</span> },
    { key: "type", header: "Type", render: (r) => <Badge tone="neutral">{r.type}</Badge> },
    { key: "branch", header: "Branch" },
    { key: "status", header: "Status", render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => <RowActions onEdit={() => crud.openEdit(r)} onToggle={() => crud.toggle(r, "status", "ACTIVE", "INACTIVE")} onDelete={() => crud.setDeleting(r)} /> },
  ];

  return (
    <div>
      <PageHeader title="Organisations" subtitle="Onboard client organisations and universities" action={<Button onClick={openNew}><FiPlus /> Onboard organisation</Button>} />

      <DataTable columns={columns} rows={crud.rows} rowKey="name" paginated pageSize={8} />

      <Modal open={crud.editing !== null} onClose={crud.closeForm} title={crud.editing?.name ? "Edit organisation" : "Onboard organisation"}
        footer={<><Button variant="outline" onClick={crud.closeForm}>Cancel</Button><Button onClick={save}>Save</Button></>}>
        <div className="flex flex-col gap-4">
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} /></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputCls}><option>UNIVERSITY</option><option>CORPORATE</option></select></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Branch</label><input value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} className={inputCls} /></div>
        </div>
      </Modal>

      <ConfirmDialog open={crud.deleting !== null} onClose={() => crud.setDeleting(null)} onConfirm={crud.confirmDelete} message={`Delete "${crud.deleting?.name}"?`} />
    </div>
  );
}
