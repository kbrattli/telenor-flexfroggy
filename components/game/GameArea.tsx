// components/game/GameArea.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { initialCSS } from "@/lib/types";
import { motion } from "framer-motion";
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
              style={{ filter: "drop-shadow(0 0 3px #7f1d1d) brightness(1.1)" }}
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
            style={{ filter: "drop-shadow(0 0 3px #92400e) brightness(1.1)" }}
          />
        </motion.div>
      );
    });
  };

  const containerHeight = itemCount > 6 ? "350px" : "280px";

  return (
    <Card className="border-4 border-yellow-800 rounded-xl shadow-lg shadow-yellow-700/30">
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-bold text-red-900 font-serif tracking-wide drop-shadow-sm">
          ⚔️ Arena Battlefield
        </h3>

        <div
          className="relative overflow-hidden rounded-lg border-3 border-yellow-700 bg-amber-50/95 shadow-inner"
          style={{ width: "400px", height: containerHeight }}
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

          {/* Grid lines */}
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute left-1/4 top-0 h-full w-px bg-yellow-700" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-yellow-700" />
            <div className="absolute left-3/4 top-0 h-full w-px bg-yellow-700" />
            <div className="absolute left-0 top-1/4 h-px w-full bg-yellow-700" />
            <div className="absolute left-0 top-1/2 h-px w-full bg-yellow-700" />
            <div className="absolute left-0 top-3/4 h-px w-full bg-yellow-700" />
          </div>
        </div>

        {/* Icon attributions (required by Flaticon) */}
        <p className="mt-3 text-xs text-yellow-800/70 font-serif italic">
          <a
            href="https://www.flaticon.com/free-icons/colosseum"
            title="Colosseum icons"
            className="underline hover:no-underline hover:text-yellow-700"
            target="_blank"
            rel="noreferrer"
          >
            Colosseum icons created by wanicon - Flaticon
          </a>
          {" · "}
          <a
            href="https://www.flaticon.com/free-icons/rome"
            title="rome icons"
            className="underline hover:no-underline hover:text-yellow-700"
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
