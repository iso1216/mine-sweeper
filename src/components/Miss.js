import { Box, Button } from "@mui/material";
import OpenAll from "./OpenAll";
import { useCallback, useEffect } from "react";

export default function Miss({setView, width, height, board, boardOpen}){
  const Width = Array.from({ length: width }, (_, index) => index);
  const Height = Array.from({ length: height }, (_, index) => index);

    // キーボード操作用
  const handleKeyPress = useCallback((event) => {
    if (event.key === " ") {
      setView(0)
    }
  }, []);
  
  useEffect(() => {
    // コンポーネントがマウントされた時にイベントリスナーを追加する
    window.addEventListener('keydown', handleKeyPress);
    // コンポーネントがアンマウントされた時にイベントリスナーを削除する
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return(
    <Box>
      {Height.map((index) => (
        <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
          {Width.map((number) =>
            <OpenAll key={number + index * width} board={board} num={number + index * width} height={height} boardOpen={boardOpen} />
          )}
        </Box>
      ))}
      <Box className="retry">
      <Box display={"flex"} justifyContent={"right"}>
        <Button
          onClick={()=>setView(0)}
          sx={{paddingX:2,paddingY:1,margin:1,background:'linear-gradient(#f1e767 0.46%, #feb645 100.87%)',fontSize:10,color:"black",border:2}}
        >
          リトライ
        </Button>
      </Box>
    </Box>
    </Box>
  );
};