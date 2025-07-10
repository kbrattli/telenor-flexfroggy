// lib/types.ts
export interface Level {
  id: number;
  title: string;
  description: string;
  itemCount?: number;
  options: {
    label: string[];
    css: Record<string, string>;
  }[];
  correctAnswer: number;
  correctCSS: Record<string, string>;
}

export const initialCSS: Record<string, string> = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexDirection: "row",
  flexWrap: "nowrap",
  alignContent: "flex-start",
  gap: "0px",
};
