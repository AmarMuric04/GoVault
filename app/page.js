import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Feature17 } from "@/components/feature17";
import { Navbar } from "@/components/navbar";
import { Logos3 } from "@/components/logos3";
import { Stats8 } from "@/components/stats8";
import { Hero } from "@/components/hero12";
import ContentSection from "@/components/content";
import FooterSection from "@/components/sections/footer/default";

export default async function LandingPage() {
  return (
    <main className="w-screen">
      <Navbar />
      <Hero />
      <Logos3 />
      <Stats8 />
      <ContentSection />
      <Feature17 />
      <FooterSection />
    </main>
  );
}
