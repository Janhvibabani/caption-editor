"use client";

import { Theme } from "../hooks/useTheme";

interface Props {
  textStroke: number;
  setTextStroke: (val: number) => void;
  textStrokeColor: string;
  setTextStrokeColor: (val: string) => void;
  theme: Theme;
}

export default function TextStrokeControls({
  textStroke,
  setTextStroke,
  textStrokeColor,
  setTextStrokeColor,
  theme,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className={`block text-xs font-semibold mb-2 uppercase tracking-wider ${
          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
        }`}>
          Text Stroke: {textStroke}px
        </label>
        <input
          type="range"
          min="0"
          max="10"
          value={textStroke}
          onChange={(e) => setTextStroke(Number(e.target.value))}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
            theme === 'dark' 
              ? 'bg-neutral-700 accent-white' 
              : 'bg-neutral-300 accent-black'
          }`}
        />
        <div className={`flex justify-between text-xs mt-1 ${
          theme === 'dark' ? 'text-neutral-600' : 'text-neutral-500'
        }`}>
          <span>None</span>
          <span>10px</span>
        </div>
      </div>

      {textStroke > 0 && (
        <div>
          <label className={`block text-xs font-semibold mb-2 uppercase tracking-wider ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Stroke Color
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={textStrokeColor}
              onChange={(e) => setTextStrokeColor(e.target.value)}
              className={`w-12 h-10 rounded cursor-pointer border ${
                theme === 'dark' ? 'border-neutral-700' : 'border-neutral-300'
              }`}
            />
            <input
              type="text"
              value={textStrokeColor}
              onChange={(e) => setTextStrokeColor(e.target.value)}
              className={`flex-1 px-3 py-2 border rounded text-sm focus:outline-none ${
                theme === 'dark'
                  ? 'bg-neutral-900 border-neutral-700 focus:border-neutral-500 text-white'
                  : 'bg-white border-neutral-300 focus:border-neutral-500 text-black'
              }`}
              placeholder="#000000"
            />
          </div>
        </div>
      )}
    </div>
  );
}