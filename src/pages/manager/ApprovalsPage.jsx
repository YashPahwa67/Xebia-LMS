// Approvals — the single manager decision queue: approve / reject / hold (M02, BR-G2).
import { useState } from "react";
import toast from "react-hot-toast";
import { FiCheck, FiX, FiPauseCircle } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { MGR_APPROVALS } from "@/data/managerData";

const FILTERS = ["Pending", "Approved", "Rejected", "Held", "All"];
const TONE = { PENDING: "warning", APPROVED: "success", REJECTED: "danger", HELD: "muted" };

export default function ApprovalsPage() {
  const [rows, setRows] = useState(MGR_APPROVALS);
  const [filter, setFilter] = useState("Pending");

  const decide = (title, status, verb) => {
    setRows((prev) => prev.map((a) => (a.title === title ? { ...a, status } : a)));
    toast.success(verb);
  };

  const view = filter === "All" ? rows : rows.filter((a) => a.status === filter.toUpperCase());

  const columns = [
    { key: "title", header: "Request", render: (r) => <div><p className="font-medium">{r.title}</p><p className="text-xs text-muted">{r.by} · {r.batch}</p></div> },
    { key: "type", header: "Type", render: (r) => <Badge tone="neutral">{r.type}</Badge> },
    { key: "when", header: "When" },
    { key: "status", header: "Status", render: (r) => <Badge tone={TONE[r.status] || "muted"}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => (
      r.status === "PENDING" ? (
        <div className="flex items-center justify-end gap-2">
          <button onClick={() => decide(r.title, "APPROVED", "Approved")} aria-label="Approve" className="inline-flex items-center gap-1 rounded-lg bg-emerald-brand px-2.5 py-1.5 text-xs font-semibold text-white hover:brightness-95"><FiCheck /> Approve</button>
          <button onClick={() => decide(r.title, "HELD", "Put on hold — slot released")} aria-label="Hold" className="grid h-7 w-7 place-items-center rounded-lg border border-line text-muted hover:bg-canvas dark:border-night-line dark:text-white/60 dark:hover:bg-white/10"><FiPauseCircle /></button>
          <button onClick={() => decide(r.title, "REJECTED", "Rejected — slot released")} aria-label="Reject" className="grid h-7 w-7 place-items-center rounded-lg border border-red-300 text-red-500 hover:bg-red-50 dark:border-red-500/40 dark:hover:bg-red-500/10"><FiX /></button>
        </div>
      ) : null
    ) },
  ];

  return (
    <div>
      <PageHeader title="Approvals" subtitle="The single decision queue — approve, hold or reject delivery requests" />

      <div className="mb-5 flex items-center gap-2 text-sm">
        <span className="text-muted">Filter:</span>
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 font-medium transition-colors ${filter === f ? "bg-velvet text-white" : "text-muted hover:bg-velvet-soft hover:text-velvet dark:text-white/60"}`}>{f}</button>
        ))}
      </div>

      <DataTable columns={columns} rows={view} rowKey="title" paginated pageSize={8} empty="No requests in this state." />
    </div>
  );
}
