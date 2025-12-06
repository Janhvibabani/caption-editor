"use client";

import { Theme } from "../hooks/useTheme";

interface Props {
  title: string;
  value: string;
  onChange: (val: string) => void;
  theme: Theme;
}

export default function ColorPicker({ title, value, onChange, theme }: Props) {
  return (
    <div>
      <label className={`block text-xs font-semibold mb-2 uppercase tracking-wider ${
        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
      }`}>
        {title}
      </label>
      <div className="flex gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-12 h-10 rounded cursor-pointer border ${
            theme === 'dark' ? 'border-neutral-700' : 'border-neutral-300'
          }`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 px-3 py-2 border rounded text-sm focus:outline-none ${
            theme === 'dark'
              ? 'bg-neutral-900 border-neutral-700 focus:border-neutral-500 text-white'
              : 'bg-white border-neutral-300 focus:border-neutral-500 text-black'
          }`}
          placeholder="#000000"
        />
      </div>
    </div>
  );
}