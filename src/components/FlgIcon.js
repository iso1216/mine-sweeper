import React from "react";

const FlgIcon = ({ checkFlg, onToggleFlg }) => {
  return (
    <div className="icon">
      <div>
        <button
          onClick={onToggleFlg}
          className={checkFlg ? "noneicon" : "flgicon"}
        ></button>
      </div>
    </div>
  );
};

export default FlgIcon;
