import { Box } from "@mui/material";
import OpenAll from "./OpenAll";

export default function Miss({setView, width, height, board, boardOpen}){
  const Width = Array.from({ length: width }, (_, index) => index);
  const Height = Array.from({ length: height }, (_, index) => index);

  return(
    <Box>
      {Height.map((index) => (
        <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
          {Width.map((number) =>
            <OpenAll key={number + index * width} board={board} num={number + index * width} height={height} boardOpen={boardOpen} />
          )}
        </Box>
      ))}
    </Box>
  );
};