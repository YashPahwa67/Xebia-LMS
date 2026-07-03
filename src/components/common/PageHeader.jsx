// Reusable page header — title, subtitle, and an optional right-side action.
export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-ink dark:text-white">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted dark:text-white/60">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
