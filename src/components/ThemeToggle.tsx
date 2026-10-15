"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const onLight = usePathname() === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const chip = onLight
    ? "bg-white/90 border-slate-200 text-slate-700 hover:bg-slate-50"
    : "bg-background/80 border-foreground/10 text-foreground hover:bg-foreground/10";

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`fixed top-[52px] right-20 z-50 p-3 rounded-full backdrop-blur-md border shadow-lg transition-colors cursor-pointer ${chip}`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
