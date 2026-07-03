// Feedback — trainer→learner qualitative feedback (M04 — learner_feedback).
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { LEARNER_FEEDBACK, TRAINER_ROSTERS } from "@/data/trainerData";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

const BATCHES = Object.keys(TRAINER_ROSTERS);

export default function FeedbackPage() {
  const [rows, setRows] = useState(LEARNER_FEEDBACK);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ learner: "", batch: BATCHES[0], notes: "" });

  const learners = TRAINER_ROSTERS[form.batch] || [];

  const submit = () => {
    if (!form.learner) return toast.error("Pick a learner");
    if (!form.notes.trim()) return toast.error("Write your feedback");
    setRows((prev) => [
      { learner: form.learner, batch: form.batch, notes: form.notes, created: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
      ...prev,
    ]);
    toast.success("Feedback sent to learner");
    setForm({ learner: "", batch: BATCHES[0], notes: "" });
    setOpen(false);
  };

  const columns = [
    { key: "learner", header: "Learner", render: (r) => <span className="font-medium">{r.learner}</span> },
    { key: "batch", header: "Batch" },
    { key: "notes", header: "Feedback", render: (r) => <span className="text-sm text-ink/80 dark:text-white/70">{r.notes}</span> },
    { key: "created", header: "Given" },
  ];

  return (
    <div>
      <PageHeader title="Feedback" subtitle="Give qualitative feedback to your learners" action={<Button onClick={() => setOpen(true)}><FiPlus /> Give feedback</Button>} />

      <DataTable columns={columns} rows={rows} rowKey="learner" paginated pageSize={8} empty="No feedback given yet." />

      <Modal open={open} onClose={() => setOpen(false)} title="Give learner feedback"
        footer={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={submit}>Send</Button></>}>
        <div className="flex flex-col gap-4">
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Batch</label>
            <select value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value, learner: "" })} className={inputCls}>{BATCHES.map((b) => <option key={b}>{b}</option>)}</select></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Learner</label>
            <select value={form.learner} onChange={(e) => setForm({ ...form, learner: e.target.value })} className={inputCls}>
              <option value="">Select a learner…</option>
              {learners.map((l) => <option key={l.email}>{l.learner}</option>)}
            </select></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Feedback</label>
            <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inputCls} placeholder="Strengths, areas to improve…" /></div>
        </div>
      </Modal>
    </div>
  );
}
