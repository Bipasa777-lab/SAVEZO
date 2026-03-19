export interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
  type: "ai" | "like" | "success" | "warning";
}