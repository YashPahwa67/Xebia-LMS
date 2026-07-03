// Manager portal shell: sidebar + topbar + routed content.
import { Outlet } from "react-router-dom";
import ManagerSidebar from "@/features/manager/ManagerSidebar";
import ManagerTopbar from "@/features/manager/ManagerTopbar";

export default function ManagerLayout() {
  return (
    <div className="flex min-h-screen bg-canvas dark:bg-night-bg">
      <ManagerSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <ManagerTopbar />
        <main className="flex-1 overflow-x-hidden p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
