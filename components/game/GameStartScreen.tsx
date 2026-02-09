import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import AnimatedHandwriting from "@/components/ui/animatedHandwriting";
import { AnimatePresence, motion } from "framer-motion";
import Countdown from "./countdown";


interface GameStartProps {
    onStart: () => void;
}

const cardVariants = {
    initial: { opacity: 0, y: 12 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.25, when: "beforeChildren" },
    },
    exit: {
        opacity: 0,
        y: -12,
        transition: { duration: 0.25, when: "afterChildren" },
    },
};

export default function GameStartScreen({ onStart }: GameStartProps) {
    const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
    return (
        <div
            className="flex h-svh items-center justify-center overflow-hidden bg-telenor-dark-blue"
        >
            <AnimatePresence
                mode="wait"
                onExitComplete={() => {
                    if (step === 3) onStart();
                }}
            >
                {step === 0 && (
                    <motion.div
                        key="intro"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full flex justify-center"
                    >
                        <div className="relative w-full max-w-xl px-4">
                            <div className="bg-white border border-white/20 rounded-2xl p-8 shadow-2xl">
                                <CardContent className="text-center max-w-md mx-auto">
                                    <h1 className="mb-4 text-3xl font-bold text-telenor-dark-blue">
                                        Telenorium Gladiator Challenge
                                    </h1>
                                    <AnimatedHandwriting
                                        className="mb-6 text-xl leading-relaxed text-telenor-dark-blue/70"
                                        text={`Welcome, challenger, to the sacred arena of\n Telenorium!\n\nAre you ready for battle?\n`}
                                    />
                                    <Button
                                        onClick={() => setStep(2)}
                                        size="lg"
                                        className="w-full font-semibold rounded-lg text-lg hover:bg-telenor-mid-blue/90 transition-colors bg-telenor-mid-blue text-white"
                                    >
                                        <Play className="mr-2 h-5 w-2" />
                                        Enter the Arena
                                    </Button>
                                </CardContent>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <Countdown
                        onComplete={() => setStep(3)}
                    />
                )}

            </AnimatePresence>
        </div>
    );
}
