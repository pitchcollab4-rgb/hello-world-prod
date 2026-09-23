"use client";

import { ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";

const apis = [
  {
    name: "Claude API (Anthropic)",
    usage: "AI writing, paraphrasing, content detection, chatbot, code generation",
    free: false,
    note: "Powers all 12 live AI tools. Set ANTHROPIC_API_KEY to enable them.",
    link: "https://docs.claude.com/",
  },
  {
    name: "Google PageSpeed Insights API",
    usage: "Page speed analysis, performance scores",
    free: true,
    note: "Free tier with generous limits",
    link: "https://developers.google.com/speed/docs/insights/v5/get-started",
  },
  {
    name: "Google Custom Search API",
    usage: "Plagiarism checking, keyword position, Google index checking",
    free: true,
    note: "100 free queries/day, then $5/1000 queries",
    link: "https://developers.google.com/custom-search/v1/overview",
  },
  {
    name: "Moz API",
    usage: "Domain authority, page authority, spam score, backlink data",
    free: false,
    note: "Free tier: 10 queries/month. Alternative: Ahrefs API",
    link: "https://moz.com/products/api",
  },
  {
    name: "LanguageTool API",
    usage: "Grammar checking, spell checking, style suggestions",
    free: true,
    note: "Free open-source API, self-hostable",
    link: "https://languagetool.org/http-api/",
  },
  {
    name: "WHOIS API",
    usage: "Domain age, domain availability, WHOIS lookup",
    free: true,
    note: "Many free options: whoisxml, whoisjson",
    link: "https://www.whoisxmlapi.com/",
  },
  {
    name: "ip-api.com",
    usage: "IP geolocation, IP lookup",
    free: true,
    note: "Free for non-commercial use, 45 req/min",
    link: "http://ip-api.com/docs",
  },
  {
    name: "Tesseract.js",
    usage: "OCR / Image to text extraction",
    free: true,
    note: "Runs entirely in the browser, no server needed",
    link: "https://tesseract.projectnaptha.com/",
  },
];

export default function ApiSection() {
  return (
    <section id="api-info" className="py-20 sm:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Integrations"
          title="APIs Behind the Tools"
          subtitle="Most tools run entirely in your browser. The ones below use external APIs for full functionality."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {apis.map((api) => (
            <div
              key={api.name}
              className="bg-surface border border-border rounded-2xl p-5 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">{api.name}</h3>
                <span
                  className={`px-2 py-0.5 text-[11px] font-bold uppercase rounded-full ${
                    api.free
                      ? "bg-success/10 text-success"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {api.free ? "Free" : "Paid"}
                </span>
              </div>
              <p className="text-sm text-muted mb-2">
                <span className="font-medium text-foreground">Used for:</span>{" "}
                {api.usage}
              </p>
              <p className="text-xs text-muted mb-3">{api.note}</p>
              <a
                href={api.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Documentation
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
          <h3 className="font-semibold mb-2 text-primary">Tools That Work Without Any API</h3>
          <p className="text-sm text-muted">
            These tools run entirely in the browser with no external dependencies:
            Word Counter, Character Counter, Sentence Counter, Paragraph Counter,
            Case Converter, Lorem Ipsum Generator, Reverse Text, Text to Binary,
            JSON Formatter, HTML to Text, URL Encoder/Decoder, MD5 Generator,
            Password Generator, UUID Generator, Color Picker, Unit Converter, Age Calculator,
            BMI Calculator, Percentage Calculator, Meta Tag Generator, SERP Simulator,
            Robots.txt Generator, Schema Markup Generator, Htaccess Redirect Generator,
            Keyword Density Checker, Readability Checker, Syllable Counter, Word Frequency Counter,
            Image Compressor, Image Resizer, Image Cropper, JPG/PNG/WebP converters,
            QR Code Generator, Favicon Generator, Timestamp Converter, Base64 Encoder,
            and CSV to JSON Converter.
          </p>
        </div>
      </div>
    </section>
  );
}
