"use client";

import { useState } from "react";
import CaptionInput from "./components/CaptionInput";
import ColorPicker from "./components/ColorPicker";
import OpacitySlider from "./components/OpacitySlider";
import ImageUploader from "./components/ImageUploader";
import ImageCanvas from "./components/ImageCanvas";
import ImageFilters from "./components/ImageFilters";
import FontPicker from "./components/FontPicker";
import FontSizeSlider from "./components/FontSizeSlider";
import ResetButton from "./components/ResetButton";
import TextStrokeControls from "./components/TextStroke";

export default function Page() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [bgColor, setBgColor] = useState("#000000");
  const [opacity, setOpacity] = useState(0);
  const [filter, setFilter] = useState("none");
  const [font, setFont] = useState("Arial, sans-serif");
  const [fontSize, setFontSize] = useState(28);
  const [textStroke, setTextStroke] = useState(3);
  const [textStrokeColor, setTextStrokeColor] = useState("#000000");

  const handleReset = () => {
    setImage(null);
    setCaption("");
    setTextColor("#FFFFFF");
    setBgColor("#000000");
    setOpacity(0);
    setFilter("none");
    setFont("Arial, sans-serif");
    setFontSize(28);
    setTextStroke(3);
    setTextStrokeColor("#000000");
  };

  const handleSetImage = (file: string | null) => {
    setImage(file);
  };

  const handleExport = async () => {
    const canvas = document.getElementById("export-canvas") as HTMLCanvasElement;
    if (!canvas || !image) {
      console.error("Canvas or image not found");
      return;
    }

    try {
      const exportScale = 2;

      const containerWidth = canvas.width;
      const containerHeight = canvas.height;

      const img = new Image();
      img.crossOrigin = "anonymous";

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = image;
      });

      const aspect = img.naturalWidth / img.naturalHeight;
      const contAspect = containerWidth / containerHeight;
      let w: number, h: number;

      if (aspect > contAspect) {
        w = containerWidth;
        h = w / aspect;
      } else {
        h = containerHeight;
        w = h * aspect;
      }

      const ox = (containerWidth - w) / 2;
      const oy = (containerHeight - h) / 2;

      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = w * exportScale;
      exportCanvas.height = h * exportScale;

      const ctx = exportCanvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        canvas,
        ox,
        oy,
        w,
        h,
        0,
        0,
        exportCanvas.width,
        exportCanvas.height,
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
          1.0,
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

  const handleCopy = async () => {
    const canvas = document.getElementById("export-canvas") as HTMLCanvasElement;
    if (!canvas || !image) {
      console.error("Canvas or image not found");
      return;
    }

    try {
      const containerWidth = canvas.width;
      const containerHeight = canvas.height;

      const img = new Image();
      img.crossOrigin = "anonymous";

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = image;
      });

      const aspect = img.naturalWidth / img.naturalHeight;
      const contAspect = containerWidth / containerHeight;
      let w: number, h: number;

      if (aspect > contAspect) {
        w = containerWidth;
        h = w / aspect;
      } else {
        h = containerHeight;
        w = h * aspect;
      }

      const ox = (containerWidth - w) / 2;
      const oy = (containerHeight - h) / 2;

      const copyCanvas = document.createElement("canvas");
      copyCanvas.width = w;
      copyCanvas.height = h;

      const ctx = copyCanvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        canvas,
        ox,
        oy,
        w,
        h,
        0,
        0,
        copyCanvas.width,
        copyCanvas.height,
      );

      const blob = await new Promise<Blob>((resolve, reject) => {
        copyCanvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to create blob"));
              return;
            }
            resolve(blob);
          },
          "image/png",
          1.0,
        );
      });

      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);

      console.log("Copy successful!");
    } catch (error) {
      console.error("Copy failed:", error);
      alert("Copy failed. Please try again.");
    }
  };

  return (
    <div className="flex bg-black text-white h-screen overflow-hidden">
      {/* LEFT PANEL */}
      <div className="w-80 overflow-y-auto p-5 space-y-6 border-r border-neutral-800 bg-[#0d0d0d]">
        <CaptionInput caption={caption} setCaption={setCaption} />

        <ColorPicker
          title="TEXT COLOR"
          value={textColor}
          onChange={setTextColor}
        />

        <TextStrokeControls
          textStroke={textStroke}
          setTextStroke={setTextStroke}
          textStrokeColor={textStrokeColor}
          setTextStrokeColor={setTextStrokeColor}
        />

        <ColorPicker
          title="BACKGROUND COLOR"
          value={bgColor}
          onChange={setBgColor}
        />

        <OpacitySlider opacity={opacity} setOpacity={setOpacity} />

        <FontSizeSlider fontSize={fontSize} setFontSize={setFontSize} />

        <FontPicker font={font} setFont={setFont} />

        {image && <ResetButton onReset={handleReset} />}
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col">
        {/* CANVAS AREA */}
        <div className="flex-1 border-b border-neutral-800 overflow-hidden">
          {!image ? (
            <ImageUploader setImage={handleSetImage} />
          ) : (
            <ImageCanvas
              image={image}
              caption={caption}
              textColor={textColor}
              bgColor={bgColor}
              opacity={opacity}
              filter={filter}
              font={font}
              fontSize={fontSize}
              textStroke={textStroke}
              textStrokeColor={textStrokeColor}
            />
          )}
        </div>

        {/* BOTTOM BAR */}
        <div className="p-4 border-t border-neutral-800 bg-[#0d0d0d] flex items-center justify-between">
          <ImageFilters filter={filter} setFilter={setFilter} />

          {image && (
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="flex-1 px-4 py-2 bg-white text-black font-semibold rounded-lg text-sm hover:shadow-lg hover:shadow-white/20 transition-all cursor-pointer"
              >
                Download
              </button>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-[#2d2d2d] text-white rounded-lg text-sm hover:bg-[#3d3d3d] transition-all cursor-pointer"
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
