// components/game/FlexboxGame.tsx
"use client";

import { Progress } from "@/components/ui/progress";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

import { levels as allLevels } from "@/lib/levels";
import { shuffleLevels } from "@/lib/shuffleLevels";
import { Level, initialCSS } from "@/lib/types";

import GameArea from "@/components/game/GameArea";
import GameEndScreen from "@/components/game/GameEndScreen";
import GameStartScreen from "@/components/game/GameStartScreen";
import {webSocket, WsMessage} from "@/lib/websocket";
import useWebSocket from "react-use-websocket";

export default function FlexboxGame() {
  const GAME_DURATION = 60;
  const TARGET_SCORE = 20;

    const ws = useWebSocket(
        'ws://localhost:9090',
        {
            share: false,
            shouldReconnect: () => true,
        },
    )

  const{sendFailMessage, sendNextMessage, sendCountdownMessage, sendSetMessage, lastMessage}=webSocket(ws);

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
    const [message, setMessage] = useState<WsMessage>()
    const [started, setStarted] = useState(false);

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

    useEffect(() => {
        if(lastMessage?.data !== null) {
            if (lastMessage?.data instanceof Blob) {
                const reader = new FileReader();
                reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
                    if (readerEvent?.target?.result) {
                        setMessage(JSON.parse(readerEvent.target.result.toString()) as WsMessage);
                    }
                };
                reader.readAsText(lastMessage.data);
            } else {
                // Handle text messages if applicable
                console.log("Received text data:", lastMessage);
            }
        }
    }, [lastMessage]);

    useEffect(() => {
        console.log(message)
        parseWsMessage()
    }, [message]);

    const parseWsMessage = () => {
        switch (message?.action) {
            case "start": {
                setStarted(true);
                setAndShuffleLevels();
                break;
            }
            case "answer": {
                console.log("Received answer:", message.content);

                handleOptionSelect(parseInt(message.content ?? "0"))
                break;
            }
        }
    }

    const setAndShuffleLevels = () => {
        const shuffled = shuffleLevels([...allLevels]);
        setShuffledLevels(shuffled);
        sendSetMessage(shuffled.map(level => level.id));
    }

  const startGame = () => {
    setGameStarted(true);
    resetLevelState();
  };

  const restartGame = () => {
      setAndShuffleLevels()
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
    return <GameStartScreen onStart={startGame} started={started} onCountDown={sendCountdownMessage}/>;
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
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="text-4xl font-bold text-red-900 font-serif tracking-wide drop-shadow-sm"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                ⚔️ Score: {romanMap[score]}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`text-4xl font-bold font-serif tracking-wide drop-shadow-sm ${
                  totalTimeLeft <= 10 ? "text-red-600 animate-pulse" : "text-red-900"
                }`}
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                ⏳ {totalTimeLeft}
              </div>
              <Progress
                value={(totalTimeLeft / GAME_DURATION) * 100}
                className={`w-96 h-4 border-2 border-yellow-700 ${
                  totalTimeLeft <= 10 ? "bg-red-200 [&>div]:bg-red-600" : ""
                }`}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-1">
          <GameArea
            appliedCSS={appliedCSS}
            correctCSS={level.correctCSS}
            itemCount={level.itemCount || 1}
          />
        </div>
      </div>
    </div>
  );
}
