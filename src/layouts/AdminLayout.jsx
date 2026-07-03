// Admin portal shell: sidebar + topbar + routed content.
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/features/admin/AdminSidebar";
import AdminTopbar from "@/features/admin/AdminTopbar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-canvas dark:bg-night-bg">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1 overflow-x-hidden p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
