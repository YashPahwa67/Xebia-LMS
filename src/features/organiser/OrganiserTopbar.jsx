// Organiser top bar — console title, search, notifications, theme toggle, logout.
import { useDispatch } from "react-redux";
import { FiSearch, FiBell, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/slices/authSlice";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function OrganiserTopbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-line bg-white/90 px-6 py-3 backdrop-blur-sm dark:border-night-line dark:bg-night-surface/90">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted dark:text-white/50">Xebia Academy</p>
        <p className="text-sm font-bold text-ink dark:text-white">Organiser Console</p>
      </div>
      <div className="relative ml-auto hidden sm:block">
        <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="search"
          placeholder="Search..."
          aria-label="Search"
          className="w-72 rounded-lg border border-line bg-canvas py-2 pl-9 pr-3 text-sm focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30 dark:border-night-line dark:bg-night-bg dark:text-white"
        />
      </div>
      <ThemeToggle />
      <button aria-label="Notifications" className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink hover:bg-canvas dark:border-night-line dark:text-white dark:hover:bg-white/10">
        <FiBell />
      </button>
      <button
        onClick={() => { dispatch(logout()); navigate("/login"); }}
        aria-label="Log out"
        className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink hover:bg-canvas dark:border-night-line dark:text-white dark:hover:bg-white/10"
      >
        <FiLogOut />
      </button>
    </header>
  );
}
