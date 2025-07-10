"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, RotateCcw } from "lucide-react";

interface GameEndScreenProps {
    gameResult: "win" | "lose" | null;
    score: number;
    onRestart: () => void;
}

export default function GameEndScreen({ gameResult, score, onRestart }: GameEndScreenProps) {
    const title = gameResult === "win" ? "Challenge Complete!" : "Time's Up!";
    const message = score >= 3 ? "Incredible work! You're a true Flexbox Master!" : "Great job! Keep practicing to master every concept.";

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
            <Card className="w-full max-w-md">
                <CardContent className="p-8 text-center">
                <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
                <h1 className="mb-4 text-3xl font-bold text-gray-800">{title}</h1>
                <p className="mb-2 text-xl text-gray-700">
                    You correctly solved{" "}
                    <span className="font-bold text-blue-600">
                    {score}
                    </span>{" "}
                    levels.
                </p>
                <p className="mb-6 text-gray-600">{message}</p>
                <Button onClick={onRestart} size="lg" className="w-full">
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Play Again
                </Button>
                </CardContent>
            </Card>
        </div>
    );
}

