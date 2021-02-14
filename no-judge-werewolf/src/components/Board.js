import React from 'react'

class Square extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const selected = parseInt(event.target.textContent);
        this.props.cb(selected);
    }

    render() {
        return (
            <button onClick={this.handleClick} className="square">
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: null,
        };

        this.selectNumber = this.selectNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    selectNumber(selected) {
        this.setState({ selected: selected });
    }

    renderSquare(i) {
        return <Square key={i} value={i} cb={this.selectNumber} />;
    }

    renderRow(i, total) {
        const squares = [];
        for (; i <= total; i++) {
            squares.push(this.renderSquare(i));
        }
        return squares;
    }

    handleSubmit() {
        if (this.state.selected === null) {
            alert('You must select something');
            return;
        }
        this.props.cb(this.state.selected);
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderRow(1, this.props.total)}
                </div>
                <div onClick={this.handleSubmit} className="board-row">
                    <button>確認</button>
                </div>
            </div>
        );
    }
}

export default Board;