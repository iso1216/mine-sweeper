import { Dispatch, SetStateAction } from "react";

export const OpenZero = (
  newBoardOpen: number[],
  i: number,
  width: number,
  height: number,
  board: any[],
  setBoardOpen: Dispatch<SetStateAction<number[]>>
): void => {
  // 縦横位置の確認
  const x = i % width;
  const y = Math.floor(i / width);
  // 周囲のマス
  const next: [number, number][] = [[x,y-1],[x+1,y-1],[x-1,y-1],[x,y+1],[x+1,y+1],[x-1,y+1],[x+1,y],[x-1,y]];
  // 各マスが0かどうか判定し再起処理で続ける
  for (let index = 0; index < 8; index++) {
    if (next[index][0] < 0 || next[index][0] >= width || next[index][1] < 0 || next[index][1] >= height) continue;
    if (newBoardOpen[next[index][0]+next[index][1]*width] === 0){
      newBoardOpen[next[index][0]+next[index][1]*width] = 1;
      if (board[next[index][0]+next[index][1]*width] === 0){
        OpenZero(newBoardOpen, next[index][0]+next[index][1]*width, width, height, board, setBoardOpen);
      }
    }
  }
  setBoardOpen(newBoardOpen);
}; 