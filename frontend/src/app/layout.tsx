import "./globals.css"
import Navbar from "@/components/navbar"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Deepfake Analysis Lab",
  description: "AI powered deepfake detection platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable}`}
    >
      <head>
        {/* ✅ THEME INIT SCRIPT (RUNS BEFORE RENDER) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const theme = localStorage.getItem("theme");
                  if (theme === "light") {
                    document.documentElement.classList.remove("dark");
                  } else {
                    document.documentElement.classList.add("dark");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>

      <body className="min-h-screen bg-background text-foreground flex flex-col antialiased transition-colors duration-300">

        {/* 🌌 Background Glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-primary/10 blur-[140px] pointer-events-none z-0" />

        {/* 🔝 Navbar */}
        <Navbar />

        {/* 📄 Page Content */}
        <main className="flex-1 pt-[68px] relative z-10">
          {children}
        </main>

      </body>
    </html>
  )
}