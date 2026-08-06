"use client";
import { ReactNode, useEffect, useState } from "react";
import {
  Archive,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Bookmark,
  Camera,
  ChevronDown,
  ChevronRight,
  Clapperboard,
  GraduationCap,
  Github,
  Globe,
  Heart,
  Image as ImageIcon,
  Linkedin,
  MapPin,
  MessageCircle,
  Pencil,
  Plus,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Smile,
  TrendingUp,
  User,
  Users,
  Users2,
  Video,
  Wrench,
} from "lucide-react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tab";

import api from "@/lib/api";
// ⚠️ Adjust this import path to wherever CreatePostModal actually lives
import { CreatePostModal } from "@/components/dashboard/CreatePostModal";
import EditProfileModal from "@/components/profile/EditProfileModal";
import ProfileHeader from "@/components/profile/ProfileHeader";


/* ============================================================================
   Shared
   ========================================================================= */

interface SectionCardProps {
  title: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

function SectionCard({ title, icon, action, children, className = "" }: SectionCardProps) {
  return (
    <div className={`rounded-xl border border-gray-800 bg-[#0d1320] p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-200">
          {icon}
          {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}

/* ============================================================================
   Left sidebar cards
   ========================================================================= */

const ABOUT_ROLES = ["AI/ML Student", "Content Creator", "Open Source Contributor"];

function AboutMeCard() {
  return (
    <SectionCard
      title="About Me"
      icon={<User size={16} className="text-blue-400" />}
      action={
        <button type="button" aria-label="Edit about" className="text-gray-500 hover:text-gray-300">
          <Pencil size={14} />
        </button>
      }
    >
      <ul className="space-y-2.5">
        {ABOUT_ROLES.map((role) => (
          <li key={role} className="flex items-center gap-2 text-sm text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
            {role}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

interface TrustStat {
  label: string;
  value: string;
  tone: "green" | "blue" | "yellow";
}

const TRUST_STATS: TrustStat[] = [
  { label: "Trust Score", value: "98%", tone: "green" },
  { label: "Authenticity", value: "99%", tone: "blue" },
  { label: "Content Safety", value: "Excellent", tone: "green" },
  { label: "Risk Level", value: "Low", tone: "yellow" },
];

const TRUST_TONE_CLASSES: Record<TrustStat["tone"], string> = {
  green: "text-green-400",
  blue: "text-blue-400",
  yellow: "text-yellow-400",
};

function AITrustCard() {
  return (
    <div className="relative rounded-xl border border-blue-500/30 bg-gradient-to-b from-blue-500/[0.07] to-[#0d1320] p-5 shadow-[0_0_24px_-12px_rgba(59,130,246,0.6)]">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck size={16} className="text-blue-400" />
        <h3 className="text-sm font-semibold text-gray-200">AI Trust Card</h3>
        <span className="ml-auto text-[10px] font-medium uppercase tracking-wide text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
          SaveZo
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {TRUST_STATS.map((stat) => (
          <div key={stat.label} className="rounded-lg bg-black/30 px-3 py-2.5">
            <p className="text-[11px] text-gray-400">{stat.label}</p>
            <p className={`text-base font-bold ${TRUST_TONE_CLASSES[stat.tone]}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationCard() {
  return (
    <SectionCard
      title="Education"
      icon={<GraduationCap size={16} className="text-blue-400" />}
      action={
        <button type="button" aria-label="Edit education" className="text-gray-500 hover:text-gray-300">
          <Pencil size={14} />
        </button>
      }
    >
      <p className="text-sm font-medium text-gray-100">Brainware University</p>
      <p className="text-sm text-gray-400">B.Tech CSE - AIML</p>
      <p className="text-xs text-gray-500 mt-1">2023 - 2027</p>
    </SectionCard>
  );
}

function LocationCard() {
  return (
    <SectionCard title="Location" icon={<MapPin size={16} className="text-blue-400" />}>
      <p className="text-sm text-gray-300">Kolkata, India</p>
    </SectionCard>
  );
}

const SKILLS = ["Python", "Machine Learning", "Power BI", "React", "Next.js", "FastAPI", "MongoDB"];

function SkillsCard() {
  return (
    <SectionCard title="Skills" icon={<Wrench size={16} className="text-blue-400" />}>
      <div className="flex flex-wrap gap-2">
        {SKILLS.map((skill) => (
          <span
            key={skill}
            className="text-xs font-medium text-gray-300 bg-white/5 border border-gray-700 rounded-full px-3 py-1.5"
          >
            {skill}
          </span>
        ))}
      </div>
    </SectionCard>
  );
}

const SOCIAL_LINKS = [
  { label: "GitHub", href: "#", icon: Github },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Portfolio", href: "#", icon: Globe },
];

function SocialLinksCard() {
  return (
    <SectionCard title="Social Links" icon={<Globe size={16} className="text-blue-400" />}>
      <div className="space-y-1">
        {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
  <a
    key={label}
    href={href}
    className="flex items-center gap-2.5 text-sm text-gray-300 hover:text-blue-400 rounded-lg px-2 py-2 -mx-2 hover:bg-white/5 transition-colors"
  >
    <Icon size={16} className="text-gray-400" />
    <span className="flex-1">{label}</span>
    <ArrowUpRight size={14} className="text-gray-600" />
  </a>
))}
      </div>
    </SectionCard>
  );
}

const CERTS = ["Microsoft AI", "Google Data Analytics", "Infosys Internship"];

function CertificationsCard() {
  return (
    <SectionCard title="Certifications" icon={<Award size={16} className="text-blue-400" />}>
      <ul className="space-y-2.5">
        {CERTS.map((cert) => (
          <li key={cert} className="flex items-center gap-2.5 text-sm text-gray-300">
            <Award size={14} className="text-yellow-400 flex-shrink-0" />
            {cert}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

const SIDEBAR_ARCHIVE = [
  { year: "2026", count: 24 },
  { year: "2025", count: 18 },
];

function StoryArchiveCard() {
  return (
    <SectionCard title="Story Archive" icon={<Archive size={16} className="text-blue-400" />}>
      <div className="space-y-1">
        {SIDEBAR_ARCHIVE.map((entry) => (
          <button
            type="button"
            key={entry.year}
            className="w-full flex items-center justify-between text-sm text-gray-300 hover:text-blue-400 rounded-lg px-2 py-2 -mx-2 hover:bg-white/5 transition-colors"
          >
            <span>{entry.year} Stories ({entry.count})</span>
            <ChevronRight size={14} className="text-gray-600" />
          </button>
        ))}
      </div>
    </SectionCard>
  );
}

const FRIENDS = [
  { name: "Soham", avatar: "/stories/story1.jpg" },
  { name: "Alex", avatar: "/stories/story3.jpg" },
  { name: "Zara", avatar: "/stories/story4.jpg" },
  { name: "James", avatar: "/stories/story5.jpg" },
  { name: "Layla", avatar: "/stories/story5.jpg" },
  { name: "Priya", avatar: "/stories/story2.jpg" },
];

function FriendsPreviewCard({ total = 555 }: { total?: number }) {
  return (
    <SectionCard
      title={`Friends · ${total}`}
      icon={<Users size={16} className="text-blue-400" />}
      action={<button type="button" className="text-xs text-blue-400 hover:text-blue-300">See all</button>}
    >
      <div className="grid grid-cols-3 gap-3">
        {FRIENDS.map((friend) => (
          <div key={friend.name} className="flex flex-col items-center gap-1.5">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-700">
              <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-[11px] text-gray-400 truncate w-full text-center">{friend.name}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ============================================================================
   Right column: header, stats, composer
   ========================================================================= */

interface QuickStatsProps {
  posts?: number;
  followers?: number | string;
  following?: number;
  stories?: number;
}

function formatNumber(n: number) {
  return n.toLocaleString();
}

function QuickStats({ posts = 248, followers = "1.2K", following = 560, stories = 18 }: QuickStatsProps) {
  const items = [
    { label: "Posts", value: formatNumber(posts) },
    { label: "Followers", value: followers },
    { label: "Following", value: formatNumber(following) },
    { label: "Stories", value: formatNumber(stories) },
  ];

  return (
    <div className="grid grid-cols-4 rounded-xl border border-gray-800 bg-[#0d1320] divide-x divide-gray-800 mt-6">
      {items.map((item) => (
        <div key={item.label} className="text-center py-4">
          <p className="text-lg font-bold text-gray-50">{item.value}</p>
          <p className="text-xs text-gray-400 mt-0.5">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ============================================================================
   Tab content
   ========================================================================= */

interface Post {
  id: number;
  text: string;
  image?: string;
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
}

function TimelineTab({ posts, avatarImage, name }: any) {
  // Local optimistic like state, keyed by post id/_id.
  // NOTE: this does NOT persist to MongoDB yet — wire a PATCH /posts/:id/like
  // endpoint and call it here if you want likes saved server-side.
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-4 mt-6">
      {posts.map((post: any) => {
        const id = post._id ?? post.id;
        const isLiked = likedIds.has(id);
        const likeCount = (post.likes ?? 0) + (isLiked ? 1 : 0);

        return (
          <div key={id} className="rounded-xl border border-gray-800 bg-[#0d1320] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                <img src={avatarImage} alt={name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-100">{name}</p>
                <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <p className="text-sm text-gray-300 mt-3 leading-relaxed">{post.text}</p>

            {post.image && (
              <div className="mt-3 rounded-lg overflow-hidden bg-gray-800">
                <img src={post.image} alt="" className="w-full max-h-[420px] object-cover" />
              </div>
            )}

            <div className="flex items-center gap-6 mt-4 pt-3 border-t border-gray-800 text-sm text-gray-400">
              <button
                type="button"
                onClick={() => toggleLike(id)}
                className={`flex items-center gap-1.5 transition-colors ${
                  isLiked ? "text-red-400" : "hover:text-red-400"
                }`}
              >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} /> {likeCount}
              </button>
              <button type="button" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                <MessageCircle size={16} /> {post.comments}
              </button>
              <button type="button" className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
                <Share2 size={16} /> {post.shares}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const CURRENT_STORIES = [
  { id: 1, image: "/stories/story1.jpg", createdAt: "2h ago" },
  { id: 2, image: "/stories/story2.jpg", createdAt: "1h ago" },
];

const HIGHLIGHTS = [
  { id: 1, label: "Campus", cover: "/stories/story3.jpg" },
  { id: 2, label: "Hackathons", cover: "/stories/story4.jpg" },
  { id: 3, label: "Travel", cover: "/stories/story5.jpg" },
];

const TAB_ARCHIVE = [
  { year: "2026", count: 24 },
  { year: "2025", count: 18 },
];

function StoriesTab() {
  return (
    <div className="space-y-8 mt-6">
      {/* Current stories */}
      <section>
        <h3 className="text-sm font-semibold text-gray-200 mb-3">Current Stories</h3>
        <div className="flex gap-3 overflow-x-auto pb-1">
          <button type="button" className="flex-shrink-0 w-24 h-36 rounded-xl border border-dashed border-gray-700 bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-1 text-gray-400 transition-colors">
            <Plus size={20} />
            <span className="text-xs">New</span>
          </button>
          {CURRENT_STORIES.map((story) => (
            <div key={story.id} className="relative flex-shrink-0 w-24 h-36 rounded-xl overflow-hidden bg-gray-800">
              <img src={story.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute bottom-2 left-2 right-2 text-[11px] text-white">{story.createdAt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section>
        <h3 className="text-sm font-semibold text-gray-200 mb-3">Story Highlights</h3>
        <div className="flex gap-5">
          {HIGHLIGHTS.map((h) => (
            <div key={h.id} className="flex flex-col items-center gap-1.5">
              <div className="w-16 h-16 rounded-full ring-2 ring-gray-700 overflow-hidden bg-gray-800">
                <img src={h.cover} alt={h.label} className="w-full h-full object-cover" />
              </div>
              <p className="text-xs text-gray-400">{h.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Archive */}
      <section>
        <h3 className="text-sm font-semibold text-gray-200 mb-3">Story Archive</h3>
        <div className="rounded-xl border border-gray-800 bg-[#0d1320] divide-y divide-gray-800">
          {TAB_ARCHIVE.map((entry) => (
            <button
              type="button"
              key={entry.year}
              className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-300 hover:bg-white/5 transition-colors"
            >
              <span>{entry.year} Stories</span>
              <span className="text-gray-500">{entry.count}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

type MediaType = "photos" | "videos" | "reels";

const MEDIA_FILTERS: { id: MediaType; label: string; icon: typeof ImageIcon }[] = [
  { id: "photos", label: "Photos", icon: ImageIcon },
  { id: "videos", label: "Videos", icon: Video },
  { id: "reels", label: "Reels", icon: Clapperboard },
];

const MEDIA: Record<MediaType, string[]> = {
  photos: ["/posts/post1.jpg", "/stories/story1.jpg", "/stories/story2.jpg", "/stories/story3.jpg", "/stories/story4.jpg", "/stories/story5.jpg"],
  videos: ["/stories/story3.jpg", "/stories/story4.jpg"],
  reels: ["/stories/story5.jpg", "/stories/story1.jpg", "/stories/story2.jpg"],
};

function MediaTab() {
  const [active, setActive] = useState<MediaType>("photos");

  return (
    <div className="mt-6">
      <div className="flex gap-2 mb-4">
        {MEDIA_FILTERS.map(({ id, label, icon: Icon }) => (
          <button
            type="button"
            key={id}
            onClick={() => setActive(id)}
            className={`flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
              active === id
                ? "bg-blue-500/15 border-blue-500/40 text-blue-400"
                : "bg-transparent border-gray-700 text-gray-400 hover:bg-white/5"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {MEDIA[active].map((src, i) => (
          <div key={`${active}-${i}`} className="aspect-square rounded-md overflow-hidden bg-gray-800">
            <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

const SAVED_SECTIONS = [
  { id: "posts", label: "Saved Posts", items: ["/posts/post1.jpg"] },
  { id: "stories", label: "Saved Stories", items: ["/stories/story2.jpg", "/stories/story4.jpg"] },
  { id: "videos", label: "Saved Videos", items: [] as string[] },
];

function SavedTab() {
  return (
    <div className="space-y-8 mt-6">
      {SAVED_SECTIONS.map((section) => (
        <section key={section.id}>
          <h3 className="text-sm font-semibold text-gray-200 mb-3">{section.label}</h3>

          {section.items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-800 py-8 flex flex-col items-center gap-2 text-gray-500">
              <Bookmark size={22} />
              <p className="text-sm">Nothing saved here yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1.5">
              {section.items.map((src, i) => (
                <div key={i} className="aspect-square rounded-md overflow-hidden bg-gray-800">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

const ANALYTICS_STATS = [
  { label: "Trust Score", value: "98%", icon: ShieldCheck, tone: "text-green-400" },
  { label: "Authenticity Rate", value: "99%", icon: ShieldCheck, tone: "text-blue-400" },
  { label: "Content Reach", value: "12.5K", icon: TrendingUp, tone: "text-purple-400" },
  { label: "Engagement Rate", value: "8.2%", icon: Users2, tone: "text-yellow-400" },
];

const SAFETY_REPORTS = [
  { id: 1, label: "Post flagged for review — cleared automatically", date: "3 days ago", level: "low" as const },
  { id: 2, label: "Profile picture re-verified", date: "1 week ago", level: "low" as const },
  { id: 3, label: "Comment removed for spam pattern", date: "2 weeks ago", level: "medium" as const },
];

const SAFETY_LEVEL_CLASSES = {
  low: "text-green-400 bg-green-500/10",
  medium: "text-yellow-400 bg-yellow-500/10",
};

function AnalyticsTab() {
  return (
    <div className="mt-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ANALYTICS_STATS.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="p-4 rounded-xl border border-gray-800 bg-[#0d1320]">
            <Icon size={16} className={`${tone} mb-2`} />
            <p className="text-sm text-gray-400">{label}</p>
            <p className={`text-xl font-bold ${tone}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-800 bg-[#0d1320] p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-4">
          <ShieldAlert size={16} className="text-blue-400" />
          Safety Reports
        </h3>

        <ul className="divide-y divide-gray-800">
          {SAFETY_REPORTS.map((report) => (
            <li key={report.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm text-gray-300">{report.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{report.date}</p>
              </div>
              <span className={`text-[11px] font-medium uppercase px-2 py-1 rounded-full ${SAFETY_LEVEL_CLASSES[report.level]}`}>
                {report.level}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ============================================================================
   Page
   ========================================================================= */

const PROFILE_TABS = [
  { value: "timeline", label: "Timeline" },
  { value: "stories", label: "Stories" },
  { value: "media", label: "Media" },
  { value: "saved", label: "Saved" },
  { value: "analytics", label: "AI Analytics" },
];

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const defaultUser = {
      _id: "demo-user-1",
      name: "Alex Johnson",
      username: "@alexj",
      email: "alex@savezo.io",
      bio: "Digital Creator & AI Safety Advocate 🛡️",
    };

    let currentUser = defaultUser;
    const savedUser = localStorage.getItem("savezoUser");

    if (savedUser) {
      try {
        currentUser = JSON.parse(savedUser);
      } catch {
        currentUser = defaultUser;
      }
    } else {
      localStorage.setItem("savezoUser", JSON.stringify(defaultUser));
    }

    setUser(currentUser);

    try {
      const userRes = await api.get(`/users/${currentUser._id}`);
      setUser(userRes.data);

      const postRes = await api.get("/posts");
      const myPosts = postRes.data.filter(
        (post: any) => post.userName === userRes.data.name
      );
      setPosts(myPosts);

      const storyRes = await api.get("/stories");
      const myStories = storyRes.data.filter(
        (story: any) => story.userName === userRes.data.name
      );
      setStories(myStories);
    } catch (error) {
      console.log("Using default profile fallback:", error);
    }
  };

  // Called by CreatePostModal once a post is successfully saved to MongoDB.
  const handleNewPost = (post: any) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-gray-100">
      <div className="pt-8 max-w-6xl mx-auto px-4 sm:px-6">
        <ProfileHeader
  user={user}
  postsCount={posts.length}
  onEdit={() => setShowEdit(true)}
  onUserUpdate={(updatedUser) => setUser(updatedUser)}
/>

        <EditProfileModal
  open={showEdit}
  onClose={() => setShowEdit(false)}
  user={user}
  onSave={(updatedUser: any) => {
    setUser(updatedUser);
  }}
/>
        <QuickStats
          posts={posts.length}
          followers={user?.followers}
          following={user?.following}
          stories={stories.length}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 pb-16">
          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <AboutMeCard />
            <AITrustCard />
            <EducationCard />
            <LocationCard />
            <SkillsCard />
            <SocialLinksCard />
            <CertificationsCard />
            <StoryArchiveCard />
            <FriendsPreviewCard />
          </aside>

          <main className="min-w-0">
            <CreatePostModal
  onPost={handleNewPost}
/>

            <div className="mt-8">
              <Tabs defaultValue="timeline">
                <TabsList className="bg-transparent border-b border-gray-800 rounded-none p-0 gap-6 overflow-x-auto">
                  {PROFILE_TABS.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-400 rounded-none pb-3 whitespace-nowrap text-gray-400"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="timeline">
                  <TimelineTab posts={posts} avatarImage={user?.profilePicture} name={user?.name} />
                </TabsContent>

                <TabsContent value="stories">
                  <StoriesTab />
                </TabsContent>

                <TabsContent value="media">
                  <MediaTab />
                </TabsContent>

                <TabsContent value="saved">
                  <SavedTab />
                </TabsContent>

                <TabsContent value="analytics">
                  <AnalyticsTab />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}