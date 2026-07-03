// Mock data for the Organiser (Training Delivery Orchestration) portal — M03. Stands in for API responses.

export const ORGANISER_OVERVIEW = {
  organiser: { name: "Abhishek Dixit", email: "organiser@xebia.lms", org: "State Technical University" },
  stats: [
    { id: "courses", value: 5, label: "Running courses", tone: "ink" },
    { id: "trainers", value: 3, label: "Assigned trainers", tone: "ink" },
    { id: "batches", value: 4, label: "Batches", tone: "ink" },
    { id: "pending", value: 3, label: "Awaiting approval", tone: "orange" },
  ],
  // Proposals submitted per weekday (mini chart).
  proposals: [2, 3, 1, 4, 3, 1, 0],
};

// Trainers assigned to the organiser's org (M02 link, read here).
export const ORG_TRAINERS = ["GS Dwivedi", "Rohan Mehta", "Priya Sharma"];
export const ORG_DOMAINS = ["Full Stack", "DevOps & Cloud", "AI", "Data & ML"];
export const ORG_BATCHES = ["Bennett Batch DevOps", "Agentic AI vs Generative AI", "Cloud Cohort 3", "Full Stack Batch A"];
export const ORG_BRANCHES = ["CSE", "IT", "ECE", "—"];

// Trainer availability from Scheduling (M06). FREE windows are proposable; BUSY are not (no double-booking).
export const TRAINER_AVAILABILITY = {
  "GS Dwivedi": [
    { id: "gd-mon", day: "Mon", time: "10:00 – 11:30", state: "FREE" },
    { id: "gd-tue", day: "Tue", time: "14:00 – 15:30", state: "BUSY" },
    { id: "gd-wed", day: "Wed", time: "11:00 – 12:30", state: "FREE" },
    { id: "gd-thu", day: "Thu", time: "09:00 – 10:30", state: "FREE" },
    { id: "gd-fri", day: "Fri", time: "15:00 – 16:30", state: "BUSY" },
  ],
  "Rohan Mehta": [
    { id: "rm-mon", day: "Mon", time: "13:00 – 14:30", state: "FREE" },
    { id: "rm-wed", day: "Wed", time: "10:00 – 11:30", state: "FREE" },
    { id: "rm-thu", day: "Thu", time: "16:00 – 17:30", state: "BUSY" },
  ],
  "Priya Sharma": [
    { id: "ps-tue", day: "Tue", time: "10:00 – 11:30", state: "FREE" },
    { id: "ps-fri", day: "Fri", time: "11:00 – 12:30", state: "FREE" },
  ],
};

// Submitted training proposals / bookings (M03 proposal_draft → M06 booking lifecycle).
export const ORG_PROPOSALS = [
  { id: "p1", topic: "Spring Security Deep Dive", trainer: "GS Dwivedi", batch: "Bennett Batch DevOps", domain: "Full Stack", slot: "Mon 10:00 – 11:30", mode: "ONLINE", venue: "—", status: "PENDING" },
  { id: "p2", topic: "Kubernetes Basics", trainer: "GS Dwivedi", batch: "Bennett Batch DevOps", domain: "DevOps & Cloud", slot: "Wed 11:00 – 12:30", mode: "ONSITE", venue: "Lab 2, Floor 3", status: "CONFIRMED" },
  { id: "p3", topic: "Agentic AI Intro", trainer: "Rohan Mehta", batch: "Agentic AI vs Generative AI", domain: "AI", slot: "Mon 13:00 – 14:30", mode: "ONLINE", venue: "—", status: "PENDING" },
];

// Trainer feedback the organiser gives (M03 — trainer_feedback, routed to trainer + Manager).
export const ORG_FEEDBACK = [
  { id: "f1", trainer: "GS Dwivedi", batch: "Bennett Batch DevOps", rating: 5, notes: "Outstanding delivery and learner engagement.", created: "Jun 27, 2026" },
  { id: "f2", trainer: "Rohan Mehta", batch: "Agentic AI vs Generative AI", rating: 4, notes: "Great content; pace slightly fast in week 2.", created: "Jun 22, 2026" },
];

// Events with banner carousel + attachments (M03 — event, event_banner, event_attachment).
export const ORG_EVENTS = [
  { id: "e1", title: "Agentic AI Hackathon", description: "48-hour hackathon to build tool-using LLM agents.", starts: "Jul 18, 2026", ends: "Jul 20, 2026", status: "PUBLISHED",
    banners: [{ kind: "TEXT", caption: "Win prizes worth ₹50k" }, { kind: "IMAGE", caption: "Sponsor wall" }], attachments: 1 },
  { id: "e2", title: "Cloud Career Fair", description: "Meet hiring partners across DevOps and SRE roles.", starts: "Jul 24, 2026", ends: "Jul 24, 2026", status: "PENDING",
    banners: [{ kind: "TEXT", caption: "20+ companies" }], attachments: 0 },
  { id: "e3", title: "React Performance Workshop", description: "Hands-on profiling and optimisation.", starts: "Aug 2, 2026", ends: "Aug 2, 2026", status: "DRAFT",
    banners: [], attachments: 0 },
];

// Tests the organiser created/assigned via Assessment (M03 TestFacade → M07).
export const ORG_TESTS = [
  { id: "t1", title: "DevOps Mid-term", course: "DevOps & Cloud Foundations", batch: "Bennett Batch DevOps", questions: 20, status: "PUBLISHED", avgScore: 82, submissions: 22 },
  { id: "t2", title: "React Basics Quiz", course: "React.js Essentials", batch: "Full Stack Batch A", questions: 10, status: "PUBLISHED", avgScore: 76, submissions: 18 },
  { id: "t3", title: "AI Foundations Test", course: "Agentic AI Patterns", batch: "Agentic AI vs Generative AI", questions: 15, status: "DRAFT", avgScore: null, submissions: 0 },
];

// Curriculum: published course versions assigned to batches (M03 — course_assignment).
export const ORG_CURRICULUM = [
  { id: "ca1", batch: "Bennett Batch DevOps", course: "DevOps & Cloud Foundations", version: 2, startsOn: "Jun 1, 2026", status: "ACTIVE" },
  { id: "ca2", batch: "Full Stack Batch A", course: "Java Full Stack", version: 3, startsOn: "Jun 10, 2026", status: "ACTIVE" },
  { id: "ca3", batch: "Agentic AI vs Generative AI", course: "Agentic AI Patterns", version: 1, startsOn: "Jul 1, 2026", status: "ASSIGNED" },
];

// Published courses available to assign as curriculum (from Trainer M04).
export const PUBLISHED_COURSES = [
  { course: "Java Full Stack", version: 3 },
  { course: "React.js Essentials", version: 1 },
  { course: "DevOps & Cloud Foundations", version: 2 },
];

// Candidate learners for batch-wise enrolment, by branch (M03 — student_add_request).
export const ENROLMENT_CANDIDATES = [
  { learner: "Ghanshyam Dwivedi", email: "learner@xebia.lms", branch: "CSE" },
  { learner: "Aryan K.", email: "aryan@xebia.lms", branch: "CSE" },
  { learner: "Priya S.", email: "priya@xebia.lms", branch: "IT" },
  { learner: "Neha R.", email: "neha@xebia.lms", branch: "ECE" },
  { learner: "Rohan M.", email: "rohan@xebia.lms", branch: "IT" },
  { learner: "Lakshit T.", email: "lakshit@xebia.lms", branch: "CSE" },
];
