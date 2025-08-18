import {Button} from "@/components/ui/button";
import {Play} from "lucide-react";
import {useEffect, useState} from "react";
import Countdown from "@/components/game/countdown";

interface GameStartProps {
    onStart: () => void;
    started: boolean
    onComplete: ()=>void
}

export default function ControllerStartScreen ({ onStart, started, onComplete }: GameStartProps) {
    const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

    useEffect(() => {
        console.log(started)
        if (started) setStep(1)
    }, [started]);
    return (
      <div className="min-h-screen bg-amber-50 p-4 flex flex-col items-center justify-center text-center">
        {
            step == 0 && (
          <Button
              onClick={() => onStart()}
              size="lg"
              className="w-2/3 h-2/3 bg-red-800 hover:bg-red-900 text-yellow-100 font-bold tracking-wide rounded shadow-md text-2xl "
              style={{ fontFamily: "'Cinzel', serif" }}
          >
              <Play className="mr-2 h-5 w-2" />
              Enter the Arena
          </Button>
            )}
          {step === 1 && (
              <Countdown
                  onComplete={() => onComplete()}
              />
          )}
    </div>

  );
}