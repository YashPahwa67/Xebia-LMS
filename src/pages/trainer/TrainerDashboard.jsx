// Trainer overview — authoring & delivery KPIs, delivery trend, pending work.
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import { TRAINER_OVERVIEW, SUBMISSIONS, TRAINER_TASKS } from "@/data/trainerData";

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-line bg-white p-5 shadow-card dark:border-night-line dark:bg-night-surface ${className}`}>
      {children}
    </div>
  );
}

function StatTile({ value, label, tone }) {
  return (
    <Card>
      <p className={`text-3xl font-bold leading-none ${tone === "orange" ? "text-cta-orange" : "text-ink dark:text-white"}`}>{value}</p>
      <p className="mt-2 text-sm text-muted dark:text-white/60">{label}</p>
    </Card>
  );
}

function DeliveryChart() {
  const data = TRAINER_OVERVIEW.delivery;
  const max = Math.max(...data, 1);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const H = 150, BAR = 118; // usable bar height in px
  return (
    <div className="flex items-end justify-between gap-3" style={{ height: H }}>
      {data.map((v, i) => (
        <div key={days[i]} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
          <span className="text-xs font-semibold text-ink dark:text-white/80">{v}</span>
          <div className="w-3.5 rounded-t bg-velvet" style={{ height: Math.max(4, (v / max) * BAR) }} title={`${v} sessions`} />
          <span className="text-xs text-muted dark:text-white/50">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

export default function TrainerDashboard() {
  const user = useSelector((s) => s.auth.user);
  const o = TRAINER_OVERVIEW;
  const pending = SUBMISSIONS.filter((s) => s.status === "PENDING_REVIEW");
  const openTasks = TRAINER_TASKS.filter((t) => t.status === "OPEN");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-velvet-dark to-velvet p-6 text-white shadow-card">
          <h2 className="text-lg font-bold">Welcome back, {(user?.name || o.trainer.name).split(" ")[0]}</h2>
          <p className="mt-1 text-sm text-white/75">Your authoring and delivery at a glance.</p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div><p className="text-xs text-white/60">Learners taught</p><p className="text-xl font-bold">{o.learnersTaught}</p></div>
            <div><p className="text-xs text-white/60">Trainer rating</p><p className="text-xl font-bold">{o.ratingPct}%</p></div>
          </div>
        </div>
        <Card><StatTile value={o.stats[0].value} label={o.stats[0].label} tone={o.stats[0].tone} /></Card>
        <Card><StatTile value={o.stats[3].value} label={o.stats[3].label} tone={o.stats[3].tone} /></Card>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {o.stats.map((s) => <StatTile key={s.id} {...s} />)}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-ink dark:text-white">Sessions delivered</p>
              <p className="text-xs text-muted dark:text-white/50">This week, by day</p>
            </div>
          </div>
          <div className="mt-4"><DeliveryChart /></div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <p className="font-bold text-ink dark:text-white">Pending evaluations</p>
            <Link to="/trainer/evaluations" className="text-xs font-semibold text-velvet hover:text-velvet-bright dark:text-velvet-bright">View all</Link>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {pending.slice(0, 4).map((s) => (
              <div key={s.learner + s.test} className="flex items-center justify-between rounded-xl border border-line px-3.5 py-2.5 dark:border-night-line">
                <div>
                  <p className="text-sm font-medium text-ink dark:text-white/90">{s.learner}</p>
                  <p className="text-xs text-muted dark:text-white/50">{s.test}</p>
                </div>
                <Badge tone="warning">AI {s.aiScore}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <p className="mb-3 font-bold text-ink dark:text-white">Open tasks</p>
          {openTasks.length === 0 ? (
            <p className="text-sm text-muted dark:text-white/50">No open tasks.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {openTasks.map((t) => (
                <div key={t.title} className="flex items-center justify-between rounded-xl border border-line px-4 py-3 dark:border-night-line">
                  <p className="text-sm font-medium text-ink dark:text-white/90">{t.title}</p>
                  <span className="text-xs text-muted dark:text-white/60">Due {t.due}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </motion.div>
  );
}
