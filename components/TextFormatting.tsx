"use client";

interface Props {
  bold: boolean;
  setBold: (value: boolean) => void;
  italic: boolean;
  setItalic: (value: boolean) => void;
  underline: boolean;
  setUnderline: (value: boolean) => void;
}

export default function TextFormatting({
  bold,
  setBold,
  italic,
  setItalic,
  underline,
  setUnderline,
}: Props) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-2 text-[var(--color-text-secondary)] uppercase tracking-wider">
        Text Style
      </label>
      <div className="flex gap-2">
        <button
          onClick={() => setBold(!bold)}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
            bold
              ? "bg-white text-black shadow-lg shadow-white/20"
              : "bg-[var(--color-bg-input)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)]"
          }`}
        >
          <span className="font-bold">B</span>
        </button>
        <button
          onClick={() => setItalic(!italic)}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
            italic
              ? "bg-white text-black shadow-lg shadow-white/20"
              : "bg-[var(--color-bg-input)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)]"
          }`}
        >
          <span className="italic">I</span>
        </button>
        <button
          onClick={() => setUnderline(!underline)}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
            underline
              ? "bg-white text-black shadow-lg shadow-white/20"
              : "bg-[var(--color-bg-input)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)]"
          }`}
        >
          <span className="underline">U</span>
        </button>
      </div>
    </div>
  );
}

