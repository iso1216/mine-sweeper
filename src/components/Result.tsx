import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { ResultProps } from "../types";

const Result: React.FC<ResultProps> = ({setView, time}) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === " ") {
      setView(0)
    }
  }, [setView]);
  
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
      <Box>
        <Typography variant="h2">GAME CLEAR!!!</Typography>
        <Typography display={"flex"} justifyContent={"center"} variant="h4" margin={2}>クリアタイム: {time}秒</Typography>
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <Button
          onClick={() => {
            setView(0);
          }}
          sx={{paddingX:2,paddingY:1,margin:1,background:'linear-gradient(#f1e767 0.46%, #feb645 100.87%)',fontSize:10,color:"black",border:2}}
        >
          タイトルに戻る
        </Button>
      </Box>
    </Box>
  );
};

export default Result; 