// Reusable button with brand variants + press/hover motion.
import { motion } from "framer-motion";

const VARIANTS = {
  primary: "bg-velvet text-white hover:bg-velvet-bright",
  dark: "bg-velvet-dark text-white hover:bg-velvet",
  outline:
    "border border-line bg-white text-ink hover:bg-canvas dark:border-night-line dark:bg-night-surface dark:text-white dark:hover:bg-white/10",
  ghost: "text-velvet hover:bg-velvet-soft",
  emerald: "bg-emerald-brand text-white hover:brightness-95",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
  ...rest
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-velvet/50 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
