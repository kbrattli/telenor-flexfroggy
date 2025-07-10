"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Level, initialCSS } from "@/lib/types";
import { levels as allLevels } from "@/lib/levels";
import { shuffleLevels } from "@/lib/shuffleLevels";

import GameStartScreen from "@/components/game/GameStartScreen";
import GameEndScreen from "@/components/game/GameEndScreen";
import GameArea from "@/components/game/GameArea";
import OptionSelector from "@/components/game/OptionSelector";

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

    // Shuffle
  useEffect(() => {
    const shuffled = shuffleLevels([...allLevels]);
    setShuffledLevels(shuffled);
  }, []);

  const level = shuffledLevels[currentLevel];

  // Timer
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

  // Delay for feedback before new task/level
  useEffect(() => {
  if (showFeedback) {
    const timer = setTimeout(() => {
      handleNextLevel();
    }, 1000);

    return () => clearTimeout(timer);
  }
}, [showFeedback]);

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
          <GameArea 
          appliedCSS={appliedCSS} 
          correctCSS={level.correctCSS} 
          itemCount={level.itemCount || 1} />

          <OptionSelector   
            level={level}
            selectedOption={selectedOption}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            currentLevel={currentLevel}
            totalLevels={shuffledLevels.length}
            onSelect={handleOptionSelect}
            onNext={handleNextLevel} />
        </div>
      </div>
    </div>
  );
}
