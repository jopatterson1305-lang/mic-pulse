"use client";

import { useEffect, useState } from "react";

type Theme = "system" | "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  useEffect(() => {
    const stored = window.localStorage.getItem("mic-theme") as Theme | null;
    const value: Theme = stored === "light" || stored === "dark" ? stored : "system";
    setTheme(value);
    document.documentElement.dataset.theme = value;
  }, []);
  function cycle() {
    const next: Theme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(next);
    window.localStorage.setItem("mic-theme", next);
    document.documentElement.dataset.theme = next;
  }
  return <button className="theme-toggle" type="button" aria-label={`Theme: ${theme}. Change theme`} onClick={cycle}><span aria-hidden="true">{theme === "dark" ? "☾" : theme === "light" ? "☀" : "◐"}</span><small>{theme}</small></button>;
}
