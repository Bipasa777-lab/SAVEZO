"use client";
import Link from "next/link";
import ChatWindow from "./components/ChatWindow";
import Profile from "./app/profile/page"

export default function Home() {
  return (
    <>
      <Profile />
      <main className="flex flex-col items-center justify-center min-h-screen bg-pink-100 px-4 py-8">
        <h1 className="text-4xl font-bold text-zinc-900 mb-4 text-center">
          Welcome to WellnessAI Carebot!
        </h1>
        <p className="text-zinc-700 text-lg mb-8 text-center">
          Your AI-powered medical chatbot is ready to assist you.
        </p>

        {/* Navigation Menu */}
        <nav className="mb-8 flex gap-6">
          <Link href="/pharmacy" className="text-blue-600 hover:underline">Pharmacy</Link>
          <Link href="/library" className="text-green-600 hover:underline">src/app/Library</Link>
          <Link href="/police" className="text-red-600 hover:underline">Police Station</Link>
          <Link href="/Landing" className="text-red-600 hover:underline">src/app/Landing</Link>
          <Link href="/about" className="text-red-600 hover:underline">src/app/about</Link>
          <Link href="/card" className="text-red-600 hover:underline">components/ui/card</Link>
          <Link href="/button" className="text-red-600 hover:underline">components/ui/button</Link>
        </nav>

        {/* Chat Window */}
        <div className="w-full max-w-2xl shadow-lg rounded-xl border border-zinc-300 bg-white">
          <ChatWindow />
        </div>
      </main>
    </>
  );
}
