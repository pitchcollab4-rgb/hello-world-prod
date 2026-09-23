"use client";

import { useState, useRef, useEffect } from "react";

function generateQrMatrix(text: string): boolean[][] {
  const size = 21;
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  const addFinderPattern = (row: number, col: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          if (row + r < size && col + c < size) matrix[row + r][col + c] = true;
        }
      }
    }
  };

  addFinderPattern(0, 0);
  addFinderPattern(0, size - 7);
  addFinderPattern(size - 7, 0);

  const bytes = new TextEncoder().encode(text);
  let bitIndex = 0;
  for (let r = 8; r < size; r++) {
    for (let c = 8; c < size - 7; c++) {
      const byteIdx = Math.floor(bitIndex / 8);
      const bitIdx = 7 - (bitIndex % 8);
      if (byteIdx < bytes.length) {
        matrix[r][c] = ((bytes[byteIdx] >> bitIdx) & 1) === 1;
      } else {
        matrix[r][c] = (r + c) % 2 === 0;
      }
      bitIndex++;
    }
  }

  return matrix;
}

export default function QrCodeGeneratorTool() {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!text.trim() || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const matrix = generateQrMatrix(text);
    const cellSize = 10;
    const size = matrix.length * cellSize;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = color;
    matrix.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      });
    });
  }, [text, color, bgColor]);

  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div>
      <p className="text-xs text-muted mb-4">
        Note: This is a visual demo. For production QR codes, integrate a library like &quot;qrcode&quot; or use a QR API.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter URL or text to generate QR code..."
        className="w-full h-24 p-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
      />
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <div>
          <label className="block text-xs text-muted mb-1">Color</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-border" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Background</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-border" />
        </div>
      </div>
      {text.trim() && (
        <div className="mt-6 flex flex-col items-center">
          <canvas ref={canvasRef} className="border border-border rounded-xl" style={{ imageRendering: "pixelated", width: 210, height: 210 }} />
          <button onClick={download} className="mt-4 px-5 py-2 gradient-bg text-black font-semibold text-sm font-medium rounded-lg hover:opacity-90">
            Download PNG
          </button>
        </div>
      )}
    </div>
  );
}
