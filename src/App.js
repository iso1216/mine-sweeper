import React, { useState } from "react";
import Game from "./Game";

function App() {
  const [wide, setWide] = useState(null);
  const [bombs, setBombs] = useState(null);
  const [view, setView] = useState(true);
  const [result, setResult] = useState(false);

  const difficultySet = (difficulty) => {
    if (difficulty === "easy") {
      setWide(10);
      setBombs(15);
      setView(false);
    } else if (difficulty === "normal") {
      setWide(13);
      setBombs(30);
      setView(false);
    } else {
      setWide(16);
      setBombs(50);
      setView(false);
    }
  };

  const viewGamemode = () => {
    return (
      <div>
        <h1 className="title">マインスイーパー</h1>
        <div className="gamemode">
          <button className="btn btn-radius-solid btn--shadow" onClick={() => difficultySet("easy")}>
            簡単
          </button>
          <button className="btn btn-radius-solid btn--shadow" onClick={() => difficultySet("normal")}>
            普通
          </button>
          <button className="btn btn-radius-solid btn--shadow" onClick={() => difficultySet("hard")}>
            難しい
          </button>
        </div>
        <div>
          <h2>難易度選択</h2>
          <ul>
          <li>簡単：10×10マスで爆弾15個</li>
          <li>簡単：13×13マスで爆弾30個</li>
          <li>簡単：16×16マスで爆弾50個</li>
          </ul>
        </div>
      </div>
    );
  };

  const viewGame = () => {
    return <Game wide={wide} bombs={bombs} setResult={setResult} />;
  };

  const viewGameover = ()  => {
    return <h1>gameover</h1>
  }

  return (
    <div className="App">
      <div className="Game">{result ? viewGameover() : view ? viewGamemode() : viewGame()}</div>
    </div>
  );
}

export default App;
