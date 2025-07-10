"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

interface GameStartProps {
    onStart: () => void;
}

export default function GameStartScreen({ onStart }: GameStartProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <Card className="w-full max-w-md">
                <CardContent className="p-8 text-center">
                <h1 className="mb-4 text-3xl font-bold text-gray-800">
                    Flexbox Challenge
                </h1>
                <p className="mb-6 text-gray-600">
                    Master flexbox by solving 3 levels correctly within 60 seconds.
                    Good luck!
                </p>
                <Button onClick={onStart} size="lg" className="w-full">
                    <Play className="mr-2 h-5 w-5" />
                    Start Game
                </Button>
                </CardContent>
            </Card>
        </div>
    );
}