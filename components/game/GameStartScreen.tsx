import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import parchmentImg from "@/public/img/parchment.jpg";
import scrollImg from "@/public/img/scroll.jpg";
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
        transition: { duration: 0.25, when: "beforeChildren" }, // wait for text to enter
    },
    exit: {
        opacity: 0,
        y: -12,
        transition: { duration: 0.25, when: "afterChildren" },  // wait for text to exit
    },
};

export default function GameStartScreen({ onStart }: GameStartProps) {
    const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
    return (
        <div
            className="flex h-svh items-center justify-center font-serif overflow-hidden"
            style={{ backgroundColor: '#320800' }}
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
                        <div className="relative w-full max-w-4xl max-h-[100svh] aspect-[3/4]">
                            {/* Scroll image */}
                            <div
                                className="absolute inset-0 bg-center bg-no-repeat bg-contain pointer-events-none"
                                style={{ backgroundImage: `url(${scrollImg.src})` }}
                            />
                            <div className="absolute inset-0 grid place-items-center p-[10%]">
                                <CardContent className="text-center text-yellow-900 font-serif max-w-md">
                                    <h1 className="mb-4 text-3xl font-extrabold tracking-wide drop-shadow-sm" style={{ fontFamily: "'Cinzel', serif", color: '#6d2304' }}>
                                        🏛️ Telenorium Gladiator Challenge
                                    </h1>
                                    <AnimatedHandwriting
                                        className="mb-6 text-xl leading-relaxed drop-shadow-sm italic text-[#6d2304]"
                                        text={`Welcome, challenger, to the sacred arena of\n Telenorium!\n\nAre you ready for battle?\n`}
                                    />
                                    <Button
                                        onClick={() => setStep(1)}
                                        size="lg"
                                        className="w-full font-bold tracking-wide rounded shadow-md text-2xl hover:opacity-90"
                                        style={{
                                            fontFamily: "'Cinzel', serif",
                                            backgroundColor: '#6d2304',
                                            color: '#fbc83d'
                                        }}
                                    >
                                        <Play className="mr-2 h-5 w-2" />
                                        Enter the Arena
                                    </Button>
                                </CardContent>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div
                        key="rules"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full flex justify-center"
                    >
                        <div className="relative w-full max-w-4xl max-h-[100svh] aspect-[3/4]">
                            {/* Scroll image */}
                            <div
                                className="absolute inset-0 bg-center bg-no-repeat bg-contain pointer-events-none"
                                style={{ backgroundImage: `url(${scrollImg.src})` }}
                            />
                            <div className="absolute inset-0 grid place-items-center p-[10%]">
                                <CardContent className="text-center text-yellow-900 font-serif max-w-md">
                                    <h1
                                        className="mb-4 text-3xl font-extrabold tracking-wide drop-shadow-sm"
                                        style={{ fontFamily: "'Cinzel', serif", color: '#6d2304' }}
                                    >
                                        ⚔️ The Rules ⚔️
                                    </h1>
                                    <AnimatedHandwriting
                                        className="mb-6 text-xl leading-relaxed drop-shadow-sm italic text-[#6d2304]"
                                        text={`The rules are simple.\n\n` +
                                            `You will recieve challenges based on\n CSS Flexbox where you select the\n correct option.\n\n` +
                                            `Achieve a minimum of 6 challenges to\n collect your price! \n\n` +
                                            `You have a total of 60 seconds to\n complete these challenges`}
                                    />
                                    <Button
                                        onClick={() => setStep(2)}
                                        size="lg"
                                        className="w-full font-bold tracking-wide rounded shadow-md text-2xl hover:opacity-90"
                                        style={{
                                            fontFamily: "'Cinzel', serif",
                                            backgroundColor: '#6d2304',
                                            color: '#fbc83d'
                                        }}
                                    >
                                        <Play className="mr-2 h-5 w-5" />
                                        Let the battle begin!
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