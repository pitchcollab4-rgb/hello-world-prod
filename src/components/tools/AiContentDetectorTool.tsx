"use client";

import { useState } from "react";
import { useAiTool } from "./useAiTool";

export default function AiContentDetectorTool() {
  const [text, setText] = useState("");
  const { result, loading, error, run } = useAiTool("ai-content-detector");

  let parsed: { score: number; verdict: string; analysis: string } | null =
    null;
  if (result) {
    try {
      parsed = JSON.parse(result);
    } catch {
      parsed = null;
    }
  }

  const getScoreColor = (score: number) => {
    if (score <= 20) return "text-success";
    if (score <= 40) return "text-primary";
    if (score <= 60) return "text-accent";
    if (score <= 80) return "text-warning";
    return "text-danger";
  };

  const getBarColor = (score: number) => {
    if (score <= 20) return "bg-green-500";
    if (score <= 40) return "bg-blue-500";
    if (score <= 60) return "bg-yellow-500";
    if (score <= 80) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text to check if it was written by AI..."
        className="w-full h-48 p-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
      />
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => run(text)}
          disabled={loading || !text.trim()}
          className="px-6 py-2.5 gradient-bg text-black font-semibold rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Detect AI Content"}
        </button>
        <span className="text-xs text-muted">
          Min 50 characters recommended
        </span>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-danger/10 border border-danger/20 rounded-xl text-sm text-danger">
          {error}
        </div>
      )}

      {parsed && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-background border border-border rounded-xl p-6 text-center">
              <div className={`text-4xl font-bold ${getScoreColor(parsed.score)}`}>
                {parsed.score}%
              </div>
              <div className="text-sm font-medium mt-2">AI Probability</div>
              <div className="w-full bg-border/50 rounded-full h-2 mt-3">
                <div
                  className={`h-2 rounded-full transition-all ${getBarColor(parsed.score)}`}
                  style={{ width: `${parsed.score}%` }}
                />
              </div>
            </div>
            <div className="bg-background border border-border rounded-xl p-6 text-center">
              <div className={`text-2xl font-bold ${getScoreColor(parsed.score)}`}>
                {parsed.verdict}
              </div>
              <div className="text-sm font-medium mt-2">Verdict</div>
            </div>
          </div>
          <div className="bg-background border border-border rounded-xl p-4">
            <h4 className="text-sm font-semibold mb-2">Analysis</h4>
            <p className="text-sm text-muted">{parsed.analysis}</p>
          </div>
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
