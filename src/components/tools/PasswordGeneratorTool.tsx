"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

export default function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr, (n) => chars[n % chars.length]).join(""));
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = () => {
    let pool = 0;
    if (uppercase) pool += 26;
    if (lowercase) pool += 26;
    if (numbers) pool += 10;
    if (symbols) pool += 26;
    const entropy = Math.log2(Math.pow(pool || 26, length));
    if (entropy < 40) return { label: "Weak", color: "bg-danger", pct: 25 };
    if (entropy < 60) return { label: "Fair", color: "bg-accent", pct: 50 };
    if (entropy < 80) return { label: "Strong", color: "bg-primary", pct: 75 };
    return { label: "Very Strong", color: "bg-success", pct: 100 };
  };

  const s = strength();

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Uppercase (A-Z)", checked: uppercase, set: setUppercase },
          { label: "Lowercase (a-z)", checked: lowercase, set: setLowercase },
          { label: "Numbers (0-9)", checked: numbers, set: setNumbers },
          { label: "Symbols (!@#$)", checked: symbols, set: setSymbols },
        ].map((opt) => (
          <label key={opt.label} className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={opt.checked} onChange={(e) => opt.set(e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50" />
            {opt.label}
          </label>
        ))}
      </div>
      <div className="flex items-center gap-4 mb-6">
        <label className="text-sm text-muted shrink-0">Length: {length}</label>
        <input type="range" min={4} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))}
          className="flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary" />
      </div>
      <button onClick={generate} className="px-6 py-2.5 gradient-bg text-black font-semibold text-sm font-medium rounded-lg hover:opacity-90 flex items-center gap-2">
        <RefreshCw className="w-4 h-4" /> Generate Password
      </button>
      {password && (
        <div className="mt-6">
          <div className="flex items-center gap-2 p-4 bg-background border border-border rounded-xl">
            <code className="flex-1 text-lg font-mono break-all">{password}</code>
            <button onClick={copy} className="p-2 rounded-lg bg-surface-hover hover:bg-border shrink-0">
              {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-muted" />}
            </button>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
              <div className={`h-full ${s.color} rounded-full transition-all`} style={{ width: `${s.pct}%` }} />
            </div>
            <span className="text-xs font-medium text-muted">{s.label}</span>
          </div>
        </div>
      )}
    </div>
  );
}
