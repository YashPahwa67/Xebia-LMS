// Trainee portal shell: sidebar + topbar + routed content.
import { Outlet } from "react-router-dom";
import TraineeSidebar from "@/features/trainee/TraineeSidebar";
import TraineeTopbar from "@/features/trainee/TraineeTopbar";

export default function TraineeLayout() {
  return (
    <div className="flex min-h-screen bg-canvas dark:bg-night-bg">
      <TraineeSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TraineeTopbar />
        <main className="flex-1 overflow-x-hidden p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
