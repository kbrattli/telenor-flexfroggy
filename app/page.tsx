// components/game/FlexboxGame.tsx
"use client";

import { Progress } from "@/components/ui/progress";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

import { Level, initialCSS } from "@/lib/types";
import { levels as allLevels } from "@/lib/levels";
import { shuffleLevels } from "@/lib/shuffleLevels";

import GameArea from "@/components/game/GameArea";
import OptionSelector from "@/components/game/OptionSelector";
import GameEndScreen from "@/components/game/GameEndScreen";
import GameStartScreen from "@/components/game/GameStartScreen";
import {Button} from "@/components/ui/button";

export default function FlexboxGame() {
  const GAME_DURATION = 60;
  const TARGET_SCORE = 5;

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
  const [appliedCSS, setAppliedCSS] = useState<Record<string, string>>(initialCSS);

  useEffect(() => {
    const shuffled = shuffleLevels([...allLevels]);
    setShuffledLevels(shuffled);
  }, []);


  const level = shuffledLevels[currentLevel];

  // Countdown timer
  useEffect(() => {
    if (!gameStarted || gameCompleted) return;

    const timer = setInterval(() => {
      setTotalTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameCompleted(true);
          setGameResult("lose");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameCompleted]);

  // Auto advance after feedback
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

  const romanMap: Record<number, string> = {
    0: "-",
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
    11: "XI",
    12: "XII",
    13: "XIII",
    14: "XIV",
    15: "XV",
  };

  type Props = {
    score: number;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-semibold text-gray-700">
                Score: {romanMap[score]}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-semibold text-gray-700">
                {totalTimeLeft}s
              </div>
              <Progress
                  value={(totalTimeLeft / GAME_DURATION) * 100}
                  className="w-96 h-4"
              />
            </div>
            <Button
                size="lg"
                className="hei"
            >
              <Play className="hei" />
              Back to start
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <GameArea
            appliedCSS={appliedCSS}
            correctCSS={level.correctCSS}
            itemCount={level.itemCount || 1}
          />

          <OptionSelector
            level={level}
            selectedOption={selectedOption}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            currentLevel={currentLevel}
            totalLevels={shuffledLevels.length}
            onSelect={handleOptionSelect}
            onNext={handleNextLevel}
          />
        </div>
      </div>
    </div>
  );
}
