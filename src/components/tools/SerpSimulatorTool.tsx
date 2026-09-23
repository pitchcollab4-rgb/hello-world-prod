"use client";

import { useState } from "react";

export default function SerpSimulatorTool() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const titleLen = title.length;
  const descLen = description.length;

  return (
    <div>
      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-xs font-medium text-muted mb-1">
            Page Title ({titleLen}/60) {titleLen > 60 && <span className="text-danger">- Too long!</span>}
          </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="Your Page Title Here"
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">URL</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.example.com/page"
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">
            Meta Description ({descLen}/160) {descLen > 160 && <span className="text-danger">- Too long!</span>}
          </label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a compelling meta description for your page..."
            className="w-full h-20 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
        </div>
      </div>

      <h3 className="text-sm font-semibold mb-3">Google Preview</h3>
      <div className="p-6 bg-white rounded-xl border border-border">
        <div className="max-w-[600px]">
          <div className="text-sm text-[#202124] mb-1" style={{ fontFamily: "Arial, sans-serif" }}>
            {url || "https://www.example.com"} <span className="text-[#70757a]">{">"}</span>
          </div>
          <h3 className="text-xl leading-snug mb-1 cursor-pointer" style={{ color: "#1a0dab", fontFamily: "Arial, sans-serif" }}>
            {title ? (title.length > 60 ? title.slice(0, 60) + "..." : title) : "Page Title"}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#4d5156", fontFamily: "Arial, sans-serif" }}>
            {description
              ? description.length > 160 ? description.slice(0, 160) + "..." : description
              : "This is where your meta description will appear in search results. Write something compelling to improve CTR."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className={`p-3 rounded-xl border text-center ${titleLen <= 60 ? "bg-success/5 border-success/20" : "bg-danger/5 border-danger/20"}`}>
          <div className={`text-sm font-medium ${titleLen <= 60 ? "text-success" : "text-danger"}`}>
            Title: {titleLen <= 60 ? "Good" : "Too Long"}
          </div>
        </div>
        <div className={`p-3 rounded-xl border text-center ${descLen <= 160 ? "bg-success/5 border-success/20" : "bg-danger/5 border-danger/20"}`}>
          <div className={`text-sm font-medium ${descLen <= 160 ? "text-success" : "text-danger"}`}>
            Description: {descLen <= 160 ? "Good" : "Too Long"}
          </div>
        </div>
      </div>
    </div>
  );
}
