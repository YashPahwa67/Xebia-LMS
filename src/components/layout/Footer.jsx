// Site footer with brand blurb + navigation/resource columns.
import { Link } from "react-router-dom";
import { FiGlobe, FiShare2 } from "react-icons/fi";
import Logo from "@/components/ui/Logo";
import { FOOTER } from "@/constants/home";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white py-12 dark:border-night-line dark:bg-night-bg">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="h-7" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted dark:text-white/60">
            {FOOTER.blurb}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted dark:text-white/50">
            Navigation
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {FOOTER.navigation.map((n) => (
              <li key={n.label}>
                <Link to={n.to} className="text-ink/80 hover:text-velvet dark:text-white/70 dark:hover:text-velvet-bright">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted dark:text-white/50">
            Resources
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {FOOTER.resources.map((r) => (
              <li key={r}>
                <a href="#" className="text-ink/80 hover:text-velvet dark:text-white/70 dark:hover:text-velvet-bright">
                  {r}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl items-center justify-between px-6 text-xs text-muted dark:text-white/50">
        <span>© {new Date().getFullYear()} Xebia. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <FiGlobe />
          <FiShare2 />
        </div>
      </div>
    </footer>
  );
}
