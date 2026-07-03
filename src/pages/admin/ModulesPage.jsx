// Modules — registered feature areas that drive dynamic navigation & RBAC.
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RowActions from "@/components/ui/RowActions";
import ResourceModal from "@/components/ui/ResourceModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useCrud } from "@/hooks/useCrud";
import { MODULES_REGISTRY } from "@/data/adminData";

const FIELDS = [
  { name: "key", label: "Key", placeholder: "e.g. SCHEDULING", required: true },
  { name: "title", label: "Title", placeholder: "Human-readable name", required: true },
  { name: "route", label: "Route", placeholder: "e.g. /scheduling", required: true },
  { name: "status", label: "Status", type: "select", options: ["ACTIVE", "INACTIVE"] },
];

export default function ModulesPage() {
  const crud = useCrud(MODULES_REGISTRY.map((m) => ({ status: "ACTIVE", ...m })), "key");

  const columns = [
    { key: "key", header: "Key", render: (r) => <span className="font-mono text-xs">{r.key}</span> },
    { key: "title", header: "Title", render: (r) => <span className="font-medium">{r.title}</span> },
    { key: "route", header: "Route", render: (r) => <span className="font-mono text-xs text-muted">{r.route}</span> },
    { key: "status", header: "Status", render: (r) => <Badge tone={r.status === "ACTIVE" ? "success" : "danger"}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => <RowActions onEdit={() => crud.openEdit(r)} onToggle={() => crud.toggle(r, "status", "ACTIVE", "INACTIVE")} onDelete={() => crud.setDeleting(r)} /> },
  ];

  return (
    <div>
      <PageHeader title="Modules" subtitle="Registered feature areas that drive dynamic navigation & RBAC" action={<Button onClick={crud.openNew}><FiPlus /> New module</Button>} />
      <DataTable columns={columns} rows={crud.rows} rowKey="key" />

      <ResourceModal open={crud.editing !== null} onClose={crud.closeForm} title={crud.editing?.key ? "Edit module" : "New module"} fields={FIELDS} initial={crud.editing} onSubmit={crud.save} />
      <ConfirmDialog open={crud.deleting !== null} onClose={() => crud.setDeleting(null)} onConfirm={crud.confirmDelete} message={`Delete module "${crud.deleting?.title}"?`} />
    </div>
  );
}
