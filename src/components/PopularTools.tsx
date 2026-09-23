"use client";

import { popularTools } from "@/data/tools";
import ToolCard from "./ToolCard";
import SectionHeading from "./SectionHeading";

export default function PopularTools() {
  return (
    <section className="py-20 sm:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Popular"
          title="Most Popular Tools"
          subtitle="The tools our users reach for every day."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
