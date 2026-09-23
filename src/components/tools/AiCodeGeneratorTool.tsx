"use client";

import { useState } from "react";
import { useAiTool } from "./useAiTool";

export default function AiCodeGeneratorTool() {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("javascript");
  const { result, loading, error, run } = useAiTool("code");

  const languages = [
    "javascript", "typescript", "python", "java", "c++", "go", "rust", "php", "ruby", "swift",
  ];

  return (
    <div>
      <div className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what code you need (e.g., 'A function that sorts an array using merge sort')"
          className="w-full h-32 p-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
        />
        <div>
          <label className="text-xs font-medium text-muted mb-1.5 block">Language</label>
          <div className="flex flex-wrap gap-2">
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  language === l
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
        onClick={() => run(`Generate ${language} code: ${prompt}`)}
        disabled={loading || !prompt.trim()}
        className="mt-4 px-6 py-2.5 gradient-bg text-black font-semibold rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Generating Code..." : "Generate Code"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-danger/10 border border-danger/20 rounded-xl text-sm text-danger">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Generated Code</h3>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="text-xs text-primary hover:underline"
            >
              Copy
            </button>
          </div>
          <pre className="p-4 bg-[#1e1e2e] text-[#cdd6f4] border border-border rounded-xl text-sm overflow-x-auto">
            <code>{result}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
