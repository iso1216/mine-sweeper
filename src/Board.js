import React, { useState } from "react";

const Board = ({ wide, board }) => {
  const [boardState, setBoardState] = useState(Array(wide ** 2).fill(null));

  const handleClick = (i) => {
    const newBoard = boardState.slice();
    newBoard[i] = board[i];
    setBoardState(newBoard);
  };

  const renderBox = (i) => {
    return (
      <button className="box" onClick={() => handleClick(i)}>
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
