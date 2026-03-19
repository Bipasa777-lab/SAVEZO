export function Features() {
  const features = [
    {
      title: "Deepfake Detection",
      desc: "AI-powered frame-level analysis to identify manipulated videos with confidence scoring.",
      icon: "🎭",
    },
    {
      title: "Explicit Content Filter",
      desc: "Pre-publication NSFW detection to prevent harmful or inappropriate uploads.",
      icon: "🚫",
    },
    {
      title: "Suicide Risk Prevention",
      desc: "AI-based self-harm content detection to protect vulnerable users.",
      icon: "🛡️",
    },
  ]

  return (
    <section className="py-24 px-6 bg-background text-foreground transition-colors duration-300">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-foreground">
          Intelligent AI Moderation
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          Advanced machine learning models ensure safer digital ecosystems
          by preventing harmful media before it spreads.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition duration-300 shadow-card"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>

            <h3 className="text-xl font-semibold mb-3 text-foreground">
              {feature.title}
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

    </section>
  )
}