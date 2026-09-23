"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const encode = () => {
    try { setResult(btoa(input)); } catch { setResult("Error: Invalid input for encoding"); }
  };
  const decode = () => {
    try { setResult(atob(input)); } catch { setResult("Error: Invalid Base64 string"); }
  };
  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to encode or Base64 string to decode..."
        className="w-full h-32 p-4 bg-background border border-border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y" />
      <div className="flex gap-3 mt-4">
        <button onClick={encode} className="px-5 py-2 gradient-bg text-black font-semibold text-sm font-medium rounded-lg hover:opacity-90">Encode</button>
        <button onClick={decode} className="px-5 py-2 bg-surface-hover text-foreground text-sm font-medium rounded-lg hover:bg-border">Decode</button>
      </div>
      {result && (
        <div className="relative mt-4">
          <div className="p-4 bg-background border border-border rounded-xl text-sm font-mono whitespace-pre-wrap break-all">{result}</div>
          <button onClick={copy} className="absolute top-3 right-3 p-1.5 rounded-lg bg-surface-hover hover:bg-border">
            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-muted" />}
          </button>
        </div>
      )}
    </div>
  );
}
