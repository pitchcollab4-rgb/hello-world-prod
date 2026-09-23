import Link from "next/link";

export function LogoMark({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="1" y="3" width="11" height="11" rx="2.5" fill="#c5f82a" />
      <rect x="9" y="10" width="14" height="11" rx="2.5" fill="#e1ff8a" />
    </svg>
  );
}

export default function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <LogoMark className={size === "lg" ? "w-7 h-7" : "w-6 h-6"} />
      <span className={`${size === "lg" ? "text-xl" : "text-lg"} font-bold tracking-tight text-foreground`}>
        MintSEOPro
      </span>
    </Link>
  );
}
