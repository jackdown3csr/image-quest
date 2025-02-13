import ImageRevealQuiz from "../components/ImageRevealQuiz"
import { Press_Start_2P } from "next/font/google"

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

const backgroundImageUrl =
  "https://v8vc76fisea2a9it.public.blob.vercel-storage.com/jackdown3csr_webpage_background_pc_gaming_abstract_theme_dimm_f44ea663-2023-4ab9-bb96-1c685a4aa2a6_1-OLEfhIMQjQSck6mSdexF8FyScgdA0H.png"

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-2 sm:p-4 ${pressStart2P.className} relative z-10`}
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
      <div className="absolute inset-0 bg-black opacity-30 z-0 animate-pulse"></div>
      <div className="w-full max-w-[940px] bg-black bg-opacity-80 p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl border-4 sm:border-8 border-green-900 relative overflow-hidden z-10">
        {/* CRT screen effect */}
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,255,0,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at center, rgba(0,255,0,0.4) 0%, rgba(0,0,0,0.4) 100%)",
            backgroundBlendMode: "multiply",
            mixBlendMode: "overlay",
          }}
        ></div>

        {/* Scanlines effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, rgba(0,255,0,0.03), rgba(0,255,0,0.03) 1px, transparent 1px, transparent 2px)",
            backgroundSize: "100% 2px",
          }}
        ></div>

        {/* Screen glare effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: "linear-gradient(120deg, transparent 0%, rgba(0,255,0,0.3) 50%, transparent 100%)",
          }}
        ></div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-glow-red"></div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center relative">
              <span className="absolute inset-0 blur-sm text-green-700 text-shadow-green">IMAGE QUEST</span>
              <span className="relative text-green-600 text-shadow-green-strong">IMAGE QUEST</span>
            </h1>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-glow-green"></div>
          </div>
          <ImageRevealQuiz />
        </div>
      </div>
    </main>
  )
}

