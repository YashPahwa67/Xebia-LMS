// Assessments — tests the trainer authors: create, publish, edit, delete.
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiUploadCloud } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RowActions from "@/components/ui/RowActions";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Modal from "@/components/ui/Modal";
import { useCrud } from "@/hooks/useCrud";
import { TRAINER_TESTS } from "@/data/trainerData";

const FILTERS = ["All", "Published", "Draft"];
const TONE = { PUBLISHED: "success", DRAFT: "warning" };
const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

export default function AssessmentsPage() {
  const crud = useCrud(TRAINER_TESTS, "title");
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ title: "", course: "", type: "MCQ", questions: 5 });

  const openNew = () => { setForm({ title: "", course: "", type: "MCQ", questions: 5 }); crud.openNew(); };
  const openEdit = (r) => { setForm({ title: r.title, course: r.course, type: r.type, questions: r.questions }); crud.openEdit(r); };
  const save = () => {
    if (!form.title.trim()) return toast.error("Title is required");
    const isEdit = Boolean(crud.editing?.title);
    crud.save({ title: form.title, course: form.course || "—", type: form.type, questions: Number(form.questions) || 0, status: crud.editing?.status || "DRAFT" });
    toast.success(isEdit ? "Assessment updated" : "Assessment created (draft)");
    crud.closeForm();
  };
  const publish = (r) => { crud.toggle(r, "status", "PUBLISHED", "DRAFT"); toast.success("Assessment published"); };

  const view = filter === "All" ? crud.rows : crud.rows.filter((t) => t.status === filter.toUpperCase());

  const columns = [
    { key: "title", header: "Assessment", render: (r) => <div><p className="font-medium">{r.title}</p><p className="text-xs text-muted">{r.course}</p></div> },
    { key: "type", header: "Type", render: (r) => <Badge tone="neutral">{r.type}</Badge> },
    { key: "questions", header: "Questions" },
    { key: "status", header: "Status", render: (r) => <Badge tone={TONE[r.status] || "muted"}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => (
      <div className="flex items-center justify-end gap-2">
        {r.status === "DRAFT" && (
          <button onClick={() => publish(r)} className="inline-flex items-center gap-1.5 rounded-lg bg-velvet px-3 py-1.5 text-xs font-semibold text-white hover:bg-velvet-bright"><FiUploadCloud /> Publish</button>
        )}
        <RowActions onEdit={() => openEdit(r)} onDelete={() => crud.setDeleting(r)} />
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader title="Assessments" subtitle="Author tests and assign them to batches" action={<Button onClick={openNew}><FiPlus /> New assessment</Button>} />

      <div className="mb-5 flex items-center gap-2 text-sm">
        <span className="text-muted">Filter:</span>
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 font-medium transition-colors ${filter === f ? "bg-velvet text-white" : "text-muted hover:bg-velvet-soft hover:text-velvet dark:text-white/60"}`}>{f}</button>
        ))}
      </div>

      <DataTable columns={columns} rows={view} rowKey="title" paginated pageSize={8} />

      <Modal open={crud.editing !== null} onClose={crud.closeForm} title={crud.editing?.title ? "Edit assessment" : "New assessment"}
        footer={<><Button variant="outline" onClick={crud.closeForm}>Cancel</Button><Button onClick={save}>Save</Button></>}>
        <div className="flex flex-col gap-4">
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} /></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Course</label><input value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className={inputCls} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputCls}><option>MCQ</option><option>THEORETICAL</option><option>MIXED</option></select></div>
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Questions</label><input type="number" min={0} value={form.questions} onChange={(e) => setForm({ ...form, questions: e.target.value })} className={inputCls} /></div>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={crud.deleting !== null} onClose={() => crud.setDeleting(null)} onConfirm={crud.confirmDelete} message={`Delete assessment "${crud.deleting?.title}"?`} />
    </div>
  );
}
