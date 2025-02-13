import type { Metadata } from "next"
import { Press_Start_2P } from "next/font/google"
import "./globals.css"
import type React from "react"

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Gaming Trivia",
  description:
    "Test your knowledge of classic video games in this retro-styled quiz that reveals a hidden image as you progress.",
  keywords: "gaming, quiz, trivia, video games, nostalgia",
  openGraph: {
    title: "Gaming Trivia",
    description: "Test your gaming knowledge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gaming Trivia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaming Trivia",
    description: "Challenge your gaming knowledge and uncover hidden pixel art!",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${pressStart2P.className} bg-black`}>{children}</body>
    </html>
  )
}

