// Reusable table row action icons (edit / toggle / delete).
import { FiEdit2, FiPower, FiTrash2 } from "react-icons/fi";

function IconBtn({ icon: Icon, label, tone = "muted", onClick }) {
  const tones = {
    muted: "border-line text-muted hover:bg-canvas dark:border-night-line dark:text-white/60 dark:hover:bg-white/10",
    danger: "border-red-300 text-red-500 hover:bg-red-50 dark:border-red-500/40 dark:hover:bg-red-500/10",
  };
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`grid h-8 w-8 place-items-center rounded-lg border transition-colors ${tones[tone]}`}
    >
      <Icon className="text-sm" />
    </button>
  );
}

export default function RowActions({ onEdit, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-end gap-2">
      {onEdit && <IconBtn icon={FiEdit2} label="Edit" onClick={onEdit} />}
      {onToggle && <IconBtn icon={FiPower} label="Toggle status" tone="danger" onClick={onToggle} />}
      {onDelete && <IconBtn icon={FiTrash2} label="Delete" tone="danger" onClick={onDelete} />}
    </div>
  );
}
