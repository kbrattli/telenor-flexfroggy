"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, RotateCcw } from "lucide-react";

interface GameEndScreenProps {
  gameResult: "win" | "lose" | null;
  score: number;
  onRestart: () => void;
}

export default function GameEndScreen({
  gameResult,
  score,
  onRestart,
}: GameEndScreenProps) {
  const title =
    gameResult === "win" ? "🏆 Imperial Victory!" : "⏳ The Arena Closes!";
  const message =
    score >= 3
      ? "Magnificent! You have earned the title of Telenorium Champion!"
      : "Honorable effort, gladiator! Train harder to claim ultimate glory.";

  return (
    <div className="flex min-h-screen items-center justify-center p-6 text-yellow-900 font-serif bg-amber-50">
      <Card className="w-full max-w-md border-4 border-yellow-800 rounded-xl shadow-lg shadow-yellow-700/300">
        <CardContent className="p-8 text-center text-yellow-900 font-serif">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-yellow-700 drop-shadow-md" />
          <h1 className="mb-4 text-3xl font-extrabold text-red-900 tracking-wide drop-shadow-sm">
            {title}
          </h1>
          <p className="mb-2 text-xl text-yellow-800 drop-shadow-sm">
            You conquered{" "}
            <span className="font-bold text-red-800">{score}</span> divine
            trials.
          </p>
          <p className="mb-6 text-yellow-800 text-md leading-relaxed drop-shadow-sm italic">
            {message}
          </p>
          <Button
            onClick={onRestart}
            size="lg"
            className="w-full bg-red-800 hover:bg-red-900 text-yellow-100 font-bold tracking-wide rounded shadow-md"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Return to Arena
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
