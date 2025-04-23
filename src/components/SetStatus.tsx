import { Box, Button, Input, Slider, Typography } from "@mui/material";
import React from "react";
import { SetStatusProps } from "../types";

const SetStatus: React.FC<SetStatusProps> = ({setView, setWidth, width, setHeight, height, setBombs, bombs}) => {
  // 横幅設定(スライダー)
  const handleWidthChange = (_event: Event, value: number | number[]) => {
    setWidth(value as number);
    setBombs(5);
  };
  // 横幅設定(入力)
  const handleInputWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(event.target.value === '' ? 0 : Number(event.target.value));
    setBombs(5);
  };
  // 縦幅設定(スライダー)
  const handleHeightChange = (_event: Event, value: number | number[]) => {
    setHeight(value as number);
    setBombs(5);
  };
  // 縦幅設定(入力)
  const handleInputHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(event.target.value === '' ? 0 : Number(event.target.value));
    setBombs(5);
  };
  // 爆弾設定(スライダー)
  const handleBombsChange = (_event: Event, value: number | number[]) => {
    setBombs(value as number);
  };
  // 爆弾設定(入力)
  const handleInputBombsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBombs(event.target.value === '' ? 0 : Number(event.target.value));
  };

  // 入力値チェック
  const handleBlur = () => {
    if (width < 5) setWidth(5);
    else if (width > 20) setWidth(20);
    if (height < 5) setHeight(5);
    else if (height > 20) setHeight(20);
    if (bombs < 5) setBombs(5);
    else if (bombs > parseInt((width*height/4).toString())) setBombs(5);
  };

  return(
    <Box width={"100%"}>
      <Box sx={{margin:{xs: 0, sm: 5}}}>
        <Box>
          <Box sx={{display:"flex", justifyContent:"center", alignItems: "center"}}>
            <Typography id="input-slider" gutterBottom sx={{marginRight:5.5}}>
              横幅
            </Typography>
            <Slider
              value={typeof width === 'number' ? width : 0}
              min={5}
              max={20}
              onChange={handleWidthChange}
              sx={{width:"60%", marginRight:2}}
            />
            <Input
              value={width}
              size="small"
              onChange={handleInputWidthChange}
              onBlur={handleBlur}
              inputProps={{
                min: 5,
                max: 20,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
              sx={{width:50}}
            />
          </Box>
        </Box>
        <Box>
          <Box alignItems="center" sx={{display:"flex", justifyContent:"center", alignItems: "center"}}>
            <Typography id="input-slider" gutterBottom sx={{marginRight:5.9}}>
              縦幅
            </Typography>
            <Slider
              value={typeof height === 'number' ? height : 0}
              min={5}
              max={20}
              onChange={handleHeightChange}
              sx={{width:"60%", marginRight:2}}
            />
            <Input
              value={height}
              size="small"
              onChange={handleInputHeightChange}
              onBlur={handleBlur}
              inputProps={{
                min: 5,
                max: 20,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
              sx={{width:50}}
            />
          </Box>
        </Box>
        <Box>
          <Box alignItems="center" sx={{display:"flex", justifyContent:"center", alignItems: "center"}}>
            <Typography id="input-slider" gutterBottom sx={{marginRight:3}}>
              爆弾の数
            </Typography>
            <Slider
              value={typeof bombs === 'number' ? bombs : 0}
              min={5}
              max={parseInt((width*height/4).toString())}
              onChange={handleBombsChange}
              aria-labelledby="input-slider"
              sx={{width:"60%", marginRight:2}}
            />
            <Input
              value={bombs}
              size="small"
              onChange={handleInputBombsChange}
              onBlur={handleBlur}
              inputProps={{
                min: 5,
                max: parseInt((width*height/4).toString()),
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
              sx={{width:50}}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{display:'flex', justifyContent:'space-between', marginX: {xs: 0, sm: 10}}}>
        <Button onClick={()=>{setView(0)}} sx={{paddingX:2,paddingY:0.5,margin:1,background:'linear-gradient(#f1e767 0.46%, #feb645 100.87%)',fontSize:10,color:"black",border:2}}>戻る</Button>
        <Button onClick={()=>{setView(2)}} sx={{paddingX:2,paddingY:0.5,margin:1,background:'linear-gradient(#f1e767 0.46%, #feb645 100.87%)',fontSize:10,color:"black",border:2}}>ゲームスタート！</Button>
      </Box>
    </Box>
  );
};

export default SetStatus; 