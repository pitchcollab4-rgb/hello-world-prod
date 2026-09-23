import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-b from-[#1f280a] to-[#0f1205] px-6 py-16 text-center">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to Grow Your Traffic?
            </h2>
            <p className="mt-4 text-muted max-w-lg mx-auto">
              Jump into 100+ free SEO, content and AI tools. No account, no credit card.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/#tools" className="px-5 py-2.5 gradient-bg text-black text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Browse All Tools
              </Link>
              <Link href="/tool/paraphrasing-tool" className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors">
                Try Paraphraser
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
