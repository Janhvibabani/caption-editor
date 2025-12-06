"use client";

interface Props {
  onReset: () => void;
}

export default function ResetButton({ onReset }: Props) {
  return (
    <button
      onClick={onReset}
      className="w-full px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition uppercase tracking-wider"
    >
      Reset Image
    </button>
  );
}