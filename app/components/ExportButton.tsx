"use client";

export default function ExportButton() {
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
      className="px-6 py-2 bg-white text-black font-semibold rounded text-sm hover:bg-neutral-200 transition uppercase tracking-wider"
    >
      Export
    </button>
  );
}