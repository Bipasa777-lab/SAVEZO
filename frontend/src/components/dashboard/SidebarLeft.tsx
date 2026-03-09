import { Home, Shield, User, Settings } from "lucide-react"

export function SidebarLeft() {
  const menu = [
    { icon: <Home size={18} />, label: "Home" },
    { icon: <Shield size={18} />, label: "AI Detection" },
    { icon: <User size={18} />, label: "Profile" },
    { icon: <Settings size={18} />, label: "Settings" },
  ]

  return (
    <aside className="h-screen sticky top-16 p-6 border-r border-white/10 bg-[#0d1320]">
      <div className="space-y-4">
        {menu.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition"
          >
            {item.icon}
            <span className="text-sm text-gray-300">{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}