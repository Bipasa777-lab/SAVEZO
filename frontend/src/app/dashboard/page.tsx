import { SidebarLeft } from "@/components/dashboard/SidebarLeft"
import { SidebarRight } from "@/components/dashboard/SidebarRight"
import { PostCard } from "@/components/dashboard/PostCard"

export default function Dashboard() {
  return (
    <div className="pt-16 grid grid-cols-[260px_1fr_280px] min-h-screen">
      <SidebarLeft />
      <main className="p-6 max-w-2xl mx-auto">
        <PostCard />
      </main>
      <SidebarRight />
    </div>
  )
}
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function PostCard() {
  return (
    <Card className="bg-cardBg border border-white/10 p-4 mb-6">
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold">
            AR
          </div>
          <div>
            <div className="font-semibold">Alex Rivera</div>
            <div className="text-xs text-gray-400">2 hours ago</div>
          </div>
        </div>

        <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
          ✅ Verified
        </span>
      </div>

      <p className="mb-4">
        Incredible drone footage captured last night ✨
      </p>

      <video
        className="rounded-xl w-full mb-4"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        controls
      />

      <div className="flex justify-between text-gray-400 text-sm">
        <Button variant="ghost">Like</Button>
        <Button variant="ghost">Comment</Button>
        <Button variant="ghost">Share</Button>
      </div>
    </Card>
  )
}
