// Trainer profile — identity, teaching summary and workspace modules.
import { FiCamera } from "react-icons/fi";
import { useSelector } from "react-redux";
import PageHeader from "@/components/common/PageHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { TRAINER_OVERVIEW } from "@/data/trainerData";

const MODULES = [
  { key: "courses", title: "My Courses", route: "/trainer/courses" },
  { key: "assessments", title: "Assessments", route: "/trainer/assessments" },
  { key: "evaluations", title: "Evaluations", route: "/trainer/evaluations" },
  { key: "batches", title: "My Batches", route: "/trainer/batches" },
  { key: "schedule", title: "Schedule", route: "/trainer/schedule" },
  { key: "tickets", title: "Tickets", route: "/trainer/tickets" },
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

export default function TrainerProfilePage() {
  const user = useSelector((s) => s.auth.user);
  const o = TRAINER_OVERVIEW;
  const name = user?.name || o.trainer.name;
  const email = user?.email || o.trainer.email;

  return (
    <div>
      <PageHeader title="Profile" />

      <div className="mb-4 flex items-center justify-between rounded-2xl border border-line bg-white p-5 shadow-card dark:border-night-line dark:bg-night-surface">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-velvet text-lg font-bold text-white">T</span>
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
          <Row label="Role"><Badge tone="neutral">TRAINER</Badge></Row>
          <Row label="Domain">{o.trainer.domain}</Row>
        </Panel>

        <Panel title="Teaching summary">
          <Row label="Authored courses">{o.stats[0].value}</Row>
          <Row label="Published">{o.stats[1].value}</Row>
          <Row label="Assigned batches">{o.stats[2].value}</Row>
          <Row label="Learners taught">{o.learnersTaught}</Row>
          <Row label="Trainer rating">{o.ratingPct}%</Row>
        </Panel>
      </div>

      <div className="mt-4">
        <Panel title="Workspace modules">
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
