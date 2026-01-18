"use client";

import { useState, useEffect } from "react";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Theme } from "../hooks/useTheme";

interface CompactSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  theme: Theme;
  className?: string;
}

export default function CompactSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  theme,
  className,
}: CompactSliderProps) {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleSliderChange = (newValue: number[]) => {
    const val = newValue[0];
    onChange(val);
    setInputValue(val.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    const numVal = parseFloat(val);
    if (!isNaN(numVal) && numVal >= min && numVal <= max) {
      onChange(numVal);
    }
  };

  const handleInputBlur = () => {
    const numVal = parseFloat(inputValue);
    if (isNaN(numVal) || numVal < min) {
      onChange(min);
      setInputValue(min.toString());
    } else if (numVal > max) {
      onChange(max);
      setInputValue(max.toString());
    } else {
      onChange(numVal);
      setInputValue(numVal.toString());
    }
  };

  const handleStep = (direction: "up" | "down") => {
    const newValue = direction === "up" ? Math.min(max, value + step) : Math.max(min, value - step);
    onChange(newValue);
    setInputValue(newValue.toString());
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className={cn(
        "block text-xs font-semibold uppercase tracking-wider",
        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
      )}>
        {label}
      </label>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Slider
            value={[value]}
            onValueChange={handleSliderChange}
            min={min}
            max={max}
            step={step}
          />
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              "h-7 w-7",
              theme === 'dark'
                ? "!bg-neutral-900 !border-neutral-700 hover:!bg-neutral-800 !text-white"
                : "!bg-white !border-neutral-300 hover:!bg-neutral-100 !text-black"
            )}
            onClick={() => handleStep("down")}
            disabled={value <= min}
          >
            <ChevronDown className={cn(
              "h-3 w-3",
              theme === 'dark' ? "text-white" : "text-black"
            )} />
          </Button>
          <div className="flex items-center gap-1">
            <Input
              type="tel"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={cn(
                "h-7 w-14 text-center text-xs px-2",
                theme === 'dark' 
                  ? 'bg-neutral-900 border-neutral-700 text-white' 
                  : 'bg-white border-neutral-300 text-black'
              )}
            />
            {unit && (
              <span className={cn(
                "text-xs w-4",
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
              )}>
                {unit}
              </span>
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              "h-7 w-7",
              theme === 'dark'
                ? "!bg-neutral-900 !border-neutral-700 hover:!bg-neutral-800 !text-white"
                : "!bg-white !border-neutral-300 hover:!bg-neutral-100 !text-black"
            )}
            onClick={() => handleStep("up")}
            disabled={value >= max}
          >
            <ChevronUp className={cn(
              "h-3 w-3",
              theme === 'dark' ? "text-white" : "text-black"
            )} />
          </Button>
        </div>
      </div>
    </div>
  );
}

