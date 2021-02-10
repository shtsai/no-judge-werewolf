import React from 'react'

class Square extends React.Component {
    render() {
        return (
            <button onClick={this.props.cb} className="square">
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square key={i} value={i} cb={this.props.cb} />;
    }

    renderRow(i, total) {
        const squares = [];
        for (; i <= total; i++) {
            squares.push(this.renderSquare(i));
        }
        return squares;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderRow(1, this.props.total)}
                </div>
            </div>
        );
    }
}

export default Board;