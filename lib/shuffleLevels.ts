import { Level } from "./types";

export const shuffleLevels = (levels: Level[]) =>
  [...levels].sort(() => Math.random() - 0.5);