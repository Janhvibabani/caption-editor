"use client";

import { cn } from "@/lib/utils";
import { Theme } from "../../hooks/useTheme";
import { Type, Image as ImageIcon, Palette } from "lucide-react";

interface Props {
  activeTab: "caption" | "filters" | "style";
  onTabChange: (tab: "caption" | "filters" | "style") => void;
  theme: Theme;
}

export default function BottomNavigation({ activeTab, onTabChange, theme }: Props) {
  const tabs = [
    { id: "caption" as const, label: "Caption", icon: Type },
    { id: "filters" as const, label: "Filters", icon: ImageIcon },
    { id: "style" as const, label: "Style", icon: Palette },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t",
        "h-16 pb-safe",
        "safe-area-inset-bottom",
        theme === "dark"
          ? "border-neutral-800 bg-neutral-950"
          : "border-neutral-200 bg-white"
      )}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
              "touch-manipulation",
              isActive
                ? theme === "dark"
                  ? "text-white"
                  : "text-black"
                : theme === "dark"
                ? "text-neutral-500"
                : "text-neutral-400"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

