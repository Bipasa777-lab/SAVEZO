export default function RecentDetections() {
  const data = [
    { name: "speech_video.mp4", score: 87 },
    { name: "profile_pic.jpg", score: 3 },
    { name: "interview.mp4", score: 51 },
    { name: "avatar.png", score: 8 },
  ]

  return (
    <div>

      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        📁 Recent Detections
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {data.map((item) => {
          const isFake = item.score > 50

          return (
            <div
              key={item.name}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition"
            >

              <div className="h-20 rounded-lg bg-white/5 flex items-center justify-center text-3xl mb-4">
                {item.name.includes("mp4") ? "🎬" : "🖼️"}
              </div>

              <p className="text-sm font-medium mb-2 truncate">
                {item.name}
              </p>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  isFake
                    ? "bg-red-500/20 text-red-400"
                    : "bg-emerald-500/20 text-emerald-400"
                }`}
              >
                {item.score}% {isFake ? "Fake" : "Real"}
              </span>

            </div>
          )
        })}

      </div>

    </div>
  )
}