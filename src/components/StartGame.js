export const setBombs = ({board, width, height, bombs}) => {
  const newBoard = [...board];
  const bombsBoard = generateRandomNumbers(width * height, bombs, newBoard);
  const startBoard = checkBombs(bombsBoard, width, height);
  return startBoard;
};

// 爆弾の位置の決定
const generateRandomNumbers = (range, count, board) => {
  const numbers = Array.from({ length: range }, (_, index) => index);
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const randomNumber = numbers[randomIndex];
    numbers.splice(randomIndex, 1);
    randomNumbers.push(randomNumber);
  }
  for (let index = 0; index < count; index++) {
    board[randomNumbers[index]] = "bombs";
  }
  return board;
};

// 爆弾の数の探索
const checkBombs = (board, width, height) => {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (board[i*width + j] === "bombs") {
        // 左のマス
        if(i !== 0 && board[(i-1)*width + j]!=="bombs")board[(i-1)*width + j]++;
        // 右のマス
        if(i !== height-1 && board[(i+1)*width + j]!=="bombs")board[(i+1)*width + j]++;
        // 上のマス
        if(j !== 0 && board[i*width + j-1]!=="bombs")board[i*width + j-1]++;
        // 下のマス
        if(j !== width-1 && board[i*width + j+1]!=="bombs")board[i*width + j+1]++;
        // 左上のマス
        if(i !== 0 && j !== 0 && board[(i-1)*width + j-1]!=="bombs")board[(i-1)*width + j-1]++;
        // 右上のマス
        if(i !== height-1 && j !== 0 && board[(i+1)*width + j-1]!=="bombs")board[(i+1)*width + j-1]++;
        // 左下のマス
        if(i !== 0 && j !== width-1 && board[(i-1)*width + j+1]!=="bombs")board[(i-1)*width + j+1]++;
        // 右下のマス
        if(i !== height-1 && j !== width-1 && board[(i+1)*width + j+1]!=="bombs")board[(i+1)*width + j+1]++;
      }
    }
  }
  return board;
};
