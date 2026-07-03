// Organiser portal shell: sidebar + topbar + routed content.
import { Outlet } from "react-router-dom";
import OrganiserSidebar from "@/features/organiser/OrganiserSidebar";
import OrganiserTopbar from "@/features/organiser/OrganiserTopbar";

export default function OrganiserLayout() {
  return (
    <div className="flex min-h-screen bg-canvas dark:bg-night-bg">
      <OrganiserSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <OrganiserTopbar />
        <main className="flex-1 overflow-x-hidden p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
