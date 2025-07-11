"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import parchmentImg from "@/public/img/parchment.jpg";
import scrollImg from "@/public/img/scroll.jpg";

interface GameStartProps {
    onStart: () => void;
}

export default function GameStartScreen({ onStart }: GameStartProps) {
    return (
        <div
            className="flex min-h-screen items-center justify-center bg-cover bg-center p-6 text-yellow-900 font-serif"
            style={{ backgroundImage: `url(${parchmentImg})`, backgroundSize: 'cover' }}
        >
            <Card
                className="w-full max-w-md bg-cover bg-center border-4 border-yellow-800 rounded-xl shadow-lg shadow-yellow-700/30"
                style={{ backgroundImage: `url(${scrollImg})` }}
            >
                <CardContent className="p-8 text-center text-yellow-900 font-serif">
                    <h1 className="mb-4 text-3xl font-extrabold text-red-900 tracking-wide drop-shadow-sm">
                        🏛️ Telenorium Gladiator Challenge
                    </h1>
                    <p className="mb-6 text-yellow-800 text-md leading-relaxed drop-shadow-sm italic">
                        Welcome, challenger, to the sacred arena of Telenorium!
                        <br />
                        <br />
                        You shall face 3 trials of divine layout—crafted in the language of Flexbox.
                        Prove your wisdom and precision in the ancient art of CSS styling.
                        <br />
                        <br />
                        ⚔️ Glory to those who align divs in perfect order.
                    </p>
                    <Button
                        onClick={onStart}
                        size="lg"
                        className="w-full bg-red-800 hover:bg-red-900 text-yellow-100 font-bold tracking-wide rounded shadow-md"
                    >
                        <Play className="mr-2 h-5 w-5" />
                        Enter the Arena
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}