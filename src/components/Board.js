import { Box, Button, useMediaQuery } from "@mui/material";
import CheckOpen from "./CheckOpen";
import { OpenZero } from "./OpenZero";
import { useCallback, useEffect, useState } from "react";
import EmojiFlagsRoundedIcon from '@mui/icons-material/EmojiFlagsRounded';


export default function Board({ width, height, board, setView, boardOpen, setBoardOpen, bombs, flg, setFlg, setViewMiss, setTime, setTimer, timer }) {
  const Width = Array.from({ length: width }, (_, index) => index);
  const Height = Array.from({ length: height }, (_, index) => index);
  const matches = useMediaQuery("(min-width:320px)");
  const match = useMediaQuery("(min-width:450px)");
  const [clicker, setClicker] = useState(true);
  const [state, setState] = useState([0,0]);

  // キーボード操作用
  const handleKeyPress = useCallback((event) => {
    const newState = [...state];
    // 旗操作
    if (event.key === "f")setClicker(!clicker);
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
      handleChange(event, state[1] + state[0] * width)    }
  }, [state, setState, clicker, setClicker, height, width]);

  useEffect(() => {
    // コンポーネントがマウントされた時にイベントリスナーを追加する
    window.addEventListener('keydown', handleKeyPress);
    // コンポーネントがアンマウントされた時にイベントリスナーを削除する
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // クリアチェック
  useEffect(() => {
    if (!boardOpen.includes(0) && !boardOpen.includes(3)){
      stopTimer();
      setTimeout(() => {
        setView(3);
      }, 2000);
    }
  },[boardOpen])

  // タイマーストップ
  const stopTimer = () => setTimer(true);

  // タイマー
  useEffect(() => {
    let interval;
    if (timer) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime * 10 + 1) / 10);
      }, 100);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (event, i) => {
    const newBoardOpen = [...boardOpen];
    // 左右クリックの判定
    if ((event.button === 0 && clicker) || (event.key === " " && clicker)){
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
    } else if (((event.button === 0 && !clicker) || event.button === 2) || (event.key === " " && !clicker)){
      if (newBoardOpen[i] === 0 && flg < bombs){
        newBoardOpen[i] = 2;
        setFlg(flg+1);
      } else if (newBoardOpen[i] === 2){
        newBoardOpen[i] = 0;
        setFlg(flg-1);
      }
      setBoardOpen(newBoardOpen);
    }
  };

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
}
