// components/game/GameArea.tsx
"use client";

import cakeImage from "@/assets/cake-icons/cake.png";
import cakeCompleteImage from "@/assets/cake-icons/cake_complete.gif";
import candleImage from "@/assets/cake-icons/candle.png";
import { Card, CardContent } from "@/components/ui/card";
import { initialCSS } from "@/lib/types";
import { motion } from "framer-motion";
import { Cake } from "lucide-react";
import { CSSProperties } from "react";

interface GameAreaProps {
  levelId: number;
  appliedCSS: Record<string, string>;
  correctCSS: Record<string, string>;
  itemCount: number;
  showFeedback: boolean;
  isCorrect: boolean;
}

export default function GameArea({
  levelId,
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
  const playerStyle = {
    ...initialCSS,
    ...appliedCSS,
  };

  const showCompleteState = showFeedback && isCorrect;
  const isWrapLevel = correctCSS.flexWrap === "wrap";
  const renderedItemCount = isWrapLevel ? Math.max(itemCount, 16) : itemCount;

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
              alt="Kake i måloppsettet"
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
              alt="Fullført kakeanimasjon"
              className="h-12 w-12 object-contain"
            />
          </motion.div>
        );
      }

      return (
        <motion.div
          key={`player-${levelId}-${index}`}
          style={{ margin: "5px" }}
          className="h-12 w-12 flex items-center justify-center"
          {...animationProps}
        >
          <img
            src={candleImage.src}
            alt="Spillerens lys"
            className="h-10 w-10 object-contain"
            style={{ filter: "drop-shadow(0 0 2px rgba(0, 200, 255, 0.3))" }}
          />
        </motion.div>
      );
    });
  };

  const containerHeight = renderedItemCount > 6 ? "500px" : "420px";

  return (
    <Card className="border border-slate-200 rounded-xl shadow-sm h-full">
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-bold text-telenor-dark-blue flex items-center gap-2">
          <Cake className="h-5 w-5" />
          Sett lys på muffinsen
        </h3>

        <div
          className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
          style={{ width: "100%", height: containerHeight, maxWidth: "100%" }}
        >
          {/* Måloppsett */}
          <div
            className={`pointer-events-none absolute inset-0 p-2 transition-opacity duration-200 ${showCompleteState ? "opacity-0" : "opacity-100"}`}
            style={targetStyle as CSSProperties}
          >
            {renderBoxes(renderedItemCount, "target")}
          </div>

          {/* Spilleroppsett */}
          <div
            key={`player-layer-${levelId}`}
            className={`absolute inset-0 p-2 transition-opacity duration-200 ${showCompleteState ? "opacity-0" : "opacity-100"}`}
            style={playerStyle as CSSProperties}
          >
            {renderBoxes(renderedItemCount, "player")}
          </div>

          {/* Riktig tilstand: ferdig kake og lysanimasjon */}
          <div
            className={`pointer-events-none absolute inset-0 p-2 transition-opacity duration-200 ${showCompleteState ? "opacity-100" : "opacity-0"}`}
            style={targetStyle as CSSProperties}
          >
            {renderBoxes(renderedItemCount, "complete")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
