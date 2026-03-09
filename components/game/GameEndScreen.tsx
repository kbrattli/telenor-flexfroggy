"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { RotateCcw, Trophy } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import backgroundImage from "@/assets/cake-icons/bg.webp";

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
  const isVictorious = gameResult === "win";
  const { width, height } = useWindowSize();

  const TitleIcon = isVictorious ? Trophy : RotateCcw;
  const titleText = isVictorious ? "UTFORDRING FULLFØRT!" : "GODT FORSØK!";

  const message = isVictorious
    ? "Bra jobbet! Du fullførte utfordringen og var med på å feire 200 ansatte i Telenor."
    : "God innsats! Prøv igjen og se hvor mange utfordringer du klarer.";

  // Tilstand for telefonnummer
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{8,15}$/.test(phone)) {
      setError("Skriv inn et gyldig telefonnummer.");
      return;
    }

    // Her kan telefonnummeret sendes til backend eller database
    const existingNumbers: string[] = JSON.parse(localStorage.getItem("winners") || "[]");

    if (existingNumbers.includes(phone)) {
      setError("Dette telefonnummeret er allerede brukt.");
      return;
    }

    setError("");
    setSubmitted(true);

    existingNumbers.push(phone);
    localStorage.setItem("winners", JSON.stringify(existingNumbers));
    console.log("Telefonnummer lagret:", phone);

    // Liste over vinnere
    const winners = JSON.parse(localStorage.getItem("winners") || "[]");
    console.log("Alle lagrede vinnernumre:", winners);
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
      {/* Konfetti bare hvis spilleren vant */}
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
              Du fullførte{" "}
              <span className="font-bold text-telenor-mid-blue">{score}</span> utfordringer.
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
              {isVictorious ? "Spill igjen" : "Prøv igjen"}
            </Button>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
