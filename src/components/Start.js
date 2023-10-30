import { Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material";

export default function Start({setView, setWidth, setHeight, setBombs}){
  const handleClick = (value) => {
    switch (value){
      case 0:
        setWidth(10);
        setHeight(10);
        setBombs(15);
        setView(2);
        break;
      case 1:
        setWidth(13);
        setHeight(13);
        setBombs(30);
        setView(2);
        break;
      case 2:
        setWidth(16);
        setHeight(16);
        setBombs(50);
        setView(2);
        break;
      case 3:
        setView(1);
        break;
      default:
        break;
    }
  }

  return(
    <Box>
      <Typography variant="h2" align="center" marginY={5} fontWeight={700}>マインスイーパー</Typography>
      <Box>
        <Box sx={{display:"flex", justifyContent:"center"}}>
          <Button onClick={()=>{handleClick(0)}} sx={{paddingX:4,paddingY:1,margin:1,background:'linear-gradient(#f1e767 0.46%, #feb645 100.87%)',fontSize:20,color:"black",border:2}}>簡単</Button>
          <Button onClick={()=>{handleClick(1)}} sx={{paddingX:4,paddingY:1,margin:1,background:'linear-gradient(#f1e767 0.46%, #feb645 100.87%)',fontSize:20,color:"black",border:2}}>普通</Button>
          <Button onClick={()=>{handleClick(2)}} sx={{paddingX:4,paddingY:1,margin:1,background:'linear-gradient(#f1e767 0.46%, #feb645 100.87%)',fontSize:20,color:"black",border:2}}>難しい</Button>
          <Button onClick={()=>{handleClick(3)}} sx={{paddingX:4,paddingY:1,margin:1,background:'linear-gradient(#f1e767 0.46%, #feb645 100.87%)',fontSize:20,color:"black",border:2}}>自分で設定</Button>
        </Box>
      </Box>
      <Box sx={{display:"flex", justifyContent:"center"}} marginTop={5}>
        <Box>
          <Typography variant="h6">ルール説明</Typography>
          <List>
            <ListItem sx={{background:"white",borderLeft:5,borderColor:"green",marginBottom:"5px"}}>
            <Typography>簡単：10×10マスで爆弾15個</Typography>
            </ListItem>
            <ListItem sx={{background:"white",borderLeft:5,borderColor:"green",marginBottom:"5px"}}>
            <Typography>普通：13×13マスで爆弾30個</Typography>
            </ListItem>
            <ListItem sx={{background:"white",borderLeft:5,borderColor:"green",marginBottom:"5px"}}>
            <Typography>難しい：16×16マスで爆弾50個</Typography>
            </ListItem>
            <ListItem sx={{background:"white",borderLeft:5,borderColor:"green",marginBottom:"5px"}}>
            <Typography>自分で設定：幅と爆弾の数を自分で設定できます。</Typography>
            </ListItem>
            <ListItem sx={{background:"white",borderLeft:5,borderColor:"green",marginBottom:"5px"}}>
            <Typography>左クリックでマスを開き、右クリックで旗を設置できます。</Typography>
            </ListItem>
            <ListItem sx={{background:"white",borderLeft:5,borderColor:"green",marginBottom:"5px"}}>
            <ListItemText primary="右下のボタンを押すことで、旗モードを切り替えられます。" secondary="※赤色の枠の時が旗モード" />
            </ListItem>
            <ListItem sx={{background:"white",borderLeft:5,borderColor:"green",marginBottom:"5px"}}>
            <ListItemText primary="キー入力対応" secondary="矢印キーで場所を選び、スペースで処理、fキーで旗モードの切り替えができます。" />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
};