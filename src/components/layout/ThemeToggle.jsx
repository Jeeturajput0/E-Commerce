import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";
    return (<button type="button" onClick={() => setTheme(isDark ? "light" : "dark")} aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"} className="fixed bottom-4 right-4 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-[var(--shadow-card-hover)] backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-background sm:bottom-5 sm:right-5 sm:h-14 sm:w-14">
      <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary text-primary-foreground">
        {isDark ? <Sun size={18}/> : <Moon size={18}/>}
      </span>
    </button>);
}
