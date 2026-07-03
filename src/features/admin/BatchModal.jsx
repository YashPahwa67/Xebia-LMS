// New / edit batch modal (matches the reference: name, timings, description, orgs, learners).
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

const ORGS = ["State Technical University", "Thapar University"];
const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

export default function BatchModal({ open, onClose, initial, onSubmit }) {
  const isEdit = Boolean(initial?.batch);
  const [form, setForm] = useState({ batch: "", meta: "", description: "", orgs: [] });

  useEffect(() => {
    if (open) setForm({ batch: initial?.batch || "", meta: initial?.meta || "", description: initial?.description || "", orgs: initial?.org ? [initial.org] : [] });
  }, [open, initial]);

  const toggleOrg = (o) =>
    setForm((f) => ({ ...f, orgs: f.orgs.includes(o) ? f.orgs.filter((x) => x !== o) : [...f.orgs, o] }));

  const save = () => {
    if (!form.batch.trim()) return toast.error("Batch name is required");
    onSubmit({
      batch: form.batch, meta: form.meta, description: form.description,
      org: form.orgs[0] || "—", learners: initial?.learners ?? 0,
      status: initial?.status || "PENDING", createdBy: initial?.createdBy || "trainer@xebia.lms",
    });
    toast.success(isEdit ? "Batch updated" : "Batch created");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit batch" : "New batch"}
      footer={<><Button variant="outline" onClick={onClose}>Cancel</Button><Button onClick={save}>{isEdit ? "Save" : "Create"}</Button></>}
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Batch name</label>
          <input value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value })} className={inputCls} placeholder="e.g. AI Internship" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Duration / timings</label>
          <input value={form.meta} onChange={(e) => setForm({ ...form, meta: e.target.value })} className={inputCls} placeholder="e.g. 6 Months" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} placeholder="What is this batch about?" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">
            Organisations <span className="font-normal text-muted">(a batch can span several)</span>
          </label>
          <div className="rounded-lg border border-line dark:border-night-line">
            {ORGS.map((o) => (
              <label key={o} className="flex cursor-pointer items-center gap-3 border-b border-line/70 px-3.5 py-2.5 text-sm last:border-0 dark:border-night-line/60">
                <input type="checkbox" checked={form.orgs.includes(o)} onChange={() => toggleOrg(o)} className="h-4 w-4 accent-velvet" />
                <span className="text-ink dark:text-white/90">{o}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">
            Add learners now <span className="font-normal text-muted">(optional — you can add later)</span>
          </label>
          <div className="rounded-lg border border-line px-3.5 py-3 text-sm text-muted dark:border-night-line dark:text-white/50">No learners.</div>
        </div>
      </div>
    </Modal>
  );
}
