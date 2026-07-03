// Organiser (Training Delivery) sidebar — light surface, grouped nav, velvet accents.
import { NavLink } from "react-router-dom";
import {
  FiGrid, FiSend, FiBookOpen, FiCalendar, FiMessageSquare, FiCheckSquare, FiUserPlus, FiUser,
} from "react-icons/fi";
import { useSelector } from "react-redux";

const GROUPS = [
  {
    label: "Overview",
    items: [{ to: "/organiser", label: "Dashboard", icon: FiGrid, end: true }],
  },
  {
    label: "Delivery",
    items: [
      { to: "/organiser/proposals", label: "Proposals", icon: FiSend },
      { to: "/organiser/curriculum", label: "Curriculum", icon: FiBookOpen },
      { to: "/organiser/events", label: "Events", icon: FiCalendar },
    ],
  },
  {
    label: "Engagement",
    items: [
      { to: "/organiser/feedback", label: "Feedback", icon: FiMessageSquare },
      { to: "/organiser/tests", label: "Tests", icon: FiCheckSquare },
      { to: "/organiser/enrolment", label: "Enrolment", icon: FiUserPlus },
    ],
  },
  {
    label: "Account",
    items: [{ to: "/organiser/profile", label: "Profile", icon: FiUser }],
  },
];

export default function OrganiserSidebar() {
  const user = useSelector((s) => s.auth.user);

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-line bg-white dark:border-night-line dark:bg-night-surface">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4 dark:border-night-line">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-velvet text-sm font-bold text-white">X</span>
        <div>
          <p className="text-sm font-bold leading-tight text-ink dark:text-white">XebiaLMS</p>
          <p className="text-xs text-muted dark:text-white/50">Organiser Console</p>
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
        <span className="grid h-9 w-9 place-items-center rounded-full bg-velvet text-xs font-bold text-white">O</span>
        <div>
          <p className="text-sm font-semibold text-ink dark:text-white">{user?.name || "Organiser"}</p>
          <p className="text-xs text-muted dark:text-white/50">ORGANISER</p>
        </div>
      </div>
    </aside>
  );
}
