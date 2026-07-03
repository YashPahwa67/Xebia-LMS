// Tests — create/assign tests and view results (M03 TestFacade → Assessment M07).
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { ORG_TESTS, ORG_BATCHES } from "@/data/organiserData";

const TONE = { PUBLISHED: "success", DRAFT: "warning" };
const COURSES = ["DevOps & Cloud Foundations", "React.js Essentials", "Java Full Stack", "Agentic AI Patterns"];
const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

export default function OrganiserTestsPage() {
  const [rows, setRows] = useState(ORG_TESTS);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState(null);
  const [form, setForm] = useState({ title: "", course: COURSES[0], batch: ORG_BATCHES[0], questions: 10 });

  const create = () => {
    if (!form.title.trim()) return toast.error("Test title is required");
    setRows((prev) => [{ id: `t${Date.now()}`, title: form.title, course: form.course, batch: form.batch, questions: Number(form.questions) || 0, status: "PUBLISHED", avgScore: null, submissions: 0 }, ...prev]);
    toast.success("Test created & assigned to batch");
    setForm({ title: "", course: COURSES[0], batch: ORG_BATCHES[0], questions: 10 });
    setOpen(false);
  };

  const columns = [
    { key: "title", header: "Test", render: (r) => <div><p className="font-medium">{r.title}</p><p className="text-xs text-muted">{r.course} · {r.batch}</p></div> },
    { key: "questions", header: "Qs" },
    { key: "submissions", header: "Submissions" },
    { key: "status", header: "Status", render: (r) => <Badge tone={TONE[r.status] || "muted"}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => (
      <button onClick={() => setResults(r)} className="inline-flex rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-canvas dark:border-night-line dark:text-white dark:hover:bg-white/10">Results</button>
    ) },
  ];

  return (
    <div>
      <PageHeader title="Tests" subtitle="Create tests, assign to batches and view results" action={<Button onClick={() => setOpen(true)}><FiPlus /> New test</Button>} />

      <DataTable columns={columns} rows={rows} rowKey="id" paginated pageSize={8} />

      <Modal open={open} onClose={() => setOpen(false)} title="Create & assign test"
        footer={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={create}>Create</Button></>}>
        <div className="flex flex-col gap-4">
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Course</label>
              <select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className={inputCls}>{COURSES.map((c) => <option key={c}>{c}</option>)}</select></div>
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Batch</label>
              <select value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value })} className={inputCls}>{ORG_BATCHES.map((b) => <option key={b}>{b}</option>)}</select></div>
          </div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Questions</label><input type="number" min={1} value={form.questions} onChange={(e) => setForm({ ...form, questions: e.target.value })} className={inputCls} /></div>
        </div>
      </Modal>

      <Modal open={results !== null} onClose={() => setResults(null)} title="Results & performance"
        footer={<Button onClick={() => setResults(null)}>Close</Button>}>
        {results && (
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-ink dark:text-white">{results.title}</p>
            <p className="text-sm text-muted dark:text-white/50">{results.course} · {results.batch}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-line p-4 text-center dark:border-night-line"><p className="text-2xl font-bold text-velvet dark:text-velvet-bright">{results.avgScore ?? "—"}{results.avgScore != null ? "%" : ""}</p><p className="text-xs text-muted">Average score</p></div>
              <div className="rounded-xl border border-line p-4 text-center dark:border-night-line"><p className="text-2xl font-bold text-ink dark:text-white">{results.submissions}</p><p className="text-xs text-muted">Submissions</p></div>
            </div>
            {results.submissions === 0 && <p className="text-sm text-muted dark:text-white/50">No submissions yet.</p>}
          </div>
        )}
      </Modal>
    </div>
  );
}
