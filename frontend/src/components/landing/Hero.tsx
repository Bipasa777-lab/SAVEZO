"use client"

import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-68px)] flex items-center justify-center px-6 text-center overflow-hidden bg-background text-foreground transition-colors duration-300">

      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/10 to-transparent blur-3xl opacity-60" />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-primary/30 text-primary text-sm">
          ● AI-Powered Content Moderation Platform
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-foreground">
          Social Media <br />
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Without Harm
          </span>
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
          Savezo uses advanced AI to detect deepfakes, inappropriate content,
          and mental health risks before they reach your feed — keeping
          communities genuinely safe.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Button
            size="lg"
            className="bg-accent-gradient text-white hover:opacity-90 px-8 py-6 rounded-xl"
          >
            Get Started →
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:bg-muted px-8 py-6 rounded-xl"
          >
            Try AI Detection
          </Button>

        </div>

      </div>
    </section>
  )
}