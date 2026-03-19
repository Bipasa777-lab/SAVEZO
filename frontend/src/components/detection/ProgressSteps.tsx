"use client"

import { useEffect, useState } from "react"

export default function ProgressSteps() {
  const steps = [
    "Preprocessing frames",
    "Facial landmark extraction",
    "GAN artifact detection",
    "Frequency domain analysis",
    "Computing final verdict",
  ]

  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (currentStep >= steps.length) return

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1)
    }, 800)

    return () => clearTimeout(timer)
  }, [currentStep])

  return (
    <div className="w-full flex flex-col items-center text-center">

      {/* 🔄 LOADER */}
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />

      {/* TITLE */}
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Analyzing Content
      </h2>

      {/* SUBTEXT */}
      <p className="text-muted-foreground text-sm mb-8">
        Detecting GAN artifacts...
      </p>

      {/* STEPS */}
      <div className="w-full max-w-xs space-y-4 text-left">

        {steps.map((step, i) => {
          const isDone = i < currentStep
          const isActive = i === currentStep

          return (
            <div key={i} className="flex items-center gap-3">

              {/* DOT */}
              <div
                className={`
                  w-2.5 h-2.5 rounded-full
                  ${isDone ? "bg-safe" : ""}
                  ${isActive ? "bg-primary animate-pulse" : ""}
                  ${!isDone && !isActive ? "bg-muted" : ""}
                `}
              />

              {/* TEXT */}
              <span
                className={`
                  text-sm
                  ${isDone ? "text-safe" : ""}
                  ${isActive ? "text-primary" : ""}
                  ${!isDone && !isActive ? "text-muted-foreground" : ""}
                `}
              >
                {step}
              </span>

            </div>
          )
        })}

      </div>

    </div>
  )
}