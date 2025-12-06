"use client"

interface Props {
  title: string
  value: string
  onChange: (v: string) => void
}

export default function ColorPicker({ title, value, onChange }: Props) {
  return (
    <div>
      <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider block mb-2">
        {title}
      </label>
      <div className="flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-8 border border-[var(--color-border)] rounded-md cursor-pointer transition-all hover:border-[var(--color-primary)]"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1.5 bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-md text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/30"
        />
      </div>
    </div>
  )
}
