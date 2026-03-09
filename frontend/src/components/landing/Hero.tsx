"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 text-center">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-transparent blur-3xl opacity-60" />

      <div className="relative z-10 max-w-4xl">

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Social Media <br />
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Without Harm
          </span>
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
          AI-powered deepfake detection, explicit content filtering,
          and suicide-risk prevention before content goes public.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white px-8 py-6 rounded-xl"
          >
            Get Started
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-xl"
          >
            Try Detection
          </Button>
        </div>

      </div>
    </section>
  )
}