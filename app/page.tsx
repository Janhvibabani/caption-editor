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

  const handleExport = async () => {
    const canvas = document.getElementById("export-canvas") as HTMLCanvasElement
    if (!canvas || !image) {
      console.error("Canvas or image not found")
      return
    }

    try {
      const exportScale = 2

      // Calculate image bounds (same logic as ImageCanvas)
      const containerWidth = canvas.width
      const containerHeight = canvas.height

      const img = new Image()
      img.crossOrigin = "anonymous"
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error("Failed to load image"))
        img.src = image
      })

      const aspect = img.naturalWidth / img.naturalHeight
      const contAspect = containerWidth / containerHeight
      let w, h

      if (aspect > contAspect) {
        w = containerWidth
        h = w / aspect
      } else {
        h = containerHeight
        w = h * aspect
      }

      const ox = (containerWidth - w) / 2
      const oy = (containerHeight - h) / 2

      // Create export canvas with only the image size (no black space)
      const exportCanvas = document.createElement("canvas")
      exportCanvas.width = w * exportScale
      exportCanvas.height = h * exportScale

      const ctx = exportCanvas.getContext("2d")
      if (!ctx) {
        throw new Error("Failed to get canvas context")
      }

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"

      // Draw only the image portion (cropping out black space)
      ctx.drawImage(
        canvas,
        ox, oy, w, h,  // Source: crop from original canvas
        0, 0, exportCanvas.width, exportCanvas.height // Destination: full export canvas
      )

      const blob = await new Promise<Blob>((resolve, reject) => {
        exportCanvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to create blob"))
              return
            }
            resolve(blob)
          },
          "image/png",
          1.0,
        )
      })

      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.download = `captioned-image-${Date.now()}.png`
      link.href = url

      document.body.appendChild(link)
      link.click()

      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }, 100)

      console.log("Export successful!")
    } catch (error) {
      console.error("Export failed:", error)
      alert("Export failed. Please try again.")
    }
  }

  const handleCopy = async () => {
    const canvas = document.getElementById("export-canvas") as HTMLCanvasElement
    if (!canvas || !image) {
      console.error("Canvas or image not found")
      return
    }

    try {
      // Calculate image bounds (same logic as ImageCanvas)
      const containerWidth = canvas.width
      const containerHeight = canvas.height

      const img = new Image()
      img.crossOrigin = "anonymous"
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error("Failed to load image"))
        img.src = image
      })

      const aspect = img.naturalWidth / img.naturalHeight
      const contAspect = containerWidth / containerHeight
      let w, h

      if (aspect > contAspect) {
        w = containerWidth
        h = w / aspect
      } else {
        h = containerHeight
        w = h * aspect
      }

      const ox = (containerWidth - w) / 2
      const oy = (containerHeight - h) / 2

      // Create export canvas with only the image size (no black space)
      const copyCanvas = document.createElement("canvas")
      copyCanvas.width = w
      copyCanvas.height = h

      const ctx = copyCanvas.getContext("2d")
      if (!ctx) {
        throw new Error("Failed to get canvas context")
      }

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"

      // Draw only the image portion (cropping out black space)
      ctx.drawImage(
        canvas,
        ox, oy, w, h,  // Source: crop from original canvas
        0, 0, copyCanvas.width, copyCanvas.height // Destination: full copy canvas
      )

      const blob = await new Promise<Blob>((resolve, reject) => {
        copyCanvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to create blob"))
              return
            }
            resolve(blob)
          },
          "image/png",
          1.0,
        )
      })

      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ])

      console.log("Copy successful!")
    } catch (error) {
      console.error("Copy failed:", error)
      alert("Copy failed. Please try again.")
    }
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
