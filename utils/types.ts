export type Colors = {
  [key: number]: string;
};

export type Mode = {
  rows: number;
  cols: number;
  values: number[];
  colors: Colors;
};

export type Difficulty = "easy" | "expert" | "insane";

export type GameMode = {
  [key: string]: Mode;
};

export type BoardCombinations = {
  [key: string]: number[][];
};
