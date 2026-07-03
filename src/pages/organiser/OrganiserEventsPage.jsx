// Events — create events with a banner carousel + attachments, submit for approval, publish (M03).
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiImage, FiType, FiSend, FiUploadCloud, FiX } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { ORG_EVENTS } from "@/data/organiserData";

const TONE = { DRAFT: "muted", PENDING: "warning", APPROVED: "neutral", REJECTED: "danger", PUBLISHED: "success" };
const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

export default function OrganiserEventsPage() {
  const [rows, setRows] = useState(ORG_EVENTS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", starts: "", ends: "" });
  const [banners, setBanners] = useState([]);
  const [banner, setBanner] = useState({ kind: "TEXT", caption: "" });
  const [attachments, setAttachments] = useState(0);

  const addBanner = () => {
    if (!banner.caption.trim()) return toast.error("Add a caption");
    setBanners((b) => [...b, banner]);
    setBanner({ kind: "TEXT", caption: "" });
  };
  const removeBanner = (i) => setBanners((b) => b.filter((_, idx) => idx !== i));

  const create = () => {
    if (!form.title.trim()) return toast.error("Event title is required");
    setRows((prev) => [{ id: `e${Date.now()}`, title: form.title, description: form.description, starts: form.starts || "—", ends: form.ends || "—", status: "DRAFT", banners, attachments }, ...prev]);
    toast.success("Event created (draft)");
    setForm({ title: "", description: "", starts: "", ends: "" }); setBanners([]); setAttachments(0);
    setOpen(false);
  };

  const setStatus = (id, status, msg) => { setRows((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e))); toast.success(msg); };

  const columns = [
    { key: "title", header: "Event", render: (r) => <div><p className="font-medium">{r.title}</p><p className="text-xs text-muted">{r.starts}{r.ends !== r.starts ? ` – ${r.ends}` : ""}</p></div> },
    { key: "banners", header: "Carousel", render: (r) => <span className="text-sm text-muted">{r.banners.length} banner{r.banners.length !== 1 ? "s" : ""} · {r.attachments} file{r.attachments !== 1 ? "s" : ""}</span> },
    { key: "status", header: "Status", render: (r) => <Badge tone={TONE[r.status] || "muted"}>{r.status}</Badge> },
    { key: "actions", header: "", align: "right", render: (r) => (
      <div className="flex items-center justify-end gap-2">
        {r.status === "DRAFT" && <button onClick={() => setStatus(r.id, "PENDING", "Submitted for approval")} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-canvas dark:border-night-line dark:text-white dark:hover:bg-white/10"><FiSend /> Submit</button>}
        {(r.status === "PENDING" || r.status === "APPROVED") && <button onClick={() => setStatus(r.id, "PUBLISHED", "Event published")} className="inline-flex items-center gap-1.5 rounded-lg bg-velvet px-3 py-1.5 text-xs font-semibold text-white hover:bg-velvet-bright"><FiUploadCloud /> Publish</button>}
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader title="Events" subtitle="Create events with a banner carousel, submit for approval and publish" action={<Button onClick={() => setOpen(true)}><FiPlus /> New event</Button>} />

      <DataTable columns={columns} rows={rows} rowKey="id" paginated pageSize={8} />

      <Modal open={open} onClose={() => setOpen(false)} title="New event" size="lg"
        footer={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={create}>Create draft</Button></>}>
        <div className="flex flex-col gap-4">
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} /></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Description</label><textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Starts</label><input type="date" value={form.starts} onChange={(e) => setForm({ ...form, starts: e.target.value })} className={inputCls} /></div>
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Ends</label><input type="date" value={form.ends} onChange={(e) => setForm({ ...form, ends: e.target.value })} className={inputCls} /></div>
          </div>

          {/* Banner carousel builder */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Banner carousel</label>
            <div className="flex flex-col gap-2">
              {banners.map((b, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-line px-3 py-2 text-sm dark:border-night-line">
                  <span className="inline-flex items-center gap-2 text-ink dark:text-white/90">{b.kind === "IMAGE" ? <FiImage /> : <FiType />} {b.caption}</span>
                  <button onClick={() => removeBanner(i)} aria-label="Remove" className="text-muted hover:text-red-500"><FiX /></button>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <select value={banner.kind} onChange={(e) => setBanner({ ...banner, kind: e.target.value })} className={`${inputCls} !w-28`}><option>TEXT</option><option>IMAGE</option></select>
              <input value={banner.caption} onChange={(e) => setBanner({ ...banner, caption: e.target.value })} className={inputCls} placeholder="Caption" />
              <Button variant="outline" onClick={addBanner}>Add</Button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Attachments <span className="font-normal text-muted">(stored via presigned S3)</span></label>
            <input type="file" multiple onChange={(e) => setAttachments(e.target.files?.length || 0)} className="block w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-velvet file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-velvet-bright" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
