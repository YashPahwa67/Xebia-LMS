// Simple month calendar (Mon-start) with today highlighted.
import { useMemo } from "react";
import { CALENDAR } from "@/data/dashboardData";

const WEEKDAYS = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

export default function CalendarCard() {
  const days = useMemo(
    () => Array.from({ length: CALENDAR.monthDays }, (_, i) => i + 1),
    []
  );

  return (
    <div className="rounded-2xl bg-white p-6 shadow-card">
      <h3 className="text-lg font-bold text-ink">Calendar</h3>
      <div className="mt-4 grid grid-cols-7 gap-y-2 text-center">
        {WEEKDAYS.map((d) => (
          <span key={d} className="text-xs font-medium text-muted">
            {d}
          </span>
        ))}
        {/* leading blanks so day 1 falls on Monday (startWeekday offset) */}
        {Array.from({ length: CALENDAR.startWeekday }).map((_, i) => (
          <span key={`b-${i}`} />
        ))}
        {days.map((d) => (
          <span
            key={d}
            className={`py-1 text-sm ${
              d === CALENDAR.today ? "font-bold text-red-500" : "text-ink"
            }`}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}
