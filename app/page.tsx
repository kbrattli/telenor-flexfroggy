"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Play, RotateCcw, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Level, initialCSS } from "@/lib/types";
import { levels as allLevels } from "@/lib/levels";
import { shuffleLevels } from "@/lib/shuffleLevels";

import GameStartScreen from "@/components/game/GameStartScreen";
import GameEndScreen from "@/components/game/GameEndScreen";

export default function FlexboxGame() {

  const GAME_DURATION = 60; // seconds
  const TARGET_SCORE = 3;

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
  const [timeUp, setTimeUp] = useState(false);
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
          setTimeUp(true);
          setGameCompleted(true);
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
    setCurrentLevel(0);
    setScore(0);
    setTotalTimeLeft(GAME_DURATION);
    setGameStarted(false);
    setGameCompleted(false);
    setTimeUp(false);
    setGameResult(null);
    resetLevelState();
    const shuffled = shuffleLevels([...allLevels]);
    setShuffledLevels(shuffled);
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return;

    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === level.correctAnswer;
    setIsCorrect(isCorrect);
    setShowFeedback(true);
    setAppliedCSS(level.options[optionIndex].css);

    if (isCorrect) {
      const nextScore = score + 1;
      setScore(nextScore);

      if (nextScore >= TARGET_SCORE) {
        setTimeout(() => {
          setGameCompleted(true);
          setGameResult("win");
        }, 1000);
        return;
      }
    }

    if (!isCorrect) {
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
    }
  };

  const resetLevelState = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setAppliedCSS(initialCSS);
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
    return <GameStartScreen onStart={startGame} />;
  }

  if (gameCompleted) {
    return <GameEndScreen gameResult={gameResult} score={score} onRestart={restartGame}/>
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
