"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: Theme;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
  resolvedTheme: "dark",
});

export function useTheme() {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  attribute?: "class" | "data-theme";
  storageKey?: string;
  disableTransitionOnChange?: boolean;
  enableSystem?: boolean;
  [key: string]: unknown;
}

function applyTheme(theme: Theme, attribute: "class" | "data-theme") {
  const root = document.documentElement;
  if (attribute === "class") {
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  } else {
    root.setAttribute("data-theme", theme);
  }
  root.style.colorScheme = theme;
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  attribute = "class",
  storageKey = "theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // On mount, read from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null;
    const resolved: Theme = stored === "light" || stored === "dark" ? stored : defaultTheme;
    setThemeState(resolved);
    applyTheme(resolved, attribute as "class" | "data-theme");
    setMounted(true);
  }, [storageKey, defaultTheme, attribute]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {}
      applyTheme(newTheme, attribute as "class" | "data-theme");
    },
    [storageKey, attribute]
  );

  if (!mounted) {
    // Render children without provider to avoid flash —
    // theme is applied synchronously via the inline script below.
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme: theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
