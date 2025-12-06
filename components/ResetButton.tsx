"use client"

interface Props {
  onReset: () => void
}

export default function ResetButton({ onReset }: Props) {
  return (
    <button
      onClick={onReset}
      className="w-full px-3 py-2 bg-[var(--color-bg-input)] text-[var(--color-accent)] text-xs font-semibold rounded-md border border-[var(--color-border)] hover:bg-[var(--color-accent)] hover:text-white transition-all uppercase tracking-wider"
    >
      Reset
    </button>
  )
}
