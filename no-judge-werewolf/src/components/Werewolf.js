import React from 'react'


class Werewolf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            killed: -1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        var x = { ...this.state };
        x.killed = event.target.value;
        this.setState(x);
    }

    handleSubmit(event) {
        this.setState({
            killed: event.target.value,
        });
        this.props.cb(this.state.killed)
        event.preventDefault();
    }

    render() {
        if (this.props.enabled === true) {
            return (
                <div>
                    <p>狼人請睁眼：</p>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            今晚杀:
            <input type="text" value={this.state.killed} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            );
        }

        return (
            <div></div>
        );
    }
}

export default Werewolf;