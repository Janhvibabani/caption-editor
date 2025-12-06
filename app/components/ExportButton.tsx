"use client";

import { Theme } from "../hooks/useTheme";

interface Props {
  theme: Theme;
}

export default function ExportButton({ theme }: Props) {
  const handleExport = async () => {
    const canvas = document.getElementById("export-canvas") as HTMLCanvasElement;
    if (!canvas) {
      console.error("Canvas not found");
      return;
    }

    try {
      const exportScale = 2;
      
      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = canvas.width * exportScale;
      exportCanvas.height = canvas.height * exportScale;
      
      const ctx = exportCanvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        canvas,
        0, 0, canvas.width, canvas.height,
        0, 0, exportCanvas.width, exportCanvas.height
      );

      const blob = await new Promise<Blob>((resolve, reject) => {
        exportCanvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to create blob"));
              return;
            }
            resolve(blob);
          },
          "image/png",
          1.0
        );
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `captioned-image-${Date.now()}.png`;
      link.href = url;
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);

      console.log("Export successful!");
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleExport}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition shadow-lg ${
        theme === 'dark'
          ? 'bg-white text-black hover:bg-neutral-200'
          : 'bg-black text-white hover:bg-neutral-800'
      }`}
      title="Export Image"
    >
      {/* Download Icon */}
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
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      <span>Export</span>
    </button>
  );
}