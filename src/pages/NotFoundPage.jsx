// 404 page.
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo className="h-8" />
      <p className="text-6xl font-extrabold text-velvet">404</p>
      <h1 className="text-xl font-bold text-ink">Page not found</h1>
      <p className="max-w-sm text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary">Back to home</Button>
      </Link>
    </main>
  );
}
