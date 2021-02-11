import React from 'react'
import Werewolf from './Werewolf'
import Witch from './Witch'
import Result from './Result'
import Savior from './Savior'
import Ancient from './Ancient'
import '../App.css';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: null,
            ancient_index: null,
            killed_by_werewolf: null,
            saved_by_witch: null,
            saved_by_savior: null,
        };

        this.next_role = this.next_role.bind(this);
        this.ancient_complete_cb = this.ancient_complete_cb.bind(this);
        this.savior_complete_cb = this.savior_complete_cb.bind(this);
        this.werewolf_complete_cb = this.werewolf_complete_cb.bind(this);
        this.witch_complete_cb = this.witch_complete_cb.bind(this);
        this.is_finished = this.is_finished.bind(this);
    }

    componentDidMount() {
        if (this.state.current === null &&
            this.props.orders !== null &&
            this.props.orders.size !== 0) {
            this.setState({ current: this.props.orders[0] });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.state.current === null &&
            this.props.orders !== null &&
            this.props.orders.size !== 0) {
            this.setState({ current: this.props.orders[0] });
        }
    }

    next_role(orders) {
        let current = this.state.current;
        let index = orders.indexOf(current);
        if (index === orders.size) {
            // Reach end
            this.setState({ current: null });
        } else {
            this.setState({ current: orders[index + 1] });
        }
    }

    ancient_complete_cb(ancient_index) {
        this.setState({ ancient_index: ancient_index });
        this.next_role(this.props.orders);
    }

    savior_complete_cb(saved) {
        this.setState({ saved_by_savior: saved });
        this.next_role(this.props.orders);
    }

    werewolf_complete_cb(killed) {
        this.setState({ killed_by_werewolf: killed });
        this.next_role(this.props.orders);
    }

    witch_complete_cb(event) {
        var x = { ...this.state };
        if (event.target.value === 'true') {
            x.saved_by_witch = x.killed_by_werewolf;
        }
        this.setState(x);
        this.next_role(this.props.orders);
    }

    is_finished() {
        return this.state.current === 'Result';
    }

    render() {
        if (!this.props.enabled) {
            return <div></div>;
        }
        var title = this.is_finished() ? "天亮了：" : "天黑請閉眼";
        return (
            <div>
                <p>{title}</p>
                <Ancient
                    current={this.state.current}
                    player_count={this.props.player_count}
                    cb={this.ancient_complete_cb}
                />

                <Savior
                    current={this.state.current}
                    player_count={this.props.player_count}
                    cb={this.savior_complete_cb}
                />

                <Werewolf
                    current={this.state.current}
                    player_count={this.props.player_count}
                    cb={this.werewolf_complete_cb}
                />

                <Witch
                    current={this.state.current}
                    killed={this.state.killed_by_werewolf}
                    cb={this.witch_complete_cb} />

                <Result
                    current={this.state.current}
                    killed_by_werewolf={this.state.killed_by_werewolf}
                    saved_by_witch={this.state.saved_by_witch}
                    saved_by_savior={this.state.saved_by_savior}
                    ancient_index={this.state.ancient_index}
                />

                {/* <p>Dead: {this.state.killed_by_werewolf}</p>
                <p>saved: {this.state.saved_by_savior}</p>
                <p>player count: {this.props.player_count}</p>
                <p>Ancient index: {this.state.ancient_index}</p>
                <p>enabled_roles: {this.state.enabled_roles}</p>
                <p>current: {this.state.current}</p> */}
            </div>
        );
    }
}

export default Game;
