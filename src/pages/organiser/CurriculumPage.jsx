// Curriculum — assign a published course version to a batch; activate/complete (M03 — course_assignment).
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { ORG_CURRICULUM, ORG_BATCHES, PUBLISHED_COURSES } from "@/data/organiserData";

const TONE = { ASSIGNED: "warning", ACTIVE: "success", COMPLETED: "muted" };
const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

export default function CurriculumPage() {
  const [rows, setRows] = useState(ORG_CURRICULUM);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ batch: ORG_BATCHES[0], course: PUBLISHED_COURSES[0].course, startsOn: "" });

  const setStatus = (id, status, msg) => { setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r))); toast.success(msg); };

  const assign = () => {
    const course = PUBLISHED_COURSES.find((c) => c.course === form.course);
    if (rows.some((r) => r.batch === form.batch && r.course === form.course)) return toast.error("That course is already assigned to this batch");
    setRows((prev) => [
      { id: `ca${Date.now()}`, batch: form.batch, course: form.course, version: course.version, startsOn: form.startsOn || "—", status: "ASSIGNED" },
      ...prev,
    ]);
    toast.success("Course assigned — learners will see it");
    setOpen(false);
  };

  const columns = [
    { key: "batch", header: "Batch", render: (r) => <span className="font-medium">{r.batch}</span> },
    { key: "course", header: "Course", render: (r) => <div><p>{r.course}</p><p className="text-xs text-muted">v{r.version} · from {r.startsOn}</p></div> },
    { key: "status", header: "Status", render: (r) => <Badge tone={TONE[r.status] || "muted"}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => (
      <div className="flex items-center justify-end gap-2">
        {r.status === "ASSIGNED" && <button onClick={() => setStatus(r.id, "ACTIVE", "Curriculum activated")} className="rounded-lg bg-velvet px-3 py-1.5 text-xs font-semibold text-white hover:bg-velvet-bright">Activate</button>}
        {r.status === "ACTIVE" && <button onClick={() => setStatus(r.id, "COMPLETED", "Marked complete")} className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-canvas dark:border-night-line dark:text-white dark:hover:bg-white/10">Complete</button>}
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader title="Curriculum" subtitle="Assign published courses to batches as their curriculum" action={<Button onClick={() => { setForm({ batch: ORG_BATCHES[0], course: PUBLISHED_COURSES[0].course, startsOn: "" }); setOpen(true); }}><FiPlus /> Assign course</Button>} />

      <DataTable columns={columns} rows={rows} rowKey="id" paginated pageSize={8} />

      <Modal open={open} onClose={() => setOpen(false)} title="Assign course to batch"
        footer={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={assign}>Assign</Button></>}>
        <div className="flex flex-col gap-4">
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Batch</label>
            <select value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value })} className={inputCls}>{ORG_BATCHES.map((b) => <option key={b}>{b}</option>)}</select></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Published course</label>
            <select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className={inputCls}>{PUBLISHED_COURSES.map((c) => <option key={c.course}>{c.course}</option>)}</select>
            <p className="mt-1 text-xs text-muted">Version pinned: v{PUBLISHED_COURSES.find((c) => c.course === form.course)?.version}</p></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Starts on</label>
            <input type="date" value={form.startsOn} onChange={(e) => setForm({ ...form, startsOn: e.target.value })} className={inputCls} /></div>
        </div>
      </Modal>
    </div>
  );
}
