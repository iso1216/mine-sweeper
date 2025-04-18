import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Board from "./Board";
import { setBombs } from "./StartGame";
import Miss from "./Miss";
import { Icon } from '@iconify/react';
import EmojiFlagsRoundedIcon from '@mui/icons-material/EmojiFlagsRounded';
import { GameProps } from "../types";

const Game: React.FC<GameProps> = ({setView, width, height, bombs, view, startTimer, setTimer, setTime, timer}) => {
  // 初期状態の配列を作成
  const initialBoardState = Array(width * height).fill(0);
  const [board, setBoard] = useState<any[]>([]);
  const [boardOpen, setBoardOpen] = useState<number[]>([]);
  const [flg, setFlg] = useState<number>(0);
  const [viewMiss, setViewMiss] = useState<number>(0);
  const [initialized, setInitialized] = useState<boolean>(false);

  // 内部初期配置の設定
  useEffect(() => {
    if (!initialized && view === 2) {
      // タイマーとゲームをリセット
      startTimer();
      setFlg(0);
      
      // ボードを初期化
      const initialBoard = [...initialBoardState];
      const gameBoard = setBombs({ board: initialBoard, width, height, bombs });
      setBoard(gameBoard);
      
      // boardOpenを初期化（すべてのセルを未オープン状態に）
      const newBoardOpen = Array(width * height).fill(0);
      setBoardOpen(newBoardOpen);
      
      setInitialized(true);
    }
  }, [view, width, height, bombs, initialized, initialBoardState, startTimer]);

  // viewが変わったときにinitializedをリセット
  useEffect(() => {
    if (view !== 2) {
      setInitialized(false);
    }
  }, [view]);

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
      {// 画面の選定 
        viewMiss ? 
        <Miss setView={setView} width={width} height={height} board={board} boardOpen={boardOpen} /> :
        <Board
          width={width}
          height={height}
          board={board}
          setView={setView}
          boardOpen={boardOpen}
          setBoardOpen={setBoardOpen}
          bombs={bombs}
          flg={flg}
          setFlg={setFlg}
          setViewMiss={setViewMiss}
          setTime={setTime}
          setTimer={setTimer}
          timer={timer} />
      }
    </Box>
  );
};

export default Game; 