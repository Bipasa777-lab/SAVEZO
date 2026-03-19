"use client";

export default function ProfileHeader() {
  return (
    <div>
      {/* Cover */}
      <div className="relative h-56 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        {/* Avatar */}
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 rounded-full border-4 border-[#080c14] bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-3xl font-bold">
            AJ
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold">Alex Johnson</h1>
          <p className="text-gray-400">
            @alexjohnson · AI Safety Advocate
          </p>

          <p className="text-gray-300 mt-2 max-w-xl">
            Building a safer internet, one algorithm at a time. Researcher @SafeWeb Lab. Using Savezo to protect my community 🛡️
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-4">
            <div>
              <p className="font-bold text-lg">1,243</p>
              <p className="text-sm text-gray-400">Posts</p>
            </div>
            <div>
              <p className="font-bold text-lg">48.2K</p>
              <p className="text-sm text-gray-400">Followers</p>
            </div>
            <div>
              <p className="font-bold text-lg">892</p>
              <p className="text-sm text-gray-400">Following</p>
            </div>
            <div>
              <p className="font-bold text-lg text-green-400">99%</p>
              <p className="text-sm text-gray-400">AI Trust Score</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:opacity-90">
            Edit Profile
          </button>
          <button className="px-5 py-2 rounded-lg border border-gray-600 hover:bg-gray-800">
            Share Profile
          </button>
        </div>
      </div>
    </div>
  );
}