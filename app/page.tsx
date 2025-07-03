"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Play, RotateCcw, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface Level {
  id: number;
  title: string;
  description: string;
  options: Array<{
    label: string[];
    value: string;
    css: Record<string, string>;
  }>;
  correctAnswer: number;
  correctCSS: Record<string, string>;
}

const levels: Level[] = [
  {
    id: 1,
    title: "Center the Square",
    description:
      "Move the blue square to the red target using justify-content and align-items",
    options: [
      {
        label: ["justify-content: flex-start", "align-items: flex-start"],
        value: "start-start",
        css: {
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        },
      },
      {
        label: ["justify-content: center", "align-items: center"],
        value: "center-center",
        css: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      {
        label: ["justify-content: flex-end", "align-items: flex-start"],
        value: "end-start",
        css: {
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        },
      },
      {
        label: ["justify-content: flex-start", "align-items: flex-end"],
        value: "start-end",
        css: {
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    id: 2,
    title: "Move to Bottom Right",
    description:
      "Move the blue square to the red target in the bottom right corner",
    options: [
      {
        label: ["justify-content: center", "align-items: flex-start"],
        value: "center-start",
        css: {
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        },
      },
      {
        label: ["justify-content: flex-end", "align-items: center"],
        value: "end-center",
        css: {
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        },
      },
      {
        label: ["justify-content: flex-end", "align-items: flex-end"],
        value: "end-end",
        css: {
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        },
      },
      {
        label: ["justify-content: flex-start", "align-items: flex-end"],
        value: "start-end",
        css: {
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        },
      },
    ],
    correctAnswer: 2,
    correctCSS: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
  },
];

const initialCSS = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

export default function FlexboxGame() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [appliedCSS, setAppliedCSS] =
    useState<Record<string, string>>(initialCSS);

  const level = levels[currentLevel];

  useEffect(() => {
    if (!gameStarted || showFeedback || gameCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, showFeedback, gameCompleted]);

  const handleTimeUp = () => {
    setShowFeedback(true);
    setIsCorrect(false);
    setAppliedCSS(level.correctCSS);
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return;

    setSelectedOption(optionIndex);
    const correct = optionIndex === level.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    setAppliedCSS(level.options[optionIndex].css);

    if (!correct) {
      setTimeout(() => {
        setAppliedCSS(level.correctCSS);
      }, 1500);
    }
  };

  const handleNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      resetLevel();
    } else {
      setGameCompleted(true);
    }
  };

  const resetLevel = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setTimeLeft(20);
    setAppliedCSS(initialCSS);
  };

  const startGame = () => {
    setGameStarted(true);
    resetLevel();
  };

  const restartGame = () => {
    setCurrentLevel(0);
    setGameStarted(false);
    setGameCompleted(false);
    resetLevel();
  };

  if (!gameStarted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-800">
              Flexbox Challenge
            </h1>
            <p className="mb-6 text-gray-600">
              Learn flexbox by moving the blue square to the red target. You
              have 20 seconds per level!
            </p>
            <Button onClick={startGame} size="lg" className="w-full">
              <Play className="mr-2 h-5 w-5" />
              Start Game
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h1 className="mb-4 text-3xl font-bold text-gray-800">
              Congratulations!
            </h1>
            <p className="mb-6 text-gray-600">
              You've completed all levels! You're getting the hang of flexbox.
            </p>
            <Button onClick={restartGame} size="lg" className="w-full">
              <RotateCcw className="mr-2 h-5 w-5" />
              Play Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              Level {level.id}: {level.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold text-gray-700">
                {timeLeft}s
              </div>
              <Progress value={(timeLeft / 20) * 100} className="w-24" />
            </div>
          </div>
          <p className="text-gray-600">{level.description}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Game Area */}
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Game Area</h3>

              <div
                className="relative overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-50"
                style={{ width: "300px", height: "200px" }}
              >
                {/* Target container */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={level.correctCSS}
                >
                  <motion.div
                    className="h-8 w-8 rounded border-2 border-red-600 bg-red-500 opacity-60"
                    initial={{ scale: 0, rotate: 45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  />
                </div>

                {/* Player container - A standard div that has its style updated */}
                <div className="absolute inset-0" style={appliedCSS}>
                  {/* The blue square uses the `layout` prop to animate its position */}
                  <motion.div
                    className="h-8 w-8 rounded border-2 border-blue-600 bg-blue-500 shadow-lg"
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                  />
                </div>

                {/* Grid lines for reference */}
                <div className="pointer-events-none absolute inset-0 opacity-10">
                  <div className="absolute left-1/3 top-0 h-full w-px bg-gray-400" />
                  <div className="absolute left-2/3 top-0 h-full w-px bg-gray-400" />
                  <div className="absolute left-0 top-1/3 h-px w-full bg-gray-400" />
                  <div className="absolute left-0 top-2/3 h-px w-full bg-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Options */}
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold">
                Choose the correct CSS:
              </h3>
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
                    className={`h-auto w-full justify-start px-4 py-4 text-left transition-all duration-300 ${
                      showFeedback && index === level.correctAnswer
                        ? "border-green-600 bg-green-500 text-white hover:bg-green-600"
                        : showFeedback &&
                          selectedOption === index &&
                          index !== level.correctAnswer
                        ? "border-red-600 bg-red-500 text-white hover:bg-red-600"
                        : ""
                    }`}
                    onClick={() => handleOptionSelect(index)}
                    disabled={showFeedback}
                  >
                    <div className="flex flex-col items-start gap-1">
                      {option.label.map((line, lineIndex) => (
                        <code key={lineIndex} className="font-mono text-sm">
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
                        className="mb-4 flex items-center justify-center gap-2 text-green-600"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1 }}
                      >
                        <CheckCircle className="h-6 w-6" />
                        <span className="text-lg font-semibold">Correct!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="mb-4 flex items-center justify-center gap-2 text-red-600"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1 }}
                      >
                        <XCircle className="h-6 w-6" />
                        <span className="text-lg font-semibold">
                          {timeLeft === 0 ? "Time's up!" : "Wrong!"}
                        </span>
                      </motion.div>
                    )}

                    <Button
                      onClick={handleNextLevel}
                      size="lg"
                      className="mt-2"
                    >
                      {currentLevel < levels.length - 1
                        ? "Next Level"
                        : "Complete Game"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
