// Schedule — the learner's weekly live sessions with attendance marking.
import { useState } from "react";
import toast from "react-hot-toast";
import { FiCheck } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { MY_SCHEDULE } from "@/data/traineeData";

const TONE = { ONLINE: "neutral", CLASSROOM: "success" };

export default function SchedulePage() {
  const [attended, setAttended] = useState({});

  const mark = (title) => {
    setAttended((prev) => ({ ...prev, [title]: true }));
    toast.success("Attendance marked");
  };

  const columns = [
    { key: "day", header: "Day" },
    { key: "time", header: "Time" },
    { key: "title", header: "Session", render: (r) => <div><p className="font-medium">{r.title}</p><p className="text-xs text-muted">{r.course}</p></div> },
    { key: "trainer", header: "Trainer" },
    { key: "mode", header: "Mode", render: (r) => <Badge tone={TONE[r.mode] || "muted"}>{r.mode}</Badge> },
    { key: "attendance", header: "", align: "right", render: (r) => (
      attended[r.title] ? (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-brand"><FiCheck /> Present</span>
      ) : (
        <button onClick={() => mark(r.title)} className="inline-flex rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-canvas dark:border-night-line dark:text-white dark:hover:bg-white/10">Mark attendance</button>
      )
    ) },
  ];

  return (
    <div>
      <PageHeader title="Schedule" subtitle="Your upcoming live sessions this week" />
      <DataTable columns={columns} rows={MY_SCHEDULE} rowKey="title" paginated pageSize={8} />
    </div>
  );
}
