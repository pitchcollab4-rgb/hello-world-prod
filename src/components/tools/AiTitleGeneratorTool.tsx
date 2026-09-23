"use client";

import { useState } from "react";
import { useAiTool } from "./useAiTool";

export default function AiTitleGeneratorTool() {
  const [topic, setTopic] = useState("");
  const { result, loading, error, run } = useAiTool("title-generator");

  return (
    <div>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter your topic or content (e.g., 'Benefits of remote work')"
        className="w-full p-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      <button
        onClick={() => run(`Generate catchy titles for: ${topic}`)}
        disabled={loading || !topic.trim()}
        className="mt-4 px-6 py-2.5 gradient-bg text-black font-semibold rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Titles"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-danger/10 border border-danger/20 rounded-xl text-sm text-danger">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Generated Titles</h3>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="text-xs text-primary hover:underline"
            >
              Copy All
            </button>
          </div>
          <div className="space-y-2">
            {result.split("\n").filter((l) => l.trim()).map((line, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-background border border-border rounded-xl text-sm hover:border-primary/50 transition-colors group"
              >
                <span>{line}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(line.replace(/^\d+\.\s*/, ""))}
                  className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
