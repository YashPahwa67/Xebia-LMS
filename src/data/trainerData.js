// Mock data for the Trainer (Trainer Workspace) portal. Stands in for API responses (M04).

export const TRAINER_OVERVIEW = {
  trainer: { name: "Trainer", email: "trainer@xebia.lms", domain: "Full Stack · DevOps" },
  stats: [
    { id: "courses", value: 4, label: "Authored courses", tone: "ink" },
    { id: "published", value: 3, label: "Published", tone: "ink" },
    { id: "batches", value: 2, label: "Assigned batches", tone: "ink" },
    { id: "pending", value: 6, label: "Pending evaluations", tone: "orange" },
  ],
  ratingPct: 94,
  learnersTaught: 48,
  // Sessions delivered per weekday (for the mini chart).
  delivery: [3, 4, 2, 5, 4, 1, 0],
};

// Courses the trainer authored (M04 — course: summary, level, version, status).
export const AUTHORED_COURSES = [
  { course: "Java Full Stack", domain: "Full Stack", summary: "End-to-end Java backend with Spring Boot and a React front end.", level: "INTERMEDIATE", modules: 2, version: 3, status: "PUBLISHED" },
  { course: "React.js Essentials", domain: "Full Stack", summary: "Component model, hooks and state management from first principles.", level: "BEGINNER", modules: 1, version: 1, status: "PUBLISHED" },
  { course: "DevOps & Cloud Foundations", domain: "DevOps & Cloud", summary: "Containers, CI/CD and Kubernetes for reliable delivery.", level: "INTERMEDIATE", modules: 1, version: 2, status: "PUBLISHED" },
  { course: "Agentic AI Patterns", domain: "AI", summary: "Design patterns for tool-using LLM agents.", level: "ADVANCED", modules: 1, version: 1, status: "DRAFT" },
];

// Authored content tree per course — modules → submodules → content blocks (M04).
// Content types: TEXT | CODE | IMAGE | PDF | VIDEO (video/media via presigned S3).
export const TRAINER_COURSE_CONTENT = {
  "Java Full Stack": [
    {
      id: "m1", title: "Core Java",
      submodules: [
        { id: "s1", title: "JVM & Data Types", estMinutes: 25, content: [
          { id: "c1", type: "TEXT", body: "The JVM executes bytecode on any platform. Primitives live on the stack; objects on the heap." },
          { id: "c2", type: "CODE", language: "java", body: "public class Hello {\n  public static void main(String[] a) {\n    System.out.println(\"Hello, JVM\");\n  }\n}" },
        ] },
        { id: "s2", title: "Collections", estMinutes: 30, content: [
          { id: "c3", type: "TEXT", body: "List, Set and Map are the core interfaces. HashMap gives O(1) average lookups." },
        ] },
      ],
    },
    {
      id: "m2", title: "Spring Boot",
      submodules: [
        { id: "s3", title: "REST Controllers", estMinutes: 40, content: [
          { id: "c4", type: "CODE", language: "java", body: "@RestController\n@RequestMapping(\"/api/v1/courses\")\nclass CourseController { }" },
          { id: "c5", type: "VIDEO", title: "Walkthrough: building a controller", src: "", caption: "Screen recording (upload to attach)" },
        ] },
      ],
    },
  ],
  "React.js Essentials": [
    {
      id: "m1", title: "Fundamentals",
      submodules: [
        { id: "s1", title: "JSX & Components", estMinutes: 20, content: [
          { id: "c1", type: "TEXT", body: "Components are functions returning JSX. Props flow down; state is local." },
        ] },
        { id: "s2", title: "Hooks", estMinutes: 30, content: [
          { id: "c2", type: "CODE", language: "jsx", body: "const [n, setN] = useState(0);\nuseEffect(() => { document.title = n; }, [n]);" },
        ] },
      ],
    },
  ],
  "DevOps & Cloud Foundations": [
    {
      id: "m1", title: "Containers",
      submodules: [
        { id: "s1", title: "Docker Basics", estMinutes: 30, content: [
          { id: "c1", type: "TEXT", body: "A container packages an app with its dependencies. Images are layered and immutable." },
        ] },
      ],
    },
  ],
  "Agentic AI Patterns": [
    {
      id: "m1", title: "Foundations",
      submodules: [
        { id: "s1", title: "Tool-using agents", estMinutes: 20, content: [
          { id: "c1", type: "TEXT", body: "An agent plans, calls tools, observes results and iterates until the goal is met." },
        ] },
      ],
    },
  ],
};

// Assessments the trainer authored (M07 — test).
export const TRAINER_TESTS = [
  { title: "React Hooks Assignment", course: "React.js Essentials", type: "MCQ", questions: 12, status: "PUBLISHED" },
  { title: "Spring Boot REST API", course: "Java Full Stack", type: "MIXED", questions: 8, status: "PUBLISHED" },
  { title: "CI/CD Pipeline Project", course: "DevOps & Cloud Foundations", type: "THEORETICAL", questions: 5, status: "DRAFT" },
];

// Batches assigned to the trainer with roster counts.
export const TRAINER_BATCHES = [
  { batch: "Bennett Batch DevOps", meta: "6 Months", org: "State Technical University", learners: 24, status: "RUNNING" },
  { batch: "Agentic AI vs Generative AI", meta: "3 Months (12 Weeks)", org: "State Technical University", learners: 18, status: "PLANNED" },
];

// Learner rosters per batch (M04 — assigned-batch views & rosters).
export const TRAINER_ROSTERS = {
  "Bennett Batch DevOps": [
    { learner: "Learner", email: "learner@xebia.lms", progress: 68, avgScore: 84, attendance: 92 },
    { learner: "Aryan K.", email: "aryan@xebia.lms", progress: 54, avgScore: 71, attendance: 88 },
    { learner: "Priya S.", email: "priya@xebia.lms", progress: 81, avgScore: 90, attendance: 96 },
    { learner: "Neha R.", email: "neha@xebia.lms", progress: 42, avgScore: 63, attendance: 80 },
  ],
  "Agentic AI vs Generative AI": [
    { learner: "Rohan M.", email: "rohan@xebia.lms", progress: 35, avgScore: 77, attendance: 85 },
    { learner: "Lakshit T.", email: "lakshit@xebia.lms", progress: 60, avgScore: 82, attendance: 90 },
  ],
};

// Learner submissions awaiting evaluation / AI-score override (M04 — trainer_evaluation).
export const SUBMISSIONS = [
  { learner: "Learner", test: "Spring Boot REST API", course: "Java Full Stack", aiScore: 88, status: "PENDING_REVIEW" },
  { learner: "Aryan K.", test: "React Hooks Assignment", course: "React.js Essentials", aiScore: 74, status: "PENDING_REVIEW" },
  { learner: "Priya S.", test: "Docker Compose Lab", course: "DevOps & Cloud Foundations", aiScore: 91, status: "GRADED" },
  { learner: "Neha R.", test: "React Hooks Assignment", course: "React.js Essentials", aiScore: 62, status: "PENDING_REVIEW" },
];

// Trainer→learner qualitative feedback (M04 — learner_feedback).
export const LEARNER_FEEDBACK = [
  { learner: "Learner", batch: "Bennett Batch DevOps", notes: "Excellent grasp of Spring Security. Keep pushing on testing depth.", created: "Jun 27, 2026" },
  { learner: "Aryan K.", batch: "Bennett Batch DevOps", notes: "Solid effort; revisit React reconciliation and keys.", created: "Jun 24, 2026" },
];

// Confirmed sessions (read from Scheduling — M06, read-only here).
export const TRAINER_SCHEDULE = [
  { title: "Spring Security Deep Dive", batch: "Bennett Batch DevOps", day: "Mon", time: "10:00 – 11:30", mode: "ONLINE" },
  { title: "Kubernetes Basics", batch: "Bennett Batch DevOps", day: "Wed", time: "14:00 – 15:30", mode: "CLASSROOM" },
  { title: "Agentic AI Intro", batch: "Agentic AI vs Generative AI", day: "Thu", time: "11:00 – 12:30", mode: "ONLINE" },
];

// Trainer to-dos tied to delivery (M04 — task).
export const TRAINER_TASKS = [
  { title: "Publish Agentic AI Patterns v1", due: "Jul 6, 2026", status: "OPEN" },
  { title: "Grade CI/CD project submissions", due: "Jul 8, 2026", status: "OPEN" },
  { title: "Upload week-5 lecture notes", due: "Jul 2, 2026", status: "DONE" },
];

// Learner-raised tickets for the trainer to answer (M04 — ticket).
export const TRAINER_TICKETS = [
  { subject: "Clarification on JWT refresh rotation", learner: "Learner", status: "OPEN", created: "Jun 26, 2026" },
  { subject: "Docker volume not persisting", learner: "Priya S.", status: "OPEN", created: "Jul 1, 2026" },
  { subject: "React key warning in list", learner: "Aryan K.", status: "ANSWERED", created: "Jun 24, 2026" },
];
