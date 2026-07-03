// Reusable accordion row with animated expand/collapse (used by FAQ + Contact).
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-xl border border-velvet/70 bg-white shadow-card dark:bg-night-surface">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-ink dark:text-white">
          <span className="text-velvet dark:text-velvet-bright">•</span>
          {item.question}
        </span>
        <span className="text-velvet dark:text-velvet-bright">{isOpen ? <FiMinus /> : <FiPlus />}</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-8 pb-4 text-sm leading-relaxed text-muted dark:text-white/60">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
