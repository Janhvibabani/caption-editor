"use client";

import React from "react";

interface ControlsProps {
  caption: string;
  setCaption: (value: string) => void;
  textColor: string;
  setTextColor: (value: string) => void;
  bgColor: string;
  setBgColor: (value: string) => void;
  opacity: number;
  setOpacity: (value: number) => void;
  filter: string;
  setFilter: (value: string) => void;
  font: string;
  setFont: (value: string) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  onReset: () => void;
}

export default function Controls({
  caption,
  setCaption,
  textColor,
  setTextColor,
  bgColor,
  setBgColor,
  opacity,
  setOpacity,
  filter,
  setFilter,
  font,
  setFont,
  fontSize,
  setFontSize,
  onReset,
}: ControlsProps) {
  const filters = [
    { value: "filter-none", label: "None" },
    { value: "filter-grayscale", label: "Grayscale" },
    { value: "filter-sepia", label: "Sepia" },
    { value: "filter-blur", label: "Blur" },
    { value: "filter-brightness", label: "Brightness" },
    { value: "filter-contrast", label: "Contrast" },
    { value: "filter-saturate", label: "Saturate" },
  ];

  const fonts = [
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "Courier New, monospace", label: "Courier" },
    { value: "Verdana, sans-serif", label: "Verdana" },
    { value: "Times New Roman, serif", label: "Times" },
    { value: "Impact, sans-serif", label: "Impact" },
  ];

  return (
    <div className="space-y-6 p-6 bg-neutral-900 rounded-lg">
      {/* Caption Input with line break hint */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Caption <span className="text-neutral-500 text-xs">(Use Shift+Enter for line breaks)</span>
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Enter your caption here..."
          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white resize-none"
          rows={4}
        />
      </div>

      {/* Font Size Slider */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Font Size: {fontSize}px
        </label>
        <input
          type="range"
          min="12"
          max="72"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-white"
        />
        <div className="flex justify-between text-xs text-neutral-500 mt-1">
          <span>12px</span>
          <span>72px</span>
        </div>
      </div>

      {/* Font Family */}
      <div>
        <label className="block text-sm font-medium mb-2">Font</label>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
        >
          {fonts.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Text Color */}
      <div>
        <label className="block text-sm font-medium mb-2">Text Color</label>
        <div className="flex gap-3">
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-16 h-12 rounded cursor-pointer"
          />
          <input
            type="text"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
          />
        </div>
      </div>

      {/* Background Color */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Background Color
        </label>
        <div className="flex gap-3">
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-16 h-12 rounded cursor-pointer"
          />
          <input
            type="text"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
          />
        </div>
      </div>

      {/* Opacity Slider */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Background Opacity: {opacity}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={opacity}
          onChange={(e) => setOpacity(Number(e.target.value))}
          className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-white"
        />
      </div>

      {/* Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">Image Filter</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
        >
          {filters.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 transition"
      >
        Reset Image
      </button>
    </div>
  );
}
