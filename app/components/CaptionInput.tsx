"use client";

import { Theme } from "../hooks/useTheme";

interface Props {
  caption: string;
  setCaption: (val: string) => void;
  theme: Theme;
}

export default function CaptionInput({ caption, setCaption, theme }: Props) {
  return (
    <div>
      <label className={`block text-xs font-semibold mb-2 uppercase tracking-wider ${
        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
      }`}>
        Caption
      </label>
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Enter caption text..."
        className={`w-full px-3 py-2 border rounded text-sm focus:outline-none resize-none ${
          theme === 'dark'
            ? 'bg-neutral-900 border-neutral-700 focus:border-neutral-500 text-white placeholder-neutral-500'
            : 'bg-white border-neutral-300 focus:border-neutral-500 text-black placeholder-neutral-400'
        }`}
        rows={4}
      />
      <p className={`text-xs mt-1 ${
        theme === 'dark' ? 'text-neutral-600' : 'text-neutral-500'
      }`}>
        Press Shift+Enter for line breaks
      </p>
    </div>
  );
}