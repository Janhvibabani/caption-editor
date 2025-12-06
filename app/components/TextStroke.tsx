"use client";

interface Props {
  textStroke: number;
  setTextStroke: (val: number) => void;
  textStrokeColor: string;
  setTextStrokeColor: (val: string) => void;
}

export default function TextStrokeControls({
  textStroke,
  setTextStroke,
  textStrokeColor,
  setTextStrokeColor,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Stroke Width */}
      <div>
        <label className="block text-xs font-semibold mb-2 text-neutral-400 uppercase tracking-wider">
          Text Stroke: {textStroke}px
        </label>
        <input
          type="range"
          min="0"
          max="10"
          value={textStroke}
          onChange={(e) => setTextStroke(Number(e.target.value))}
          className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-white"
        />
        <div className="flex justify-between text-xs text-neutral-600 mt-1">
          <span>None</span>
          <span>10px</span>
        </div>
      </div>

      {/* Stroke Color - Only show if stroke is enabled */}
      {textStroke > 0 && (
        <div>
          <label className="block text-xs font-semibold mb-2 text-neutral-400 uppercase tracking-wider">
            Stroke Color
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={textStrokeColor}
              onChange={(e) => setTextStrokeColor(e.target.value)}
              className="w-12 h-10 rounded cursor-pointer border border-neutral-700"
            />
            <input
              type="text"
              value={textStrokeColor}
              onChange={(e) => setTextStrokeColor(e.target.value)}
              className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-sm focus:outline-none focus:border-neutral-500"
              placeholder="#000000"
            />
          </div>
        </div>
      )}
    </div>
  );
}