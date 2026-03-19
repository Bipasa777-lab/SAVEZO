"use client"

import { useState } from "react"
import { ChevronDown, MessageCircle } from "lucide-react"
import Link from "next/link" // ✅ ADDED

const faqs = [
  {
    q: "What is Savezo?",
    a: "Savezo is an AI-powered social media platform that detects deepfakes, explicit content, and harmful signals before content is published.",
  },
  {
    q: "How does Savezo detect harmful content?",
    a: "Savezo uses multiple AI models including deepfake detection, nudity classification, and NLP-based mental health analysis to ensure content safety in real-time.",
  },
  {
    q: "Can Savezo detect deepfake videos?",
    a: "Yes. Savezo integrates advanced deepfake detection models (like Xception and ViT) to analyze visual inconsistencies and detect manipulated media.",
  },
  {
    q: "Does Savezo block inappropriate content automatically?",
    a: "Yes. Content that violates safety thresholds is automatically blocked and flagged with a detailed AI risk report.",
  },
  {
    q: "Is my data safe on Savezo?",
    a: "Absolutely. Savezo follows strict privacy and security protocols to ensure all user data and uploaded content remain secure.",
  },
  {
    q: "Can I use Savezo for real-time content analysis?",
    a: "Yes. Savezo performs sub-second AI analysis, allowing real-time moderation before content is published.",
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080c14] via-[#0d1320] to-[#0f172a] text-white px-6 py-20">

      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4">
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            Questions
          </span>
        </h1>

        <p className="text-gray-400 text-lg">
          Learn more about how Savezo keeps your community safe
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-6 rounded-full" />
      </div>

      {/* FAQ LIST */}
      <div className="max-w-3xl mx-auto space-y-5">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i

          return (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex justify-between px-6 py-5"
              >
                <span className="text-lg font-semibold">{faq.q}</span>
                <ChevronDown className={isOpen ? "rotate-180 text-blue-400" : ""} />
              </button>

              {isOpen && (
                <div className="px-6 pb-5 text-gray-400 text-sm">
                  {faq.a}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* CONTACT SUPPORT */}
      <div className="max-w-3xl mx-auto mt-16 text-center">
        <div className="rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-10 border border-white/10">

          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <MessageCircle />
          </div>

          <h2 className="text-2xl font-bold mb-3">
            Still have questions?
          </h2>

          <p className="text-gray-300 mb-6">
            We're here to help! Our support team is ready to assist you.
          </p>

          {/* ✅ FIXED BUTTON */}
          <Link href="/support">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:opacity-90 transition">
              Contact Support
            </button>
          </Link>

        </div>
      </div>

    </div>
  )
}