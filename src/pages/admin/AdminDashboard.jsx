// Admin overview — platform-wide KPIs, trends, approvals and helpdesk.
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import { OVERVIEW } from "@/data/adminData";

const SAMPLE = <span className="ml-2 rounded bg-black/5 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-muted dark:bg-white/10 dark:text-white/50">Sample</span>;

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-line bg-white p-5 shadow-card dark:border-night-line dark:bg-night-surface ${className}`}>
      {children}
    </div>
  );
}

function Metric({ label, value, sub }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted dark:text-white/50">{label}</p>
      <p className="mt-1 text-2xl font-bold text-ink dark:text-white">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-emerald-brand">{sub}</p>}
    </div>
  );
}

function TrendChart() {
  const { activeStudents, enrolments } = OVERVIEW.trends;
  const W = 560, H = 180, max = 80;
  const path = (pts) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * W},${H - (p / max) * H}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-44 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6C1D5F" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6C1D5F" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path(activeStudents)} L${W},${H} L0,${H} Z`} fill="url(#a)" />
      <path d={path(activeStudents)} fill="none" stroke="#6C1D5F" strokeWidth="2.5" />
      <path d={path(enrolments)} fill="none" stroke="#FF6200" strokeWidth="2.5" />
    </svg>
  );
}

export default function AdminDashboard() {
  const o = OVERVIEW;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Overview hero */}
        <div className="rounded-2xl bg-gradient-to-br from-velvet-dark to-velvet p-6 text-white shadow-card">
          <h2 className="text-lg font-bold">LMS Platform Overview</h2>
          <p className="mt-1 text-sm text-white/75">Live counts across learners, trainers, courses and batches.</p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div><p className="text-xs text-white/60">Total Students</p><p className="text-xl font-bold">{o.totals.students}</p></div>
            <div><p className="text-xs text-white/60">Trainers</p><p className="text-xl font-bold">{o.totals.trainers}</p></div>
            <div><p className="text-xs text-white/60">Enrolled Courses</p><p className="text-xl font-bold">{o.totals.enrolledCourses}</p></div>
            <div><p className="text-xs text-white/60">Active Batches</p><p className="text-xl font-bold">{o.totals.activeBatches}</p></div>
          </div>
        </div>

        <Card><Metric label={<>Certificates issued {SAMPLE}</>} value={o.certificatesIssued.toLocaleString()} sub={`+15 new today`} /></Card>
        <Card><Metric label={<>MRR {SAMPLE}</>} value={`$${o.mrr.toLocaleString()}`} sub={`+8.4% this month`} /></Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Trends */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-ink dark:text-white">Active Student Trends {SAMPLE}</p>
              <p className="text-xs text-muted dark:text-white/50">Activity rates versus course registrations</p>
            </div>
            <div className="flex gap-1 text-xs">
              <span className="rounded bg-velvet px-2 py-1 text-white">Daily</span>
              <span className="rounded px-2 py-1 text-muted dark:text-white/60">Weekly</span>
              <span className="rounded px-2 py-1 text-muted dark:text-white/60">Monthly</span>
            </div>
          </div>
          <TrendChart />
          <div className="flex gap-4 text-xs text-muted dark:text-white/60">
            <span><span className="text-velvet">●</span> Active students</span>
            <span><span className="text-cta-orange">●</span> Enrolments</span>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <p className="text-xs uppercase tracking-wide text-muted dark:text-white/50">Syllabus Registry</p>
            <p className="font-bold text-ink dark:text-white">Course Approvals</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-cta-orange/10 py-3"><p className="text-lg font-bold text-cta-orange">{o.courseApprovals.pending}</p><p className="text-[11px] text-muted">Pending</p></div>
              <div className="rounded-lg bg-emerald-brand/10 py-3"><p className="text-lg font-bold text-emerald-brand">{o.courseApprovals.approved}</p><p className="text-[11px] text-muted">Approved</p></div>
              <div className="rounded-lg bg-black/5 py-3 dark:bg-white/10"><p className="text-lg font-bold text-ink dark:text-white">{o.courseApprovals.rejected}</p><p className="text-[11px] text-muted">Rejected</p></div>
            </div>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-wide text-muted dark:text-white/50">Helpdesk Overview</p>
            <p className="font-bold text-ink dark:text-white">Active Support Tickets</p>
            <div className="mt-3 flex gap-3">
              <div className="flex-1 rounded-lg bg-cta-orange/10 py-3 text-center"><p className="text-lg font-bold text-cta-orange">{o.tickets.open}</p><p className="text-[11px] text-muted">Open</p></div>
              <div className="flex-1 rounded-lg bg-emerald-brand/10 py-3 text-center"><p className="text-lg font-bold text-emerald-brand">{o.tickets.resolved}</p><p className="text-[11px] text-muted">Resolved</p></div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card><p className="text-xs uppercase tracking-wide text-muted dark:text-white/50">Classroom Metrics {SAMPLE}</p><p className="mt-1 font-bold text-ink dark:text-white">Top Performing Course</p><p className="text-sm text-muted dark:text-white/60">{o.topCourse}</p></Card>
        <Card><p className="text-xs uppercase tracking-wide text-muted dark:text-white/50">Faculty Audit {SAMPLE}</p><p className="mt-1 font-bold text-ink dark:text-white">Faculty &amp; Online Tutors</p><p className="text-sm text-muted dark:text-white/60">{o.onlineTutors} trainers</p></Card>
        <Card><p className="text-xs uppercase tracking-wide text-muted dark:text-white/50">Activity Audit {SAMPLE}</p><p className="mt-1 font-bold text-ink dark:text-white">Live Activity Feed</p><p className="text-sm text-muted dark:text-white/60">No live feed yet</p></Card>
      </div>

      <p className="mt-4 text-xs text-muted dark:text-white/40">
        Figures tagged <Badge tone="muted">Sample</Badge> are illustrative placeholders — the platform doesn&apos;t capture that data yet. Everything else is live.
      </p>
    </motion.div>
  );
}
