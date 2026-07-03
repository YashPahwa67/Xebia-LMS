// Admin (Platform Console) sidebar — light surface, grouped nav, velvet accents.
import { NavLink } from "react-router-dom";
import {
  FiGrid, FiKey, FiShield, FiUsers, FiHome, FiTag, FiFolder,
  FiUser, FiLayers, FiBookOpen, FiFileText, FiSettings, FiCalendar,
  FiCheckSquare, FiDollarSign,
} from "react-icons/fi";
import { useSelector } from "react-redux";

const GROUPS = [
  {
    label: "Access Control",
    items: [
      { to: "/admin", label: "Dashboard", icon: FiGrid, end: true },
      { to: "/admin/modules", label: "Modules", icon: FiLayers },
      { to: "/admin/permissions", label: "Permissions", icon: FiKey },
      { to: "/admin/roles", label: "Roles & Grants", icon: FiShield },
      { to: "/admin/users", label: "Users", icon: FiUsers },
    ],
  },
  {
    label: "Directory",
    items: [
      { to: "/admin/organisations", label: "Organisations", icon: FiHome },
      { to: "/admin/domains", label: "Domains", icon: FiTag },
      { to: "/admin/parents", label: "Parents", icon: FiFolder },
      { to: "/admin/learners", label: "Learners", icon: FiUser },
      { to: "/admin/batches", label: "Batches", icon: FiLayers },
      { to: "/admin/courses", label: "Courses", icon: FiBookOpen },
    ],
  },
  {
    label: "Governance",
    items: [{ to: "/admin/audit", label: "Audit Log", icon: FiFileText }],
  },
  {
    label: "Account",
    items: [{ to: "/admin/profile", label: "Profile", icon: FiUser }],
  },
  {
    label: "Modules",
    items: [
      { to: "/admin/administration", label: "Administration", icon: FiSettings },
      { to: "/admin/scheduling", label: "Scheduling", icon: FiCalendar },
      { to: "/admin/assessment", label: "Assessment", icon: FiCheckSquare },
      { to: "/admin/finance", label: "Finance", icon: FiDollarSign },
    ],
  },
];

export default function AdminSidebar() {
  const user = useSelector((s) => s.auth.user);

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-line bg-white dark:border-night-line dark:bg-night-surface">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4 dark:border-night-line">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-velvet text-sm font-bold text-white">X</span>
        <div>
          <p className="text-sm font-bold leading-tight text-ink dark:text-white">XebiaLMS</p>
          <p className="text-xs text-muted dark:text-white/50">Platform Console</p>
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
        <span className="grid h-9 w-9 place-items-center rounded-full bg-velvet text-xs font-bold text-white">P</span>
        <div>
          <p className="text-sm font-semibold text-ink dark:text-white">{user?.name || "Platform Admin"}</p>
          <p className="text-xs text-muted dark:text-white/50">ADMIN</p>
        </div>
      </div>
    </aside>
  );
}
