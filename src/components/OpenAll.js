import { Button } from "@mui/material";
import { Icon } from '@iconify/react';
import EmojiFlagsRoundedIcon from '@mui/icons-material/EmojiFlagsRounded';

export default function OpenAll({board, num, height, boardOpen}) {
  const color = ["black", "blue", "green", "red", "purple"];

  // 数字のマス
  const number = () => {
    return <Button
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
        backgroundColor: "#ccc",
        fontWeight: 700,
        color: board[num] < 5 ? color[board[num]] : "black"
      }}
    >
    {board[num]}
    </Button>
  };

  // 爆弾のマス
  const bombs = () => {
    return <Button
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
        backgroundColor: boardOpen[num] === 2 ? "#f1c767" : "#b8b7b7",
      }}
    >
      {boardOpen[num] === 2 ? <EmojiFlagsRoundedIcon /> : <Icon icon="mdi:bomb" width="32" height="32" />}
    </Button>
  };

  // 空いていないマス
  const nomal = () => {
    return <Button
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
        backgroundColor: "#b8b7b7",
      }}
    >
    </Button>
  };

  

  return(
    isNaN(board[num]) ? bombs() : boardOpen[num] === 1 ? number() : nomal()
  );
};