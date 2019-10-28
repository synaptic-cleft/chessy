import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      <img src={props.value} width='100%' />
    </button>
  );
}
class Board extends React.Component {
  renderSquare(i) {
    return (<Square
      value = {this.props.squares[i]}
      onClick = {() => this.props.onClick(i)}
    />);
  }

  print8Squares(i) {
    const arr = Array(i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7)
    return arr.map((x) => this.renderSquare(x))
  }

  printBoard() {
    const arr = Array(0, 8, 16, 24, 32, 40, 48, 56);
    return arr.map((x) => <div className="board-row">{this.print8Squares(x)}</div>);
  }

  render() {
    return (
      <div>
        {this.printBoard()}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    const squares = Array(64).fill(null)
    let boer;
    for (boer = 8; boer < 16; boer++) {
      squares[boer] = './images/pawnBlack.png';
    }
    for (boer = 48; boer < 56; boer++) {
      squares[boer] = './images/pawnWhite.png';
    }

    const blackRookPosition = Array(0, 7)
    blackRookPosition.map((t) => squares[t] = './images/rookBlack.png');

    const whiteRookPosition = Array(56, 63)
    whiteRookPosition.map((t) => squares[t] = './images/rookWhite.png');

    const blackBishopPosition = Array(1, 6)
    blackBishopPosition.map((t) => squares[t] = './images/bishopBlack.png');

    const whiteBishopPosition = Array(57, 62)
    whiteBishopPosition.map((t) => squares[t] = './images/bishopWhite.png');

    const blackKnightPosition = Array(2, 5)
    blackKnightPosition.map((t) => squares[t] = './images/knightBlack.png');

    const whiteKnightPosition = Array(58, 61)
    whiteKnightPosition.map((t) => squares[t] = './images/knightWhite.png');

    squares[3] = './images/QueenBlack.png';
    squares[60] = './images/QueenWhite.png';

    squares[4] = './images/kingBlack.png';
    squares[59] = './images/kingWhite.png';

    this.state = {
      history: [{ squares }],
      xIsNext: true,
      stepNumber: 0,
      selectedPosition: null,
      selectedFigure: null,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // todo: replace slice. this however won't work: const history = [...current.this.state.history].push(this.state.stepNumber + 1);
    const current = history[history.length - 1]

    if (this.state.selectedFigure) {
      const squares = [...current.squares];
      if (squares[i]) {
        return;
      }
      squares[i] = this.state.selectedFigure;
      squares[this.state.selectedPosition] = null;
      this.setState({
        history: history.concat([{ squares: squares, }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
        selectedPosition: null,
        selectedFigure: null,
      });
    } else {
      this.setState({
        selectedPosition: i,
        selectedFigure: current.squares[i],
      })
    }

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