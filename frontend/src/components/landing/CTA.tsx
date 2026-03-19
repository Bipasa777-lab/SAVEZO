"use client"

import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-24 px-6 relative text-center bg-background text-foreground transition-colors duration-300">

      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl opacity-40" />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Heading */}
        <h2 className="text-4xl font-bold mb-6 text-foreground">
          Build Safer Platforms With AI
        </h2>

        {/* Description */}
        <p className="text-muted-foreground mb-10">
          Integrate SentinelAI into your platform and prevent
          deepfakes, explicit content, and suicide-risk media
          before it reaches users.
        </p>

        {/* Button */}
        <Button
          size="lg"
          className="bg-accent-gradient text-white hover:opacity-90 px-10 py-6 rounded-xl shadow-glow"
        >
          Start Protecting Now
        </Button>

      </div>

    </section>
  )
}