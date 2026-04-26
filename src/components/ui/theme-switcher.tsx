"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/src/components/ThemeProvider";

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse border border-zinc-200 dark:border-zinc-700" />
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md cursor-pointer pointer-events-auto"
      aria-label="Toggle theme"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {resolvedTheme === "light" ? (
          <Sun className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-500 group-hover:-rotate-12" />
        )}
      </div>
      
      <span className="text-[0.65rem] font-bold uppercase tracking-[0.05em] select-none">
        {resolvedTheme === "light" ? "Light" : "Dark"}
      </span>
    </button>
  );
}
