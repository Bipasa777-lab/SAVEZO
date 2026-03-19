"use client";

import { VideoPlayer } from "./VideoPlayer";
import { Heart, MessageCircle, Share2 } from "lucide-react";

type PostCardProps = {
  author: string;
  initials: string;
  time: string;
  text: string;
  variant?: "video" | "split" | "gallery" | "alert" | "text";
};

export function PostCard({
  author,
  initials,
  time,
  text,
  variant = "text",
}: PostCardProps) {
  return (
    <div className="bg-card backdrop-blur-xl border border-border rounded-2xl overflow-hidden mb-8 shadow-card transition-colors duration-300">

      {/* Header */}
      <div className="flex justify-between items-center p-5">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-accent-gradient flex items-center justify-center font-bold text-white">
            {initials}
          </div>

          <div>
            <div className="font-semibold text-sm text-foreground">{author}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              {time} 🌍
            </div>
          </div>
        </div>

        <span className="text-xs bg-safe/20 text-safe px-3 py-1 rounded-full border border-safe/30">
          ✔ Verified
        </span>
      </div>

      {/* Text Content */}
      {variant !== "alert" && (
        <div className="px-5 pb-4 text-muted-foreground leading-relaxed">
          {text}
        </div>
      )}

      {/* Video Post */}
      {variant === "video" && (
        <div className="relative">
          <VideoPlayer />

          <div className="absolute top-3 right-3 bg-safe text-white text-xs px-3 py-1 rounded-full">
            ✔ AI Safe
          </div>
        </div>
      )}

      {/* Split Image Post */}
      {variant === "split" && (
        <div className="grid grid-cols-2">
          <div className="h-48 bg-muted flex items-center justify-center text-3xl">
            🏛️
          </div>

          <div className="h-48 bg-muted flex items-center justify-center text-3xl">
            🎤
          </div>
        </div>
      )}

      {/* Gallery Post */}
      {variant === "gallery" && (
        <div className="grid grid-cols-2 grid-rows-2">
          <div className="col-span-2 h-56 bg-muted flex items-center justify-center text-3xl">
            🌅
          </div>

          <div className="h-40 bg-muted flex items-center justify-center text-3xl">
            🌊
          </div>

          <div className="h-40 bg-muted flex items-center justify-center text-xl">
            +4
          </div>
        </div>
      )}

      {/* Alert Post */}
      {variant === "alert" && (
        <div className="p-6 bg-danger/10 border-t border-danger/30">
          <h3 className="text-danger font-semibold mb-2">
            ⚠ Suicide Risk Detected
          </h3>

          <p className="text-sm text-muted-foreground">
            Our AI detected content that may relate to self-harm. This post has
            been flagged for safety review.
          </p>

          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-warning w-[73%]" />
          </div>
        </div>
      )}

      {/* Reactions & Actions */}
      {variant !== "alert" && (
        <>
          <div className="flex justify-between items-center px-5 py-3 text-xs text-muted-foreground border-b border-border">
            <div className="flex items-center gap-2">
              <span>👍 ❤️ 😄</span>
              <span>Samira, Mia and 1.2K others</span>
            </div>

            <div>247 comments · 89 shares</div>
          </div>

          <div className="flex justify-between px-5 py-3 text-muted-foreground text-sm">
            <button className="flex items-center gap-2 hover:text-foreground transition">
              <Heart size={16} />
              Like
            </button>

            <button className="flex items-center gap-2 hover:text-foreground transition">
              <MessageCircle size={16} />
              Comment
            </button>

            <button className="flex items-center gap-2 hover:text-foreground transition">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </>
      )}
    </div>
  );
}