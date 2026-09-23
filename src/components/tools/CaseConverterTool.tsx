"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CaseConverterTool() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState("");

  const convert = (type: string) => {
    let output = text;
    switch (type) {
      case "upper": output = text.toUpperCase(); break;
      case "lower": output = text.toLowerCase(); break;
      case "title": output = text.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()); break;
      case "sentence": output = text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase()); break;
      case "toggle": output = text.split("").map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(""); break;
      case "camel": output = text.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, c) => c.toUpperCase()); break;
      case "snake": output = text.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, ""); break;
      case "kebab": output = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""); break;
    }
    setResult(output);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buttons = [
    { label: "UPPERCASE", type: "upper" },
    { label: "lowercase", type: "lower" },
    { label: "Title Case", type: "title" },
    { label: "Sentence case", type: "sentence" },
    { label: "tOGGLE", type: "toggle" },
    { label: "camelCase", type: "camel" },
    { label: "snake_case", type: "snake" },
    { label: "kebab-case", type: "kebab" },
  ];

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        className="w-full h-32 p-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
      />
      <div className="flex flex-wrap gap-2 mt-4">
        {buttons.map((btn) => (
          <button
            key={btn.type}
            onClick={() => convert(btn.type)}
            className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
          >
            {btn.label}
          </button>
        ))}
      </div>
      {result && (
        <div className="mt-4 relative">
          <div className="p-4 bg-background border border-border rounded-xl text-sm whitespace-pre-wrap">{result}</div>
          <button onClick={copyResult} className="absolute top-3 right-3 p-1.5 rounded-lg bg-surface-hover hover:bg-border transition-colors">
            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-muted" />}
          </button>
        </div>
      )}
    </div>
  );
}
