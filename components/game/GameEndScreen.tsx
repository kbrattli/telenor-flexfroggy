"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { RotateCcw, Trophy, Swords } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

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
  const isVictorious = score >= 6;
  const { width, height } = useWindowSize();

  const TitleIcon = isVictorious ? Trophy : Swords;
  const titleText = isVictorious
    ? "GLADIATOR VICTORIOUS!"
    : "FALLEN IN BATTLE!";

  const message = isVictorious
    ? "Hail, mighty warrior! You have conquered the arena and earned the crowd's roar!"
    : "You have fought bravely, but the arena has claimed another soul. Rise again, gladiator, for only through defeat do we learn victory!";

  // Phone input state
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{8,15}$/.test(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    // Here you would send the phone number to your backend/database
    const existingNumbers: string[] = JSON.parse(localStorage.getItem("winners") || "[]");

    if (existingNumbers.includes(phone)) {
      setError("This phone number has already been used.");
      return;
    }

    setError("");
    setSubmitted(true);

    existingNumbers.push(phone);
    localStorage.setItem("winners", JSON.stringify(existingNumbers));
    console.log("Phone number saved:", phone);

    // List of winners (commented out by default)
    const winners = JSON.parse(localStorage.getItem("winners") || "[]");
    console.log("All saved winners phone numbers:", winners);
  };

  return (
    <div
        className="flex h-svh items-center justify-center overflow-hidden bg-telenor-dark-blue"
    >

          {/* Confetti only if player won */}
      {isVictorious &&
        <Confetti width={width} height={height}
          colors={["#00C8FF", "#2D28CD", "#B4FFFF", "#FF5A28"]}
          numberOfPieces={600} />}

      <div className="relative w-full max-w-xl px-4">
        <div className="bg-white border border-white/20 rounded-2xl p-8 shadow-2xl">
          <CardContent className="text-center max-w-md mx-auto">
            <h1
              className={`mb-4 text-3xl font-bold flex items-center justify-center gap-2 ${
                isVictorious ? "text-telenor-dark-blue" : "text-telenor-hot-pink"
              }`}
            >
              <TitleIcon className="h-8 w-8" />
              {titleText}
            </h1>
            <p className="mb-4 text-xl leading-relaxed text-telenor-dark-blue/70">
              You conquered{" "}
              <span className="font-bold text-telenor-mid-blue">{score}</span> trials.
            </p>
            <p className="mb-4 text-xl leading-relaxed text-telenor-dark-blue/70">
              {message}
            </p>

            <Button
              onClick={onRestart}
              size="lg"
              className="w-full font-semibold rounded-lg text-lg hover:bg-telenor-mid-blue/90 transition-colors bg-telenor-mid-blue text-white"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              {isVictorious ? "Fight Again, Champion!" : "Return to Arena"}
            </Button>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
