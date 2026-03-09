export function SidebarRight() {
  return (
    <aside className="h-screen sticky top-16 p-6 border-l border-white/10 bg-[#0d1320]">
      <h3 className="text-lg font-semibold mb-6">AI Activity</h3>

      <div className="space-y-4 text-sm text-gray-400">
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          ✅ 12 Safe Posts Today
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          ⚠️ 2 Risk Warnings
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          ❌ 1 Blocked Content
        </div>
      </div>
    </aside>
  )
}