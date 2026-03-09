export function ProgressSteps() {
  const steps = [
    "Uploading Media",
    "Frame Extraction",
    "AI Model Analysis",
    "Generating Report"
  ]

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

      <h3 className="font-semibold mb-6">AI Processing Steps</h3>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
            <span className="text-sm text-gray-300">{step}</span>
          </div>
        ))}
      </div>

    </div>
  )
}