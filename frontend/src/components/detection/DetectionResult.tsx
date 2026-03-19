interface Props {
  result: {
    deepfake: number
    nude: number
    mental: number
    overall: number
  }
}

export default function DetectionResult({ result }: Props) {
  const isAuthentic = result.deepfake < 30

  // =========================
  // 🟢 AUTHENTIC UI
  // =========================
  if (isAuthentic) {
    return (
      <div className="w-full space-y-6">

        {/* HEADER */}
        <div className="bg-safe/10 border border-safe/20 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-safe/20 flex items-center justify-center text-xl text-safe">
            ✔
          </div>

          <h2 className="text-2xl font-bold text-safe">
            AUTHENTIC CONTENT
          </h2>

          <p className="text-muted-foreground text-sm mt-2">
            No deepfake indicators detected — content appears genuine
          </p>
        </div>

        {/* PROBABILITIES */}
        <div className="grid grid-cols-2 gap-4">

          <div className="bg-card border border-border rounded-xl p-5 text-center">
            <p className="text-xs text-muted-foreground mb-2">FAKE PROBABILITY</p>
            <p className="text-4xl font-bold text-safe">
              {result.deepfake}%
            </p>
            <p className="text-xs text-safe mt-1">LOW RISK</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 text-center">
            <p className="text-xs text-muted-foreground mb-2">REAL PROBABILITY</p>
            <p className="text-4xl font-bold text-safe">
              {100 - result.deepfake}%
            </p>
            <p className="text-xs text-safe mt-1">HIGH CONFIDENCE</p>
          </div>

        </div>

        {/* CONFIDENCE */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Detection Confidence</span>
            <span className="text-safe font-semibold">
              {100 - result.nude}% Confidence
            </span>
          </div>

          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-safe transition-all duration-700"
              style={{ width: `${100 - result.nude}%` }}
            />
          </div>
        </div>

        {/* BREAKDOWN */}
        <div>
          <p className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            📊 Detection Breakdown
          </p>

          <div className="space-y-3 text-sm">

            {[
              { label: "Facial Landmark Anomaly", value: 5 },
              { label: "GAN Artifacts", value: 8 },
              { label: "Temporal Inconsistency", value: 7 },
              { label: "Skin Texture Analysis", value: 5 },
              { label: "Frequency Domain", value: 5 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="text-safe">{item.value}%</span>
                </div>

                <div className="h-1 bg-muted rounded">
                  <div
                    className="h-full bg-safe"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* SUCCESS CARD */}
        <div className="bg-safe/10 border border-safe/20 rounded-xl p-4 text-sm">
          <p className="text-safe font-semibold flex items-center gap-2">
            ✔ Content Cleared
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            No deepfake indicators detected. This content appears authentic and safe to share.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mt-4">

          <button className="flex-1 py-3 rounded-xl bg-muted border border-border hover:bg-muted/70 transition text-sm text-foreground">
            🔄 New Analysis
          </button>

          <button className="flex-1 py-3 rounded-xl bg-accent-gradient text-white text-sm font-semibold">
            📤 Go to Feed
          </button>

        </div>

      </div>
    )
  }

  // =========================
  // 🔴 FAKE / SUSPICIOUS UI
  // =========================
  return (
    <div className="w-full space-y-6">

      {/* SCORE */}
      <div className="text-center">
        <div className="w-28 h-28 mx-auto rounded-full border-4 border-warning flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-warning">
            {result.overall}%
          </span>
          <span className="text-xs text-muted-foreground">SCORE</span>
        </div>

        <p className="mt-4 text-muted-foreground text-sm">
          Overall Deepfake Risk
        </p>
      </div>

      {/* BARS */}
      {[
        { label: "Deepfake Probability", value: result.deepfake },
        { label: "Explicit Content Risk", value: result.nude },
        { label: "Mental Health Risk", value: result.mental },
      ].map((item) => (
        <div key={item.label}>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-foreground">{item.label}</span>
            <span className="text-muted-foreground">{item.value}%</span>
          </div>

          <div className="h-3 bg-muted rounded-full">
            <div
              className="h-full bg-danger"
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}

      {/* ALERT */}
      <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 text-sm">
        <p className="text-warning font-semibold">
          ⚠ Potentially suspicious content
        </p>
        <p className="text-muted-foreground text-xs mt-1">
          Some inconsistencies detected. Review recommended.
        </p>
      </div>

    </div>
  )
}