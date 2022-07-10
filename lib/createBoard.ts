import { lodash } from "lodash";
import type { Difficulty } from "../utils/types.ts";
import { indexCombinations } from "../utils/constants.ts";

function getBoard(difficulty: Difficulty): number[][] {
  switch (difficulty) {
    case "easy":
      return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    case "expert":
      return [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];
    case "insane":
      return [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];
  }
}

export function createBoard(
  diff: Difficulty,
  values: number,
  available: number[]
): number[][] {
  const board: number[][] = getBoard(diff);
  let availableValues = available;
  const randomIndexes = lodash.sampleSize(indexCombinations[diff], values);
  for (let i = 0; i < randomIndexes.length; i++) {
    const randItem = Math.floor(Math.random() * availableValues.length);
    board[randomIndexes[i][0]][randomIndexes[i][1]] = availableValues[randItem];
    availableValues = availableValues.filter(
      (value) => value !== availableValues[randItem]
    );
  }
  return board;
}
