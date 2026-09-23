"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Info, Zap } from "lucide-react";
import * as Icons from "lucide-react";
import { tools, categories } from "@/data/tools";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordCounterTool from "@/components/tools/WordCounterTool";
import CaseConverterTool from "@/components/tools/CaseConverterTool";
import LoremIpsumTool from "@/components/tools/LoremIpsumTool";
import JsonFormatterTool from "@/components/tools/JsonFormatterTool";
import PasswordGeneratorTool from "@/components/tools/PasswordGeneratorTool";
import MetaTagGeneratorTool from "@/components/tools/MetaTagGeneratorTool";
import ColorPickerTool from "@/components/tools/ColorPickerTool";
import KeywordDensityTool from "@/components/tools/KeywordDensityTool";
import QrCodeGeneratorTool from "@/components/tools/QrCodeGeneratorTool";
import Base64Tool from "@/components/tools/Base64Tool";
import SerpSimulatorTool from "@/components/tools/SerpSimulatorTool";
import ReadabilityCheckerTool from "@/components/tools/ReadabilityCheckerTool";
import ParaphrasingTool from "@/components/tools/ParaphrasingTool";
import AiContentDetectorTool from "@/components/tools/AiContentDetectorTool";
import TextSummarizerTool from "@/components/tools/TextSummarizerTool";
import ArticleRewriterTool from "@/components/tools/ArticleRewriterTool";
import AiEssayWriterTool from "@/components/tools/AiEssayWriterTool";
import AiStoryGeneratorTool from "@/components/tools/AiStoryGeneratorTool";
import AiEmailWriterTool from "@/components/tools/AiEmailWriterTool";
import AiCodeGeneratorTool from "@/components/tools/AiCodeGeneratorTool";
import AiChatbotTool from "@/components/tools/AiChatbotTool";
import AiTranslatorTool from "@/components/tools/AiTranslatorTool";
import AiTitleGeneratorTool from "@/components/tools/AiTitleGeneratorTool";
import GrammarCheckerTool from "@/components/tools/GrammarCheckerTool";

const toolComponents: Record<string, React.ComponentType> = {
  "word-counter": WordCounterTool,
  "character-counter": WordCounterTool,
  "sentence-counter": WordCounterTool,
  "paragraph-counter": WordCounterTool,
  "word-frequency-counter": WordCounterTool,
  "syllable-counter": WordCounterTool,
  "case-converter": CaseConverterTool,
  "lorem-ipsum-generator": LoremIpsumTool,
  "json-formatter": JsonFormatterTool,
  "password-generator": PasswordGeneratorTool,
  "meta-tag-generator": MetaTagGeneratorTool,
  "color-picker": ColorPickerTool,
  "keyword-density-checker": KeywordDensityTool,
  "qr-code-generator": QrCodeGeneratorTool,
  "base64-encoder": Base64Tool,
  "serp-simulator": SerpSimulatorTool,
  "readability-checker": ReadabilityCheckerTool,
  "paraphrasing-tool": ParaphrasingTool,
  "ai-content-detector": AiContentDetectorTool,
  "text-summarizer": TextSummarizerTool,
  "article-rewriter": ArticleRewriterTool,
  "ai-essay-writer": AiEssayWriterTool,
  "ai-story-generator": AiStoryGeneratorTool,
  "ai-email-writer": AiEmailWriterTool,
  "ai-code-generator": AiCodeGeneratorTool,
  "ai-chatbot": AiChatbotTool,
  "ai-translator": AiTranslatorTool,
  "ai-title-generator": AiTitleGeneratorTool,
  "grammar-checker": GrammarCheckerTool,
};

function PlaceholderTool({ tool }: { tool: (typeof tools)[0] }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <Zap className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
      <p className="text-muted max-w-md mx-auto">
        The <strong>{tool.name}</strong> is under development.
        {tool.apiRequired && (
          <span className="block mt-2 text-sm">
            This tool requires: <strong>{tool.apiRequired}</strong>
          </span>
        )}
      </p>
    </div>
  );
}

export default function ToolPage() {
  const params = useParams();
  const toolId = params.id as string;
  const tool = tools.find((t) => t.id === toolId);

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Tool Not Found</h1>
            <Link href="/" className="text-primary hover:underline">
              Go back home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const category = categories.find((c) => c.id === tool.category);
  const IconComponent =
    (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
      tool.icon
    ] || Icons.Wrench;
  const ToolComponent = toolComponents[tool.id];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 relative">
        <div className="absolute inset-x-0 top-0 h-80 hero-glow opacity-60 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all tools
          </Link>

          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
              <IconComponent className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{tool.name}</h1>
              <p className="text-muted mt-1">{tool.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2.5 py-0.5 text-xs font-medium bg-white/5 border border-white/10 text-foreground/80 rounded-full">
                  {category?.name}
                </span>
                {tool.popular && (
                  <span className="px-2.5 py-0.5 text-xs font-medium gradient-bg text-black font-semibold rounded-full">
                    Popular
                  </span>
                )}
              </div>
            </div>
          </div>

          {tool.apiRequired && (
            <div className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-xl mb-6">
              <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="font-medium">API Required:</span>{" "}
                <span className="text-muted">{tool.apiRequired}</span>
              </div>
            </div>
          )}

          <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8">
            {ToolComponent ? <ToolComponent /> : <PlaceholderTool tool={tool} />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
