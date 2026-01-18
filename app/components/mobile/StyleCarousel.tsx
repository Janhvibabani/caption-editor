"use client";

import { Theme } from "../../hooks/useTheme";
import { cn } from "@/lib/utils";
import MinimalColorPicker from "./MinimalColorPicker";
import CompactSlider from "../CompactSlider";
import TextStyles from "../TextStyles";

interface Props {
  textColor: string;
  setTextColor: (val: string) => void;
  textStrokeColor: string;
  setTextStrokeColor: (val: string) => void;
  textStroke: number;
  setTextStroke: (val: number) => void;
  bgColor: string;
  setBgColor: (val: string) => void;
  opacity: number;
  setOpacity: (val: number) => void;
  isBold: boolean;
  setIsBold: (val: boolean) => void;
  isItalic: boolean;
  setIsItalic: (val: boolean) => void;
  isUnderline: boolean;
  setIsUnderline: (val: boolean) => void;
  theme: Theme;
}

export default function StyleCarousel({
  textColor,
  setTextColor,
  textStrokeColor,
  setTextStrokeColor,
  textStroke,
  setTextStroke,
  bgColor,
  setBgColor,
  opacity,
  setOpacity,
  isBold,
  setIsBold,
  isItalic,
  setIsItalic,
  isUnderline,
  setIsUnderline,
  theme,
}: Props) {
  return (
    <div
      className="space-y-3 overflow-y-auto h-[200px] pb-4 px-1"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {/* Text Color */}
      <div
        className={cn(
          "rounded-xl p-4",
          theme === "dark" ? "bg-neutral-900" : "bg-neutral-100"
        )}
      >
        <MinimalColorPicker
          title="Text Color"
          value={textColor}
          onChange={setTextColor}
          theme={theme}
        />
      </div>

      {/* Stroke Color */}
      <div
        className={cn(
          "rounded-xl p-4",
          theme === "dark" ? "bg-neutral-900" : "bg-neutral-100"
        )}
      >
        <MinimalColorPicker
          title="Stroke Color"
          value={textStrokeColor}
          onChange={setTextStrokeColor}
          theme={theme}
        />
      </div>

      {/* Stroke Width */}
      <div
        className={cn(
          "rounded-xl p-4",
          theme === "dark" ? "bg-neutral-900" : "bg-neutral-100"
        )}
      >
        <CompactSlider
          label="Stroke Width"
          value={textStroke}
          onChange={setTextStroke}
          min={0}
          max={10}
          unit="px"
          theme={theme}
        />
      </div>

      {/* Text Styles */}
      <div
        className={cn(
          "rounded-xl p-4",
          theme === "dark" ? "bg-neutral-900" : "bg-neutral-100"
        )}
      >
        <TextStyles
          isBold={isBold}
          setIsBold={setIsBold}
          isItalic={isItalic}
          setIsItalic={setIsItalic}
          isUnderline={isUnderline}
          setIsUnderline={setIsUnderline}
          theme={theme}
        />
      </div>

      {/* Background Color */}
      <div
        className={cn(
          "rounded-xl p-4",
          theme === "dark" ? "bg-neutral-900" : "bg-neutral-100"
        )}
      >
        <MinimalColorPicker
          title="Background Color"
          value={bgColor}
          onChange={setBgColor}
          theme={theme}
        />
      </div>

      {/* Background Opacity */}
      <div
        className={cn(
          "rounded-xl p-4",
          theme === "dark" ? "bg-neutral-900" : "bg-neutral-100"
        )}
      >
        <CompactSlider
          label="Background Opacity"
          value={opacity}
          onChange={setOpacity}
          min={0}
          max={100}
          unit="%"
          theme={theme}
        />
      </div>
    </div>
  );
}

