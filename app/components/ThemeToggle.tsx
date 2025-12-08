"use client";

import { Theme } from "../hooks/useTheme";

interface Props {
  theme: Theme;
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: Props) {
  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full transition-colors ${
        theme === "dark" ? "bg-neutral-700" : "bg-neutral-300"
      }`}
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div
        className={`absolute top-1 left-1 w-5 h-5 rounded-full transition-transform flex items-center justify-center ${
          theme === "dark"
            ? "translate-x-7 bg-white"
            : "translate-x-0 bg-neutral-700"
        }`}
      >
        {theme === "dark" ? (
          <span className="text-xs">🌙</span>
        ) : (
          <span className="text-xs">☀️</span>
        )}
      </div>
    </button>
  );
}