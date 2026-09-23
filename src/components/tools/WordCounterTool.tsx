"use client";

import { useState } from "react";

export default function WordCounterTool() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim()).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
  const readingTime = Math.ceil(words / 200);
  const speakingTime = Math.ceil(words / 130);

  const syllableCount = (word: string): number => {
    word = word.toLowerCase().replace(/[^a-z]/g, "");
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
    word = word.replace(/^y/, "");
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  };

  const totalSyllables = text.trim()
    ? text.trim().split(/\s+/).reduce((sum, w) => sum + syllableCount(w), 0)
    : 0;

  const wordFreq = text.trim()
    ? text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .split(/\s+/)
        .filter(Boolean)
        .reduce<Record<string, number>>((acc, w) => {
          acc[w] = (acc[w] || 0) + 1;
          return acc;
        }, {})
    : {};

  const topWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const stats = [
    { label: "Words", value: words },
    { label: "Characters", value: characters },
    { label: "No Spaces", value: charactersNoSpaces },
    { label: "Sentences", value: sentences },
    { label: "Paragraphs", value: paragraphs },
    { label: "Syllables", value: totalSyllables },
    { label: "Reading Time", value: `${readingTime} min` },
    { label: "Speaking Time", value: `${speakingTime} min` },
  ];

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        className="w-full h-48 p-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-background border border-border rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {topWords.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-sm mb-3">Top Words</h3>
          <div className="flex flex-wrap gap-2">
            {topWords.map(([word, count]) => (
              <span key={word} className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {word} ({count})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
