// Manager profile — identity, oversight summary and console modules.
import { FiCamera } from "react-icons/fi";
import { useSelector } from "react-redux";
import PageHeader from "@/components/common/PageHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MANAGER_OVERVIEW } from "@/data/managerData";

const MODULES = [
  { key: "trainers", title: "Trainers", route: "/manager/trainers" },
  { key: "organisations", title: "Organisations", route: "/manager/organisations" },
  { key: "assignments", title: "Assignments", route: "/manager/assignments" },
  { key: "approvals", title: "Approvals", route: "/manager/approvals" },
  { key: "batches", title: "Batches", route: "/manager/batches" },
];

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

export default function ManagerProfilePage() {
  const user = useSelector((s) => s.auth.user);
  const o = MANAGER_OVERVIEW;
  const name = user?.name || o.manager.name;
  const email = user?.email || o.manager.email;

  return (
    <div>
      <PageHeader title="Profile" />

      <div className="mb-4 flex items-center justify-between rounded-2xl border border-line bg-white p-5 shadow-card dark:border-night-line dark:bg-night-surface">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-velvet text-lg font-bold text-white">M</span>
          <div>
            <p className="text-lg font-bold text-ink dark:text-white">{name}</p>
            <p className="text-sm text-muted dark:text-white/50">{email}</p>
          </div>
        </div>
        <Button variant="outline"><FiCamera /> Photo</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Identity">
          <Row label="Display name">{name}</Row>
          <Row label="Email">{email}</Row>
          <Row label="Role"><Badge tone="neutral">MANAGER</Badge></Row>
          <Row label="Authority">Single approval authority</Row>
        </Panel>

        <Panel title="Oversight summary">
          <Row label="Active trainers">{o.stats[0].value}</Row>
          <Row label="Organisations">{o.stats[1].value}</Row>
          <Row label="Running batches">{o.stats[2].value}</Row>
          <Row label="Pending approvals">{o.stats[3].value}</Row>
        </Panel>
      </div>

      <div className="mt-4">
        <Panel title="Console modules">
          <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {MODULES.map((m) => (
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
