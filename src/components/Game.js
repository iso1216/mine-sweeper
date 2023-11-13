import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Board from "./Board";
import { setBombs } from "./StartGame";
import Miss from "./Miss";

export default function Game({setView, width, height, bombs, view}){
  const [board, setBoard] = useState(Array(width * height).fill(0));
  const [boardOpen, setBoardOpen] = useState(Array(width * height).fill(0));

  // 内部初期配置の設定
  useEffect(() => {
    // ゲーム画面の場合の初期化(Missの時は実行しない)
    if(view===2)setBoard(setBombs({ board, width, height, bombs })); // Set the initial state in useEffect
  }, [view, width, height, bombs]);
  return(
    <Box>
      {view === 2 ? 
        <Board width={width} height={height} board={board} setView={setView} boardOpen={boardOpen} setBoardOpen={setBoardOpen} /> :
        <Miss setView={setView} width={width} height={height} board={board} boardOpen={boardOpen} />
      }
    </Box>
  );
};