"use client"

import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"

interface Props {
  font: string
  setFont: (val: string) => void
}

export default function FontPicker({ font, setFont }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const fonts = [
    { value: "var(--font-bricolage-grotesque), sans-serif", label: "Bricolage Grotesque" },
    { value: "var(--font-funnel-sans), sans-serif", label: "Funnel Sans" },
    { value: "var(--font-funnel-display), sans-serif", label: "Funnel Display" },
    { value: "var(--font-geist-sans), sans-serif", label: "Geist" },
    { value: "Inter, sans-serif", label: "Inter" },
    { value: "var(--font-manrope), sans-serif", label: "Manrope" },
    { value: "var(--font-montserrat), sans-serif", label: "Montserrat" },
    { value: "var(--font-onest), sans-serif", label: "Onest" },
  ]

  const currentLabel = fonts.find((f) => f.value === font)?.label || "Onest"

  const handleFontSelect = (value: string) => {
    setFont(value)
    setIsOpen(false)
  }

  const handleArrowClick = (direction: "up" | "down") => {
    const currentIndex = fonts.findIndex((f) => f.value === font)
    let newIndex = currentIndex

    if (direction === "up" && currentIndex > 0) {
      newIndex = currentIndex - 1
    } else if (direction === "down" && currentIndex < fonts.length - 1) {
      newIndex = currentIndex + 1
    }

    setFont(fonts[newIndex].value)
  }

  return (
    <div>
      <label className="block text-xs font-semibold mb-2 text-[var(--color-text-secondary)] uppercase tracking-wider">
        Font
      </label>
      <div className="relative">
        {/* Main dropdown button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-2.5 py-1.5 bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-lg text-xs text-[var(--color-text-primary)] flex items-center justify-between hover:border-[var(--color-border)] transition-all"
        >
          <span className="text-sm">{currentLabel}</span>
          <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Glassmorphic dropdown panel */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50">
            <div className="max-h-64 overflow-y-auto">
              {fonts.map((f) => (
                <button
                  key={f.value}
                  onClick={() => handleFontSelect(f.value)}
                  className="w-full px-3 py-2 text-left text-sm text-[var(--color-text-primary)] hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  {f.value === font && <Check size={16} className="text-white" />}
                  <span className={f.value === font ? "font-semibold" : ""}>{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Arrow navigation buttons */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => handleArrowClick("up")}
            className="p-1.5 bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card)] transition-all"
            aria-label="Previous font"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="4 10 8 6 12 10" />
            </svg>
          </button>
          <button
            onClick={() => handleArrowClick("down")}
            className="p-1.5 bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card)] transition-all"
            aria-label="Next font"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="4 6 8 10 12 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
