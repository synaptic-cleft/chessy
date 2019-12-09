import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';

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

    squares[1] = './images/knightBlack.png';
    squares[6] = './images/knightBlack.png';

    squares[57] = './images/knightWhite.png';
    squares[62] = './images/knightWhite.png';

    squares[2] = './images/bishopBlack.png';
    squares[5] = './images/bishopBlack.png';

    squares[58] = './images/bishopWhite.png';
    squares[61] = './images/bishopWhite.png';

    squares[4] = './images/QueenBlack.png';
    squares[59] = './images/QueenWhite.png';

    squares[3] = './images/kingBlack.png';
    squares[60] = './images/kingWhite.png';

    this.setState({ history: [{ squares }] })
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

  linksToPreviousSteps = history => history.map((step, move) => {
    const desc = move ?
      'Go to move # ' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => this.jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]

    let status = 'Next player: ' + (this.state.xIsNext ? 'White' : 'Black');

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
          <ol>{this.linksToPreviousSteps(history)}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);