"use client";

interface Props {
  caption: string;
  setCaption: (val: string) => void;
}

export default function CaptionInput({ caption, setCaption }: Props) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-2 text-neutral-400 uppercase tracking-wider">
        Caption
      </label>
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Enter caption text..."
        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-sm focus:outline-none focus:border-neutral-500 resize-none"
        rows={4}
      />
      <p className="text-xs text-neutral-600 mt-1">
        Press Shift+Enter for line breaks
      </p>
    </div>
  );
}