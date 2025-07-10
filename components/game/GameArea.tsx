"use client";

import { Card, CardContent } from "@/components/ui/card";
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
            className="h-12 w-12 rounded border-2 border-red-600 bg-red-500 opacity-60 shadow-lg"
            style={{ margin: "5px" }}
            {...animationProps}
          />
        );
      }

      return (
        <motion.div
          key={`player-${index}`}
          className="flex h-12 w-12 items-center justify-center"
          style={{ margin: "5px" }}
          {...animationProps}
        >
          <div className="h-10 w-10 rounded border-2 border-blue-600 bg-blue-500 shadow-lg" />
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
            style={correctCSS as CSSProperties}
          >
            {renderBoxes(itemCount, true)}
          </div>

          {/* Player layout */}
          <div className="absolute inset-0 p-2" style={appliedCSS as CSSProperties}>
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