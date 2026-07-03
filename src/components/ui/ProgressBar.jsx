// Reusable progress bar (brand velvet fill).
export default function ProgressBar({ value, className = "" }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={`h-2 w-full rounded-full bg-velvet-soft ${className}`}>
      <div
        className="h-full rounded-full bg-velvet transition-[width] duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
