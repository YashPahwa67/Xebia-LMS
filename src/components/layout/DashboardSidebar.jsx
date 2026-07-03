// Dashboard left sidebar — velvet gradient, grouped nav, user footer.
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiHome,
  FiClock,
  FiBriefcase,
  FiClipboard,
  FiBarChart2,
  FiFileText,
  FiSettings,
} from "react-icons/fi";
import logoWhite from "@/assets/images/logo.png";

const GROUPS = [
  {
    label: "Main",
    items: [
      { to: "/app", label: "Overview", icon: FiHome, end: true },
      { to: "/app/my-path", label: "My Path", icon: FiClock },
      { to: "/app/projects", label: "Projects", icon: FiBriefcase },
      { to: "/app/assessments", label: "Assessments", icon: FiClipboard },
    ],
  },
  {
    label: "Explore",
    items: [
      { to: "/app/leaderboard", label: "Leaderboard", icon: FiBarChart2 },
      { to: "/app/resources", label: "Resources", icon: FiFileText },
      { to: "/app/settings", label: "Settings", icon: FiSettings },
    ],
  },
];

export default function DashboardSidebar() {
  const user = useSelector((s) => s.auth.user);
  const initials = (user?.name || "KS").slice(0, 2).toUpperCase();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-gradient-to-b from-velvet-dark to-velvet px-5 py-6 text-white">
      <div className="mb-8 flex items-center border-b border-white/15 px-2 pb-6">
        {/* logo.png is the transparent purple mark; invert-ish look via brightness for dark bg */}
        <img src={logoWhite} alt="Xebia" className="h-9 w-auto brightness-0 invert" />
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-white/50">
              {group.label}
            </p>
            {group.items.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-white/20 text-white" : "text-white/75 hover:bg-white/10"
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

      <div className="mt-6 flex flex-col items-center gap-2 border-t border-white/15 pt-5">
        <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-white/40 text-lg font-bold">
          {initials}
        </div>
        <p className="text-sm font-semibold">{user?.name || "Khushpreet S."}</p>
      </div>
    </aside>
  );
}
