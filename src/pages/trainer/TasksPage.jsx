// Tasks — the trainer's delivery to-dos with completion.
import { useState } from "react";
import toast from "react-hot-toast";
import { FiCheck } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { TRAINER_TASKS } from "@/data/trainerData";

const TONE = { OPEN: "warning", DONE: "success" };

export default function TasksPage() {
  const [rows, setRows] = useState(TRAINER_TASKS);

  const complete = (title) => {
    setRows((prev) => prev.map((t) => (t.title === title ? { ...t, status: "DONE" } : t)));
    toast.success("Task completed");
  };

  const columns = [
    { key: "title", header: "Task", render: (r) => <span className="font-medium">{r.title}</span> },
    { key: "due", header: "Due" },
    { key: "status", header: "Status", render: (r) => <Badge tone={TONE[r.status] || "muted"}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => (
      r.status === "OPEN" ? (
        <button onClick={() => complete(r.title)} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-canvas dark:border-night-line dark:text-white dark:hover:bg-white/10">
          <FiCheck /> Mark done
        </button>
      ) : null
    ) },
  ];

  return (
    <div>
      <PageHeader title="Tasks" subtitle="Your delivery to-dos" />
      <DataTable columns={columns} rows={rows} rowKey="title" paginated pageSize={8} />
    </div>
  );
}
