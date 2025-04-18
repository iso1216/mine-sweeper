import { Container } from "@mui/material";
import React, { useState } from "react";
import Start from "./components/Start";
import SetStatus from "./components/SetStatus";
import Game from "./components/Game";
import Result from "./components/Result";

const App: React.FC = () => {
  const [view, setView] = useState<number>(0);
  const [width, setWidth] = useState<number>(5);
  const [height, setHeight] = useState<number>(5);
  const [bombs, setBombs] = useState<number>(5);
  const [time, setTime] = useState<number>(-2);
  const [timer, setTimer] = useState<boolean>(false);

  // タイマースタート
  const startTimer = (): void => {
    setTimer(true);
    setTime(-2);
  }

  const ViweController = (): JSX.Element | null => {
    switch (view) {
      case 0:
        return <Start setView={setView} setWidth={setWidth} setHeight={setHeight} setBombs={setBombs} />;
      case 1:
        return <SetStatus setView={setView} setWidth={setWidth} width={width} setHeight={setHeight} height={height} setBombs={setBombs} bombs={bombs} />;
      case 2:
        return <Game setView={setView} width={width} height={height} bombs={bombs} view={view} startTimer={startTimer} setTimer={setTimer} setTime={setTime} timer={timer} />;
      case 3:
        return <Result setView={setView} time={time} />;
      default:
        return null;
    }
  }

  return(
    <Container maxWidth="md" sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "97vh"}}>
      {ViweController()}
    </Container>
  );
}

export default App; 