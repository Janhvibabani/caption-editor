"use client"

interface Props {
  caption: string
  setCaption: (val: string) => void
}

export default function CaptionInput({ caption, setCaption }: Props) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-2 text-[var(--color-text-secondary)] uppercase tracking-wider">
        Caption
      </label>
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Enter caption text..."
        className="w-full px-3 py-2 bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-md text-xs focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] resize-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
        rows={3}
      />
      <p className="text-xs text-[var(--color-text-muted)] mt-1">Shift+Enter for lines</p>
    </div>
  )
}
