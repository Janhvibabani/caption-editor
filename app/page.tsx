"use client";

import { useState } from "react";
import CaptionInput from "./components/CaptionInput";
import ColorPicker from "./components/ColorPicker";
import OpacitySlider from "./components/OpacitySlider";
import ImageUploader from "./components/ImageUploader";
import ImageCanvas from "./components/ImageCanvas";
import ImageFilters from "./components/ImageFilters";
import ExportButton from "./components/ExportButton";
import FontPicker from "./components/FontPicker";
import FontSizeSlider from "./components/FontSizeSlider";
import ResetButton from "./components/ResetButton";
import TextStrokeControls from "./components/TextStroke"; // NEW

export default function Page() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [bgColor, setBgColor] = useState("#000000");
  const [opacity, setOpacity] = useState(0);
  const [filter, setFilter] = useState("none");
  const [font, setFont] = useState("Arial, sans-serif");
  const [fontSize, setFontSize] = useState(28);
  const [textStroke, setTextStroke] = useState(3); // NEW
  const [textStrokeColor, setTextStrokeColor] = useState("#000000"); // NEW
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

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
    setIsBold(false);
    setIsItalic(false);
    setIsUnderline(false);
  };

  const handleSetImage = (file: string | null) => {
    setImage(file);
  };

  return (
    <div className="flex bg-black text-white h-screen overflow-hidden">
      {/* LEFT PANEL */}
      <div className="w-80 overflow-y-auto p-5 space-y-6 border-r border-neutral-800 bg-[#0d0d0d]">
        <CaptionInput caption={caption} setCaption={setCaption} />

        {/* Caption Formatting */}
        <div className="mb-4">
          <label className="block text-xs text-neutral-400 mb-2">CAPTION STYLE</label>
          <div className="flex gap-3">
            <button
              type="button"
              className={`w-10 h-10 flex items-center justify-center rounded-md border-2 transition-colors duration-150 ${isBold ? "bg-neutral-200 border-neutral-400" : "bg-[#181818] border-neutral-700"}`}
              onClick={() => setIsBold((v) => !v)}
              aria-label="Bold"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isBold ? "#222" : "#aaa"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 0 8H6zm0 8h9a4 4 0 0 1 0 8H6z"/></svg>
            </button>
            <button
              type="button"
              className={`w-10 h-10 flex items-center justify-center rounded-md border-2 transition-colors duration-150 ${isItalic ? "bg-neutral-200 border-neutral-400" : "bg-[#181818] border-neutral-700"}`}
              onClick={() => setIsItalic((v) => !v)}
              aria-label="Italic"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isItalic ? "#222" : "#aaa"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>
            </button>
            <button
              type="button"
              className={`w-10 h-10 flex items-center justify-center rounded-md border-2 transition-colors duration-150 ${isUnderline ? "bg-neutral-200 border-neutral-400" : "bg-[#181818] border-neutral-700"}`}
              onClick={() => setIsUnderline((v) => !v)}
              aria-label="Underline"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isUnderline ? "#222" : "#aaa"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" y1="20" x2="20" y2="20"/></svg>
            </button>
          </div>
        </div>

        <ColorPicker title="TEXT COLOR" value={textColor} onChange={setTextColor} />
        
        {/* NEW: Text Stroke Controls */}
        <TextStrokeControls
          textStroke={textStroke}
          setTextStroke={setTextStroke}
          textStrokeColor={textStrokeColor}
          setTextStrokeColor={setTextStrokeColor}
        />

        <ColorPicker title="BACKGROUND COLOR" value={bgColor} onChange={setBgColor} />

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
              isBold={isBold}
              isItalic={isItalic}
              isUnderline={isUnderline}
            />
          )}
        </div>

        {/* BOTTOM BAR */}
        <div className="p-4 border-t border-neutral-800 bg-[#0d0d0d] flex items-center justify-between">
          <ImageFilters filter={filter} setFilter={setFilter} />

          {image && <ExportButton />}
        </div>
      </div>
    </div>
  );
}