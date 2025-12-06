"use client"

interface Props {
  fontSize: number
  setFontSize: (val: number) => void
}

export default function FontSizeSlider({ fontSize, setFontSize }: Props) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-2 text-[var(--color-text-secondary)] uppercase tracking-wider">
        Size: {fontSize}px
      </label>
      <input
        type="range"
        min="12"
        max="72"
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value))}
        className="w-full h-1.5 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)] hover:accent-[var(--color-secondary)]"
      />
    </div>
  )
}
