"use client";

import { useState } from "react";
import { useAiTool } from "./useAiTool";

interface GrammarResult {
  corrected: string;
  errors: { original: string; correction: string; type: string }[];
}

export default function GrammarCheckerTool() {
  const [text, setText] = useState("");
  const { result, loading, error, run } = useAiTool("grammar-check");

  let parsed: GrammarResult | null = null;
  if (result) {
    try {
      parsed = JSON.parse(result);
    } catch {
      parsed = null;
    }
  }

  const typeColors: Record<string, string> = {
    grammar: "bg-blue-500/10 text-blue-600",
    spelling: "bg-red-500/10 text-red-600",
    punctuation: "bg-yellow-500/10 text-yellow-700",
    style: "bg-purple-500/10 text-purple-600",
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text to check for grammar errors..."
        className="w-full h-48 p-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
      />
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => run(text)}
          disabled={loading || !text.trim()}
          className="px-6 py-2.5 gradient-bg text-black font-semibold rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check Grammar"}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-danger/10 border border-danger/20 rounded-xl text-sm text-danger">
          {error}
        </div>
      )}

      {parsed && (
        <div className="mt-6 space-y-4">
          <div className="bg-background border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold">Corrected Text</h4>
              <button
                onClick={() => navigator.clipboard.writeText(parsed!.corrected)}
                className="text-xs text-primary hover:underline"
              >
                Copy
              </button>
            </div>
            <p className="text-sm whitespace-pre-wrap">{parsed.corrected}</p>
          </div>

          {parsed.errors.length > 0 ? (
            <div>
              <h4 className="text-sm font-semibold mb-2">
                {parsed.errors.length} Issue{parsed.errors.length !== 1 ? "s" : ""} Found
              </h4>
              <div className="space-y-2">
                {parsed.errors.map((err, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-background border border-border rounded-xl text-sm">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${typeColors[err.type] || "bg-surface-hover text-muted"}`}>
                      {err.type}
                    </span>
                    <div>
                      <span className="line-through text-danger">{err.original}</span>
                      {" → "}
                      <span className="text-success font-medium">{err.correction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-success/10 border border-success/20 rounded-xl text-sm text-success font-medium text-center">
              No grammar errors found!
            </div>
          )}
        </div>
      )}

      {result && !parsed && (
        <div className="mt-6 p-4 bg-background border border-border rounded-xl text-sm whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
}
