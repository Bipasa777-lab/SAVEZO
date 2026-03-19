"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Shield,
  User,
  Bookmark,
  MessageCircle,
  Globe,
} from "lucide-react"

export function SidebarLeft() {
  const pathname = usePathname()

  const navigation = [
    { icon: <Home size={18} />, label: "Home Feed", path: "/dashboard" },
    { icon: <User size={18} />, label: "My Profile", path: "/profile" },
    {
      icon: <Shield size={18} />,
      label: "AI Detection",
      path: "/detection",
      badge: "NEW",
    },
    { icon: <Bookmark size={18} />, label: "Saved Posts", path: "/saved" },
    { icon: <MessageCircle size={18} />, label: "Messages", path: "/messages", badge: "3" },
    { icon: <Globe size={18} />, label: "Explore", path: "/explore" },
  ]

  const groups = [
    { color: "bg-purple-500", name: "AI Researchers" },
    { color: "bg-blue-500", name: "Digital Safety" },
    { color: "bg-green-500", name: "Tech Founders" },
  ]

  return (
    <aside className="w-[260px] h-[calc(100vh-68px)] sticky top-[68px] p-5 border-r border-border bg-background flex flex-col justify-between transition-colors duration-300">

      {/* NAVIGATION */}
      <div>
        <p className="text-xs text-muted-foreground tracking-widest mb-3 px-2">
          NAVIGATION
        </p>

        <div className="space-y-1">
          {navigation.map((item, i) => {
            const isActive = pathname === item.path

            return (
              <Link
                key={i}
                href={item.path}
                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition
                  ${
                    isActive
                      ? "bg-primary/10 border border-primary/30 text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* GROUPS */}
        <p className="text-xs text-muted-foreground tracking-widest mt-8 mb-3 px-2">
          MY GROUPS
        </p>

        <div className="space-y-2">
          {groups.map((group, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-2 text-muted-foreground"
            >
              <div className={`w-3 h-3 rounded-full ${group.color}`} />
              <span className="text-sm">{group.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI SHIELD CARD */}
      <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center gap-2 font-semibold text-sm mb-1 text-foreground">
          🛡️ AI Shield Active
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          All content in your feed has passed AI safety checks.
        </p>

        <p className="text-primary text-xs mt-2">
          3 posts blocked today
        </p>
      </div>

    </aside>
  )
}