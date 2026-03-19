"use client";

import { Notification } from "@/types/notification";

export default function NotificationItem({
  notification,
}: {
  notification: Notification;
}) {
  const getIcon = () => {
    switch (notification.type) {
      case "ai":
        return "🤖";
      case "like":
        return "👤";
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      default:
        return "🔔";
    }
  };

  const getBg = () => {
    switch (notification.type) {
      case "ai":
        return "bg-blue-500/20";
      case "like":
        return "bg-purple-500/20";
      case "success":
        return "bg-green-500/20";
      case "warning":
        return "bg-yellow-500/20";
      default:
        return "bg-gray-500/20";
    }
  };

  return (
    <div className="flex items-start gap-3 p-4 hover:bg-white/5 transition border-b border-gray-800">
      
      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${getBg()}`}
      >
        {getIcon()}
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm text-gray-200 leading-relaxed">
          {notification.message}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {notification.time}
        </p>
      </div>

      {/* Unread dot */}
      {!notification.read && (
        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
      )}
    </div>
  );
}