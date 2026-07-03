// Reusable textarea with stacked label + inline error.
import { forwardRef } from "react";

const TextArea = forwardRef(function TextArea(
  { label, id, error, rows = 5, className = "", ...rest },
  ref
) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-base font-bold text-ink dark:text-white">
        {label}
      </label>
      <textarea
        id={id}
        ref={ref}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full resize-y rounded-lg border bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 dark:bg-night-surface dark:text-white dark:placeholder:text-white/40 ${
          error ? "border-red-400 focus:ring-red-300" : "border-line focus:border-velvet focus:ring-velvet/30"
        }`}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default TextArea;
