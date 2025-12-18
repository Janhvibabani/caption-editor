"use client";

import { Theme } from "../hooks/useTheme";

interface PresetConfig {
  name: string;
  icon: string;
  settings: {
    textColor: string;
    bgColor: string;
    opacity: number;
    textStroke: number;
    textStrokeColor: string;
  };
}

interface Props {
  onPresetSelect: (settings: PresetConfig['settings']) => void;
  theme: Theme;
}

const PRESETS: PresetConfig[] = [
  {
    name: "No Background",
    icon: "🎬",
    settings: {
      textColor: "#FFFFFF",
      bgColor: "#000000",
      opacity: 0,
      textStroke: 3,
      textStrokeColor: "#000000",
    },
  },
  {
    name: "Yellow Classic",
    icon: "⭐",
    settings: {
      textColor: "#FFD700",
      bgColor: "#000000",
      opacity: 0,
      textStroke: 3,
      textStrokeColor: "#000000",
    },
  },
  {
    name: "Translucent Black",
    icon: "🎥",
    settings: {
      textColor: "#FFFFFF",
      bgColor: "#000000",
      opacity: 70,
      textStroke: 0,
      textStrokeColor: "#000000",
    },
  },
];

export default function Presets({ onPresetSelect, theme }: Props) {
  return (
    <div>
      <label className={`block text-xs font-semibold mb-3 uppercase tracking-wider ${
        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
      }`}>
        Caption Presets
      </label>
      <div className="grid grid-cols-3 gap-3">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onPresetSelect(preset.settings)}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
              theme === 'dark'
                ? 'bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600'
                : 'bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 hover:border-neutral-400'
            }`}
            title={preset.name}
          >
            <span className="text-2xl">{preset.icon}</span>
            <span className={`text-xs font-medium text-center ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {preset.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}