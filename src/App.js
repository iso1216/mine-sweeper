import React, { useState } from "react";
import Game from "./Game";

function App() {
  const [wide, setWide] = useState(null);
  const [bombs, setBombs] = useState(null);
  const [view, setView] = useState(true);

  const difficultySet = (difficulty) => {
    if (difficulty === "easy") {
      setWide(10);
      setBombs(15);
      setView(false);
    } else if (difficulty === "normal") {
      setWide(15);
      setBombs(30);
      setView(false);
    } else {
      setWide(18);
      setBombs(50);
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
    return <Game wide={wide} bombs={bombs} />;
  };

  return (
    <div className="App">
      <div className="Game">{view ? viewGamemode() : viewGame()}</div>
    </div>
  );
}

export default App;
