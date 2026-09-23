const stats = [
  { label: "Active Users", value: "2M+" },
  { label: "Free Tools", value: "100+" },
  { label: "Countries", value: "190+" },
  { label: "User Rating", value: "4.8/5" },
];

const brands = ["Logoipsum", "Acme", "Northwind", "Globex", "Initech", "Umbrella", "Hooli", "Stark"];

export default function StatsSection() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted mb-6">
          Trusted by marketers, writers and developers worldwide
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]">
          <div className="flex gap-12 w-max animate-marquee">
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className="flex items-center gap-2 text-lg font-semibold text-foreground/30">
                <span className="w-5 h-5 rounded-full border-2 border-current" />
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-border bg-surface overflow-hidden">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-6 text-center border-border ${i % 2 ? "" : "border-r"} ${i < 2 ? "border-b md:border-b-0" : ""} ${i === 1 ? "md:border-r" : ""}`}
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
