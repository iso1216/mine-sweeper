import React from "react";

const Retry = ({ time, onRetry }) => {
  return (
    <div className="retry">
      <div>
        <p className="retrytime">経過時間{time}秒</p>
        <button
          onClick={onRetry}
          className="btn-retry btn-radius-solid btn--shadow"
        >
          リトライ
        </button>
      </div>
    </div>
  );
};

export default Retry;