import React, { useState } from "react";

const Board = ({ wide, board, setGameover }) => {
  const [boardState, setBoardState] = useState(Array(wide ** 2).fill(null));

  const handleGameOver = () => {
    setTimeout(()=>{
      console.log("Game Over");
      setGameover(true)
    },2000)
  };
  
  const handleMouseDown = (event, i) => {
    const newBoard = boardState.slice();
  
    if (event.button === 0) {
      if (newBoard[i] !== null) return;
  
      if (board[i] === "bombs") {
        handleGameOver();
      }
  
      newBoard[i] = board[i];
      setBoardState(newBoard);
  
      if (board[i] === 0) {
        revealAdjacentCells(i, newBoard);
      }
    } else if (event.button === 2) {
      if (newBoard[i] !== null && newBoard[i] !== "flg") return;
      if (newBoard[i] === "flg") newBoard[i] = null;
      else newBoard[i] = "flg";
      setBoardState(newBoard);
    }
  };
  
  const revealAdjacentCells = (index, newBoard) => {
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
        if (board[neighborIndex] === 0) {
          revealAdjacentCells(neighborIndex, newBoard);
        }
      }
    }
    
    return newBoard;
  };  

  const handleContextMenu = (event) => {
    event.preventDefault(); // デフォルトのコンテキストメニューを非表示にする
  };

  const renderBox = (i) => {
    return (
      <button
        key={i}
        className="box"
        onMouseDown={(event) => handleMouseDown(event, i)}
        onContextMenu={handleContextMenu}
      >
        {boardState[i]}
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
