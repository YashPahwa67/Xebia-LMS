// Trainee (Learner Console) sidebar — light surface, grouped nav, velvet accents.
import { NavLink } from "react-router-dom";
import {
  FiGrid, FiBookOpen, FiLayers, FiCheckSquare, FiBarChart2, FiCalendar,
  FiAward, FiStar, FiHelpCircle, FiUser, FiZap,
} from "react-icons/fi";
import { useSelector } from "react-redux";

const GROUPS = [
  {
    label: "Learning",
    items: [
      { to: "/trainee", label: "Dashboard", icon: FiGrid, end: true },
      { to: "/trainee/courses", label: "My Courses", icon: FiBookOpen },
      { to: "/trainee/batches", label: "My Batches", icon: FiLayers },
      { to: "/trainee/assignments", label: "Assignments", icon: FiCheckSquare },
      { to: "/trainee/results", label: "Results", icon: FiBarChart2 },
      { to: "/trainee/schedule", label: "Schedule", icon: FiCalendar },
      { to: "/trainee/events", label: "Events", icon: FiZap },
    ],
  },
  {
    label: "Rewards",
    items: [
      { to: "/trainee/achievements", label: "Achievements", icon: FiStar },
      { to: "/trainee/certificates", label: "Certificates", icon: FiAward },
    ],
  },
  {
    label: "Support",
    items: [{ to: "/trainee/tickets", label: "Tickets", icon: FiHelpCircle }],
  },
  {
    label: "Account",
    items: [{ to: "/trainee/profile", label: "Profile", icon: FiUser }],
  },
];

export default function TraineeSidebar() {
  const user = useSelector((s) => s.auth.user);

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-line bg-white dark:border-night-line dark:bg-night-surface">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4 dark:border-night-line">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-velvet text-sm font-bold text-white">X</span>
        <div>
          <p className="text-sm font-bold leading-tight text-ink dark:text-white">XebiaLMS</p>
          <p className="text-xs text-muted dark:text-white/50">Learner Console</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {GROUPS.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted/70 dark:text-white/40">
              {group.label}
            </p>
            {group.items.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-velvet-soft font-semibold text-velvet dark:bg-velvet/20 dark:text-velvet-bright"
                      : "text-ink/70 hover:bg-canvas dark:text-white/70 dark:hover:bg-white/5"
                  }`
                }
              >
                <Icon className="text-base" />
                {label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-3 border-t border-line px-5 py-4 dark:border-night-line">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-velvet text-xs font-bold text-white">L</span>
        <div>
          <p className="text-sm font-semibold text-ink dark:text-white">{user?.name || "Learner"}</p>
          <p className="text-xs text-muted dark:text-white/50">LEARNER</p>
        </div>
      </div>
    </aside>
  );
}
