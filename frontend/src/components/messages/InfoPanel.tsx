"use client";

import { Conversation } from "@/app/messages/page";
import { Phone, Video, Info } from "lucide-react";

export default function InfoPanel({
  conversation,
}: {
  conversation: Conversation;
}) {
  return (
    <div className="w-[300px] border-l border-border bg-card p-5 hidden lg:flex flex-col gap-6 transition-colors">
      
      {/* PROFILE SECTION */}
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold mb-3">
          {conversation.initials}
        </div>

        <h3 className="font-semibold text-lg text-foreground">
          {conversation.name}
        </h3>

        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
          ● Active now
        </p>

        <span className="mt-2 text-xs px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
          ✔ Verified
        </span>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-center gap-3">
        <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition">
          <Phone size={18} />
        </button>

        <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition">
          <Video size={18} />
        </button>

        <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition">
          <Info size={18} />
        </button>
      </div>

      {/* SECTION: ABOUT */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h4 className="text-sm font-semibold text-foreground mb-2">
          About
        </h4>

        <p className="text-xs text-muted-foreground leading-relaxed">
          This conversation is secured and monitored by Savezo AI safety
          systems to ensure safe and meaningful interactions.
        </p>
      </div>

      {/* SECTION: SHARED MEDIA */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Shared Media
        </h4>

        <div className="grid grid-cols-3 gap-2">
          <div className="h-16 bg-muted rounded-lg" />
          <div className="h-16 bg-muted rounded-lg" />
          <div className="h-16 bg-muted rounded-lg" />
        </div>
      </div>

      {/* SECTION: ACTIONS */}
      <div className="mt-auto">
        <button className="w-full py-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500/20 transition text-sm">
          Block User
        </button>
      </div>

    </div>
  );
}