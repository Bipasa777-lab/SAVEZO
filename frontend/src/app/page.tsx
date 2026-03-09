import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { CTA } from "@/components/landing/CTA"

export default function Landing() {
  return (
    <main className="pt-16">
      <Hero />
      <Features />
      <CTA />
    </main>
  )
}
export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-blue-500/10 to-purple-500/10">
      <h1 className="text-6xl font-extrabold mb-6">
        Social Media <br />
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Without Harm
        </span>
      </h1>

      <p className="text-gray-400 max-w-xl mb-8">
        AI-powered deepfake, nude content and suicide-risk detection.
      </p>

      <div className="flex gap-4">
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
          Get Started
        </button>
        <button className="px-6 py-3 rounded-xl border border-white/20">
          Try Detection
        </button>
      </div>
    </section>
  )
}
