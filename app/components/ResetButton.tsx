"use client";

interface Props {
  onReset: () => void;
  theme?: "light" | "dark";
}

export default function ResetButton({ onReset, theme = "dark" }: Props) {
  return (
    <button
      onClick={onReset}
      className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition uppercase tracking-wider ${
        theme === 'dark'
          ? 'bg-white text-black hover:bg-neutral-200'
          : 'bg-black text-white hover:bg-neutral-800'
      }`}
    >
      Reset Image
    </button>
  );
}