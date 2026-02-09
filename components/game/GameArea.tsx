// components/game/GameArea.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { initialCSS } from "@/lib/types";
import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import { CSSProperties } from "react";

interface GameAreaProps {
  appliedCSS: Record<string, string>;
  correctCSS: Record<string, string>;
  itemCount: number;
}

export default function GameArea({
  appliedCSS,
  correctCSS,
  itemCount,
}: GameAreaProps) {
  const targetStyle = {
    ...initialCSS,
    ...correctCSS,
  };

  const renderBoxes = (count: number, isTarget = false) => {
    return Array.from({ length: count }, (_, index) => {
      const animationProps = {
        layout: true,
        initial: { scale: 0, rotate: 45 },
        animate: { scale: 1, rotate: 0 },
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: index * 0.05,
        },
      };

      if (isTarget) {
        return (
          <motion.div
            key={`target-${index}`}
            style={{ margin: "5px" }}
            {...animationProps}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/3362/3362689.png"
              alt="target colosseum icon"
              className="h-12 w-12"
              style={{ filter: "drop-shadow(0 0 2px rgba(45, 40, 205, 0.3))" }}
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
            src="https://cdn-icons-png.flaticon.com/128/3863/3863611.png"
            alt="player gladiator icon"
            className="h-8 w-8"
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
            className="pointer-events-none absolute inset-0 p-2"
            style={targetStyle as CSSProperties}
          >
            {renderBoxes(itemCount, true)}
          </div>

          {/* Player layout */}
          <div
            className="absolute inset-0 p-2"
            style={appliedCSS as CSSProperties}
          >
            {renderBoxes(itemCount, false)}
          </div>

        </div>

        {/* Icon attributions (required by Flaticon) */}
        <p className="mt-3 text-xs text-telenor-mid-blue/70 italic">
          <a
            href="https://www.flaticon.com/free-icons/colosseum"
            title="Colosseum icons"
            className="underline hover:no-underline hover:text-telenor-mid-blue"
            target="_blank"
            rel="noreferrer"
          >
            Colosseum icons created by wanicon - Flaticon
          </a>
          {" · "}
          <a
            href="https://www.flaticon.com/free-icons/rome"
            title="rome icons"
            className="underline hover:no-underline hover:text-telenor-mid-blue"
            target="_blank"
            rel="noreferrer"
          >
            Rome icons created by surang - Flaticon
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
