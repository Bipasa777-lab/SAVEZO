import { UploadZone } from "@/components/detection/UploadZone"
import { DetectionResult } from "@/components/detection/DetectionResult"

export default function Detection() {
  return (
    <div className="pt-24 max-w-5xl mx-auto p-6 grid grid-cols-2 gap-8">
      <UploadZone />
      <DetectionResult />
    </div>
  )
}
"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

export function UploadZone() {
  const [file, setFile] = useState<File | null>(null)

  return (
    <Card className="p-10 border-dashed border-2 border-white/20 text-center">
      <input
        type="file"
        className="hidden"
        id="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <label htmlFor="file" className="cursor-pointer">
        <div className="text-5xl mb-4">🎬</div>
        <p className="font-semibold">
          {file ? file.name : "Drop or click to upload"}
        </p>
      </label>
    </Card>
  )
}