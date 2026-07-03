// Reusable outlined text field with floating label + inline error (matches Figma).
import { forwardRef } from "react";

const TextField = forwardRef(function TextField(
  { label, id, type = "text", error, trailing, variant = "floating", className = "", ...rest },
  ref
) {
  const stacked = variant === "stacked";
  return (
    <div className={`relative ${className}`}>
      {stacked && (
        <label htmlFor={id} className="mb-2 block text-base font-bold text-ink dark:text-white">
          {label}
        </label>
      )}
      <div className="relative">
        {!stacked && (
          <label htmlFor={id} className="field-label dark:bg-night-surface dark:text-velvet-bright">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type={type}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-lg border bg-white px-4 py-3.5 text-sm text-ink transition-shadow placeholder:text-muted/60 focus:outline-none focus:ring-2 dark:bg-night-surface dark:text-white dark:placeholder:text-white/40 ${
            trailing ? "pr-11" : ""
          } ${
            error
              ? "border-red-400 focus:ring-red-300"
              : stacked
                ? "border-line focus:border-velvet focus:ring-velvet/30"
                : "border-velvet/70 focus:border-velvet focus:ring-velvet/30"
          }`}
          {...rest}
        />
        {trailing && (
          <div className="absolute inset-y-0 right-3 flex items-center">{trailing}</div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default TextField;
