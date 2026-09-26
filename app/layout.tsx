import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LanguageProvider } from "@/components/language-provider"
import { NotificationProvider } from "@/components/notification-provider"
import { LocationProvider } from "@/components/location-provider"
import { Chatbot } from "@/components/chatbot"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MARKETMATE - Connect Students with Local Businesses",
  description:
    "A platform connecting ambitious students with local businesses seeking marketing talent. Find jobs, build portfolios, grow together.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <LanguageProvider>
          <NotificationProvider>
            <LocationProvider>
              {children}
              <Chatbot />
            </LocationProvider>
          </NotificationProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
