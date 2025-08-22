"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Level } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { useEffect } from "react";

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

export default function OptionSelector({
  level,
  selectedOption,
  showFeedback,
  isCorrect,
  currentLevel,
  totalLevels,
  onSelect,
  onNext,
}: OptionSelectorProps) {
  // Options made with key 1 2 3 or 4.
  useEffect(() => {
    const handlePressedKey = (e: KeyboardEvent) => {
      if (showFeedback) return;

      const key = e.key;
      if (["1", "2", "3", "4"].includes(key)) {
        const index = parseInt(key, 10) - 1;
        if (index < level.options.length) {
          onSelect(index);
        }
      }
    };

    window.addEventListener("keydown", handlePressedKey);
    return () => window.removeEventListener("keydown", handlePressedKey);
  }, [level.options.length, showFeedback, onSelect]);

  return (
    <Card className="border-4 border-yellow-800 rounded-xl shadow-lg shadow-yellow-700/30 h-full">
      <CardContent className="p-8">
        <h3 className="mb-4 text-lg font-bold font-serif tracking-wide drop-shadow-sm" style={{ color: '#fbc83d' }}>
          ⚡ Divine CSS Incantations:
        </h3>
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
                className={`h-auto w-full justify-start px-4 py-4 text-left transition-all duration-300 font-serif ${showFeedback && isCorrectOption
                    ? "border-yellow-600 bg-yellow-700 text-yellow-50 hover:bg-yellow-800 shadow-md"
                    : isIncorrectSelected
                      ? "border-red-700 bg-red-800 text-yellow-50 hover:bg-red-900 shadow-md"
                      : isSelected
                        ? "border-yellow-700 bg-yellow-800 text-yellow-50 hover:bg-yellow-900"
                        : "border-yellow-600 bg-amber-50/90 text-yellow-900 hover:bg-yellow-100 hover:border-yellow-700"
                  }`}
                onClick={() => onSelect(index)}
                disabled={showFeedback}
              >
                <div className="flex flex-col items-start gap-1">
                  {option.label.map((line, lineIndex) => (
                    <code
                      key={lineIndex}
                      className="font-mono text-sm drop-shadow-sm"
                    >
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
                  className="mb-4 flex items-center justify-center gap-2 text-yellow-700 font-serif font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                >
                  <CheckCircle className="h-6 w-6" />
                  <span className="text-lg drop-shadow-sm">
                    ⚡ Divine Victory!
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  className="mb-4 flex items-center justify-center gap-2 text-red-800 font-serif font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                >
                  <XCircle className="h-6 w-6" />
                  <span className="text-lg drop-shadow-sm">
                    🏛️ The gods show mercy! Study the sacred layout above.
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
