"use client";

import { Bell, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";
import { getMockNotifications } from "@/services/notificationService";

export default function Navbar() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const notifRef = useRef<HTMLDivElement>(null);

  // ✅ Notification count
  const notifications = getMockNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  // ✅ Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Load theme
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // ✅ Toggle theme
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <nav className="sticky top-0 z-50 h-[68px] flex items-center justify-between px-8 bg-[#0d1320] border-b border-white/10">
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg shadow-lg">
          🛡️
        </div>
        <span className="text-xl font-extrabold text-white">
          Savezo
        </span>
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-2">
        <NavItem href="/dashboard" label="Dashboard" />
        <NavItem href="/detection" label="Detection" />
        <NavItem href="/faq" label="FAQ" />
        <NavItem href="/profile" label="Profile" />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 relative">

        {/* 🔔 Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-blue-400 transition"
          >
            <Bell size={18} />

            {/* Unread Badge */}
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 text-[10px] rounded-full bg-blue-500 text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {notifOpen && <NotificationDropdown />}
        </div>

        {/* 🌙 / ☀️ Theme */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-blue-400 transition"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* 👤 Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white bg-gradient-to-br from-blue-500 to-purple-500"
          >
            AJ
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 w-44 rounded-lg border border-white/10 bg-[#0d1320] shadow-lg overflow-hidden">
              <Link href="/profile" className="block px-4 py-2 hover:bg-white/10">
                My Profile
              </Link>

              <Link href="/detection" className="block px-4 py-2 hover:bg-white/10">
                AI Detection
              </Link>

              <div className="border-t border-white/10"></div>

              <button className="w-full text-left px-4 py-2 hover:bg-red-500/20 text-red-400">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-4 h-11 flex items-center rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition"
    >
      {label}
    </Link>
  );
}