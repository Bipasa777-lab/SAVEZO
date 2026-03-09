import "@/app/globals.css"
import { Navbar } from "@/components/navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-primaryBg text-white">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
