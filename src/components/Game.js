import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Board from "./Board";
import { setBombs } from "./StartGame";
import Miss from "./Miss";
import { Icon } from '@iconify/react';
import EmojiFlagsRoundedIcon from '@mui/icons-material/EmojiFlagsRounded';

export default function Game({setView, width, height, bombs, view}){
  const [board, setBoard] = useState(Array(width * height).fill(0));
  const [boardOpen, setBoardOpen] = useState(Array(width * height).fill(0));
  const [flg, setFlg] = useState(0);
  const [viewMiss, setViewMiss] = useState(0);

  // 内部初期配置の設定
  useEffect(() => {
    // ゲーム画面の場合の初期化(Missの時は実行しない)
    if(view===2)setBoard(setBombs({ board, width, height, bombs })); // Set the initial state in useEffect
  }, [view, width, height, bombs]);
  return(
    <Box>
      <Box sx={{display: "flex", position: "absolute", top: 10, right: 20}}>
        <Box><Icon icon="mdi:bomb" width="32" height="32" /></Box>
        <Typography fontSize={20}>の数：{bombs}個</Typography>
      </Box>
      <Box sx={{display: "flex", position: "absolute", top: 50, right: 20}}>
        <Box><EmojiFlagsRoundedIcon fontSize="large" /></Box>
        <Typography fontSize={20}>の数：{flg}個</Typography>
      </Box>
      {viewMiss ? 
        <Miss setView={setView} width={width} height={height} board={board} boardOpen={boardOpen} /> :
        <Board width={width} height={height} board={board} setView={setView} boardOpen={boardOpen} setBoardOpen={setBoardOpen} bombs={bombs} flg={flg} setFlg={setFlg} setViewMiss={setViewMiss} />
      }
    </Box>
  );
};