import React from "react";

const GameMode = ({ currentMode, difficultySet, difficulties }) => {
  return (
    <div>
      <h1 className="title">マインスイーパー</h1>
      <div className="gamemode">
        {Object.keys(difficulties).map((difficulty, index) => (
          <button
            key={index}
            className={
              currentMode === index
                ? "btn btn-radius-solid btn--shadow current"
                : "btn btn-radius-solid btn--shadow"
            }
            onClick={() => difficultySet(difficulty)}
          >
            {difficulties[difficulty]}
          </button>
        ))}
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
            <li>
              右下のボタンを押すことで、旗モードを切り替えられます。
              <br />
              <span>
                <small>※赤色の枠の時が旗モード</small>
              </span>
            </li>
            <li>
              キー入力対応<br />
              矢印キーで場所を選び、スペースで処理<br />
              fキーで旗モードの切り替えができます。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameMode;