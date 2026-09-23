"use client";

import { useState } from "react";
import { useAiTool } from "./useAiTool";

export default function AiEssayWriterTool() {
  const [topic, setTopic] = useState("");
  const { result, loading, error, run } = useAiTool("essay");

  return (
    <div>
      <div className="space-y-3">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter essay topic (e.g., 'The impact of AI on education')"
          className="w-full p-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
      <button
        onClick={() => run(`Write an essay about: ${topic}`)}
        disabled={loading || !topic.trim()}
        className="mt-4 px-6 py-2.5 gradient-bg text-black font-semibold rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Writing Essay..." : "Generate Essay"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-danger/10 border border-danger/20 rounded-xl text-sm text-danger">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Generated Essay</h3>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="text-xs text-primary hover:underline"
            >
              Copy
            </button>
          </div>
          <div className="p-4 bg-background border border-border rounded-xl text-sm whitespace-pre-wrap leading-relaxed">
            {result}
          </div>
          <div className="mt-2 text-xs text-muted">
            {result.trim().split(/\s+/).length} words
          </div>
        </div>
      )}
    </div>
  );
}
