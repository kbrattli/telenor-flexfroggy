import { Level } from "./types";

const shuffleArray = <T,>(array: T[]) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const shuffleLevelOptions = (level: Level): Level => {
  const indexedOptions = level.options.map((option, index) => ({
    option,
    index,
  }));
  const shuffledOptions = shuffleArray(indexedOptions);

  return {
    ...level,
    options: shuffledOptions.map(({ option }) => option),
    correctAnswer: shuffledOptions.findIndex(
      ({ index }) => index === level.correctAnswer,
    ),
  };
};

export const shuffleLevels = (levels: Level[]) =>
  shuffleArray(levels.map(shuffleLevelOptions));
