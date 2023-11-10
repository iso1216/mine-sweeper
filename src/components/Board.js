import { Box, Button } from "@mui/material";
import { useState } from "react";
import CheckOpen from "./CheckOpen";
import { OpenZero } from "./OpenZero";

export default function Board({ width, height, board, setBoard }) {
  const Width = Array.from({ length: width }, (_, index) => index);
  const Height = Array.from({ length: height }, (_, index) => index);
  const [boardOpen, setBoardOpen] = useState(Array(width * height).fill(0));

  const handleChange = (event, i) => {
    if (event.button === 0){
      const newBoardOpen = [...boardOpen];
      newBoardOpen[i] = 1;
      setBoardOpen(newBoardOpen);
      if (board[i]===0) setBoardOpen(OpenZero(newBoardOpen, i, width, height, board));
    } else if (event.button === 2){
      const newBoardOpen = [...boardOpen];
      newBoardOpen[i] = 2;
      setBoardOpen(newBoardOpen);
    }
  };

  return (
    <Box>
      {Height.map((index) => (
        <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
          {Width.map((number) =>
            boardOpen[number + index * width] ? (
              <CheckOpen boardOpen={boardOpen} board={board} num={number + index * width} handleChange={handleChange} height={height} />
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
