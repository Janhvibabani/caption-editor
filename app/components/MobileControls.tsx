"use client";

import { useState } from "react";
import { Theme } from "../hooks/useTheme";
import CaptionInput from "./CaptionInput";
import ColorPicker from "./ColorPicker";
import OpacitySlider from "./OpacitySlider";
import FontPicker from "./FontPicker";
import FontSizeSlider from "./FontSizeSlider";
import TextStrokeControls from "./TextStroke";
import ResetButton from "./ResetButton";

interface Props {
  caption: string;
  setCaption: (val: string) => void;
  textColor: string;
  setTextColor: (val: string) => void;
  bgColor: string;
  setBgColor: (val: string) => void;
  opacity: number;
  setOpacity: (val: number) => void;
  font: string;
  setFont: (val: string) => void;
  fontSize: number;
  setFontSize: (val: number) => void;
  textStroke: number;
  setTextStroke: (val: number) => void;
  textStrokeColor: string;
  setTextStrokeColor: (val: string) => void;
  onReset: () => void;
  theme: Theme;
}

export default function MobileControls({
  caption,
  setCaption,
  textColor,
  setTextColor,
  bgColor,
  setBgColor,
  opacity,
  setOpacity,
  font,
  setFont,
  fontSize,
  setFontSize,
  textStroke,
  setTextStroke,
  textStrokeColor,
  setTextStrokeColor,
  onReset,
  theme,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-70px)]'
        } ${
          theme === 'dark'
            ? 'bg-[#0d0d0d] border-neutral-800'
            : 'bg-neutral-50 border-neutral-200'
        } border-t rounded-t-3xl shadow-2xl`}
        style={{ maxHeight: '85vh' }}
      >
        {/* Handle */}
        <div
          className="flex flex-col items-center pt-4 pb-3 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className={`w-12 h-1.5 rounded-full mb-2 ${
            theme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-300'
          }`} />
          <p className={`text-xs font-semibold ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            {isExpanded ? '▼ Tap to close' : '▲ Tap for controls'}
          </p>
        </div>

        {/* Expanded Controls */}
        <div 
          className={`px-4 pb-6 overflow-y-auto transition-opacity duration-200 ${
            isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ maxHeight: 'calc(85vh - 70px)' }}
        >
          <div className="space-y-6">
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

            <ResetButton onReset={handleReset} theme={theme} />
          </div>
        </div>
      </div>
    </>
  );

  function handleReset() {
    onReset();
    setIsExpanded(false);
  }
}