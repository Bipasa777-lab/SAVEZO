"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function CreatePostModal() {
  const [text, setText] = useState("")

  return (
    <div className="mb-8">

      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl cursor-pointer hover:bg-white/10 transition">
            What's on your mind?
          </div>
        </DialogTrigger>

        <DialogContent className="bg-[#0d1320] border border-white/10 text-white">
          <h2 className="text-lg font-semibold mb-4">Create Post</h2>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something..."
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm mb-4 focus:outline-none"
          />

          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500">
            Post with AI Scan
          </Button>
        </DialogContent>
      </Dialog>

    </div>
  )
}