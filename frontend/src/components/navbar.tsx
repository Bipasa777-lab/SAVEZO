"use client"

import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-16 bg-black/60 backdrop-blur border-b border-white/10 z-50 flex items-center justify-between px-8">
      
      <Link href="/" className="flex items-center gap-2 font-bold text-xl">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          🛡️
        </div>
        Savezo
      </Link>

      <div className="flex gap-6 text-sm text-gray-400">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/detection">Detection</Link>
        <Link href="/profile">Profile</Link>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-4 h-4" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
          AJ
        </div>
      </div>
    </nav>
  )
}
