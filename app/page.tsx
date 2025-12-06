"use client"

import { useState } from "react"
import CaptionInput from "../components/CaptionInput"
import ColorPicker from "../components/ColorPicker"
import OpacitySlider from "../components/OpacitySlider"
import ImageUploader from "../components/ImageUploader"
import ImageCanvas from "../components/ImageCanvas"
import ImageFilters from "../components/ImageFilters"
import FontPicker from "../components/FontPicker"
import FontSizeSlider from "../components/FontSizeSlider"
import ResetButton from "../components/ResetButton"
import TextStrokeControls from "../components/TextStroke"
import TextFormatting from "../components/TextFormatting"

export default function Page() {
  const [caption, setCaption] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [textColor, setTextColor] = useState("#FFFFFF")
  const [bgColor, setBgColor] = useState("#000000")
  const [opacity, setOpacity] = useState(0)
  const [filter, setFilter] = useState("none")
  const [font, setFont] = useState("Arial, sans-serif")
  const [fontSize, setFontSize] = useState(28)
  const [textStroke, setTextStroke] = useState(3)
  const [textStrokeColor, setTextStrokeColor] = useState("#000000")
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)

  const handleReset = () => {
    setImage(null)
    setCaption("")
    setTextColor("#FFFFFF")
    setBgColor("#000000")
    setOpacity(0)
    setFilter("none")
    setFont("Arial, sans-serif")
    setFontSize(28)
    setTextStroke(3)
    setTextStrokeColor("#000000")
    setBold(false)
    setItalic(false)
    setUnderline(false)
  }

  const handleSetImage = (file: string | null) => {
    setImage(file)
  }

  return (
    <div className="flex flex-col bg-black text-[var(--color-text-primary)] h-screen overflow-hidden">
      <div className="flex gap-6 flex-1 overflow-hidden p-6">

        {/* Sidebar */}
        <div className="w-72 flex flex-col bg-[#1a1a1a] rounded-xl border border-[#2d2d2d] p-4 shadow-lg relative">
          <style>{`
            .sidebar-scrollable {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .sidebar-scrollable::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="sidebar-scrollable flex-1 overflow-y-auto pr-2 space-y-4 mb-4">
            <div className="mb-2 px-2">
              <h1 className="text-lg font-bold">Caption</h1>
            </div>

            <div className="rounded-lg bg-[#242424] p-3 border border-[#333333]">
              <CaptionInput caption={caption} setCaption={setCaption} />
            </div>

            {!image && (
              <div className="rounded-lg bg-[#242424] p-3 border border-dashed border-[#333333] text-center hover:border-[#444444] transition-colors cursor-pointer">
                <button
                  onClick={() => document.querySelector('input[type="file"]')?.click()}
                  className="w-full text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  Upload Image
                </button>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">or drag & drop</p>
              </div>
            )}

            <div className="rounded-lg bg-[#242424] p-3 border border-[#333333]">
              <ColorPicker title="TEXT COLOR" value={textColor} onChange={setTextColor} />
            </div>

            <div className="rounded-lg bg-[#242424] p-3 border border-[#333333]">
              <TextStrokeControls
                textStroke={textStroke}
                setTextStroke={setTextStroke}
                textStrokeColor={textStrokeColor}
                setTextStrokeColor={setTextStrokeColor}
              />
            </div>

            <div className="rounded-lg bg-[#242424] p-3 border border-[#333333]">
              <ColorPicker title="BG COLOR" value={bgColor} onChange={setBgColor} />
            </div>

            <div className="rounded-lg bg-[#242424] p-3 border border-[#333333]">
              <OpacitySlider opacity={opacity} setOpacity={setOpacity} />
            </div>

            <div className="rounded-lg bg-[#242424] p-3 border border-[#333333]">
              <FontSizeSlider fontSize={fontSize} setFontSize={setFontSize} />
            </div>

            <div className="rounded-lg bg-[#242424] p-3 border border-[#333333]">
              <FontPicker font={font} setFont={setFont} />
            </div>

            <div className="rounded-lg bg-[#242424] p-3 border border-[#333333]">
              <TextFormatting
                bold={bold}
                setBold={setBold}
                italic={italic}
                setItalic={setItalic}
                underline={underline}
                setUnderline={setUnderline}
              />
            </div>

            {image && (
              <div className="rounded-lg bg-[#242424] p-3 border border-[#333333]">
                <ResetButton onReset={handleReset} />
              </div>
            )}
          </div>

          <div className="border-t border-[#333333] pt-3 space-y-2 flex gap-2">
            <button className="flex-1 px-4 py-2 bg-white text-black font-semibold rounded-lg text-sm">
              Download
            </button>
            <button
              onClick={() => {
                const canvas = document.getElementById("export-canvas") as HTMLCanvasElement
                if (canvas) {
                  canvas.toBlob((blob) => {
                    if (blob) navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
                  })
                }
              }}
              className="px-4 py-2 bg-[#2d2d2d] text-white rounded-lg text-sm"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full h-full max-w-5xl flex items-center justify-center">
              {!image ? (
                <ImageUploader setImage={handleSetImage} />
              ) : (
                <div className="w-full h-full flex items-center justify-center rounded-3xl border border-[#2d2d2d] bg-black overflow-hidden shadow-xl">
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
                    bold={bold}
                    italic={italic}
                    underline={underline}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {image && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl shadow-lg px-6 py-3 flex items-center gap-6">
            <ImageFilters filter={filter} setFilter={setFilter} />
          </div>
        </div>
      )}
    </div>
  )
}
