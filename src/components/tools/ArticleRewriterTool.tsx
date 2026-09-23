"use client";

import { useState } from "react";
import { useAiTool } from "./useAiTool";

export default function ArticleRewriterTool() {
  const [text, setText] = useState("");
  const { result, loading, error, run } = useAiTool("rewrite");

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste the article you want to rewrite..."
        className="w-full h-48 p-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
      />
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => run(text)}
          disabled={loading || !text.trim()}
          className="px-6 py-2.5 gradient-bg text-black font-semibold rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Rewriting..." : "Rewrite Article"}
        </button>
        <span className="text-xs text-muted">
          {text.trim().split(/\s+/).filter(Boolean).length} words
        </span>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-danger/10 border border-danger/20 rounded-xl text-sm text-danger">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Rewritten Article</h3>
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
