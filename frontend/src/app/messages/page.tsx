"use client";

import { useState } from "react";
import ConversationList from "@/components/messages/ConversationList";
import ChatWindow from "@/components/messages/ChatWindow";
import InfoPanel from "@/components/messages/InfoPanel";

export type Message = {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
};

export type Conversation = {
  id: string;
  name: string;
  initials: string;
  messages: Message[];
};

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "Alex Rivera",
      initials: "AR",
      messages: [
        { id: "1", fromMe: false, text: "Hey!", time: "10:00 AM" },
        { id: "2", fromMe: true, text: "Hello 👋", time: "10:01 AM" },
      ],
    },
    {
      id: "2",
      name: "Zara Mitchell",
      initials: "ZM",
      messages: [
        { id: "1", fromMe: false, text: "Check this out", time: "9:00 AM" },
      ],
    },
  ]);

  const [activeId, setActiveId] = useState("1");

  const activeConv = conversations.find((c) => c.id === activeId)!;

  const sendMessage = (text: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [
                ...c.messages,
                {
                  id: Date.now().toString(),
                  fromMe: true,
                  text,
                  time: "Now",
                },
              ],
            }
          : c
      )
    );
  };

  return (
    <div className="h-[calc(100vh-68px)] flex bg-background text-foreground transition-colors">
      
      {/* CONVERSATION LIST (LEFT PANEL) */}
      <div
        className="
          w-[340px]
          border-r border-border
          bg-card
          flex flex-col
        "
      >
        <ConversationList
          conversations={conversations}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      </div>

      {/* CHAT WINDOW (CENTER PANEL) */}
      <div
        className="
          flex-1
          flex
          flex-col
          bg-background
        "
      >
        <ChatWindow
          conversation={activeConv}
          onSend={sendMessage}
        />
      </div>

      {/* INFO PANEL (RIGHT PANEL) */}
      <div
        className="
          hidden xl:flex
          w-[320px]
          border-l border-border
          bg-card
        "
      >
        <InfoPanel conversation={activeConv} />
      </div>

    </div>
  );
}