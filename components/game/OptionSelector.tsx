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
  // Velg alternativ med tastene 1, 2, 3 eller 4.
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
    <Card className="border border-slate-200 rounded-xl shadow-sm h-full">
      <CardContent className="p-8">
        <h3 className="mb-4 text-lg font-bold text-telenor-dark-blue">
          Velg riktig CSS
        </h3>
        <div className="space-y-3">
          {level.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrectOption = index === level.correctAnswer;
            const isIncorrectSelected =
              showFeedback && isSelected && !isCorrectOption;
            const optionTextClass = showFeedback && isCorrectOption
              ? "text-green-950"
              : isIncorrectSelected
                ? "text-telenor-ink-pink"
                : "text-current";

            return (
              <Button
                key={index}
                variant={
                  showFeedback
                    ? "outline"
                    : isSelected
                      ? "default"
                      : "outline"
                }
                className={`h-auto w-full justify-start px-4 py-4 text-left transition-all duration-300 ${showFeedback && isCorrectOption
                    ? "border-2 border-green-700 bg-green-50 text-green-900"
                    : isIncorrectSelected
                      ? "border-2 border-telenor-ink-pink bg-telenor-deep-pink/10 text-telenor-ink-pink"
                      : isSelected
                        ? "border-telenor-mid-blue bg-telenor-mid-blue/5 text-telenor-dark-blue"
                        : "border-slate-200 bg-white text-telenor-dark-blue hover:border-telenor-mid-blue/50 hover:bg-slate-50"
                  }`}
                onClick={() => onSelect(index)}
                disabled={showFeedback}
              >
                <div className="flex flex-col items-start gap-1">
                  {option.label.map((line, lineIndex) => (
                    <code
                      key={lineIndex}
                      className={`font-mono text-sm ${optionTextClass}`}
                    >
                      {line}
                    </code>
                  ))}
                </div>
              </Button>
            );
          })}
        </div>

        {/* Tilbakemelding uten knapp */}
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
                  className="mb-4 flex items-center justify-center gap-2 text-telenor-orange font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                >
                  <CheckCircle className="h-6 w-6" />
                  <span className="text-lg">
                    Riktig!
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  className="mb-4 flex items-center justify-center gap-2 text-telenor-deep-pink font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                >
                  <XCircle className="h-6 w-6" />
                  <span className="text-lg">
                    Feil, se riktig layout over.
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
