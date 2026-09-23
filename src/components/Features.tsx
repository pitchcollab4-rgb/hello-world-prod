import { Cpu, FileSearch, Sparkles, Hash, Bot, Code, Key, Image as ImageIcon, Globe, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";

const integrationIcons = [Hash, Bot, Code, Key, ImageIcon, Globe, ShieldCheck, FileSearch];

function Card({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden flex flex-col">
      <div className="p-6">
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted leading-relaxed">{text}</p>
      </div>
      <div className="relative flex-1 min-h-44">{children}</div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Features"
          title={<>Cutting-edge Tools Designed<br className="hidden sm:block" /> to Boost Efficiency</>}
          subtitle="A seamless experience with FitSEO: better rankings, cleaner content, and faster writing, all in one place."
        />

        <div className="grid md:grid-cols-2 gap-5">
          <Card
            title="AI-Powered Writing"
            text="Paraphrase, summarize, rewrite and check grammar with Claude AI to publish better content faster."
          >
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-px p-px bg-border/40">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-surface" />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="card-glow flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1a2008] border border-primary/60">
                <Cpu className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">AI</span>
              </div>
            </div>
          </Card>

          <Card
            title="Traffic Analytics"
            text="Measure readability, keyword density and SERP appearance, and see exactly where to improve."
          >
            <svg viewBox="0 0 400 160" className="absolute inset-x-0 bottom-0 w-full h-40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="feat-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#c5f82a" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#c5f82a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,140 C40,120 60,150 100,120 S160,90 200,100 S260,40 300,60 S360,30 400,20 L400,160 L0,160 Z" fill="url(#feat-area)" />
              <path d="M0,140 C40,120 60,150 100,120 S160,90 200,100 S260,40 300,60 S360,30 400,20" fill="none" stroke="#c5f82a" strokeWidth="2" />
              <line x1="200" x2="200" y1="100" y2="160" stroke="#c5f82a" strokeOpacity="0.4" strokeDasharray="3 3" />
              <circle cx="200" cy="100" r="5" fill="#0a0a0a" stroke="#c5f82a" strokeWidth="2" />
            </svg>
            <div className="absolute left-1/2 top-4 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-background border border-border text-center">
              <div className="text-[10px] text-muted">Monthly visits</div>
              <div className="text-sm font-bold">48,210</div>
            </div>
          </Card>

          <Card
            title="100+ Tools, One Place"
            text="Text analysis, SEO, keywords, images, domains and utilities, so you don't need ten tabs open."
          >
            <div className="absolute inset-0 flex flex-col justify-center gap-3 overflow-hidden">
              {[0, 1].map((row) => (
                <div key={row} className="flex gap-3 w-max animate-marquee" style={{ animationDirection: row ? "reverse" : "normal" }}>
                  {[...integrationIcons, ...integrationIcons, ...integrationIcons].map((Icon, i) => (
                    <div
                      key={i}
                      className="w-14 h-14 rounded-xl bg-surface-hover border border-border flex items-center justify-center text-muted"
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Card>

          <Card
            title="Free & Private"
            text="Most tools run right in your browser. Nothing to install, no account, no limits on the basics."
          >
            <div className="absolute inset-0 dot-bg" />
            <div className="absolute inset-0 flex items-center justify-center gap-4">
              {["No sign-up", "Runs locally", "100% free"].map((t, i) => (
                <div
                  key={t}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 ${
                    i === 1 ? "card-glow bg-[#1a2008] border-primary/60 text-primary" : "bg-surface border-border text-muted"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {t}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
