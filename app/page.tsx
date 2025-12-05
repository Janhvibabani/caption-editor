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

  return (
    <div className="flex bg-black text-white h-screen overflow-hidden">
      {/* LEFT PANEL */}
      <div className="w-80 overflow-y-auto p-5 space-y-6 border-r border-neutral-800 bg-[#0d0d0d]">
        <CaptionInput caption={caption} setCaption={setCaption} />

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