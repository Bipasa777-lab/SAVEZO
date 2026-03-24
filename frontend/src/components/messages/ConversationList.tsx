"use client";

import { useState } from "react";
import { Conversation } from "@/app/messages/page";
import { Search, Plus } from "lucide-react";

export default function ConversationList({
  conversations,
  activeId,
  setActiveId,
}: {
  conversations: Conversation[];
  activeId: string;
  setActiveId: (id: string) => void;
}) {
  const [search, setSearch] = useState("");

  return (
    <div className="h-full flex flex-col bg-card px-5 py-5 transition-colors">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
          Messages
        </h2>

        <button className="w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center hover:bg-muted/80 transition">
          <Plus size={18} className="text-muted-foreground" />
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative mb-5">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search messages..."
          className="
            w-full pl-9 pr-4 py-2.5
            rounded-xl
            bg-muted
            border border-border
            outline-none
            text-sm text-foreground
            placeholder:text-muted-foreground
            focus:border-primary/40
            transition
          "
        />
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-5 text-sm">
        <button className="px-4 py-1.5 rounded-full bg-primary text-white font-medium">
          All
        </button>

        <button className="px-4 py-1.5 rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition">
          Unread
        </button>

        <button className="px-4 py-1.5 rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition">
          Groups
        </button>
      </div>

      {/* CONVERSATIONS */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {conversations.map((c) => {
          const lastMsg = c.messages[c.messages.length - 1];

          return (
            <div
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition
                ${
                  activeId === c.id
                    ? "bg-primary/10 border border-primary/30"
                    : "hover:bg-muted"
                }
              `}
            >
              {/* AVATAR */}
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {c.initials}
                </div>

                {/* ONLINE DOT */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
              </div>

              {/* TEXT */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-[2px]">
                  <span className="font-semibold text-sm text-foreground">
                    {c.name}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {lastMsg?.time}
                  </span>
                </div>

                <div className="text-xs text-muted-foreground truncate">
                  {lastMsg?.text}
                </div>
              </div>

              {/* UNREAD BADGE */}
              <div className="ml-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-white font-medium">
                  3
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}