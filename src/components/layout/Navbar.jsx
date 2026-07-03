// Top navigation — solid white bar (matches Figma). Routes between separate pages.
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "FAQ", to: "/faqs" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const linkClass = ({ isActive }) =>
    `hidden font-medium transition-colors sm:inline ${
      isActive
        ? "text-velvet dark:text-velvet-bright"
        : "text-ink/80 hover:text-velvet dark:text-white/80 dark:hover:text-velvet-bright"
    }`;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-line/60 bg-white/95 backdrop-blur-sm dark:border-night-line dark:bg-night-bg/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-3.5 text-sm">
        <button type="button" onClick={() => navigate("/")} aria-label="Home" className="shrink-0">
          <Logo className="h-7" />
        </button>
        <div className="flex items-center gap-6">
          {LINKS.map((link) => (
            <NavLink key={link.label} to={link.to} end className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <ThemeToggle />
          <Button variant="primary" className="!rounded-full !px-6 !py-2" onClick={() => navigate("/login")}>
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
}
