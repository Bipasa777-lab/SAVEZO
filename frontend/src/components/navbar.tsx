"use client";

import { Bell, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";
import { getMockNotifications } from "@/services/notificationService";

export default function Navbar() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean | null>(null);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const notifications = getMockNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target as Node)
      ) {
        setNotifOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load Theme
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("savezo-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  // Toggle Theme
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("savezo-theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("savezo-theme", "dark");
      setIsDark(true);
    }
  };

  // Prevent hydration mismatch
  if (isDark === null) return null;

  return (
    <nav className="sticky top-0 z-50 h-[68px] flex items-center justify-between px-8 bg-background border-b border-border">
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg shadow-lg">
          🛡️
        </div>
        <span className="text-xl font-extrabold text-foreground">
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

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-10 h-10 rounded-lg flex items-center justify-center bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary transition"
          >
            <Bell size={18} />

            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 text-[10px] rounded-full bg-primary text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && <NotificationDropdown />}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-lg flex items-center justify-center bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary transition"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white bg-gradient-to-br from-blue-500 to-purple-500"
          >
            AJ
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 w-44 rounded-lg border border-border bg-card shadow-lg overflow-hidden">

              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-muted"
              >
                My Profile
              </Link>

              <Link
                href="/detection"
                className="block px-4 py-2 hover:bg-muted"
              >
                AI Detection
              </Link>

              <div className="border-t border-border"></div>

              <button className="w-full text-left px-4 py-2 hover:bg-red-500/20 text-red-500">
                Sign Out
              </button>

            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

function NavItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="px-4 h-11 flex items-center rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition"
    >
      {label}
    </Link>
  );
}