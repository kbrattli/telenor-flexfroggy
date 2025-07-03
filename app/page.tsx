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
  itemCount?: number;
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
  {
    id: 3,
    title: "Vertical Stack",
    description:
      "Stack the boxes vertically from top to bottom using flex-direction",
    itemCount: 3,
    options: [
      {
        label: ["flex-direction: row", "align-items: flex-start"],
        value: "row-start",
        css: {
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        },
      },
      {
        label: ["flex-direction: column", "align-items: flex-start"],
        value: "column-start",
        css: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        },
      },
      {
        label: ["flex-direction: column", "align-items: center"],
        value: "column-center",
        css: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      },
      {
        label: ["flex-direction: row", "justify-content: center"],
        value: "row-center",
        css: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  {
    id: 4,
    title: "Equal Space Distribution",
    description:
      "Distribute the boxes with equal space around each one using space-around",
    itemCount: 4,
    options: [
      {
        label: ["justify-content: space-between"],
        value: "space-between",
        css: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        },
      },
      {
        label: ["justify-content: space-around"],
        value: "space-around",
        css: {
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
        },
      },
      {
        label: ["justify-content: space-evenly"],
        value: "space-evenly",
        css: {
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
        },
      },
      {
        label: ["justify-content: center"],
        value: "center",
        css: {
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "flex-start",
    },
  },
  {
    id: 5,
    title: "Wrap and Center Lines",
    description:
      "Wrap the boxes to multiple lines and center all lines vertically using align-content",
    itemCount: 9,
    options: [
      {
        label: ["flex-wrap: wrap", "align-items: center"],
        value: "wrap-items-center",
        css: {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "flex-start",
        },
      },
      {
        label: ["flex-wrap: wrap", "align-content: center"],
        value: "wrap-content-center",
        css: {
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "flex-start",
        },
      },
      {
        label: ["flex-wrap: wrap", "justify-content: center"],
        value: "wrap-justify-center",
        css: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
        },
      },
      {
        label: ["flex-wrap: nowrap", "align-content: center"],
        value: "nowrap-content-center",
        css: {
          display: "flex",
          flexWrap: "nowrap",
          alignContent: "center",
          justifyContent: "flex-start",
        },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      flexWrap: "wrap",
      alignContent: "center",
      justifyContent: "flex-start",
    },
  },
  {
    id: 6,
    title: "Reverse Column with End Alignment",
    description:
      "Stack boxes vertically from bottom to top and align them to the right",
    itemCount: 4,
    options: [
      {
        label: ["flex-direction: column", "align-items: flex-end"],
        value: "column-end",
        css: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        },
      },
      {
        label: ["flex-direction: column-reverse", "align-items: flex-start"],
        value: "column-reverse-start",
        css: {
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "flex-start",
        },
      },
      {
        label: ["flex-direction: column-reverse", "align-items: flex-end"],
        value: "column-reverse-end",
        css: {
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "flex-end",
        },
      },
      {
        label: ["flex-direction: row-reverse", "align-items: flex-end"],
        value: "row-reverse-end",
        css: {
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "flex-end",
        },
      },
    ],
    correctAnswer: 2,
    correctCSS: {
      display: "flex",
      flexDirection: "column-reverse",
      alignItems: "flex-end",
    },
  },
  {
    id: 7,
    title: "Complex Wrap Layout",
    description:
      "Wrap boxes to multiple lines, space them evenly on each line, and push all lines to the bottom",
    itemCount: 11,
    options: [
      {
        label: [
          "flex-wrap: wrap",
          "justify-content: space-evenly",
          "align-content: flex-start",
        ],
        value: "wrap-evenly-start",
        css: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignContent: "flex-start",
        },
      },
      {
        label: [
          "flex-wrap: wrap",
          "justify-content: space-evenly",
          "align-content: flex-end",
        ],
        value: "wrap-evenly-end",
        css: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignContent: "flex-end",
        },
      },
      {
        label: [
          "flex-wrap: wrap",
          "justify-content: space-between",
          "align-content: flex-end",
        ],
        value: "wrap-between-end",
        css: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignContent: "flex-end",
        },
      },
      {
        label: [
          "flex-wrap: wrap",
          "justify-content: center",
          "align-content: flex-end",
        ],
        value: "wrap-center-end",
        css: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "flex-end",
        },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      alignContent: "flex-end",
    },
  },
  {
    id: 8,
    title: "Master Challenge",
    description:
      "Create a reverse row layout where boxes wrap to new lines, each line is centered, and all lines are distributed with space around them",
    itemCount: 13,
    options: [
      {
        label: [
          "flex-direction: row-reverse",
          "flex-wrap: wrap",
          "justify-content: center",
          "align-content: space-around",
        ],
        value: "master-correct",
        css: {
          display: "flex",
          flexDirection: "row-reverse",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "space-around",
        },
      },
      {
        label: [
          "flex-direction: row-reverse",
          "flex-wrap: wrap",
          "justify-content: space-around",
          "align-content: center",
        ],
        value: "master-wrong1",
        css: {
          display: "flex",
          flexDirection: "row-reverse",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "center",
        },
      },
      {
        label: [
          "flex-direction: row",
          "flex-wrap: wrap",
          "justify-content: center",
          "align-content: space-around",
        ],
        value: "master-wrong2",
        css: {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "space-around",
        },
      },
      {
        label: [
          "flex-direction: row-reverse",
          "flex-wrap: nowrap",
          "justify-content: center",
          "align-content: space-around",
        ],
        value: "master-wrong3",
        css: {
          display: "flex",
          flexDirection: "row-reverse",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignContent: "space-around",
        },
      },
    ],
    correctAnswer: 0,
    correctCSS: {
      display: "flex",
      flexDirection: "row-reverse",
      flexWrap: "wrap",
      justifyContent: "center",
      alignContent: "space-around",
    },
  },
];

const initialCSS = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const GAME_DURATION = 60; // Total game time in seconds

export default function FlexboxGame() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [totalTimeLeft, setTotalTimeLeft] = useState(GAME_DURATION);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [score, setScore] = useState(0);
  const [appliedCSS, setAppliedCSS] =
    useState<Record<string, string>>(initialCSS);

  const level = levels[currentLevel];

  useEffect(() => {
    if (!gameStarted || gameCompleted) return;

    const timer = setInterval(() => {
      setTotalTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeUp(true);
          setGameCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameCompleted]);

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return;

    setSelectedOption(optionIndex);
    const correct = optionIndex === level.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }

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
      resetLevelState();
    } else {
      setGameCompleted(true);
    }
  };

  const resetLevelState = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setAppliedCSS(initialCSS);
  };

  const startGame = () => {
    setGameStarted(true);
    resetLevelState();
  };

  const restartGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setTotalTimeLeft(GAME_DURATION);
    setGameStarted(false);
    setGameCompleted(false);
    setTimeUp(false);
    resetLevelState();
  };

  const renderBoxes = (count: number, isTarget: boolean = false) => {
    return Array.from({ length: count }, (_, index) => {
      const animationProps = {
        layout: true,
        initial: { scale: 0, rotate: 45 },
        animate: { scale: 1, rotate: 0 },
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: index * 0.05,
        },
      };

      if (isTarget) {
        return (
          <motion.div
            key={`target-${index}`}
            className="h-12 w-12 rounded border-2 border-red-600 bg-red-500 opacity-60 shadow-lg"
            style={{ margin: "5px" }}
            {...animationProps}
          />
        );
      }

      // Player box: an invisible container for layout, with a smaller visible box inside.
      return (
        <motion.div
          key={`player-${index}`}
          className="flex h-12 w-12 items-center justify-center"
          style={{ margin: "5px" }}
          {...animationProps}
        >
          <div className="h-10 w-10 rounded border-2 border-blue-600 bg-blue-500 shadow-lg" />
        </motion.div>
      );
    });
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
              Master flexbox by solving as many levels as you can in 60 seconds.
              Good luck!
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
              {timeUp ? "Time's Up!" : "Challenge Complete!"}
            </h1>
            <p className="mb-2 text-xl text-gray-700">
              You correctly solved{" "}
              <span className="font-bold text-blue-600">
                {score} out of {levels.length}
              </span>{" "}
              levels.
            </p>
            <p className="mb-6 text-gray-600">
              {score > 6
                ? "Incredible work! You're a true Flexbox Master!"
                : "Great job! Keep practicing to master every concept."}
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
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              Level {level.id}: {level.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold text-gray-700">
                Score: {score}
              </div>
              <div className="text-lg font-semibold text-gray-700">
                {totalTimeLeft}s
              </div>
              <Progress
                value={(totalTimeLeft / GAME_DURATION) * 100}
                className="w-24"
              />
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
                style={{
                  width: "400px",
                  height:
                    level.itemCount && level.itemCount > 6 ? "350px" : "280px",
                }}
              >
                {/* Target container */}
                <div
                  className="pointer-events-none absolute inset-0 p-2"
                  style={level.correctCSS}
                >
                  {renderBoxes(level.itemCount || 1, true)}
                </div>

                {/* Player container */}
                <div className="absolute inset-0 p-2" style={appliedCSS}>
                  {renderBoxes(level.itemCount || 1, false)}
                </div>

                {/* Grid lines for reference */}
                <div className="pointer-events-none absolute inset-0 opacity-5">
                  <div className="absolute left-1/4 top-0 h-full w-px bg-gray-400" />
                  <div className="absolute left-1/2 top-0 h-full w-px bg-gray-400" />
                  <div className="absolute left-3/4 top-0 h-full w-px bg-gray-400" />
                  <div className="absolute left-0 top-1/4 h-px w-full bg-gray-400" />
                  <div className="absolute left-0 top-1/2 h-px w-full bg-gray-400" />
                  <div className="absolute left-0 top-3/4 h-px w-full bg-gray-400" />
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
                        <span className="text-lg font-semibold">
                          {currentLevel >= 6 ? "Excellent!" : "Correct!"}
                        </span>
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
                          Not quite! See the correct layout above.
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
                        : "Finish Game"}
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
