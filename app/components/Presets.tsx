"use client";

import { Theme } from "../hooks/useTheme";
import { cn } from "@/lib/utils";

interface PresetConfig {
  name: string;
  preview: string; // Changed from icon to preview text
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
  isMobile?: boolean;
}

const PRESETS_DESKTOP: PresetConfig[] = [
  {
    name: "Helvetica Clean",
    preview: "Aa",
    settings: {
      textColor: "#FFFFFF",
      bgColor: "#000000",
      opacity: 0,
      textStroke: 2,
      textStrokeColor: "#000000",
      font: "Helvetica, Arial, sans-serif",
      fontSize: 28,
      isBold: false,
      isItalic: false,
      isUnderline: false,
    },
  },
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
      isBold: false,
      isItalic: false,
      isUnderline: false,
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
      isBold: false,
      isItalic: false,
      isUnderline: false,
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
      fontSize: 28,
      textStrokeColor: "#000000",
      font: "courier new",
      isBold: false,
      isItalic: false,
      isUnderline: false,
    },
  },
  {
    name: "Roboto Bold",
    preview: "Aa",
    settings: {
      textColor: "#F5E6A5",
      bgColor: "#000000",
      opacity: 0,
      textStroke: 0,
      textStrokeColor: "#000000",
      font: "Roboto, sans-serif",
      fontSize: 28,
      isBold: false,
      isItalic: true,
      isUnderline: false,
    },
  },
];

const PRESETS_MOBILE: PresetConfig[] = [
  {
    name: "Helvetica Clean",
    preview: "Aa",
    settings: {
      textColor: "#FFFFFF",
      bgColor: "#000000",
      opacity: 0,
      textStroke: 1,
      textStrokeColor: "#000000",
      font: "Helvetica, Arial, sans-serif",
      fontSize: 16,
      isBold: false,
      isItalic: false,
      isUnderline: false,
    },
  },
  {
    name: "No Background",
    preview: "Aa",
    settings: {
      textColor: "#FFFFFF",
      bgColor: "#000000",
      opacity: 0,
      textStroke: 2,
      textStrokeColor: "#000000",
      fontSize: 18,
      isBold: false,
      isItalic: false,
      isUnderline: false,
    },
  },
  {
    name: "Yellow Classic",
    preview: "Aa",
    settings: {
      textColor: "#FFD700",
      bgColor: "#000000",
      opacity: 0,
      textStroke: 2,
      textStrokeColor: "#000000",
      fontSize: 18,
      isBold: false,
      isItalic: false,
      isUnderline: false,
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
      fontSize: 18,
      textStrokeColor: "#000000",
      font: "courier new",
      isBold: false,
      isItalic: false,
      isUnderline: false,
    },
  },
  {
    name: "Roboto Bold",
    preview: "Aa",
    settings: {
      textColor: "#F5E6A5",
      bgColor: "#000000",
      opacity: 0,
      textStroke: 0,
      textStrokeColor: "#000000",
      font: "Roboto, sans-serif",
      fontSize: 16,
      isBold: false,
      isItalic: true,
      isUnderline: false,
    },
  },
];

export default function Presets({ onPresetSelect, theme, isMobile }: Props) {
  const PRESETS = isMobile ? PRESETS_MOBILE : PRESETS_DESKTOP;
  const getPreviewStyle = (preset: PresetConfig) => {
    const baseStyle: React.CSSProperties = {
      color: preset.settings.textColor,
      fontFamily: preset.settings.font || 'Helvetica, Arial, sans-serif',
      fontSize: '24px',
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
    <div className="w-full">
      <label className={`block text-xs font-semibold mb-3 uppercase tracking-wider ${
        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
      }`}>
        Caption Presets
      </label>
      
      <div className={cn(
        "w-full max-w-full overflow-x-auto overflow-y-hidden pb-2",
        "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      )} style={{ WebkitOverflowScrolling: "touch" }}>
        <div className="flex gap-3 w-max">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onPresetSelect(preset.settings)}
              className={cn(
                "flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-lg transition-all touch-manipulation active:scale-95",
                isMobile ? "w-20" : "w-20",
                theme === 'dark'
                  ? 'bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600'
                  : 'bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 hover:border-neutral-400'
              )}
              title={preset.name}
            >
              {/* Preview Box with actual caption style */}
              <div 
                className={cn(
                  "w-14 h-10 rounded flex items-center justify-center",
                  theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'
                )}
                style={getBackgroundStyle(preset)}
              >
                <span style={getPreviewStyle(preset)}>
                  {preset.preview}
                </span>
              </div>
              
              <span className={cn(
                "text-[9px] font-medium text-center leading-tight",
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              )}>
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}