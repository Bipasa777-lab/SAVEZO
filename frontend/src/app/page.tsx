import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { HowItWorks } from "@/components/landing/HowItWorks" // ✅ ADD THIS
import { CTA } from "@/components/landing/CTA"

export default function Landing() {
  return (
    <main className="pt-[68px] bg-background text-foreground transition-colors duration-300">

      {/* 🌟 HERO */}
      <Hero />

      {/* ⚡ FEATURES */}
      <Features />

      {/* 🧠 HOW IT WORKS (NEW SECTION) */}
      <HowItWorks />

      {/* 🚀 CTA */}
      <CTA />

    </main>
  )
}