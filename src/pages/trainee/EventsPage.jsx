// Events — carousel of published events the learner can browse and register for (M05).
import { useState } from "react";
import toast from "react-hot-toast";
import { FiChevronLeft, FiChevronRight, FiCalendar } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { MY_EVENTS } from "@/data/traineeData";

const ACCENT = {
  velvet: "from-velvet-dark to-velvet",
  emerald: "from-emerald-brand/90 to-emerald-brand",
  orange: "from-cta-orange/90 to-cta-orange",
};

export default function EventsPage() {
  const [i, setI] = useState(0);
  const events = MY_EVENTS;
  const active = events[i];
  const go = (d) => setI((p) => (p + d + events.length) % events.length);

  return (
    <div>
      <PageHeader title="Events" subtitle="Hackathons, workshops and fairs published for your cohorts" />

      {/* Carousel */}
      <div className="relative overflow-hidden rounded-2xl shadow-card">
        <div className={`bg-gradient-to-br ${ACCENT[active.accent]} p-8 text-white`}>
          <Badge className="!bg-white/20 !text-white">{active.tag}</Badge>
          <h2 className="mt-3 text-2xl font-bold">{active.title}</h2>
          <p className="mt-1 text-sm text-white/80">{active.org}</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/90">{active.description}</p>
          <div className="mt-5 flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-sm text-white/85"><FiCalendar /> {active.when}</span>
            <Button className="!bg-white/20 hover:!bg-white/30" onClick={() => toast.success(`Registered for "${active.title}"`)}>Register</Button>
          </div>
        </div>
        <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30"><FiChevronLeft /></button>
        <button onClick={() => go(1)} aria-label="Next" className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30"><FiChevronRight /></button>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {events.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-5 bg-white" : "w-1.5 bg-white/50"}`} />
          ))}
        </div>
      </div>

      {/* All events grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((e, idx) => (
          <button key={e.id} onClick={() => setI(idx)} className={`rounded-2xl border bg-white p-5 text-left shadow-card transition-colors dark:bg-night-surface ${idx === i ? "border-velvet dark:border-velvet-bright" : "border-line hover:border-velvet/50 dark:border-night-line"}`}>
            <Badge tone={e.accent === "emerald" ? "success" : e.accent === "orange" ? "warning" : "neutral"}>{e.tag}</Badge>
            <p className="mt-3 font-bold text-ink dark:text-white">{e.title}</p>
            <p className="text-xs text-muted dark:text-white/50">{e.org}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted dark:text-white/60"><FiCalendar /> {e.when}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
