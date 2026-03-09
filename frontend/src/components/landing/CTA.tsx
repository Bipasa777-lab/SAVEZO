"use client"

import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-24 px-6 relative text-center">

      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl opacity-40" />

      <div className="relative z-10 max-w-3xl mx-auto">

        <h2 className="text-4xl font-bold mb-6">
          Build Safer Platforms With AI
        </h2>

        <p className="text-gray-400 mb-10">
          Integrate SentinelAI into your platform and prevent
          deepfakes, explicit content, and suicide-risk media
          before it reaches users.
        </p>

        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white px-10 py-6 rounded-xl"
        >
          Start Protecting Now
        </Button>

      </div>

    </section>
  )
}