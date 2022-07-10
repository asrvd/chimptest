/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";
import Button from "../components/Button.tsx";
import confetti from "confetti";
import { createBoard } from "../lib/createBoard.ts";
import type { Colors, Difficulty } from "../utils/types.ts";
import { gameMode } from "../utils/constants.ts";

export default function Chimp() {
  const [difficulty, setDifficulty] = useState<"easy" | "expert" | "insane">(
    "easy"
  );
  const [clickedValues, setClickedValues] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showableValues, setShowableValues] = useState<number[]>(
    gameMode[difficulty].values
  );
  const [gameBoard, setGameBoard] = useState<number[][]>(
    createBoard(
      difficulty,
      gameMode[difficulty].values.length,
      gameMode[difficulty].values
    )
  );
  const [buttonColors, setButtonColors] = useState<Colors>(
    gameMode[difficulty].colors
  );
  const [move, setMove] = useState<number>(1);

  function checkForWin() {
    if (clickedValues.length === gameMode[difficulty].values.length - 1) {
      confetti({
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
      setTimeout(() => alert("you won the game!"), 1000);
    }
  }

  function handleGame(val: number) {
    if (move === 1) {
      if (val === 1) {
        setClickedValues((prevState) => [...prevState, val]);
        setButtonColors((prevState) => {
          return {
            ...prevState,
            [val]: "#6ee7b7",
          };
        });
        setShowableValues([1]);
      } else {
        setShowableValues(gameMode[difficulty].values);
        setMove(1);
        setTimeout(() => alert("please click on 1 first!"), 1000);
      }
    } else if (move > 0 && move !== 1) {
      if (val == 0) {
        setShowableValues(gameMode[difficulty].values);
        setClickedValues((prevState) => [...prevState, val]);
        setButtonColors((prevState) => {
          return {
            ...prevState,
            [val]: "#fda4af",
          };
        });
        setGameOver(true);
        setTimeout(() => alert("you lost the game"), 1000);
      } else {
        if (val === clickedValues[clickedValues.length - 1] + 1) {
          setClickedValues((prevState) => [...prevState, val]);
          setButtonColors((prevState) => {
            return {
              ...prevState,
              [val]: "#6ee7b7",
            };
          });
          checkForWin();
        } else {
          setShowableValues(gameMode[difficulty].values);
          setClickedValues((prevState) => [...prevState, val]);
          setButtonColors((prevState) => {
            return {
              ...prevState,
              [val]: "#fda4af",
            };
          });
          setGameOver(true);
          setTimeout(() => alert("you lost the game"), 1000);
        }
      }
    }
  }

  function handleClick(val: number) {
    setMove((prevState) => prevState + 1);
    setShowableValues((prevState) => [...prevState, val]);
    handleGame(val);
    return null;
  }

  function reset() {
    setClickedValues([]);
    setShowableValues(gameMode[difficulty].values);
    setMove(1);
    setButtonColors(gameMode[difficulty].colors);
    setGameOver(false);
  }

  function changeMode(mode: Difficulty) {
    setDifficulty(mode);
    setGameBoard(
      createBoard(mode, gameMode[mode].values.length, gameMode[mode].values)
    );
    setClickedValues([]);
    setShowableValues(gameMode[mode].values);
    setMove(1);
    setButtonColors(gameMode[mode].colors);
    setGameOver(false);
  }

  function newGame() {
    setGameBoard(
      createBoard(
        difficulty,
        gameMode[difficulty].values.length,
        gameMode[difficulty].values
      )
    );
    reset();
  }

  return (
    <div
      class={tw`w-[90%] md:w-1/3 lg:w-1/4 flex flex-col justify-center items-center gap-6`}
    >
      <div
        class={tw`grid gap-4 w-full h-full`}
        style={{
          gridTemplateColumns: `repeat(${gameMode[difficulty].cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gameMode[difficulty].rows}, minmax(0, 1fr))`,
        }}
      >
        {gameBoard.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div
              class={tw`flex flex-col justify-center items-center`}
              key={cellIndex}
              onClick={() => handleClick(cell)}
            >
              <Button
                disabled={
                  clickedValues.includes(cell) || gameOver ? true : false
                }
                style={{
                  backgroundColor: buttonColors[cell],
                  color: clickedValues.includes(cell) ? "#374151" : "#e5e7eb",
                }}
              >
                {!showableValues.includes(cell) ? " " : cell}
              </Button>
            </div>
          ))
        )}
      </div>
      <div class={tw`flex w-full gap-4`}>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={newGame}>New Game</Button>
        <select
          placeholder="Difficulty"
          class={tw`px-2 ease-in-out duration-300 py-2 border(gray-500 2) hover:bg-gray-600 bg-gray-700 rounded shadow-md hover:shadow-2xl hover:ring-2 ring-blue-400 w-full hover:-translate-y-0.5 focus:outline-none text-gray-200`}
          onChange={(event) =>
            changeMode(event.currentTarget.value as Difficulty)
          }
        >
          <option value="easy">Easy</option>
          <option value="expert">Expert</option>
          <option value="insane">Insane</option>
        </select>
      </div>
    </div>
  );
}
