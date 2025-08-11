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
  const isVictorious = score >= 5;

  const title = isVictorious
    ? "🏆 GLADIATOR VICTORIOUS!"
    : "⚔️ FALLEN IN BATTLE!";

  const message = isVictorious
    ? "Hail, mighty warrior! You have conquered the arena and earned the crowd's roar! The gods smile upon your valor and skill!"
    : "You have fought bravely, but the arena has claimed another soul. Rise again, gladiator, for only through defeat do we learn victory!";

  return (
    <div className="flex min-h-screen items-center justify-center p-6 text-yellow-900 font-serif bg-amber-50">
      <Card className="w-full max-w-md border-4 border-yellow-800 rounded-xl shadow-lg shadow-yellow-700/300">
        <CardContent className="p-8 text-center text-yellow-900 font-serif">
          <CheckCircle
            className={`mx-auto mb-4 h-16 w-16 drop-shadow-md ${
              isVictorious ? "text-yellow-700" : "text-red-700"
            }`}
          />
          <h1
            className={`mb-4 text-3xl font-extrabold tracking-wide drop-shadow-sm ${
              isVictorious ? "text-yellow-700" : "text-red-900"
            }`}
          >
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
            className={`w-full font-bold tracking-wide rounded shadow-md ${
              isVictorious
                ? "bg-yellow-700 hover:bg-yellow-800 text-yellow-100"
                : "bg-red-800 hover:bg-red-900 text-yellow-100"
            }`}
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            {isVictorious ? "Fight Again, Champion!" : "Return to Arena"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
