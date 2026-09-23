import Link from "next/link";
import Logo from "./Logo";

const columns = [
  {
    title: "Popular Tools",
    links: [
      { label: "Word Counter", href: "/tool/word-counter" },
      { label: "Grammar Checker", href: "/tool/grammar-checker" },
      { label: "Paraphrasing Tool", href: "/tool/paraphrasing-tool" },
      { label: "AI Content Detector", href: "/tool/ai-content-detector" },
      { label: "Meta Tag Generator", href: "/tool/meta-tag-generator" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "All Tools", href: "/#tools" },
      { label: "AI Tools", href: "/#ai-tools" },
      { label: "Features", href: "/#features" },
      { label: "APIs", href: "/#api-info" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted leading-relaxed max-w-xs">
              Free online SEO tools to improve your rankings, analyze content, and write faster with AI.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-semibold text-sm mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-muted hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} MintSEOPro. All rights reserved.</p>
          <p>Built for the SEO community.</p>
        </div>
      </div>
    </footer>
  );
}
