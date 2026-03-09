"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter(); // ✅ Next.js navigation

  const faqs = [
    {
      question: "What is CaReBot?",
      answer:
        "CaReBot is your intelligent health companion, designed to guide, support, and simplify healthcare by providing smart solutions to everyday health issues—anytime, anywhere.",
    },
    {
      question: "How does CaReBot work?",
      answer:
        "CaReBot uses advanced AI technology to analyze your health concerns and provide personalized recommendations, guidance, and support based on medical knowledge and best practices.",
    },
    {
      question: "Is CaReBot a replacement for doctors?",
      answer:
        "No, CaReBot is designed to complement, not replace, professional medical care. For serious health concerns, always consult with qualified healthcare professionals.",
    },
    {
      question: "Is my health information secure?",
      answer:
        "Yes, we take your privacy seriously. All health information is encrypted and stored securely, following industry-standard security protocols and healthcare privacy regulations.",
    },
    {
      question: "How much does CaReBot cost?",
      answer:
        "CaReBot offers various pricing plans to suit different needs. Contact us for detailed pricing information and to find the plan that's right for you.",
    },
    {
      question: "Can I use CaReBot on my mobile device?",
      answer:
        "Yes, CaReBot is designed to work seamlessly across all devices - desktop, tablet, and mobile - so you can access your health companion wherever you are.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleContactClick = () => {
    router.push("/contact"); // ✅ Navigate to contact.tsx
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#bcf3f3] bg-[#bcf3f3]"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-16 w-40 h-40 bg-gradient-to-br from-white/10 to-[#6cf0f2]/5 rounded-full animate-pulse blur-sm"></div>
        <div className="absolute top-64 right-24 w-32 h-32 bg-gradient-to-br from-[#6cf0f2]/15 to-[#0c0966]/5 rounded-full animate-bounce delay-300 blur-sm"></div>
        <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-gradient-to-br from-white/8 to-[#6cf0f2]/8 rounded-full animate-pulse delay-700 blur-sm"></div>
        <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-gradient-to-br from-[#0c0966]/8 to-white/12 rounded-full animate-bounce delay-1000 blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Page Header (without HelpCircle icon) */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 [font-family:'Outfit',Helvetica] tracking-tight">
            <span className="text-[#0c0966] drop-shadow-lg">Frequently Asked</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0c0966] via-[#6cf0f2] to-[#0c0966] animate-pulse">
              Questions
            </span>
          </h1>
          <p className="text-xl text-[#0c0966]/80 text-center mb-8 [font-family:'Outfit',Helvetica] font-medium max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about CaReBot
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-[#6cf0f2] via-[#0c0966] to-[#6cf0f2] mx-auto rounded-full shadow-sm"></div>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-white/25 to-white/15 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40 cursor-pointer transition-all duration-500 hover:shadow-2xl transform hover:scale-[1.02] ${
                openIndex === index
                  ? "shadow-2xl bg-gradient-to-br from-white/35 to-white/25 scale-[1.02]"
                  : hoveredIndex === index
                  ? "shadow-xl bg-gradient-to-br from-white/30 to-white/20"
                  : ""
              }`}
              onClick={() => toggleFAQ(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl md:text-2xl font-semibold text-[#0c0966] [font-family:'Outfit',Helvetica] flex-1 pr-4">
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 transition-all duration-300 ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  >
                    {openIndex === index ? (
                      <ChevronUp className="w-6 h-6 text-[#6cf0f2]" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-[#0c0966]" />
                    )}
                  </div>
                </div>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pt-4 border-t border-white/20 mt-4">
                    <p className="text-lg text-[#0c0966]/80 leading-relaxed [font-family:'Outfit',Helvetica] font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-white/25 to-white/15 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/30 max-w-2xl mx-auto hover:from-white/30 hover:to-white/20 transition-all duration-500">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-[#6cf0f2]/20 to-[#0c0966]/10 p-3 rounded-full shadow-lg">
                <MessageSquare className="text-[#0c0966] w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#0c0966] mb-4 [font-family:'Outfit',Helvetica]">
              Still have questions?
            </h3>
            <p className="text-lg text-[#0c0966]/80 mb-8 [font-family:'Outfit',Helvetica] font-medium">
              We're here to help! Our support team is ready to assist you.
            </p>
            <button
              onClick={handleContactClick}
              className="bg-gradient-to-r from-[#6cf0f2] via-[#5ce0e2] to-[#6cf0f2] hover:from-[#5ce0e2] hover:via-[#4cd0d2] hover:to-[#5ce0e2] text-[#0c0966] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 [font-family:'Outfit',Helvetica] text-lg transform hover:scale-105 border-2 border-[#6cf0f2]/30 hover:border-[#6cf0f2]/60"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
