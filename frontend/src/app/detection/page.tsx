"use client"

import { useState } from "react"
import UploadZone from "@/components/detection/UploadZone"
import DetectionResult from "@/components/detection/DetectionResult"
import ProgressSteps from "@/components/detection/ProgressSteps"

import WhatWeAnalyze from "@/components/detection/WhatWeAnalyze"
import DemoScenarios from "@/components/detection/DemoScenarios"
import RecentDetections from "@/components/detection/RecentDetections"

export default function DetectionPage() {
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!file) return

    setAnalyzing(true)

    setTimeout(() => {
      setResult({
        deepfake: 72,
        nude: 12,
        mental: 5,
        overall: 64,
      })
      setAnalyzing(false)
    }, 3000)
  }

  const handleRemoveFile = () => {
    setFile(null)
    setResult(null)
    setAnalyzing(false)
  }

  const getFileIcon = () => {
    if (!file) return "📁"
    if (file.type.startsWith("image")) return "🖼️"
    if (file.type.startsWith("video")) return "🎬"
    return "📄"
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-20 relative overflow-hidden transition-colors duration-300">

      {/* 🌌 BACKGROUND */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-primary/10 blur-[140px]" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="mb-16">
          <div className="text-primary text-sm font-semibold tracking-widest uppercase mb-6">
            🎭 Deepfake Analysis Lab
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Real vs Fake <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Video Detector
            </span>
          </h1>

          <p className="text-muted-foreground max-w-2xl">
            Upload any image or video to detect whether it's real or AI-generated.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT PANEL */}
          <div className="bg-card border border-border rounded-2xl p-10 backdrop-blur-xl shadow-card">

            <UploadZone file={file} setFile={setFile} />

            {file && (
              <div className="mt-4 flex items-center justify-between bg-background border border-border rounded-xl px-4 py-3 hover:border-primary/40 transition">

                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-xl">
                    {getFileIcon()}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {file.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB •{" "}
                      {file.type.split("/")[1]}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleRemoveFile}
                  className="text-muted-foreground hover:text-danger text-lg transition"
                >
                  ✕
                </button>
              </div>
            )}

            {/* ANALYZE BUTTON */}
            <button
              onClick={handleAnalyze}
              disabled={!file || analyzing}
              className="mt-6 w-full py-4 rounded-xl font-semibold 
              bg-accent-gradient text-white
              hover:scale-[1.02] hover:shadow-glow
              transition disabled:opacity-50"
            >
              {analyzing ? "Analyzing..." : "🔍 Analyze for Deepfake"}
            </button>

          </div>

          {/* RIGHT PANEL */}
          <div className="bg-card border border-border rounded-2xl p-10 backdrop-blur-xl shadow-card flex items-center justify-center">

            {analyzing ? (
              <ProgressSteps />
            ) : result ? (
              <DetectionResult result={result} />
            ) : (
              <div className="text-center text-muted-foreground">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-lg text-foreground mb-2">
                  Awaiting Upload
                </h3>
                <p className="text-sm max-w-xs">
                  Upload a file to run deepfake detection.
                </p>
              </div>
            )}

          </div>

        </div>

        {/* EXTRA SECTIONS */}
        <div className="mt-16 space-y-16">
          <WhatWeAnalyze />
          <DemoScenarios />
          <RecentDetections />
        </div>

      </div>
    </div>
  )
}