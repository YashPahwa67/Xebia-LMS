// Reusable status/label pill with semantic tones.
const TONES = {
  neutral: "bg-velvet-soft text-velvet dark:bg-velvet/20 dark:text-velvet-bright",
  success: "bg-emerald-brand/10 text-emerald-brand",
  warning: "bg-cta-orange/10 text-cta-orange",
  danger: "bg-red-500/10 text-red-500",
  muted: "bg-black/5 text-muted dark:bg-white/10 dark:text-white/60",
};

export default function Badge({ children, tone = "neutral", className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

// Map common status strings to a tone.
export function statusTone(status = "") {
  const s = status.toUpperCase();
  if (["ACTIVE", "APPROVED", "PAID"].includes(s)) return "success";
  if (["PENDING", "PENDING APPROVAL", "IN PREP"].includes(s)) return "warning";
  if (["REJECTED", "SUSPENDED", "INACTIVE"].includes(s)) return "danger";
  return "muted";
}
