"use client";

import { useState } from "react";

const departments = [
  { id: "general", label: "General Inquiry" },
  { id: "technical", label: "Technical Support" },
  { id: "billing", label: "Billing & Payments" },
  { id: "safety", label: "Content Safety" },
  { id: "deepfake", label: "Deepfake Detection" },
];

const faqs = [
  "How does Savezo detect harmful content?",
  "Can Savezo detect deepfake videos?",
  "Does Savezo block inappropriate content automatically?",
  "Is my data safe on Savezo?",
  "Can I use Savezo for real-time content analysis?",
];

export default function ContactSupportPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    subject: "",
    message: "",
    priority: "normal",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main
      className="min-h-screen w-full"
      style={{ background: "linear-gradient(160deg, #0d1b2a 0%, #0a1628 60%, #06111e 100%)" }}
    >
      {/* Header */}
      <div className="relative overflow-hidden pt-16 pb-10 text-center px-4">
        {/* Glow blob */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, #38bdf8 0%, #0ea5e9 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Chat icon */}
        <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
          style={{ background: "linear-gradient(135deg, #38bdf8, #0ea5e9)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h1 className="relative text-4xl font-bold text-white mb-3 tracking-tight">
          Contact Support
        </h1>
        <p className="relative text-slate-400 text-base max-w-md mx-auto">
          We're here to help! Our support team is ready to assist you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT — Contact Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div
              className="rounded-2xl p-10 text-center flex flex-col items-center gap-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #38bdf8, #0ea5e9)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
              <p className="text-slate-400 max-w-sm">
                Thanks for reaching out. Our support team will get back to you within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", department: "", subject: "", message: "", priority: "normal" }); }}
                className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #38bdf8, #0ea5e9)" }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div
              className="rounded-2xl p-8"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <h2 className="text-xl font-semibold text-white mb-6">Send us a message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:ring-1 focus:ring-sky-500"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:ring-1 focus:ring-sky-500"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>

                {/* Department */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Department</label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:ring-1 focus:ring-sky-500 appearance-none cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <option value="" style={{ background: "#0d1b2a" }}>Select a department</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id} style={{ background: "#0d1b2a" }}>{d.label}</option>
                    ))}
                  </select>
                </div>

                {/* Priority */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Priority</label>
                  <div className="flex gap-2">
                    {["low", "normal", "high"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, priority: p }))}
                        className="flex-1 rounded-xl py-3 text-xs font-semibold capitalize transition-all duration-200"
                        style={{
                          background: form.priority === p
                            ? p === "high" ? "rgba(239,68,68,0.25)" : p === "normal" ? "rgba(56,189,248,0.2)" : "rgba(255,255,255,0.1)"
                            : "rgba(255,255,255,0.04)",
                          border: form.priority === p
                            ? p === "high" ? "1px solid rgba(239,68,68,0.5)" : p === "normal" ? "1px solid rgba(56,189,248,0.4)" : "1px solid rgba(255,255,255,0.2)"
                            : "1px solid rgba(255,255,255,0.08)",
                          color: form.priority === p
                            ? p === "high" ? "#f87171" : p === "normal" ? "#38bdf8" : "#cbd5e1"
                            : "#64748b",
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Brief description of your issue"
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:ring-1 focus:ring-sky-500"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe your issue in detail..."
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:ring-1 focus:ring-sky-500 resize-none"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-6 w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #38bdf8, #0ea5e9)" }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* RIGHT — Sidebar */}
        <div className="flex flex-col gap-4">

          {/* Contact Options */}
          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.22 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.06-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              ),
              title: "Phone Support",
              desc: "Mon–Fri, 9am–6pm EST",
              action: "+1 (800) 123-4567",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              ),
              title: "Email Support",
              desc: "Response within 24 hours",
              action: "support@savezo.com",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
              ),
              title: "Live Chat",
              desc: "Available 24/7",
              action: "Start Chat",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 flex items-start gap-4 group cursor-pointer transition-all duration-200 hover:border-sky-500/30"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sky-400 transition-all duration-200 group-hover:scale-105"
                style={{ background: "rgba(56,189,248,0.12)" }}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-slate-500 mb-1">{item.desc}</p>
                <p className="text-xs text-sky-400 font-medium">{item.action}</p>
              </div>
            </div>
          ))}

          {/* Related FAQs */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <h3 className="text-sm font-semibold text-white mb-4">Related FAQs</h3>
            <div className="flex flex-col gap-2">
              {faqs.map((q, i) => (
                <button
                  key={i}
                  className="text-left text-xs text-slate-400 hover:text-sky-400 transition-colors duration-150 flex items-start gap-2 group"
                >
                  <span className="mt-0.5 flex-shrink-0 text-sky-500 opacity-60 group-hover:opacity-100 transition-opacity">›</span>
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Response time badge */}
          <div
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)" }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse flex-shrink-0" />
            <p className="text-xs text-sky-300">Average response time: <span className="font-semibold text-white">Under 2 hours</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}