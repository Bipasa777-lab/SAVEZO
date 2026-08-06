"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { SidebarLeft } from "@/components/dashboard/SidebarLeft";
import { SidebarRight } from "@/components/dashboard/SidebarRight";
import { PostCard } from "@/components/dashboard/PostCard";
import { CreatePostModal } from "@/components/dashboard/CreatePostModal";
import { StoriesBar } from "@/components/dashboard/StoriesBar";

import api from "@/lib/api";

export default function Dashboard() {
  const router = useRouter();

  const [mongoPosts, setMongoPosts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] =
    useState<any>(null);

  // ==========================
  // INITIALIZE USER
  // ==========================
  useEffect(() => {
    const defaultUser = {
      _id: "demo-user-1",
      name: "Alex Johnson",
      username: "alexjohnson",
      email: "alex@savezo.io",
      profilePicture: "",
    };

    const user = localStorage.getItem("savezoUser");
    if (user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch {
        setCurrentUser(defaultUser);
        localStorage.setItem("savezoUser", JSON.stringify(defaultUser));
      }
    } else {
      setCurrentUser(defaultUser);
      localStorage.setItem("savezoUser", JSON.stringify(defaultUser));
    }

    if (!localStorage.getItem("token")) {
      localStorage.setItem("token", "demo-token-12345");
    }
  }, []);

  const DEFAULT_POSTS = [
    {
      _id: "demo-post-1",
      userName: "Sarah Connor",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      text: "Testing Savezo's AI content moderation! So glad to have a safe space for posting without toxic content. 🛡️✨",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
      likes: 24,
      comments: 5,
      shares: 2,
      saved: false,
    },
    {
      _id: "demo-post-2",
      userName: "David Chen",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      text: "Deepfake detection system tested on our recent video upload. 99.4% accuracy rate verified! 🚀",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      likes: 42,
      comments: 11,
      shares: 8,
      saved: true,
    },
    {
      _id: "demo-post-3",
      userName: "Elena Rostova",
      createdAt: new Date(Date.now() - 14400000).toISOString(),
      text: "Beautiful sunset from the tech park today. Mental health wellness check-in: Remember to take breaks! 🌄💙",
      image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&q=80",
      likes: 89,
      comments: 18,
      shares: 14,
      saved: false,
    },
  ];

  // ==========================
  // FETCH POSTS
  // ==========================
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      if (Array.isArray(res.data) && res.data.length > 0) {
        setMongoPosts(res.data);
      } else {
        setMongoPosts(DEFAULT_POSTS);
      }
    } catch (error) {
      console.warn("Backend API offline, using default posts:", error);
      setMongoPosts(DEFAULT_POSTS);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ==========================
  // REALTIME NEW POST
  // ==========================
  const handleAddPost = (
    newPost: any
  ) => {
    setMongoPosts((prev) => [
      newPost,
      ...prev,
    ]);
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-[260px_1fr_280px]
        min-h-[calc(100vh-68px)]
        bg-background
        text-foreground
        transition-colors
        duration-300
      "
    >
      {/* LEFT SIDEBAR */}
      <aside className="hidden lg:block border-r border-border">
        <SidebarLeft />
      </aside>

      {/* FEED */}
      <main className="flex justify-center px-4 sm:px-6 py-6">
        <div className="w-full max-w-[620px]">

          {/* CREATE POST */}
          <CreatePostModal
            onPost={handleAddPost}
          />

          {/* STORIES */}
          <StoriesBar />

          {/* POSTS */}
          {mongoPosts.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No posts available
            </div>
          ) : (
            mongoPosts.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                author={
                  post.userName ||
                  "Unknown User"
                }
                initials={
                  post.userName
                    ?.charAt(0)
                    .toUpperCase() || "U"
                }
                time={new Date(
                  post.createdAt
                ).toLocaleString()}
                text={post.text}
                image={post.image}
                likes={post.likes || 0}
                comments={
                  post.comments || 0
                }
                shares={post.shares || 0}
                saved={
                  post.saved || false
                }
              />
            ))
          )}
        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="hidden lg:block border-l border-border">
        <SidebarRight />
      </aside>
    </div>
  );
}