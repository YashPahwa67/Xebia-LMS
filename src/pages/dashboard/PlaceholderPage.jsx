// Reusable "coming soon" page for dashboard sections not built yet.
import DashboardTopbar from "@/components/layout/DashboardTopbar";

export default function PlaceholderPage({ title }) {
  return (
    <div>
      <DashboardTopbar />
      <div className="grid place-items-center rounded-2xl bg-white p-16 text-center shadow-card">
        <div className="text-4xl">🚧</div>
        <h2 className="mt-3 text-xl font-bold text-ink">{title}</h2>
        <p className="mt-1 text-sm text-muted">This section is coming soon.</p>
      </div>
    </div>
  );
}
