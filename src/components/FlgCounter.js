import React from "react";

const FlgCounter = ({ counter }) => {
  return (
    <div className="count">
      <div className="flg-icon"></div>
      <div>現在：{counter}個</div>
    </div>
  );
};

export default FlgCounter;