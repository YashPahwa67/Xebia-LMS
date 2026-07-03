// Tickets — learner queries the trainer answers.
import { useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { TRAINER_TICKETS } from "@/data/trainerData";

const TONE = { OPEN: "warning", ANSWERED: "success", CLOSED: "muted" };
const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

export default function TrainerTicketsPage() {
  const [rows, setRows] = useState(TRAINER_TICKETS);
  const [editing, setEditing] = useState(null);
  const [body, setBody] = useState("");

  const answer = () => {
    if (!body.trim()) return toast.error("Write a reply first");
    setRows((prev) => prev.map((t) => (t === editing ? { ...t, status: "ANSWERED" } : t)));
    toast.success("Reply sent");
    setBody("");
    setEditing(null);
  };

  const columns = [
    { key: "subject", header: "Subject", render: (r) => <span className="font-medium">{r.subject}</span> },
    { key: "learner", header: "Learner" },
    { key: "created", header: "Raised" },
    { key: "status", header: "Status", render: (r) => <Badge tone={TONE[r.status] || "muted"}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => (
      r.status === "OPEN" ? (
        <button onClick={() => setEditing(r)} className="inline-flex rounded-lg bg-velvet px-3 py-1.5 text-xs font-semibold text-white hover:bg-velvet-bright">Answer</button>
      ) : null
    ) },
  ];

  return (
    <div>
      <PageHeader title="Tickets" subtitle="Answer questions raised by your learners" />

      <DataTable columns={columns} rows={rows} rowKey="subject" paginated pageSize={8} />

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title="Answer ticket"
        footer={<><Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button><Button onClick={answer}>Send reply</Button></>}
      >
        {editing && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-line/70 bg-canvas p-3.5 text-sm dark:border-night-line/60 dark:bg-night-bg">
              <p className="font-semibold text-ink dark:text-white">{editing.subject}</p>
              <p className="text-xs text-muted dark:text-white/50">{editing.learner} · {editing.created}</p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Reply</label>
              <textarea rows={4} value={body} onChange={(e) => setBody(e.target.value)} className={inputCls} placeholder="Type your answer..." />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
