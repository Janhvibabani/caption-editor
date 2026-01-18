"use client";

import { Theme } from "../hooks/useTheme";
import { cn } from "@/lib/utils";

interface PresetConfig {
  name: string;
  preview: string;
  settings: {
    textColor: string;
    bgColor: string;
    opacity: number;
    textStroke: number;
    textStrokeColor: string;
    font?: string;
    fontSize?: number;
    isBold?: boolean;
    isItalic?: boolean;
    isUnderline?: boolean;
  };
}

interface Props {
  onPresetSelect: (settings: PresetConfig['settings']) => void;
  theme: Theme;
}

const PRESETS: PresetConfig[] = [
  {
    name: "No Background",
    preview: "Aa",
    settings: {
      textColor: "#FFFFFF",
      bgColor: "#000000",
      opacity: 0,
      textStroke: 3,
      textStrokeColor: "#000000",
      fontSize: 28,
    },
  },
  {
    name: "Yellow Classic",
    preview: "Aa",
    settings: {
      textColor: "#FFD700",
      bgColor: "#000000",
      opacity: 0,
      textStroke: 3,
      textStrokeColor: "#000000",
      fontSize: 28,
    },
  },
  {
    name: "Translucent Black",
    preview: "Aa",
    settings: {
      textColor: "#FFFFFF",
      bgColor: "#000000",
      opacity: 70,
      textStroke: 0,
      textStrokeColor: "#000000",
      font: "courier new",
      fontSize: 28,
    },
  },
  {
    name: "Roboto Italic",
    preview: "Aa",
    settings: {
      textColor: "#F5E6A5",
      bgColor: "#000000",
      opacity: 0,
      textStroke: 0,
      textStrokeColor: "#000000",
      font: "Roboto, sans-serif",
      fontSize: 28,
      isItalic: true,
    },
  },
];

export default function PresetChips({ onPresetSelect, theme }: Props) {
  const getPreviewStyle = (preset: PresetConfig) => {
    const baseStyle: React.CSSProperties = {
      color: preset.settings.textColor,
      fontFamily: preset.settings.font || 'Arial, sans-serif',
      fontSize: '14px',
      fontWeight: preset.settings.isBold ? 'bold' : 'normal',
      fontStyle: preset.settings.isItalic ? 'italic' : 'normal',
      textDecoration: preset.settings.isUnderline ? 'underline' : 'none',
    };

    if (preset.settings.textStroke > 0) {
      baseStyle.WebkitTextStroke = `${preset.settings.textStroke}px ${preset.settings.textStrokeColor}`;
      baseStyle.paintOrder = 'stroke fill';
    }

    return baseStyle;
  };

  const getBackgroundStyle = (preset: PresetConfig) => {
    if (preset.settings.opacity > 0) {
      const opacity = preset.settings.opacity / 100;
      const rgb = hexToRgb(preset.settings.bgColor);
      return {
        backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`,
      };
    }
    return {};
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  return (
    <div className="space-y-2">
      <label className={cn(
        "block text-xs font-semibold uppercase tracking-wider",
        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
      )}>
        Presets
      </label>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onPresetSelect(preset.settings)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all hover:scale-105",
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                : 'bg-neutral-50 border-neutral-300 hover:border-neutral-400'
            )}
            title={preset.name}
          >
            <div
              className={cn(
                "w-8 h-6 rounded flex items-center justify-center text-xs",
                theme === 'dark' ? 'bg-neutral-950' : 'bg-white'
              )}
              style={getBackgroundStyle(preset)}
            >
              <span style={getPreviewStyle(preset)}>
                {preset.preview}
              </span>
            </div>
            <span className={cn(
              "text-xs font-medium",
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
            )}>
              {preset.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

