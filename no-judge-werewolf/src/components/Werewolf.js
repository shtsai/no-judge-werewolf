import React from 'react'
import Board from './Board'


class Werewolf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Werewolf',
            killed: -1,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(killed) {
        this.setState({
            killed: killed
        });
        this.props.cb(killed)
    }

    render() {
        if (this.props.current === this.state.name) {
            return (
                <div>
                    <p>狼人請睁眼：</p>
                    <p>
                        今晚杀:
                    </p>
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

export default Werewolf;