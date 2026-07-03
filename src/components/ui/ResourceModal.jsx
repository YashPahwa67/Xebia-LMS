// Generic create/edit modal driven by a field config.
// fields: [{ name, label, type?: "text"|"textarea"|"select", options?, placeholder?, required? }]
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default function ResourceModal({ open, onClose, title, fields, initial, onSubmit, submitLabel = "Save" }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setValues(initial || {});
      setErrors({});
    }
  }, [open, initial]);

  const set = (name, v) => setValues((s) => ({ ...s, [name]: v }));

  const handleSave = () => {
    const errs = {};
    fields.forEach((f) => {
      if (f.required && !String(values[f.name] ?? "").trim()) errs[f.name] = `${f.label} is required`;
    });
    if (Object.keys(errs).length) return setErrors(errs);
    onSubmit(values);
    toast.success(`${title.replace(/^(New|Edit)\s/, "")} saved`);
    onClose();
  };

  const inputCls = (name) =>
    `w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 dark:bg-night-bg dark:text-white ${
      errors[name] ? "border-red-400 focus:ring-red-300" : "border-line focus:border-velvet focus:ring-velvet/30 dark:border-night-line"
    }`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>{submitLabel}</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {fields.map((f) => (
          <div key={f.name}>
            <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">{f.label}</label>
            {f.type === "textarea" ? (
              <textarea rows={3} value={values[f.name] || ""} placeholder={f.placeholder} onChange={(e) => set(f.name, e.target.value)} className={inputCls(f.name)} />
            ) : f.type === "select" ? (
              <select value={values[f.name] || ""} onChange={(e) => set(f.name, e.target.value)} className={inputCls(f.name)}>
                <option value="">Select…</option>
                {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input value={values[f.name] || ""} placeholder={f.placeholder} onChange={(e) => set(f.name, e.target.value)} className={inputCls(f.name)} />
            )}
            {errors[f.name] && <p className="mt-1 text-xs text-red-500">{errors[f.name]}</p>}
          </div>
        ))}
      </div>
    </Modal>
  );
}
