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
  title: "Image Quest",
  description: "A retro-style gaming quiz that reveals an image as you answer correctly",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          .shadow-glow-red {
            box-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 15px #ff0000, 0 0 20px #ff0000;
          }
          .shadow-glow-yellow {
            box-shadow: 0 0 5px #ffff00, 0 0 10px #ffff00, 0 0 15px #ffff00, 0 0 20px #ffff00;
          }
          .shadow-glow-green {
            box-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00, 0 0 20px #00ff00;
          }
          .text-shadow-green {
            text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;
          }
          .text-shadow-green-strong {
            text-shadow: 
              -1px -1px 0 #000,
              1px -1px 0 #000,
              -1px 1px 0 #000,
              1px 1px 0 #000,
              0 0 5px #00aa00,
              0 0 10px #00aa00,
              0 0 15px #00aa00;
          }
          @keyframes loadingBarProgress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0); }
          }
          .loading-bar-progress {
            background: linear-gradient(
              90deg,
              rgba(0, 255, 0, 0.5) 0%,
              rgba(0, 255, 0, 1) 50%,
              rgba(0, 255, 0, 0.5) 100%
            );
            animation: loadingBarProgress 2s linear infinite;
          }
          .loading-dots {
            display: inline-block;
            width: 24px;
            text-align: left;
          }
        `}</style>
      </head>
      <body className={`${pressStart2P.className} bg-black`}>{children}</body>
    </html>
  )
}

