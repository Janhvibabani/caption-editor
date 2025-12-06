"use client";

import { Theme } from "../hooks/useTheme";

interface Props {
  theme: Theme;
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: Props) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-neutral-700">
      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
        Theme
      </span>
      <button
        onClick={toggleTheme}
        className={`relative w-14 h-7 rounded-full transition-colors ${
          theme === "dark" ? "bg-neutral-700" : "bg-neutral-300"
        }`}
        aria-label="Toggle theme"
      >
        <div
          className={`absolute top-1 left-1 w-5 h-5 rounded-full transition-transform ${
            theme === "dark"
              ? "translate-x-7 bg-white"
              : "translate-x-0 bg-neutral-700"
          }`}
        >
          {theme === "dark" ? (
            <span className="flex items-center justify-center text-xs">🌙</span>
          ) : (
            <span className="flex items-center justify-center text-xs">☀️</span>
          )}
        </div>
      </button>
    </div>
  );
}