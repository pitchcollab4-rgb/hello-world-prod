"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setResult(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setResult("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setResult(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setResult("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='{"key": "value"}'
        className="w-full h-40 p-4 bg-background border border-border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
      />
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted">Indent:</label>
          <select value={indent} onChange={(e) => setIndent(Number(e.target.value))}
            className="px-2 py-1.5 bg-background border border-border rounded-lg text-sm">
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>1 tab</option>
          </select>
        </div>
        <button onClick={format} className="px-5 py-2 gradient-bg text-black font-semibold text-sm font-medium rounded-lg hover:opacity-90">Format</button>
        <button onClick={minify} className="px-5 py-2 bg-surface-hover text-foreground text-sm font-medium rounded-lg hover:bg-border">Minify</button>
      </div>
      {error && <p className="mt-3 text-sm text-danger">{error}</p>}
      {result && (
        <div className="relative mt-4">
          <pre className="p-4 bg-background border border-border rounded-xl text-sm font-mono overflow-x-auto max-h-96">{result}</pre>
          <button onClick={copy} className="absolute top-3 right-3 p-1.5 rounded-lg bg-surface-hover hover:bg-border">
            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-muted" />}
          </button>
        </div>
      )}
    </div>
  );
}
