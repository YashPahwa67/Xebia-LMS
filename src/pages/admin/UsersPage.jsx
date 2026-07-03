// Users — invite, activate and manage accounts.
import { FiUserPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge, { statusTone } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RowActions from "@/components/ui/RowActions";
import ResourceModal from "@/components/ui/ResourceModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useCrud } from "@/hooks/useCrud";
import { USERS } from "@/data/adminData";

const FIELDS = [
  { name: "email", label: "Email", placeholder: "name@xebia.lms", required: true },
  { name: "name", label: "Name", placeholder: "Full name", required: true },
  { name: "role", label: "Role", type: "select", options: ["ADMIN", "MANAGER", "ORGANISER", "TRAINER", "LEARNER"], required: true },
  { name: "status", label: "Status", type: "select", options: ["ACTIVE", "INVITED", "SUSPENDED"] },
];

export default function UsersPage() {
  const crud = useCrud(USERS, "email");

  const columns = [
    { key: "email", header: "Email" },
    { key: "name", header: "Name" },
    { key: "role", header: "Role", render: (r) => <Badge tone="neutral">{r.role}</Badge> },
    { key: "status", header: "Status", render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    {
      key: "actions", header: "", align: "right",
      render: (r) => (r.self ? <span className="text-xs text-muted">Your account</span> : <RowActions onEdit={() => crud.openEdit(r)} onToggle={() => crud.toggle(r, "status", "ACTIVE", "SUSPENDED")} onDelete={() => crud.setDeleting(r)} />),
    },
  ];

  return (
    <div>
      <PageHeader title="Users" subtitle="Invite, activate, and manage accounts" action={<Button onClick={crud.openNew}><FiUserPlus /> Invite user</Button>} />
      <DataTable columns={columns} rows={crud.rows} rowKey="email" />

      <ResourceModal open={crud.editing !== null} onClose={crud.closeForm} title={crud.editing?.email ? "Edit user" : "Invite user"} submitLabel={crud.editing?.email ? "Save" : "Invite"} fields={FIELDS} initial={crud.editing} onSubmit={crud.save} />
      <ConfirmDialog open={crud.deleting !== null} onClose={() => crud.setDeleting(null)} onConfirm={crud.confirmDelete} message={`Remove user "${crud.deleting?.email}"?`} />
    </div>
  );
}
