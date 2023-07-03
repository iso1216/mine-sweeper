import React, { useState } from "react";
import Board from "./Board";

const Game = ({ wide, bombs, setResult, setCheckResult }) => {
  const [board, setBoard] = useState(Array(wide ** 2).fill(0));
  const [isSet, setIsSet] = useState(false);

  const checkBombs = (board) => {
    for (let index = 0; index < board.length; index++) {
      if (board[index] === "bombs") {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (index % wide === 0 && j === -1) continue;
            if (index % wide === wide-1 && j === 1) continue;
            if (board[index + j + wide * i] !== "bombs") board[index + j + wide * i]++;
          }
        }
      }
    }
    return board;
  };

  const generateRandomNumbers = (range, count, board) => {
    const numbers = Array.from({ length: range }, (_, index) => index + 1);
    const randomNumbers = [];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const randomNumber = numbers[randomIndex];
      numbers.splice(randomIndex, 1);
      randomNumbers.push(randomNumber);
    }
    for (let index = 0; index < count; index++) {
      board[randomNumbers[index]] = "bombs";
    }
    return board;
  };

  const setBombs = () => {
    const newBoard = board.slice();
    const bombsBoard = generateRandomNumbers(wide ** 2, bombs, newBoard);
    const startBoard = checkBombs(bombsBoard);
    setBoard(startBoard);
    setIsSet(true);
  };

  const viewBoard = () => {
    return <Board wide={wide} board={board} setResult={setResult} setCheckResult={setCheckResult} />;
  };

  return <div>{isSet ? viewBoard() : setBombs()}</div>;
};

export default Game;
