"use client";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTrustCard from "@/components/profile/ProfileTrustCard";
import ProfileGrid from "@/components/profile/ProfileGrid";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tab";

export default function Profile() {
  return (
    <div className="pt-24 max-w-5xl mx-auto px-6">
      
      {/* Header */}
      <ProfileHeader />

      {/* Trust Card */}
      <ProfileTrustCard />

      {/* Tabs */}
      <div className="mt-10">
        <Tabs defaultValue="posts">
          
          {/* Tabs Navigation */}
          <TabsList className="bg-transparent border-b border-gray-700 rounded-none p-0 gap-6">
            <TabsTrigger
              value="posts"
              className="data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-400 rounded-none pb-3"
            >
              Posts
            </TabsTrigger>

            <TabsTrigger
              value="media"
              className="data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-400 rounded-none pb-3"
            >
              Media
            </TabsTrigger>

            <TabsTrigger
              value="saved"
              className="data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-400 rounded-none pb-3"
            >
              Saved
            </TabsTrigger>

            <TabsTrigger
              value="analytics"
              className="data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-400 rounded-none pb-3"
            >
              AI Analytics
            </TabsTrigger>
          </TabsList>

          {/* Posts */}
          <TabsContent value="posts">
            <ProfileGrid />
          </TabsContent>

          {/* Media */}
          <TabsContent value="media">
            <ProfileGrid />
          </TabsContent>

          {/* Saved */}
          <TabsContent value="saved">
            <div className="text-gray-400 mt-6">
              No saved posts yet.
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="mt-6 p-6 rounded-xl bg-[#0d1320] border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">
                AI Safety Analytics
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-black/30 rounded-lg">
                  <p className="text-sm text-gray-400">Posts Scanned</p>
                  <p className="text-xl font-bold">1,243</p>
                </div>

                <div className="p-4 bg-black/30 rounded-lg">
                  <p className="text-sm text-gray-400">Safe Content</p>
                  <p className="text-xl font-bold text-green-400">99%</p>
                </div>

                <div className="p-4 bg-black/30 rounded-lg">
                  <p className="text-sm text-gray-400">Flagged</p>
                  <p className="text-xl font-bold text-yellow-400">12</p>
                </div>

                <div className="p-4 bg-black/30 rounded-lg">
                  <p className="text-sm text-gray-400">Blocked</p>
                  <p className="text-xl font-bold text-red-400">3</p>
                </div>
              </div>
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}