// Assignments — the learner's tasks with due dates, scores and status.
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { MY_ASSIGNMENTS } from "@/data/traineeData";

const FILTERS = ["All", "Pending", "Graded"];
const TONE = { PENDING: "warning", GRADED: "success" };
// Maps an assignment title to its attemptable test (M07).
const TEST_ID = { "React Hooks Assignment": "react-hooks-quiz", "CI/CD Pipeline Project": "cicd-project" };

export default function AssignmentsPage() {
  const [filter, setFilter] = useState("All");
  const rows = filter === "All" ? MY_ASSIGNMENTS : MY_ASSIGNMENTS.filter((a) => a.status === filter.toUpperCase());

  const columns = [
    { key: "title", header: "Assignment", render: (r) => <div><p className="font-medium">{r.title}</p><p className="text-xs text-muted">{r.course}</p></div> },
    { key: "due", header: "Due" },
    { key: "score", header: "Score" },
    { key: "status", header: "Status", render: (r) => <Badge tone={TONE[r.status] || "muted"}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => (
      r.status === "PENDING" && TEST_ID[r.title] ? (
        <Link to={`/trainee/tests/${TEST_ID[r.title]}/attempt`} className="inline-flex rounded-lg bg-velvet px-3 py-1.5 text-xs font-semibold text-white hover:bg-velvet-bright">Start</Link>
      ) : null
    ) },
  ];

  return (
    <div>
      <PageHeader title="Assignments" subtitle="Tasks assigned across your courses" />

      <div className="mb-5 flex items-center gap-2 text-sm">
        <span className="text-muted">Filter:</span>
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 font-medium transition-colors ${filter === f ? "bg-velvet text-white" : "text-muted hover:bg-velvet-soft hover:text-velvet dark:text-white/60"}`}>{f}</button>
        ))}
      </div>

      <DataTable columns={columns} rows={rows} rowKey="title" paginated pageSize={8} />
    </div>
  );
}
