"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  mounted: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// Helper to get initial theme - reads from DOM attribute set by blocking script
function getInitialTheme(): Theme {
  if (typeof window !== "undefined") {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "dark" || attr === "light") return attr;
  }
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Sync React state with DOM on mount (blocking script already set the attribute)
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") as Theme;
    if (currentTheme && (currentTheme === "light" || currentTheme === "dark")) {
      setTheme(currentTheme);
    }
    setMounted(true);
  }, []);

  // Sync theme changes to DOM and localStorage
  const applyTheme = useCallback((newTheme: Theme) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("avisio-theme", newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      applyTheme(newTheme);
      return newTheme;
    });
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
