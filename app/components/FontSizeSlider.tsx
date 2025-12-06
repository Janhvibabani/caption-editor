"use client";

interface Props {
  fontSize: number;
  setFontSize: (val: number) => void;
}

export default function FontSizeSlider({ fontSize, setFontSize }: Props) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-2 text-neutral-400 uppercase tracking-wider">
        Font Size: {fontSize}px
      </label>
      <input
        type="range"
        min="12"
        max="72"
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value))}
        className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-white"
      />
      <div className="flex justify-between text-xs text-neutral-600 mt-1">
        <span>12px</span>
        <span>72px</span>
      </div>
    </div>
  );
}