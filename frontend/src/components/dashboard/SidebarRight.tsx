"use client"

import { Button } from "@/components/ui/button"

export function SidebarRight() {

  const suggested = [
    {
      name: "Zara Mitchell",
      desc: "AI Ethics • 12.4k followers",
      initials: "ZM",
      color: "from-purple-500 to-blue-500"
    },
    {
      name: "James Park",
      desc: "Cybersecurity • 8.1k followers",
      initials: "JP",
      color: "from-green-500 to-teal-500"
    },
    {
      name: "Layla Noor",
      desc: "ML Engineer • 5.7k followers",
      initials: "LN",
      color: "from-orange-500 to-pink-500"
    }
  ]

  const trending = [
    { category: "Technology", tag: "#DeepfakeDetection", posts: "14.2K posts" },
    { category: "AI Safety", tag: "#ContentModeration", posts: "8.9K posts" },
    { category: "Mental Health", tag: "#DigitalWellbeing", posts: "22.1K posts" },
    { category: "Platform Safety", tag: "#SafeSocialMedia", posts: "6.3K posts" }
  ]

  return (
    <aside className="w-[280px] h-[calc(100vh-68px)] sticky top-[68px] px-5 py-6 border-l border-border bg-background space-y-8 overflow-y-auto transition-colors duration-300">

      {/* Suggested Users */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-5 flex items-center gap-2">
          🤝 Suggested for You
        </h3>

        <div className="space-y-4">
          {suggested.map((user, i) => (
            <div key={i} className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-sm font-bold text-white`}
                >
                  {user.initials}
                </div>

                <div>
                  <div className="text-sm font-medium text-foreground">
                    {user.name}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {user.desc}
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="text-xs border-border text-foreground hover:bg-muted"
              >
                Follow
              </Button>

            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-5 flex items-center gap-2">
          🔥 Trending Topics
        </h3>

        <div className="space-y-4">
          {trending.map((trend, i) => (
            <div
              key={i}
              className="pb-3 border-b border-border cursor-pointer hover:text-foreground transition"
            >
              <div className="text-xs text-muted-foreground">
                {trend.category}
              </div>

              <div className="text-sm font-semibold text-foreground">
                {trend.tag}
              </div>

              <div className="text-xs text-muted-foreground">
                {trend.posts}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Activity */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">

        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-foreground">
          🛡️ Today's AI Activity
        </h3>

        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Media Uploads Scanned</span>
          <span className="text-safe font-semibold">1,247</span>
        </div>

        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Unsafe Content Blocked</span>
          <span className="text-danger font-semibold">32</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Users Protected</span>
          <span className="text-primary font-semibold">892</span>
        </div>

      </div>

    </aside>
  )
}