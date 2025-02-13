import ImageRevealQuiz from "../components/ImageRevealQuiz"
import { Press_Start_2P } from "next/font/google"

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

const backgroundImageUrl = "/primary-bg.png"

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-2 sm:p-4 md:p-8 ${pressStart2P.className} relative z-10`}
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0, 255, 0, 0.05), rgba(0, 0, 0, 0.3)),
          url(${backgroundImageUrl})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
      <div className="w-full max-w-[940px] bg-black bg-opacity-90 p-4 sm:p-6 md:p-8 rounded-lg shadow-[0_0_20px_rgba(26,143,26,0.3)] border border-[#1a8f1a] border-opacity-30 relative overflow-hidden z-10 crt scanline backdrop-blur-sm">
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,255,0,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at center, rgba(0,255,0,0.4) 0%, rgba(0,0,0,0.4) 100%)",
            backgroundBlendMode: "multiply",
            mixBlendMode: "overlay",
          }}
        ></div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, rgba(0,255,0,0.03), rgba(0,255,0,0.03) 1px, transparent 1px, transparent 2px)",
            backgroundSize: "100% 2px",
          }}
        ></div>

        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: "linear-gradient(120deg, transparent 0%, rgba(0,255,0,0.3) 50%, transparent 100%)",
          }}
        ></div>

        <div className="relative z-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center relative mb-4 sm:mb-8 neon-text">
            Gaming Trivia
          </h1>
          <ImageRevealQuiz />
        </div>
      </div>
    </main>
  )
}

