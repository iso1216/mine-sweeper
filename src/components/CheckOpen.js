import { Button, useMediaQuery } from "@mui/material";
import EmojiFlagsRoundedIcon from '@mui/icons-material/EmojiFlagsRounded';
import { Icon } from '@iconify/react';

export default function CheckOpen({boardOpen, board, num, handleChange, height}) {
  const color = ["black", "blue", "green", "red", "purple"];
  const matches = useMediaQuery("(min-width:320px)");
  const match = useMediaQuery("(min-width:450px)");

  // 数字のマス
  const number = () => {
    return <Button
      sx={{
        minWidth: 0,
        minHeight: 0,
        width: {xs : height < 15 ? "30px" : match ? "20px" : matches ? "15px" : "13.5px", md : height < 15 ? "45px" : "30px"},
        height: {xs : height < 15 ? "30px" : match ? "20px" : matches ? "15px" : "13.5px",md : height < 15 ? "45px" : "30px"},
        padding: 0,
        border: match ? 4 : matches ? 3 : 2,
        borderColor: "#EEE",
        borderRadius: 0,
        borderStyle: "outset",
        backgroundColor: "#ccc",
        fontWeight: 700,
        color: board[num] < 5 ? color[board[num]] : "black"
      }}
      onMouseDown={(event) => handleChange(event, num)}
      onContextMenu={(event) => event.preventDefault()}
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
        width: {xs : height < 15 ? "30px" : match ? "20px" : matches ? "15px" : "13.5px", md : height < 15 ? "45px" : "30px"},
        height: {xs : height < 15 ? "30px" : match ? "20px" : matches ? "15px" : "13.5px",md : height < 15 ? "45px" : "30px"},
        padding: 0,
        border: match ? 4 : matches ? 3 : 2,
        borderColor: "#EEE",
        borderRadius: 0,
        borderStyle: "outset",
        backgroundColor: "#b8b7b7",
      }}
      onMouseDown={(event) => handleChange(event, num)}
      onContextMenu={(event) => event.preventDefault()}
    >
      <Icon icon="mdi:bomb" width="32" height="32" />
    </Button>
  };

  // 旗のマス
  const flg = () => {
    return <Button
      sx={{
        minWidth: 0,
        minHeight: 0,
        width: {xs : height < 15 ? "30px" : match ? "20px" : matches ? "15px" : "13.5px", md : height < 15 ? "45px" : "30px"},
        height: {xs : height < 15 ? "30px" : match ? "20px" : matches ? "15px" : "13.5px",md : height < 15 ? "45px" : "30px"},
        padding: 0,
        border: match ? 4 : matches ? 3 : 2,
        borderColor: "#EEE",
        borderRadius: 0,
        borderStyle: "outset",
        backgroundColor: "#b8b7b7",
      }}
      onMouseDown={(event) => handleChange(event, num)}
      onContextMenu={(event) => event.preventDefault()}
    >
      <EmojiFlagsRoundedIcon />
    </Button>
  };

  return(
    boardOpen[num] === 2 ? flg() : isNaN(board[num]) ? bombs() : number()
  );
};