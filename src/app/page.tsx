"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import PopularTools from "@/components/PopularTools";
import ToolsSection from "@/components/ToolsSection";
import ApiSection from "@/components/ApiSection";
import Features from "@/components/Features";
import AiToolsSection from "@/components/AiToolsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />
      <main className="flex-1">
        <Hero onSearch={handleSearch} />
        <StatsSection />
        {!searchQuery && (
          <>
            <Features />
            <PopularTools />
          </>
        )}
        <ToolsSection searchQuery={searchQuery} />
        {!searchQuery && <AiToolsSection />}
        <ApiSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
