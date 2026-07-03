// Trainer portal shell: sidebar + topbar + routed content.
import { Outlet } from "react-router-dom";
import TrainerSidebar from "@/features/trainer/TrainerSidebar";
import TrainerTopbar from "@/features/trainer/TrainerTopbar";

export default function TrainerLayout() {
  return (
    <div className="flex min-h-screen bg-canvas dark:bg-night-bg">
      <TrainerSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TrainerTopbar />
        <main className="flex-1 overflow-x-hidden p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
