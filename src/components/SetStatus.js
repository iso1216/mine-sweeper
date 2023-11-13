import { Box, Button, Input, Slider, Typography } from "@mui/material";

export default function SetStatus({setView, setWidth, width, setHeight, height, setBombs, bombs}){
  // 横幅設定(スライダー)
  const handleWidthChange = (event,value) => {
    setWidth(value);
    setBombs(5);
  };
  // 横幅設定(入力)
  const handleInputWidthChange = (event) => {
    setWidth(event.target.value === '' ? 0 : Number(event.target.value));
    setBombs(5);
  };
  // 縦幅設定(スライダー)
  const handleHeightChange = (event,value) => {
    setHeight(value);
    setBombs(5);
  };
  // 縦幅設定(入力)
  const handleInputHeightChange = (event) => {
    setHeight(event.target.value === '' ? 0 : Number(event.target.value));
    setBombs(5);
  };
  // 爆弾設定(スライダー)
  const handleBombsChange = (event,value) => {
    setBombs(value);
  };
  // 爆弾設定(入力)
  const handleInputBombsChange = (event) => {
    setBombs(event.target.value === '' ? 0 : Number(event.target.value));
  };

  // 入力値チェック
  const handleBlur = () => {
    if (width < 5) setWidth(5);
    else if (width > 20) setWidth(20);
    if (height < 5) setHeight(5);
    else if (height > 20) setHeight(20);
    if (bombs < 5) setBombs(5);
    else if (bombs > parseInt(width*height/2)) setBombs(5);
  };

  return(
    <Box width={"100%"}>
      <Box margin={5}>
        <Box sx={{display:"flex", justifyContent:"center"}}>
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
      <Box margin={5}>
        <Box alignItems="center" sx={{display:"flex", justifyContent:"center"}}>
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
      <Box margin={5}>
        <Box alignItems="center" sx={{display:"flex", justifyContent:"center"}}>
          <Typography id="input-slider" gutterBottom sx={{marginRight:3}}>
            爆弾の数
          </Typography>
          <Slider
            value={typeof bombs === 'number' ? bombs : 0}
            min={5}
            max={parseInt(width*height/2)}
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
              max: parseInt(width*height/2),
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
            sx={{width:50}}
          />
        </Box>
      </Box>
      <Box sx={{display:'flex', justifyContent:'right'}}>
        <Button onClick={()=>{setView(2)}} sx={{paddingX:2,paddingY:0.5,margin:1,background:'linear-gradient(#f1e767 0.46%, #feb645 100.87%)',fontSize:10,color:"black",border:2}}>ゲームスタート！</Button>
      </Box>
    </Box>
  );
};