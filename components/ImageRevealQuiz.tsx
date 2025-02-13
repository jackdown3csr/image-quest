"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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

  useEffect(() => {
    if (correctAnswers === questions.length) {
      setIsQuizCompleted(true)
      setUserAnswer("")
    }
  }, [correctAnswers])

  useEffect(() => {
    if (isIncorrect) {
      const timer = setTimeout(() => setIsIncorrect(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [isIncorrect])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userAnswer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
      setCorrectAnswers((prev) => prev + 1)
      setShowFeedback(true)
      setTimeout(() => {
        setShowFeedback(false)
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1)
        }
      }, 1500)
      setIsIncorrect(false)
    } else {
      setIsIncorrect(true)
    }
    setUserAnswer("")
  }

  const handleImageClick = () => {
    if (isQuizCompleted) {
      setShowLink(true)
    }
  }

  const loadingProgress = (correctAnswers / questions.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[900px] mx-auto bg-black bg-opacity-80 p-4 rounded-lg shadow-inner flex flex-col relative overflow-hidden"
      style={{ height: "480px" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0, 255, 0, 0.03) 0px, rgba(0, 255, 0, 0.03) 1px, transparent 1px, transparent 2px)",
          backgroundSize: "100% 2px",
        }}
      ></div>
      <div className="flex justify-center items-center mb-4 relative z-10">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full shadow-glow-red"></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full shadow-glow-yellow"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full shadow-glow-green"></div>
        </div>
      </div>
      <div
        className="relative w-full mb-4 bg-black overflow-hidden border-2 border-green-500 shadow-lg shadow-green-500/20"
        style={{ height: "200px" }}
      >
        {isQuizCompleted ? (
          <div className="relative w-full h-full cursor-pointer group" onClick={handleImageClick}>
            <Image
              src={revealImageUrl || "/placeholder.svg"}
              alt="Revealed image"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <AnimatePresence>
              {showLink && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90"
                >
                  <motion.a
                    href="https://tinyurl.com/GamingFac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 text-lg sm:text-xl md:text-2xl font-bold hover:text-green-400 transition-colors"
                    whileHover={{ scale: 1.1, textShadow: "0 0 8px rgb(0, 255, 0)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    JOIN THE GAMING FACTION
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
            {!showLink && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300"
              >
                <span className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-shadow-green">
                  CLICK TO CONTINUE
                </span>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-3/4 h-4 bg-gray-800 overflow-hidden mb-2 border border-green-500">
              <motion.div
                className="h-full bg-green-500 relative"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 loading-bar-progress"></div>
              </motion.div>
            </div>
            <p className="text-green-500 text-xs sm:text-sm md:text-base">
              LOADING: {Math.round(loadingProgress)}%
              <span className="loading-dots">{".".repeat(correctAnswers % 4)}</span>
            </p>
          </div>
        )}
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-hide relative z-10 mb-4 px-2" style={{ height: "160px" }}>
        {!isQuizCompleted ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <h2 className="text-xs sm:text-sm md:text-base font-semibold text-green-500 leading-relaxed">
              {questions[currentQuestion].question}
            </h2>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-green-500"
          >
            <h2 className="text-sm sm:text-base md:text-lg font-bold mb-2 glitch" data-text="CONGRATULATIONS!">
              CONGRATULATIONS!
            </h2>
            <p className="text-xs sm:text-sm md:text-base">
              {showLink ? "YOUR LINK IS READY..." : "CLICK THE IMAGE TO CONTINUE"}
            </p>
          </motion.div>
        )}
      </div>

      {!isQuizCompleted && (
        <motion.form
          onSubmit={handleSubmit}
          className={`relative z-10 ${isIncorrect ? "shake" : ""} w-full px-2`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex space-x-2 w-full">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className={`flex-grow p-2 border-2 ${
                isIncorrect ? "border-red-500" : "border-green-500"
              } rounded-none bg-black text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:shadow-[0_0_10px_rgba(0,255,0,0.5)] text-xs sm:text-sm md:text-base uppercase transition-all duration-300`}
              placeholder="YOUR ANSWER"
              required
            />
            <motion.button
              type="submit"
              className="p-2 bg-green-500 text-black rounded-none hover:bg-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </motion.button>
          </div>
        </motion.form>
      )}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 left-0 right-0 text-center"
          >
            <span className="inline-block px-4 py-2 text-green-500 text-sm font-bold border-2 border-green-500 bg-black shadow-[0_0_10px_rgba(0,255,0,0.5)] animate-pulse">
              CORRECT!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

