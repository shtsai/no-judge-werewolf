import React from 'react'
import Board from './Board'

class Ancient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Ancient',
            ancient_index: -1,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const index = parseInt(event.target.textContent);
        this.setState({
            ancient_index: index,
        });
        this.props.cb(index)
    }

    render() {
        if (this.props.current === this.state.name) {
            return (
                <div>
                    <p>長老請睁眼：</p>
                    <p>請選擇你自己的號碼:</p>
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

export default Ancient;