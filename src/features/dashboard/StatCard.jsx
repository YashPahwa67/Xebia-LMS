// Reusable stat card (icon + value + label).
import { FiBook, FiCheckCircle, FiPlayCircle, FiAward } from "react-icons/fi";

const ICONS = { book: FiBook, check: FiCheckCircle, play: FiPlayCircle, trophy: FiAward };
const TINTS = {
  velvet: "bg-velvet-soft text-velvet",
  emerald: "bg-emerald-brand/10 text-emerald-brand",
  orange: "bg-cta-orange/10 text-cta-orange",
};

export default function StatCard({ value, label, icon, tint }) {
  const Icon = ICONS[icon] ?? FiBook;
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${TINTS[tint]}`}>
        <Icon className="text-lg" />
      </span>
      <div>
        <p className="text-2xl font-bold leading-none text-ink">{value}</p>
        <p className="mt-1 text-sm text-muted">{label}</p>
      </div>
    </div>
  );
}
