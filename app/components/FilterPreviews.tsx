"use client";

import { useRef, useEffect, useState } from "react";
import { Theme } from "../hooks/useTheme";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

interface Props {
  image: string;
  currentFilter: string;
  onFilterSelect: (filter: string) => void;
  theme: Theme;
}

const FILTERS = [
  { value: "none", label: "None" },
  { value: "cinematic", label: "Cinematic" },
  { value: "grainy", label: "Grainy" },
  { value: "grayscale", label: "Grayscale" },
  { value: "sepia", label: "Sepia" },
  { value: "blur", label: "Blur" },
  { value: "brightness", label: "Bright" },
  { value: "contrast", label: "Contrast" },
  { value: "saturate", label: "Saturate" },
  { value: "invert", label: "Invert" },
];

export default function FilterPreviews({
  image,
  currentFilter,
  onFilterSelect,
  theme,
}: Props) {
  const canvasRefs = useRef<Array<HTMLCanvasElement | null>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      FILTERS.forEach((filter, index) => {
        const canvas = canvasRefs.current[index];
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const previewSize = 100;
        canvas.width = previewSize;
        canvas.height = previewSize;

        const imgAspect = img.naturalWidth / img.naturalHeight;
        let drawWidth = previewSize;
        let drawHeight = previewSize;
        let offsetX = 0;
        let offsetY = 0;

        if (imgAspect > 1) {
          drawHeight = previewSize / imgAspect;
          offsetY = (previewSize - drawHeight) / 2;
        } else {
          drawWidth = previewSize * imgAspect;
          offsetX = (previewSize - drawWidth) / 2;
        }

        ctx.filter = getCanvasFilter(filter.value);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, previewSize, previewSize);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        ctx.filter = "none";
      });

      setIsLoading(false);
    };

    img.src = image;
  }, [image]);

  const getCanvasFilter = (filterValue: string): string => {
    const filterMap: Record<string, string> = {
      none: "none",
      cinematic: "contrast(1.4) saturate(1.3) brightness(0.95)",
      grainy: "saturate(0.6) brightness(1.1) contrast(0.9)",
      grayscale: "grayscale(100%)",
      sepia: "sepia(100%)",
      blur: "blur(4px)",
      brightness: "brightness(1.2)",
      contrast: "contrast(1.2)",
      saturate: "saturate(1.5)",
      invert: "invert(100%)",
    };
    return filterMap[filterValue] || "none";
  };

  return (
    <div className="space-y-4">
      <div>
        <label className={cn(
          "block text-xs font-semibold mb-3 uppercase tracking-wider",
          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
        )}>
          Image Filters
        </label>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {FILTERS.map((filter, index) => (
          <button
            key={filter.value}
            onClick={() => onFilterSelect(filter.value)}
            className="text-left"
          >
            <Card className={cn(
              "transition-all hover:scale-105",
              currentFilter === filter.value
                ? theme === 'dark'
                  ? 'ring-2 ring-white bg-white/10 border-white/20'
                  : 'ring-2 ring-black bg-black/10 border-black/20'
                : theme === 'dark'
                  ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                  : 'bg-white border-neutral-200 hover:border-neutral-300'
            )}>
              <CardContent className="p-3 space-y-2">
                <canvas
                  ref={(el) => {(canvasRefs.current[index] = el)}}
                  className={cn(
                    "w-full h-20 rounded border",
                    theme === 'dark' ? 'border-neutral-700' : 'border-neutral-300'
                  )}
                />
                <span className={cn(
                  "text-xs font-medium block text-center",
                  currentFilter === filter.value
                    ? theme === 'dark' ? 'text-white' : 'text-black'
                    : theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                )}>
                  {filter.label}
                </span>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
