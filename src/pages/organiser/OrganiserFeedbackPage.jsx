// Feedback — organiser gives trainer feedback, routed to trainer + Manager (M03 — trainer_feedback).
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiStar } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { ORG_FEEDBACK, ORG_TRAINERS, ORG_BATCHES } from "@/data/organiserData";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

function Stars({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onChange?.(n)} aria-label={`${n} stars`}>
          <FiStar className={`text-xl ${n <= value ? "fill-cta-orange text-cta-orange" : "text-line dark:text-night-line"}`} />
        </button>
      ))}
    </div>
  );
}

export default function OrganiserFeedbackPage() {
  const [rows, setRows] = useState(ORG_FEEDBACK);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ trainer: ORG_TRAINERS[0], batch: ORG_BATCHES[0], rating: 5, notes: "" });

  const submit = () => {
    if (!form.notes.trim()) return toast.error("Add feedback notes");
    setRows((prev) => [
      { id: `f${Date.now()}`, trainer: form.trainer, batch: form.batch, rating: form.rating, notes: form.notes, created: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
      ...prev,
    ]);
    toast.success("Feedback routed to trainer & Manager");
    setForm({ trainer: ORG_TRAINERS[0], batch: ORG_BATCHES[0], rating: 5, notes: "" });
    setOpen(false);
  };

  const columns = [
    { key: "trainer", header: "Trainer", render: (r) => <span className="font-medium">{r.trainer}</span> },
    { key: "batch", header: "Batch" },
    { key: "rating", header: "Rating", render: (r) => <Stars value={r.rating} /> },
    { key: "notes", header: "Notes", render: (r) => <span className="text-sm text-ink/80 dark:text-white/70">{r.notes}</span> },
    { key: "created", header: "Given" },
  ];

  return (
    <div>
      <PageHeader title="Feedback" subtitle="Rate trainers — feedback is routed to the trainer and the Manager" action={<Button onClick={() => setOpen(true)}><FiPlus /> Give feedback</Button>} />

      <DataTable columns={columns} rows={rows} rowKey="id" paginated pageSize={8} />

      <Modal open={open} onClose={() => setOpen(false)} title="Trainer feedback"
        footer={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={submit}>Submit</Button></>}>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Trainer</label>
              <select value={form.trainer} onChange={(e) => setForm({ ...form, trainer: e.target.value })} className={inputCls}>{ORG_TRAINERS.map((t) => <option key={t}>{t}</option>)}</select></div>
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Batch</label>
              <select value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value })} className={inputCls}>{ORG_BATCHES.map((b) => <option key={b}>{b}</option>)}</select></div>
          </div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Rating</label><Stars value={form.rating} onChange={(n) => setForm({ ...form, rating: n })} /></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Notes</label><textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inputCls} /></div>
        </div>
      </Modal>
    </div>
  );
}
