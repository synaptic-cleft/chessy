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

    this.state = {
      history: [{ squares }],
      xIsNext: true,
      stepNumber: 0,
      selectedPosition: null,
      selectedFigure: null,
    }
  }

  componentDidMount() {
    const squares = Array(64).fill(null);
    let pawn;
    for (pawn = 8; pawn < 16; pawn++) {
      squares[pawn] = './images/pawnBlack.png';
    }
    for (pawn = 48; pawn < 56; pawn++) {
      squares[pawn] = './images/pawnWhite.png';
    }

    squares[0] = './images/rookBlack.png';
    squares[7] = './images/rookBlack.png';

    squares[56] = './images/rookWhite.png';
    squares[63] = './images/rookWhite.png';

    squares[1] = './images/bishopBlack.png';
    squares[6] = './images/bishopBlack.png';

    squares[57] = './images/bishopWhite.png';
    squares[62] = './images/bishopWhite.png';

    squares[2] = './images/knightBlack.png';
    squares[5] = './images/knightBlack.png';

    squares[58] = './images/knightWhite.png';
    squares[61] = './images/knightWhite.png';

    squares[3] = './images/QueenBlack.png';
    squares[60] = './images/QueenWhite.png';

    squares[4] = './images/kingBlack.png';
    squares[59] = './images/kingWhite.png';

    this.setState({history: [{squares}]})
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