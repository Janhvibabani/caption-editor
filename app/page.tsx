"use client";

import { useState } from "react";
import CaptionInput from "./components/CaptionInput";
import ColorPicker from "./components/ColorPicker";
import OpacitySlider from "./components/OpacitySlider";
import ImageUploader from "./components/ImageUploader";
import ImageCanvas from "./components/ImageCanvas";
import FilterPreviews from "./components/FilterPreviews";
import ExportButton from "./components/ExportButton";
import FontPicker from "./components/FontPicker";
import FontSizeSlider from "./components/FontSizeSlider";
import ResetButton from "./components/ResetButton";
import TextStrokeControls from "./components/TextStroke";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";
import { useMediaQuery } from "./hooks/useMediaQuery";

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

  const { theme, toggleTheme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  // Desktop Layout
  if (!isMobile) {
    return (
      <div className={`flex h-screen overflow-hidden ${
        theme === 'dark' 
          ? 'bg-black text-white' 
          : 'bg-white text-black'
      }`}>
        {/* LEFT PANEL */}
        <div className={`w-80 overflow-y-auto p-5 space-y-6 border-r ${
          theme === 'dark'
            ? 'border-neutral-800 bg-[#0d0d0d]'
            : 'border-neutral-200 bg-neutral-50'
        }`}>
          {/* Header with Title */}
          <div className="pb-4">
            <h1 className="text-xl font-bold">Caption Editor</h1>
          </div>

          <CaptionInput caption={caption} setCaption={setCaption} theme={theme} />

          <ColorPicker 
            title="TEXT COLOR" 
            value={textColor} 
            onChange={setTextColor}
            theme={theme}
          />
          
          <TextStrokeControls
            textStroke={textStroke}
            setTextStroke={setTextStroke}
            textStrokeColor={textStrokeColor}
            setTextStrokeColor={setTextStrokeColor}
            theme={theme}
          />

          <ColorPicker 
            title="BACKGROUND COLOR" 
            value={bgColor} 
            onChange={setBgColor}
            theme={theme}
          />

          <OpacitySlider opacity={opacity} setOpacity={setOpacity} theme={theme} />
          
          <FontSizeSlider fontSize={fontSize} setFontSize={setFontSize} theme={theme} />
          
          <FontPicker font={font} setFont={setFont} theme={theme} />
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col">
          {/* TOP BAR - Theme Toggle */}
          <div className={`flex items-center justify-end p-4 border-b ${
            theme === 'dark'
              ? 'border-neutral-800 bg-[#0d0d0d]'
              : 'border-neutral-200 bg-neutral-50'
          }`}>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

          {/* CANVAS AREA with Action Buttons */}
          <div className="flex-1 overflow-hidden relative" style={{ maxHeight: 'calc(100vh - 240px)' }}>
            {!image ? (
              <ImageUploader setImage={handleSetImage} theme={theme} />
            ) : (
              <>
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
                  theme={theme}
                />
                {/* Action Buttons - Floating on Canvas */}
                <div className="absolute top-4 right-4 z-10 flex gap-3">
                  <ResetButton onReset={handleReset} theme={theme} compact />
                  <ExportButton theme={theme} />
                </div>
              </>
            )}
          </div>

          {/* FILTER PREVIEWS BAR */}
          {image && (
            <FilterPreviews
              image={image}
              currentFilter={filter}
              onFilterSelect={setFilter}
              theme={theme}
            />
          )}
        </div>
      </div>
    );
  }

  // Mobile Layout - Fixed Canvas + Scrollable Controls
  return (
    <div className={`flex flex-col h-screen overflow-hidden ${
      theme === 'dark' 
        ? 'bg-black text-white' 
        : 'bg-white text-black'
    }`}>
      {/* MOBILE HEADER - Fixed */}
      <div className={`flex items-center justify-between p-4 ${
        theme === 'dark'
          ? 'bg-[#0d0d0d]'
          : 'bg-neutral-50'
      }`}>
        <h1 className="text-lg font-bold">Caption Editor</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      {/* CANVAS AREA - Fixed, not scrollable */}
      <div className="flex-shrink-0 relative" style={{ height: '40vh' }}>
        {!image ? (
          <ImageUploader setImage={handleSetImage} theme={theme} />
        ) : (
          <>
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
              theme={theme}
            />
            {/* Action Buttons - Floating on Canvas */}
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              <ResetButton onReset={handleReset} theme={theme} compact />
              <ExportButton theme={theme} />
            </div>
          </>
        )}
      </div>

      {/* SCROLLABLE CONTENT AREA */}
      {image && (
        <div className="flex-1 overflow-y-auto">
          {/* FILTER PREVIEWS */}
          <FilterPreviews
            image={image}
            currentFilter={filter}
            onFilterSelect={setFilter}
            theme={theme}
          />

          {/* CONTROLS SECTION */}
          <div className={`p-4 space-y-6 ${
            theme === 'dark'
              ? 'bg-[#0d0d0d]'
              : 'bg-neutral-50'
          }`}>
            <CaptionInput caption={caption} setCaption={setCaption} theme={theme} />

            <ColorPicker 
              title="TEXT COLOR" 
              value={textColor} 
              onChange={setTextColor}
              theme={theme}
            />
            
            <TextStrokeControls
              textStroke={textStroke}
              setTextStroke={setTextStroke}
              textStrokeColor={textStrokeColor}
              setTextStrokeColor={setTextStrokeColor}
              theme={theme}
            />

            <ColorPicker 
              title="BACKGROUND COLOR" 
              value={bgColor} 
              onChange={setBgColor}
              theme={theme}
            />

            <OpacitySlider opacity={opacity} setOpacity={setOpacity} theme={theme} />
            
            <FontSizeSlider fontSize={fontSize} setFontSize={setFontSize} theme={theme} />
            
            <FontPicker font={font} setFont={setFont} theme={theme} />
          </div>
        </div>
      )}
    </div>
  );
}