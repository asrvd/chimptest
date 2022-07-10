import { lodash } from "lodash";

const indexCombinations = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 0],
  [1, 1],
  [1, 2],
  [1, 3],
  [2, 0],
  [2, 1],
  [2, 2],
  [2, 3],
  [3, 0],
  [3, 1],
  [3, 2],
  [3, 3],
];

export function createBoard(): number[][] {
  const board: number[][] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  let availableValues = [1, 2, 3, 4, 5, 6, 7, 8];
  const randomIndexes = lodash.sampleSize(indexCombinations, 8);
  for (let i = 0; i < randomIndexes.length; i++) {
    const randItem = Math.floor(Math.random() * availableValues.length);
    board[randomIndexes[i][0]][randomIndexes[i][1]] = availableValues[randItem];
    availableValues = availableValues.filter(
      (value) => value !== availableValues[randItem]
    );
  }
  return board;
}
