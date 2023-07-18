import React from "react";

const CustomSet = ({ wide, bombs, setWide, setBombs, setViewCustom }) => {
  return (
    <div className="customize">
      <input
        type="range"
        min="2"
        max="20"
        value={wide}
        onChange={(e) => {
          setWide(Number(e.target.value));
          setBombs(1);
        }}
        className="range"
      />
      <p className="fonts">縦{wide}マス×横{wide}マス（最大20）</p>
      <input
        type="range"
        min="1"
        max={parseInt(wide ** 2 / 3)}
        value={bombs}
        onChange={(e) => setBombs(Number(e.target.value))}
        className="range"
      />
      <p className="fonts">
        爆弾の数：{bombs} (最大{parseInt(wide ** 2 / 3)}個)
      </p>
      <button
        onClick={() => setViewCustom(false)}
        className="btn btn-radius-solid btn--shadow"
      >
        プレイ開始！！！
      </button>
    </div>
  );
};

export default CustomSet;