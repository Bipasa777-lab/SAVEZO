export default function DemoScenarios() {
  const scenarios = [
    { label: "Authentic Video", icon: "✅" },
    { label: "High Confidence Deepfake", icon: "🎭" },
    { label: "Suspicious — Uncertain", icon: "⚠️" },
    { label: "AI-Generated Image", icon: "🤖" },
  ]

  return (
    <div>

      {/* TITLE */}
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
        🧪 Demo Scenarios
      </h2>

      {/* DESCRIPTION */}
      <p className="text-muted-foreground text-sm mb-4">
        Try without uploading — click to run a demo analysis:
      </p>

      {/* BUTTONS */}
      <div className="flex flex-wrap gap-3">

        {scenarios.map((item) => (
          <button
            key={item.label}
            className="px-4 py-2 rounded-full border border-border bg-muted hover:bg-muted/70 text-sm text-foreground transition"
          >
            {item.icon} {item.label}
          </button>
        ))}

      </div>

    </div>
  )
}