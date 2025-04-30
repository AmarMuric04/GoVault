"use client";

import { useEffect, useState } from "react";
import HoverTitle from "./hover-title";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const currentTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="hover:bg-primary/20 p-2 transition-all"
    >
      <HoverTitle title="Change theme">
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </HoverTitle>
    </button>
  );
}
