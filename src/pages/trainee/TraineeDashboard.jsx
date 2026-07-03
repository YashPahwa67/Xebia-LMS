// Trainee overview — learner dashboard: hero, stats, continue, pace, skills, team.
import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiPlay } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { DASH } from "@/data/traineeData";

const BAR_TONE = {
  velvet: "bg-velvet",
  emerald: "bg-emerald-brand",
  blue: "bg-velvet-bright",
  bright: "bg-velvet-bright",
};

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-line bg-white p-6 shadow-card dark:border-night-line dark:bg-night-surface ${className}`}>
      {children}
    </div>
  );
}

function Hero({ name, pace }) {
  return (
    <div className="flex items-center gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-velvet-dark to-velvet p-8 text-white shadow-card">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold">Ready to level up, {name}?</h2>
        <p className="mt-2 max-w-2xl leading-relaxed text-white/85">
          You&apos;re making great progress this week. Your learning pace is at {pace.pacePct}% of your weekly
          target. Complete your upcoming {pace.nextModule} module to stay on track!
        </p>
        <Link to="/trainee/courses">
          <Button className="mt-5 !bg-velvet-bright !px-6 !py-3 hover:!brightness-110">Explore Learning Path</Button>
        </Link>
      </div>
      <div className="hidden h-32 w-44 shrink-0 place-items-center rounded-xl bg-white/10 lg:grid">
        <svg viewBox="0 0 120 90" className="h-24 w-32" fill="none">
          <rect x="8" y="52" width="16" height="30" rx="2" fill="#84117C" />
          <rect x="30" y="40" width="16" height="42" rx="2" fill="#EDEAF4" opacity="0.9" />
          <rect x="52" y="30" width="16" height="52" rx="2" fill="#01AC9F" />
          <rect x="74" y="20" width="16" height="62" rx="2" fill="#FF6200" />
          <circle cx="96" cy="18" r="10" fill="#EDEAF4" opacity="0.9" />
          <path d="M8 48 L38 34 L60 26 L82 16 L96 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function StatTile({ value, label, tone }) {
  return (
    <Card className="!p-5">
      <p className={`text-3xl font-bold leading-none ${tone === "emerald" ? "text-emerald-brand" : "text-ink dark:text-white"}`}>{value}</p>
      <p className="mt-2 text-sm text-muted dark:text-white/60">{label}</p>
    </Card>
  );
}

function ContinueCard({ c }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted dark:text-white/50">Pick up where you left off</p>
        <span className="rounded-full bg-velvet-soft px-2.5 py-0.5 text-xs font-semibold text-velvet dark:bg-velvet/20 dark:text-velvet-bright">{c.step}</span>
      </div>
      <div className="mt-4 flex gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-velvet text-white"><FiPlay className="text-xl" /></span>
        <div>
          <p className="font-bold text-ink dark:text-white">{c.title}</p>
          <p className="text-sm text-muted dark:text-white/50">{c.chapter}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {c.tags.map((t) => <span key={t} className="rounded bg-canvas px-2 py-0.5 text-xs font-medium text-velvet dark:bg-white/5 dark:text-velvet-bright">{t}</span>)}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-velvet-soft dark:bg-white/10">
          <div className="h-full rounded-full bg-velvet" style={{ width: `${c.progress}%` }} />
        </div>
        <span className="text-sm font-bold text-ink dark:text-white">{c.progress}%</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link to="/trainee/courses"><Button className="w-full">Resume Module</Button></Link>
        <Link to="/trainee/courses"><Button variant="outline" className="w-full">View Syllabus</Button></Link>
      </div>
    </Card>
  );
}

function SkillProgress({ skills }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-ink dark:text-white">Your skill progress</h3>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted dark:text-white/50">Last 30 days</span>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {skills.map((s) => (
          <div key={s.name}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-semibold text-ink dark:text-white">{s.name}</span>
              <span className="text-muted dark:text-white/60">{s.pct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-canvas dark:bg-white/10">
              <div className={`h-full rounded-full ${BAR_TONE[s.tone]}`} style={{ width: `${s.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function LearningPace({ pace, goal }) {
  const [range, setRange] = useState("This week");
  const max = 5;
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-ink dark:text-white">Learning pace</h3>
        <div className="flex gap-1 rounded-lg bg-canvas p-1 text-xs dark:bg-white/5">
          {["This week", "Month"].map((r) => (
            <button key={r} onClick={() => setRange(r)} className={`rounded-md px-3 py-1 font-semibold transition-colors ${range === r ? "bg-velvet text-white" : "text-muted dark:text-white/60"}`}>{r}</button>
          ))}
        </div>
      </div>
      <p className="mt-1 text-sm italic text-muted dark:text-white/50">Hours logged per day — 3hr daily goal</p>
      <div className="mt-4 flex items-end justify-between gap-3" style={{ height: 180 }}>
        {pace.map((d) => (
          <div key={d.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <div className="flex items-end justify-center gap-1">
              <div className="w-2.5 rounded-t bg-velvet" style={{ height: Math.max(4, (d.logged / max) * 148) }} title={`${d.logged}h logged`} />
              <div className="w-2.5 rounded-t bg-emerald-brand/30" style={{ height: Math.max(4, (goal / max) * 148) }} title={`${goal}h goal`} />
            </div>
            <span className="text-xs text-muted dark:text-white/50">{d.day}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-4 text-xs text-muted dark:text-white/60">
        <span><span className="text-velvet">●</span> Logged</span>
        <span><span className="text-emerald-brand/50">●</span> Daily goal</span>
      </div>
    </Card>
  );
}

function CertGoals({ goals }) {
  const dot = { emerald: "bg-emerald-brand", orange: "bg-cta-orange" };
  const pill = { emerald: "bg-emerald-brand/10 text-emerald-brand", orange: "bg-cta-orange/10 text-cta-orange" };
  return (
    <Card>
      <h3 className="font-bold text-ink dark:text-white">Certification goals</h3>
      <div className="mt-4 flex flex-col gap-3">
        {goals.map((g) => (
          <div key={g.name} className="flex items-center justify-between rounded-xl border border-line px-4 py-3 dark:border-night-line">
            <span className="flex items-center gap-2.5 text-sm font-medium text-ink dark:text-white">
              <span className={`h-2 w-2 rounded-full ${dot[g.tone]}`} />{g.name}
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${pill[g.tone]}`}>{g.status}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TeamList({ team }) {
  return (
    <Card>
      <div className="flex items-baseline justify-between">
        <h3 className="font-bold text-ink dark:text-white">Team this month</h3>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted dark:text-white/50">Your team · {team.length} people</span>
      </div>
      <div className="mt-4 flex flex-col">
        {team.map((m) => (
          <div key={m.rank} className="flex items-center gap-3 border-b border-line/70 py-3 last:border-0 dark:border-night-line/60">
            <span className="w-4 text-sm font-semibold text-muted dark:text-white/50">{m.rank}</span>
            <span className={`grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white ${m.you ? "bg-velvet" : "bg-velvet-dark"}`}>{m.initials}</span>
            <span className={`text-sm ${m.you ? "font-bold text-velvet dark:text-velvet-bright" : "font-medium text-ink dark:text-white/90"}`}>
              {m.name}{m.you && " (you)"}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Recommended({ items }) {
  const dot = { velvet: "bg-velvet", emerald: "bg-emerald-brand" };
  return (
    <Card>
      <h3 className="font-bold text-ink dark:text-white">Recommended for you</h3>
      <div className="mt-4 flex flex-col gap-3">
        {items.map((r) => (
          <div key={r.name} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2.5 truncate text-sm font-medium text-ink dark:text-white">
              <span className={`h-2 w-2 shrink-0 rounded-full ${dot[r.tone]}`} />
              <span className="truncate">{r.name}</span>
            </span>
            <span className="shrink-0 text-xs text-muted dark:text-white/50">{r.level}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function TraineeDashboard() {
  const user = useSelector((s) => s.auth.user);
  const d = DASH;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Hero name={(user?.name || "Khushpreet").split(" ")[0]} pace={d} />

      <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {d.stats.map((s) => <StatTile key={s.id} {...s} />)}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6">
          <ContinueCard c={d.continue} />
          <SkillProgress skills={d.skills} />
        </div>
        <div className="flex flex-col gap-6">
          <LearningPace pace={d.pace} goal={d.dailyGoal} />
          <CertGoals goals={d.certGoals} />
        </div>
        <div className="flex flex-col gap-6">
          <TeamList team={d.team} />
          <Recommended items={d.recommended} />
        </div>
      </div>
    </motion.div>
  );
}
