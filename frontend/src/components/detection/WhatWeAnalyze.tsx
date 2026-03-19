export default function WhatWeAnalyze() {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 backdrop-blur-xl shadow-card transition-colors duration-300">

      {/* TITLE */}
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-foreground">
        🧠 What We Analyze
      </h2>

      <div className="space-y-5 text-sm">

        <div>
          <p className="font-semibold text-foreground">
            👁 Facial Landmark Consistency
          </p>
          <p className="text-muted-foreground text-xs">
            Blink rates, micro-expressions, eye movement patterns
          </p>
        </div>

        <div>
          <p className="font-semibold text-foreground">
            🎞 Temporal Frame Analysis
          </p>
          <p className="text-muted-foreground text-xs">
            Frame-to-frame inconsistencies, GAN artifacts
          </p>
        </div>

        <div>
          <p className="font-semibold text-foreground">
            🧪 Frequency Domain Inspection
          </p>
          <p className="text-muted-foreground text-xs">
            DCT/FFT patterns revealing AI signatures
          </p>
        </div>

        <div>
          <p className="font-semibold text-foreground">
            🎨 Skin Texture & Lighting
          </p>
          <p className="text-muted-foreground text-xs">
            Specular highlights, depth inconsistencies
          </p>
        </div>

      </div>
    </div>
  )
}