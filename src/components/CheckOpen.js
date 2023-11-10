import { Button } from "@mui/material";
import EmojiFlagsRoundedIcon from '@mui/icons-material/EmojiFlagsRounded';
import { Icon } from '@iconify/react';

export default function CheckOpen({boardOpen, board, num, handleChange, height}) {
  const color = ["black", "blue", "green", "red", "purple"];

  const number = () => {
    return <Button
      key={num}
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
      onMouseDown={(event) => handleChange(event, num)}
      onContextMenu={(event) => event.preventDefault()}
    >
    {board[num]}
    </Button>
  };

  const bombs = () => {
    return <Button
      key={num}
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
      onMouseDown={(event) => handleChange(event, num)}
      onContextMenu={(event) => event.preventDefault()}
    >
      <Icon icon="mdi:bomb" width="32" height="32" />
    </Button>
  };

  const flg = () => {
    return <Button
      key={num}
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