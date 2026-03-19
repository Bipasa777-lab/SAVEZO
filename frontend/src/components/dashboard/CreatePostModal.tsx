"use client"

import { useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export function CreatePostModal({ onPost }: { onPost: (post: any) => void }) {
  const [text, setText] = useState("")
  const [open, setOpen] = useState(false)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null)

  const [scanStatus, setScanStatus] = useState<
    "idle" | "scanning" | "safe" | "blocked"
  >("idle")

  const [riskScore, setRiskScore] = useState<number | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // 🔥 HANDLE FILE + AI SCAN
  const handleFile = (file: File) => {
    setSelectedFile(file)
    setOpen(true)

    setScanStatus("scanning")

    setTimeout(() => {
      const fakeRisk = Math.floor(Math.random() * 100)
      setRiskScore(fakeRisk)

      if (fakeRisk > 50) {
        setScanStatus("blocked")
      } else {
        setScanStatus("safe")
      }
    }, 2500)
  }

  const handlePhotoClick = () => {
    fileInputRef.current?.click()
    setOpen(true)
  }

  const handleLiveClick = () => {
    fileInputRef.current?.click()
    setOpen(true)
  }

  const handleFeelingClick = () => {
    setSelectedFeeling("😊 Happy")
    setOpen(true)
  }

  return (
    <div className="mb-6">

      <Dialog open={open} onOpenChange={setOpen}>

        {/* CREATE POST BOX */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-2xl p-4 shadow-card">

          <DialogTrigger asChild>
            <div className="flex items-center gap-3 mb-3 cursor-pointer group">

              <div className="w-10 h-10 rounded-full bg-accent-gradient flex items-center justify-center font-bold text-sm text-white">
                AJ
              </div>

              <div className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm text-muted-foreground group-hover:bg-muted transition">
                What's on your mind, Alex?
              </div>

            </div>
          </DialogTrigger>

          <div className="border-t border-border my-3" />

          <div className="flex justify-between text-sm text-muted-foreground">

            <button onClick={handleLiveClick} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted hover:text-foreground transition">
              🎬 <span>Live Video</span>
            </button>

            <button onClick={handlePhotoClick} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted hover:text-foreground transition">
              🖼 <span>Photo/Video</span>
            </button>

            <button onClick={handleFeelingClick} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted hover:text-foreground transition">
              😊 <span>Feeling</span>
            </button>

          </div>
        </div>

        {/* FILE INPUT */}
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="image/*,video/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0])
            }
          }}
        />

        {/* MODAL */}
        <DialogContent className="bg-card border border-border text-foreground rounded-xl shadow-card">

          {/* ✅ REQUIRED ACCESSIBILITY FIX */}
          <DialogTitle>
            <VisuallyHidden>Create Post</VisuallyHidden>
          </DialogTitle>

          {/* HEADER */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent-gradient flex items-center justify-center font-bold text-sm text-white">
              AJ
            </div>

            <div>
              <p className="font-semibold text-foreground">Alex Johnson</p>
              <p className="text-xs text-muted-foreground">🌍 Public</p>
            </div>
          </div>

          {/* TEXT */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind, Alex?"
            className="w-full bg-transparent border-none outline-none text-lg mb-4 text-foreground placeholder:text-muted-foreground"
          />

          {/* SCAN UI */}
          {scanStatus !== "idle" && selectedFile && (
            <div className="mb-4">

              {scanStatus === "scanning" && (
                <div className="h-52 rounded-xl bg-muted flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                  <p className="text-sm text-muted-foreground">🚫 AI Nude Scan Running...</p>
                </div>
              )}

              {scanStatus === "blocked" && (
                <div className="h-52 rounded-xl bg-red-600 flex flex-col items-center justify-center text-center text-white px-6">
                  <div className="text-4xl mb-2">🚫</div>
                  <h3 className="text-lg font-bold">Upload Rejected</h3>
                  <p className="text-3xl font-bold mt-1">{riskScore}% Nude Risk</p>
                  <p className="text-sm mt-1">Explicit content detected</p>

                  <button
                    onClick={() => {
                      setSelectedFile(null)
                      setScanStatus("idle")
                      setRiskScore(null)
                    }}
                    className="mt-3 px-4 py-2 bg-white text-red-600 rounded-full text-sm"
                  >
                    Try Different File
                  </button>
                </div>
              )}

              {scanStatus === "safe" && (
                <div className="relative h-52 rounded-xl bg-black flex items-center justify-center">
                  <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                    ✔ AI Verified Safe
                  </span>
                  <p className="text-muted-foreground text-sm">Preview Ready</p>
                </div>
              )}

            </div>
          )}

          {/* ACTION BAR */}
          <div className="flex items-center justify-between bg-muted border border-border rounded-xl p-3 mb-4">
            <span className="text-sm text-muted-foreground">Add to your post</span>

            <div className="flex gap-3 text-lg">
              <button onClick={handlePhotoClick}>🖼</button>
              <button onClick={handleFeelingClick}>😊</button>
              <button>📍</button>
            </div>
          </div>

          {/* POST BUTTON */}
          <Button
            disabled={scanStatus !== "safe"}
            onClick={() => {
              if (!selectedFile) return

              const newPost = {
                author: "Alex Johnson",
                initials: "AJ",
                time: "Just now",
                text: text || "New post",
                variant: "video",
              }

              onPost(newPost)

              // RESET
              setOpen(false)
              setText("")
              setSelectedFile(null)
              setScanStatus("idle")
              setRiskScore(null)
              setSelectedFeeling(null)
            }}
            className="w-full bg-accent-gradient text-white disabled:opacity-50"
          >
            Post
          </Button>

        </DialogContent>

      </Dialog>

    </div>
  )
}