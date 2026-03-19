"use client"

import { useState } from "react"
import { SidebarLeft } from "@/components/dashboard/SidebarLeft"
import { SidebarRight } from "@/components/dashboard/SidebarRight"
import { PostCard } from "@/components/dashboard/PostCard"
import { CreatePostModal } from "@/components/dashboard/CreatePostModal"

type DashboardPost = {
  id: number
  author: string
  initials: string
  time: string
  text: string
  variant: "video" | "split" | "gallery" | "alert" | "text"
}

export default function Dashboard() {

  // 🧠 POSTS STATE
  const [posts, setPosts] = useState<DashboardPost[]>([
    {
      id: 1,
      author: "Alex Rivera",
      initials: "AR",
      time: "2 hours ago",
      text: "Incredible drone footage I captured over the city last night 🌃✨",
      variant: "video",
    },
    {
      id: 2,
      author: "Samira Khan",
      initials: "SK",
      time: "5 hours ago",
      text: "Amazing day at the AI Safety Conference! #DigitalWellbeing",
      variant: "split",
    },
    {
      id: 3,
      author: "James Park",
      initials: "JP",
      time: "8 hours ago",
      text: "Quick tutorial I made on how to spot AI-generated deepfake videos.",
      variant: "video",
    },
    {
      id: 4,
      author: "AI Safety System",
      initials: "⚠",
      time: "System Alert",
      text: "",
      variant: "alert",
    },
    {
      id: 5,
      author: "Mia Laurent",
      initials: "ML",
      time: "Yesterday",
      text: "Weekend vibes 🌞 Nature is the best therapy.",
      variant: "gallery",
    },
    {
      id: 6,
      author: "Zara Mitchell",
      initials: "ZM",
      time: "2 days ago",
      text: "Thread 🧵 on why AI-powered moderation is the only scalable solution for platform safety.",
      variant: "text",
    },
  ])

  // ➕ ADD POST FUNCTION
  const handleAddPost = (newPost: Omit<DashboardPost, "id">) => {
    const postWithId: DashboardPost = {
      ...newPost,
      id: Date.now(), // ✅ unique id
    }

    setPosts((prev) => [postWithId, ...prev])
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] min-h-[calc(100vh-68px)] bg-background text-foreground transition-colors duration-300">

      {/* LEFT SIDEBAR */}
      <aside className="hidden lg:block border-r border-border">
        <SidebarLeft />
      </aside>

      {/* FEED */}
      <main className="flex justify-center px-4 sm:px-6 py-6">
        <div className="w-full max-w-[620px]">

          {/* CREATE POST */}
          <CreatePostModal onPost={handleAddPost} />

          {/* POSTS */}
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}

        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="hidden lg:block border-l border-border">
        <SidebarRight />
      </aside>

    </div>
  )
}