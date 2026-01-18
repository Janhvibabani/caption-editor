"use client";
import React, { useRef } from "react";
import { Theme } from "../hooks/useTheme";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  setImage: (file: string | null) => void;
  theme: Theme;
}

export default function ImageUploader({ setImage, theme }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center cursor-pointer flex-col gap-4 p-12 border-2 border-dashed transition-colors hover:border-solid",
        theme === 'dark'
          ? 'text-neutral-400 border-neutral-700 bg-neutral-950 hover:border-neutral-600 hover:bg-neutral-900'
          : 'text-neutral-500 border-neutral-300 bg-neutral-50 hover:border-neutral-400 hover:bg-white'
      )}
      onClick={() => inputRef.current?.click()}
      onDrop={(e) => {
        e.preventDefault();
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
      />

      <div className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center",
        theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-100'
      )}>
        <Upload className={cn(
          "w-8 h-8",
          theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'
        )} />
      </div>
      <div className="text-center space-y-1">
        <p className={cn(
          "font-semibold text-base",
          theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
        )}>
          Click to upload image
        </p>
        <p className={cn(
          "text-sm",
          theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'
        )}>
          or drag and drop your file here
        </p>
        <p className={cn(
          "text-xs mt-2",
          theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'
        )}>
          Supports PNG, JPG, WEBP
        </p>
      </div>
    </div>
  );
}
