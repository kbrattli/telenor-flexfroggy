import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import AnimatedHandwriting from "@/components/ui/animatedHandwriting";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Countdown from "./countdown";
import backgroundImage from "@/assets/cake-icons/bg.webp";
import telenor200Logo from "@/assets/cake-icons/telenor-200-logo.webp";

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
      className="flex h-svh items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
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
                  <Image
                    src={telenor200Logo}
                    alt="Telenor feierer 200 ansatte"
                    className="mx-auto mb-6 h-auto w-full max-w-xs"
                    priority
                  />
                  <h1 className="mb-4 text-3xl font-bold text-telenor-dark-blue">
                    Telenor Flexbox-utfordring
                  </h1>
                  <AnimatedHandwriting
                    className="mb-6 text-xl leading-relaxed text-telenor-dark-blue/70"
                    text={`Bli med på festen!\n\nKlar til å teste CSS-ferdighetene dine?\nNå 5 poeng for å kvalifisere deg til pinjata.\n`}
                  />
                  <Button
                    onClick={() => setStep(2)}
                    size="lg"
                    className="w-full font-semibold rounded-lg text-lg hover:bg-telenor-mid-blue/90 transition-colors bg-telenor-mid-blue text-white"
                  >
                    <Play className="mr-2 h-5 w-2" />
                    Start utfordringen
                  </Button>
                </CardContent>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && <Countdown onComplete={() => setStep(3)} />}
      </AnimatePresence>
    </div>
  );
}
