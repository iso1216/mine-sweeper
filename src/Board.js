import React, { useState, useEffect } from "react";

const Board = ({ wide, board, setResult, setView, isTimerRunning, setIsTimerRunning, setTime, bombs}) => {
  const [boardState, setBoardState] = useState(Array(wide ** 2).fill(null));
  const [open, setOpen] = useState(Array(wide ** 2).fill(false));
  const [wait, setWait] = useState(false);
  const [viewRetry, setViewRetry] = useState(false);
  const [counter, setCounter] = useState(0);
  const [checkFlg, setCheckFlg] = useState(true);

  useEffect(() => {
    if (!boardState.includes(null)){
      setWait(true);
      stopTimer();
      setTimeout(()=>{
        setResult(true);
      },1000);
    }
  }, [boardState, setResult]);

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

  const viewBombs = (newBoard, newOpen) => {
    for (let i = 0; i < board.length; i++){
      if (board[i] === 'bombs' && newBoard[i] !== 'flg'){
        newBoard[i] = board[i];
        newOpen[i] = true;
      } else if (board[i] === 'bombs' && newBoard[i] === 'flg'){
        newBoard[i] = 'hit';
      }
    }
    setBoardState(newBoard);
    setOpen(newOpen);
  }

  const handleGameOver = (newBoard, newOpen) => {
    setWait(true);
    viewBombs(newBoard, newOpen);
    setViewRetry(true);
  };

  const whichClass = (i) => {
    if (boardState[i] === 0) return "zero box";
    else if (boardState[i] === 1) return "one box";
    else if (boardState[i] === 2) return "two box";
    else if (boardState[i] === 3) return "three box";
    else if (boardState[i] === 4) return "four box";
    else if (boardState[i] === "flg") return "flg empty box";
    else if (boardState[i] === "bombs") return "bombs box";
    else if (boardState[i] === "hit") return "flg hit box";
    else return "others box";
  };

  const handleMouseDown = (event, i) => {
    if (wait) return;
    const newBoard = [...boardState];
    const newOpen = [...open];

    if (event.button === 0 && checkFlg) {
      if (newBoard[i] !== null && newBoard[i] !== "flg") return;

      if (board[i] === "bombs") {
        handleGameOver(newBoard, newOpen);
        return;
      }

      newBoard[i] = board[i];
      newOpen[i] = true;
      setBoardState(newBoard);
      setOpen(newOpen);

      if (board[i] === 0) {
        revealAdjacentCells(i, newBoard, newOpen);
      }
    } else if (event.button === 2 || !checkFlg) {
      event.preventDefault(); // デフォルトのコンテキストメニューを非表示にする
      if (newBoard[i] !== null && newBoard[i] !== "flg") return;
      if (newBoard[i] === "flg") {
        setCounter(counter-1);
        newBoard[i] = null;
        newOpen[i] = false;
      } else {
        if (counter===bombs) return;
        setCounter(counter+1);
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
    if (boardState[i] === "flg" || boardState[i] === "bombs" || boardState[i] === "hit") return;
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
      <div className="bomb-count">
        <div className="bombs-icon"></div>
        <div>の数{bombs}個</div>
      </div>
      <div className="count">
        <div className="flg-icon"></div>
        <div>現在：{counter}</div>
      </div>
      {viewRetry ? 
      <div className="retry">
        <div>
          <button onClick={()=>{setView(true)}} className="btn btn-radius-solid btn--shadow">リトライ</button>
        </div>
      </div> : 
      <div className="retry">
        <div>
          <button onClick={() => {setCheckFlg(!checkFlg)}} className={ checkFlg ? "bombsicon" : "flgicon" }></button>
        </div>
      </div>
      }
      <div className="board-container">
      <div>
        {edge.map((index) => (
          <div className="board-row" key={index}>
            {edge.map((number) => renderBox(number + wide * index))}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Board;
