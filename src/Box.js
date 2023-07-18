import React from "react";

const Box = ({ className, onMouseDown, onContextMenu, content }) => {
  return (
    <button
      className={className}
      onMouseDown={onMouseDown}
      onContextMenu={onContextMenu}
    >
      {content}
    </button>
  );
};

export default Box;