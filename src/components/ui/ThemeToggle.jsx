// Light/dark toggle button.
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-canvas dark:border-night-line dark:text-white dark:hover:bg-white/10"
    >
      {theme === "dark" ? <FiSun /> : <FiMoon />}
    </button>
  );
}
