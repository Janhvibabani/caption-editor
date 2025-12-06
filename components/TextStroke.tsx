"use client"

interface Props {
  textStroke: number
  setTextStroke: (val: number) => void
  textStrokeColor: string
  setTextStrokeColor: (val: string) => void
}

export default function TextStrokeControls({ textStroke, setTextStroke, textStrokeColor, setTextStrokeColor }: Props) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-semibold mb-2 text-[var(--color-text-secondary)] uppercase tracking-wider">
          Stroke: {textStroke}px
        </label>
        <input
          type="range"
          min="0"
          max="10"
          value={textStroke}
          onChange={(e) => setTextStroke(Number(e.target.value))}
          className="w-full h-1.5 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)] hover:accent-[var(--color-secondary)]"
        />
      </div>

      {textStroke > 0 && (
        <div>
          <label className="block text-xs font-semibold mb-2 text-[var(--color-text-secondary)] uppercase tracking-wider">
            Color
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={textStrokeColor}
              onChange={(e) => setTextStrokeColor(e.target.value)}
              className="w-8 h-7 rounded-md cursor-pointer border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
            />
            <input
              type="text"
              value={textStrokeColor}
              onChange={(e) => setTextStrokeColor(e.target.value)}
              className="flex-1 px-2 py-1 bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-md text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/30"
              placeholder="#000000"
            />
          </div>
        </div>
      )}
    </div>
  )
}
