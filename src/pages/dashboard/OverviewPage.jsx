// Overview dashboard page — composes the topbar, hero, stats and widget grid.
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import DashboardTopbar from "@/components/layout/DashboardTopbar";
import HeroBanner from "@/features/dashboard/HeroBanner";
import StatCard from "@/features/dashboard/StatCard";
import ContinueCard from "@/features/dashboard/ContinueCard";
import AssignmentsCard from "@/features/dashboard/AssignmentsCard";
import TopCoursesCard from "@/features/dashboard/TopCoursesCard";
import CalendarCard from "@/features/dashboard/CalendarCard";
import ProgressCard from "@/features/dashboard/ProgressCard";
import { STATS } from "@/data/dashboardData";

export default function OverviewPage() {
  const user = useSelector((s) => s.auth.user);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <DashboardTopbar />

      <HeroBanner name={user?.name || "Khushpreet"} />

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
          <StatCard key={s.id} {...s} />
        ))}
      </div>

      {/* Widget grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-1">
          <ContinueCard />
          <CalendarCard />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-1">
          <AssignmentsCard />
          <ProgressCard />
        </div>
        <div className="lg:col-span-1">
          <TopCoursesCard />
        </div>
      </div>
    </motion.div>
  );
}
