"use client";

import { useState } from "react";
import { useAiTool } from "./useAiTool";

export default function AiTranslatorTool() {
  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState("Spanish");
  const { result, loading, error, run } = useAiTool("translate");

  const languages = [
    "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese",
    "Korean", "Arabic", "Hindi", "Russian", "Dutch", "Swedish", "Turkish",
  ];

  return (
    <div>
      <div className="space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate..."
          className="w-full h-36 p-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
        />
        <div>
          <label className="text-xs font-medium text-muted mb-1.5 block">
            Translate to
          </label>
          <div className="flex flex-wrap gap-2">
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setTargetLang(l)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  targetLang === l
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-border text-muted hover:border-primary/50"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() => run(text, { targetLanguage: targetLang })}
        disabled={loading || !text.trim()}
        className="mt-4 px-6 py-2.5 gradient-bg text-black font-semibold rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Translating..." : `Translate to ${targetLang}`}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-danger/10 border border-danger/20 rounded-xl text-sm text-danger">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Translation ({targetLang})</h3>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="text-xs text-primary hover:underline"
            >
              Copy
            </button>
          </div>
          <div className="p-4 bg-background border border-border rounded-xl text-sm whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
