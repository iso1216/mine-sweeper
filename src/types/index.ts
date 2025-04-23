import { Dispatch, SetStateAction } from 'react';

export interface StartProps {
  setView: Dispatch<SetStateAction<number>>;
  setWidth: Dispatch<SetStateAction<number>>;
  setHeight: Dispatch<SetStateAction<number>>;
  setBombs: Dispatch<SetStateAction<number>>;
}

export interface SetStatusProps {
  setView: Dispatch<SetStateAction<number>>;
  setWidth: Dispatch<SetStateAction<number>>;
  width: number;
  setHeight: Dispatch<SetStateAction<number>>;
  height: number;
  setBombs: Dispatch<SetStateAction<number>>;
  bombs: number;
}

export interface GameProps {
  setView: Dispatch<SetStateAction<number>>;
  width: number;
  height: number;
  bombs: number;
  view: number;
  startTimer: () => void;
  setTimer: Dispatch<SetStateAction<boolean>>;
  setTime: Dispatch<SetStateAction<number>>;
  timer: boolean;
}

export interface ResultProps {
  setView: Dispatch<SetStateAction<number>>;
  time: number;
}

export interface BoardProps {
  width: number;
  height: number;
  bombs: number;
  setView: Dispatch<SetStateAction<number>>;
  timer: boolean;
  setTimer: Dispatch<SetStateAction<boolean>>;
  setTime: Dispatch<SetStateAction<number>>;
}

export interface CellStatus {
  value: number;
  isOpen: boolean;
  isFlagged: boolean;
}

export interface CheckOpenProps {
  statusArray: CellStatus[][];
  setStatusArray: Dispatch<SetStateAction<CellStatus[][]>>;
  x: number;
  y: number;
}

export interface MissProps {
  statusArray: CellStatus[][];
  setStatusArray: Dispatch<SetStateAction<CellStatus[][]>>;
  bombsLocation: number[][];
}

export interface OpenAllProps {
  statusArray: CellStatus[][];
  setStatusArray: Dispatch<SetStateAction<CellStatus[][]>>;
}

export interface OpenZeroProps {
  statusArray: CellStatus[][];
  setStatusArray: Dispatch<SetStateAction<CellStatus[][]>>;
  zeros: number[][];
}

export interface SetStatusArrayProps {
  statusArray: CellStatus[][];
  width: number;
  height: number;
  bombsLocation: number[][];
}

export interface StartGameProps {
  width: number;
  height: number;
  bombs: number;
}

export interface TimerProps {
  timer: boolean;
  setTime: Dispatch<SetStateAction<number>>;
  time: number;
} 