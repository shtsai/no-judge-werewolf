import React from 'react'
import Board from './Board'

class Savior extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Savior',
            saved: -1,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(saved) {
        this.setState({
            saved: saved,
        });
        this.props.cb(saved)
    }

    render() {
        if (this.props.current === this.state.name) {
            return (
                <div>
                    <p>守衛請睁眼：</p>
                    <p>今晚守:</p>
                    <Board
                        total={this.props.player_count}
                        cb={this.handleSubmit}
                    />
                </div>
            );
        }

        return (
            <div></div>
        );
    }
}

export default Savior;