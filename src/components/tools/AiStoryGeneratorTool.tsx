"use client";

import { useState } from "react";
import { useAiTool } from "./useAiTool";

export default function AiStoryGeneratorTool() {
  const [prompt, setPrompt] = useState("");
  const [genre, setGenre] = useState("any");
  const { result, loading, error, run } = useAiTool("story");

  const genres = ["any", "fantasy", "sci-fi", "romance", "mystery", "horror", "adventure", "comedy"];

  return (
    <div>
      <div className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your story idea (e.g., 'A detective who can read minds investigates a crime in a future city')"
          className="w-full h-32 p-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
        />
        <div>
          <label className="text-xs font-medium text-muted mb-1.5 block">Genre</label>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors capitalize ${
                  genre === g
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-border text-muted hover:border-primary/50"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() =>
          run(
            `Write a ${genre !== "any" ? genre + " " : ""}story based on this idea: ${prompt}`
          )
        }
        disabled={loading || !prompt.trim()}
        className="mt-4 px-6 py-2.5 gradient-bg text-black font-semibold rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Writing Story..." : "Generate Story"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-danger/10 border border-danger/20 rounded-xl text-sm text-danger">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Your Story</h3>
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
        </div>
      )}
    </div>
  );
}
