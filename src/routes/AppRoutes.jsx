// Route table with lazy-loaded pages + code splitting.
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Spinner from "@/components/ui/Spinner";

const PublicLayout = lazy(() => import("@/layouts/PublicLayout"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const FaqPage = lazy(() => import("@/pages/FaqPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"));
const OverviewPage = lazy(() => import("@/pages/dashboard/OverviewPage"));
const PlaceholderPage = lazy(() => import("@/pages/dashboard/PlaceholderPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// Admin portal
const AdminLayout = lazy(() => import("@/layouts/AdminLayout"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const ModulesPage = lazy(() => import("@/pages/admin/ModulesPage"));
const PermissionsPage = lazy(() => import("@/pages/admin/PermissionsPage"));
const RolesGrantsPage = lazy(() => import("@/pages/admin/RolesGrantsPage"));
const UsersPage = lazy(() => import("@/pages/admin/UsersPage"));
const OrganisationsPage = lazy(() => import("@/pages/admin/OrganisationsPage"));
const DomainsPage = lazy(() => import("@/pages/admin/DomainsPage"));
const ParentsPage = lazy(() => import("@/pages/admin/ParentsPage"));
const LearnersPage = lazy(() => import("@/pages/admin/LearnersPage"));
const BatchesPage = lazy(() => import("@/pages/admin/BatchesPage"));
const CoursesPage = lazy(() => import("@/pages/admin/CoursesPage"));
const AuditLogPage = lazy(() => import("@/pages/admin/AuditLogPage"));
const ProfilePage = lazy(() => import("@/pages/admin/ProfilePage"));
const AdminWorkspacePage = lazy(() => import("@/pages/admin/AdminWorkspacePage"));

// Trainee (Learner Console) portal
const TraineeLayout = lazy(() => import("@/layouts/TraineeLayout"));
const TraineeDashboard = lazy(() => import("@/pages/trainee/TraineeDashboard"));
const MyCoursesPage = lazy(() => import("@/pages/trainee/MyCoursesPage"));
const MyBatchesPage = lazy(() => import("@/pages/trainee/MyBatchesPage"));
const AssignmentsPage = lazy(() => import("@/pages/trainee/AssignmentsPage"));
const SchedulePage = lazy(() => import("@/pages/trainee/SchedulePage"));
const CertificatesPage = lazy(() => import("@/pages/trainee/CertificatesPage"));
const TraineeProfilePage = lazy(() => import("@/pages/trainee/TraineeProfilePage"));
const CoursePlayerPage = lazy(() => import("@/pages/trainee/CoursePlayerPage"));
const TestAttemptPage = lazy(() => import("@/pages/trainee/TestAttemptPage"));
const ResultsPage = lazy(() => import("@/pages/trainee/ResultsPage"));
const AchievementsPage = lazy(() => import("@/pages/trainee/AchievementsPage"));
const TicketsPage = lazy(() => import("@/pages/trainee/TicketsPage"));
const EventsPage = lazy(() => import("@/pages/trainee/EventsPage"));

// Trainer (Trainer Workspace) portal
const TrainerLayout = lazy(() => import("@/layouts/TrainerLayout"));
const TrainerDashboard = lazy(() => import("@/pages/trainer/TrainerDashboard"));
const TrainerCoursesPage = lazy(() => import("@/pages/trainer/TrainerCoursesPage"));
const CourseEditorPage = lazy(() => import("@/pages/trainer/CourseEditorPage"));
const AssessmentsPage = lazy(() => import("@/pages/trainer/AssessmentsPage"));
const EvaluationsPage = lazy(() => import("@/pages/trainer/EvaluationsPage"));
const FeedbackPage = lazy(() => import("@/pages/trainer/FeedbackPage"));
const TrainerBatchesPage = lazy(() => import("@/pages/trainer/TrainerBatchesPage"));
const BatchRosterPage = lazy(() => import("@/pages/trainer/BatchRosterPage"));
const TrainerSchedulePage = lazy(() => import("@/pages/trainer/TrainerSchedulePage"));
const TasksPage = lazy(() => import("@/pages/trainer/TasksPage"));
const TrainerTicketsPage = lazy(() => import("@/pages/trainer/TrainerTicketsPage"));
const TrainerProfilePage = lazy(() => import("@/pages/trainer/TrainerProfilePage"));

// Manager (Workforce & Operations) portal
const ManagerLayout = lazy(() => import("@/layouts/ManagerLayout"));
const ManagerDashboard = lazy(() => import("@/pages/manager/ManagerDashboard"));
const TrainersPage = lazy(() => import("@/pages/manager/TrainersPage"));
const ManagerOrganisationsPage = lazy(() => import("@/pages/manager/ManagerOrganisationsPage"));
const TrainerAssignmentsPage = lazy(() => import("@/pages/manager/TrainerAssignmentsPage"));
const ApprovalsPage = lazy(() => import("@/pages/manager/ApprovalsPage"));
const ManagerBatchesPage = lazy(() => import("@/pages/manager/ManagerBatchesPage"));
const ManagerProfilePage = lazy(() => import("@/pages/manager/ManagerProfilePage"));

function PageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="!h-8 !w-8 !border-velvet/30 !border-t-velvet" />
    </div>
  );
}

const PLACEHOLDERS = [
  ["my-path", "My Path"],
  ["projects", "Projects"],
  ["assessments", "Assessments"],
  ["leaderboard", "Leaderboard"],
  ["resources", "Resources"],
  ["settings", "Settings"],
];

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OverviewPage />} />
          {PLACEHOLDERS.map(([path, title]) => (
            <Route key={path} path={path} element={<PlaceholderPage title={title} />} />
          ))}
        </Route>

        {/* Admin portal */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="modules" element={<ModulesPage />} />
          <Route path="permissions" element={<PermissionsPage />} />
          <Route path="roles" element={<RolesGrantsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="organisations" element={<OrganisationsPage />} />
          <Route path="domains" element={<DomainsPage />} />
          <Route path="parents" element={<ParentsPage />} />
          <Route path="learners" element={<LearnersPage />} />
          <Route path="batches" element={<BatchesPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="audit" element={<AuditLogPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="administration" element={<AdminWorkspacePage title="Administration" route="/admin" />} />
          <Route path="scheduling" element={<AdminWorkspacePage title="Scheduling" route="/scheduling" />} />
          <Route path="assessment" element={<AdminWorkspacePage title="Assessment" route="/assessment" />} />
          <Route path="finance" element={<AdminWorkspacePage title="Finance" route="/finance" />} />
        </Route>

        {/* Trainee portal */}
        <Route
          path="/trainee"
          element={
            <ProtectedRoute>
              <TraineeLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TraineeDashboard />} />
          <Route path="courses" element={<MyCoursesPage />} />
          <Route path="courses/:courseId" element={<CoursePlayerPage />} />
          <Route path="batches" element={<MyBatchesPage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="tests/:testId/attempt" element={<TestAttemptPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="certificates" element={<CertificatesPage />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="profile" element={<TraineeProfilePage />} />
        </Route>

        {/* Trainer portal */}
        <Route
          path="/trainer"
          element={
            <ProtectedRoute>
              <TrainerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TrainerDashboard />} />
          <Route path="courses" element={<TrainerCoursesPage />} />
          <Route path="courses/:courseId" element={<CourseEditorPage />} />
          <Route path="assessments" element={<AssessmentsPage />} />
          <Route path="evaluations" element={<EvaluationsPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="batches" element={<TrainerBatchesPage />} />
          <Route path="batches/:batchId" element={<BatchRosterPage />} />
          <Route path="schedule" element={<TrainerSchedulePage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="tickets" element={<TrainerTicketsPage />} />
          <Route path="profile" element={<TrainerProfilePage />} />
        </Route>

        {/* Manager portal */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute>
              <ManagerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ManagerDashboard />} />
          <Route path="trainers" element={<TrainersPage />} />
          <Route path="organisations" element={<ManagerOrganisationsPage />} />
          <Route path="assignments" element={<TrainerAssignmentsPage />} />
          <Route path="approvals" element={<ApprovalsPage />} />
          <Route path="batches" element={<ManagerBatchesPage />} />
          <Route path="profile" element={<ManagerProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
