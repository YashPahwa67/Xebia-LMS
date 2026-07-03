// Course player — navigate modules/submodules, view content, track & resume progress.
import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiChevronRight, FiFile } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { COURSE_DETAILS } from "@/data/traineeData";

function flatten(modules) {
  return modules.flatMap((m, mi) => m.submodules.map((s, si) => ({ ...s, module: m.title, key: `${mi}-${si}` })));
}

// Renders any content block a trainer authored: TEXT | CODE | IMAGE | PDF | VIDEO.
function ContentBlock({ block }) {
  if (block.type === "CODE")
    return (
      <pre className="overflow-x-auto rounded-xl border border-line bg-canvas p-4 text-xs leading-relaxed text-ink dark:border-night-line dark:bg-night-bg dark:text-white/90">
        <code>{block.body}</code>
      </pre>
    );
  if (block.type === "IMAGE")
    return block.src
      ? <figure><img src={block.src} alt={block.caption || "illustration"} className="max-h-96 rounded-xl border border-line dark:border-night-line" />{block.caption && <figcaption className="mt-1.5 text-xs text-muted dark:text-white/50">{block.caption}</figcaption>}</figure>
      : <p className="text-sm text-muted">Image unavailable.</p>;
  if (block.type === "VIDEO")
    return (
      <figure>
        {block.src
          ? <video src={block.src} controls className="max-h-[28rem] w-full rounded-xl border border-line dark:border-night-line" />
          : <div className="grid h-40 place-items-center rounded-xl border border-dashed border-line text-sm text-muted dark:border-night-line">Video not yet uploaded.</div>}
        {block.title && <figcaption className="mt-1.5 text-xs text-muted dark:text-white/50">{block.title}</figcaption>}
      </figure>
    );
  if (block.type === "PDF")
    return block.src
      ? <a href={block.src} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm font-medium text-velvet hover:bg-canvas dark:border-night-line dark:text-velvet-bright dark:hover:bg-white/5"><FiFile /> {block.filename || "Open PDF"}</a>
      : <p className="text-sm text-muted">PDF unavailable.</p>;
  return <p className="text-sm leading-relaxed text-ink/90 dark:text-white/80">{block.body}</p>;
}

export default function CoursePlayerPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const title = decodeURIComponent(courseId);
  const course = COURSE_DETAILS[title];

  const lessons = useMemo(() => (course ? flatten(course.modules) : []), [course]);
  const [done, setDone] = useState(() => new Set(lessons.filter((l) => l.completed).map((l) => l.key)));
  const firstIncomplete = lessons.find((l) => !done.has(l.key)) || lessons[0];
  const [activeKey, setActiveKey] = useState(firstIncomplete?.key);

  if (!course) {
    return (
      <div>
        <PageHeader title="Course not found" subtitle="This course isn't in your enrolments." />
        <Button variant="outline" onClick={() => navigate("/trainee/courses")}><FiArrowLeft /> Back to My Courses</Button>
      </div>
    );
  }

  const active = lessons.find((l) => l.key === activeKey) || lessons[0];
  const percent = lessons.length ? Math.round((done.size / lessons.length) * 100) : 0;
  const markComplete = () => setDone((prev) => new Set(prev).add(active.key));

  return (
    <div>
      <button onClick={() => navigate("/trainee/courses")} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-velvet dark:text-white/60">
        <FiArrowLeft /> My Courses
      </button>

      <PageHeader
        title={title}
        subtitle={`${course.domain} · ${course.author} · v${course.version}`}
        action={<Badge tone={percent === 100 ? "success" : "warning"}>{percent}% complete</Badge>}
      />

      <div className="mb-6 h-2.5 w-full overflow-hidden rounded-full bg-velvet-soft dark:bg-white/10">
        <div className="h-full rounded-full bg-velvet transition-all" style={{ width: `${percent}%` }} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Curriculum tree */}
        <aside className="rounded-2xl border border-line bg-white p-3 shadow-card dark:border-night-line dark:bg-night-surface">
          {course.modules.map((m, mi) => (
            <div key={m.title} className="mb-3 last:mb-0">
              <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted/70 dark:text-white/40">{m.title}</p>
              {m.submodules.map((s, si) => {
                const key = `${mi}-${si}`;
                const isDone = done.has(key);
                const isActive = key === active.key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveKey(key)}
                    className={`mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                      isActive ? "bg-velvet-soft font-semibold text-velvet dark:bg-velvet/20 dark:text-velvet-bright" : "text-ink/70 hover:bg-canvas dark:text-white/70 dark:hover:bg-white/5"
                    }`}
                  >
                    <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] ${isDone ? "bg-emerald-brand text-white" : "border border-line text-transparent dark:border-night-line"}`}>
                      <FiCheck />
                    </span>
                    <span className="flex-1">{s.title}</span>
                    <span className="text-xs text-muted dark:text-white/40">{s.estMinutes}m</span>
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        {/* Content viewer */}
        <section className="lg:col-span-2">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card dark:border-night-line dark:bg-night-surface">
            <p className="text-xs uppercase tracking-wide text-muted dark:text-white/50">{active.module}</p>
            <h2 className="mt-1 text-xl font-bold text-ink dark:text-white">{active.title}</h2>
            <div className="mt-5 flex flex-col gap-4">
              {active.content.map((block, i) => <ContentBlock key={i} block={block} />)}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-line pt-5 dark:border-night-line">
              {done.has(active.key) ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-brand"><FiCheck /> Completed</span>
              ) : (
                <Button variant="emerald" onClick={markComplete}><FiCheck /> Mark complete</Button>
              )}
              {(() => {
                const idx = lessons.findIndex((l) => l.key === active.key);
                const next = lessons[idx + 1];
                return next ? (
                  <button onClick={() => setActiveKey(next.key)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-velvet hover:text-velvet-bright">
                    Next: {next.title} <FiChevronRight />
                  </button>
                ) : null;
              })()}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
