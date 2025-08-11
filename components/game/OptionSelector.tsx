"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { Level } from "@/lib/types";

interface OptionSelectorProps {
  level: Level;
  selectedOption: number | null;
  showFeedback: boolean;
  isCorrect: boolean;
  currentLevel: number;
  totalLevels: number;
  onSelect: (index: number) => void;
  onNext: () => void;
}

export default function OptionSelector({ level,
  selectedOption,
  showFeedback,
  isCorrect,
  // currentLevel,
  // totalLevels,
  onSelect,
  onNext, }: OptionSelectorProps) {

    // Options made with key 1 2 3 or 4.
    useEffect(() => {
        const handlePressedKey = (e: KeyboardEvent) => {
            if (showFeedback) return;

            const key = e.key;
            if (["1", "2", "3", "4"].includes(key)) {
                const index = parseInt(key, 10) -1;
                if (index < level.options.length) {
                    onSelect(index)
                }
            }
        };

        window.addEventListener("keydown", handlePressedKey);
        return () => window.removeEventListener("keydown", handlePressedKey);
    }, [level.options.length, showFeedback, onSelect]);

    return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Choose the correct CSS:</h3>
        <div className="space-y-3">
          {level.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrectOption = index === level.correctAnswer;
            const isIncorrectSelected =
              showFeedback && isSelected && !isCorrectOption;

            return (
              <Button
                key={index}
                variant={
                  showFeedback
                    ? isCorrectOption
                      ? "default"
                      : isIncorrectSelected
                      ? "destructive"
                      : "outline"
                    : isSelected
                    ? "default"
                    : "outline"
                }
                className={`h-auto w-full justify-start px-4 py-4 text-left transition-all duration-300 ${
                  showFeedback && isCorrectOption
                    ? "border-green-600 bg-green-500 text-white hover:bg-green-600"
                    : isIncorrectSelected
                    ? "border-red-600 bg-red-500 text-white hover:bg-red-600"
                    : ""
                }`}
                onClick={() => onSelect(index)}
                disabled={showFeedback}
              >
                <div className="flex flex-col items-start gap-1">
                  {option.label.map((line, lineIndex) => (
                    <code key={lineIndex} className="font-mono text-sm">
                      {line}
                    </code>
                  ))}
                </div>
              </Button>
            );
          })}
        </div>

        {/* Feedback display (no button) */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 text-center"
            >
              {isCorrect ? (
                <motion.div
                  className="mb-4 flex items-center justify-center gap-2 text-green-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                >
                  <CheckCircle className="h-6 w-6" />
                  <span className="text-lg font-semibold">Correct!</span>
                </motion.div>
              ) : (
                <motion.div
                  className="mb-4 flex items-center justify-center gap-2 text-red-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                >
                  <XCircle className="h-6 w-6" />
                  <span className="text-lg font-semibold">
                    Not quite! See the correct layout above.
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
    );
}
