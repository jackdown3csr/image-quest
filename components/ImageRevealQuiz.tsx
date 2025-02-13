"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import type React from "react" // Import React
import styles from "./ImageRevealQuiz.module.css"

const FEEDBACK_DURATION = 1500

const questions = [
  { question: "WHAT DOES IDDQD GRANT YOU?", answer: "God mode" },
  { question: "WHAT DOES GG MEAN?", answer: "Good Game" },
  { question: 'WHICH VIDEO GAME SERIES FEATURES THE PHRASE "THE CAKE IS A LIE"?', answer: "Portal" },
  { question: "WHAT COLOR IS LUIGI'S HAT?", answer: "Green" },
  { question: "IN MINECRAFT, WHAT SOUND DOES A CREEPER MAKE BEFORE EXPLODING?", answer: "Hiss" },
]

const revealImageUrl = "/fall-back.png" // Fallback image in public folder

export default function ImageRevealQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [showLink, setShowLink] = useState(false)
  const [isIncorrect, setIsIncorrect] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [imageOpacity, setImageOpacity] = useState(0)
  const [imageLoadError, setImageLoadError] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showGGs, setShowGGs] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false) // Added pulsing state
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (correctAnswers === questions.length) {
      setIsQuizCompleted(true)
      setUserAnswer("")
      setTimeout(() => {
        setImageOpacity(1)
      }, 100)
    }
  }, [correctAnswers])

  useEffect(() => {
    if (isIncorrect) {
      const timer = setTimeout(() => setIsIncorrect(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [isIncorrect])

  useEffect(() => {
    if (showWelcome) {
      setTimeout(() => {
        setShowGGs(true)
        setTimeout(() => {
          setShowWelcome(false)
          setShowGGs(false)
          // Focus on the input field after a short delay and trigger pulsing effect
          setTimeout(() => {
            inputRef.current?.focus()
            setIsPulsing(true) // Trigger pulsing effect
            // Stop pulsing effect after 5 seconds
            setTimeout(() => setIsPulsing(false), 5000)
          }, 100)
        }, 3000)
      }, 2000)
    }
  }, [showWelcome])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userAnswer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
      setCorrectAnswers((prev) => prev + 1)
      setShowFeedback(true)
      setTimeout(() => {
        setShowFeedback(false)
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1)
        }
      }, FEEDBACK_DURATION)
      setIsIncorrect(false)
    } else {
      setIsIncorrect(true)
    }
    setUserAnswer("")
  }

  const handleImageClick = (): void => {
    if (isQuizCompleted) {
      setShowLink(true)
    }
  }

  const loadingProgress = (correctAnswers / questions.length) * 100

  return (
    <div
      className="w-full max-w-[900px] mx-auto bg-black bg-opacity-90 p-4 sm:p-6 rounded-lg shadow-lg border border-[#1a8f1a] border-opacity-30 flex flex-col relative neon-border crt scanline"
      style={{
        minHeight: "480px",
        height: "auto",
      }}
    >
      {showWelcome ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="text-center px-4">
            {" "}
            {/* Added padding */}
            <div
              className={`text-[#1a8f1a] text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold ${showGGs ? styles.animateGgsText : ""}`}
            >
              {showGGs ? "GGs" : "Welcome to"}
            </div>
            {!showGGs && (
              <div className="text-[#1a8f1a] text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mt-4">
                Gaming Trivia
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            className="relative w-full mb-4 sm:mb-6 bg-black overflow-hidden border-2 border-[#1a8f1a] rounded-md shadow-md"
            style={{ height: "150px", maxHeight: "200px" }}
          >
            {isQuizCompleted ? (
              <div className="relative w-full h-full cursor-pointer group overflow-hidden" onClick={handleImageClick}>
                <Image
                  src={revealImageUrl || "/placeholder.svg"}
                  alt="Revealed image"
                  fill
                  className="object-cover transition-all duration-1000 ease-in-out group-hover:scale-110"
                  style={{ opacity: imageOpacity }}
                  onError={(e) => {
                    console.error("Error loading image:", e)
                    setImageLoadError(true)
                  }}
                />
                {imageLoadError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1a8f1a] text-black">
                    <p>Image failed to load</p>
                  </div>
                )}
                {showLink && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 p-4 text-center">
                    <a
                      href="https://tinyurl.com/GamingFac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-[#1a8f1a] text-sm sm:text-lg md:text-xl lg:text-2xl font-bold transition-all duration-300 neon-text ${styles.pulseZoom}`}
                    >
                      JOIN THE GAMING FACTION
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-3/4 h-4 bg-black overflow-hidden mb-2 border border-[#1a8f1a] rounded-sm">
                  <div
                    className="h-full bg-[#1a8f1a] relative"
                    style={{
                      width: `${loadingProgress}%`,
                      boxShadow: "0 0 10px #1a8f1a, 0 0 5px #1a8f1a",
                      transition: "width 0.5s ease-in-out",
                    }}
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-4 bg-black opacity-30"></div>
                  </div>
                </div>
                <p className="text-[#1a8f1a] text-xs sm:text-sm md:text-base font-semibold neon-text">
                  LOADING: {Math.round(loadingProgress)}%
                </p>
              </div>
            )}
          </div>

          <div
            className="flex-grow overflow-y-auto scrollbar-hide relative z-10 mb-4 sm:mb-6 px-2"
            style={{ minHeight: "120px", height: "auto" }}
          >
            {!isQuizCompleted ? (
              <div className="space-y-3">
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-[#1a8f1a] leading-relaxed neon-text">
                  {questions[currentQuestion].question}
                </h2>
              </div>
            ) : (
              <div className="text-center text-[#1a8f1a]">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 neon-text">CONGRATULATIONS!</h2>
                <p className="text-sm sm:text-base md:text-lg neon-text">
                  {showLink ? "YOUR LINK IS READY..." : "CLICK THE IMAGE TO CONTINUE"}
                </p>
              </div>
            )}
          </div>

          {!isQuizCompleted && (
            <form onSubmit={handleSubmit} className="relative z-10 w-full px-2">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full">
                <div className="relative w-full sm:flex-grow">
                  {" "}
                  {/* Updated input field */}
                  <input
                    type="text"
                    ref={inputRef}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className={`w-full p-2 sm:p-3 border-2 ${
                      isIncorrect
                        ? "border-red-500"
                        : isPulsing
                          ? `border-[#1a8f1a] ${styles.pulse}`
                          : "border-[#1a8f1a]"
                    } rounded-md bg-black text-[#1a8f1a] focus:outline-none focus:ring-2 focus:ring-[#1a8f1a] text-sm sm:text-base uppercase neon-border`}
                    placeholder="YOUR ANSWER"
                    required
                  />
                  {isPulsing && (
                    <span className={`absolute -top-6 left-0 text-[#1a8f1a] text-xs sm:text-sm ${styles.bounce}`}>
                      Start here
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto p-2 sm:p-3 bg-[#1a8f1a] text-black rounded-md hover:bg-[#23b323] focus:outline-none focus:ring-2 focus:ring-[#1a8f1a] transition-colors duration-300 neon-border retro-btn"
                >
                  <ChevronRight size={24} className="mx-auto sm:w-6 sm:h-6" />
                </button>
              </div>
            </form>
          )}
          {showFeedback && (
            <div className="absolute bottom-4 sm:bottom-20 left-0 right-0 text-center">
              <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 text-[#1a8f1a] text-sm sm:text-base md:text-lg font-bold border-2 border-[#1a8f1a] bg-black rounded-md neon-text neon-border">
                CORRECT!
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

