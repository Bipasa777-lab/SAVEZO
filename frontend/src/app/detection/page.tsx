"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

export default function DetectionPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        AI Deepfake Detection
      </h1>

      <UploadZone />
    </div>
  )
}

function UploadZone() {
  const [file, setFile] = useState<File | null>(null)

  return (
    <Card className="p-6 border-dashed border-2 border-gray-300">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {file && (
        <p className="mt-4 text-sm text-gray-500">
          Uploaded: {file.name}
        </p>
      )}
    </Card>
  )
}