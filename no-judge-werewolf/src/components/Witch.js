import React from 'react'

class Witch extends React.Component {
    render() {
        if (this.props.enabled) {
            return (
                <div className="Witch">
                    <p>女巫請睜眼</p>
                    <p>今晚死的是：{this.props.killed}</p>
                    <button value={true} onClick={this.props.cb}>救</button>
                    <button value={false} onClick={this.props.cb}>不救</button>
                </div>
            );
        }

        return (
            <div></div>
        );
    }
}

export default Witch;