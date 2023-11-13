import { Container } from "@mui/material";
import React, { useState } from "react";
import Start from "./components/Start";
import SetStatus from "./components/SetStatus";
import Game from "./components/Game";
import Result from "./components/Result";

const App = () => {
  const [view, setView] = useState(0);
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [bombs, setBombs] = useState(5);
  const ViweController = () => {
    switch (view) {
      case 0:
        return <Start setView={setView} setWidth={setWidth} setHeight={setHeight} setBombs={setBombs} />;
      case 1:
        return <SetStatus setView={setView} setWidth={setWidth} width={width} setHeight={setHeight} height={height} setBombs={setBombs} bombs={bombs} />;
      case 2:
        return <Game setView={setView} width={width} height={height} bombs={bombs} view={view} />;
      case 3:
        return <Result setView={setView} />;
      default:
        break;
    }
  }

  return(
    <Container maxWidth="md" sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "90vh", width: "100%"}}>
      {ViweController()}
    </Container>
  );
}

export default App;
