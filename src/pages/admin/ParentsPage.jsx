// Parents — categories that domains belong to.
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge, { statusTone } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RowActions from "@/components/ui/RowActions";
import ResourceModal from "@/components/ui/ResourceModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useCrud } from "@/hooks/useCrud";
import { PARENTS } from "@/data/adminData";

const FIELDS = [
  { name: "name", label: "Name", placeholder: "e.g. DevOps", required: true },
  { name: "icon", label: "Icon", placeholder: "—" },
  { name: "status", label: "Status", type: "select", options: ["ACTIVE", "INACTIVE"] },
];

export default function ParentsPage() {
  const crud = useCrud(PARENTS, "name");

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
    { key: "icon", header: "Icon" },
    { key: "status", header: "Status", render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => <RowActions onEdit={() => crud.openEdit(r)} onToggle={() => crud.toggle(r)} onDelete={() => crud.setDeleting(r)} /> },
  ];

  return (
    <div>
      <PageHeader title="Parents" subtitle="Categories that domains belong to" action={<Button onClick={crud.openNew}><FiPlus /> New parent</Button>} />
      <DataTable columns={columns} rows={crud.rows} rowKey="name" />

      <ResourceModal open={crud.editing !== null} onClose={crud.closeForm} title={crud.editing?.name ? "Edit parent" : "New parent"} fields={FIELDS} initial={crud.editing} onSubmit={crud.save} />
      <ConfirmDialog open={crud.deleting !== null} onClose={() => crud.setDeleting(null)} onConfirm={crud.confirmDelete} message={`Delete "${crud.deleting?.name}"?`} />
    </div>
  );
}
