"use client"

export function HowItWorks() {
  const steps = [
    {
      icon: "📤",
      title: "1. Upload Content",
      desc: "User posts image, video, or text to their feed as normal.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "🧠",
      title: "2. AI Analyzes",
      desc: "Three-model pipeline scans for deepfakes, explicit content, and mental health signals.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "✅",
      title: "3. Safe or Blocked",
      desc: "Clean content publishes instantly. Harmful content is blocked with a detailed report.",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <section className="py-28 px-6 bg-background text-foreground transition-colors duration-300">

      <div className="max-w-6xl mx-auto text-center">

        {/* TOP LABEL */}
        <p className="text-xs tracking-widest text-primary mb-4 uppercase">
          ⚙️ How It Works
        </p>

        {/* HEADING */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16">
          Three Steps to Safety
        </h2>

        {/* STEPS */}
        <div className="grid md:grid-cols-3 gap-12">

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">

              {/* ICON CIRCLE */}
              <div
                className={`
                  w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-6
                  bg-gradient-to-br ${step.color}
                  shadow-glow
                `}
              >
                {step.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {step.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-muted-foreground max-w-xs">
                {step.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}