"use client";

import { useState } from "react";
import NotificationItem from "./NotificationItem";
import { getMockNotifications } from "@/services/notificationService";
import { Notification } from "@/types/notification";

export default function NotificationDropdown() {
  const [notifications, setNotifications] =
    useState<Notification[]>(getMockNotifications());

  const markAllRead = () => {
    const updated = notifications.map((n) => ({
      ...n,
      read: true,
    }));
    setNotifications(updated);
  };

  return (
    <div className="absolute right-0 mt-3 w-80 rounded-xl bg-[#0d1320] border border-gray-800 shadow-2xl z-50">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h4 className="font-semibold text-white">Notifications</h4>
        <button
          onClick={markAllRead}
          className="text-sm text-blue-400 hover:underline"
        >
          Mark all read
        </button>
      </div>

      {/* List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((n) => (
          <NotificationItem key={n.id} notification={n} />
        ))}
      </div>
    </div>
  );
}