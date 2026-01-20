"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((newTheme: Theme) => {
    if (typeof window === "undefined") return;
    
    const root = document.documentElement;
    console.log("🔄 Applying theme:", newTheme);
    console.log("HTML classes before:", root.classList.toString());
    
    if (newTheme === "dark") {
      root.classList.add("dark");
      console.log("✅ Added 'dark' class");
    } else {
      root.classList.remove("dark");
      console.log("✅ Removed 'dark' class");
    }
    
    console.log("HTML classes after:", root.classList.toString());
  }, []);

  useEffect(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    console.log("🔄 toggleTheme called");
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      console.log("📝 Setting theme in localStorage:", newTheme);
      localStorage.setItem("theme", newTheme);
      console.log("🎨 Calling applyTheme with:", newTheme);
      applyTheme(newTheme);
      console.log("✅ Theme state updated to:", newTheme);
      return newTheme;
    });
  }, [applyTheme]);

  // Always provide context, even during SSR
  // This prevents the "useTheme must be used within a ThemeProvider" error
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
