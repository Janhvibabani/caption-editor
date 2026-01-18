"use client";

import { useRef, useEffect, useState } from "react";
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

const STYLE_SECTIONS = [
  { id: "text-color", title: "Text Color" },
  { id: "stroke-color", title: "Stroke Color" },
  { id: "stroke-width", title: "Stroke Width" },
  { id: "text-styles", title: "Text Styles" },
  { id: "background-color", title: "Background Color" },
  { id: "background-opacity", title: "Background Opacity" },
];

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active index based on scroll position
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.clientWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="space-y-4">
      {/* Indicators */}
      <div className="flex items-center justify-center gap-2">
        {STYLE_SECTIONS.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (scrollRef.current) {
                const cardWidth = scrollRef.current.clientWidth;
                scrollRef.current.scrollTo({
                  left: index * cardWidth,
                  behavior: "smooth",
                });
              }
            }}
            className={cn(
              "transition-all rounded-full",
              activeIndex === index
                ? theme === "dark"
                  ? "bg-white w-2 h-2"
                  : "bg-black w-2 h-2"
                : theme === "dark"
                ? "bg-neutral-700 w-1.5 h-1.5"
                : "bg-neutral-400 w-1.5 h-1.5"
            )}
            aria-label={`Go to ${STYLE_SECTIONS[index].title}`}
          />
        ))}
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 overscroll-contain snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Text Color Card */}
        <div className="flex-shrink-0 snap-center w-full min-w-full px-1">
          <div
            className={cn(
              "rounded-xl p-4 min-h-[200px]",
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
        </div>

        {/* Stroke Color Card */}
        <div className="flex-shrink-0 snap-center w-full min-w-full px-1">
          <div
            className={cn(
              "rounded-xl p-4 min-h-[200px]",
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
        </div>

        {/* Stroke Width Card */}
        <div className="flex-shrink-0 snap-center w-full min-w-full px-1">
          <div
            className={cn(
              "rounded-xl p-4 min-h-[200px]",
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
        </div>

        {/* Text Styles Card */}
        <div className="flex-shrink-0 snap-center w-full min-w-full px-1">
          <div
            className={cn(
              "rounded-xl p-4 min-h-[200px]",
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
        </div>

        {/* Background Color Card */}
        <div className="flex-shrink-0 snap-center w-full min-w-full px-1">
          <div
            className={cn(
              "rounded-xl p-4 min-h-[200px]",
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
        </div>

        {/* Background Opacity Card */}
        <div className="flex-shrink-0 snap-center w-full min-w-full px-1">
          <div
            className={cn(
              "rounded-xl p-4 min-h-[200px]",
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
      </div>
    </div>
  );
}

