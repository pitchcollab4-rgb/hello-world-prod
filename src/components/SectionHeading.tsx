export default function SectionHeading({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-foreground/80 mb-4">
        {badge}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-muted">{subtitle}</p>}
    </div>
  );
}
