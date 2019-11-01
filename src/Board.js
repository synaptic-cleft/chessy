import React from 'react';

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
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
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

export default Board;