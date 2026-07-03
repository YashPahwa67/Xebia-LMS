// Mock data for the Trainee (Learner Console) portal. Stands in for API responses.

// Dashboard model matching the learner overview design.
export const DASH = {
  pacePct: 88,
  nextModule: "AWS Architect",
  stats: [
    { id: "enrolled", value: 31, label: "Modules enrolled", tone: "ink" },
    { id: "completed", value: 9, label: "Completed", tone: "ink" },
    { id: "review", value: 5, label: "In review", tone: "ink" },
    { id: "pass", value: "91%", label: "Pass rate", tone: "emerald" },
  ],
  continue: {
    step: "Module 4 of 9",
    title: "Cloud Architecture on AWS",
    chapter: "Chapter 4 · Kubernetes Orchestration Patterns",
    tags: ["DevOps", "Kubernetes", "AWS EKS"],
    progress: 64,
  },
  skills: [
    { name: "Cloud Architecture", pct: 78, tone: "velvet" },
    { name: "Kubernetes", pct: 64, tone: "velvet" },
    { name: "Python / Scripting", pct: 83, tone: "emerald" },
    { name: "Security Practices", pct: 51, tone: "blue" },
    { name: "CI/CD Pipelines", pct: 69, tone: "velvet" },
  ],
  // Hours logged per day vs the 3hr daily goal.
  pace: [
    { day: "Mon", logged: 2.8 }, { day: "Tue", logged: 3.2 }, { day: "Wed", logged: 1.1 },
    { day: "Thu", logged: 2.5 }, { day: "Fri", logged: 3.6 }, { day: "Sat", logged: 1.8 }, { day: "Sun", logged: 3.0 },
  ],
  dailyGoal: 3,
  certGoals: [
    { name: "AWS Solutions Architect", status: "Scheduled · July 12, 2026", tone: "emerald" },
    { name: "Kubernetes Administrator (CKA)", status: "In Prep · Target: Aug 5", tone: "orange" },
  ],
  team: [
    { rank: 1, initials: "RM", name: "Rohan M." },
    { rank: 2, initials: "PS", name: "Priya S." },
    { rank: 3, initials: "KS", name: "Khushpreet S.", you: true },
    { rank: 4, initials: "AK", name: "Aryan K." },
    { rank: 5, initials: "NR", name: "Neha R." },
  ],
  recommended: [
    { name: "Terraform & IaC Foundations", level: "Intermediate", tone: "velvet" },
    { name: "Observability with Grafana", level: "Advanced", tone: "emerald" },
  ],
};

export const TRAINEE_OVERVIEW = {
  learner: { name: "Ghanshyam Dwivedi", email: "learner@xebia.lms", domain: "DevOps & Cloud" },
  totals: { enrolledCourses: 3, activeBatches: 2, completedCourses: 5, certificates: 4 },
  progress: 68,
  attendancePct: 92,
  avgScore: 84,
  streakDays: 12,
  trends: {
    hoursLearned: [2, 4, 3, 6, 5, 7, 6],
    scores: [60, 65, 72, 70, 78, 82, 84],
  },
  nextDeadline: { title: "React Hooks Assignment", due: "Jul 5, 2026" },
};

export const MY_COURSES = [
  { course: "Java Full Stack", author: "GS Dwivedi", domain: "Full Stack", lectures: 60, completed: 41, status: "IN PROGRESS" },
  { course: "DevOps & Cloud Foundations", author: "GS Dwivedi", domain: "DevOps & Cloud", lectures: 48, completed: 48, status: "COMPLETED" },
  { course: "React.js Essentials", author: "GS Dwivedi", domain: "Full Stack", lectures: 32, completed: 12, status: "IN PROGRESS" },
];

export const MY_BATCHES = [
  { batch: "Bennett Batch DevOps", meta: "6 Months", org: "State Technical University", trainer: "GS Dwivedi", status: "ACTIVE" },
  { batch: "Agentic AI vs Generative AI", meta: "3 Months (12 Weeks)", org: "State Technical University", trainer: "GS Dwivedi", status: "PENDING" },
];

export const MY_ASSIGNMENTS = [
  { title: "React Hooks Assignment", course: "React.js Essentials", due: "Jul 5, 2026", score: "—", status: "PENDING" },
  { title: "Spring Boot REST API", course: "Java Full Stack", due: "Jun 28, 2026", score: "92 / 100", status: "GRADED" },
  { title: "Docker Compose Lab", course: "DevOps & Cloud Foundations", due: "Jun 20, 2026", score: "88 / 100", status: "GRADED" },
  { title: "CI/CD Pipeline Project", course: "DevOps & Cloud Foundations", due: "Jul 12, 2026", score: "—", status: "PENDING" },
];

export const MY_SCHEDULE = [
  { title: "React State Management", course: "React.js Essentials", day: "Mon", time: "10:00 – 11:30", trainer: "GS Dwivedi", mode: "ONLINE" },
  { title: "Spring Security Deep Dive", course: "Java Full Stack", day: "Wed", time: "14:00 – 15:30", trainer: "GS Dwivedi", mode: "ONLINE" },
  { title: "Kubernetes Basics", course: "DevOps & Cloud Foundations", day: "Thu", time: "11:00 – 12:30", trainer: "GS Dwivedi", mode: "CLASSROOM" },
];

export const MY_CERTIFICATES = [
  { name: "DevOps & Cloud Foundations", issued: "Jun 15, 2026", credentialId: "XB-DEVOPS-2041" },
  { name: "Agile Fundamentals", issued: "Apr 02, 2026", credentialId: "XB-AGILE-1188" },
];

// Badges earned from performance (M05 — RewardService).
export const MY_BADGES = [
  { code: "FAST_START", label: "Fast Starter", awarded: "May 20, 2026" },
  { code: "PERFECT_ATTEND", label: "Perfect Attendance", awarded: "Jun 10, 2026" },
  { code: "TOP_QUIZ", label: "Quiz Ace", awarded: "Jun 22, 2026" },
];

// Higher-order awards (M05 — award entity).
export const MY_AWARDS = [
  { title: "Top Performer — DevOps Batch", basis: "Highest average score", awarded: "Jun 25, 2026" },
];

// Course content tree keyed by course title — modules → submodules → content (M04 authored, M05 consumed).
export const COURSE_DETAILS = {
  "Java Full Stack": {
    domain: "Full Stack",
    author: "GS Dwivedi",
    version: 3,
    modules: [
      {
        title: "Core Java",
        submodules: [
          { title: "JVM & Data Types", estMinutes: 25, completed: true, content: [
            { type: "TEXT", body: "The JVM executes bytecode on any platform. Primitives (int, long, double, boolean) are stored on the stack; objects live on the heap." },
            { type: "IMAGE", caption: "JVM memory model", src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='120'%3E%3Crect width='320' height='120' fill='%23EDEAF4'/%3E%3Crect x='16' y='20' width='130' height='80' rx='8' fill='%236C1D5F'/%3E%3Crect x='174' y='20' width='130' height='80' rx='8' fill='%2301AC9F'/%3E%3Ctext x='81' y='66' fill='white' font-family='sans-serif' font-size='16' text-anchor='middle'%3EStack%3C/text%3E%3Ctext x='239' y='66' fill='white' font-family='sans-serif' font-size='16' text-anchor='middle'%3EHeap%3C/text%3E%3C/svg%3E" },
            { type: "CODE", language: "java", body: "public class Hello {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, JVM\");\n  }\n}" },
            { type: "VIDEO", title: "Lecture recording: JVM internals", src: "" },
          ] },
          { title: "Collections Framework", estMinutes: 35, completed: true, content: [
            { type: "TEXT", body: "List, Set and Map are the core interfaces. ArrayList is backed by a resizable array; HashMap gives O(1) average lookups." },
          ] },
        ],
      },
      {
        title: "Spring Boot",
        submodules: [
          { title: "REST Controllers", estMinutes: 40, completed: true, content: [
            { type: "TEXT", body: "@RestController combines @Controller and @ResponseBody. Map routes with @GetMapping / @PostMapping." },
            { type: "CODE", language: "java", body: "@RestController\n@RequestMapping(\"/api/v1/courses\")\nclass CourseController {\n  @GetMapping(\"/{id}\")\n  Course get(@PathVariable UUID id) { return service.find(id); }\n}" },
          ] },
          { title: "Spring Security & JWT", estMinutes: 45, completed: false, content: [
            { type: "TEXT", body: "Secure endpoints with a filter chain; issue RS256 JWTs and resolve MODULE:ACTION scopes on every request." },
          ] },
        ],
      },
    ],
  },
  "React.js Essentials": {
    domain: "Full Stack",
    author: "GS Dwivedi",
    version: 1,
    modules: [
      {
        title: "Fundamentals",
        submodules: [
          { title: "JSX & Components", estMinutes: 20, completed: true, content: [
            { type: "TEXT", body: "Components are functions returning JSX. Props flow down; state is local and triggers re-renders on change." },
          ] },
          { title: "Hooks — useState & useEffect", estMinutes: 30, completed: false, content: [
            { type: "TEXT", body: "useState holds local state; useEffect runs side-effects after render, keyed by its dependency array." },
            { type: "CODE", language: "jsx", body: "const [count, setCount] = useState(0);\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);" },
          ] },
        ],
      },
    ],
  },
  "DevOps & Cloud Foundations": {
    domain: "DevOps & Cloud",
    author: "GS Dwivedi",
    version: 2,
    modules: [
      {
        title: "Containers",
        submodules: [
          { title: "Docker Basics", estMinutes: 30, completed: true, content: [
            { type: "TEXT", body: "A container packages an app with its dependencies. Images are layered and immutable; containers are running instances." },
          ] },
          { title: "Docker Compose", estMinutes: 25, completed: true, content: [
            { type: "TEXT", body: "Compose defines multi-container apps in one YAML file and starts them with a single command." },
          ] },
        ],
      },
    ],
  },
};

// Tests available to attempt (M07 authored, M05 attempts). Windowed + timed.
export const MY_TESTS = {
  "react-hooks-quiz": {
    title: "React Hooks Assignment",
    course: "React.js Essentials",
    durationMin: 15,
    domain: "Full Stack",
    questions: [
      { id: "q1", prompt: "Which hook stores local component state?", options: ["useEffect", "useState", "useMemo", "useRef"], answer: 1 },
      { id: "q2", prompt: "When does useEffect with an empty dependency array run?", options: ["Every render", "Only on mount", "Never", "On unmount only"], answer: 1 },
      { id: "q3", prompt: "What does a state setter trigger?", options: ["A network call", "A re-render", "A page reload", "Nothing"], answer: 1 },
    ],
  },
  "cicd-project": {
    title: "CI/CD Pipeline Project",
    course: "DevOps & Cloud Foundations",
    durationMin: 20,
    domain: "DevOps & Cloud",
    questions: [
      { id: "q1", prompt: "What triggers a CI pipeline in most setups?", options: ["A git push", "A manual reboot", "A DB write", "A cron only"], answer: 0 },
      { id: "q2", prompt: "Which stage typically runs unit tests?", options: ["Deploy", "Build/Test", "Release approval", "Rollback"], answer: 1 },
    ],
  },
};

// Finalised results with per-domain breakdown & AI feedback (M07 — test_result).
export const MY_RESULTS = [
  { title: "Spring Boot REST API", course: "Java Full Stack", score: 92, max: 100, domain: "Full Stack", feedback: "Strong controller design. Tighten exception handling on invalid IDs.", status: "GRADED" },
  { title: "Docker Compose Lab", course: "DevOps & Cloud Foundations", score: 88, max: 100, domain: "DevOps & Cloud", feedback: "Good service composition. Add health checks to each service.", status: "GRADED" },
];

// Published events the learner can see — event carousel (M05, from Organiser M03).
export const MY_EVENTS = [
  { id: "e1", title: "Agentic AI Hackathon", org: "State Technical University", when: "Jul 18, 2026", tag: "Hackathon", accent: "velvet",
    description: "48-hour hackathon: build a tool-using LLM agent. Prizes for the top 3 teams." },
  { id: "e2", title: "Cloud Career Fair", org: "Acme Corp", when: "Jul 24, 2026", tag: "Career", accent: "emerald",
    description: "Meet hiring partners across DevOps, SRE and platform engineering roles." },
  { id: "e3", title: "React Performance Workshop", org: "State Technical University", when: "Aug 2, 2026", tag: "Workshop", accent: "orange",
    description: "Hands-on session on profiling and optimising React apps at scale." },
];

// Tickets the learner raised to trainers (M05 — learner_ticket).
export const MY_TICKETS = [
  { subject: "Clarification on JWT refresh rotation", trainer: "GS Dwivedi", status: "ANSWERED", created: "Jun 26, 2026" },
  { subject: "Docker volume not persisting", trainer: "GS Dwivedi", status: "OPEN", created: "Jul 1, 2026" },
];
