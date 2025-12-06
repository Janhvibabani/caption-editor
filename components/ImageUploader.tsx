"use client"

import { useRef } from "react"

interface Props {
  setImage: (file: string | null) => void
}

export default function ImageUploader({ setImage }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)] cursor-pointer flex-col border-2 border-dashed border-[var(--color-border)] bg-gradient-to-br from-[var(--color-bg-input)] to-[var(--color-bg-dark)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all"
      onClick={() => inputRef.current?.click()}
      onDrop={(e) => {
        e.preventDefault()
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0])
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

      <div className="text-5xl mb-4 opacity-60">⬆</div>
      <p className="text-lg font-semibold">Click to upload image</p>
      <p className="text-sm opacity-70">or drag and drop</p>
    </div>
  )
}
