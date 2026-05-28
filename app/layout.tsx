import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import "./globals.css"
import { eventConfig } from "@/lib/config"

const cormorant = Cormorant_Garamond({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display:  "swap",
})

const inter = Inter({
  subsets:  ["latin"],
  weight:   ["300", "400", "500"],
  variable: "--font-inter",
  display:  "swap",
})

export const metadata: Metadata = {
  title:       eventConfig.siteTitle,
  description: eventConfig.siteDescription,
  robots:      { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: "#06060A",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
