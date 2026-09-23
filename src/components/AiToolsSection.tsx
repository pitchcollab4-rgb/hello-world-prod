"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { Check } from "lucide-react";
import { tools } from "@/data/tools";
import SectionHeading from "./SectionHeading";

const plans = [
  {
    name: "Writing",
    blurb: "Create content from scratch",
    ids: ["ai-essay-writer", "ai-story-generator", "ai-email-writer", "ai-title-generator"],
  },
  {
    name: "Rewriting",
    blurb: "Improve what you already have",
    ids: ["paraphrasing-tool", "article-rewriter", "text-summarizer", "grammar-checker", "ai-content-detector"],
    featured: true,
  },
  {
    name: "Assistants",
    blurb: "Chat, code and translate",
    ids: ["ai-chatbot", "ai-code-generator", "ai-translator"],
  },
];

export default function AiToolsSection() {
  return (
    <section id="ai-tools" className="py-20 sm:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="AI Tools"
          title={<>Smart Solutions,<br className="hidden sm:block" /> Tailored to Your Workflow</>}
          subtitle="12 AI tools powered by Claude. Pick a workflow and get writing."
        />

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const list = plan.ids
              .map((id) => tools.find((t) => t.id === id))
              .filter((t): t is (typeof tools)[number] => Boolean(t));
            const first = list[0];
            return (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 flex flex-col border ${
                  plan.featured
                    ? "bg-gradient-to-b from-[#2a3510] to-[#141a06] border-primary/50 card-glow"
                    : "bg-surface border-border"
                }`}
              >
                <div className="text-sm text-muted">{plan.name}</div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold">{list.length}</span>
                  <span className="text-sm text-muted">tools</span>
                </div>
                <p className="mt-1 text-sm text-muted">{plan.blurb}</p>

                <ul className="mt-6 space-y-3 flex-1">
                  {list.map((t) => {
                    const Icon =
                      (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[t.icon] ||
                      Icons.Sparkles;
                    return (
                      <li key={t.id}>
                        <Link
                          href={`/tool/${t.id}`}
                          className="flex items-center gap-2.5 text-sm hover:text-primary transition-colors"
                        >
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          <Icon className="w-4 h-4 text-muted shrink-0" />
                          {t.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {first && (
                  <Link
                    href={`/tool/${first.id}`}
                    className={`mt-8 block text-center py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 ${
                      plan.featured ? "gradient-bg text-black" : "bg-white text-black"
                    }`}
                  >
                    Get Started
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
