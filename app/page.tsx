// components/game/FlexboxGame.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { levels as allLevels } from "@/lib/levels";
import { shuffleLevels } from "@/lib/shuffleLevels";
import { Level, initialCSS } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

import GameArea from "@/components/game/GameArea";
import GameEndScreen from "@/components/game/GameEndScreen";
import GameStartScreen from "@/components/game/GameStartScreen";

export default function FlexboxGame() {
  const GAME_DURATION = 60; // seconds
  const TARGET_SCORE = 5; // Increased for more challenge with 10 levels

  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameResult, setGameResult] = useState<"win" | "lose" | null>(null);

  const [shuffledLevels, setShuffledLevels] = useState<Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);

  const [totalTimeLeft, setTotalTimeLeft] = useState(GAME_DURATION);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [appliedCSS, setAppliedCSS] =
    useState<Record<string, string>>(initialCSS);

  useEffect(() => {
    const shuffled = shuffleLevels([...allLevels]);
    setShuffledLevels(shuffled);
  }, []);

  const level = shuffledLevels[currentLevel];

  useEffect(() => {
    if (!gameStarted || gameCompleted) return;

    const timer = setInterval(() => {
      setTotalTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameCompleted(true);
          setGameResult("lose"); // Lost if time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameCompleted]);

  const startGame = () => {
    setGameStarted(true);
    resetLevelState();
  };

  const restartGame = () => {
    const shuffled = shuffleLevels([...allLevels]);
    setShuffledLevels(shuffled);
    setCurrentLevel(0);
    setScore(0);
    setTotalTimeLeft(GAME_DURATION);
    setGameStarted(false);
    setGameCompleted(false);
    setGameResult(null);
    resetLevelState();
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return;

    setSelectedOption(optionIndex);
    const correct = optionIndex === level.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    setAppliedCSS({ ...initialCSS, ...level.options[optionIndex].css });

    if (correct) {
      const nextScore = score + 1;
      setScore(nextScore);

      if (nextScore >= TARGET_SCORE) {
        setTimeout(() => {
          setGameCompleted(true);
          setGameResult("win");
        }, 1000);
        return;
      }
    } else {
      // Briefly show the correct answer if wrong
      setTimeout(() => {
        setAppliedCSS(level.correctCSS);
      }, 1500);
    }
  };

  const handleNextLevel = () => {
    if (currentLevel < shuffledLevels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      resetLevelState();
    } else {
      setGameCompleted(true);
      // If they finish all levels, they win regardless of score
      setGameResult("win");
    }
  };

  const resetLevelState = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setAppliedCSS(initialCSS);
  };

  if (!gameStarted) {
    return <GameStartScreen onStart={startGame} />;
  }

  if (gameCompleted) {
    return (
      <GameEndScreen
        gameResult={gameResult}
        score={score}
        onRestart={restartGame}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              Level {currentLevel + 1}: {level.title}
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
          <GameArea
            appliedCSS={appliedCSS}
            correctCSS={level.correctCSS}
            itemCount={level.itemCount || 1}
          />

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
                      showFeedback && index === selectedOption
                        ? index === level.correctAnswer
                          ? "default"
                          : "destructive"
                        : "outline"
                    }
                    className={`h-auto w-full justify-start px-4 py-4 text-left transition-all duration-300 ${
                      showFeedback && index === level.correctAnswer
                        ? "border-green-600 bg-green-500 text-white hover:bg-green-600"
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
                      >
                        <CheckCircle className="h-6 w-6" />
                        <span className="text-lg font-semibold">Correct!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="mb-4 flex items-center justify-center gap-2 text-red-600"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
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
                      {currentLevel < shuffledLevels.length - 1
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
