// My Courses — author courses (summary/level/version), edit content, publish, archive.
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiUploadCloud, FiLayers, FiArchive } from "react-icons/fi";
import { Link } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RowActions from "@/components/ui/RowActions";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Modal from "@/components/ui/Modal";
import { useCrud } from "@/hooks/useCrud";
import { AUTHORED_COURSES } from "@/data/trainerData";

const FILTERS = ["All", "Published", "Draft", "Archived"];
const TONE = { PUBLISHED: "success", DRAFT: "warning", ARCHIVED: "muted" };
const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

export default function TrainerCoursesPage() {
  const crud = useCrud(AUTHORED_COURSES, "course");
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ course: "", domain: "", summary: "", level: "BEGINNER" });

  const openNew = () => { setForm({ course: "", domain: "", summary: "", level: "BEGINNER" }); crud.openNew(); };
  const openEdit = (r) => { setForm({ course: r.course, domain: r.domain, summary: r.summary || "", level: r.level }); crud.openEdit(r); };
  const save = () => {
    if (!form.course.trim()) return toast.error("Course title is required");
    const editing = crud.editing?.course;
    // A published course edited back to draft bumps the version (content versioning, M04).
    const bump = editing && crud.editing.status === "PUBLISHED";
    crud.save({
      course: form.course, domain: form.domain || "—", summary: form.summary, level: form.level,
      modules: crud.editing?.modules || 1,
      version: bump ? (crud.editing.version + 1) : (crud.editing?.version || 1),
      status: bump ? "DRAFT" : (crud.editing?.status || "DRAFT"),
    });
    toast.success(editing ? "Course updated" : "Course created (draft)");
    crud.closeForm();
  };
  const publish = (r) => { crud.toggle(r, "status", "PUBLISHED", "DRAFT"); toast.success("Course published — version frozen"); };
  const archive = (r) => { crud.toggle(r, "status", "ARCHIVED", "PUBLISHED"); toast.success("Course archived"); };

  const view = filter === "All" ? crud.rows : crud.rows.filter((c) => c.status === filter.toUpperCase());

  const columns = [
    { key: "course", header: "Course", render: (r) => <div><p className="font-medium">{r.course}</p><p className="text-xs text-muted">{r.modules} modules · v{r.version}</p></div> },
    { key: "domain", header: "Domain" },
    { key: "level", header: "Level", render: (r) => <Badge tone="neutral">{r.level}</Badge> },
    { key: "status", header: "Status", render: (r) => <Badge tone={TONE[r.status] || "muted"}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => (
      <div className="flex items-center justify-end gap-2">
        <Link to={`/trainer/courses/${encodeURIComponent(r.course)}`} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-canvas dark:border-night-line dark:text-white dark:hover:bg-white/10"><FiLayers /> Content</Link>
        {r.status === "DRAFT" && <button onClick={() => publish(r)} className="inline-flex items-center gap-1.5 rounded-lg bg-velvet px-3 py-1.5 text-xs font-semibold text-white hover:bg-velvet-bright"><FiUploadCloud /> Publish</button>}
        {r.status === "PUBLISHED" && <button onClick={() => archive(r)} aria-label="Archive" className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted hover:bg-canvas dark:border-night-line dark:text-white/60 dark:hover:bg-white/10"><FiArchive className="text-sm" /></button>}
        <RowActions onEdit={() => openEdit(r)} onDelete={() => crud.setDeleting(r)} />
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader title="My Courses" subtitle="Author courses, edit content, version and publish" action={<Button onClick={openNew}><FiPlus /> New course</Button>} />

      <div className="mb-5 flex items-center gap-2 text-sm">
        <span className="text-muted">Filter:</span>
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 font-medium transition-colors ${filter === f ? "bg-velvet text-white" : "text-muted hover:bg-velvet-soft hover:text-velvet dark:text-white/60"}`}>{f}</button>
        ))}
      </div>

      <DataTable columns={columns} rows={view} rowKey="course" paginated pageSize={8} />

      <Modal open={crud.editing !== null} onClose={crud.closeForm} title={crud.editing?.course ? "Edit course" : "New course"}
        footer={<><Button variant="outline" onClick={crud.closeForm}>Cancel</Button><Button onClick={save}>Save</Button></>}>
        <div className="flex flex-col gap-4">
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Course title</label><input value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className={inputCls} /></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Summary</label><textarea rows={2} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} className={inputCls} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Domain</label><input value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })} className={inputCls} placeholder="e.g. Full Stack" /></div>
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Level</label>
              <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className={inputCls}>{LEVELS.map((l) => <option key={l}>{l}</option>)}</select></div>
          </div>
          {crud.editing?.status === "PUBLISHED" && <p className="text-xs text-cta-orange">Editing a published course creates a new draft version (v{(crud.editing.version || 1) + 1}).</p>}
        </div>
      </Modal>

      <ConfirmDialog open={crud.deleting !== null} onClose={() => crud.setDeleting(null)} onConfirm={crud.confirmDelete} message={`Delete course "${crud.deleting?.course}"?`} />
    </div>
  );
}
