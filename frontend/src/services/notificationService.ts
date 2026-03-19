import { Notification } from "@/types/notification";

export function getMockNotifications(): Notification[] {
  return [
    {
      id: "1",
      message:
        "AI System flagged your recent upload — Deepfake probability 72%",
      time: "2 minutes ago",
      read: false,
      type: "ai",
    },
    {
      id: "2",
      message:
        "Alex Rivera liked your post about AI safety",
      time: "15 minutes ago",
      read: false,
      type: "like",
    },
    {
      id: "3",
      message:
        "Your post passed all AI safety checks and is now live",
      time: "1 hour ago",
      read: true,
      type: "success",
    },
    {
      id: "4",
      message:
        "Content Warning: A post you reported has been reviewed",
      time: "3 hours ago",
      read: true,
      type: "warning",
    },
  ];
}