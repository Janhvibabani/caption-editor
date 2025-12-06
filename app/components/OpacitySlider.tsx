"use client";
import React from "react";

interface Props {
  opacity: number;
  setOpacity: (v: number) => void;
}

export default function OpacitySlider({ opacity, setOpacity }: Props) {
  return (
    <div className="bg-[#111] p-4 rounded-md border border-neutral-700">
      <label className="text-sm text-neutral-300">BACKGROUND OPACITY</label>

      <input
        type="range"
        min={0}
        max={100}
        value={opacity}
        onChange={(e) => setOpacity(Number(e.target.value))}
        className="w-full mt-3"
      />

      <p className="text-right text-sm text-neutral-400 mt-1">{opacity}%</p>
    </div>
  );
}
