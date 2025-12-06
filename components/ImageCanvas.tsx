"use client"

import React, { useRef, useEffect, useState } from "react"

interface Props {
  image: string | null
  caption: string
  textColor: string
  bgColor: string
  opacity: number
  filter: string
  font: string
  fontSize: number
  textStroke: number
  textStrokeColor: string
  bold: boolean
  italic: boolean
  underline: boolean
}

interface ImageBounds {
  width: number
  height: number
  offsetX: number
  offsetY: number
  naturalWidth: number
  naturalHeight: number
}

export default function ImageCanvas({
  image,
  caption,
  textColor,
  bgColor,
  opacity,
  filter,
  font,
  fontSize,
  textStroke,
  textStrokeColor,
  bold,
  italic,
  underline
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageBounds, setImageBounds] = useState<ImageBounds | null>(null)
  const [containerDimensions, setContainerDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect()
        setContainerDimensions({ width: r.width, height: r.height })
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    if (!image) return
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const aspect = img.naturalWidth / img.naturalHeight
      const contAspect = containerDimensions.width / containerDimensions.height
      let w, h

      if (aspect > contAspect) {
        w = containerDimensions.width
        h = w / aspect
      } else {
        h = containerDimensions.height
        w = h * aspect
      }

      const ox = (containerDimensions.width - w) / 2
      const oy = (containerDimensions.height - h) / 2

      setImageBounds({
        width: w,
        height: h,
        offsetX: ox,
        offsetY: oy,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      })

      draw(img, w, h, ox, oy)
    }
    img.src = image
  }, [
    image,
    caption,
    textColor,
    bgColor,
    opacity,
    filter,
    font,
    fontSize,
    textStroke,
    textStrokeColor,
    bold,
    italic,
    underline,
    containerDimensions
  ])

  const draw = (
    img: HTMLImageElement,
    w: number,
    h: number,
    ox: number,
    oy: number
  ) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = containerDimensions.width
    canvas.height = containerDimensions.height

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.filter = filter !== "none" ? mapFilter(filter) : "none"
    ctx.drawImage(img, ox, oy, w, h)
    ctx.filter = "none"

    if (caption) paintCaption(ctx, w, h, ox, oy)
  }

  const mapFilter = (key: string) =>
    ({
      grayscale: "grayscale(100%)",
      sepia: "sepia(100%)",
      blur: "blur(4px)",
      brightness: "brightness(1.2)",
      contrast: "contrast(1.2)",
      saturate: "saturate(1.5)",
      invert: "invert(100%)",
      none: "none"
    }[key] || "none")

  const paintCaption = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    ox: number,
    oy: number
  ) => {
    const padX = 16
    const padY = 8
    const radius = 6
    const margin = 10

    let style = ""
    if (italic) style += "italic "
    if (bold) style += "bold "
    style += `${fontSize}px ${font}`

    ctx.font = style
    ctx.textAlign = "center"

    const maxW = w * 0.9
    const lines = breakLines(ctx, caption, maxW)
    const lineH = fontSize * 1.2
    const txtH = lines.length * lineH

    const widths = lines.map(l => ctx.measureText(l).width)
    const maxTextW = Math.max(...widths)

    const bgW = maxTextW + padX * 2
    const bgH = txtH + padY * 2

    const bx = ox + w / 2 - bgW / 2
    const by = oy + h - margin - bgH

    const bgAlpha = Math.floor((opacity / 100) * 255)
      .toString(16)
      .padStart(2, "0")

    ctx.fillStyle = bgColor + bgAlpha
    roundRect(ctx, bx, by, bgW, bgH, radius)
    ctx.fill()

    lines.forEach((line, i) => {
      const tx = ox + w / 2
      const ty = by + padY + (i + 0.8) * lineH

      if (textStroke > 0) {
        ctx.strokeStyle = textStrokeColor
        ctx.lineWidth = textStroke
        ctx.lineJoin = "round"
        ctx.strokeText(line, tx, ty)
      }

      ctx.fillStyle = textColor
      ctx.fillText(line, tx, ty)

      if (underline) {
        const m = ctx.measureText(line)
        const uy = ty + 2
        ctx.strokeStyle = textColor
        ctx.lineWidth = Math.max(1, fontSize / 20)
        ctx.beginPath()
        ctx.moveTo(tx - m.width / 2, uy)
        ctx.lineTo(tx + m.width / 2, uy)
        ctx.stroke()
      }
    })
  }

  const breakLines = (ctx: CanvasRenderingContext2D, text: string, max: number) => {
    const out: string[] = []
    const parts = text.split("\n")
    parts.forEach(p => {
      if (!p.trim()) out.push("")
      else out.push(...wrap(ctx, p, max))
    })
    return out
  }

  const wrap = (ctx: CanvasRenderingContext2D, txt: string, max: number) => {
    const words = txt.split(" ")
    const lines: string[] = []
    let cur = ""

    words.forEach(w => {
      const t = cur ? cur + " " + w : w
      if (ctx.measureText(t).width > max && cur) {
        lines.push(cur)
        cur = w
      } else cur = t
    })

    if (cur) lines.push(cur)
    return lines
  }

  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    ctx.lineTo(x + w, y + h - r)
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    ctx.lineTo(x + r, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
  }

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-black">
      <canvas ref={canvasRef} id="export-canvas" className="max-w-full max-h-full" />
    </div>
  )
}
