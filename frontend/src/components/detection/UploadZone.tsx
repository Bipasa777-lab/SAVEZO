"use client"

import { useRef, useState } from "react"

interface Props {
  file: File | null
  setFile: (file: File | null) => void
}

export default function UploadZone({ file, setFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = (file: File) => {
    setFile(file)
  }

  const hasFile = !!file

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        if (e.dataTransfer.files[0]) {
          handleFile(e.dataTransfer.files[0])
        }
      }}
      className={`
        border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer
        transition-all duration-300
        ${
          dragging
            ? "border-primary bg-primary/10"
            : hasFile
            ? "border-safe bg-safe/5"
            : "border-border bg-background"
        }
        hover:border-primary hover:bg-primary/5
      `}
    >

      {/* ICON */}
      <div className="text-5xl mb-5">
        🖼️
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-semibold text-foreground mb-2 truncate">
        {hasFile ? file.name : "Drop Video or Image"}
      </h3>

      {/* SUBTEXT */}
      <p className="text-muted-foreground text-sm mb-5">
        {hasFile
          ? "Ready for deepfake analysis"
          : "Drag & drop or click to select file"}
      </p>

      {/* FORMATS */}
      <div className="flex flex-wrap justify-center gap-2">
        {["MP4", "MOV", "AVI", "JPG", "PNG", "WEBM"].map((f) => (
          <span
            key={f}
            className="px-3 py-1 text-xs rounded-full border border-border text-muted-foreground bg-muted"
          >
            {f}
          </span>
        ))}
      </div>

      {/* INPUT */}
      <input
        type="file"
        ref={inputRef}
        hidden
        accept="image/*,video/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
          }
        }}
      />
    </div>
  )
}