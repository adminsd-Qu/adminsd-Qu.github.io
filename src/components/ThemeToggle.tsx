"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "@phosphor-icons/react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const preferred = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDark(stored === "dark" || (!stored && preferred));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  if (!mounted) {
    // Render invisible placeholder with same dimensions to prevent layout shift
    return <div className="w-5 h-5" />;
  }

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      aria-label={dark ? "切换到亮色模式" : "切换到暗色模式"}
    >
      {dark ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
    </button>
  );
}
