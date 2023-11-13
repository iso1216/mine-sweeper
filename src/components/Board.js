import { Box, Button } from "@mui/material";
import CheckOpen from "./CheckOpen";
import { OpenZero } from "./OpenZero";
import { useEffect } from "react";

export default function Board({ width, height, board, setView, boardOpen, setBoardOpen }) {
  const Width = Array.from({ length: width }, (_, index) => index);
  const Height = Array.from({ length: height }, (_, index) => index);

  // クリアチェック
  useEffect(() => {
    if (!boardOpen.includes(0) && !boardOpen.includes(3)){
      setTimeout(() => {
        setView(3);
      }, 2000);
    }
  },[boardOpen])

  const handleChange = (event, i) => {
    const newBoardOpen = [...boardOpen];
    // 左右クリックの判定
    if (event.button === 0){
      // マスが空いているかの判定
      if (boardOpen[i] === 0){
        // マスが爆弾かどうか
        if (board[i] === "bombs") {
          newBoardOpen[i] = 3;
          setBoardOpen(newBoardOpen);    
          setTimeout(() => {
            setView(4);
          }, 1000);
        } else {
          newBoardOpen[i] = 1;
          setBoardOpen(newBoardOpen);
          // 隣接する0の一括表示
          if (board[i]===0) OpenZero(newBoardOpen, i, width, height, board, setBoardOpen);
        }
      }
    } else if (event.button === 2){
      if (newBoardOpen[i] === 0) newBoardOpen[i] = 2;
      else if (newBoardOpen[i] === 2) newBoardOpen[i] = 0;
      setBoardOpen(newBoardOpen);
    }
  };

  return (
    <Box>
      {Height.map((index) => (
        <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
          {Width.map((number) =>
            boardOpen[number + index * width] ? (
              <CheckOpen key={number + index * width} boardOpen={boardOpen} board={board} num={number + index * width} handleChange={handleChange} height={height} />
            ) : (
              <Button
                key={number + index * width}
                sx={{
                  minWidth: 0,
                  minHeight: 0,
                  width: height < 15 ? "45px" : "30px",
                  height: height < 15 ? "45px" : "30px",
                  padding: 0,
                  border: 4,
                  borderColor: "#EEE",
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
    </Box>
  );
}
