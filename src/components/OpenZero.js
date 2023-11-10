export const OpenZero = (newBoardOpen, i, width, height, board) => {
  const x = i%width;
  const y = Math.floor(i / width);
  const next = {
    "up":(x,y-1),
    "upright":(x+1,y-1),
    "upleft":(x-1,y-1),
    "down":(x,y+1),
    "downright":(x+1,y+1),
    "downleft":(x-1,y+1),
    "right":(x+1,y),
    "left":(x-1,y)
  }
};