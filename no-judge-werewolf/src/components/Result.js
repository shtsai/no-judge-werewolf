import React from 'react'

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            should_show_result: false,
        }

        this.flip_show_result = this.flip_show_result.bind(this);
        this.get_dead = this.get_dead.bind(this);
    }

    flip_show_result() {
        this.setState({ should_show_result: !this.state.should_show_result });
    }

    get_dead() {
        const dead = new Set();
        dead.add(this.props.killed_by_werewolf);
        dead.delete(this.props.saved_by_witch);
        dead.delete(this.props.saved_by_savior);
        return dead;
    }

    render() {
        if (this.props.enabled) {
            const dead = this.get_dead();
            var msg = dead.size === 0 ? "昨晚是平安夜" : "昨晚死的是：" + [...dead].join(',');
            return (
                <div className="Result">
                    <button onClick={this.flip_show_result}>顯示結果</button>
                    {this.state.should_show_result && <p>{msg}</p>}
                </div>
            );
        } else {
            return <div></div>
        }
    }
}


export default Result;