"use client"

import {webSocket, WsMessage} from "@/lib/websocket";
import {useEffect, useRef, useState} from "react";
import {initialCSS, Level} from "@/lib/types";
import {shuffleLevels} from "@/lib/shuffleLevels";
import {levels as allLevels} from "@/lib/levels";
import GameStartScreen from "@/components/game/GameStartScreen";
import GameEndScreen from "@/components/game/GameEndScreen";
import {Button} from "@/components/ui/button";
import {Play} from "lucide-react";
import OptionSelector from "@/components/game/OptionSelector";
import useWebSocket from "react-use-websocket";
import ControllerStartScreen from "@/components/game/ControllerStartScreen";

export default function Controller() {
    const GAME_DURATION = 60;
    const TARGET_SCORE = 20;

    const ws = useWebSocket(
        'ws://localhost:9090',
        {
            share: false,
            shouldReconnect: () => true,
        },
    )
    const{sendRestartMessage, sendStartMessage, sendAnswerMessage, lastMessage}=webSocket(ws);

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
        parseWsMessage()
    }, [message]);

    const parseWsMessage = () => {
        switch (message?.action) {
            case "set": {
                console.log(message.content)
                const levels =mapNumbersToLevels(message.content)
                if (levels) {
                    setShuffledLevels(levels);
                } else {
                    console.error("Invalid levels received:", message.content);
                }
                break;
            }
            case "countdown": {
                setStarted(true);
                break;
            }
        }
    }

    const mapNumbersToLevels = (levels: string | undefined) => {
      const levelsArray =  levels?.split(",").map(levelNumber => parseInt(levelNumber.trim(),10)).map(levelNumber => {
            return allLevels.find(level => level.id === levelNumber);
        });

      return levelsArray?.filter(level => level !== undefined) as Level[];
    }

    const startGame = () => {
        sendStartMessage();
        resetLevelState();
    };

    const completeStartScreen = ()=> {
        setGameStarted(true);
    }

    const restartGame = () => {
        sendRestartMessage();
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
        sendAnswerMessage(optionIndex)

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
        return <ControllerStartScreen onStart={startGame} started={started} onComplete={completeStartScreen}/>;
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
        <div className="min-h-screen bg-amber-50 p-4">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-6">
                    <div className="mb-4 flex items-center justify-between">
                        <Button
                            size="lg"
                            className="bg-red-800 hover:bg-red-900 text-yellow-100 font-bold font-serif tracking-wide border-2 border-yellow-800 shadow-md"
                            onClick={restartGame}
                        >
                            <Play className="mr-2 h-5 w-5" />
                            🏛️ Back to Arena
                        </Button>
                    </div>
                </div>
                <div className="grid gap-8 lg:grid-cols-2">
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