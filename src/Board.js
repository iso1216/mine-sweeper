import React, { useState, useEffect } from "react";

const Board = ({ wide, board, setResult, setCheckResult, isTimerRunning, setIsTimerRunning, time, setTime }) => {
  const [boardState, setBoardState] = useState(Array(wide ** 2).fill(null));
  const [open, setOpen] = useState(Array(wide ** 2).fill(false));
  const [wait, setWait] = useState(false);

  useEffect(() => {
    if (!boardState.includes(null)){
      setWait(true);
      stopTimer();
      setTimeout(()=>{
        setCheckResult(true);
        setResult(true);
      },1000);
    }
  }, [boardState, setCheckResult, setResult]);

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime*10 + 1)/10);
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleGameOver = () => {
    setWait(true);
    setTimeout(() => {
      console.log("Game Over");
      setResult(true);
    }, 2000);
  };

  const whichClass = (i) => {
    if (boardState[i] === 0) return "zero box";
    else if (boardState[i] === 1) return "one box";
    else if (boardState[i] === 2) return "two box";
    else if (boardState[i] === 3) return "three box";
    else if (boardState[i] === 4) return "four box";
    else if (boardState[i] === "flg") return "flg empty box";
    else if (boardState[i] === "bombs") return "bombs box";
    else return "others box";
  };

  const handleMouseDown = (event, i) => {
    if (wait) return;
    const newBoard = [...boardState];
    const newOpen = [...open];

    if (event.button === 0) {
      if (newBoard[i] !== null && newBoard[i] !== "flg") return;

      if (board[i] === "bombs") {
        handleGameOver();
      }

      newBoard[i] = board[i];
      newOpen[i] = true;
      setBoardState(newBoard);
      setOpen(newOpen);

      if (board[i] === 0) {
        revealAdjacentCells(i, newBoard, newOpen);
      }
    } else if (event.button === 2) {
      event.preventDefault(); // デフォルトのコンテキストメニューを非表示にする

      if (newBoard[i] !== null && newBoard[i] !== "flg") return;
      if (newBoard[i] === "flg") {
        newBoard[i] = null;
        newOpen[i] = false;
      } else {
        newBoard[i] = "flg";
        newOpen[i] = true;
      }
      setBoardState(newBoard);
      setOpen(newOpen);
    }
  };

  const revealAdjacentCells = (index, newBoard, newOpen) => {
    const row = Math.floor(index / wide);
    const col = index % wide;

    const neighbors = [
      { row: row - 1, col }, // 上
      { row: row + 1, col }, // 下
      { row, col: col - 1 }, // 左
      { row, col: col + 1 }, // 右
    ];

    for (const neighbor of neighbors) {
      const { row, col } = neighbor;
      const neighborIndex = row * wide + col;

      if (
        row >= 0 &&
        row < wide &&
        col >= 0 &&
        col < wide &&
        newBoard[neighborIndex] === null
      ) {
        newBoard[neighborIndex] = board[neighborIndex];
        newOpen[neighborIndex] = true;
        if (board[neighborIndex] === 0) {
          revealAdjacentCells(neighborIndex, newBoard, newOpen);
        }
      }
    }

    setBoardState([...newBoard]);
    setOpen(newOpen);
  };

  const viewBox = (i) => {
    if (boardState[i] === "flg" || boardState[i] === "bombs") return;
    else return boardState[i];
  }

  const renderBox = (i) => {
    return (
      <button
        key={i}
        className={open[i] ? whichClass(i) : "empty box"}
        onMouseDown={(event) => handleMouseDown(event, i)}
        onContextMenu={(event) => event.preventDefault()} // デフォルトのコンテキストメニューを非表示にする
      >
        {viewBox(i)}
      </button>
    );
  };

  const edge = Array.from({ length: wide }, (_, index) => index);

  return (
    <div>
      {edge.map((index) => (
        <div className="board-row" key={index}>
          {edge.map((number) => renderBox(number + wide * index))}
        </div>
      ))}
    </div>
  );
};

export default Board;
