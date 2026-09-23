"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorPickerTool() {
  const [color, setColor] = useState("#6366f1");
  const [copied, setCopied] = useState("");

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const formats = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "RGBA", value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
  ];

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="shrink-0">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
            className="w-32 h-32 rounded-2xl cursor-pointer border-2 border-border" />
        </div>
        <div className="flex-1 w-full space-y-3">
          {formats.map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="w-12 text-xs font-medium text-muted">{f.label}</span>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg">
                <code className="flex-1 text-sm font-mono">{f.value}</code>
                <button onClick={() => copy(f.value)} className="p-1 rounded hover:bg-surface-hover">
                  {copied === f.value ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5 text-muted" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-xs font-medium text-muted mb-2">Or enter HEX value</label>
        <input type="text" value={color} onChange={(e) => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setColor(e.target.value); }}
          className="w-48 px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>
      <div className="mt-6">
        <p className="text-xs font-medium text-muted mb-2">Preview</p>
        <div className="flex gap-2">
          <div className="h-12 flex-1 rounded-lg" style={{ backgroundColor: color }} />
          <div className="h-12 flex-1 rounded-lg" style={{ backgroundColor: color, opacity: 0.7 }} />
          <div className="h-12 flex-1 rounded-lg" style={{ backgroundColor: color, opacity: 0.4 }} />
          <div className="h-12 flex-1 rounded-lg" style={{ backgroundColor: color, opacity: 0.15 }} />
        </div>
      </div>
    </div>
  );
}
