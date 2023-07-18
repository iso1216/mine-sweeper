import React, { useState, useEffect } from "react";
import CustomSet from "./CustomSet";
import GameMode from "./GameMode";
import Game from "./Game";
import Result from "./Result";

const App = () => {
  const [wide, setWide] = useState(2);
  const [bombs, setBombs] = useState(1);
  const [view, setView] = useState(true);
  const [result, setResult] = useState(false);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [viewCustom, setViewCustom] = useState(false);
  const [currentMode, setCurrentMode] = useState(0);
  const difficulties = {
    easy: "簡単",
    normal: "普通",
    hard: "難しい",
    custom: "自分で設定",
  };

  const difficultySet = (difficulty) => {
    startTimer();
    if (difficulty === "easy") {
      setWide(10);
      setBombs(15);
      setView(false);
    } else if (difficulty === "normal") {
      setWide(13);
      setBombs(30);
      setView(false);
    } else if (difficulty === "hard") {
      setWide(16);
      setBombs(50);
      setView(false);
    } else {
      setView(false);
      setViewCustom(true);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (view) {
        if (event.key === "ArrowLeft") {
          if (currentMode === 0) return;
          setCurrentMode(currentMode - 1);
        } else if (event.key === "ArrowRight") {
          if (currentMode === 3) return;
          setCurrentMode(currentMode + 1);
        } else if (event.key === " ") {
          if (result) {
            setView(true);
            setResult(false);
          } else {
            difficultySet(Object.keys(difficulties)[currentMode]);
          }
        }
      } else if (result) {
        if (event.key === " ") {
          setView(true);
          setResult(false);
        }
      } else if (viewCustom) {
        if (event.key === " ") {
          setViewCustom(false);
        }
      } else return;
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [ view, result, viewCustom, currentMode, wide, bombs,
    difficultySet, setView, setResult, setCurrentMode, setWide, setBombs ]);

  const startTimer = () => {
    setIsTimerRunning(true);
    setTime(0);
  };

  return (
    <div className="App">
      <div className="Game">
        {result ? (
          <Result time={time} setView={setView} setResult={setResult}/>
        ) : view ? (
          <GameMode currentMode={currentMode} difficultySet={difficultySet} difficulties={difficulties}/>
        ) : viewCustom ? (
          <CustomSet wide={wide} bombs={bombs} setWide={setWide} setBombs={setBombs} setViewCustom={setViewCustom}/>
        ) : (
          <Game wide={wide} bombs={bombs} setResult={setResult} setView={setView} isTimerRunning={isTimerRunning} setIsTimerRunning={setIsTimerRunning} setTime={setTime} time={time}/>
        )}
      </div>
    </div>
  );
}

export default App;
