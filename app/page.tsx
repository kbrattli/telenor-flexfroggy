"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, RotateCcw, Play } from "lucide-react"

interface Level {
  id: number
  title: string
  description: string
  options: Array<{
    label: string[]
    value: string
    css: Record<string, string>
  }>
  correctAnswer: number
  correctCSS: Record<string, string>
}

const levels: Level[] = [
  {
    id: 1,
    title: "Center the Square",
    description: "Move the blue square to the red target using justify-content",
    options: [
      {
        label: ["justify-content: flex-start"],
        value: "flex-start",
        css: { display: "flex", justifyContent: "flex-start", alignItems: "center" },
      },
      {
        label: ["justify-content: center"],
        value: "center",
        css: { display: "flex", justifyContent: "center", alignItems: "center" },
      },
      {
        label: ["justify-content: flex-end"],
        value: "flex-end",
        css: { display: "flex", justifyContent: "flex-end", alignItems: "center" },
      },
      {
        label: ["justify-content: space-between"],
        value: "space-between",
        css: { display: "flex", justifyContent: "space-between", alignItems: "center" },
      },
    ],
    correctAnswer: 1,
    correctCSS: { display: "flex", justifyContent: "center", alignItems: "center" },
  },
  {
    id: 2,
    title: "Center Both Ways",
    description: "Move the blue square to the red target using both justify-content and align-items",
    options: [
      {
        label: ["justify-content: center", "align-items: flex-start"],
        value: "center-start",
        css: { display: "flex", justifyContent: "center", alignItems: "flex-start" },
      },
      {
        label: ["justify-content: center", "align-items: center"],
        value: "center-center",
        css: { display: "flex", justifyContent: "center", alignItems: "center" },
      },
      {
        label: ["justify-content: flex-start", "align-items: center"],
        value: "start-center",
        css: { display: "flex", justifyContent: "flex-start", alignItems: "center" },
      },
      {
        label: ["justify-content: flex-end", "align-items: flex-end"],
        value: "end-end",
        css: { display: "flex", justifyContent: "flex-end", alignItems: "flex-end" },
      },
    ],
    correctAnswer: 1,
    correctCSS: { display: "flex", justifyContent: "center", alignItems: "center" },
  },
]

export default function FlexboxGame() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [timeLeft, setTimeLeft] = useState(20)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [appliedCSS, setAppliedCSS] = useState<Record<string, string>>({})

  const level = levels[currentLevel]

  useEffect(() => {
    // Reset CSS when level changes
    setAppliedCSS({})
  }, [currentLevel])

  useEffect(() => {
    if (!gameStarted || showFeedback || gameCompleted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, showFeedback, gameCompleted])

  const handleTimeUp = () => {
    setShowFeedback(true)
    setIsCorrect(false)
    // Show correct CSS
    setAppliedCSS(level.correctCSS)
  }

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return

    setSelectedOption(optionIndex)
    const correct = optionIndex === level.correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)

    // Apply the selected CSS
    setAppliedCSS(level.options[optionIndex].css)

    if (!correct) {
      // Show the correct answer after a delay
      setTimeout(() => {
        setAppliedCSS(level.correctCSS)
      }, 1500)
    }
  }

  const handleNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1)
      resetLevel()
    } else {
      setGameCompleted(true)
    }
  }

  const resetLevel = () => {
    setSelectedOption(null)
    setShowFeedback(false)
    setIsCorrect(false)
    setTimeLeft(20)
    setAppliedCSS({})
  }

  const startGame = () => {
    setGameStarted(true)
    resetLevel()
  }

  const restartGame = () => {
    setCurrentLevel(0)
    setGameStarted(false)
    setGameCompleted(false)
    resetLevel()
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Flexbox Challenge</h1>
            <p className="text-gray-600 mb-6">
              Learn flexbox by moving the blue square to the red target. You have 20 seconds per level!
            </p>
            <Button onClick={startGame} size="lg" className="w-full">
              <Play className="mr-2 h-5 w-5" />
              Start Game
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Congratulations!</h1>
            <p className="text-gray-600 mb-6">You've completed all levels! You're getting the hang of flexbox.</p>
            <Button onClick={restartGame} size="lg" className="w-full">
              <RotateCcw className="mr-2 h-5 w-5" />
              Play Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Level {level.id}: {level.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold text-gray-700">{timeLeft}s</div>
              <Progress value={(timeLeft / 20) * 100} className="w-24" />
            </div>
          </div>
          <p className="text-gray-600">{level.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Game Area */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Game Area</h3>

              {/* Outer container - position relative */}
              <div
                className="relative border-2 border-gray-300 bg-gray-50 rounded-lg overflow-hidden"
                style={{ width: "300px", height: "200px" }}
              >
                {/* Target container - shows where correct CSS positions the square */}
                <div className="absolute inset-0 pointer-events-none" style={level.correctCSS}>
                  <motion.div
                    className="w-8 h-8 bg-red-500 rounded opacity-60 border-2 border-red-600"
                    initial={{ scale: 0, rotate: 45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  />
                </div>

                {/* Player container - applies the selected CSS with animation */}
                <motion.div
                  className="absolute inset-0"
                  style={appliedCSS}
                  initial={false}
                  animate={appliedCSS}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.8,
                  }}
                >
                  <motion.div
                    className="w-8 h-8 bg-blue-500 rounded shadow-lg border-2 border-blue-600"
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      duration: 0.6,
                    }}
                  />
                </motion.div>

                {/* Grid lines for reference */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute left-1/3 top-0 w-px h-full bg-gray-400" />
                  <div className="absolute left-2/3 top-0 w-px h-full bg-gray-400" />
                  <div className="absolute top-1/3 left-0 w-full h-px bg-gray-400" />
                  <div className="absolute top-2/3 left-0 w-full h-px bg-gray-400" />
                </div>
              </div>

              {/* CSS Display */}
              {Object.keys(appliedCSS).length > 0 && (
                <motion.div
                  className="mt-4 p-3 bg-gray-100 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Applied CSS:</h4>
                  <code className="text-xs text-gray-600 block">
                    {Object.entries(appliedCSS)
                      .filter(([key]) => key !== "display") // Hide display: flex as it's always there
                      .map(([key, value]) => `${key}: ${value};`)
                      .join("\n")}
                  </code>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Options */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Choose the correct CSS:</h3>
              <div className="space-y-3">
                {level.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={
                      showFeedback
                        ? index === level.correctAnswer
                          ? "default"
                          : selectedOption === index
                            ? "destructive"
                            : "outline"
                        : selectedOption === index
                          ? "default"
                          : "outline"
                    }
                    className={`w-full justify-start text-left h-auto py-4 px-4 transition-all duration-300 ${
                      showFeedback && index === level.correctAnswer
                        ? "bg-green-500 hover:bg-green-600 text-white border-green-600"
                        : showFeedback && selectedOption === index && index !== level.correctAnswer
                          ? "bg-red-500 hover:bg-red-600 text-white border-red-600"
                          : ""
                    }`}
                    onClick={() => handleOptionSelect(index)}
                    disabled={showFeedback}
                  >
                    <div className="flex flex-col items-start gap-1">
                      {option.label.map((line, lineIndex) => (
                        <code key={lineIndex} className="text-sm font-mono">
                          {line}
                        </code>
                      ))}
                    </div>
                  </Button>
                ))}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 text-center"
                  >
                    {isCorrect ? (
                      <motion.div
                        className="flex items-center justify-center gap-2 text-green-600 mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1 }}
                      >
                        <CheckCircle className="h-6 w-6" />
                        <span className="text-lg font-semibold">Correct!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex items-center justify-center gap-2 text-red-600 mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1 }}
                      >
                        <XCircle className="h-6 w-6" />
                        <span className="text-lg font-semibold">{timeLeft === 0 ? "Time's up!" : "Wrong!"}</span>
                      </motion.div>
                    )}

                    <Button onClick={handleNextLevel} size="lg" className="mt-2">
                      {currentLevel < levels.length - 1 ? "Next Level" : "Complete Game"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
