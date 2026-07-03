// My Courses — courses the learner is enrolled in, with progress.
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { MY_COURSES } from "@/data/traineeData";

const FILTERS = ["All", "In Progress", "Completed"];
const TONE = { "IN PROGRESS": "warning", COMPLETED: "success" };

export default function MyCoursesPage() {
  const [filter, setFilter] = useState("All");
  const rows = filter === "All" ? MY_COURSES : MY_COURSES.filter((c) => c.status === filter.toUpperCase());

  const columns = [
    { key: "course", header: "Course", render: (r) => <div><p className="font-medium">{r.course}</p><p className="text-xs text-muted">{r.author}</p></div> },
    { key: "domain", header: "Domain" },
    { key: "progress", header: "Progress", render: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-2 w-24 overflow-hidden rounded-full bg-velvet-soft dark:bg-white/10">
          <div className="h-full rounded-full bg-velvet" style={{ width: `${Math.round((r.completed / r.lectures) * 100)}%` }} />
        </div>
        <span className="text-xs text-muted dark:text-white/60">{r.completed}/{r.lectures}</span>
      </div>
    ) },
    { key: "status", header: "Status", render: (r) => <Badge tone={TONE[r.status] || "muted"}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => (
      <Link to={`/trainee/courses/${encodeURIComponent(r.course)}`} className="inline-flex rounded-lg bg-velvet px-3 py-1.5 text-xs font-semibold text-white hover:bg-velvet-bright">
        {r.status === "COMPLETED" ? "Review" : "Continue"}
      </Link>
    ) },
  ];

  return (
    <div>
      <PageHeader title="My Courses" subtitle="Subjects you are enrolled in, with lecture progress" />

      <div className="mb-5 flex items-center gap-2 text-sm">
        <span className="text-muted">Filter:</span>
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 font-medium transition-colors ${filter === f ? "bg-velvet text-white" : "text-muted hover:bg-velvet-soft hover:text-velvet dark:text-white/60"}`}>{f}</button>
        ))}
      </div>

      <DataTable columns={columns} rows={rows} rowKey="course" paginated pageSize={8} />
    </div>
  );
}
