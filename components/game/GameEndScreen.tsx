"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { RotateCcw, Trophy } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import backgroundImage from "@/assets/cake-icons/background.gif";

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

  const TitleIcon = isVictorious ? Trophy : RotateCcw;
  const titleText = isVictorious ? "CHALLENGE COMPLETED!" : "NICE TRY!";

  const message = isVictorious
    ? "Great work! You completed the challenge and helped celebrate 200 employees at Telenor."
    : "Good effort! Give it another go and see how many challenges you can solve.";

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
      className="flex h-svh items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
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
              You completed{" "}
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
              {isVictorious ? "Play Again" : "Try Again"}
            </Button>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
