import {useEffect, useRef, useState} from "react";
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
    started: boolean
    onCountDown: () => void;
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

export default function GameStartScreen({ onStart, started, onCountDown}: GameStartProps) {
    const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

    useEffect(() => {
        if (started) setStep(1)
    }, [started]);

    const [count, setCount] = useState<number>(10);

    useEffect(() => {
        if (count > 0) {
            const t = setTimeout(() => setCount((c) => c - 1), 1000);
            return () => clearTimeout(t);
        }
        if (count === 0) {
            // keep "Charge!" on screen for 1 second
           setStep(2)
            onCountDown()
        }
    }, [count]);

    return (
        <div
            // className="flex min-h-screen items-center justify-center bg-cover bg-center p-0 font-serif"
            className="flex h-svh items-center justify-center bg-cover bg-center font-serif overflow-hidden"
            style={{ backgroundImage: `url(${parchmentImg.src})`, backgroundSize: 'cover' }}
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
                        <div className="
                            absolute
                            left-[24%] right-[24%]   /* narrower text */
                            top-[33%] bottom-[20%]   /* avoid curled edges */
                            flex flex-col items-center justify-start text-center gap-6
                          ">
                            <CardContent className="text-center text-yellow-900 font-serif">
                                <h1 className="mb-4 text-3xl font-extrabold text-red-900 tracking-wide drop-shadow-sm" style={{ fontFamily: "'Cinzel', serif" }}>
                                    🏛️ Telenorium Gladiator Challenge
                                </h1>
                                <AnimatedHandwriting
                                    className="mb-6 text-yellow-800 text-xl leading-relaxed drop-shadow-sm italic"
                                    text={`Welcome, challenger, to the sacred arena of\n Telenorium!\n\nAre you ready for battle?\n`}
                                />
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
                    <div className="
                        absolute
                        left-[24%] right-[24%]   /* narrower text */
                        top-[15%] bottom-[20%]   /* avoid curled edges */
                        flex flex-col items-center justify-start text-center gap-6
                      ">
                        <CardContent className="relative p-8 text-center text-yellow-900 font-serif">
                                <h1
                                    className="mb-4 text-3xl font-extrabold text-red-900 tracking-wide drop-shadow-sm"
                                    style={{ fontFamily: "'Cinzel', serif" }}
                                    >
                                    ⚔️ The Rules ⚔️
                                </h1>
                            <AnimatedHandwriting
                                className="mb-6 text-yellow-800 text-xl leading-relaxed drop-shadow-sm italic"
                                text={`The rules are simple.\n\n` +
                                    `You will recieve challenges crafted in the\n language of Flexbox where you select the\n correct option.\n\n` +
                                    `Achieve a minimum of 5 challenges to\n collect your price! \n\n` +
                                    `You have a total of 60 seconds to\n complete these challenges`}
                            />
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