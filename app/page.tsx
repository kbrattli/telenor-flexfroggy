// components/game/FlexboxGame.tsx
"use client";

import { Progress } from "@/components/ui/progress";
import { Play, Timer, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { levels as allLevels } from "@/lib/levels";
import { shuffleLevels } from "@/lib/shuffleLevels";
import { Level, initialCSS } from "@/lib/types";

import GameArea from "@/components/game/GameArea";
import GameEndScreen from "@/components/game/GameEndScreen";
import GameStartScreen from "@/components/game/GameStartScreen";
import OptionSelector from "@/components/game/OptionSelector";
import { Button } from "@/components/ui/button";
import backgroundImage from "@/assets/cake-icons/bg.webp";

export default function FlexboxGame() {
  const GAME_DURATION = 60;
  const TARGET_SCORE = 7;
  const CORRECT_FEEDBACK_MS = 1500;
  const INCORRECT_FEEDBACK_MS = 1000;
  const INCORRECT_REVEAL_MS = 1500;

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
  const autoAdvanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const incorrectRevealTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const winTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipAutoAdvanceRef = useRef(false);

  const clearTimeoutRef = (timeoutRef: {
    current: ReturnType<typeof setTimeout> | null;
  }) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const clearPendingTimeouts = () => {
    clearTimeoutRef(autoAdvanceTimeoutRef);
    clearTimeoutRef(incorrectRevealTimeoutRef);
    clearTimeoutRef(winTimeoutRef);
  };

  const formatScore = (value: number) =>
    Number.isInteger(value) ? value.toString() : value.toFixed(1);

  useEffect(() => {
    const shuffled = shuffleLevels([...allLevels]);
    setShuffledLevels(shuffled);
  }, []);

  const level = shuffledLevels[currentLevel];

  // Nedtelling
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

  // Gå automatisk videre etter tilbakemelding
  useEffect(() => {
    if (!showFeedback || skipAutoAdvanceRef.current) return;

    autoAdvanceTimeoutRef.current = setTimeout(
      () => {
        handleNextLevel();
      },
      isCorrect ? CORRECT_FEEDBACK_MS : INCORRECT_FEEDBACK_MS,
    );

    return () => clearTimeoutRef(autoAdvanceTimeoutRef);
  }, [showFeedback, isCorrect]);

  useEffect(() => {
    return () => {
      clearPendingTimeouts();
    };
  }, []);

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

    clearPendingTimeouts();
    skipAutoAdvanceRef.current = false;
    setSelectedOption(optionIndex);
    const correct = optionIndex === level.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    setAppliedCSS({ ...initialCSS, ...level.options[optionIndex].css });

    if (correct) {
      const nextScore = Math.min(score + 1, TARGET_SCORE);
      setScore(nextScore);

      if (nextScore >= TARGET_SCORE) {
        skipAutoAdvanceRef.current = true;
        winTimeoutRef.current = setTimeout(() => {
          setGameCompleted(true);
          setGameResult("win");
        }, CORRECT_FEEDBACK_MS);
        return;
      }
    } else {
      setScore((prevScore) => Math.max(0, prevScore - 0.5));
      incorrectRevealTimeoutRef.current = setTimeout(() => {
        setAppliedCSS({ ...initialCSS, ...level.correctCSS });
      }, INCORRECT_REVEAL_MS);
    }
  };

  const handleNextLevel = () => {
    if (currentLevel < shuffledLevels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    } else {
      const reshuffled = shuffleLevels([...allLevels]);
      setShuffledLevels(reshuffled);
      setCurrentLevel(0);
    }

    resetLevelState();
  };

  const resetLevelState = () => {
    clearPendingTimeouts();
    skipAutoAdvanceRef.current = false;
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setAppliedCSS(initialCSS);
  };

  if (!gameStarted) {
    return <GameStartScreen onStart={startGame} targetScore={TARGET_SCORE} />;
  }

  if (gameCompleted) {
    return (
      <GameEndScreen
        gameResult={gameResult}
        score={score}
        targetScore={TARGET_SCORE}
        onRestart={restartGame}
      />
    );
  }

  return (
    <div
      className="min-h-svh p-6 flex items-center"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="mx-auto max-w-8xl min-h-min w-fit pt-10 px-8 lg:px-16 py-12">
        {/* Toppfelt */}
        <div className="mb-10">
          <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-telenor-light-blue flex items-center gap-2">
                <Trophy className="h-7 w-7" />
                Poeng: {formatScore(score)} / {TARGET_SCORE}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`text-3xl font-bold tabular-nums flex items-center gap-2 ${
                  totalTimeLeft <= 10
                    ? "text-telenor-hot-pink animate-pulse"
                    : "text-telenor-light-blue"
                }`}
              >
                <Timer className="h-7 w-7" />
                {totalTimeLeft}
              </div>
              <Progress
                value={(totalTimeLeft / GAME_DURATION) * 100}
                className={`w-96 h-3 ${
                  totalTimeLeft <= 10
                    ? "bg-telenor-peach [&>div]:bg-telenor-hot-pink"
                    : "bg-white/40 [&>div]:bg-telenor-light-blue"
                }`}
              />
            </div>
            <Button
              size="lg"
              className="bg-telenor-dark-blue hover:bg-telenor-dark-blue/90 text-white font-bold transition-colors"
              onClick={restartGame}
            >
              <Play className="mr-2 h-5 w-5" />
              Tilbake til start
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 auto-rows-fr">
          <GameArea
            levelId={level.id}
            appliedCSS={appliedCSS}
            correctCSS={level.correctCSS}
            itemCount={level.itemCount || 1}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
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
