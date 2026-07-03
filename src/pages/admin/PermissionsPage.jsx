// Permissions — atomic MODULE:ACTION grants.
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RowActions from "@/components/ui/RowActions";
import ResourceModal from "@/components/ui/ResourceModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useCrud } from "@/hooks/useCrud";
import { PERMISSIONS } from "@/data/adminData";

const FIELDS = [
  { name: "code", label: "Code", placeholder: "e.g. ADM:COURSE:MANAGE", required: true },
  { name: "action", label: "Action", type: "select", options: ["VIEW", "CREATE", "UPDATE", "DELETE", "MANAGE", "DECIDE"], required: true },
  { name: "module", label: "Module", placeholder: "e.g. COURSE", required: true },
];

export default function PermissionsPage() {
  const crud = useCrud(PERMISSIONS, "code");

  const columns = [
    { key: "code", header: "Code", render: (r) => <span className="font-mono text-xs">{r.code}</span> },
    { key: "action", header: "Action", render: (r) => <Badge tone="neutral">{r.action}</Badge> },
    { key: "module", header: "Module" },
    { key: "actions", header: "", align: "right", render: (r) => <RowActions onEdit={() => crud.openEdit(r)} onDelete={() => crud.setDeleting(r)} /> },
  ];

  return (
    <div>
      <PageHeader title="Permissions" subtitle="Atomic MODULE:ACTION grants" action={<Button onClick={crud.openNew}><FiPlus /> New permission</Button>} />
      <DataTable columns={columns} rows={crud.rows} rowKey="code" />

      <ResourceModal
        open={crud.editing !== null}
        onClose={crud.closeForm}
        title={crud.editing?.code ? "Edit permission" : "New permission"}
        fields={FIELDS}
        initial={crud.editing}
        onSubmit={crud.save}
      />
      <ConfirmDialog
        open={crud.deleting !== null}
        onClose={() => crud.setDeleting(null)}
        onConfirm={crud.confirmDelete}
        message={`Delete permission "${crud.deleting?.code}"? This cannot be undone.`}
      />
    </div>
  );
}
