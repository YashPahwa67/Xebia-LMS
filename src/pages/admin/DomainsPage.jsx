// Domains — course / subject taxonomy.
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge, { statusTone } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RowActions from "@/components/ui/RowActions";
import ResourceModal from "@/components/ui/ResourceModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useCrud } from "@/hooks/useCrud";
import { DOMAINS } from "@/data/adminData";

const FIELDS = [
  { name: "code", label: "Code", placeholder: "e.g. REACT", required: true },
  { name: "name", label: "Name", placeholder: "e.g. React.js", required: true },
  { name: "parent", label: "Parent", placeholder: "—" },
  { name: "status", label: "Status", type: "select", options: ["ACTIVE", "INACTIVE"] },
];

export default function DomainsPage() {
  const crud = useCrud(DOMAINS, "code");

  const columns = [
    { key: "code", header: "Code", render: (r) => <span className="font-mono text-xs">{r.code}</span> },
    {
      key: "name", header: "Name",
      render: (r) => (
        <span className="flex items-center gap-2 font-medium">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-velvet-soft text-xs font-bold text-velvet">{r.name[0]}</span>
          {r.name}
        </span>
      ),
    },
    { key: "parent", header: "Parent" },
    { key: "status", header: "Status", render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => <RowActions onEdit={() => crud.openEdit(r)} onToggle={() => crud.toggle(r)} onDelete={() => crud.setDeleting(r)} /> },
  ];

  return (
    <div>
      <PageHeader title="Domains" subtitle="Course / subject taxonomy" action={<Button onClick={crud.openNew}><FiPlus /> New domain</Button>} />
      <DataTable columns={columns} rows={crud.rows} rowKey="code" />

      <ResourceModal open={crud.editing !== null} onClose={crud.closeForm} title={crud.editing?.code ? "Edit domain" : "New domain"} fields={FIELDS} initial={crud.editing} onSubmit={crud.save} />
      <ConfirmDialog open={crud.deleting !== null} onClose={() => crud.setDeleting(null)} onConfirm={crud.confirmDelete} message={`Delete domain "${crud.deleting?.name}"?`} />
    </div>
  );
}
