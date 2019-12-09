import './Board.css';
import React from 'react';

function Square(props) {
    return (
        <button className={"square " + (props.black? "black": "")} onClick={props.onClick}>
            <img src={props.value} alt="" width='100%' />
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i, evenRow) {
        let isBlack;
        if ((i%2 && evenRow) || (!(i%2) && !evenRow)) {isBlack = false} else { isBlack = true};
        return (<Square
            value={this.props.squares[i]}
            black={isBlack}
            onClick={() => this.props.onClick(i)}
        />);
    }

    print8Squares(i, evenRow) {
        const arr = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7];
        return arr.map((x) => this.renderSquare(x, evenRow))
    }

    printBoard() {
        const arr = [0, 8, 16, 24, 32, 40, 48, 56];
        return arr.map((x) => <div className="board-row">{this.print8Squares(x, x%16)}</div>);
    }

    render() {
        return (
            <div>
                {this.printBoard()}
            </div>
        );
    }
}

export default Board;