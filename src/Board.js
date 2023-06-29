import React from "react";

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      board: Array(this.props.wide**2).fill(0),
    };
  }

  handleClick(i){
    const board=this.state.board.slice();
    board[i]=this.props.board[i];
    this.setState({
      board: board,
    })
  }
  renderBox(i) {
    return (
      <button className="box" onClick={this.handleClick(i)}>{this.state.board[i]}</button>
    );
  }

  render() {
    const edge = [];
    for (let index = 0; index < this.props.wide; index++) {
      edge.push(index);
    }
    return (
      <div>
        {edge.map((index) => (
          <div className="board-row" key={index}>
            {edge.map((number) => this.renderBox(number + this.props.wide * index))}
          </div>
        ))}
      </div>
    );
  }
}

export default Board;