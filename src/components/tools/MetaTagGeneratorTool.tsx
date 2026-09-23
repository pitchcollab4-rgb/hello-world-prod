"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function MetaTagGeneratorTool() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [robots, setRobots] = useState("index, follow");
  const [ogType, setOgType] = useState("website");
  const [copied, setCopied] = useState(false);

  const generated = `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${title ? `<title>${title}</title>\n<meta property="og:title" content="${title}">` : ""}
${description ? `<meta name="description" content="${description}">\n<meta property="og:description" content="${description}">` : ""}
${keywords ? `<meta name="keywords" content="${keywords}">` : ""}
${author ? `<meta name="author" content="${author}">` : ""}
<meta name="robots" content="${robots}">
<meta property="og:type" content="${ogType}">`.replace(/\n{2,}/g, "\n");

  const copy = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-muted mb-1">Page Title ({title.length}/60)</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={60}
          placeholder="My Awesome Website"
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>
      <div>
        <label className="block text-xs font-medium text-muted mb-1">Meta Description ({description.length}/160)</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={160}
          placeholder="A brief description of your page..."
          className="w-full h-20 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Keywords (comma-separated)</label>
          <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)}
            placeholder="seo, tools, optimization"
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your Name"
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Robots</label>
          <select value={robots} onChange={(e) => setRobots(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option value="index, follow">Index, Follow</option>
            <option value="noindex, follow">No Index, Follow</option>
            <option value="index, nofollow">Index, No Follow</option>
            <option value="noindex, nofollow">No Index, No Follow</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">OG Type</label>
          <select value={ogType} onChange={(e) => setOgType(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option value="website">Website</option>
            <option value="article">Article</option>
            <option value="product">Product</option>
            <option value="profile">Profile</option>
          </select>
        </div>
      </div>
      <div className="relative mt-4">
        <pre className="p-4 bg-background border border-border rounded-xl text-sm font-mono overflow-x-auto text-primary/80">{generated}</pre>
        <button onClick={copy} className="absolute top-3 right-3 p-1.5 rounded-lg bg-surface-hover hover:bg-border">
          {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-muted" />}
        </button>
      </div>
    </div>
  );
}
