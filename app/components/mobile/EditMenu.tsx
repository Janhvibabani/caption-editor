"use client";

import { Theme } from "../../hooks/useTheme";
import { cn } from "@/lib/utils";
import { Upload, RotateCw, Crop } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onReplaceImage: () => void;
  onRotate: () => void;
  onCrop: () => void;
  theme: Theme;
}

export default function EditMenu({
  isOpen,
  onClose,
  onReplaceImage,
  onRotate,
  onCrop,
  theme,
}: Props) {
  if (!isOpen) return null;

  const menuItems = [
    {
      label: "Replace Image",
      icon: Upload,
      onClick: () => {
        onReplaceImage();
        onClose();
      },
    },
    {
      label: "Rotate",
      icon: RotateCw,
      onClick: () => {
        onRotate();
        onClose();
      },
    },
    {
      label: "Crop",
      icon: Crop,
      onClick: () => {
        onCrop();
        onClose();
      },
    },
  ];

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
          "max-h-[50vh] overflow-hidden flex flex-col",
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
        <div className="px-4 pb-3 border-b" style={{ borderColor: theme === 'dark' ? '#262626' : '#e5e5e5' }}>
          <h3
            className={cn(
              "text-base font-semibold",
              theme === "dark" ? "text-white" : "text-black"
            )}
          >
            Edit Image
          </h3>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors touch-manipulation",
                    theme === "dark"
                      ? "hover:bg-neutral-900 active:bg-neutral-800"
                      : "hover:bg-neutral-50 active:bg-neutral-100"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-lg",
                      theme === "dark"
                        ? "bg-neutral-900"
                        : "bg-neutral-100"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        theme === "dark" ? "text-white" : "text-black"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      theme === "dark" ? "text-white" : "text-black"
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

