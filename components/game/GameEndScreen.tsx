"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, RotateCcw } from "lucide-react";
import scrollImg from "@/public/img/scroll.jpg";
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
  const isVictorious = score >= 5;
  const { width, height } = useWindowSize();

  const title = isVictorious
    ? "🏆 GLADIATOR VICTORIOUS!"
    : "⚔️ FALLEN IN BATTLE!";

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
        className="flex h-svh items-center justify-center font-serif overflow-hidden"
        style={{ backgroundColor: '#320800' }}
    >

          {/* Confetti only if player won */}
      {isVictorious && 
        <Confetti width={width} height={height} 
          colors={["#fbc83d", "#6d2304", "#ec9926", "#dc230fff"]} 
          numberOfPieces={600} />}

      <div className="relative w-full max-w-4xl max-h-[100svh] aspect-[3/4]">
        {/* Scroll image */}
        <div
            className="absolute inset-0 bg-center bg-no-repeat bg-contain pointer-events-none"
            style={{ backgroundImage: `url(${scrollImg.src})` }}
        />
        <div className="absolute inset-0 grid place-items-center p-[10%]">
          <CardContent className="text-center text-yellow-900 font-serif max-w-md">
            {/* <CheckCircle
              className={`mx-auto mb-4 h-16 w-16 drop-shadow-md ${
                isVictorious ? "text-yellow-700" : "text-red-700"
              }`}
            /> */}
            <h1
              className={`mb-4 text-3xl font-extrabold tracking-wide drop-shadow-sm ${
                isVictorious ? "text-yellow-700" : "text-red-900"
              }`}
            >
              {title}
            </h1>
            <p className="mb-4 text-xl leading-relaxed drop-shadow-sm italic text-[#6d2304]">
              You conquered{" "}
              <span className="font-bold text-red-800">{score}</span> divine
              trials.
            </p>
            <p className="mb-4 text-xl leading-relaxed drop-shadow-sm italic text-[#6d2304]">
              {message}
            </p>
            {isVictorious && !submitted && (
              <form onSubmit={handlePhoneSubmit} className="mb-4 flex flex-col items-center gap-3">
                <p className="text-yellow-800 text-md leading-relaxed drop-shadow-sm italic"
                  style={{ fontFamily: "inherit" }}
                  >Enter your phone number to claim your prize. We do not send, share, or use it for anything else.</p>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="border rounded px-4 py-2 text-lg w-full"
                  placeholder="Declare thy number"
                  maxLength={15}
                />
                {error && <div className="text-red-600">{error}</div>}
                <Button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-yellow-100 font-bold w-full"
                >
                  Declare
                </Button>
              </form>
            )}
            {isVictorious && submitted && !error && (
              <div className="mb-6 text-green-700 font-bold">Thank you! Your number has been registered.</div>
            )}
            <Button
              onClick={onRestart}
              size="lg"
              className="w-full font-bold tracking-wide rounded shadow-md text-2xl hover:opacity-90"
              style={{
                fontFamily: "'Cinzel', serif",
                backgroundColor: '#6d2304',
                color: '#fbc83d'
              }}
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