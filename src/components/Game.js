import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Board from "./Board";
import { setBombs } from "./StartGame";

export default function Game({setView, width, height, bombs}){
  const [board, setBoard] = useState(Array(width * height).fill(0));
  useEffect(() => {
    setBoard(setBombs({ board, width, height, bombs })); // Set the initial state in useEffect
  }, [width, height, bombs]);
  return(
    <Box>
      <Board width={width} height={height} board={board} setBoard={setBoard} />
    </Box>
  );
};