"use client";

import { Search, ArrowRight } from "lucide-react";
import DashboardPreview from "./DashboardPreview";

export default function Hero({
  onSearch,
}: {
  onSearch?: (query: string) => void;
}) {
  const scrollToTools = () =>
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-foreground/80 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            100+ Free SEO &amp; AI Tools
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Streamline Your SEO
            <br />
            with FitSEO
          </h1>

          <p className="mt-5 text-base sm:text-lg text-muted max-w-xl mx-auto">
            Boost rankings, polish content, and write faster with our free
            all-in-one SEO and AI toolkit. No sign-up required.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={scrollToTools}
              className="px-5 py-2.5 gradient-bg text-black text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Explore Tools
            </button>
            <a
              href="#ai-tools"
              className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors"
            >
              Try AI Tools
            </a>
          </div>

          <div className="mt-10 max-w-xl mx-auto">
            <div className="flex items-center bg-surface/80 backdrop-blur rounded-xl border border-border focus-within:border-primary/50 transition-colors">
              <Search className="w-5 h-5 text-muted ml-4 shrink-0" />
              <input
                type="text"
                placeholder="Search any tool... e.g. word counter, paraphraser"
                onChange={(e) => onSearch?.(e.target.value)}
                className="flex-1 min-w-0 px-3 py-3.5 text-sm bg-transparent focus:outline-none placeholder:text-muted/70"
              />
              <button
                aria-label="Go to tools"
                className="mr-1.5 p-2 rounded-lg bg-white/5 text-foreground hover:bg-primary hover:text-black transition-colors"
                onClick={scrollToTools}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
