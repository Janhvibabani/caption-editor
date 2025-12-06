"use client"

interface Props {
  opacity: number
  setOpacity: (v: number) => void
}

export default function OpacitySlider({ opacity, setOpacity }: Props) {
  return (
    <div>
      <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider block mb-2">
        BG Opacity
      </label>

      <input
        type="range"
        min={0}
        max={100}
        value={opacity}
        onChange={(e) => setOpacity(Number(e.target.value))}
        className="w-full h-1.5 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)] hover:accent-[var(--color-secondary)]"
      />

      <p className="text-right text-xs text-[var(--color-text-secondary)] mt-1">{opacity}%</p>
    </div>
  )
}
