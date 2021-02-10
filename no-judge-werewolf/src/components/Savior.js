import React from 'react'

class Savior extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saved: -1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        var x = { ...this.state };
        x.saved = event.target.value;
        this.setState(x);
    }

    handleSubmit(event) {
        this.setState({
            saved: event.target.value,
        });
        this.props.cb(this.state.saved)
        event.preventDefault();
    }

    render() {
        if (this.props.enabled === true) {
            return (
                <div>
                    <p>守衛請睁眼：</p>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            今晚守:
            <input type="text" value={this.state.saved} onChange={this.handleChange} />
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

export default Savior;