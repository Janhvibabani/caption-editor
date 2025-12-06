"use client";

import React, { useRef, useEffect, useState } from "react";
import { Theme } from "../hooks/useTheme";

interface Props {
  image: string | null;
  caption: string;
  textColor: string;
  bgColor: string;
  opacity: number;
  filter: string;
  font: string;
  fontSize: number;
  textStroke: number;
  textStrokeColor: string;
  theme: Theme;
}

interface ImageBounds {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  naturalWidth: number;
  naturalHeight: number;
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
  theme,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null); // NEW: Separate preview canvas
  const [imageBounds, setImageBounds] = useState<ImageBounds | null>(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 900, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const containerAspect = containerDimensions.width / containerDimensions.height;

      let renderedWidth: number;
      let renderedHeight: number;

      if (imgAspect > containerAspect) {
        renderedWidth = containerDimensions.width;
        renderedHeight = containerDimensions.width / imgAspect;
      } else {
        renderedHeight = containerDimensions.height;
        renderedWidth = containerDimensions.height * imgAspect;
      }

      const offsetX = (containerDimensions.width - renderedWidth) / 2;
      const offsetY = (containerDimensions.height - renderedHeight) / 2;

      setImageBounds({
        width: renderedWidth,
        height: renderedHeight,
        offsetX,
        offsetY,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      });

      // Draw both canvases
      drawToCanvas(img, renderedWidth, renderedHeight, offsetX, offsetY, true); // Preview with bg
      drawToCanvas(img, img.naturalWidth, img.naturalHeight, 0, 0, false); // Export without bg
    };
    img.src = image;
  }, [image, caption, textColor, bgColor, opacity, filter, font, fontSize, textStroke, textStrokeColor, containerDimensions, theme]);

  const drawToCanvas = (
    img: HTMLImageElement,
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    isPreview: boolean
  ) => {
    const canvas = isPreview ? previewCanvasRef.current : canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (isPreview) {
      // Preview canvas - with background padding
      canvas.width = containerDimensions.width;
      canvas.height = containerDimensions.height;

      // Background color based on theme
      ctx.fillStyle = theme === 'dark' ? 'black' : 'white';
      ctx.fillRect(0, 0, containerDimensions.width, containerDimensions.height);
    } else {
      // Export canvas - exact image size, no background
      canvas.width = width;
      canvas.height = height;
    }

    // Apply filter
    if (filter && filter !== "none") {
      ctx.filter = getCanvasFilter(filter);
    } else {
      ctx.filter = "none";
    }

    ctx.drawImage(img, offsetX, offsetY, width, height);
    ctx.filter = "none";

    if (caption) {
      drawCaption(ctx, width, height, offsetX, offsetY, isPreview);
    }
  };

  const getCanvasFilter = (filterClass: string): string => {
    const filterMap: Record<string, string> = {
      none: "none",
      grayscale: "grayscale(100%)",
      sepia: "sepia(100%)",
      blur: "blur(4px)",
      brightness: "brightness(1.2)",
      contrast: "contrast(1.2)",
      saturate: "saturate(1.5)",
      invert: "invert(100%)",
    };
    return filterMap[filterClass] || "none";
  };

  const drawCaption = (
    ctx: CanvasRenderingContext2D,
    renderedWidth: number,
    renderedHeight: number,
    offsetX: number,
    offsetY: number,
    isPreview: boolean
  ) => {
    const scale = isPreview ? 1 : (renderedWidth / containerDimensions.width);
    const paddingX = 16 * scale;
    const paddingY = 8 * scale;
    const borderRadius = 6 * scale;
    const bottomMargin = 5 * scale;
    const scaledFontSize = fontSize * scale;

    ctx.font = `${scaledFontSize}px ${font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";

    const maxWidth = renderedWidth * 0.9;
    const lines = processTextWithLineBreaks(ctx, caption, maxWidth);
    const lineHeight = scaledFontSize * 1.2;
    const textHeight = lines.length * lineHeight;

    const textWidths = lines.map((line) => ctx.measureText(line).width);
    const maxTextWidth = Math.max(...textWidths);
    
    const bgWidth = maxTextWidth + paddingX * 2;
    const bgHeight = textHeight + paddingY * 2;

    const bgX = offsetX + renderedWidth / 2 - bgWidth / 2;
    const bgY = offsetY + renderedHeight - bottomMargin - bgHeight;

    const bgHex = Math.floor((opacity / 100) * 255)
      .toString(16)
      .padStart(2, "0");
    ctx.fillStyle = bgColor + bgHex;

    drawRoundedRect(ctx, bgX, bgY, bgWidth, bgHeight, borderRadius);
    ctx.fill();

    lines.forEach((line, i) => {
      const textX = offsetX + renderedWidth / 2;
      const textY = bgY + paddingY + (i + 0.8) * lineHeight;

      if (textStroke > 0) {
        ctx.strokeStyle = textStrokeColor;
        ctx.lineWidth = textStroke * scale;
        ctx.lineJoin = "round";
        ctx.miterLimit = 2;
        ctx.strokeText(line, textX, textY);
      }

      ctx.fillStyle = textColor;
      ctx.fillText(line, textX, textY);
    });
  };

  const processTextWithLineBreaks = (
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] => {
    const allLines: string[] = [];
    const paragraphs = text.split("\n");

    paragraphs.forEach((paragraph) => {
      if (paragraph.trim() === "") {
        allLines.push("");
      } else {
        const wrappedLines = wrapText(ctx, paragraph, maxWidth);
        allLines.push(...wrappedLines);
      }
    });

    return allLines;
  };

  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] => {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  };

  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  return (
    <div
      id="export-container"
      ref={containerRef}
      className={`w-full h-full flex items-center justify-center p-6 ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
    >
      {/* Preview Canvas - Visible */}
      <canvas
        ref={previewCanvasRef}
        className="max-w-full max-h-full"
      />
      
      {/* Export Canvas - Hidden */}
      <canvas
        ref={canvasRef}
        id="export-canvas"
        style={{ display: 'none' }}
      />
    </div>
  );
}