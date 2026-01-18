"use client";

import { useEffect, useState } from "react";
import { ColorPicker as ReactColorPicker, IColor } from "react-color-palette";
import "react-color-palette/css";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Theme } from "../hooks/useTheme";

interface Props {
  title: string;
  value: string;
  onChange: (val: string) => void;
  theme: Theme;
}

// Convert hex to RGB
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

// Convert hex to IColor format
const hexToIColor = (hex: string): IColor => {
  const rgb = hexToRgb(hex);
  return {
    hex: hex.startsWith("#") ? hex : `#${hex}`,
    rgb: { r: rgb.r, g: rgb.g, b: rgb.b, a: 1 },
    hsv: { h: 0, s: 0, v: 0, a: 1 },
  };
};

export default function ColorPicker({ title, value, onChange, theme }: Props) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<IColor>(() => hexToIColor(value));

  // Update color when value prop changes
  useEffect(() => {
    if (value) {
      const newColor = hexToIColor(value);
      setColor(newColor);
    }
  }, [value, open]);

  const handleColorChange = (newColor: IColor) => {
    setColor(newColor);
    onChange(newColor.hex);
  };

  const handleHexChange = (hex: string) => {
    if (/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
      const newColor = hexToIColor(hex);
      setColor(newColor);
      onChange(newColor.hex);
    }
  };

  return (
    <div className="space-y-2">
      <label
        className={cn(
          "block text-xs font-semibold uppercase tracking-wider",
          theme === "dark" ? "text-neutral-400" : "text-neutral-600"
        )}
      >
        {title}
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={cn(
                "h-9 w-12 rounded-md border-2 transition-all",
                theme === "dark"
                  ? "border-neutral-700 hover:border-neutral-600"
                  : "border-neutral-300 hover:border-neutral-400"
              )}
              style={{ backgroundColor: color.hex }}
            />

            <Input
              type="text"
              value={color.hex.toUpperCase()}
              onChange={(e) => handleHexChange(e.target.value)}
              onBlur={() => {
                if (!/^#?[0-9A-Fa-f]{6}$/.test(color.hex)) {
                  handleHexChange(value);
                }
              }}
              className={cn(
                "flex-1 h-9 text-xs",
                theme === "dark"
                  ? "bg-neutral-900 border-neutral-700 text-white"
                  : "bg-white border-neutral-300 text-black"
              )}
              placeholder="#000000"
            />
          </div>
        </PopoverTrigger>

        <PopoverContent
          className={cn(
            "w-[240px] p-3 shadow-xl border-0",
            theme === "dark" ? "bg-neutral-900" : "bg-white"
          )}
          align="start"
          sideOffset={8}
        >
          <div
            className={cn(
              "[&_.rcp]:shadow-none [&_.rcp]:border-0 [&_.rcp]:p-0",
              // reduce picker height
              "[&_.rcp]:scale-[0.92] [&_.rcp]:origin-top-left",
              // remove preview + rgb + hsv inputs
              "[&_.rcp-field]:hidden [&_.rcp-fields]:hidden [&_.rcp-preview]:hidden",
              theme === "dark"
                ? "[&_.rcp]:bg-neutral-900 [&_.rcp]:text-white"
                : "[&_.rcp]:bg-white [&_.rcp]:text-black"
            )}
          >
            <ReactColorPicker color={color} onChange={handleColorChange} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
