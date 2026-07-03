// Learners — enrolled learners across organisations.
import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge, { statusTone } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RowActions from "@/components/ui/RowActions";
import ResourceModal from "@/components/ui/ResourceModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useCrud } from "@/hooks/useCrud";
import { useDebounce } from "@/hooks/useDebounce";
import { LEARNERS } from "@/data/adminData";

const FIELDS = [
  { name: "learner", label: "Name", placeholder: "Full name", required: true },
  { name: "email", label: "Email", placeholder: "name@xebia.lms", required: true },
  { name: "organisation", label: "Organisation", placeholder: "e.g. State Technical University" },
  { name: "type", label: "Type", type: "select", options: ["University", "Corporate"] },
  { name: "domain", label: "Domain", placeholder: "e.g. DevOps & Cloud" },
  { name: "sem", label: "Sem", placeholder: "e.g. 5" },
  { name: "status", label: "Status", type: "select", options: ["ACTIVE", "INACTIVE"] },
];

export default function LearnersPage() {
  const crud = useCrud(LEARNERS, "email");
  const [query, setQuery] = useState("");
  const q = useDebounce(query, 300).toLowerCase();
  const rows = crud.rows.filter((l) => !q || l.learner.toLowerCase().includes(q) || l.email.toLowerCase().includes(q));

  const columns = [
    {
      key: "learner", header: "Learner",
      render: (r) => (
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-velvet-soft text-xs font-bold text-velvet">{r.learner[0]}</span>
          <div><p className="font-medium">{r.learner}</p><p className="text-xs text-muted">{r.email}</p></div>
        </div>
      ),
    },
    { key: "organisation", header: "Organisation" },
    { key: "type", header: "Type" },
    { key: "domain", header: "Domain" },
    { key: "sem", header: "Sem" },
    { key: "status", header: "Status", render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => <RowActions onEdit={() => crud.openEdit(r)} onToggle={() => crud.toggle(r, "status", "ACTIVE", "INACTIVE")} onDelete={() => crud.setDeleting(r)} /> },
  ];

  return (
    <div>
      <PageHeader title="Learners" subtitle="Enrolled learners across organisations" action={<Button onClick={crud.openNew}><FiPlus /> New learner</Button>} />
      <div className="relative mb-4 max-w-xs">
        <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by email..."
          className="w-full rounded-lg border border-line bg-white py-2 pl-9 pr-3 text-sm focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-surface dark:text-white"
        />
      </div>
      <DataTable columns={columns} rows={rows} rowKey="email" />

      <ResourceModal open={crud.editing !== null} onClose={crud.closeForm} title={crud.editing?.email ? "Edit learner" : "New learner"} submitLabel={crud.editing?.email ? "Save" : "Add"} fields={FIELDS} initial={crud.editing} onSubmit={crud.save} />
      <ConfirmDialog open={crud.deleting !== null} onClose={() => crud.setDeleting(null)} onConfirm={crud.confirmDelete} message={`Remove learner "${crud.deleting?.learner}"?`} />
    </div>
  );
}
