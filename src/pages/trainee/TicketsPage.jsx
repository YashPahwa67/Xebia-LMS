// Tickets — queries the learner raises to trainers, with status tracking.
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { MY_TICKETS } from "@/data/traineeData";

const TONE = { OPEN: "warning", ANSWERED: "success", CLOSED: "muted" };
const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

export default function TicketsPage() {
  const [rows, setRows] = useState(MY_TICKETS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ subject: "", body: "" });

  const submit = () => {
    if (!form.subject.trim()) return toast.error("Subject is required");
    setRows((prev) => [
      { subject: form.subject, trainer: "Trainer", status: "OPEN", created: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
      ...prev,
    ]);
    toast.success("Ticket raised");
    setForm({ subject: "", body: "" });
    setOpen(false);
  };

  const columns = [
    { key: "subject", header: "Subject", render: (r) => <span className="font-medium">{r.subject}</span> },
    { key: "trainer", header: "Trainer" },
    { key: "created", header: "Raised" },
    { key: "status", header: "Status", render: (r) => <Badge tone={TONE[r.status] || "muted"}>{r.status}</Badge> },
  ];

  return (
    <div>
      <PageHeader title="Tickets" subtitle="Raise questions to your trainers and track responses" action={<Button onClick={() => setOpen(true)}><FiPlus /> Raise ticket</Button>} />

      <DataTable columns={columns} rows={rows} rowKey="subject" empty="No tickets yet." paginated pageSize={8} />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Raise a ticket"
        footer={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={submit}>Submit</Button></>}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Subject</label>
            <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls} placeholder="Short summary of your query" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Details</label>
            <textarea rows={4} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className={inputCls} placeholder="Describe your question..." />
          </div>
        </div>
      </Modal>
    </div>
  );
}
