"use client";

import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Theme } from "../../hooks/useTheme";

interface Props {
  title: string;
  value: string;
  onChange: (val: string) => void;
  theme: Theme;
}

const PRESET_COLORS = [
  "#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF",
  "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080",
  "#FFC0CB", "#A52A2A", "#808080", "#FFD700", "#4B0082",
];

export default function MinimalColorPicker({ title, value, onChange, theme }: Props) {
  const [recentColors, setRecentColors] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`color-picker-recents-${title}`);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    if (value && !recentColors.includes(value)) {
      const newRecents = [value, ...recentColors.slice(0, 7)];
      setRecentColors(newRecents);
      if (typeof window !== "undefined") {
        localStorage.setItem(`color-picker-recents-${title}`, JSON.stringify(newRecents));
      }
    }
  }, [value, title]);

  const handleHexChange = (hex: string) => {
    const normalized = hex.startsWith("#") ? hex : `#${hex}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(normalized)) {
      onChange(normalized);
    }
  };

  const colorsToShow = [...new Set([...recentColors, ...PRESET_COLORS])].slice(0, 12);

  return (
    <div className="space-y-3">
      <label
        className={cn(
          "block text-xs font-semibold uppercase tracking-wider",
          theme === "dark" ? "text-neutral-400" : "text-neutral-600"
        )}
      >
        {title}
      </label>

      {/* Swatches Grid */}
      <div className="grid grid-cols-6 gap-2">
        {colorsToShow.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={cn(
              "w-10 h-10 rounded-lg border-2 transition-transform touch-manipulation active:scale-90",
              value === color
                ? theme === "dark"
                  ? "ring-2 ring-white border-white/50"
                  : "ring-2 ring-black border-black/50"
                : theme === "dark"
                ? "border-neutral-700"
                : "border-neutral-300"
            )}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* HEX Input */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={cn(
            "h-10 w-10 rounded-lg border-2 flex-shrink-0 transition-all",
            theme === "dark"
              ? "border-neutral-700"
              : "border-neutral-300"
          )}
          style={{ backgroundColor: value }}
        />
        <Input
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => handleHexChange(e.target.value)}
          onBlur={() => {
            if (!/^#?[0-9A-Fa-f]{6}$/.test(value)) {
              onChange("#000000");
            }
          }}
          className={cn(
            "flex-1 h-10 text-sm font-mono",
            theme === "dark"
              ? "bg-neutral-900 border-neutral-700 text-white"
              : "bg-white border-neutral-300 text-black"
          )}
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

