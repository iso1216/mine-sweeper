import React, { useState, useEffect } from "react";
import Game from "./Game";

function App() {
  const [wide, setWide] = useState(2);
  const [bombs, setBombs] = useState(1);
  const [view, setView] = useState(true);
  const [result, setResult] = useState(false);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [viewCuntom, setViewCustom] = useState(false);
  const [currentmode, setCurrentmode] = useState(0);
  const difficult = ["easy", "normal", "hard", "custom"];

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
      if (!view)return;
      if (event.key === "ArrowLeft") {
        if (currentmode === 0) return;
        setCurrentmode(currentmode - 1);
      } else if (event.key === "ArrowRight") {
        if (currentmode === 3) return;
        setCurrentmode(currentmode + 1);
      } else if (event.key === " ") {
        difficultySet(difficult[currentmode]);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
  
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentmode, setCurrentmode, difficultySet, view]);  


  const startTimer = () => {
    setIsTimerRunning(true);
    setTime(0);
  };


  const viewCuntomSet = () => {
    return (
      <div className="customize">
        <input
          type="range"
          min="2"
          max="20"
          value={wide}
          onChange={(e) => {
            setWide(e.target.value)
            setBombs(1)
          }}
          className="range"
        />
        <p className="fonts">縦{wide}マス×横{wide}マス（最大20）</p>
        <input
          type="range"
          min="1"
          max={parseInt(wide**2/3)}
          value={bombs}
          onChange={(e) => setBombs(e.target.value)}
          className="range"
        />
        <p className="fonts">爆弾の数：{bombs} (最大{parseInt(wide**2/3)}個)</p>
        <button
          onClick={()=>setViewCustom(false)}
          className="btn btn-radius-solid btn--shadow"
        >プレイ開始！！！</button>
      </div>
    )
  }

  const viewGamemode = () => {
    return (
      <div>
        <h1 className="title">マインスイーパー</h1>
        <div className="gamemode">
          <button
            className={currentmode===0 ? "btn btn-radius-solid btn--shadow current" : "btn btn-radius-solid btn--shadow"}
            onClick={() => difficultySet("easy")}>
            簡単
          </button>
          <button
            className={currentmode===1 ? "btn btn-radius-solid btn--shadow current" : "btn btn-radius-solid btn--shadow"}
            onClick={() => difficultySet("normal")}>
            普通
          </button>
          <button
            className={currentmode===2 ? "btn btn-radius-solid btn--shadow current" : "btn btn-radius-solid btn--shadow"}
            onClick={() => difficultySet("hard")}>
            難しい
          </button>
          <button
            className={currentmode===3 ? "btn btn-radius-solid btn--shadow current" : "btn btn-radius-solid btn--shadow"}
            onClick={() => difficultySet("custom")}>
            自分で設定
          </button>
        </div>
        <div className="info">
          <div className="childinfo">
            <h2 className="fonts">ルール説明</h2>
            <ul>
            <li>簡単：10×10マスで爆弾15個</li>
            <li>普通：13×13マスで爆弾30個</li>
            <li>難しい：16×16マスで爆弾50個</li>
            <li>自分で設定：幅と爆弾の数を自分で設定できます。</li>
            <li>左クリックでマスを開き、右クリックで旗を設置できます。</li>
            <li>右下のボタンを押すことで、旗モードを切り替えられます。<br/><span><small>※赤色の枠の時が旗モード</small></span></li>
            <li>キー入力対応<br/>矢印キーで場所を選び、スペースで処理<br/>fキーで旗モードの切り替えができます。</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const viewGame = () => {
    return <Game wide={wide} bombs={bombs}
    setResult={setResult} setView={setView}
    isTimerRunning={isTimerRunning} setIsTimerRunning={setIsTimerRunning}
    setTime={setTime} time={time} />;
  };

  const viewResult = ()  => {
    return (
      <div>
        <div>
          <div className="clearbox"><h1 className="gameclear">GAME CLEAR!!!</h1></div>
          <div className="timer">クリアタイム: {time}秒</div>
        </div>
        <div className="result">
          <button onClick={()=>{
            setView(true);
            setResult(false);
          }}
          className="btn btn-solid"
          >タイトルに戻る</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="Game">{result ? viewResult() : view ? viewGamemode() : viewCuntom ? viewCuntomSet() : viewGame()}</div>
    </div>
  );
}

export default App;
