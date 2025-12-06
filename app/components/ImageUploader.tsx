"use client";
import React, { useRef } from "react";

interface Props {
  setImage: (file: string | null) => void;
}

export default function ImageUploader({ setImage }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center text-neutral-500 cursor-pointer flex-col border border-neutral-700 bg-[#0b0b0b]"
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

      <div className="text-4xl mb-2 opacity-50">↑</div>
      <p>Click to upload image</p>
      <p className="text-sm opacity-50">or drag and drop</p>
    </div>
  );
}