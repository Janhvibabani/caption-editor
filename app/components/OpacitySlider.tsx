"use client";

import { Theme } from "../hooks/useTheme";

interface Props {
  opacity: number;
  setOpacity: (val: number) => void;
  theme: Theme;
}

export default function OpacitySlider({ opacity, setOpacity, theme }: Props) {
  return (
    <div>
      <label className={`block text-xs font-semibold mb-2 uppercase tracking-wider ${
        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
      }`}>
        Background Opacity: {opacity}%
      </label>
      <input
        type="range"
        min="0"
        max="100"
        value={opacity}
        onChange={(e) => setOpacity(Number(e.target.value))}
        className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
          theme === 'dark' 
            ? 'bg-neutral-700 accent-white' 
            : 'bg-neutral-300 accent-black'
        }`}
      />
      <div className={`flex justify-between text-xs mt-1 ${
        theme === 'dark' ? 'text-neutral-600' : 'text-neutral-500'
      }`}>
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
}