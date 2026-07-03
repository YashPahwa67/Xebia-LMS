// Course content editor — author modules, submodules and content blocks (M04).
// Content types: TEXT | CODE | IMAGE | PDF | VIDEO (media "uploaded" via presigned S3, mocked with object URLs).
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiFileText, FiCode, FiImage, FiFilm, FiFile,
} from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { TRAINER_COURSE_CONTENT, AUTHORED_COURSES } from "@/data/trainerData";

const uid = () => Math.random().toString(36).slice(2, 9);
const TYPES = [
  { key: "TEXT", label: "Text", icon: FiFileText },
  { key: "CODE", label: "Code", icon: FiCode },
  { key: "IMAGE", label: "Image", icon: FiImage },
  { key: "PDF", label: "PDF", icon: FiFile },
  { key: "VIDEO", label: "Video", icon: FiFilm },
];
const TYPE_ICON = Object.fromEntries(TYPES.map((t) => [t.key, t.icon]));
const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white";

function BlockPreview({ block }) {
  if (block.type === "TEXT") return <p className="text-sm leading-relaxed text-ink/90 dark:text-white/80">{block.body}</p>;
  if (block.type === "CODE")
    return <pre className="overflow-x-auto rounded-xl border border-line bg-canvas p-3.5 text-xs text-ink dark:border-night-line dark:bg-night-bg dark:text-white/90"><code>{block.body}</code></pre>;
  if (block.type === "IMAGE")
    return block.src ? <img src={block.src} alt={block.caption || "image"} className="max-h-64 rounded-xl border border-line dark:border-night-line" /> : <p className="text-sm text-muted">No image attached.</p>;
  if (block.type === "VIDEO")
    return block.src ? <video src={block.src} controls className="max-h-72 w-full rounded-xl border border-line dark:border-night-line" /> : <p className="text-sm text-muted">No video attached — edit to upload.</p>;
  if (block.type === "PDF")
    return block.src ? <a href={block.src} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-velvet hover:underline dark:text-velvet-bright"><FiFile /> {block.filename || "Open PDF"}</a> : <p className="text-sm text-muted">No PDF attached.</p>;
  return null;
}

function ContentModal({ open, onClose, initial, onSave }) {
  const [block, setBlock] = useState(initial);
  // Re-seed when a different block opens.
  useEffect(() => setBlock(initial), [initial]);
  if (!block) return null;

  const setField = (k, v) => setBlock((b) => ({ ...b, [k]: v }));
  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBlock((b) => ({ ...b, src: URL.createObjectURL(file), filename: file.name })); // stand-in for S3 presigned URL
  };

  const isMedia = ["IMAGE", "PDF", "VIDEO"].includes(block.type);
  const accept = block.type === "IMAGE" ? "image/*" : block.type === "VIDEO" ? "video/*" : "application/pdf";

  const save = () => {
    if (block.type === "TEXT" && !block.body?.trim()) return toast.error("Enter some text");
    if (block.type === "CODE" && !block.body?.trim()) return toast.error("Enter some code");
    if (isMedia && !block.src) return toast.error(`Attach a ${block.type.toLowerCase()} file or URL`);
    onSave(block);
  };

  return (
    <Modal open={open} onClose={onClose} title={initial?.body || initial?.src ? "Edit content" : "Add content"}
      footer={<><Button variant="outline" onClick={onClose}>Cancel</Button><Button onClick={save}>Save block</Button></>}>
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Type</label>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button key={t.key} type="button" onClick={() => setField("type", t.key)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${block.type === t.key ? "bg-velvet text-white" : "border border-line text-muted dark:border-night-line dark:text-white/60"}`}>
                <t.icon /> {t.label}
              </button>
            ))}
          </div>
        </div>

        {block.type === "TEXT" && (
          <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Text</label>
            <textarea rows={5} value={block.body || ""} onChange={(e) => setField("body", e.target.value)} className={inputCls} /></div>
        )}
        {block.type === "CODE" && (
          <>
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Language</label>
              <input value={block.language || ""} onChange={(e) => setField("language", e.target.value)} className={inputCls} placeholder="e.g. java" /></div>
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Code</label>
              <textarea rows={6} value={block.body || ""} onChange={(e) => setField("body", e.target.value)} className={`${inputCls} font-mono`} /></div>
          </>
        )}
        {isMedia && (
          <>
            <div><label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">{block.type === "VIDEO" ? "Title" : "Caption"}</label>
              <input value={block.type === "VIDEO" ? (block.title || "") : (block.caption || "")} onChange={(e) => setField(block.type === "VIDEO" ? "title" : "caption", e.target.value)} className={inputCls} /></div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Upload {block.type.toLowerCase()} <span className="font-normal text-muted">(stored via presigned S3)</span></label>
              <input type="file" accept={accept} onChange={onFile} className="block w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-velvet file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-velvet-bright" />
              <p className="mt-2 text-xs text-muted dark:text-white/50">…or paste a URL</p>
              <input value={block.src || ""} onChange={(e) => setField("src", e.target.value)} className={`${inputCls} mt-1`} placeholder="https://…" />
            </div>
            {block.src && <div className="rounded-xl border border-line p-3 dark:border-night-line"><BlockPreview block={block} /></div>}
          </>
        )}
      </div>
    </Modal>
  );
}

export default function CourseEditorPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const title = decodeURIComponent(courseId);
  const meta = AUTHORED_COURSES.find((c) => c.course === title);

  const [modules, setModules] = useState(() => JSON.parse(JSON.stringify(TRAINER_COURSE_CONTENT[title] || [])));
  const firstSub = modules[0]?.submodules?.[0];
  const [activeSub, setActiveSub] = useState(firstSub ? { m: modules[0].id, s: firstSub.id } : null);
  const [editingBlock, setEditingBlock] = useState(null); // { block, isNew }
  const [deleting, setDeleting] = useState(null);

  const current = useMemo(() => {
    if (!activeSub) return null;
    const m = modules.find((x) => x.id === activeSub.m);
    const s = m?.submodules.find((x) => x.id === activeSub.s);
    return s ? { module: m, sub: s } : null;
  }, [modules, activeSub]);

  if (!meta) {
    return (
      <div>
        <PageHeader title="Course not found" />
        <Button variant="outline" onClick={() => navigate("/trainer/courses")}><FiArrowLeft /> Back</Button>
      </div>
    );
  }

  const addModule = () => {
    const title = prompt("Module title");
    if (!title?.trim()) return;
    setModules((prev) => [...prev, { id: uid(), title: title.trim(), submodules: [] }]);
    toast.success("Module added");
  };
  const addSubmodule = (moduleId) => {
    const title = prompt("Submodule (lesson) title");
    if (!title?.trim()) return;
    const sid = uid();
    setModules((prev) => prev.map((m) => (m.id === moduleId ? { ...m, submodules: [...m.submodules, { id: sid, title: title.trim(), estMinutes: 15, content: [] }] } : m)));
    setActiveSub({ m: moduleId, s: sid });
    toast.success("Lesson added");
  };

  const saveBlock = (block) => {
    setModules((prev) => prev.map((m) => {
      if (m.id !== activeSub.m) return m;
      return { ...m, submodules: m.submodules.map((s) => {
        if (s.id !== activeSub.s) return s;
        const exists = s.content.some((c) => c.id === block.id);
        return { ...s, content: exists ? s.content.map((c) => (c.id === block.id ? block : c)) : [...s.content, block] };
      }) };
    }));
    setEditingBlock(null);
    toast.success("Content saved");
  };
  const removeBlock = () => {
    setModules((prev) => prev.map((m) => (m.id === activeSub.m ? { ...m, submodules: m.submodules.map((s) => (s.id === activeSub.s ? { ...s, content: s.content.filter((c) => c.id !== deleting.id) } : s)) } : m)));
    setDeleting(null);
    toast.success("Content removed");
  };

  const totalLessons = modules.reduce((n, m) => n + m.submodules.length, 0);

  return (
    <div>
      <button onClick={() => navigate("/trainer/courses")} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-velvet dark:text-white/60">
        <FiArrowLeft /> My Courses
      </button>

      <PageHeader
        title={title}
        subtitle={`${meta.level} · v${meta.version} · ${modules.length} modules · ${totalLessons} lessons`}
        action={<Badge tone={meta.status === "PUBLISHED" ? "success" : "warning"}>{meta.status}</Badge>}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Curriculum tree */}
        <aside className="rounded-2xl border border-line bg-white p-3 shadow-card dark:border-night-line dark:bg-night-surface">
          {modules.map((m) => (
            <div key={m.id} className="mb-3 last:mb-0">
              <div className="flex items-center justify-between px-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted/70 dark:text-white/40">{m.title}</p>
                <button onClick={() => addSubmodule(m.id)} aria-label="Add lesson" className="text-muted hover:text-velvet"><FiPlus /></button>
              </div>
              {m.submodules.map((s) => {
                const isActive = activeSub && activeSub.s === s.id;
                return (
                  <button key={s.id} onClick={() => setActiveSub({ m: m.id, s: s.id })}
                    className={`mb-0.5 flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${isActive ? "bg-velvet-soft font-semibold text-velvet dark:bg-velvet/20 dark:text-velvet-bright" : "text-ink/70 hover:bg-canvas dark:text-white/70 dark:hover:bg-white/5"}`}>
                    <span>{s.title}</span>
                    <span className="text-xs text-muted dark:text-white/40">{s.content.length}</span>
                  </button>
                );
              })}
              {m.submodules.length === 0 && <p className="px-2.5 py-1 text-xs text-muted">No lessons yet.</p>}
            </div>
          ))}
          <button onClick={addModule} className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-line px-3 py-2 text-sm font-medium text-muted hover:border-velvet hover:text-velvet dark:border-night-line">
            <FiPlus /> Add module
          </button>
        </aside>

        {/* Content editor */}
        <section className="lg:col-span-2">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card dark:border-night-line dark:bg-night-surface">
            {!current ? (
              <p className="py-12 text-center text-sm text-muted dark:text-white/50">Select or add a lesson to author its content.</p>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted dark:text-white/50">{current.module.title}</p>
                    <h2 className="mt-0.5 text-xl font-bold text-ink dark:text-white">{current.sub.title}</h2>
                  </div>
                  <Button onClick={() => setEditingBlock({ block: { id: uid(), type: "TEXT", body: "" }, isNew: true })}><FiPlus /> Add content</Button>
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  {current.sub.content.length === 0 && <p className="rounded-xl border border-dashed border-line py-8 text-center text-sm text-muted dark:border-night-line">No content blocks yet — add text, code, image, PDF or video.</p>}
                  {current.sub.content.map((block) => {
                    const Icon = TYPE_ICON[block.type];
                    return (
                      <div key={block.id} className="rounded-xl border border-line p-4 dark:border-night-line">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted dark:text-white/50"><Icon /> {block.type}</span>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingBlock({ block, isNew: false })} aria-label="Edit" className="grid h-7 w-7 place-items-center rounded-lg border border-line text-muted hover:bg-canvas dark:border-night-line dark:text-white/60 dark:hover:bg-white/10"><FiEdit2 className="text-sm" /></button>
                            <button onClick={() => setDeleting(block)} aria-label="Delete" className="grid h-7 w-7 place-items-center rounded-lg border border-red-300 text-red-500 hover:bg-red-50 dark:border-red-500/40 dark:hover:bg-red-500/10"><FiTrash2 className="text-sm" /></button>
                          </div>
                        </div>
                        <BlockPreview block={block} />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      <ContentModal
        open={editingBlock !== null}
        onClose={() => setEditingBlock(null)}
        initial={editingBlock?.block}
        onSave={saveBlock}
      />
      <ConfirmDialog open={deleting !== null} onClose={() => setDeleting(null)} onConfirm={removeBlock} message="Remove this content block?" confirmLabel="Remove" />
    </div>
  );
}
