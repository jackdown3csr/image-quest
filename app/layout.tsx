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
          @keyframes crtFlicker {
            0% {
              opacity: 0.0015;
            }
            50% {
              opacity: 0.0025;
            }
            100% {
              opacity: 0.002;
            }
          }
          .crt-flicker {
            animation: crtFlicker 0.15s infinite, pulse 4s infinite;
            pointer-events: none;
            mix-blend-mode: overlay;
          }
          .shake {
            animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
            transform: translate3d(0, 0, 0);
          }
          @keyframes shake {
            10%, 90% {
              transform: translate3d(-1px, 0, 0);
            }
            20%, 80% {
              transform: translate3d(2px, 0, 0);
            }
            30%, 50%, 70% {
              transform: translate3d(-4px, 0, 0);
            }
            40%, 60% {
              transform: translate3d(4px, 0, 0);
            }
          }
          @keyframes pulse {
            0%, 100% {
              opacity: 0.0015;
            }
            50% {
              opacity: 0.0025;
            }
          }
          .glitch {
            position: relative;
            animation: glitch 1s linear infinite;
          }
          
          .glitch::before,
          .glitch::after {
            content: attr(data-text);
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
          
          .glitch::before {
            left: 2px;
            text-shadow: -2px 0 #ff00c1;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim 5s infinite linear alternate-reverse;
          }
          
          .glitch::after {
            left: -2px;
            text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
            animation: glitch-anim2 1s infinite linear alternate-reverse;
          }
          
          @keyframes glitch-anim {
            0% {
              clip: rect(31px, 9999px, 94px, 0);
            }
            4.166666667% {
              clip: rect(91px, 9999px, 43px, 0);
            }
            8.333333333% {
              clip: rect(74px, 9999px, 71px, 0);
            }
            12.5% {
              clip: rect(75px, 9999px, 75px, 0);
            }
            16.66666667% {
              clip: rect(28px, 9999px, 26px, 0);
            }
            20.83333333% {
              clip: rect(80px, 9999px, 91px, 0);
            }
            25% {
              clip: rect(2px, 9999px, 74px, 0);
            }
            29.16666667% {
              clip: rect(15px, 9999px, 27px, 0);
            }
            33.33333333% {
              clip: rect(90px, 9999px, 58px, 0);
            }
            37.5% {
              clip: rect(99px, 9999px, 85px, 0);
            }
            41.66666667% {
              clip: rect(38px, 9999px, 93px, 0);
            }
            45.83333333% {
              clip: rect(69px, 9999px, 45px, 0);
            }
            50% {
              clip: rect(5px, 9999px, 47px, 0);
            }
            54.16666667% {
              clip: rect(10px, 9999px, 2px, 0);
            }
            58.33333333% {
              clip: rect(14px, 9999px, 25px, 0);
            }
            62.5% {
              clip: rect(92px, 9999px, 36px, 0);
            }
            66.66666667% {
              clip: rect(95px, 9999px, 5px, 0);
            }
            70.83333333% {
              clip: rect(67px, 9999px, 61px, 0);
            }
            75% {
              clip: rect(51px, 9999px, 77px, 0);
            }
            79.16666667% {
              clip: rect(23px, 9999px, 94px, 0);
            }
            83.33333333% {
              clip: rect(94px, 9999px, 32px, 0);
            }
            87.5% {
              clip: rect(62px, 9999px, 17px, 0);
            }
            91.66666667% {
              clip: rect(49px, 9999px, 59px, 0);
            }
            95.83333333% {
              clip: rect(45px, 9999px, 65px, 0);
            }
            100% {
              clip: rect(31px, 9999px, 16px, 0);
            }
          }
          
          @keyframes glitch-anim2 {
            0% {
              clip: rect(65px, 9999px, 65px, 0);
            }
            100% {
              clip: rect(52px, 9999px, 26px, 0);
            }
          }
        `}</style>
      </head>
      <body className={`${pressStart2P.className} bg-black`}>
        {children}
        <div className="crt-flicker fixed inset-0 pointer-events-none bg-green-500 z-50 animate-pulse"></div>
      </body>
    </html>
  )
}

