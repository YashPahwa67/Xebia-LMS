// Admin profile — identity, scopes and reachable modules.
import { FiCamera } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ADMIN_PROFILE, MODULES_REGISTRY } from "@/data/adminData";

function Panel({ title, children }) {
  return (
    <div className="rounded-2xl border border-line bg-white shadow-card dark:border-night-line dark:bg-night-surface">
      <p className="border-b border-line px-5 py-3.5 font-semibold text-ink dark:border-night-line dark:text-white">{title}</p>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between border-b border-line/60 py-2.5 text-sm last:border-0 dark:border-night-line/60">
      <span className="text-muted dark:text-white/50">{label}</span>
      <span className="text-ink dark:text-white/90">{children}</span>
    </div>
  );
}

export default function ProfilePage() {
  const p = ADMIN_PROFILE;
  return (
    <div>
      <PageHeader title="Profile" />

      <div className="mb-4 flex items-center justify-between rounded-2xl border border-line bg-white p-5 shadow-card dark:border-night-line dark:bg-night-surface">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-velvet text-lg font-bold text-white">P</span>
          <div>
            <p className="text-lg font-bold text-ink dark:text-white">{p.name}</p>
            <p className="text-sm text-muted dark:text-white/50">{p.email}</p>
          </div>
        </div>
        <Button variant="outline"><FiCamera /> Photo</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Identity">
          <Row label="User ID"><span className="font-mono text-xs">{p.userId}</span></Row>
          <Row label="Display name">{p.name}</Row>
          <Row label="Email">{p.email}</Row>
          <Row label="Role"><Badge tone="neutral">{p.role}</Badge> <span className="ml-1 text-xs text-emerald-brand">{p.roleNote}</span></Row>
          <Row label="Permission version">{p.permissionVersion}</Row>
        </Panel>

        <Panel title="Scopes">
          <div className="flex flex-wrap gap-2">
            {p.scopes.map((s) => (
              <span key={s} className="rounded bg-emerald-brand/10 px-2 py-1 font-mono text-[11px] text-emerald-brand">{s}</span>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-4">
        <Panel title="Reachable modules">
          <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {MODULES_REGISTRY.map((m) => (
              <div key={m.key} className="flex items-center justify-between border-b border-line/60 py-2 text-sm last:border-0 dark:border-night-line/60">
                <span className="text-ink dark:text-white/90">{m.title}</span>
                <span className="font-mono text-xs text-muted">{m.route}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
