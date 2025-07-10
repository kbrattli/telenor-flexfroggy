export interface Level {
  id: number;
  title: string;
  description: string;
  options: Array<{
    label: string[];
    value: string;
    css: Record<string, string>;
  }>;
  correctAnswer: number;
  correctCSS: Record<string, string>;
  itemCount?: number;
}

export const initialCSS = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};