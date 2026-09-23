"use client";

import { useState } from "react";

function syllableCount(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

export default function ReadabilityCheckerTool() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/) : [];
  const totalWords = words.length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim()).length : 0;
  const totalSyllables = words.reduce((sum, w) => sum + syllableCount(w), 0);
  const complexWords = words.filter((w) => syllableCount(w) >= 3).length;

  const avgWordsPerSentence = sentences > 0 ? totalWords / sentences : 0;
  const avgSyllablesPerWord = totalWords > 0 ? totalSyllables / totalWords : 0;

  const fleschReading = totalWords > 0 && sentences > 0
    ? 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord
    : 0;

  const fleschKincaid = totalWords > 0 && sentences > 0
    ? 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59
    : 0;

  const gunningFog = totalWords > 0 && sentences > 0
    ? 0.4 * (avgWordsPerSentence + 100 * (complexWords / totalWords))
    : 0;

  const getFleschLabel = (score: number) => {
    if (score >= 90) return { label: "Very Easy", color: "text-success" };
    if (score >= 80) return { label: "Easy", color: "text-success" };
    if (score >= 70) return { label: "Fairly Easy", color: "text-primary" };
    if (score >= 60) return { label: "Standard", color: "text-primary" };
    if (score >= 50) return { label: "Fairly Difficult", color: "text-accent" };
    if (score >= 30) return { label: "Difficult", color: "text-accent" };
    return { label: "Very Difficult", color: "text-danger" };
  };

  const flesch = getFleschLabel(fleschReading);

  const scores = [
    { label: "Flesch Reading Ease", value: Math.max(0, fleschReading).toFixed(1), sub: flesch.label, color: flesch.color },
    { label: "Flesch-Kincaid Grade", value: Math.max(0, fleschKincaid).toFixed(1), sub: "Grade Level", color: "text-primary" },
    { label: "Gunning Fog Index", value: Math.max(0, gunningFog).toFixed(1), sub: "Years of Education", color: "text-primary" },
  ];

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here to analyze readability..."
        className="w-full h-48 p-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
      />

      {totalWords > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {scores.map((s) => (
              <div key={s.label} className="bg-background border border-border rounded-xl p-4 text-center">
                <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-sm font-medium mt-1">{s.label}</div>
                <div className="text-xs text-muted mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {[
              { label: "Words", value: totalWords },
              { label: "Sentences", value: sentences },
              { label: "Avg Words/Sentence", value: avgWordsPerSentence.toFixed(1) },
              { label: "Complex Words", value: complexWords },
            ].map((s) => (
              <div key={s.label} className="bg-background border border-border rounded-xl p-3 text-center">
                <div className="text-lg font-bold text-primary">{s.value}</div>
                <div className="text-xs text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
