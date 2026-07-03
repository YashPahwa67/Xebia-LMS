// Proposals — availability-aware training proposal wizard + hold/cancel (M03, delegated to Scheduling).
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiPauseCircle, FiXCircle } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import {
  ORG_PROPOSALS, ORG_TRAINERS, ORG_DOMAINS, ORG_BATCHES, TRAINER_AVAILABILITY,
} from "@/data/organiserData";

const TONE = { PENDING: "warning", CONFIRMED: "success", ON_HOLD: "muted", CANCELLED: "danger", REJECTED: "danger" };
const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

function emptyForm() {
  return { topic: "", trainer: ORG_TRAINERS[0], slotId: "", batch: ORG_BATCHES[0], domain: ORG_DOMAINS[0], mode: "ONLINE", room: "", floor: "", location: "" };
}

export default function ProposalsPage() {
  const [rows, setRows] = useState(ORG_PROPOSALS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const slots = TRAINER_AVAILABILITY[form.trainer] || [];

  const decide = (id, status, msg) => { setRows((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p))); toast.success(msg); };

  const submit = () => {
    if (!form.topic.trim()) return toast.error("Enter a training topic");
    const slot = slots.find((s) => s.id === form.slotId);
    if (!slot) return toast.error("Pick a free slot");
    // Availability-aware: the engine would reject a busy window with 409 + suggestions.
    if (slot.state === "BUSY") {
      const free = slots.filter((s) => s.state === "FREE").map((s) => `${s.day} ${s.time}`).join(", ");
      return toast.error(`Slot is busy. Try: ${free || "no free slots"}`);
    }
    const venue = form.mode === "ONSITE" ? [form.room, form.floor, form.location].filter(Boolean).join(", ") || "—" : "—";
    setRows((prev) => [
      { id: `p${Date.now()}`, topic: form.topic, trainer: form.trainer, batch: form.batch, domain: form.domain, slot: `${slot.day} ${slot.time}`, mode: form.mode, venue, status: "PENDING" },
      ...prev,
    ]);
    toast.success("Proposal submitted — awaiting Manager approval");
    setForm(emptyForm());
    setOpen(false);
  };

  const columns = [
    { key: "topic", header: "Training", render: (r) => <div><p className="font-medium">{r.topic}</p><p className="text-xs text-muted">{r.trainer} · {r.domain}</p></div> },
    { key: "batch", header: "Batch" },
    { key: "slot", header: "Slot" },
    { key: "mode", header: "Mode", render: (r) => <Badge tone={r.mode === "ONLINE" ? "neutral" : "success"}>{r.mode}</Badge> },
    { key: "status", header: "Status", render: (r) => <Badge tone={TONE[r.status] || "muted"}>{r.status.replace("_", " ")}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => (
      ["PENDING", "CONFIRMED"].includes(r.status) ? (
        <div className="flex items-center justify-end gap-2">
          <button onClick={() => decide(r.id, "ON_HOLD", "Hold requested — slot released")} className="inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold text-ink hover:bg-canvas dark:border-night-line dark:text-white dark:hover:bg-white/10"><FiPauseCircle /> Hold</button>
          <button onClick={() => decide(r.id, "CANCELLED", "Cancel requested — slot freed")} className="inline-flex items-center gap-1 rounded-lg border border-red-300 px-2.5 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 dark:border-red-500/40 dark:hover:bg-red-500/10"><FiXCircle /> Cancel</button>
        </div>
      ) : null
    ) },
  ];

  return (
    <div>
      <PageHeader title="Proposals" subtitle="Propose conflict-safe trainings into trainers' free time" action={<Button onClick={() => { setForm(emptyForm()); setOpen(true); }}><FiPlus /> New proposal</Button>} />

      <DataTable columns={columns} rows={rows} rowKey="id" paginated pageSize={8} />

      <Modal open={open} onClose={() => setOpen(false)} title="New training proposal" size="lg"
        footer={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={submit}>Submit for approval</Button></>}>
        <div className="flex flex-col gap-4">
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Training topic</label>
            <input value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className={inputCls} placeholder="e.g. Spring Security Deep Dive" /></div>

          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Trainer</label>
              <select value={form.trainer} onChange={(e) => setForm({ ...form, trainer: e.target.value, slotId: "" })} className={inputCls}>{ORG_TRAINERS.map((t) => <option key={t}>{t}</option>)}</select></div>
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Domain</label>
              <select value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })} className={inputCls}>{ORG_DOMAINS.map((d) => <option key={d}>{d}</option>)}</select></div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Availability <span className="font-normal text-muted">(free slots only)</span></label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {slots.map((s) => {
                const free = s.state === "FREE";
                const selected = form.slotId === s.id;
                return (
                  <button key={s.id} type="button" disabled={!free} onClick={() => setForm({ ...form, slotId: s.id })}
                    className={`rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                      selected ? "border-velvet bg-velvet-soft text-velvet dark:bg-velvet/20 dark:text-velvet-bright"
                      : free ? "border-line text-ink hover:border-velvet dark:border-night-line dark:text-white/90"
                      : "cursor-not-allowed border-line bg-canvas text-muted line-through dark:border-night-line dark:bg-white/5"}`}>
                    <span className="font-semibold">{s.day}</span> {s.time}
                    <span className={`mt-0.5 block text-[10px] font-semibold uppercase ${free ? "text-emerald-brand" : "text-red-500"}`}>{s.state}</span>
                  </button>
                );
              })}
              {slots.length === 0 && <p className="text-sm text-muted">No availability published.</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Batch</label>
              <select value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value })} className={inputCls}>{ORG_BATCHES.map((b) => <option key={b}>{b}</option>)}</select></div>
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Mode</label>
              <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })} className={inputCls}><option>ONLINE</option><option>ONSITE</option></select></div>
          </div>

          {form.mode === "ONSITE" && (
            <div className="grid grid-cols-3 gap-3">
              <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Room</label><input value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} className={inputCls} /></div>
              <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Floor</label><input value={form.floor} onChange={(e) => setForm({ ...form, floor: e.target.value })} className={inputCls} /></div>
              <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Location</label><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputCls} /></div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
