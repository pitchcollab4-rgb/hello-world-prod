"use client";

import { useState, useMemo } from "react";
import { categories, getToolsByCategory, searchTools } from "@/data/tools";
import ToolCard from "./ToolCard";
import * as Icons from "lucide-react";

export default function ToolsSection({ searchQuery }: { searchQuery: string }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const displayedTools = useMemo(() => {
    if (searchQuery.trim()) {
      return searchTools(searchQuery);
    }
    return getToolsByCategory(activeCategory);
  }, [activeCategory, searchQuery]);

  return (
    <section id="tools" className="py-20 sm:py-24 border-t border-white/5 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-foreground/80 mb-4">
            All Tools
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {searchQuery ? "Search Results" : "All SEO Tools"}
          </h2>
          <p className="mt-3 text-muted max-w-xl mx-auto">
            {searchQuery
              ? `Found ${displayedTools.length} tool${displayedTools.length !== 1 ? "s" : ""} matching "${searchQuery}"`
              : "Browse our complete collection of free SEO and content tools"}
          </p>
        </div>

        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => {
              const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[cat.icon] || Icons.Grid3X3;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    activeCategory === cat.id
                      ? "bg-primary/10 border-primary/60 text-primary"
                      : "bg-surface border-border text-muted hover:text-foreground hover:border-white/20"
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {displayedTools.length === 0 && (
          <div className="text-center py-16">
            <Icons.SearchX className="w-12 h-12 text-muted/40 mx-auto mb-4" />
            <p className="text-lg font-medium text-muted">No tools found</p>
            <p className="text-sm text-muted/70 mt-1">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
