import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import parchmentImg from "@/public/img/parchment.jpg";
import scrollImg from "@/public/img/scroll.jpg";
import AnimatedHandwriting from "@/components/ui/animatedHandwriting";
import { AnimatePresence, motion } from "framer-motion";

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
    const [step, setStep] = useState<0 | 1 | 2>(0);
    return (
        <div
            className="flex min-h-screen items-center justify-center bg-cover bg-center p-6 text-yellow-900 font-serif"
            style={{ backgroundImage: `url(${parchmentImg})`, backgroundSize: 'cover' }}
        >
            <AnimatePresence
                mode="wait"
                onExitComplete={() => {
                    if (step === 2) onStart();
                }}
            >
                {step === 0 && (
                    <motion.div
                        key="intro"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full max-w-md"
                    >
                    <Card
                        className="w-full max-w-md bg-cover bg-center border-4 border-yellow-800 rounded-xl shadow-lg shadow-yellow-700/30"
                        style={{ backgroundImage: `url(${scrollImg})` }}
                    >
                        <CardContent className="p-8 text-center text-yellow-900 font-serif">
                            <h1 className="mb-4 text-3xl font-extrabold text-red-900 tracking-wide drop-shadow-sm" style={{ fontFamily: "'Cinzel', serif" }}>
                                🏛️ Telenorium Gladiator Challenge
                            </h1>
                            <AnimatedHandwriting
                                className="mb-6 text-yellow-800 text-xl leading-relaxed drop-shadow-sm italic"
                                text={`Welcome, challenger, to the sacred arena of Telenorium!\n\nAre you ready for battle?\n`}
                                delay={0.4}
                                speed={0.05}
                            />
                            <Button
                                onClick={() => setStep(1)}
                                size="lg"
                                className="w-full bg-red-800 hover:bg-red-900 text-yellow-100 font-bold tracking-wide rounded shadow-md text-2xl"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                <Play className="mr-2 h-5 w-5" />
                                Enter the Arena
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

                {step === 1 && (
                    <motion.div
                        key="rules"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full max-w-md"
                    >
                    <Card
                        className="w-full max-w-md bg-cover bg-center border-4 border-yellow-800 rounded-xl shadow-lg shadow-yellow-700/30"
                        style={{ backgroundImage: `url(${scrollImg})` }}
                    >
                        <CardContent className="p-8 text-center text-yellow-900 font-serif">
                                <h1
                                    className="mb-4 text-3xl font-extrabold text-red-900 tracking-wide drop-shadow-sm"
                                    style={{ fontFamily: "'Cinzel', serif" }}
                                    >
                                    ⚔️ The Rules ⚔️
                                </h1>
                            <AnimatedHandwriting
                                className="mb-6 text-yellow-800 text-xl leading-relaxed drop-shadow-sm italic"
                                text={`The rules are simple.\n\n` +
                                    `You will recieve challenges crafted in the\n language of Flexbox where you select the correct option.\n\n` +
                                    `Achieve a minimum of 5 challenges to\n collect your price! \n\n` +
                                    `You have a total of 60 sec to complete these challenges`}
                                delay={0.4}
                                speed={0.05}
                            />
                            <Button
                                onClick={() => setStep(2)}
                                size="lg"
                                className="w-full bg-red-800 hover:bg-red-900 text-yellow-100 font-bold tracking-wide rounded shadow-md text-2xl"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                <Play className="mr-2 h-5 w-5" />
                                Let the battle begin!
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}