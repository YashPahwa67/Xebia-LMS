// Roles & Grants — roles list + module/submodule grant matrix (M01 RBAC).
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RowActions from "@/components/ui/RowActions";
import ResourceModal from "@/components/ui/ResourceModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useCrud } from "@/hooks/useCrud";
import { ROLES, MODULES_REGISTRY } from "@/data/adminData";

const FIELDS = [
  { name: "name", label: "Role name", placeholder: "e.g. REVIEWER", required: true },
  { name: "note", label: "Description", type: "textarea", placeholder: "What this role can do" },
];

// Seed grants: every non-admin role starts with a couple of modules granted.
const seedGrants = () =>
  Object.fromEntries(
    ROLES.map((r) => [r.name, Object.fromEntries(MODULES_REGISTRY.map((m, i) => [m.key, r.name !== "ADMIN" && i < 2]))])
  );

function Panel({ children, className = "" }) {
  return <div className={`rounded-2xl border border-line bg-white shadow-card dark:border-night-line dark:bg-night-surface ${className}`}>{children}</div>;
}

export default function RolesGrantsPage() {
  const crud = useCrud(ROLES, "name");
  const [roleToGrant, setRoleToGrant] = useState("ADMIN");
  const [grants, setGrants] = useState(seedGrants);
  const isAdmin = roleToGrant === "ADMIN";

  const saveRole = (values) => {
    crud.save(values);
    setGrants((g) => (g[values.name] ? g : { ...g, [values.name]: Object.fromEntries(MODULES_REGISTRY.map((m) => [m.key, false])) }));
  };
  const toggleGrant = (moduleKey) => {
    setGrants((g) => ({ ...g, [roleToGrant]: { ...g[roleToGrant], [moduleKey]: !g[roleToGrant]?.[moduleKey] } }));
    toast.success("Grant updated");
  };

  return (
    <div>
      <PageHeader title="Roles & Grants" subtitle="Create roles and grant modules & submodules to them" />

      <Panel className="mb-6">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5 dark:border-night-line">
          <p className="font-semibold text-ink dark:text-white">Roles</p>
          <Button onClick={crud.openNew}><FiPlus /> New role</Button>
        </div>
        <ul>
          {crud.rows.map((r) => (
            <li key={r.name} className="flex items-center justify-between border-b border-line/70 px-5 py-3.5 last:border-0 dark:border-night-line/60">
              <div>
                <p className="flex items-center gap-2 font-semibold text-ink dark:text-white">
                  {r.name}
                  {r.tag && <Badge tone="muted">{r.tag}</Badge>}
                  {r.badge && <Badge tone="neutral">{r.badge}</Badge>}
                </p>
                <p className="text-xs text-muted dark:text-white/50">{r.note}</p>
              </div>
              {r.name === "ADMIN" ? <span className="text-xs text-muted">System role</span> : <RowActions onEdit={() => crud.openEdit(r)} onDelete={() => crud.setDeleting(r)} />}
            </li>
          ))}
        </ul>
      </Panel>

      {/* Grant editor */}
      <label className="mb-2 block text-sm font-semibold text-ink dark:text-white">Role to grant</label>
      <select
        value={roleToGrant}
        onChange={(e) => setRoleToGrant(e.target.value)}
        className="mb-4 w-full max-w-md rounded-lg border border-line bg-white px-4 py-2.5 text-sm focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-surface dark:text-white"
      >
        {crud.rows.map((r) => (
          <option key={r.name} value={r.name}>{r.name}</option>
        ))}
      </select>

      <Panel>
        <p className="border-b border-line px-5 py-3.5 font-semibold text-ink dark:border-night-line dark:text-white">Modules &amp; submodules</p>
        {isAdmin && (
          <p className="border-b border-line bg-canvas px-5 py-3 text-sm text-muted dark:border-night-line dark:bg-white/5 dark:text-white/60">
            <span className="font-semibold text-ink dark:text-white">ADMIN</span> is a super-admin role — it holds every module and submodule automatically, so grants can&apos;t be changed here.
          </p>
        )}
        <ul>
          {MODULES_REGISTRY.map((m) => {
            const granted = isAdmin || Boolean(grants[roleToGrant]?.[m.key]);
            return (
              <li key={m.key} className="flex items-center justify-between border-b border-line/70 px-5 py-3.5 last:border-0 dark:border-night-line/60">
                <div>
                  <p className="font-medium text-ink dark:text-white">{m.title} <span className="ml-1 text-xs text-muted">{m.key}</span></p>
                  <p className="text-xs text-muted dark:text-white/50">{m.route}</p>
                </div>
                <label className="flex items-center gap-2 text-sm text-muted dark:text-white/60">
                  <input type="checkbox" checked={granted} disabled={isAdmin} onChange={() => toggleGrant(m.key)} className="h-4 w-4 accent-velvet" />
                  Granted
                </label>
              </li>
            );
          })}
        </ul>
      </Panel>

      <ResourceModal open={crud.editing !== null} onClose={crud.closeForm} title={crud.editing?.name ? "Edit role" : "New role"} fields={FIELDS} initial={crud.editing} onSubmit={saveRole} />
      <ConfirmDialog open={crud.deleting !== null} onClose={() => crud.setDeleting(null)} onConfirm={crud.confirmDelete} message={`Delete role "${crud.deleting?.name}"?`} />
    </div>
  );
}
