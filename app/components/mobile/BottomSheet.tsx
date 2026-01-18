"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Theme } from "../../hooks/useTheme";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  theme: Theme;
  title?: string;
}

export default function BottomSheet({ isOpen, onClose, children, theme, title }: Props) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl shadow-2xl",
          "max-h-[85vh] overflow-hidden flex flex-col",
          "transition-transform duration-300 ease-out pb-safe",
          theme === "dark" ? "bg-neutral-950" : "bg-white"
        )}
      >
        {/* Handle */}
        <div className="flex items-center justify-center pt-3 pb-2">
          <div
            className={cn(
              "w-12 h-1 rounded-full",
              theme === "dark" ? "bg-neutral-700" : "bg-neutral-300"
            )}
          />
        </div>

        {/* Header */}
        {title && (
          <div className="px-4 pb-3 border-b" style={{ borderColor: theme === 'dark' ? '#262626' : '#e5e5e5' }}>
            <h3
              className={cn(
                "text-base font-semibold",
                theme === "dark" ? "text-white" : "text-black"
              )}
            >
              {title}
            </h3>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-4">{children}</div>
        </div>
      </div>
    </>
  );
}

