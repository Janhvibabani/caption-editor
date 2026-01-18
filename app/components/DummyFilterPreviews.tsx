"use client";

import { Theme } from "../hooks/useTheme";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

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

interface Props {
  theme: Theme;
}

export default function DummyFilterPreviews({ theme }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className={cn(
          "block text-xs font-semibold mb-3 uppercase tracking-wider",
          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
        )}>
          Image Filters
        </label>
        <p className={cn(
          "text-xs mb-4",
          theme === 'dark' ? 'text-neutral-500' : 'text-neutral-600'
        )}>
          Upload an image to preview and apply filters
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {FILTERS.map((filter) => (
          <Card
            key={filter.value}
            className={cn(
              "cursor-not-allowed opacity-50",
              theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
            )}
          >
            <CardContent className="p-3 space-y-2">
              <div
                className={cn(
                  "w-full h-20 rounded border flex items-center justify-center",
                  theme === 'dark'
                    ? 'border-neutral-700 bg-neutral-950'
                    : 'border-neutral-300 bg-neutral-100'
                )}
              >
                <span className={cn(
                  "text-xs",
                  theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'
                )}>
                  Preview
                </span>
              </div>
              <span className={cn(
                "text-xs font-medium block text-center",
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
              )}>
                {filter.label}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
