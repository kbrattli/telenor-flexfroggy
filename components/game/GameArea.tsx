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
                  src="https://cdn-icons-png.flaticon.com/128/7893/7893653.png" // Replace with your gladiator icon path if different
                  alt="target gladiator icon"
                  className="h-8 w-8"
                  style={{ filter: "drop-shadow(0 0 2px #b91c1c)" }}
              />
            </motion.div>
        );
      }

      return (
          <motion.div
              key={`player-${index}`}

              style={{ margin: "5px" }}
              {...animationProps}
          >
            <img
                src="https://cdn-icons-png.flaticon.com/128/3443/3443124.png" // Same icon used for players
                alt="player gladiator icon"
                className="h-8 w-8"
                style={{ filter: "drop-shadow(0 0 2px #2563eb)" }}
            />
          </motion.div>
      );
    });
  };

  const containerHeight = itemCount > 6 ? "350px" : "280px";

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Game Area</h3>

        <div
          className="relative overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-50"
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
          <div className="pointer-events-none absolute inset-0 opacity-5">
            <div className="absolute left-1/4 top-0 h-full w-px bg-gray-400" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-gray-400" />
            <div className="absolute left-3/4 top-0 h-full w-px bg-gray-400" />
            <div className="absolute left-0 top-1/4 h-px w-full bg-gray-400" />
            <div className="absolute left-0 top-1/2 h-px w-full bg-gray-400" />
            <div className="absolute left-0 top-3/4 h-px w-full bg-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
