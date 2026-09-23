"use client";

import { useState, useCallback } from "react";

export function useAiTool(toolType: string) {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = useCallback(
    async (input: string, extra?: Record<string, string>) => {
      if (!input.trim()) return;
      setLoading(true);
      setError("");
      setResult("");
      try {
        const res = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tool: toolType, input, ...extra }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Request failed");
        setResult(data.result);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [toolType]
  );

  const clear = useCallback(() => {
    setResult("");
    setError("");
  }, []);

  return { result, loading, error, run, clear };
}
