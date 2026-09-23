"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/#tools" },
  { label: "Features", href: "/#features" },
  { label: "AI Tools", href: "/#ai-tools" },
  { label: "API", href: "/#api-info" },
];

export default function Header({
  onSearch,
}: {
  onSearch?: (query: string) => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    onSearch?.(e.target.value);
                  }}
                  autoFocus
                  className="w-56 pl-4 pr-10 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                    onSearch?.("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search tools"
                className="hidden sm:flex items-center justify-center w-9 h-9 text-muted border border-border rounded-lg hover:border-primary/50 hover:text-foreground transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            <Link
              href="/#tools"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
            >
              Get Started
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 text-muted hover:text-foreground rounded-lg hover:bg-surface-hover"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface">
          <div className="px-4 py-3 space-y-1">
            <form onSubmit={handleSearch} className="mb-3">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch?.(e.target.value);
                }}
                className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </form>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-muted hover:text-foreground rounded-lg hover:bg-surface-hover"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
