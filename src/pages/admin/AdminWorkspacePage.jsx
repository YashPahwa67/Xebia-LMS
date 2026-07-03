// Reusable "workspace" page for module sections gated by role (Administration, etc.).
import { FiShield } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";

export default function AdminWorkspacePage({ title = "Workspace", route }) {
  return (
    <div>
      <PageHeader title={title} subtitle="Workspace" />
      <div className="grid place-items-center rounded-2xl border border-line bg-white px-6 py-16 text-center shadow-card dark:border-night-line dark:bg-night-surface">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-velvet-soft text-velvet dark:bg-velvet/20 dark:text-velvet-bright">
          <FiShield className="text-xl" />
        </span>
        <h2 className="mt-4 text-lg font-bold text-ink dark:text-white">{title}</h2>
        <p className="mt-1 max-w-md text-sm text-muted dark:text-white/60">
          This is the {title} workspace. The tools for managing this section live here — you&apos;re
          seeing it because your role was granted access to it.
        </p>
        {route && (
          <span className="mt-4 rounded-md bg-canvas px-2 py-1 font-mono text-xs text-muted dark:bg-white/10 dark:text-white/50">
            {route}
          </span>
        )}
      </div>
    </div>
  );
}
