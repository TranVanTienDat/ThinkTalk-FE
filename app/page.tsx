"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { NetworkSection } from "@/components/sections/NetworkSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#F53838] selection:text-white">
      <Header />
      <main className="overflow-x-hidden">
        <HeroSection />
        <StatsSection />

        <div className="space-y-32 md:space-y-48 pb-48">
          <FeaturesSection />
          <PricingSection />
          <NetworkSection />
          <TestimonialsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
