"use client";

import { Theme } from "../hooks/useTheme";

interface Props {
  font: string;
  setFont: (val: string) => void;
  theme: Theme;
}

const FONTS = [
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "'Courier New', monospace", label: "Courier New" },
  { value: "Verdana, sans-serif", label: "Verdana" },
  { value: "'Times New Roman', serif", label: "Times New Roman" },
  { value: "Impact, sans-serif", label: "Impact" },
  { value: "'Comic Sans MS', cursive", label: "Comic Sans MS" },
  { value: "'Trebuchet MS', sans-serif", label: "Trebuchet MS" },
];

export default function FontPicker({ font, setFont, theme }: Props) {
  return (
    <div>
      <label className={`block text-xs font-semibold mb-2 uppercase tracking-wider ${
        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
      }`}>
        Font
      </label>
      <select
        value={font}
        onChange={(e) => setFont(e.target.value)}
        className={`w-full px-3 py-2 border rounded text-sm focus:outline-none ${
          theme === 'dark'
            ? 'bg-neutral-900 border-neutral-700 focus:border-neutral-500 text-white'
            : 'bg-white border-neutral-300 focus:border-neutral-500 text-black'
        }`}
      >
        {FONTS.map((f) => (
          <option 
            key={f.value} 
            value={f.value}
            style={{ fontFamily: f.value }}
          >
            {f.label}
          </option>
        ))}
      </select>
    </div>
  );
}