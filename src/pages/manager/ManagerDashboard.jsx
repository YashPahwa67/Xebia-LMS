// Manager overview — workforce KPIs, decision trend, pending approval queue.
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import { MANAGER_OVERVIEW, MGR_APPROVALS } from "@/data/managerData";

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

function DecisionChart() {
  const data = MANAGER_OVERVIEW.decisions;
  const max = Math.max(...data, 1);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const H = 150, BAR = 118;
  return (
    <div className="flex items-end justify-between gap-3" style={{ height: H }}>
      {data.map((v, i) => (
        <div key={days[i]} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
          <span className="text-xs font-semibold text-ink dark:text-white/80">{v}</span>
          <div className="w-3.5 rounded-t bg-velvet" style={{ height: Math.max(4, (v / max) * BAR) }} title={`${v} decisions`} />
          <span className="text-xs text-muted dark:text-white/50">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

export default function ManagerDashboard() {
  const user = useSelector((s) => s.auth.user);
  const o = MANAGER_OVERVIEW;
  const pending = MGR_APPROVALS.filter((a) => a.status === "PENDING");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-velvet-dark to-velvet p-6 text-white shadow-card">
          <h2 className="text-lg font-bold">Welcome back, {(user?.name || o.manager.name).split(" ")[0]}</h2>
          <p className="mt-1 text-sm text-white/75">You are the single approval authority for delivery.</p>
          <Link to="/manager/approvals">
            <span className="mt-6 inline-flex rounded-lg bg-velvet-bright px-4 py-2.5 text-sm font-semibold hover:brightness-110">Review approvals ({pending.length})</span>
          </Link>
        </div>
        <Card><StatTile {...o.stats[0]} /></Card>
        <Card><StatTile {...o.stats[3]} /></Card>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {o.stats.map((s) => <StatTile key={s.id} {...s} />)}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <p className="font-bold text-ink dark:text-white">Decisions this week</p>
          <p className="text-xs text-muted dark:text-white/50">Approvals, holds and rejections by day</p>
          <div className="mt-4"><DecisionChart /></div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <p className="font-bold text-ink dark:text-white">Pending approvals</p>
            <Link to="/manager/approvals" className="text-xs font-semibold text-velvet hover:text-velvet-bright dark:text-velvet-bright">View all</Link>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {pending.slice(0, 4).map((a) => (
              <div key={a.title} className="flex items-center justify-between rounded-xl border border-line px-3.5 py-2.5 dark:border-night-line">
                <div>
                  <p className="text-sm font-medium text-ink dark:text-white/90">{a.title}</p>
                  <p className="text-xs text-muted dark:text-white/50">{a.by}</p>
                </div>
                <Badge tone="warning">{a.type}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
