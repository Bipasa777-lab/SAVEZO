import { VideoPlayer } from "./VideoPlayer"
import { Heart, MessageCircle, Share2 } from "lucide-react"

export function PostCard() {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold">
            AR
          </div>

          <div>
            <div className="font-semibold text-sm">Alex Rivera</div>
            <div className="text-xs text-gray-400">2 hours ago</div>
          </div>
        </div>

        <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
          ✅ Verified
        </span>
      </div>

      {/* Content */}
      <p className="text-gray-300 mb-4">
        Incredible drone footage captured last night ✨
      </p>

      <VideoPlayer />

      {/* Actions */}
      <div className="flex justify-between mt-4 text-gray-400 text-sm">
        <button className="flex items-center gap-2 hover:text-white">
          <Heart size={16} /> Like
        </button>
        <button className="flex items-center gap-2 hover:text-white">
          <MessageCircle size={16} /> Comment
        </button>
        <button className="flex items-center gap-2 hover:text-white">
          <Share2 size={16} /> Share
        </button>
      </div>

    </div>
  )
}