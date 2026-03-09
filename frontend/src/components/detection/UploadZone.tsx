"use client"

import { useState } from "react"

export function UploadZone() {
  const [fileName, setFileName] = useState<string | null>(null)

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 text-center hover:border-blue-500/40 transition">

      <input
        type="file"
        id="fileUpload"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            setFileName(e.target.files[0].name)
          }
        }}
      />

      <label htmlFor="fileUpload" className="cursor-pointer">

        <div className="text-5xl mb-4">🎬</div>

        <h3 className="text-lg font-semibold mb-2">
          {fileName ? fileName : "Drop or Click to Upload"}
        </h3>

        <p className="text-gray-400 text-sm">
          Supports image & video formats
        </p>

      </label>

    </div>
  )
}