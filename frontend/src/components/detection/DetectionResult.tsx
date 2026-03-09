"use client"

import { useState } from "react"

export function DetectionResult() {

  // Simulated AI result
  const [result] = useState({
    deepfake: 12,
    explicit: 5,
    suicideRisk: 2,
    status: "SAFE"
  })

  const statusColor =
    result.status === "SAFE"
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : result.status === "WARNING"
      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      : "bg-red-500/20 text-red-400 border-red-500/30"

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">

      <h3 className="text-lg font-semibold mb-6">Detection Results</h3>

      {/* Status */}
      <div className={`mb-6 px-4 py-2 rounded-full border text-center text-sm ${statusColor}`}>
        {result.status}
      </div>

      {/* Scores */}
      <div className="space-y-6">

        <ScoreBar label="Deepfake Probability" value={result.deepfake} />
        <ScoreBar label="Explicit Content Risk" value={result.explicit} />
        <ScoreBar label="Suicide Risk Level" value={result.suicideRisk} />

      </div>

    </div>
  )
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-semibold">{value}%</span>
      </div>

      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}