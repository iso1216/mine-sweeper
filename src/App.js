import React, { useState } from "react";
import Game from "./Game";

function App() {
  const [wide, setWide] = useState(null);
  const [bombs, setBombs] = useState(null);
  const [view, setView] = useState(true);
  const [gameover, setGameover] = useState(false);

  const difficultySet = (difficulty) => {
    if (difficulty === "easy") {
      setWide(10);
      setBombs(10);
      setView(false);
    } else if (difficulty === "normal") {
      setWide(15);
      setBombs(20);
      setView(false);
    } else {
      setWide(18);
      setBombs(40);
      setView(false);
    }
  };

  const viewGamemode = () => {
    return (
      <div className="gamemode">
        <button className="button" onClick={() => difficultySet("easy")}>
          簡単
        </button>
        <button className="button" onClick={() => difficultySet("normal")}>
          普通
        </button>
        <button className="button" onClick={() => difficultySet("hard")}>
          難しい
        </button>
      </div>
    );
  };

  const viewGame = () => {
    return <Game wide={wide} bombs={bombs} setGameover={setGameover} />;
  };

  const viewGameover = ()  => {
    return <p>gameover</p>
  }

  return (
    <div className="App">
      <div className="Game">{gameover ? viewGameover() : view ? viewGamemode() : viewGame()}</div>
    </div>
  );
}

export default App;
