"use client";

interface Props {
  onReset: () => void;
  theme?: "light" | "dark";
  compact?: boolean; // NEW: For icon-only version
}

export default function ResetButton({ onReset, theme = "dark", compact = false }: Props) {
  if (compact) {
    // Icon-only version for floating buttons
    return (
      <button
        onClick={onReset}
        className={`flex items-center justify-center w-10 h-10 rounded-lg font-semibold text-sm transition shadow-lg ${
          theme === 'dark'
            ? 'bg-white text-black hover:bg-neutral-200'
            : 'bg-black text-white hover:bg-neutral-800'
        }`}
        title="Reset Image"
      >
        {/* Reset/Refresh Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="1 4 1 10 7 10" />
          <polyline points="23 20 23 14 17 14" />
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
        </svg>
      </button>
    );
  }

  // Full button version (not used anymore, but keeping for compatibility)
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