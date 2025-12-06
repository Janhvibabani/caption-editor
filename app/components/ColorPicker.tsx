"use client";
import React from "react";

interface Props {
  title: string;
  value: string;
  onChange: (v: string) => void;
}

export default function ColorPicker({ title, value, onChange }: Props) {
  return (
    <div className="bg-[#111] p-4 rounded-md border border-neutral-700">
      <label className="text-sm text-neutral-300">{title}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full h-10 border border-neutral-700 rounded cursor-pointer"
      />
    </div>
  );
}
