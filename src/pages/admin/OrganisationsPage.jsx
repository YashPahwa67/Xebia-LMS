// Organisations — universities and corporate clients.
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge, { statusTone } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RowActions from "@/components/ui/RowActions";
import ResourceModal from "@/components/ui/ResourceModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useCrud } from "@/hooks/useCrud";
import { ORGANISATIONS } from "@/data/adminData";

const FIELDS = [
  { name: "name", label: "Name", placeholder: "Organisation name", required: true },
  { name: "type", label: "Type", type: "select", options: ["UNIVERSITY", "CORPORATE"], required: true },
  { name: "branch", label: "Branch", placeholder: "e.g. Pune" },
  { name: "status", label: "Status", type: "select", options: ["ACTIVE", "INACTIVE"] },
];

export default function OrganisationsPage() {
  const crud = useCrud(ORGANISATIONS, "name");

  const columns = [
    {
      key: "name", header: "Name",
      render: (r) => (
        <span className="flex items-center gap-2 font-medium">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-velvet-soft text-xs font-bold text-velvet">{r.name[0]}</span>
          {r.name}
        </span>
      ),
    },
    { key: "type", header: "Type", render: (r) => <Badge tone="neutral">{r.type}</Badge> },
    { key: "branch", header: "Branch" },
    { key: "status", header: "Status", render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => <RowActions onEdit={() => crud.openEdit(r)} onToggle={() => crud.toggle(r)} onDelete={() => crud.setDeleting(r)} /> },
  ];

  return (
    <div>
      <PageHeader title="Organisations" subtitle="Universities and corporate clients" action={<Button onClick={crud.openNew}><FiPlus /> New</Button>} />
      <DataTable columns={columns} rows={crud.rows} rowKey="name" />

      <ResourceModal open={crud.editing !== null} onClose={crud.closeForm} title={crud.editing?.name ? "Edit organisation" : "New organisation"} fields={FIELDS} initial={crud.editing} onSubmit={crud.save} />
      <ConfirmDialog open={crud.deleting !== null} onClose={() => crud.setDeleting(null)} onConfirm={crud.confirmDelete} message={`Delete "${crud.deleting?.name}"?`} />
    </div>
  );
}
