"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit voluptate velit esse cillam dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

function generateSentence(minWords = 6, maxWords = 15): string {
  const len = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const words = Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(sentences = 5): string {
  return Array.from({ length: sentences }, () => generateSentence()).join(" ");
}

export default function LoremIpsumTool() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let output = "";
    switch (type) {
      case "paragraphs":
        output = Array.from({ length: count }, () => generateParagraph()).join("\n\n");
        break;
      case "sentences":
        output = Array.from({ length: count }, () => generateSentence()).join(" ");
        break;
      case "words":
        output = Array.from({ length: count }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(" ");
        output = output.charAt(0).toUpperCase() + output.slice(1) + ".";
        break;
    }
    setResult(output);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Count</label>
          <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))}
            className="w-24 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value as typeof type)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <button onClick={generate} className="px-6 py-2 gradient-bg text-black font-semibold text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
          Generate
        </button>
      </div>
      {result && (
        <div className="relative">
          <div className="p-4 bg-background border border-border rounded-xl text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">{result}</div>
          <button onClick={copy} className="absolute top-3 right-3 p-1.5 rounded-lg bg-surface-hover hover:bg-border transition-colors">
            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-muted" />}
          </button>
        </div>
      )}
    </div>
  );
}
