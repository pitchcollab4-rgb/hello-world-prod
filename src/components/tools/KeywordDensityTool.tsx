"use client";

import { useState } from "react";

export default function KeywordDensityTool() {
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/) : [];
  const totalWords = words.length;

  const keywordCount = keyword.trim()
    ? text.toLowerCase().split(keyword.toLowerCase()).length - 1
    : 0;

  const density = totalWords > 0 && keyword.trim()
    ? ((keywordCount / totalWords) * 100).toFixed(2)
    : "0.00";

  const allWords = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const freq: Record<string, number> = {};
  allWords.forEach((w) => { freq[w] = (freq[w] || 0) + 1; });
  const topKeywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word, count]) => ({
      word,
      count,
      density: ((count / (totalWords || 1)) * 100).toFixed(2),
    }));

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your content here to analyze keyword density..."
        className="w-full h-40 p-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
      />
      <div className="flex items-end gap-3 mt-4">
        <div className="flex-1">
          <label className="block text-xs font-medium text-muted mb-1">Target Keyword</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter a keyword to check..."
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {keyword.trim() && text.trim() && (
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-background border border-border rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-primary">{keywordCount}</div>
            <div className="text-xs text-muted mt-1">Occurrences</div>
          </div>
          <div className="bg-background border border-border rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-primary">{density}%</div>
            <div className="text-xs text-muted mt-1">Density</div>
          </div>
          <div className="bg-background border border-border rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-primary">{totalWords}</div>
            <div className="text-xs text-muted mt-1">Total Words</div>
          </div>
        </div>
      )}

      {topKeywords.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-sm mb-3">Top Keywords</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted">#</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted">Keyword</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted">Count</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted">Density</th>
                </tr>
              </thead>
              <tbody>
                {topKeywords.map((kw, i) => (
                  <tr key={kw.word} className="border-b border-border/50">
                    <td className="py-2 px-3 text-muted">{i + 1}</td>
                    <td className="py-2 px-3 font-medium">{kw.word}</td>
                    <td className="py-2 px-3 text-right">{kw.count}</td>
                    <td className="py-2 px-3 text-right text-primary">{kw.density}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
