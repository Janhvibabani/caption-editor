"use client";

import { useRef, useEffect, useState } from "react";
import { Theme } from "../hooks/useTheme";

interface Props {
  image: string;
  currentFilter: string;
  onFilterSelect: (filter: string) => void;
  theme: Theme;
}

const FILTERS = [
  { value: "none", label: "None" },
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

        // Set preview size
        const previewSize = 100;
        canvas.width = previewSize;
        canvas.height = previewSize;

        // Calculate aspect ratio
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

        // Apply filter
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
    <div className={`border-t ${
      theme === 'dark' ? 'border-neutral-800 bg-[#0d0d0d]' : 'border-neutral-200 bg-neutral-50'
    } p-4`}>
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        <span className={`text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${
          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
        }`}>
          Filters:
        </span>
        
        <div className="flex gap-3">
          {FILTERS.map((filter, index) => (
            <button
              key={filter.value}
              onClick={() => onFilterSelect(filter.value)}
              className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${
                currentFilter === filter.value
                  ? theme === 'dark'
                    ? 'bg-white/10 ring-2 ring-white'
                    : 'bg-black/10 ring-2 ring-black'
                  : theme === 'dark'
                    ? 'bg-neutral-800 hover:bg-neutral-700'
                    : 'bg-neutral-200 hover:bg-neutral-300'
              }`}
            >
              <canvas
                ref={(el) => {(canvasRefs.current[index] = el)}}
                className="rounded border border-neutral-600"
                style={{ width: '100px', height: '100px' }}
              />
              <span className={`text-xs font-medium whitespace-nowrap ${
                currentFilter === filter.value
                  ? theme === 'dark' ? 'text-white' : 'text-black'
                  : theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                {filter.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}