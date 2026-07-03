// Courses — subjects delivered by trainers, with approval.
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge, { statusTone } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RowActions from "@/components/ui/RowActions";
import ApprovalRequests from "@/components/common/ApprovalRequests";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import CourseModal from "@/features/admin/CourseModal";
import { useCrud } from "@/hooks/useCrud";
import { COURSES } from "@/data/adminData";

const FILTERS = ["All", "Pending", "Approved", "Rejected"];

export default function CoursesPage() {
  const crud = useCrud(COURSES, "course");
  const [filter, setFilter] = useState("All");

  const rows = filter === "All" ? crud.rows : crud.rows.filter((c) => c.status === filter.toUpperCase());
  const requests = crud.rows.filter((c) => c.status === "PENDING").map((c) => ({ title: c.course, by: c.author }));

  const columns = [
    { key: "course", header: "Course", render: (r) => <div><p className="font-medium">{r.course}</p><p className="text-xs text-muted">{r.author}</p></div> },
    { key: "days", header: "Days" },
    { key: "duration", header: "Duration" },
    { key: "lectures", header: "Lectures" },
    { key: "status", header: "Status", render: (r) => <Badge tone={statusTone(r.status)}>{r.status === "PENDING" ? "Pending approval" : r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => <RowActions onEdit={() => crud.openEdit(r)} onToggle={() => crud.toggle(r, "status", "APPROVED", "PENDING")} onDelete={() => crud.setDeleting(r)} /> },
  ];

  return (
    <div>
      <PageHeader title="Courses" subtitle="Subjects delivered by trainers, with approval" action={<Button onClick={crud.openNew}><FiPlus /> New course</Button>} />

      <div className="mb-5 flex items-center gap-2 text-sm">
        <span className="text-muted">Filter:</span>
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 font-medium transition-colors ${filter === f ? "bg-velvet text-white" : "text-muted hover:bg-velvet-soft hover:text-velvet dark:text-white/60"}`}>{f}</button>
        ))}
      </div>

      <ApprovalRequests requests={requests} />
      <DataTable columns={columns} rows={rows} rowKey="course" />

      <CourseModal open={crud.editing !== null} onClose={crud.closeForm} initial={crud.editing} onSubmit={crud.save} />
      <ConfirmDialog open={crud.deleting !== null} onClose={() => crud.setDeleting(null)} onConfirm={crud.confirmDelete} message={`Delete course "${crud.deleting?.course}"?`} />
    </div>
  );
}
