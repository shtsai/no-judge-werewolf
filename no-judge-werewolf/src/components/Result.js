import React from 'react'

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Result',
            should_show_result: false,
            should_show_log: false,
        }

        this.flip_show_result = this.flip_show_result.bind(this);
        this.flip_show_log = this.flip_show_log.bind(this);
        this.get_dead = this.get_dead.bind(this);
    }

    flip_show_result() {
        this.setState({ should_show_result: !this.state.should_show_result });
    }

    flip_show_log() {
        this.setState({ should_show_log: !this.state.should_show_log });
    }

    get_dead() {
        const dead = new Set();
        dead.add(this.props.killed_by_werewolf);
        dead.delete(this.props.saved_by_witch);
        dead.delete(this.props.saved_by_savior);
        dead.delete(this.props.ancient_index);
        return dead;
    }

    render() {
        if (this.props.current === this.state.name) {
            const dead = this.get_dead();
            var msg = dead.size === 0 ? "昨晚是平安夜" : "昨晚死的是：" + [...dead].join(',');

            return (
                <div className="Result">
                    <div className="Dead">
                        <button onClick={this.flip_show_result}>顯示結果</button>
                        {this.state.should_show_result && <p>{msg}</p>}
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p>----------------- 法官Only -----------------</p>
                    <div className="Log">
                        <button onClick={this.flip_show_log}>請看VCR</button>
                        {this.state.should_show_log &&
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            狼人殺了：
                                        </td>
                                        <td>
                                            {this.props.killed_by_werewolf}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            長老是：
                                        </td>
                                        <td>
                                            {this.props.ancient_index}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            守衛守了：
                                        </td>
                                        <td>
                                            {this.props.saved_by_savior}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            女巫救了：
                                        </td>
                                        <td>
                                            {this.props.saved_by_witch ? 'Yes' : 'No'}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    </div>
                </div >
            );
        } else {
            return <div></div>
        }
    }
}


export default Result;