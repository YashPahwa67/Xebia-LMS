// Dashboard top bar — date + greeting on the left, search + notifications on the right.
import { useSelector } from "react-redux";
import { FiSearch, FiBell } from "react-icons/fi";

const DATE_LABEL = new Date().toLocaleDateString("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function DashboardTopbar() {
  const user = useSelector((s) => s.auth.user);

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-sm text-muted">{DATE_LABEL}</p>
        <h1 className="text-2xl font-bold text-ink">Morning, {user?.name || "Khushpreet"}!</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="Search modules, skills..."
            aria-label="Search"
            className="w-64 rounded-lg border border-line bg-white py-2.5 pl-9 pr-3 text-sm focus:border-velvet focus:outline-none focus:ring-2 focus:ring-velvet/30"
          />
        </div>
        <button
          aria-label="Notifications"
          className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-white text-ink hover:bg-canvas"
        >
          <FiBell />
        </button>
      </div>
    </div>
  );
}
