"use client";

import { useState } from "react";
import { useAiTool } from "./useAiTool";

export default function AiEmailWriterTool() {
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("professional");
  const { result, loading, error, run } = useAiTool("email");

  const tones = ["professional", "friendly", "formal", "casual", "persuasive"];

  return (
    <div>
      <div className="space-y-3">
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Describe what the email is about (e.g., 'Follow up on a job interview at Google, thank the interviewer')"
          className="w-full h-32 p-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
        />
        <div>
          <label className="text-xs font-medium text-muted mb-1.5 block">Tone</label>
          <div className="flex flex-wrap gap-2">
            {tones.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors capitalize ${
                  tone === t
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-border text-muted hover:border-primary/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() => run(`Write a ${tone} email about: ${context}`)}
        disabled={loading || !context.trim()}
        className="mt-4 px-6 py-2.5 gradient-bg text-black font-semibold rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Drafting Email..." : "Generate Email"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-danger/10 border border-danger/20 rounded-xl text-sm text-danger">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Draft Email</h3>
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
