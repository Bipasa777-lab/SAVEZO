"use client";

import { useRef, useState, useEffect } from "react";
import { StoryViewer } from "./StoryViewer";
import { CreateStoryModal } from "./CreateStoryModal";
import { TextStoryModal } from "./TextStoryModal";
import { PhotoStoryModal } from "./PhotoStoryModal";
import api from "@/lib/api";

interface Story {
  id: string | number;
  image?: string; // photo story
  text?: string; // text story OR caption overlaid on a photo
  background?: string; // tailwind gradient classes, used when there's no image
  createdAt: string;
  audio?: string;
  audioLabel?: string;
}

interface UserStories {
  id: string | number;
  create?: false;
  name: string;
  avatar?: string; // profile photo, separate from the story content itself
  viewersCount?: number;
  viewed?: boolean;
  stories: Story[];
}

interface CreateCard {
  id: string | number;
  create: true;
  previewImage?: string;
}

type StoriesBarItem = CreateCard | UserStories;

// Reserved id for the logged-in user's own story group, kept separate from
// any seeded "friend" ids so uploads always land in the right bucket.
const CURRENT_USER_ID = -1;
const CURRENT_USER_NAME = "Alex Johnson";

const DEFAULT_STORIES_ITEMS: UserStories[] = [
  {
    id: "user-sarah",
    name: "Sarah C.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    viewed: false,
    stories: [
      {
        id: "s1",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80",
        text: "Morning coding session ☕",
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: "user-david",
    name: "David K.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    viewed: false,
    stories: [
      {
        id: "s2",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
        text: "AI Safety Summit 2026 🛡️",
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: "user-elena",
    name: "Elena R.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    viewed: false,
    stories: [
      {
        id: "s3",
        background: "from-purple-600 to-pink-500",
        text: "Stay safe online everyone! 🌟",
        createdAt: new Date().toISOString(),
      },
    ],
  },
];

export function StoriesBar() {
  const [userProfile, setUserProfile] = useState<any>(null);

  const [stories, setStories] = useState<StoriesBarItem[]>([]);

  const [selectedUser, setSelectedUser] = useState<UserStories | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [showTextStory, setShowTextStory] = useState(false);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [editingStory, setEditingStory] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState<string | number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const currentUser = JSON.parse(
        localStorage.getItem("savezoUser") || "{}"
      );
      setUserProfile(currentUser);

      try {
        const storiesRes = await api.get("/stories");
        if (Array.isArray(storiesRes.data) && storiesRes.data.length > 0) {
          const grouped: any = {};
          storiesRes.data.forEach((story: any) => {
            if (!grouped[story.userName]) {
              grouped[story.userName] = {
                id: story.userName,
                name: story.userName,
                avatar: story.avatar || "",
                stories: [],
              };
            }
            grouped[story.userName].stories.push({
              id: story._id,
              image: story.image,
              text: story.text,
              background: story.background,
              createdAt: story.createdAt,
            });
          });
          const mongoStories = Object.values(grouped) as UserStories[];
          setStories([
            {
              id: 1,
              create: true,
              previewImage: currentUser?.profilePicture || "",
            },
            ...mongoStories,
          ]);
          return;
        }
      } catch (apiErr) {
        console.warn("Backend API offline, using default stories:", apiErr);
      }

      setStories([
        {
          id: 1,
          create: true,
          previewImage: currentUser?.profilePicture || "",
        },
        ...DEFAULT_STORIES_ITEMS,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const isUserStories = (item: StoriesBarItem): item is UserStories => !item.create;

  const addOwnStory = (story: Story) => {
    setStories((prev) => {
      const createCard = prev[0];
      const rest = prev.slice(1);
      const existingIndex = rest.findIndex((item) => item.id === CURRENT_USER_ID);

      let updatedGroup: UserStories;
      let withoutOwnGroup: StoriesBarItem[];

      if (existingIndex !== -1) {
        const existing = rest[existingIndex] as UserStories;
        updatedGroup = { ...existing, viewed: false, stories: [story, ...existing.stories] };
        withoutOwnGroup = rest.filter((_, i) => i !== existingIndex);
      } else {
        updatedGroup = {
          id: CURRENT_USER_ID,
          name: CURRENT_USER_NAME,
          stories: [story],
        };
        withoutOwnGroup = rest;
      }

      const next = [createCard, updatedGroup, ...withoutOwnGroup];
      setSelectedUser(updatedGroup);
      setCurrentIndex(0);
      return next;
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedPhotoFile(file);
    setShowPhotoModal(true);
    e.target.value = "";
  };

  const handlePublishPhotoStory = async ({ image, text }: { image: string; text: string }) => {
    const newStoryItem: Story = {
      id: "story-" + Date.now(),
      image,
      text,
      createdAt: new Date().toISOString(),
    };

    try {
      if (editingStory) {
        await api.put(`/stories/${editingStory.stories[0].id}`, {
          image,
          text,
        });
        setEditingStory(null);
        await fetchStories();
        return;
      }

      const currentUser = JSON.parse(
        localStorage.getItem("savezoUser") || "{}"
      );

      await api.post("/stories", {
        userId: currentUser._id,
        userName: currentUser.name || currentUser.username || CURRENT_USER_NAME,
        avatar: currentUser.profilePicture || "",
        image,
        text,
        background: "",
      });

      await fetchStories();
    } catch (error) {
      console.warn("Backend API offline/error, adding story locally:", error);
      addOwnStory(newStoryItem);
    }
  };

  const handleCardClick = (item: StoriesBarItem) => {
    if (item.create) {
      setShowCreateStory(true);
      return;
    }

    setSelectedUser(item);
    setCurrentIndex(0);
    setStories((prev) =>
      prev.map((s) => (s.id === item.id && isUserStories(s) ? { ...s, viewed: true } : s))
    );
  };

  return (
    <>
      {/* Hidden File Input */}
      <input
        type="file"
        hidden
        accept="image/*,video/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      {/* Stories Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Stories</h3>
          <button className="text-xs text-blue-500 hover:text-blue-400 transition">View All</button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {stories.map((item) => {
            const preview = item.create ? null : item.stories[0];

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="
                  relative
                  flex-shrink-0
                  w-[120px]
                  h-[210px]
                  rounded-2xl
                  overflow-hidden
                  border
                  border-border
                  bg-card
                  cursor-pointer
                  shadow-card
                  hover:scale-[1.03]
                  transition-all
                  duration-300
                "
              >
                {item.create ? (
                  item.previewImage ? (
                    <img
                      src={item.previewImage}
                      alt="Create Story"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                  )
                ) : preview?.image ? (
                  <img src={preview.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${
                      preview?.background || "from-blue-500 to-cyan-500"
                    } flex items-center justify-center p-3`}
                  >
                    <p className="text-white text-center text-sm font-bold line-clamp-4">{preview?.text}</p>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {item.create ? (
                  <div className="absolute inset-0 flex flex-col justify-end items-center pb-5">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl shadow-lg mb-3">
                      +
                    </div>
                    <p className="text-white text-sm font-semibold">Create Story</p>
                  </div>
                ) : (
                  <>
                    {/* Avatar Ring — gray once all of this person's stories are viewed */}
                    <div className="absolute top-3 left-3">
                      <div
                        className={`w-10 h-10 rounded-full p-[2px] ${
                          item.viewed ? "bg-gray-400" : "bg-blue-500"
                        }`}
                      >
                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-background bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                          {item.avatar ? (
                            <img
                              src={item.avatar}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold">
                              {item.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Menu Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(menuOpen === item.id ? null : item.id);
                      }}
                      className="absolute top-2 right-2 z-50 bg-black/50 text-white px-2 rounded-full"
                    >
                      ⋮
                    </button>

                    {/* Menu */}
                    {menuOpen === item.id && (
                      <div
                        className="absolute top-10 right-2 z-50 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            setEditingStory(item);

                            if (item.stories[0]?.image) {
                              fileInputRef.current?.click();
                            } else {
                              setShowTextStory(true);
                            }

                            setMenuOpen(null);
                          }}
                          className="block w-full px-4 py-2 text-left hover:bg-muted whitespace-nowrap"
                        >
                          ✏️ Edit
                        </button>

                        <button
                          onClick={async () => {
                            try {
                              await Promise.all(
                                item.stories.map((story) => api.delete(`/stories/${story.id}`))
                              );

                              setStories((prev) => prev.filter((s) => s.id !== item.id));

                              if (selectedUser?.id === item.id) {
                                setSelectedUser(null);
                              }

                              setMenuOpen(null);
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                          className="block w-full px-4 py-2 text-left text-red-500 hover:bg-muted whitespace-nowrap"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    )}

                    {/* Username */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Story Viewer */}
      <StoryViewer
        open={!!selectedUser}
        stories={selectedUser?.stories || []}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        name={selectedUser?.name || ""}
        avatar={selectedUser?.avatar}
        isOwner={selectedUser?.name === CURRENT_USER_NAME}
        viewersCount={selectedUser?.viewersCount}
        onClose={() => setSelectedUser(null)}
        onSendMessage={(text) => {
          // TODO: wire up to your messaging backend.
          console.log(`Message to ${selectedUser?.name}:`, text);
        }}
        onReact={(emoji) => {
          // TODO: wire up to your reactions backend.
          console.log(`Reacted to ${selectedUser?.name}'s story:`, emoji);
        }}
      />

      {/* Facebook Style Create Story Modal */}
      <CreateStoryModal
        open={showCreateStory}
        onClose={() => setShowCreateStory(false)}
        onPhotoStory={() => {
          setShowCreateStory(false);
          fileInputRef.current?.click();
        }}
        onTextStory={() => {
          setEditingStory(null);
          setShowCreateStory(false);
          setShowTextStory(true);
        }}
      />

      <TextStoryModal
        open={showTextStory}
        onClose={() => {
          setShowTextStory(false);
          setEditingStory(null);
        }}
        initialText={editingStory?.stories?.[0]?.text || ""}
        initialBackground={editingStory?.stories?.[0]?.background || "from-blue-500 to-cyan-500"}
        onCreate={async (story) => {
          try {
            if (editingStory) {
              await api.put(`/stories/${editingStory.stories[0].id}`, {
                text: story.text,
                background: story.background,
              });

              setEditingStory(null);

              await fetchStories();

              setShowTextStory(false);

              return;
            }

            const currentUser = JSON.parse(
              localStorage.getItem("savezoUser") || "{}"
            );

            await api.post("/stories", {
              userName: currentUser.name || CURRENT_USER_NAME,
              avatar: currentUser.profilePicture || "",
              text: story.text,
              background: story.background,
            });

            await fetchStories();
            setShowTextStory(false);
          } catch (error) {
            console.warn("Backend API offline/error, adding text story locally:", error);
            addOwnStory({
              id: "story-" + Date.now(),
              text: story.text,
              background: story.background,
              createdAt: new Date().toISOString(),
            });
            setShowTextStory(false);
          }
        }}
      />

      <PhotoStoryModal
        open={showPhotoModal}
        onClose={() => {
          setShowPhotoModal(false);
          setSelectedPhotoFile(null);
        }}
        selectedFile={selectedPhotoFile}
        onSelectAnotherFile={() => fileInputRef.current?.click()}
        onPublish={handlePublishPhotoStory}
      />
    </>
  );
}