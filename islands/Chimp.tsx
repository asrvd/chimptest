/** @jsx h */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";
import Button from "../components/Button.tsx";
import confetti from "confetti";
import { createBoard } from "../lib/createBoard.ts";

type Colors = {
  [key: number]: string;
};

export default function Chimp() {
  const [gameBoard, setGameBoard] = useState<number[][]>(createBoard());
  const [buttonColors, setButtonColors] = useState<Colors>({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });
  const [clickedValues, setClickedValues] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showableValues, setShowableValues] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8,
  ]);
  const [move, setMove] = useState<number>(1);
  function checkForWin() {
    if (clickedValues.length === 7) {
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
        setShowableValues([1, 2, 3, 4, 5, 6, 7, 8]);
        setMove(1);
        setTimeout(() => alert("please click on 1 first!"), 1000);
      }
    } else if (move > 0 && move !== 1) {
      if (val == 0) {
        setShowableValues([1, 2, 3, 4, 5, 6, 7, 8]);
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
          setShowableValues([1, 2, 3, 4, 5, 6, 7, 8]);
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
    setShowableValues([1, 2, 3, 4, 5, 6, 7, 8]);
    setMove(1);
    setButtonColors({
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    });
    setGameOver(false);
  }
  function newGame() {
    setGameBoard(createBoard());
    setClickedValues([]);
    setShowableValues([1, 2, 3, 4, 5, 6, 7, 8]);
    setMove(1);
    setButtonColors({
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    });
    setGameOver(false);
  }
  return (
    <div
      class={tw`w-[80%] md:w-1/4 flex flex-col justify-center items-center gap-6`}
    >
      <div class={tw`grid grid-rows-4 grid-cols-4 gap-4 w-full h-full`}>
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
      </div>
    </div>
  );
}
