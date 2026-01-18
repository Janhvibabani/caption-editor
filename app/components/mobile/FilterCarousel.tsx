"use client";

import { useRef, useEffect, useState } from "react";
import { Theme } from "../../hooks/useTheme";
import { cn } from "@/lib/utils";

interface Props {
  image: string | null;
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

export default function FilterCarousel({
  image,
  currentFilter,
  onFilterSelect,
  theme,
}: Props) {
  const canvasRefs = useRef<Array<HTMLCanvasElement | null>>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!image) {
      setIsLoading(false);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      FILTERS.forEach((filter, index) => {
        const canvas = canvasRefs.current[index];
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const previewSize = 120;
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

  // Scroll to active filter
  useEffect(() => {
    if (!scrollRef.current) return;
    const activeIndex = FILTERS.findIndex((f) => f.value === currentFilter);
    if (activeIndex === -1) return;

    const container = scrollRef.current;
    const cardWidth = 100; // w-[100px] + gap-3
    const scrollPosition = activeIndex * cardWidth - container.clientWidth / 2 + cardWidth / 2;
    container.scrollTo({ left: Math.max(0, scrollPosition), behavior: "smooth" });
  }, [currentFilter]);

  return (
    <div className="space-y-4">
      {!image ? (
        <div
          className={cn(
            "text-center py-8",
            theme === "dark" ? "text-neutral-500" : "text-neutral-400"
          )}
        >
          <p className="text-sm">Upload an image to preview filters</p>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 overscroll-contain snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {FILTERS.map((filter, index) => {
            const isActive = currentFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => onFilterSelect(filter.value)}
                className={cn(
                  "flex-shrink-0 snap-center touch-manipulation",
                  "transition-transform active:scale-95"
                )}
              >
                <div
                  className={cn(
                    "w-[100px] rounded-xl p-2 transition-all",
                    isActive
                      ? theme === "dark"
                        ? "ring-2 ring-white bg-white/10"
                        : "ring-2 ring-black bg-black/10"
                      : theme === "dark"
                      ? "bg-neutral-900"
                      : "bg-neutral-100"
                  )}
                >
                  <canvas
                    ref={(el) => {
                      canvasRefs.current[index] = el;
                    }}
                    className={cn(
                      "w-full h-20 rounded-lg border-2 mb-2",
                      isActive
                        ? theme === "dark"
                          ? "border-white/30"
                          : "border-black/30"
                        : theme === "dark"
                        ? "border-neutral-700"
                        : "border-neutral-300"
                    )}
                  />
                  <span
                    className={cn(
                      "text-xs font-medium block text-center",
                      isActive
                        ? theme === "dark"
                          ? "text-white"
                          : "text-black"
                        : theme === "dark"
                        ? "text-neutral-400"
                        : "text-neutral-600"
                    )}
                  >
                    {filter.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

