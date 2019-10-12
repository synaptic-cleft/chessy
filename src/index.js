import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
class Board extends React.Component {
  renderSquare(i) {
    return (<Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />);
  }

  print8Squares(i) {
    var arr = Array(i, i+1, i+2, i+3, i+4, i+5, i+6, i+7)
    return arr.map((x) => this.renderSquare(x))
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.print8Squares(0)}
        </div>
        <div className="board-row">
        {this.print8Squares(8)}          
        </div>
        <div className="board-row">
        {this.print8Squares(16)}
        </div>
        <div className="board-row">
        {this.print8Squares(24)}
        </div>
        <div className="board-row">
        {this.print8Squares(32)}
        </div>
        <div className="board-row">
        {this.print8Squares(40)}
        </div>
        <div className="board-row">
        {this.print8Squares(48)}
        </div>
        <div className="board-row">
        {this.print8Squares(56)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    var squares = Array(64).fill(null)
    var boer;
    for (boer=8; boer<16; boer++) {
      squares[boer] = 'B';
    }
    for (boer=48; boer<56; boer++) {
      squares[boer] = 'B';
    }

    var towerPosition = Array(0, 7, 56, 63)
    towerPosition.map((t) => squares[t]='T');

    var loperPosition = Array(1, 6, 57, 62)
    loperPosition.map((t) => squares[t]='L');

    var horsePosition = Array(2, 5, 58, 61)
    horsePosition.map((t) => squares[t]='H');

    squares[3] = 'D';
    squares[60] = 'D';

    squares[4] = 'K';
    squares[59] = 'K';

    this.state = {
      history: [{ squares }],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice();
    if (squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ squares: squares, }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move # ' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )

    }
    )
    let status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);