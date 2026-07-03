// New / edit course modal (name, description, lectures, dates, run-days, trainers, batches).
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const BATCH_OPTIONS = ["AI Internship", "Agentic AI vs Generative AI", "Bennett Batch DevOps"];
const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

export default function CourseModal({ open, onClose, initial, onSubmit }) {
  const isEdit = Boolean(initial?.course);
  const [form, setForm] = useState({ course: "", description: "", lectures: 60, start: "", end: "", days: ["Mon", "Wed", "Thu"], batches: [] });

  useEffect(() => {
    if (open)
      setForm({
        course: initial?.course || "", description: initial?.description || "",
        lectures: initial?.lectures || 60, start: initial?.start || "", end: initial?.end || "",
        days: initial?.days ? initial.days.split(", ") : ["Mon", "Wed", "Thu"], batches: initial?.batches || [],
      });
  }, [open, initial]);

  const toggle = (key, v) =>
    setForm((f) => ({ ...f, [key]: f[key].includes(v) ? f[key].filter((x) => x !== v) : [...f[key], v] }));

  const save = () => {
    if (!form.course.trim()) return toast.error("Course name is required");
    onSubmit({
      course: form.course, description: form.description, lectures: Number(form.lectures),
      days: form.days.join(", "), duration: `${form.days.length ? Math.round(form.lectures / form.days.length) : form.lectures}d`,
      author: initial?.author || "GS Dwivedi", status: initial?.status || "PENDING",
    });
    toast.success(isEdit ? "Course updated" : "Course created");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit course" : "New course"}
      footer={<><Button variant="outline" onClick={onClose}>Cancel</Button><Button onClick={save}>{isEdit ? "Save" : "Create"}</Button></>}
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Course name</label>
          <input value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Description</label>
          <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Total lectures</label><input type="number" value={form.lectures} onChange={(e) => setForm({ ...form, lectures: e.target.value })} className={inputCls} /></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Start date</label><input type="date" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} className={inputCls} /></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">End date</label><input type="date" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} className={inputCls} /></div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Runs on</label>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((d) => (
              <button key={d} type="button" onClick={() => toggle("days", d)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${form.days.includes(d) ? "bg-velvet text-white" : "border border-line text-muted dark:border-night-line dark:text-white/60"}`}>
                {d}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Deliver to batches <span className="font-normal text-muted">(their learners get the greeting on approval)</span></label>
          <div className="rounded-lg border border-line dark:border-night-line">
            {BATCH_OPTIONS.map((b) => (
              <label key={b} className="flex cursor-pointer items-center gap-3 border-b border-line/70 px-3.5 py-2.5 text-sm last:border-0 dark:border-night-line/60">
                <input type="checkbox" checked={form.batches.includes(b)} onChange={() => toggle("batches", b)} className="h-4 w-4 accent-velvet" />
                <span className="text-ink dark:text-white/90">{b}</span> <span className="text-xs text-muted">0 learners</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
