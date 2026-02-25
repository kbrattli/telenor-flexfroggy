// components/game/GameArea.tsx
"use client";

import cakeImage from "@/assets/cake-icons/cake.png";
import cakeCompleteImage from "@/assets/cake-icons/cake_complete.gif";
import candleImage from "@/assets/cake-icons/candle.png";
import { Card, CardContent } from "@/components/ui/card";
import { initialCSS } from "@/lib/types";
import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import { CSSProperties } from "react";

interface GameAreaProps {
  appliedCSS: Record<string, string>;
  correctCSS: Record<string, string>;
  itemCount: number;
  showFeedback: boolean;
  isCorrect: boolean;
}

export default function GameArea({
  appliedCSS,
  correctCSS,
  itemCount,
  showFeedback,
  isCorrect,
}: GameAreaProps) {
  const targetStyle = {
    ...initialCSS,
    ...correctCSS,
  };

  const showCompleteState = showFeedback && isCorrect;

  const renderBoxes = (
    count: number,
    variant: "target" | "player" | "complete",
  ) => {
    return Array.from({ length: count }, (_, index) => {
      const animationProps = {
        layout: true,
        initial: { scale: 0, rotate: 45 },
        animate: { scale: 1, rotate: 0 },
        transition: {
          type: "spring" as const,
          stiffness: 300,
          damping: 25,
          delay: index * 0.05,
        },
      };

      if (variant === "target") {
        return (
          <motion.div
            key={`target-${index}`}
            style={{ margin: "5px" }}
            {...animationProps}
          >
            <img
              src={cakeImage.src}
              alt="target cake icon"
              className="h-12 w-12 object-contain"
              style={{ filter: "drop-shadow(0 0 2px rgba(45, 40, 205, 0.3))" }}
            />
          </motion.div>
        );
      }

      if (variant === "complete") {
        return (
          <motion.div
            key={`complete-${index}`}
            style={{ margin: "5px" }}
            {...animationProps}
          >
            <img
              src={cakeCompleteImage.src}
              alt="completed cake animation"
              className="h-12 w-12 object-contain"
            />
          </motion.div>
        );
      }

      return (
        <motion.div
          key={`player-${index}`}
          style={{ margin: "5px" }}
          className="h-12 w-12 flex items-center justify-center"
          {...animationProps}
        >
          <img
            src={candleImage.src}
            alt="player candle icon"
            className="h-10 w-10 object-contain"
            style={{ filter: "drop-shadow(0 0 2px rgba(0, 200, 255, 0.3))" }}
          />
        </motion.div>
      );
    });
  };

  const containerHeight = itemCount > 6 ? "500px" : "420px";

  return (
    <Card className="border border-slate-200 rounded-xl shadow-sm h-full">
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-bold text-telenor-dark-blue flex items-center gap-2">
          <Swords className="h-5 w-5" />
          Arena Battlefield
        </h3>

        <div
          className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
          style={{ width: "100%", height: containerHeight, maxWidth: "100%" }}
        >
          {/* Target layout */}
          <div
            className={`pointer-events-none absolute inset-0 p-2 transition-opacity duration-200 ${showCompleteState ? "opacity-0" : "opacity-100"}`}
            style={targetStyle as CSSProperties}
          >
            {renderBoxes(itemCount, "target")}
          </div>

          {/* Player layout */}
          <div
            className={`absolute inset-0 p-2 transition-opacity duration-200 ${showCompleteState ? "opacity-0" : "opacity-100"}`}
            style={appliedCSS as CSSProperties}
          >
            {renderBoxes(itemCount, "player")}
          </div>

          {/* Correct state: completed cake + candle animation */}
          <div
            className={`pointer-events-none absolute inset-0 p-2 transition-opacity duration-200 ${showCompleteState ? "opacity-100" : "opacity-0"}`}
            style={targetStyle as CSSProperties}
          >
            {renderBoxes(itemCount, "complete")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
