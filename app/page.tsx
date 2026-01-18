"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import ImageUploader from "./components/ImageUploader";
import ImageCanvas from "./components/ImageCanvas";
import FontPicker from "./components/FontPicker";
import ThemeToggle from "./components/ThemeToggle";
import CropRotateControls from "./components/CropRotateControls";
import CropModal from "./components/CropModal";
import CompactSlider from "./components/CompactSlider";
import ColorPicker from "./components/ColorPicker";
import FilterPreviews from "./components/FilterPreviews";
import DummyFilterPreviews from "./components/DummyFilterPreviews";
import TextStyles from "./components/TextStyles";
import PresetChips from "./components/PresetChips";
import BottomNavigation from "./components/mobile/BottomNavigation";
import BottomSheet from "./components/mobile/BottomSheet";
import FilterCarousel from "./components/mobile/FilterCarousel";
import StyleCarousel from "./components/mobile/StyleCarousel";
import { useTheme } from "./hooks/useTheme";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { Download, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Page() {
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [bgColor, setBgColor] = useState("#000000");
  const [opacity, setOpacity] = useState(0);
  const [filter, setFilter] = useState("none");
  const [font, setFont] = useState("Arial, sans-serif");
  const [fontSize, setFontSize] = useState(28);
  const [textStroke, setTextStroke] = useState(3);
  const [textStrokeColor, setTextStrokeColor] = useState("#000000");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [activeTab, setActiveTab] = useState("caption");
  const [activeMobileTab, setActiveMobileTab] = useState<"caption" | "filters" | "style">("caption");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleReset = () => {
    setImage(null);
    setSubtitle("");
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

  const handlePresetSelect = (settings: {
    textColor: string;
    bgColor: string;
    opacity: number;
    textStroke: number;
    textStrokeColor: string;
    font?: string;
    fontSize?: number;
    isBold?: boolean;
    isItalic?: boolean;
    isUnderline?: boolean;
  }) => {
    setTextColor(settings.textColor);
    setBgColor(settings.bgColor);
    setOpacity(settings.opacity);
    setTextStroke(settings.textStroke);
    setTextStrokeColor(settings.textStrokeColor);
    
    if (settings.font) setFont(settings.font);
    if (settings.fontSize) setFontSize(settings.fontSize);
    if (settings.isBold !== undefined) setIsBold(settings.isBold);
    if (settings.isItalic !== undefined) setIsItalic(settings.isItalic);
    if (settings.isUnderline !== undefined) setIsUnderline(settings.isUnderline);
  };

  const handleRotate = () => {
    if (!image) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = img.height;
      canvas.height = img.width;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      setImage(canvas.toDataURL("image/png"));
    };
    img.src = image;
  };

  const handleExport = async () => {
    const canvas = document.getElementById("export-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    try {
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) reject(new Error("Failed to create blob"));
          else resolve(blob);
        }, "image/png", 1.0);
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `caption-image-${Date.now()}.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    }
  };

  const handleMobileTabChange = (tab: "caption" | "filters" | "style") => {
    setActiveMobileTab(tab);
    setIsSheetOpen(true);
  };

  // Mobile-first layout
  if (isMobile) {
    return (
      <div
        className={cn(
          "flex flex-col h-screen overflow-hidden",
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        )}
      >
        {/* Top Bar */}
        <div
          className={cn(
            "flex items-center justify-between px-4 py-3 border-b shrink-0 z-30",
            theme === "dark"
              ? "border-neutral-800 bg-neutral-950"
              : "border-neutral-200 bg-neutral-50"
          )}
        >
          <h1 className="text-lg font-bold tracking-tight">Caption Editor</h1>
          <div className="flex items-center gap-2">
            {image && (
              <>
                <CropRotateControls
                  onRotate={handleRotate}
                  onCrop={() => setShowCropModal(true)}
                  theme={theme}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReset}
                  className={cn(
                    "h-9 w-9",
                    theme === "dark"
                      ? "bg-neutral-900 border-neutral-800 hover:bg-neutral-800"
                      : "bg-white border-neutral-300 hover:bg-neutral-100"
                  )}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button
              onClick={handleExport}
              disabled={!image}
              variant="default"
              size="sm"
              className="gap-2 h-9"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>

        {/* Canvas Area - Always Visible */}
        <div className="flex-1 relative min-h-0 pb-16" style={{ minHeight: 0 }}>
          {!image ? (
            <ImageUploader setImage={setImage} theme={theme} />
          ) : (
            <ImageCanvas
              image={image}
              subtitle={subtitle}
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
              theme={theme}
            />
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation
          activeTab={activeMobileTab}
          onTabChange={handleMobileTabChange}
          theme={theme}
        />

        {/* Bottom Sheets for Controls */}
        <BottomSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          theme={theme}
          title={
            activeMobileTab === "caption"
              ? "Caption"
              : activeMobileTab === "filters"
              ? "Filters"
              : "Style"
          }
        >
          {activeMobileTab === "caption" && (
            <div className="space-y-4">
              <div>
                <label
                  className={cn(
                    "block text-xs font-semibold mb-2 uppercase tracking-wider",
                    theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                  )}
                >
                  Caption Text
                </label>
                <textarea
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Enter your caption..."
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 resize-none",
                    theme === "dark"
                      ? "bg-neutral-900 border-neutral-700 focus:border-neutral-500 text-white placeholder-neutral-500"
                      : "bg-white border-neutral-300 focus:border-neutral-500 text-black placeholder-neutral-400"
                  )}
                  rows={3}
                />
              </div>

              <div>
                <FontPicker font={font} setFont={setFont} theme={theme} />
              </div>

              <CompactSlider
                label="Font Size"
                value={fontSize}
                onChange={setFontSize}
                min={12}
                max={72}
                unit="px"
                theme={theme}
              />
            </div>
          )}

          {activeMobileTab === "filters" && (
            <FilterCarousel
              image={image}
              currentFilter={filter}
              onFilterSelect={setFilter}
              theme={theme}
            />
          )}

          {activeMobileTab === "style" && (
            <StyleCarousel
              textColor={textColor}
              setTextColor={setTextColor}
              textStrokeColor={textStrokeColor}
              setTextStrokeColor={setTextStrokeColor}
              textStroke={textStroke}
              setTextStroke={setTextStroke}
              bgColor={bgColor}
              setBgColor={setBgColor}
              opacity={opacity}
              setOpacity={setOpacity}
              isBold={isBold}
              setIsBold={setIsBold}
              isItalic={isItalic}
              setIsItalic={setIsItalic}
              isUnderline={isUnderline}
              setIsUnderline={setIsUnderline}
              theme={theme}
            />
          )}
        </BottomSheet>

        {/* Crop Modal */}
        {showCropModal && image && (
          <CropModal
            image={image}
            onClose={() => setShowCropModal(false)}
            onCropComplete={(croppedImage) => {
              setImage(croppedImage);
              setShowCropModal(false);
            }}
            theme={theme}
          />
        )}
      </div>
    );
  }

  // Desktop layout (unchanged)
  return (
    <div
      className={cn(
        "flex flex-col h-screen overflow-hidden",
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      {/* Top Bar */}
      <div
        className={cn(
          "flex items-center justify-between px-6 py-3 border-b shrink-0",
          theme === "dark"
            ? "border-neutral-800 bg-neutral-950"
            : "border-neutral-200 bg-neutral-50"
        )}
      >
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold tracking-tight">Caption Editor</h1>
        </div>
        <div className="flex items-center gap-2">
          {image && (
            <>
              <CropRotateControls
                onRotate={handleRotate}
                onCrop={() => setShowCropModal(true)}
                theme={theme}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleReset}
                className={cn(
                  theme === "dark"
                    ? "bg-neutral-900 border-neutral-800 hover:bg-neutral-800"
                    : "bg-white border-neutral-300 hover:bg-neutral-100"
                )}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button
            onClick={handleExport}
            disabled={!image}
            variant="default"
            size="sm"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar - Fixed Width */}
        <div
          className={cn(
            "w-80 flex-shrink-0 border-r flex flex-col",
            theme === "dark"
              ? "border-neutral-800 bg-neutral-950"
              : "border-neutral-200 bg-neutral-50"
          )}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex flex-col h-full"
          >
            <div
              className="p-4 border-b"
              style={{ borderColor: theme === "dark" ? "#262626" : "#e5e5e5" }}
            >
              <TabsList
                className={cn(
                  "grid w-full grid-cols-3",
                  theme === "dark" ? "bg-neutral-900" : "bg-neutral-100"
                )}
              >
                <TabsTrigger value="caption" className="text-xs">
                  Caption
                </TabsTrigger>
                <TabsTrigger value="filters" className="text-xs">
                  Filters
                </TabsTrigger>
                <TabsTrigger value="export" className="text-xs">
                  Export
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <TabsContent value="caption" className="space-y-4 mt-0">
                <PresetChips onPresetSelect={handlePresetSelect} theme={theme} />

                <div>
                  <label
                    className={cn(
                      "block text-xs font-semibold mb-2 uppercase tracking-wider",
                      theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                    )}
                  >
                    Caption Text
                  </label>
                  <textarea
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Enter your caption..."
                    className={cn(
                      "w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 resize-none",
                      theme === "dark"
                        ? "bg-neutral-900 border-neutral-700 focus:border-neutral-500 text-white placeholder-neutral-500"
                        : "bg-white border-neutral-300 focus:border-neutral-500 text-black placeholder-neutral-400"
                    )}
                    rows={3}
                  />
                  <p
                    className={cn(
                      "text-xs mt-1",
                      theme === "dark" ? "text-neutral-600" : "text-neutral-500"
                    )}
                  >
                    Shift+Enter for line breaks
                  </p>
                </div>

                <div>
                  <label
                    className={cn(
                      "block text-xs font-semibold mb-2 uppercase tracking-wider",
                      theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                    )}
                  >
                    Font Family
                  </label>
                  <FontPicker font={font} setFont={setFont} theme={theme} />
                </div>

                <CompactSlider
                  label="Font Size"
                  value={fontSize}
                  onChange={setFontSize}
                  min={12}
                  max={72}
                  unit="px"
                  theme={theme}
                />
              </TabsContent>

              <TabsContent value="filters" className="space-y-4 mt-0">
                {!image ? (
                  <DummyFilterPreviews theme={theme} />
                ) : (
                  <FilterPreviews
                    image={image}
                    currentFilter={filter}
                    onFilterSelect={setFilter}
                    theme={theme}
                  />
                )}
              </TabsContent>

              <TabsContent value="export" className="space-y-4 mt-0">
                <Card
                  className={cn(
                    theme === "dark"
                      ? "bg-neutral-900 border-neutral-800"
                      : "bg-white border-neutral-200"
                  )}
                >
                  <CardContent className="p-4 space-y-4">
                    <div>
                      <h3
                        className={cn(
                          "text-sm font-semibold mb-2",
                          theme === "dark" ? "text-white" : "text-slate-900"
                        )}
                      >
                        Export Options
                      </h3>
                      <p
                        className={cn(
                          "text-xs",
                          theme === "dark" ? "text-white" : "text-slate-900"
                        )}
                      >
                        Export your image as PNG with high quality. The exported
                        image will include all applied styles and filters.
                      </p>
                    </div>
                    <Button
                      onClick={handleExport}
                      disabled={!image}
                      className="w-full"
                      variant="default"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Image
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Center Canvas Area */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <div className="flex-1 relative" style={{ minHeight: 0 }}>
            {!image ? (
              <ImageUploader setImage={setImage} theme={theme} />
            ) : (
              <ImageCanvas
                image={image}
                subtitle={subtitle}
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
                theme={theme}
              />
            )}
          </div>
        </div>

        {/* Right Style Panel - Fixed Width */}
        <div
          className={cn(
            "w-72 flex-shrink-0 border-l flex flex-col",
            theme === "dark"
              ? "border-neutral-800 bg-neutral-950"
              : "border-neutral-200 bg-neutral-50"
          )}
        >
          <div
            className="p-4 border-b"
            style={{ borderColor: theme === "dark" ? "#262626" : "#e5e5e5" }}
          >
            <h2
              className={cn(
                "text-sm font-semibold uppercase tracking-wider",
                theme === "dark" ? "text-neutral-400" : "text-neutral-600"
              )}
            >
              Style
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <ColorPicker
                title="Text Color"
                value={textColor}
                onChange={setTextColor}
                theme={theme}
              />
              <ColorPicker
                title="Stroke Color"
                value={textStrokeColor}
                onChange={setTextStrokeColor}
                theme={theme}
              />
            </div>

            <CompactSlider
              label="Stroke Width"
              value={textStroke}
              onChange={setTextStroke}
              min={0}
              max={10}
              unit="px"
              theme={theme}
            />

            <TextStyles
              isBold={isBold}
              setIsBold={setIsBold}
              isItalic={isItalic}
              setIsItalic={setIsItalic}
              isUnderline={isUnderline}
              setIsUnderline={setIsUnderline}
              theme={theme}
            />

            <ColorPicker
              title="Background Color"
              value={bgColor}
              onChange={setBgColor}
              theme={theme}
            />

            <CompactSlider
              label="Background Opacity"
              value={opacity}
              onChange={setOpacity}
              min={0}
              max={100}
              unit="%"
              theme={theme}
            />
          </div>
        </div>
      </div>

      {/* Crop Modal */}
      {showCropModal && image && (
        <CropModal
          image={image}
          onClose={() => setShowCropModal(false)}
          onCropComplete={(croppedImage) => {
            setImage(croppedImage);
            setShowCropModal(false);
          }}
          theme={theme}
        />
      )}
    </div>
  );
}
