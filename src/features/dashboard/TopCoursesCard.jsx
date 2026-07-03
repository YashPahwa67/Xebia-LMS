// Top courses list card.
import { FiLayout, FiCode, FiCpu, FiDatabase } from "react-icons/fi";
import { TOP_COURSES } from "@/data/dashboardData";

const ICONS = [FiLayout, FiCode, FiCpu, FiDatabase];

export default function TopCoursesCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card">
      <h3 className="text-center text-base font-bold text-ink">Top Courses</h3>
      <ul className="mt-4 flex flex-col gap-4">
        {TOP_COURSES.map((c, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <li key={c.id} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-velvet-soft text-velvet">
                <Icon />
              </span>
              <span className="text-sm font-semibold text-ink">{c.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
