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
    <section className="py-24 px-6 bg-[#0d1320]">

      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          Intelligent AI Moderation
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Advanced machine learning models ensure safer digital ecosystems
          by preventing harmful media before it spreads.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-blue-500/40 transition duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

    </section>
  )
}