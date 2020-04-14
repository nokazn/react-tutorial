import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = (props) => (
  <button
    className="square"
    onClick={props.onClick}>
      {props.value}
  </button>
);

const whichWins = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] != null && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      nextPlayer: 'X',
      winner: null,
    }
  }
  
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        nextPlayer={this.state.nextPlayer}
        onClick={() => this.handleClick(i)} />
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (squares[i] != null || this.state.winner != null) return;
    
    squares[i] = this.state.nextPlayer;

    const winner = whichWins(squares);
    console.log(winner)
    if (winner != null) {
      this.setState({
        winner,
        squares,
      });
      return;
    }

    const nextPlayer = this.state.nextPlayer === 'X' ? 'O' : 'X';

    this.setState({
      squares,
      nextPlayer,
      winner,
    });
  }

  render() {
    const status = this.state.winner != null
      ? `Winner: ${this.state.winner}`
      : `Next player: ${this.state.nextPlayer}`;

    return (
      <div>
        <h2 className="status">{status}</h2>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
