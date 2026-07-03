// Evaluations — review learner submissions and override AI scores (M04 authoritative).
import { useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { SUBMISSIONS } from "@/data/trainerData";

const TONE = { PENDING_REVIEW: "warning", GRADED: "success" };
const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

export default function EvaluationsPage() {
  const [rows, setRows] = useState(SUBMISSIONS);
  const [editing, setEditing] = useState(null); // submission being overridden
  const [score, setScore] = useState("");
  const [comments, setComments] = useState("");

  const openOverride = (r) => { setEditing(r); setScore(String(r.official ?? r.aiScore)); setComments(""); };

  const save = () => {
    const n = Number(score);
    if (Number.isNaN(n) || n < 0 || n > 100) return toast.error("Enter a score between 0 and 100");
    setRows((prev) => prev.map((s) => (s === editing ? { ...s, official: n, status: "GRADED" } : s)));
    toast.success("Score finalised");
    setEditing(null);
  };

  const columns = [
    { key: "learner", header: "Learner", render: (r) => <div><p className="font-medium">{r.learner}</p><p className="text-xs text-muted">{r.course}</p></div> },
    { key: "test", header: "Assessment" },
    { key: "aiScore", header: "AI score", render: (r) => <span className="tabular-nums">{r.aiScore}</span> },
    { key: "official", header: "Official", render: (r) => r.official != null ? <span className="font-semibold tabular-nums text-velvet dark:text-velvet-bright">{r.official}</span> : <span className="text-muted">—</span> },
    { key: "status", header: "Status", render: (r) => <Badge tone={TONE[r.status] || "muted"}>{r.status === "PENDING_REVIEW" ? "Pending review" : r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => (
      <button onClick={() => openOverride(r)} className="inline-flex rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-canvas dark:border-night-line dark:text-white dark:hover:bg-white/10">
        {r.status === "GRADED" ? "Adjust" : "Review"}
      </button>
    ) },
  ];

  return (
    <div>
      <PageHeader title="Evaluations" subtitle="Review learner submissions; your override is authoritative over AI" />

      <DataTable columns={columns} rows={rows} rowKey="learner" paginated pageSize={8} />

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title="Review submission"
        footer={<><Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button><Button onClick={save}>Finalise</Button></>}
      >
        {editing && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-line/70 bg-canvas p-3.5 text-sm dark:border-night-line/60 dark:bg-night-bg">
              <p className="font-semibold text-ink dark:text-white">{editing.learner}</p>
              <p className="text-xs text-muted dark:text-white/50">{editing.test} · {editing.course}</p>
              <p className="mt-2 text-xs text-muted dark:text-white/60">AI suggested score: <span className="font-semibold text-ink dark:text-white">{editing.aiScore}</span></p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Official score (0–100)</label>
              <input type="number" min={0} max={100} value={score} onChange={(e) => setScore(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Feedback</label>
              <textarea rows={3} value={comments} onChange={(e) => setComments(e.target.value)} className={inputCls} placeholder="Comments for the learner..." />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
