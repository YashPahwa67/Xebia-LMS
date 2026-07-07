// Mock data for the Admin (Platform Console) portal. Stands in for API responses.

export const OVERVIEW = {
  totals: { students: 1, trainers: 1, enrolledCourses: 0, activeBatches: 1 },
  certificatesIssued: 1280,
  atRiskLearners: 14,
  mrr: 45200,
  weeklyGrowthPct: 12.5,
  courseApprovals: { pending: 1, approved: 0, rejected: 0 },
  tickets: { open: 3, resolved: 14 },
  topCourse: "Full-Stack with Spring",
  onlineTutors: 1,
  trends: {
    activeStudents: [30, 42, 38, 55, 68, 60, 72],
    enrolments: [12, 18, 15, 26, 30, 28, 34],
  },
};

export const PERMISSIONS = [
  { code: "ADM:AUDIT:VIEW", action: "VIEW", module: "ADM" },
  { code: "ADM:BATCH:MANAGE", action: "MANAGE", module: "BATCH" },
  { code: "ADM:COURSE:MANAGE", action: "MANAGE", module: "COURSE" },
  { code: "ADM:DOMAIN:MANAGE", action: "MANAGE", module: "DOMAIN" },
  { code: "ADM:LEARNER:MANAGE", action: "MANAGE", module: "LEARNERS" },
  { code: "ADM:ORG:MANAGE", action: "MANAGE", module: "ORG" },
  { code: "ADM:PARENT:MANAGE", action: "MANAGE", module: "PARENT" },
  { code: "ADM:RBAC:MANAGE", action: "MANAGE", module: "ADM" },
  { code: "ADM:UPDATE", action: "UPDATE", module: "ADM" },
  { code: "ADM:USER:MANAGE", action: "MANAGE", module: "ADM" },
];

export const USERS = [
  { email: "admin@xebia.lms", name: "Platform Admin", role: "ADMIN", status: "ACTIVE", self: true },
  { email: "trainer@xebia.lms", name: "Trainer", role: "TRAINER", status: "ACTIVE" },
  { email: "learner@xebia.lms", name: "Learner", role: "LEARNER", status: "ACTIVE" },
];

export const ORGANISATIONS = [
  { name: "State Technical University", type: "UNIVERSITY", branch: "Pune", status: "ACTIVE" },
];

export const DOMAINS = [
  { code: "REACT", name: "React.js", parent: "—", status: "ACTIVE" },
  { code: "E23455", name: "Prometheus", parent: "—", status: "ACTIVE" },
  { code: "DEVOPS", name: "DevOps & Cloud", parent: "—", status: "ACTIVE" },
];

export const PARENTS = [
  { name: "Devops", icon: "—", status: "ACTIVE" },
  { name: "Full Stack", icon: "—", status: "ACTIVE" },
];

export const LEARNERS = [
  {
    learner: "Learner",
    email: "learner@xebia.lms",
    organisation: "State Technical University",
    type: "University",
    domain: "DevOps & Cloud",
    sem: "5",
    status: "ACTIVE",
  },
];

export const BATCHES = [
  { batch: "Agentic AI vs Generative AI", meta: "3 Months (12 Weeks)", org: "State Technical University", learners: 0, status: "PENDING", createdBy: "trainer@xebia.lms" },
  { batch: "Bennett Batch DevOps", meta: "6 Months", org: "State Technical University", learners: 0, status: "APPROVED", createdBy: "trainer@xebia.lms" },
];

export const COURSES = [
  { course: "Java Full Stack", author: "Trainer", days: "Mon, Wed, Thu", duration: "16d", lectures: 60, status: "PENDING" },
];

export const ROLES = [
  { name: "ADMIN", tag: "System", note: "Platform administrator", badge: "Super admin" },
  { name: "LEARNER", tag: "System", note: "Learning experience" },
  { name: "MANAGER", tag: "System", note: "Workforce & operations / approver" },
  { name: "ORGANISER", tag: "System", note: "Training delivery" },
  { name: "REVIEWER", tag: "", note: "REVIEWER" },
  { name: "TRAINER", tag: "System", note: "Course authoring & delivery" },
];

export const MODULES_REGISTRY = [
  { title: "Administration", key: "ADM", route: "/admin" },
  { title: "Scheduling", key: "SCHEDULING", route: "/scheduling" },
  { title: "Assessment", key: "ASSESSMENT", route: "/assessment" },
  { title: "Organisations", key: "ORG", route: "/organisations" },
  { title: "Domains", key: "DOMAIN", route: "/domains" },
  { title: "Category", key: "PARENT", route: "/parents" },
  { title: "Finance", key: "FINANCE", route: "/finance" },
  { title: "Learners", key: "LEARNERS", route: "/learners" },
  { title: "Batches", key: "BATCH", route: "/batches" },
  { title: "Courses", key: "COURSE", route: "/courses" },
];

export const ADMIN_PROFILE = {
  name: "Platform Admin",
  email: "admin@xebia.lms",
  userId: "e0000000-0000-0000-0000-000000000001",
  role: "ADMIN",
  roleNote: "Super admin",
  permissionVersion: 22,
  scopes: PERMISSIONS.map((p) => p.code),
};
