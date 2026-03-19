"use client";

import { useState } from "react";

export default function ProfileTabs({
  onChange,
}: {
  onChange: (tab: string) => void;
}) {
  const [active, setActive] = useState("posts");

  const tabs = ["posts", "media", "saved", "analytics"];

  const handleTab = (tab: string) => {
    setActive(tab);
    onChange(tab);
  };

  return (
    <div className="mt-10 border-b border-gray-700 flex gap-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTab(tab)}
          className={`pb-3 capitalize transition ${
            active === tab
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab === "analytics" ? "AI Analytics" : tab}
        </button>
      ))}
    </div>
  );
}