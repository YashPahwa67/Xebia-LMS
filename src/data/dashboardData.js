// Mock data for the post-login Overview dashboard (stands in for API responses).

export const STATS = [
  { id: "enrolled", value: 23, label: "Confirm Enrolled", icon: "book", tint: "velvet" },
  { id: "completed", value: 12, label: "Completed", icon: "check", tint: "emerald" },
  { id: "progress", value: 8, label: "In Progress", icon: "play", tint: "orange" },
  { id: "success", value: "98%", label: "Success Rate", icon: "trophy", tint: "velvet" },
];

export const CONTINUE = {
  step: "Module 4 of 9",
  title: "Cloud Architecture on AWS",
  chapter: "Chapter 4 · Kubernetes Orchestration Patterns",
  progress: 64,
};

export const ASSIGNMENTS = [
  { id: "a1", title: "UI Wireframe", due: "Due in 2 days" },
  { id: "a2", title: "Design System", due: "Due in 5 days" },
];

export const TOP_COURSES = [
  { id: "c1", title: "UI/UX Design" },
  { id: "c2", title: "Web Development" },
  { id: "c3", title: "Software Engineering" },
  { id: "c4", title: "Database Mangement" },
];

// Weekly progress trend (percent), used by the line chart.
export const PROGRESS_TREND = [20, 26, 22, 40, 55, 48, 70, 65, 87];

export const CALENDAR = {
  monthDays: 31,
  startWeekday: 0, // Mon-based grid; 1 falls on Monday
  today: 17,
};
