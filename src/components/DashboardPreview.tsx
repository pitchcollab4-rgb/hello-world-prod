import { LayoutDashboard, BarChart3, Search, FileText, Link2, Settings, Sparkles } from "lucide-react";
import { LogoMark } from "./Logo";

const kpis = [
  { label: "Organic Traffic", value: "48,210", delta: "+12.4%", up: true },
  { label: "Keywords Ranked", value: "2,386", delta: "+8.1%", up: true },
  { label: "Backlinks", value: "14,502", delta: "-1.2%", up: false },
  { label: "SEO Score", value: "92/100", delta: "+4.0%", up: true },
];

const sources = [
  { name: "Google", value: 72 },
  { name: "Bing", value: 14 },
  { name: "Social", value: 9 },
  { name: "Referral", value: 5 },
];

const audits = [
  { page: "/blog/seo-checklist", status: "Optimized", score: 96 },
  { page: "/pricing", status: "Needs Work", score: 71 },
  { page: "/tools/word-counter", status: "Optimized", score: 93 },
  { page: "/about", status: "Issues", score: 48 },
];

const statusStyle: Record<string, string> = {
  Optimized: "bg-success/15 text-success",
  "Needs Work": "bg-warning/15 text-warning",
  Issues: "bg-danger/15 text-danger",
};

// Monthly traffic points for the mock chart (0-100 scale)
const points = [30, 38, 34, 45, 42, 55, 50, 58, 62, 57, 70, 78];

export default function DashboardPreview() {
  const w = 600;
  const h = 160;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - (p / 100) * h] as const);
  const line = coords.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  const peak = coords[8];

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-[2rem] pointer-events-none" />
      <div className="relative rounded-2xl border border-white/10 bg-[#101010] p-2 shadow-2xl">
        <div className="flex rounded-xl overflow-hidden border border-border bg-background">
          {/* Sidebar */}
          <aside className="hidden md:flex w-48 shrink-0 flex-col border-r border-border p-4 gap-1 text-xs">
            <div className="flex items-center gap-2 mb-4">
              <LogoMark className="w-5 h-5" />
              <span className="font-bold">MintSEOPro</span>
            </div>
            <div className="mb-3 px-3 py-2 rounded-lg gradient-bg text-black font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> New Audit
            </div>
            {[
              { icon: LayoutDashboard, label: "Dashboard", active: true },
              { icon: BarChart3, label: "Analytics" },
              { icon: Search, label: "Keywords" },
              { icon: Link2, label: "Backlinks" },
              { icon: FileText, label: "Content" },
              { icon: Settings, label: "Settings" },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  item.active ? "bg-surface-hover text-primary" : "text-muted"
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </div>
            ))}
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0 p-4 sm:p-5 space-y-4 text-left">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">
                  Hey there <span className="text-primary">👋</span>
                </div>
                <div className="text-[11px] text-muted">Here&apos;s how your site is performing today</div>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border text-[11px] text-muted w-48">
                <Search className="w-3 h-3" /> Search reports...
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {kpis.map((k) => (
                <div key={k.label} className="rounded-xl bg-surface border border-border p-3">
                  <div className="text-[10px] uppercase tracking-wide text-muted">{k.label}</div>
                  <div className="mt-1 flex items-end justify-between gap-2">
                    <span className="text-base sm:text-lg font-bold">{k.value}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                        k.up ? "bg-primary/15 text-primary" : "bg-danger/15 text-danger"
                      }`}
                    >
                      {k.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2 rounded-xl bg-surface border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold">Traffic Report</span>
                  <div className="flex gap-1 text-[10px]">
                    {["12 Months", "30 Days", "7 Days"].map((r, i) => (
                      <span
                        key={r}
                        className={`px-2 py-0.5 rounded-md border ${
                          i === 0 ? "border-primary/40 text-primary" : "border-border text-muted"
                        }`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
                <svg viewBox={`0 0 ${w} ${h + 10}`} className="w-full h-32 sm:h-40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="dash-area" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#c5f82a" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#c5f82a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0.25, 0.5, 0.75].map((f) => (
                    <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="#262626" strokeDasharray="4 4" />
                  ))}
                  <path d={area} fill="url(#dash-area)" />
                  <path d={line} fill="none" stroke="#c5f82a" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                  <line x1={peak[0]} x2={peak[0]} y1={peak[1]} y2={h} stroke="#c5f82a" strokeOpacity="0.4" strokeDasharray="3 3" />
                  <circle cx={peak[0]} cy={peak[1]} r="5" fill="#0a0a0a" stroke="#c5f82a" strokeWidth="2.5" />
                </svg>
              </div>

              <div className="rounded-xl bg-surface border border-border p-4">
                <div className="text-xs font-semibold mb-3">Traffic Sources</div>
                <div className="space-y-3">
                  {sources.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-muted">{s.name}</span>
                        <span>{s.value}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-surface-hover">
                        <div className="h-full rounded-full gradient-bg" style={{ width: `${s.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden sm:block rounded-xl bg-surface border border-border p-4">
              <div className="text-xs font-semibold mb-3">Recent Page Audits</div>
              <div className="divide-y divide-border">
                {audits.map((a) => (
                  <div key={a.page} className="flex items-center justify-between py-2 text-[11px]">
                    <span className={`px-2 py-0.5 rounded-md font-medium ${statusStyle[a.status]}`}>{a.status}</span>
                    <span className="flex-1 px-4 font-mono text-muted truncate">{a.page}</span>
                    <span className="font-semibold">{a.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
