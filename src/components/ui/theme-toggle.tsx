"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Theme toggle button — switches between dark and light modes.
 * Stores preference in localStorage and sets data-theme attribute on <html>.
 */
export default function ThemeToggle() {
  const [state, setState] = useState({ dark: true, mounted: false });

  useEffect(() => {
    // Only run on client after hydration
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : true;
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    
    // Use Promise to defer state update after effect completes
    Promise.resolve().then(() => {
      setState({ dark: isDark, mounted: true });
    });
  }, []);

  const toggleTheme = () => {
    setState((prev) => {
      const newDark = !prev.dark;
      document.documentElement.setAttribute("data-theme", newDark ? "dark" : "light");
      localStorage.setItem("theme", newDark ? "dark" : "light");
      return { ...prev, dark: newDark };
    });
  };

  // Don't render until after hydration to avoid mismatch
  if (!state.mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-1 text-text-faint hover:text-accent transition-colors"
      aria-label={`Switch to ${state.dark ? "light" : "dark"} mode`}
      title={`Switch to ${state.dark ? "light" : "dark"} mode`}
    >
      {state.dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
