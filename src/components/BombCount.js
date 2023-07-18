import React from "react";

const BombCount = ({ bombs }) => {
  return (
    <div className="bomb-count">
      <div className="bombs-icon"></div>
      <div>の数：{bombs}個</div>
    </div>
  );
};

export default BombCount;