import React from "react";
import Board from "./Board";

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      board: Array(this.props.wide**2).fill(0),
      set: false,
    }
  }

  checkBombs(board){
    for (let index = 0; index < board.length; index++) {
      if (board[index] === "bombs"){
        for (let i = -1; i <= 1; i++){
          for (let j = -1; j <=1; j++){
            if (index%this.props.wide===0 && j===-1) continue;
            if (index%this.props.wide===this.props.wide-1 && j===1) continue;
            if (board[index+j+(8*i)]!=="bombs") board[index+j+(8*i)]++;
          }
        }
      }
    }
    return board;
  }

  generateRandomNumbers(range, count, board) {
    const numbers = Array.from({ length: range }, (_, index) => index + 1);
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
  }
  

  setBombs(){
    const board = this.state.board.slice();
    const bombsBoard = this.generateRandomNumbers(this.props.wide**2,this.props.bombs,board);
    const startBoard = this.checkBombs(bombsBoard);
    this.setState({
      board:startBoard,
      set: true,
    });
  }

  ViewBoard(){
    return(
        <Board
          wide = {this.props.wide}
          board={this.state.board}
        />
    );
  }

  render(){
    return(
      <div>
        {this.state.set ? this.ViewBoard() : this.setBombs()}
      </div>
    );
  }
}

export default Game;