// Authenticated shell: fixed sidebar + scrollable content area.
import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-canvas">
      <DashboardSidebar />
      <div className="flex-1 overflow-x-hidden p-6 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
}
