// Organiser overview — delivery KPIs, proposal trend, pending proposals & events.
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import { ORGANISER_OVERVIEW, ORG_PROPOSALS, ORG_EVENTS } from "@/data/organiserData";

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-line bg-white p-5 shadow-card dark:border-night-line dark:bg-night-surface ${className}`}>{children}</div>;
}

function StatTile({ value, label, tone }) {
  return (
    <Card>
      <p className={`text-3xl font-bold leading-none ${tone === "orange" ? "text-cta-orange" : "text-ink dark:text-white"}`}>{value}</p>
      <p className="mt-2 text-sm text-muted dark:text-white/60">{label}</p>
    </Card>
  );
}

function ProposalChart() {
  const data = ORGANISER_OVERVIEW.proposals;
  const max = Math.max(...data, 1);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const H = 150, BAR = 118;
  return (
    <div className="flex items-end justify-between gap-3" style={{ height: H }}>
      {data.map((v, i) => (
        <div key={days[i]} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
          <span className="text-xs font-semibold text-ink dark:text-white/80">{v}</span>
          <div className="w-3.5 rounded-t bg-velvet" style={{ height: Math.max(4, (v / max) * BAR) }} title={`${v} proposals`} />
          <span className="text-xs text-muted dark:text-white/50">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

export default function OrganiserDashboard() {
  const user = useSelector((s) => s.auth.user);
  const o = ORGANISER_OVERVIEW;
  const pending = ORG_PROPOSALS.filter((p) => p.status === "PENDING");
  const liveEvents = ORG_EVENTS.filter((e) => e.status !== "DRAFT");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-velvet-dark to-velvet p-6 text-white shadow-card">
          <h2 className="text-lg font-bold">Welcome back, {(user?.name || o.organiser.name).split(" ")[0]}</h2>
          <p className="mt-1 text-sm text-white/75">Delivery operations for {o.organiser.org}.</p>
          <Link to="/organiser/proposals">
            <span className="mt-6 inline-flex rounded-lg bg-velvet-bright px-4 py-2.5 text-sm font-semibold hover:brightness-110">New proposal</span>
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
          <p className="font-bold text-ink dark:text-white">Proposals submitted</p>
          <p className="text-xs text-muted dark:text-white/50">This week, by day</p>
          <div className="mt-4"><ProposalChart /></div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <p className="font-bold text-ink dark:text-white">Awaiting approval</p>
            <Link to="/organiser/proposals" className="text-xs font-semibold text-velvet hover:text-velvet-bright dark:text-velvet-bright">View all</Link>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {pending.length === 0 && <p className="text-sm text-muted dark:text-white/50">Nothing pending.</p>}
            {pending.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-xl border border-line px-3.5 py-2.5 dark:border-night-line">
                <div>
                  <p className="text-sm font-medium text-ink dark:text-white/90">{p.topic}</p>
                  <p className="text-xs text-muted dark:text-white/50">{p.trainer} · {p.slot}</p>
                </div>
                <Badge tone="warning">PENDING</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <p className="mb-3 font-bold text-ink dark:text-white">Events</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {liveEvents.map((e) => (
              <div key={e.id} className="rounded-xl border border-line p-4 dark:border-night-line">
                <Badge tone={e.status === "PUBLISHED" ? "success" : "warning"}>{e.status}</Badge>
                <p className="mt-2 font-semibold text-ink dark:text-white">{e.title}</p>
                <p className="text-xs text-muted dark:text-white/50">{e.starts}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
