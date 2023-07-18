import React from "react";

const Result = ({ time, setView, setResult }) => {
  return (
    <div>
      <div>
        <div className="clearbox">
          <h1 className="gameclear">GAME CLEAR!!!</h1>
        </div>
        <div className="timer">クリアタイム: {time}秒</div>
      </div>
      <div className="result">
        <button
          onClick={() => {
            setView(true);
            setResult(false);
          }}
          className="btn btn-solid"
        >
          タイトルに戻る
        </button>
      </div>
    </div>
  );
};

export default Result;