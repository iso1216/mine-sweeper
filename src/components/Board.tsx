import { Box, Button, useMediaQuery } from "@mui/material";
import CheckOpen from "./CheckOpen";
import { OpenZero } from "./OpenZero";
import React, { useCallback, useEffect, useState } from "react";
import EmojiFlagsRoundedIcon from '@mui/icons-material/EmojiFlagsRounded';
import { Dispatch, SetStateAction } from "react";

interface BoardProps {
  width: number;
  height: number;
  board: any[];
  setView: Dispatch<SetStateAction<number>>;
  boardOpen: number[];
  setBoardOpen: Dispatch<SetStateAction<number[]>>;
  bombs: number;
  flg: number;
  setFlg: Dispatch<SetStateAction<number>>;
  setViewMiss: Dispatch<SetStateAction<number>>;
  setTime: Dispatch<SetStateAction<number>>;
  setTimer: Dispatch<SetStateAction<boolean>>;
  timer: boolean;
}

const Board: React.FC<BoardProps> = ({ 
  width, 
  height, 
  board, 
  setView, 
  boardOpen, 
  setBoardOpen, 
  bombs, 
  flg, 
  setFlg, 
  setViewMiss, 
  setTime, 
  setTimer, 
  timer 
}) => {
  const Width = Array.from({ length: width }, (_, index) => index);
  const Height = Array.from({ length: height }, (_, index) => index);
  const matches = useMediaQuery("(min-width:320px)");
  const match = useMediaQuery("(min-width:450px)");
  const [clicker, setClicker] = useState<boolean>(true);
  const [state, setState] = useState<[number, number, number]>([0, 0, 0]);

  // マスに対する処理
  const handleChange = useCallback((event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent, i: number): void => {
    const newBoardOpen = [...boardOpen];
    // 左右クリックの判定
    if ((event.type === 'mousedown' && (event as React.MouseEvent).button === 0 && clicker) || (event instanceof KeyboardEvent && event.key === " " && clicker)){
      // マスが空いているかの判定
      if (boardOpen[i] === 0){
        // マスが爆弾かどうか
        if (board[i] === "bombs") {
          newBoardOpen[i] = 3;
          setBoardOpen(newBoardOpen);    
          setTimeout(() => {
            setViewMiss(1);
          }, 1000);
        } else {
          newBoardOpen[i] = 1;
          setBoardOpen(newBoardOpen);
          // 隣接する0の一括表示
          if (board[i]===0) OpenZero(newBoardOpen, i, width, height, board, setBoardOpen);
        }
      }
    } else if (((event.type === 'mousedown' && (event as React.MouseEvent).button === 0 && !clicker) || 
               (event.type === 'mousedown' && (event as React.MouseEvent).button === 2) || 
               (event instanceof KeyboardEvent && event.key === " " && !clicker))){
      if (newBoardOpen[i] === 0 && flg < bombs){
        newBoardOpen[i] = 2;
        setFlg(flg+1);
      } else if (newBoardOpen[i] === 2){
        newBoardOpen[i] = 0;
        setFlg(flg-1);
      }
      setBoardOpen(newBoardOpen);
    }
  }, [boardOpen, board, clicker, bombs, flg, height, setBoardOpen, setFlg, setViewMiss, width]);

  // キーボード操作用
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const newState = [...state] as [number, number, number];
    // 旗操作
    if (event.key === "f") setClicker(!clicker);
    // 位置変動
    else if (event.key === "ArrowUp") {
      if (state[0] === 0) return;
      newState[0]--;
      setState(newState);
    } else if (event.key === "ArrowDown") {
      if (state[0] === height-1) return;
      newState[0]++;
      setState(newState);
    } else if (event.key === "ArrowLeft") {
      if (state[1] === 0) return;
      newState[1]--;
      setState(newState);
    } else if (event.key === "ArrowRight") {
      if (state[1] === width-1) return;
      newState[1]++;
      setState(newState);
    // マスに対する処理
    } else if (event.key === " ") {
      if (state[2] === 0) {
        newState[2]++;
        setState(newState);
        return;
      }
      handleChange(event, state[1] + state[0] * width);
    }
  }, [state, clicker, setClicker, height, width, handleChange]);

  useEffect(() => {
    // コンポーネントがマウントされた時にイベントリスナーを追加する
    window.addEventListener('keydown', handleKeyPress);
    // コンポーネントがアンマウントされた時にイベントリスナーを削除する
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // タイマーストップ
  const stopTimer = useCallback(() => {
    setTimer(true);
  }, [setTimer]);

  // クリアチェック
  useEffect(() => {
    // ボードが初期化されているかチェック
    if (boardOpen.length === 0 || board.length === 0) return;

    // 未オープンのマスの数をカウント
    const closedCells = boardOpen.filter(cell => cell === 0 || cell === 2).length;
    
    // 爆弾の数と未オープンのマスの数が一致し、爆弾を踏んでいない場合はクリア
    if (closedCells === bombs && !boardOpen.includes(3)) {
      stopTimer();
      setTimeout(() => {
        setView(3);
      }, 2000);
    }
  }, [boardOpen, board, bombs, stopTimer, setView]);

  // タイマー
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime * 10 + 1) / 10);
      }, 100);
    }

    return () => clearInterval(interval);
  }, [timer, setTime]);

  return (
    <Box>
      {Height.map((index) => (
        <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
          {Width.map((number) =>
            boardOpen[number + index * width] ? (
              <CheckOpen key={number + index * width} boardOpen={boardOpen} board={board} num={number + index * width} handleChange={handleChange} height={height} point={state[0] === index && state[1] === number} />
            ) : (
              <Button
                key={number + index * width}
                sx={{
                  minWidth: 0,
                  minHeight: 0,
                  width: {xs : height < 15 ? "30px" : match ? "20px" : matches ? "15px" : "13.5px", md : height < 15 ? "45px" : "30px"},
                  height: {xs : height < 15 ? "30px" : match ? "20px" : matches ? "15px" : "13.5px",md : height < 15 ? "45px" : "30px"},
                  padding: 0,
                  border: match ? 4 : matches ? 3 : 2,
                  borderColor: state[0] === index && state[1] === number ? "red" : "#EEE",
                  borderRadius: 0,
                  borderStyle: "outset",
                  backgroundColor: "#B8B7B7",
                }}
                onMouseDown={(event) => handleChange(event, number + index * width)}
                onContextMenu={(event) => event.preventDefault()}
              >
              </Button>
            )
          )}
        </Box>
      ))}
      <Box display={"flex"} justifyContent={"right"}>
        <Button
          onClick={()=>setClicker(!clicker)}
          sx={{
            minWidth: 0,
            minHeight: 0,
            border: 4,
            height: 40,
            width: 40,
            padding: 0,
            margin: 2,
            borderColor: clicker ? "yellow" :"red",
            borderRadius: 0,
            borderStyle: "outset",
            backgroundColor: clicker ? "gray" :  "#ddd",
            fontWeight: 700,
            color: "black",
          }}
        >
          <EmojiFlagsRoundedIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Board; 