import React, { useState, useEffect } from "react";

const Board = ({ wide, board, setResult, setView, isTimerRunning, setIsTimerRunning, setTime, bombs, time}) => {
  const [boardState, setBoardState] = useState(Array(wide ** 2).fill(null));
  const [open, setOpen] = useState(Array(wide ** 2).fill(false));
  const [wait, setWait] = useState(false);
  const [viewRetry, setViewRetry] = useState(false);
  const [counter, setCounter] = useState(0);
  const [checkFlg, setCheckFlg] = useState(true);
  const [current, setCurrent] = useState(0);

  const handleMouseDown = (event, i) => {
    if (wait) return;
    const newBoard = [...boardState];
    const newOpen = [...open];

    if ((event === "open" && checkFlg) || (event.button === 0 && checkFlg)) {
      if ((newBoard[i] !== null && newBoard[i] !== "flg") || newBoard[i] === 'flg') return;

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
    } else if (event.button === 2 || !checkFlg || event === 'flg') {
      if (event.button === 2)event.preventDefault();
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

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "f"){
        setCheckFlg(!checkFlg);
      } else if (event.key === "ArrowUp") {
        if (current / wide < 1) return;
        setCurrent(current - wide);
      } else if (event.key === "ArrowDown") {
        if (current / wide >= wide - 1) return;
        setCurrent(current + wide);
      } else if (event.key === "ArrowLeft") {
        if (current  === 0) return;
        setCurrent(current - 1);
      } else if (event.key === "ArrowRight") {
        if (current  === wide**2 - 1) return;
        setCurrent(current + 1);
      } else if (event.key === " ") {
        if (viewRetry) setView(true);
        handleMouseDown(checkFlg ? "open" : "flg", current);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
  
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [current, checkFlg, handleMouseDown]);  

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
    stopTimer();
    setViewRetry(true);
  };

  const whichClass = (i) => {
    let className = "box ";
    if (i === current) className += "current ";
    if (!open[i]) return className + "empty"
    if (boardState[i] === 0) className += "zero";
    else if (boardState[i] === 1) className += "one";
    else if (boardState[i] === 2) className += "two";
    else if (boardState[i] === 3) className += "three";
    else if (boardState[i] === 4) className += "four";
    else if (boardState[i] === "flg") className += "flg empty";
    else if (boardState[i] === "bombs") className += "bombs";
    else if (boardState[i] === "hit") className += "flg hit";
    else return "others box";
    return className;
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
        className={whichClass(i)}
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
        <div>の数：{bombs}個</div>
      </div>
      <div className="count">
        <div className="flg-icon"></div>
        <div>現在：{counter}個</div>
      </div>
      {viewRetry ? 
      <div className="retry">
        <div>
          <p className="retrytime">経過時間{time}秒</p>
          <button onClick={()=>{setView(true)}} className="btn-retry btn-radius-solid btn--shadow">リトライ</button>
        </div>
      </div> : 
      <div className="icon">
        <div>
          <button onClick={() => {setCheckFlg(!checkFlg)}} className={ checkFlg ? "noneicon" : "flgicon" }></button>
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
