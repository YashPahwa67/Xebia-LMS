// Users — invite, activate and manage accounts.
import { useState } from "react";
import { FiGrid, FiList, FiUserPlus } from "react-icons/fi";
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

const VIEWS = [
  { key: "table", label: "Table view", icon: FiList },
  { key: "grid", label: "Grid view", icon: FiGrid },
];

function ViewToggle({ view, onChange }) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-line bg-white p-1 dark:border-night-line dark:bg-night-surface">
      {VIEWS.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          title={label}
          aria-label={label}
          onClick={() => onChange(key)}
          className={`grid h-9 w-9 place-items-center rounded-md text-sm transition-colors ${view === key ? "bg-velvet text-white" : "text-muted hover:bg-canvas hover:text-ink dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"}`}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
}

function UsersGrid({ rows, onEdit, onToggle, onDelete }) {
  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-line bg-white px-5 py-10 text-center text-sm text-muted shadow-card dark:border-night-line dark:bg-night-surface dark:text-white/50">
        No records found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {rows.map((user) => (
        <div key={user.email} className="rounded-2xl border border-line bg-white p-5 shadow-card dark:border-night-line dark:bg-night-surface">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-velvet-soft text-sm font-bold text-velvet">{user.role[0]}</span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-ink dark:text-white">{user.name}</p>
                <p className="truncate text-sm text-muted dark:text-white/60">{user.email}</p>
              </div>
            </div>
            <Badge tone={statusTone(user.status)}>{user.status}</Badge>
          </div>

          <div className="mb-5 flex items-center justify-between gap-3 border-t border-line/70 pt-4 dark:border-night-line/60">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted dark:text-white/50">Role</span>
            <Badge tone="neutral">{user.role}</Badge>
          </div>

          {user.self ? (
            <div className="flex justify-end text-xs text-muted dark:text-white/50">Your account</div>
          ) : (
            <RowActions onEdit={() => onEdit(user)} onToggle={() => onToggle(user)} onDelete={() => onDelete(user)} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function UsersPage() {
  const crud = useCrud(USERS, "email");
  const [view, setView] = useState("table");

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
      <PageHeader
        title="Users"
        subtitle="Invite, activate, and manage accounts"
        action={
          <div className="flex items-center gap-3">
            <ViewToggle view={view} onChange={setView} />
            <Button onClick={crud.openNew}><FiUserPlus /> Invite user</Button>
          </div>
        }
      />
      {view === "table" ? (
        <DataTable columns={columns} rows={crud.rows} rowKey="email" />
      ) : (
        <UsersGrid
          rows={crud.rows}
          onEdit={crud.openEdit}
          onToggle={(user) => crud.toggle(user, "status", "ACTIVE", "SUSPENDED")}
          onDelete={crud.setDeleting}
        />
      )}

      <ResourceModal open={crud.editing !== null} onClose={crud.closeForm} title={crud.editing?.email ? "Edit user" : "Invite user"} submitLabel={crud.editing?.email ? "Save" : "Invite"} fields={FIELDS} initial={crud.editing} onSubmit={crud.save} />
      <ConfirmDialog open={crud.deleting !== null} onClose={() => crud.setDeleting(null)} onConfirm={crud.confirmDelete} message={`Remove user "${crud.deleting?.email}"?`} />
    </div>
  );
}
